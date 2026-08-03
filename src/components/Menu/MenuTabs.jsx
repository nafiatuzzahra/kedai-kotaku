function MenuTabs({ active, setActive }) {
  return (
    <div className="mx-auto mb-10 flex w-fit rounded-2xl bg-white p-1.5 shadow-sm ring-1 ring-pink-200">
      <button
        onClick={() => setActive("Makanan")}
        className={`rounded-xl px-6 py-2.5 text-sm font-bold transition ${
          active === "Makanan" ? "bg-[#ef2226] text-white shadow-lg" : "text-stone-500 hover:text-[#ef2226]"
        }`}
      >
        Makanan
      </button>

      <button
        onClick={() => setActive("Minuman")}
        className={`rounded-xl px-6 py-2.5 text-sm font-bold transition ${
          active === "Minuman" ? "bg-[#09aaa9] text-white shadow-lg" : "text-stone-500 hover:text-[#09aaa9]"
        }`}
      >
        Minuman
      </button>
    </div>
  );
}

export default MenuTabs;
