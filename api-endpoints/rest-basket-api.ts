import APIFactory, { APIContext } from "../api-base/api-endpoint-base";
import { ProductDataBase, ResponseBase } from "./types/general-types";

export type RestBasketData = {
  id: number;
  coupon?: string;
  UserId: number;
  createdAt: Date;
  updatedAt: Date;
  Products: ProductDataBase<RestBasketItemData>;
};

export type RestBasketItemData = {
  id: number;
  ProductId: number;
  BasketId: number;
  quantity: number;
  updatedAt: string;
  createdAt: string;
};

type RestBasketResponse = ResponseBase<RestBasketData>;

export default class RestBasketAPI extends APIFactory {
  constructor(context: APIContext) {
    super(context, "rest/basket");
  }

  getBasket(userId?: string) {
    return this.action<RestBasketResponse>({ url: userId ? userId : null, method: "GET" });
  }
}
