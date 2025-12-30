import APIBase, { Context } from "./base/api-base";

type Authentication = {
  token: string;
  bid: number;
  umail: string;
};

type LoginResponse = {
  authentication: Authentication;
};

export default class RestUserAPI extends APIBase {
  constructor(context: Context) {
    super(context, "rest/user");
  }

  login() {
    return this.action<LoginResponse>({ url: "/login", method: "POST" });
  }
}
