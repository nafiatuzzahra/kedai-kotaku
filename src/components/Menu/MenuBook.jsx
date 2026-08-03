import foodMie from "../../assets/kotaku/menu-mie.jpeg";
import foodNasi from "../../assets/kotaku/menu-nasi.jpeg";
import drinks from "../../assets/kotaku/menu-minuman.jpeg";

const formatRupiah = (price) => `Rp ${price.toLocaleString("id-ID")}`;

function MenuList({ title, items, onSelect }) {
  return <section className="mb-8 last:mb-0"><h3 className="inline-block rounded-r-full bg-[#ef2226] px-4 py-1.5 text-base font-black uppercase tracking-wide text-white sm:text-lg">{title}</h3><div className="mt-3 space-y-1">{items.map((item) => <button key={item.id} onClick={() => onSelect(item)} className="group flex w-full items-baseline gap-2 rounded-lg px-2 py-2.5 text-left transition hover:bg-[#fff0e7]"><span className="min-w-0 flex-1 text-sm font-bold leading-5 text-[#37251f] group-hover:text-[#ef2226] sm:text-base">{item.name}</span><span className="min-w-2 flex-1 border-b border-dotted border-stone-300" /><span className="whitespace-nowrap text-sm font-black text-[#ef2226] sm:text-base">{formatRupiah(item.variants[0].price)}{item.variants.length > 1 && "+"}</span></button>)}</div></section>;
}

function BookPage({ children, image, label }) {
  return <article className="relative overflow-hidden rounded-[1.4rem] border border-[#e6cda8] bg-[#fff8e9] p-4 shadow-[0_18px_35px_-24px_rgba(55,37,31,.7)] sm:rounded-[1.7rem] sm:p-8"><div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-[#ef2226] via-[#f7bc19] to-[#8136be] sm:w-2" /><p className="mb-4 pl-1 text-[10px] font-black tracking-[.16em] text-[#8136be] sm:mb-5 sm:text-xs sm:tracking-[.2em]">KEDAI KOTAKU · {label}</p>{image && <img src={image} alt={`Poster ${label}`} className="mb-5 h-40 w-full rounded-2xl object-cover object-top shadow-md sm:mb-6 sm:h-48" />}{children}</article>;
}

function MenuBook({ items, type, onSelect }) {
  const grouped = items.reduce((groups, item) => ({ ...groups, [item.category]: [...(groups[item.category] || []), item] }), {});
  const isFood = type === "Makanan";
  const foodLeft = ["Mie", "Camilan"];
  const foodRight = ["Nasi Goreng", "Chicken Strips", "Chicken Saus", "Ayam Saus"];
  const drinkPages = [["Best Seller", "Tea Series"], ["Milk Series"], ["Juragan Series", "Hot Series"]];

  if (isFood) return <div className="relative mx-auto mt-8 max-w-6xl sm:mt-10"><div className="absolute inset-y-5 left-1/2 hidden w-5 -translate-x-1/2 rounded-full bg-[#4d281c] shadow-inner lg:block" /><div className="grid gap-4 sm:gap-6 lg:grid-cols-2"><BookPage label="Food Menu · Halaman 1" image={foodMie}>{foodLeft.map((name) => <MenuList key={name} title={name} items={grouped[name] || []} onSelect={onSelect} />)}</BookPage><BookPage label="Food Menu · Halaman 2" image={foodNasi}>{foodRight.map((name) => <MenuList key={name} title={name} items={grouped[name] || []} onSelect={onSelect} />)}</BookPage></div></div>;

  return <div className="relative mx-auto mt-8 max-w-6xl sm:mt-10"><div className="mb-4 overflow-hidden rounded-[1.4rem] border border-[#e6cda8] bg-white p-2 shadow-sm sm:mb-6 sm:rounded-[1.7rem] sm:p-3"><img src={drinks} alt="Poster drink menu Kedai KotaKu" className="h-48 w-full rounded-2xl object-cover object-top sm:h-80" /></div><div className="grid gap-4 sm:gap-6 lg:grid-cols-3">{drinkPages.map((page, index) => <BookPage key={page.join()} label={`Drink Menu · Halaman ${index + 1}`}>{page.map((name) => <MenuList key={name} title={name} items={grouped[name] || []} onSelect={onSelect} />)}</BookPage>)}</div></div>;
}

export default MenuBook;
