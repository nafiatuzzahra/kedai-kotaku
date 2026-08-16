-- Run this complete migration in a new Supabase project SQL Editor.
create extension if not exists pgcrypto;

create table public.restaurants (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(btrim(name)) between 2 and 120),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.profiles (
  id uuid primary key default gen_random_uuid(), user_id uuid not null unique references auth.users(id) on delete cascade,
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  name text not null check (char_length(btrim(name)) between 2 and 120),
  role text not null check (role in ('owner', 'admin')), created_at timestamptz not null default now()
);
create table public.order_counters (
  restaurant_id uuid primary key references public.restaurants(id) on delete cascade,
  last_number bigint not null default 0 check (last_number >= 0)
);
create table public.orders (
  id uuid primary key default gen_random_uuid(), restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  order_number text not null, customer_name text not null, customer_phone text not null, items jsonb not null,
  subtotal numeric(12,2) not null check (subtotal >= 0), total numeric(12,2) not null check (total >= 0),
  status text not null default 'Pending' check (status in ('Pending','Diproses','Selesai','Dibatalkan')),
  source text not null default 'Website' check (source = 'Website'), created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  unique (restaurant_id, order_number)
);
create index orders_restaurant_created_idx on public.orders (restaurant_id, created_at desc);

create or replace function public.set_updated_at() returns trigger language plpgsql set search_path = '' as $$ begin new.updated_at = now(); return new; end; $$;
create trigger restaurants_updated_at before update on public.restaurants for each row execute function public.set_updated_at();
create trigger orders_updated_at before update on public.orders for each row execute function public.set_updated_at();

-- Public checkout is intentionally restricted to this function. Totals are never accepted from the browser.
create or replace function public.create_website_order(
  p_restaurant_slug text, p_customer_name text, p_customer_phone text, p_items jsonb
) returns public.orders language plpgsql security definer set search_path = '' as $$
declare
  v_restaurant_id uuid; v_number bigint; v_order public.orders; v_item jsonb;
  v_name text; v_variant text; v_note text; v_options jsonb; v_quantity integer; v_price numeric(12,2);
  v_items jsonb := '[]'::jsonb; v_total numeric(12,2) := 0;
begin
  if p_restaurant_slug is null or char_length(p_restaurant_slug) > 100 or p_restaurant_slug !~ '^[a-z0-9]+(?:-[a-z0-9]+)*$' then raise exception 'invalid restaurant'; end if;
  if p_customer_name is null or char_length(btrim(p_customer_name)) not between 2 and 100 then raise exception 'invalid customer name'; end if;
  if p_customer_phone is null or p_customer_phone !~ '^[0-9+][0-9 ()-]{7,22}$' then raise exception 'invalid customer phone'; end if;
  if jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) not between 1 and 50 then raise exception 'invalid items'; end if;

  for v_item in select value from jsonb_array_elements(p_items) loop
    if jsonb_typeof(v_item) <> 'object' then raise exception 'invalid item'; end if;
    v_name := btrim(v_item->>'name'); v_variant := nullif(btrim(coalesce(v_item->>'variant', '')), ''); v_note := nullif(btrim(coalesce(v_item->>'note', '')), ''); v_options := coalesce(v_item->'options', '[]'::jsonb);
    if char_length(v_name) not between 1 and 120 or (v_variant is not null and char_length(v_variant) > 120) or (v_note is not null and char_length(v_note) > 500) then raise exception 'invalid item text'; end if;
    if jsonb_typeof(v_options) <> 'array' or jsonb_array_length(v_options) > 20 then raise exception 'invalid item options'; end if;
    if jsonb_typeof(v_item->'quantity') <> 'number' or (v_item->>'quantity') !~ '^[0-9]+$' then raise exception 'invalid quantity'; end if;
    if jsonb_typeof(v_item->'unitPrice') <> 'number' or (v_item->>'unitPrice') !~ '^[0-9]+(?:\.[0-9]{1,2})?$' then raise exception 'invalid price'; end if;
    v_quantity := (v_item->>'quantity')::integer; v_price := (v_item->>'unitPrice')::numeric(12,2);
    if v_quantity not between 1 and 100 or v_price < 0 or v_price > 10000000 then raise exception 'item out of range'; end if;
    v_total := v_total + (v_quantity * v_price);
    if v_total > 9999999999.99 then raise exception 'total out of range'; end if;
    v_items := v_items || jsonb_build_array(jsonb_build_object('name', v_name, 'variant', v_variant, 'options', v_options, 'quantity', v_quantity, 'unitPrice', v_price, 'subtotal', v_quantity * v_price, 'note', coalesce(v_note, '')));
  end loop;
  if v_total <= 0 then raise exception 'total must be positive'; end if;
  select id into v_restaurant_id from public.restaurants where slug = p_restaurant_slug;
  if v_restaurant_id is null then raise exception 'restaurant not found'; end if;
  -- UPSERT obtains a row lock for this restaurant, making the increment atomic under concurrent checkouts.
  insert into public.order_counters (restaurant_id, last_number) values (v_restaurant_id, 1)
  on conflict (restaurant_id) do update set last_number = public.order_counters.last_number + 1
  returning last_number into v_number;
  insert into public.orders (restaurant_id, order_number, customer_name, customer_phone, items, subtotal, total)
  values (v_restaurant_id, 'ORD-' || lpad(v_number::text, 5, '0'), btrim(p_customer_name), btrim(p_customer_phone), v_items, v_total, v_total)
  returning * into v_order;
  return v_order;
end; $$;

-- This SECURITY DEFINER RPC reads the caller profile itself; callers cannot supply a restaurant id.
create or replace function public.update_order_status(p_order_number text, p_status text)
returns public.orders language plpgsql security definer set search_path = '' as $$
declare v_restaurant_id uuid; v_role text; v_order public.orders;
begin
  if auth.uid() is null then raise exception 'not authenticated'; end if;
  if p_order_number is null or p_order_number !~ '^ORD-[0-9]{5,}$' then raise exception 'invalid order'; end if;
  if p_status not in ('Pending','Diproses','Selesai','Dibatalkan') then raise exception 'invalid status'; end if;
  select restaurant_id, role into v_restaurant_id, v_role from public.profiles where user_id = auth.uid();
  if v_restaurant_id is null or v_role not in ('owner', 'admin') then raise exception 'not authorized'; end if;
  update public.orders set status = p_status where restaurant_id = v_restaurant_id and order_number = p_order_number returning * into v_order;
  if v_order is null then raise exception 'order not found'; end if;
  return v_order;
end; $$;

alter table public.restaurants enable row level security;
alter table public.profiles enable row level security;
alter table public.orders enable row level security;
alter table public.order_counters enable row level security;
create policy "profiles read own" on public.profiles for select to authenticated using (user_id = auth.uid());
create policy "restaurants read own" on public.restaurants for select to authenticated using (id in (select restaurant_id from public.profiles where user_id = auth.uid()));
create policy "orders read own restaurant" on public.orders for select to authenticated using (restaurant_id in (select restaurant_id from public.profiles where user_id = auth.uid()));
-- No INSERT/UPDATE/DELETE policies exist for orders: all mutations use narrow SECURITY DEFINER RPCs.

revoke all on public.restaurants, public.profiles, public.orders, public.order_counters from anon, authenticated;
grant select on public.restaurants, public.profiles, public.orders to authenticated;
grant execute on function public.create_website_order(text, text, text, jsonb) to anon, authenticated;
grant execute on function public.update_order_status(text, text) to authenticated;
revoke execute on function public.create_website_order(text, text, text, jsonb) from public;
revoke execute on function public.update_order_status(text, text) from public;
