import { Page } from "@playwright/test";
import Header from "../components/header";
import API from "../api/api";
import ProductTile from "../components/product-tile";

export default abstract class PageBase {
  constructor(protected page: Page, protected url: string) {}

  api = new API(this.page);
  header = new Header(this.page);
  productTiles = new ProductTile(this.page);

  get headerText() {
    return this.page.locator(".heading");
  }

  async goto() {
    await this.page.goto(this.url);
  }
}
