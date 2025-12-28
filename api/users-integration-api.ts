import { APIRequestContext } from "@playwright/test";
import CreatedData from "../data/created-data";
import APIDriver from "./base/api-driver";

type SecurityQuestion = {
  id: number;
  question: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserResponse = {
  status: string;
  data: {
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

export default class UsersIntegrationAPI extends APIDriver {
  constructor(apiRequestContext: APIRequestContext) {
    super(apiRequestContext, "api/users");
  }

  async postUser(userPayload: UserPayload) {
    const response = await this.request<UserResponse>("/", "POST", null, userPayload);
    if (response.responseBody) CreatedData.createdUsers.push({ response: response.responseBody, payload: userPayload });
    return response;
  }
}
