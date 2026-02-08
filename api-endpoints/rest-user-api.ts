import APIFactory, { APIContext } from "../api-base/api-endpoint-base";

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

export default class RestUserAPI extends APIFactory {
  constructor(context: APIContext) {
    super(context, "rest/user");
  }

  postLogin(payload?: LoginPayload) {
    return this.action<LoginResponse>({ url: "/login", method: "POST", body: payload });
  }
}
