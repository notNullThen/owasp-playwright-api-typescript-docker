import APIEndpointBase, { APIContext } from "../api-base/api-endpoint-base";

type BasketItemsPayload = {
  ProductId: number;
  BasketId: string;
  quantity: number;
};

export default class BasketItemsAPI extends APIEndpointBase {
  constructor(context: APIContext) {
    super(context, "api/BasketItems");
  }

  postBasketItems(payload?: BasketItemsPayload) {
    return this.action({ method: "POST", body: payload });
  }

  deleteBasketItems(userId?: string) {
    return this.action({ method: "DELETE", url: userId ? userId : null });
  }
}
