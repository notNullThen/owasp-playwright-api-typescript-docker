import APIDriver from "./base/api-driver";

type Authentication = {
  token: string;
  bid: number;
  umail: string;
};

type LoginResponse = {
  authentication: Authentication;
};

export default class RestUserAPI extends APIDriver {
  constructor() {
    super("rest/user");
  }

  login() {
    return this.action<LoginResponse>({ url: "/login", method: "POST" });
  }
}
