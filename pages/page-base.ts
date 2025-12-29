import { Page } from "@playwright/test";
import E2EAPI from "../api/base/e2e-api";
import Header from "../components/header";

export default abstract class PageBase {
  constructor(protected page: Page, protected url: string) {}

  api = new E2EAPI(this.page);
  header = new Header(this.page);

  async goto() {
    await this.page.goto(this.url);
  }
}
