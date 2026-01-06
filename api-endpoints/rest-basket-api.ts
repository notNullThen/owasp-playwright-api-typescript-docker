import { APIRequestContext } from "@playwright/test";
import APIEndpointBase from "../api-base/api-endpoint-base";

export default class RestBasketAPI extends APIEndpointBase {
  constructor(context: APIRequestContext) {
    super(context, "rest/basket");
  }

  getBasket(userId?: string) {
    return this.action({ url: userId ? userId : null, method: "GET" });
  }
}
