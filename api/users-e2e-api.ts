import { Page } from "@playwright/test";
import APIE2EDriver from "./base/api-e2e-driver";
import { UserResponse } from "./users-integration-api";

export default class UsersE2EAPI extends APIE2EDriver {
  constructor(page: Page) {
    super(page, "api/users");
  }

  async waitForPostUser() {
    return await this.waitFor<UserResponse>("/", "POST");
  }
}
