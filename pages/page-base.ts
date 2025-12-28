import { Page } from "@playwright/test";
import E2EAPI from "../api/base/e2e-api";

export default abstract class PageBase {
  constructor(protected page: Page, protected url: string) {}

  public api = new E2EAPI(this.page);

  async goto() {
    await this.page.goto(this.url);
  }
}
