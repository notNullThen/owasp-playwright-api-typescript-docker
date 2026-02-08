import APIFactory, { APIContext } from "../api-base/api-endpoint-base";
import { RestBasketItemData } from "./rest-basket-api";
import { ProductDataBase, ResponseBase } from "./types/general-types";

type RestBasketProductData = ProductDataBase<RestBasketItemData>;
type ProductsResponse = ResponseBase<RestBasketProductData[]>;

export default class ProductsAPI extends APIFactory {
  constructor(context: APIContext) {
    super(context, "rest/products");
  }

  getSearchProducts(query: string) {
    const encodedQuery = encodeURIComponent(query);
    return this.action<ProductsResponse>({ method: "GET", url: `search?q=${encodedQuery}` });
  }
}
