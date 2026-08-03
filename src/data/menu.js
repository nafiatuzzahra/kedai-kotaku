const menu = [
  {
    id: 1,

    category: "Makanan",

    name: "Mie Jebew",

    image: "/images/mie-jebew.jpg",

    badge: "Best Seller",

    available: true,

    description: "Mie pedas favorit Kedai KotaKu.",

    variants: [
      {
        id: 1,
        name: "Ori",
        price: 10000,
        options: [
          {
            id: "level",

            title: "Level Pedas",

            type: "radio",

            required: true,

            values: [
              {
                label: "Tidak Pedas",
                price: 0,
              },
              {
                label: "Sedang",
                price: 0,
              },
              {
                label: "Pedas",
                price: 0,
              },
            ],
          },

          {
            id: "topping",

            title: "Topping",

            type: "checkbox",

            values: [
              {
                label: "Boba",

                price: 1000,
              },

              {
                label: "Jelly",

                price: 1000,
              },
            ],
          },
        ],
      },

      {
        id: 2,
        name: "Pangsit/Bakso",
        price: 13000,

        options: [
          {
            id: "pangsit",

            title: "Pangsit",

            type: "radio",

            required: true,

            values: [
              {
                label: "Goreng",
                price: 0,
              },
              {
                label: "Rebus",
                price: 0,
              },
            ],
          },

          {
            id: "bakso",

            title: "Bakso",

            type: "radio",

            required: true,

            values: [
              {
                label: "Goreng",
                price: 0,
              },
              {
                label: "Rebus",
                price: 0,
              },
            ],
          },
        ],
      },
    ],
  },
];

export default menu;
