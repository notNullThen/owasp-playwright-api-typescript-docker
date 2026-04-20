import UsersAPI from "./users-api";
import SecurityAnswersAPI from "./security-answers-api";
import RestUserAPI from "./rest-user-api";
import { APIContext } from "simple-api-playwright";
import BasketItemsAPI from "./basket-items-api";
import RestBasketAPI from "./rest-basket-api";
import ProductsAPI from "./products-api";

export default class APIEndpoints {
  users: UsersAPI;
  restUser: RestUserAPI;
  securityAnswers: SecurityAnswersAPI;
  basketItems: BasketItemsAPI;
  restBasket: RestBasketAPI;
  products: ProductsAPI;

  constructor(private context: APIContext) {
    this.users = new UsersAPI(this.context);
    this.restUser = new RestUserAPI(this.context);
    this.securityAnswers = new SecurityAnswersAPI(this.context);
    this.basketItems = new BasketItemsAPI(this.context);
    this.restBasket = new RestBasketAPI(this.context);
    this.products = new ProductsAPI(this.context);
  }
}
