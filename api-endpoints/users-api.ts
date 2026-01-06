import APIEndpointBase, { APIContext } from "../api-base/api-endpoint-base";
import CreatedData from "../data/created-data";

type SecurityQuestion = {
  id: number;
  question: string;
  createdAt: Date;
  updatedAt: Date;
};

type Data = {
  username: string;
  role: string;
  deluxeToken: string;
  lastLoginIp: string;
  profileImage: string;
  isActive: boolean;
  id: number;
  email: string;
  updatedAt: Date;
  createdAt: Date;
  deletedAt: Date;
};

export type UserResponse = {
  status: string;
  data: Data;
};

export type UserPayload = {
  email: string;
  password: string;
  passwordRepeat: string;
  securityQuestion: SecurityQuestion;
  securityAnswer: string;
};

export type User = {
  response: UserResponse;
  payload: UserPayload;
};

export default class UsersAPI extends APIEndpointBase {
  constructor(context: APIContext) {
    super(context, "api/users");
  }

  postUser(userPayload?: UserPayload) {
    return this.action<UserResponse>({ url: "", method: "POST", body: userPayload });
  }

  async createUser(userPayload: UserPayload) {
    const { responseBody } = await this.postUser(userPayload).request();
    CreatedData.createdUsers.push({ payload: userPayload, response: responseBody });
    return responseBody;
  }
}
