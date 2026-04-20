import { APIEndpointBase, APIContext } from "simple-api-playwright";
import { RestBasketItemData } from "./rest-basket-api";
import { ProductDataBase, ResponseBase } from "./types/general-types";

type RestBasketProductData = ProductDataBase<RestBasketItemData>;
type ProductsResponse = ResponseBase<RestBasketProductData[]>;

export default class ProductsAPI extends APIEndpointBase {
  constructor(context: APIContext) {
    super(context, "rest/products");
  }

  getSearchProducts(query: string) {
    const encodedQuery = encodeURIComponent(query);
    return this.action<ProductsResponse>({ method: "GET", url: `search?q=${encodedQuery}` });
  }
}
