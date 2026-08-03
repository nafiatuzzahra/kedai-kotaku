import { FaShoppingCart, FaWhatsapp } from "react-icons/fa";
import logo from "../../assets/kotaku/logo.jpeg";
import Container from "../Common/Container";
import Button from "../Common/Button";
import settings from "../../data/Setting";

function Navbar({ cartCount, onOpenCart }) {
  return <header className="fixed inset-x-0 top-0 z-50 bg-white/95 shadow-sm backdrop-blur-md"><div className="brand-gradient h-1" /><Container className="flex h-[75px] items-center justify-between gap-4"><a href="#home" className="flex items-center gap-3"><img src={logo} alt="Kedai KotaKu" className="h-12 w-12 rounded-full object-cover shadow-sm ring-2 ring-[#f7bc19]" /><div className="hidden leading-tight sm:block"><b className="brand-text block text-lg">Kedai KotaKu</b><span className="text-xs font-semibold text-stone-500">Teman nyantai setiap saat</span></div></a><nav className="hidden gap-6 text-sm font-bold text-stone-700 md:flex"><a className="hover:text-[#ef2226]" href="#home">Beranda</a><a className="hover:text-[#e7007d]" href="#about">Tentang</a><a className="hover:text-[#09aaa9]" href="#menu">Menu</a><a className="hover:text-[#8136be]" href="#contact">Kontak</a></nav><div className="flex items-center gap-2"><button onClick={onOpenCart} className="relative rounded-xl p-3 text-[#8136be] transition hover:bg-purple-50" aria-label="Buka keranjang"><FaShoppingCart size={19} />{cartCount > 0 && <span className="absolute right-0 top-0 grid h-5 w-5 place-items-center rounded-full bg-[#ef2226] text-[10px] font-black text-white">{cartCount}</span>}</button><a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noreferrer"><Button><FaWhatsapp /><span className="ml-2 hidden sm:inline">Pesan</span></Button></a></div></Container></header>;
}
export default Navbar;
