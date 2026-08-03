const drink = (id, name, category, price, description = "Minuman segar teman nyantai.") => ({
  id,
  name,
  category,
  description,
  variants: [{
    id: "regular",
    name: "Regular",
    price,
    options: [{
      id: "topping",
      title: "Topping (opsional)",
      type: "checkbox",
      values: [
        { label: "Boba", price: 1000 },
        { label: "Jelly", price: 1000 },
      ],
    }],
  }],
});

const minuman = [
  drink("milkshake-coklat", "Milkshake Coklat", "Best Seller", 12000, "Gratis topping boba atau jelly."), drink("kopi-susu", "Kopi Susu Gula Aren", "Best Seller", 12000, "Gratis topping boba atau jelly."), drink("milkshake-matcha", "Milkshake Matcha", "Best Seller", 12000, "Gratis topping boba atau jelly."), drink("teh-tarik-spesial", "Spesial Teh Tarik", "Best Seller", 12000, "Gratis topping boba atau jelly."), drink("green-tea", "Milkshake Green Tea", "Best Seller", 12000, "Gratis topping boba atau jelly."),
  drink("es-teh-legit", "Es Teh Legit", "Tea Series", 3000), drink("es-teh-kampul", "Es Teh Kampul", "Tea Series", 4000), drink("es-teh-boba", "Es Teh Boba", "Tea Series", 5000), drink("es-teh-susu", "Es Teh Susu", "Tea Series", 5000), drink("es-teh-tarik", "Es Teh Tarik", "Tea Series", 6000), drink("es-teh-susu-boba", "Es Teh Susu Boba / Jelly", "Tea Series", 6000), drink("es-teh-tarik-boba", "Es Teh Tarik Boba / Jelly", "Tea Series", 7000),
  ...["Dark Choco", "Choco Malt", "Choco Oreo", "Choco Hazelnut", "Coklat Biscuit", "Milk Tea", "Thai Tea", "Vanilla", "Taro", "Tiramisu", "Red Velvet", "Bubble Gum", "Mangga", "Strawberry", "Cappuccino", "Vanilla Latte", "Coffee Caramel"].map((name, index) => drink(`milk-${index}`, name, "Milk Series", 10000)),
  ...["Dark Choco", "Choco Malt", "Choco Oreo", "Choco Hazelnut", "Coklat Biscuit", "Milk Tea", "Thai Tea", "Vanilla", "Taro", "Tiramisu", "Red Velvet", "Bubble Gum", "Mangga", "Strawberry", "Cappuccino", "Vanilla Latte", "Coffee Caramel"].map((name, index) => drink(`juragan-${index}`, `Juragan ${name}`, "Juragan Series", 6000)),
  drink("hot-best", "Hot Best Seller", "Hot Series", 15000), drink("hot-milk", "Hot Milk Seri", "Hot Series", 13000), drink("hot-juragan", "Hot Juragan Series", "Hot Series", 9000),
];

export default minuman;
