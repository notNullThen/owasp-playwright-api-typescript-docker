import APIEndpointBase, { APIContext } from "../api-base/api-endpoint-base";
import { ResponseBase } from "./types/general-types";

type BasketItemsPayload = {
  ProductId: number;
  BasketId: string;
  quantity: number;
};

type BasketItemData = {
  id: number;
  ProductId: number;
  BasketId: string;
  quantity: number;
  updatedAt: string;
  createdAt: string;
};

type BasketItemsResponse = ResponseBase<BasketItemData>;

export default class BasketItemsAPI extends APIEndpointBase {
  constructor(context: APIContext) {
    super(context, "api/BasketItems");
  }

  postBasketItems(payload?: BasketItemsPayload) {
    return this.action<BasketItemsResponse>({ method: "POST", body: payload });
  }

  deleteBasketItems(userId?: string) {
    return this.action({ method: "DELETE", url: userId ? userId : null });
  }
}
