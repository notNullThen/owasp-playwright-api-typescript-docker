import UsersAPI from "../users-api";
import SecurityAnswersAPI from "../security-answers-api";
import RestUserAPI from "../rest-user-api";

export default class API {
  constructor() {}

  users = new UsersAPI();
  restUser = new RestUserAPI();
  securityAnswers = new SecurityAnswersAPI();
}
