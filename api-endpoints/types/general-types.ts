export type ResponseType<T> = {
  status: string;
  data: T;
};
export type ProductData<T> = {
  id: number;
  name: string;
  description: string;
  price: number;
  deluxePrice: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  BasketItem: T;
};
