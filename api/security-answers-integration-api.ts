import { APIRequestContext } from "@playwright/test";
import APIDriver from "./base/api-driver";

type SecurityQuestionResponse = {
  status: string;
  data: {
    id: number;
    UserId: number;
    answer: string;
    SecurityQuestionId: number;
    updatedAt: Date;
    createdAt: Date;
  };
};

export type SecurityAnswersPayload = {
  UserId: number;
  answer: string;
  SecurityQuestionId: number;
};

export default class SecurityAnswersIntegrationAPI extends APIDriver {
  constructor(apiRequestContext: APIRequestContext) {
    super(apiRequestContext, "securityAnswers");
  }

  async postSecurityAnswers(securityAnswersPayload: SecurityAnswersPayload) {
    return this.request<SecurityQuestionResponse>("/", "POST", null, securityAnswersPayload);
  }
}
