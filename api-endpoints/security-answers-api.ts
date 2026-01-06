import APIEndpointBase, { APIContext } from "../api-base/api-endpoint-base";
import { ResponseType } from "./types/general-types";

type Data = {
  id: number;
  UserId: number;
  answer: string;
  SecurityQuestionId: number;
  updatedAt: Date;
  createdAt: Date;
};

export type SecurityQuestionResponse = ResponseType<Data>;

export type SecurityAnswersPayload = {
  UserId: number;
  answer: string;
  SecurityQuestionId: number;
};

export default class SecurityAnswersAPI extends APIEndpointBase {
  constructor(context: APIContext) {
    super(context, "api/SecurityAnswers");
  }

  postSecurityAnswers(securityAnswersPayload?: SecurityAnswersPayload) {
    return this.action<SecurityQuestionResponse>({ url: "/", method: "POST", body: securityAnswersPayload });
  }
}
