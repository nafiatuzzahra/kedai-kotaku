import { useState } from "react";
import makanan from "../../data/makanan";
import minuman from "../../data/minuman";
import MenuTabs from "./MenuTabs";
import MenuBook from "./MenuBook";
import MenuModal from "./MenuModal";

function Menu({ onAddToCart }) {
  const [active, setActive] = useState("Makanan");
  const [selectedMenu, setSelectedMenu] = useState(null);
  const menu = active === "Makanan" ? makanan : minuman;

  return (
    <section id="menu" className="bg-gradient-to-b from-[#fffdf7] via-[#fff7fb] to-[#f1fbff] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="text-center text-sm font-black tracking-[0.2em] text-[#e7007d]">PILIH FAVORITMU</p>
        <h2 className="brand-text mt-3 text-center text-3xl font-black sm:text-4xl">Menu Kedai KotaKu</h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-stone-600">Makanan hangat dan minuman segar yang ada di kedai kami.</p>
        <MenuTabs active={active} setActive={setActive} />
        <MenuBook items={menu} type={active} onSelect={setSelectedMenu} />
      </div>
      <MenuModal
        key={selectedMenu?.id || "closed"}
        menu={selectedMenu}
        onClose={() => setSelectedMenu(null)}
        onAdd={(item) => {
          onAddToCart(item);
          setSelectedMenu(null);
        }}
      />
    </section>
  );
}

export default Menu;
