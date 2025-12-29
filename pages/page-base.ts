import { Page } from "@playwright/test";
import Header from "../components/header";
import API from "../api/base/api";

export default abstract class PageBase {
  constructor(protected page: Page, protected url: string) {}

  api = new API();
  header = new Header(this.page);

  async goto() {
    await this.page.goto(this.url);
  }
}
