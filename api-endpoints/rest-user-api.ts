import { APIEndpointBase, APIContext } from "simple-api-playwright";

type Authentication = {
  token: string;
  bid: number;
  umail: string;
};

export type LoginResponse = {
  authentication: Authentication;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export default class RestUserAPI extends APIEndpointBase {
  constructor(context: APIContext) {
    super(context, "rest/user");
  }

  postLogin(payload?: LoginPayload) {
    return this.action<LoginResponse>({ url: "/login", method: "POST", body: payload });
  }
}
