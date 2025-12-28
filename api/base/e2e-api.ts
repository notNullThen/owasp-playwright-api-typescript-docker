import { Page } from "@playwright/test";
import RestUserE2EAPI from "../rest-user-e2e-api";
import IntegrationAPI from "./integration-api";
import UsersE2EAPI from "../users-e2e-api";
import SecurityAnswersE2EAPI from "../security-answers-e2e-api";

export default class E2EAPI {
  constructor(private page: Page) {}

  requests = new IntegrationAPI(this.page.request);

  restUser = new RestUserE2EAPI(this.page);
  users = new UsersE2EAPI(this.page);
  securityAnswers = new SecurityAnswersE2EAPI(this.page);
}
