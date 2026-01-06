import APIEndpointBase, { APIContext } from "../api-base/api-endpoint-base";

type Authentication = {
  token: string;
  bid: number;
  umail: string;
};

export type LoginResponse = {
  authentication: Authentication;
};

export default class RestUserAPI extends APIEndpointBase {
  constructor(context: APIContext) {
    super(context, "rest/user");
  }

  postLogin() {
    return this.action<LoginResponse>({ url: "/login", method: "POST" });
  }
}
