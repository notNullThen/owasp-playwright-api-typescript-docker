import { Page } from "@playwright/test";
import APIE2EDriver from "./base/api-e2e-driver";

type Authentication = {
  token: string;
  bid: number;
  umail: string;
};

type LoginResponse = {
  authentication: Authentication;
};

export default class RestUserE2EAPI extends APIE2EDriver {
  constructor(page: Page) {
    super(page, "rest/user");
  }

  async waitForLogin() {
    return this.waitFor<LoginResponse>("/login", "POST");
  }
}
