type Product = {
  name: string;
  description: string;
  price: number;
  soldOut: boolean;
};

export const productsData = {
  raspberryJuice: {
    name: "Raspberry Juice (1000ml)",
    description: "Made from blended Raspberry Pi, water and sugar.",
    price: 4.99,
    soldOut: false,
  } as Product,
  bananaJuice: {
    name: "Banana Juice (1000ml)",
    description: "Monkeys love it the most.",
    price: 1.99,
    soldOut: true,
  },
};
