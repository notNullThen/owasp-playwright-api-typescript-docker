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

export default class UsersAPI extends APIDriver {
  constructor() {
    super("api/users");
  }

  postUser(userPayload?: UserPayload) {
    return this.action<UserResponse>({ url: "", method: "POST", body: userPayload });
  }
}
