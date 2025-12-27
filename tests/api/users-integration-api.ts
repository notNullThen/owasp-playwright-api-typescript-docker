import { APIRequestContext } from "@playwright/test";
import APIDriver from "./api-driver";

type UserResponse = {
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

type SecurityQuestion = {
  id: number;
  question: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserPayload = {
  email: string;
  password: string;
  passwordRepeat: string;
  securityQuestion: SecurityQuestion;
  securityAnswer: string;
};

export default class UsersIntegrationAPI extends APIDriver {
  constructor(apiRequestContext: APIRequestContext) {
    super(apiRequestContext, "users");
  }

  postUser(userPayload: UserPayload) {
    return this.request<UserResponse>("/", "POST", null, userPayload);
  }
}
