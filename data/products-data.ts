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
};
