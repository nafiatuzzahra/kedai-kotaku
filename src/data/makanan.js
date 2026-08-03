const choice = (id, title, labels, required = true) => ({ id, title, type: "radio", required, values: labels.map((label) => ({ label, price: 0 })) });
const sauces = () => choice("saus", "Pilih saus", ["Cheese", "Lava", "Tomat", "Mayo"]);
const style = (id, title) => choice(id, title, ["Goreng", "Rebus"]);
const v = (id, name, price, description = "", options = []) => ({ id, name, price, description, options });
const priceVariant = (price, description = "") => v(String(price), `Porsi Rp ${price.toLocaleString("id-ID")}`, price, description);

const makanan = [
  { id: "mie-jebew", name: "Mie Jebew", category: "Mie", description: "Mie pedas khas Kedai KotaKu.", variants: [
    v("special", "Spesial", 18000, "Pangsit goreng + bakso goreng/rebus + telur ceplok.", [style("bakso", "Bakso")]),
    v("mix-1", "Mix 1", 16000, "Telur ceplok + pangsit/bakso goreng/rebus.", [choice("isian", "Pilih isian", ["Pangsit", "Bakso"]), style("isian-style", "Pilih cara masak")]),
    v("mix-2", "Mix 2", 15000, "Pangsit + bakso goreng/rebus.", [style("bakso", "Bakso")]),
    v("pangsit-bakso", "Pangsit / Bakso", 13000, "Pilih pangsit atau bakso, goreng atau rebus.", [choice("isian", "Pilih isian", ["Pangsit", "Bakso"]), style("isian-style", "Pilih cara masak")]),
    v("ori", "Ori", 10000, "Mie jebew original."),
  ] },
  { id: "mie-yamin", name: "Mie Yamin", category: "Mie", description: "Mie yamin rasa asin atau manis.", variants: [
    v("special", "Spesial", 20000, "Pangsit + bakso + telur ceplok.", [choice("rasa", "Pilih rasa", ["Asin", "Manis"])]),
    v("mix-1", "Mix 1", 18000, "Pangsit/bakso + telur ceplok.", [choice("rasa", "Pilih rasa", ["Asin", "Manis"]), choice("isian", "Pilih isian", ["Pangsit", "Bakso"])]),
    v("mix-2", "Mix 2", 16000, "Pangsit + bakso.", [choice("rasa", "Pilih rasa", ["Asin", "Manis"])]),
    v("ori", "Ori", 13000, "Mie yamin original.", [choice("rasa", "Pilih rasa", ["Asin", "Manis"])]),
  ] },
  { id: "wonton", name: "Wonton", category: "Camilan", description: "Wonton dengan pilihan penyajian favoritmu.", variants: [
    v("ori", "Wonton Ori", 10000, "Harga tersedia Rp10.000 / Rp15.000.", [choice("sajian", "Pilih sajian", ["Kuah", "Chili Oil", "Jebew"])]),
    v("ori-besar", "Wonton Ori besar", 15000, "Porsi besar.", [choice("sajian", "Pilih sajian", ["Kuah", "Chili Oil", "Jebew"])]),
    v("mix", "Wonton Mix", 10000, "Wonton + bakso.", [choice("sajian", "Pilih sajian", ["Kuah", "Chili Oil", "Jebew"])]),
    v("mix-besar", "Wonton Mix besar", 15000, "Wonton + bakso, porsi besar.", [choice("sajian", "Pilih sajian", ["Kuah", "Chili Oil", "Jebew"])]),
  ] },
  { id: "pangsit-goreng", name: "Pangsit Goreng", category: "Camilan", description: "Pangsit goreng renyah dengan pilihan saus.", variants: [v("regular", "Pangsit Goreng", 10000, "Porsi regular.", [sauces()]), v("besar", "Pangsit Goreng Besar", 15000, "Porsi besar.", [sauces()]), v("mix", "Pangsit Goreng Mix", 10000, "Pangsit + bakso, porsi regular.", [sauces()]), v("mix-besar", "Pangsit Goreng Mix Besar", 15000, "Pangsit + bakso, porsi besar.", [sauces()])] },
  { id: "potato", name: "Potato", category: "Camilan", description: "Kentang goreng dengan saus pilihan.", variants: [v("regular", "Potato Regular", 10000, "Porsi regular.", [sauces()]), v("besar", "Potato Besar", 15000, "Porsi besar.", [sauces()])] },
  { id: "nasgor-spesial", name: "Nasgor Spesial", category: "Nasi Goreng", description: "Chicken strips + pangsit goreng + bakso goreng + telur ceplok.", variants: [priceVariant(20000), priceVariant(22000)] },
  { id: "nasgor-mix", name: "Nasgor Mix", category: "Nasi Goreng", description: "Chicken strips + telur ceplok.", variants: [priceVariant(18000), priceVariant(20000)] },
  { id: "nasgor-chicken", name: "Nasgor Chicken Strips", category: "Nasi Goreng", description: "Nasi goreng dengan chicken strips.", variants: [priceVariant(15000), priceVariant(18000)] },
  { id: "nasgor-telur", name: "Nasgor Telur", category: "Nasi Goreng", description: "Telur ceplok + ayam tabur.", variants: [priceVariant(13000), priceVariant(18000)] },
  { id: "nasgor-ayam", name: "Nasgor Ayam Tabur", category: "Nasi Goreng", description: "Nasi goreng ayam tabur.", variants: [priceVariant(10000), priceVariant(15000)] },
  { id: "chicken-nasi", name: "Chicken Strips + Nasi", category: "Chicken Strips", description: "Saus cheese, lava, tomat, atau mayo.", variants: [v("regular", "Regular", 15000, "Chicken strips dengan nasi.", [sauces()]), v("medium", "Medium", 18000, "Chicken strips dengan nasi.", [sauces()]), v("large", "Large", 20000, "Chicken strips dengan nasi.", [sauces()])] },
  { id: "chicken-potato", name: "Chicken Strips + Potato", category: "Chicken Strips", description: "Saus cheese, lava, tomat, atau mayo.", variants: [v("regular", "Regular", 15000, "Chicken strips dengan kentang.", [sauces()]), v("medium", "Medium", 18000, "Chicken strips dengan kentang.", [sauces()]), v("large", "Large", 20000, "Chicken strips dengan kentang.", [sauces()])] },
  { id: "cs-mentega-nasi", name: "CS Saus Mentega + Nasi", category: "Chicken Saus", description: "Chicken strips saus mentega dengan nasi.", variants: [priceVariant(17000), priceVariant(20000)] },
  { id: "cs-lada-nasi", name: "CS Saus Lada Hitam + Nasi", category: "Chicken Saus", description: "Chicken strips saus lada hitam dengan nasi.", variants: [priceVariant(17000), priceVariant(20000)] },
  { id: "cs-mentega-potato", name: "CS Saus Mentega + Potato", category: "Chicken Saus", description: "Chicken strips saus mentega dengan kentang.", variants: [priceVariant(17000), priceVariant(20000)] },
  { id: "cs-lada-potato", name: "CS Saus Lada Hitam + Potato", category: "Chicken Saus", description: "Chicken strips saus lada hitam dengan kentang.", variants: [priceVariant(17000), priceVariant(20000)] },
  { id: "ayam-lada-nasi", name: "Ayam Saus Lada Hitam + Nasi", category: "Ayam Saus", description: "Ayam saus lada hitam dengan nasi.", variants: [priceVariant(15000), priceVariant(18000), priceVariant(20000)] },
  { id: "ayam-mentega-nasi", name: "Ayam Saus Mentega + Nasi", category: "Ayam Saus", description: "Ayam saus mentega dengan nasi.", variants: [priceVariant(15000), priceVariant(18000), priceVariant(20000)] },
  { id: "ayam-lada-potato", name: "Ayam Saus Lada Hitam + Potato", category: "Ayam Saus", description: "Ayam saus lada hitam dengan kentang.", variants: [priceVariant(15000), priceVariant(18000), priceVariant(20000)] },
  { id: "ayam-mentega-potato", name: "Ayam Saus Mentega + Potato", category: "Ayam Saus", description: "Ayam saus mentega dengan kentang.", variants: [priceVariant(15000), priceVariant(18000), priceVariant(20000)] },
];

export default makanan;
