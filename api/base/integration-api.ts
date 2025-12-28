import { APIRequestContext } from "@playwright/test";
import UsersIntegrationAPI from "../users-integration-api";
import SecurityAnswersIntegrationAPI from "../security-answers-integration-api";

export default class IntegrationAPI {
  constructor(private apiContext: APIRequestContext) {}

  public users = new UsersIntegrationAPI(this.apiContext);
  public securityAnswers = new SecurityAnswersIntegrationAPI(this.apiContext);
}
