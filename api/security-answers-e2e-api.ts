import { Page } from "@playwright/test";
import APIE2EDriver from "./base/api-e2e-driver";
import { SecurityQuestionResponse } from "./security-answers-integration-api";

export default class SecurityAnswersE2EAPI extends APIE2EDriver {
  constructor(page: Page) {
    super(page, "securityAnswers");
  }

  async waitForPostSecurityAnswers() {
    return this.waitFor<SecurityQuestionResponse>("/", "POST");
  }
}
