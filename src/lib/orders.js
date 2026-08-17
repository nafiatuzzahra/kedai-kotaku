import { isSupabaseConfigured, supabase } from "./supabase";

export const WEBSITE_FEE_PER_COMPLETED_ORDER = 500;
export const ORDER_STATUSES = ["Pending", "Diproses", "Selesai", "Dibatalkan"];

function requireSupabase() {
  if (!isSupabaseConfigured) throw new Error("Layanan pesanan belum dikonfigurasi.");
}

export function mapOrder(order) {
  return { id: order.order_number, databaseId: order.id, createdAt: order.created_at, updatedAt: order.updated_at, customerName: order.customer_name, customerPhone: order.customer_phone, items: order.items || [], subtotal: Number(order.subtotal), total: Number(order.total), status: order.status, source: order.source, restaurantName: order.restaurant_name, restaurantSlug: order.restaurant_slug };
}

export function getOrderFee(order) { return order.status === "Selesai" ? WEBSITE_FEE_PER_COMPLETED_ORDER : 0; }

export async function createOrder({ customerName, customerPhone, items }) {
  requireSupabase();
  const restaurantSlug = import.meta.env.VITE_RESTAURANT_SLUG;
  if (!restaurantSlug) throw new Error("Restaurant belum dikonfigurasi.");
  if (!customerName.trim() || !customerPhone.trim() || !items.length) throw new Error("Lengkapi data pemesan dan pesanan terlebih dahulu.");
  const orderItems = items.map((item) => ({ name: item.name, variant: item.variant, options: item.options || [], quantity: item.quantity, unitPrice: Number(item.total), subtotal: Number(item.total) * Number(item.quantity), note: item.note || "" }));
  const { data, error } = await supabase.rpc("create_website_order", { p_restaurant_slug: restaurantSlug, p_customer_name: customerName.trim(), p_customer_phone: customerPhone.trim(), p_items: orderItems });
  if (error) throw new Error("Pesanan belum dapat disimpan. Periksa koneksi lalu coba lagi.");
  return mapOrder(data);
}

export async function getOrders() {
  requireSupabase();
  const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
  if (error) throw new Error("Data pembelian belum dapat dimuat.");
  return data.map(mapOrder);
}

export async function updateOrderStatus(orderNumber, status) {
  requireSupabase();
  if (!ORDER_STATUSES.includes(status)) throw new Error("Status pembelian tidak valid.");
  const { data, error } = await supabase.rpc("update_order_status", { p_order_number: orderNumber, p_status: status });
  if (error) throw new Error("Status belum dapat diperbarui.");
  return mapOrder(data);
}

export async function getMyProfile() {
  requireSupabase();
  const { data, error } = await supabase.from("profiles").select("name, role, restaurant_id, restaurants(name, slug)").single();
  if (error) throw new Error("Profil akses tidak ditemukan.");
  return data;
}

export async function getDeveloperReport({ from = null, to = null, restaurantId = null } = {}) {
  requireSupabase();
  const { data, error } = await supabase.rpc("get_developer_order_report", { p_from: from, p_to: to, p_restaurant_id: restaurantId });
  if (error) throw new Error("Laporan developer tidak dapat dimuat.");
  return (data || []).map(mapOrder);
}

export async function getDeveloperRestaurants() {
  requireSupabase();
  const { data, error } = await supabase.rpc("get_developer_restaurant_report");
  if (error) throw new Error("Daftar restaurant tidak dapat dimuat.");
  return data || [];
}
