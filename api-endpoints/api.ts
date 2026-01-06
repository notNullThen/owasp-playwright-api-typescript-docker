import UsersAPI from "./users-api";
import SecurityAnswersAPI from "./security-answers-api";
import RestUserAPI from "./rest-user-api";
import { APIContext } from "../api-base/api-endpoint-base";
import BasketItemsAPI from "./basket-items-api";
import RestBasketAPI from "./rest-basket-api";

export default class API {
  constructor(private context: APIContext) {}

  users = new UsersAPI(this.context);
  restUser = new RestUserAPI(this.context);
  securityAnswers = new SecurityAnswersAPI(this.context);
  basketItems = new BasketItemsAPI(this.context);
  restBasket = new RestBasketAPI(this.context);
}
