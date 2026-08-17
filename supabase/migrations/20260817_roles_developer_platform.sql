-- Apply after 20260817_initial.sql. This migration keeps developer access
-- separate from restaurant owner/admin profiles.
alter table public.restaurants
  add column if not exists status text not null default 'Aktif'
  check (status in ('Aktif', 'Nonaktif'));

create table if not exists public.developer_access (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.developer_access enable row level security;

-- A developer may only prove their own access; no client can grant developer access.
create policy "developer reads own access"
  on public.developer_access for select to authenticated
  using (user_id = auth.uid());

revoke all on public.developer_access from anon, authenticated;
grant select on public.developer_access to authenticated;

-- Platform reports deliberately exclude customer name, phone, items and notes.
-- Restaurant/date filters are inputs only after developer authorization is checked.
create or replace function public.get_developer_order_report(
  p_from date default null,
  p_to date default null,
  p_restaurant_id uuid default null
) returns table (
  id uuid,
  order_number text,
  created_at timestamptz,
  updated_at timestamptz,
  total numeric,
  status text,
  restaurant_name text,
  restaurant_slug text
) language plpgsql security definer set search_path = '' as $$
begin
  if auth.uid() is null or not exists (
    select 1 from public.developer_access where user_id = auth.uid()
  ) then
    raise exception 'not authorized';
  end if;
  if p_from is not null and p_to is not null and p_from > p_to then
    raise exception 'invalid date range';
  end if;
  return query
    select o.id, o.order_number, o.created_at, o.updated_at, o.total, o.status, r.name, r.slug
    from public.orders o
    join public.restaurants r on r.id = o.restaurant_id
    where (p_restaurant_id is null or o.restaurant_id = p_restaurant_id)
      and (p_from is null or o.created_at >= p_from)
      and (p_to is null or o.created_at < (p_to + 1))
    order by o.created_at desc;
end; $$;

create or replace function public.get_developer_restaurant_report()
returns table (
  id uuid,
  name text,
  slug text,
  status text,
  owner_name text,
  completed_orders bigint,
  total_fee numeric
) language plpgsql security definer set search_path = '' as $$
begin
  if auth.uid() is null or not exists (
    select 1 from public.developer_access where user_id = auth.uid()
  ) then
    raise exception 'not authorized';
  end if;
  return query
    select r.id, r.name, r.slug, r.status,
      (select p.name from public.profiles p where p.restaurant_id = r.id and p.role = 'owner' limit 1),
      count(o.id) filter (where o.status = 'Selesai')::bigint,
      (count(o.id) filter (where o.status = 'Selesai') * 500)::numeric
    from public.restaurants r
    left join public.orders o on o.restaurant_id = r.id
    group by r.id, r.name, r.slug, r.status
    order by r.name;
end; $$;

revoke execute on function public.get_developer_order_report(date, date, uuid) from public;
revoke execute on function public.get_developer_restaurant_report() from public;
grant execute on function public.get_developer_order_report(date, date, uuid) to authenticated;
grant execute on function public.get_developer_restaurant_report() to authenticated;

-- Run this once for each pre-created Supabase Auth user that should have
-- platform access. Do not add the user to public.profiles.
-- insert into public.developer_access (user_id) values ('AUTH_USER_UUID');
