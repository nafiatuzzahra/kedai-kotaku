function MenuCard({ item, onClick }) {
  const isDrink = item.category !== "Mie" && item.category !== "Camilan" && item.category !== "Nasi Goreng" && item.category !== "Chicken Strips" && item.category !== "Chicken Saus" && item.category !== "Ayam Saus";
  return (
    <button onClick={() => onClick(item)} className="group relative overflow-hidden rounded-3xl border border-[#073d2b]/10 bg-white p-2 text-left shadow-[0_12px_35px_-22px_rgba(6,61,43,.45)] transition duration-300 hover:-translate-y-1 hover:border-[#e72618]/30 hover:shadow-[0_20px_45px_-20px_rgba(231,38,24,.32)]">
      <div className={`relative flex h-48 items-end overflow-hidden rounded-[1.15rem] p-5 ${isDrink ? "bg-gradient-to-br from-[#dff4e7] via-[#fff7db] to-[#f9d889]" : "bg-gradient-to-br from-[#ffddd0] via-[#fff1d7] to-[#f7d36c]"}`}>
        <span className="absolute -right-5 -top-8 text-[10rem] leading-none opacity-20">{isDrink ? "◒" : "◌"}</span>
        <span className="relative rounded-full bg-white/75 px-3 py-1 text-xs font-bold tracking-wider text-[#073d2b]">{item.category.toUpperCase()}</span>
        <span className="absolute bottom-3 right-4 text-5xl">{isDrink ? "🥤" : "🍜"}</span>
      </div>
      <div className="px-3 pb-3 pt-5"><div className="flex items-start justify-between gap-4"><h3 className="text-xl font-extrabold text-[#073d2b]">{item.name}</h3><span className="text-lg text-[#e72618] transition group-hover:translate-x-1">→</span></div><p className="mt-3 text-sm text-stone-500">{item.description}</p><p className="mt-5 border-t border-stone-100 pt-4 text-sm font-bold text-stone-700">Mulai <span className="text-base text-[#e72618]">Rp {item.variants[0].price.toLocaleString("id-ID")}</span></p></div>
    </button>
  );
}
export default MenuCard;
