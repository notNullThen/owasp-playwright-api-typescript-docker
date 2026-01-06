import { APIRequestContext } from "@playwright/test";
import APIEndpointBase, { APIContext } from "../api-base/api-endpoint-base";
import { ProductData, ResponseType } from "./types/general-types";

type Data = {
  id: number;
  coupon?: string;
  UserId: number;
  createdAt: Date;
  updatedAt: Date;
  Products: ProductData<RestBasketItemData>;
};

type RestBasketItemData = {
  id: number;
  ProductId: number;
  BasketId: number;
  quantity: number;
  updatedAt: string;
  createdAt: string;
};

type RestBasketResponse = ResponseType<Data>;

export default class RestBasketAPI extends APIEndpointBase {
  constructor(context: APIContext) {
    super(context, "rest/basket");
  }

  getBasket(userId?: string) {
    return this.action<RestBasketResponse>({ url: userId ? userId : null, method: "GET" });
  }
}
