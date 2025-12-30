import { Page } from "@playwright/test";
import Header from "../components/header";
import API from "../api/api";

export default abstract class PageBase {
  constructor(protected page: Page, protected url: string) {}

  api = new API(this.page);
  header = new Header(this.page);

  async goto() {
    await this.page.goto(this.url);
  }
}
