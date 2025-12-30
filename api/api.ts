import UsersAPI from "./users-api";
import SecurityAnswersAPI from "./security-answers-api";
import RestUserAPI from "./rest-user-api";
import { Context } from "./base/api-base";

export default class API {
  constructor(private context: Context) {}

  users = new UsersAPI(this.context);
  restUser = new RestUserAPI(this.context);
  securityAnswers = new SecurityAnswersAPI(this.context);
}
