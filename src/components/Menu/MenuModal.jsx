import { useEffect, useState } from "react";

function MenuModal({ menu, onClose, onAdd }) {
  const [variant, setVariant] = useState(null);
  const [options, setOptions] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");

  useEffect(() => {
    if (menu) {
      setVariant(menu.variants[0]);
      setOptions({});
      setQuantity(1);
      setNote("");
    }
  }, [menu]);

  if (!menu || !variant) return null;

  const optionTotal = Object.values(options).flat().reduce((sum, value) => sum + value.price, 0);
  const total = (variant.price + optionTotal) * quantity;
  const isDrink = variant.options.some((group) => group.id === "topping");

  function selectOption(group, value) {
    setOptions((current) => {
      const selected = current[group.id] || [];
      return { ...current, [group.id]: group.type === "checkbox" ? (selected.some((item) => item.label === value.label) ? selected.filter((item) => item.label !== value.label) : [...selected, value]) : [value] };
    });
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end bg-black/50 p-0 sm:items-center sm:justify-center sm:p-4" role="dialog" aria-modal="true">
      <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:max-h-[90vh] sm:rounded-3xl sm:p-6">
        <div className="flex items-start justify-between gap-4"><div><p className="text-sm font-bold text-red-500">PESAN MENU</p><h2 className="text-2xl font-black text-stone-900">{menu.name}</h2></div><button onClick={onClose} className="rounded-full p-2 text-xl text-stone-500" aria-label="Tutup">×</button></div>
        <div className="mt-6"><p className="mb-2 font-bold">Varian</p>{menu.variants.map((item) => <label key={item.id} className="mb-2 flex cursor-pointer items-start justify-between gap-3 rounded-xl border p-3 has-[:checked]:border-red-500 has-[:checked]:bg-red-50"><span><input className="mr-3 mt-1" type="radio" checked={variant.id === item.id} onChange={() => { setVariant(item); setOptions({}); }} /><span className="inline-block align-top"><b>{item.name}</b>{item.description && <small className="mt-1 block max-w-[250px] text-stone-500">{item.description}</small>}</span></span><span className="whitespace-nowrap">Rp {item.price.toLocaleString("id-ID")}</span></label>)}</div>
        {variant.options.map((group) => <div key={group.id} className="mt-5"><p className="mb-2 font-bold">{group.title}{group.required && <span className="ml-1 text-red-500">*</span>}</p>{group.values.map((value) => { const checked = (options[group.id] || []).some((item) => item.label === value.label); return <label key={value.label} className="mb-2 flex cursor-pointer items-center justify-between rounded-xl border p-3"><span><input className="mr-3" type={group.type} name={group.type === "radio" ? group.id : undefined} checked={checked} onChange={() => selectOption(group, value)} />{value.label}</span>{value.price > 0 && <span>+Rp {value.price.toLocaleString("id-ID")}</span>}</label>; })}</div>)}
        <div className="mt-5"><label className="font-bold" htmlFor="note">Catatan pesanan</label><textarea id="note" value={note} onChange={(event) => setNote(event.target.value)} className="mt-2 w-full rounded-xl border p-3" rows="2" placeholder={isDrink ? "Contoh: kurang es atau tanpa gula" : "Contoh: jangan terlalu pedas"} /></div>
        <div className="mt-5 flex items-center justify-between"><div className="flex items-center gap-4 rounded-xl bg-stone-100 p-2"><button onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="h-8 w-8 rounded-lg bg-white text-xl">−</button><span className="w-4 text-center font-bold">{quantity}</span><button onClick={() => setQuantity((value) => value + 1)} className="h-8 w-8 rounded-lg bg-white text-xl">+</button></div><p className="font-bold">Rp {total.toLocaleString("id-ID")}</p></div>
        <button onClick={() => onAdd({ name: menu.name, variant: variant.name, options: Object.values(options).flat(), quantity, note, total: variant.price + optionTotal })} className="mt-6 w-full rounded-xl bg-red-500 py-3 font-bold text-white transition hover:bg-red-600">Tambah ke keranjang</button>
      </div>
    </div>
  );
}

export default MenuModal;
