import APIBase, { APIContext } from "./base/api-base";

type Data = {
  id: number;
  UserId: number;
  answer: string;
  SecurityQuestionId: number;
  updatedAt: Date;
  createdAt: Date;
};

export type SecurityQuestionResponse = {
  status: string;
  data: Data;
};

export type SecurityAnswersPayload = {
  UserId: number;
  answer: string;
  SecurityQuestionId: number;
};

export default class SecurityAnswersAPI extends APIBase {
  constructor(context: APIContext) {
    super(context, "api/SecurityAnswers");
  }

  postSecurityAnswers(securityAnswersPayload?: SecurityAnswersPayload) {
    return this.action<SecurityQuestionResponse>({ url: "/", method: "POST", body: securityAnswersPayload });
  }
}
