import { Page } from "@playwright/test";
import Header from "../components/header";
import ProductTile from "../components/product-tile";
import APIEndpoints from "../api-endpoints/api-endpoints";

export default abstract class PageBase {
  constructor(
    protected page: Page,
    protected url: string,
  ) {}

  api = new APIEndpoints(this.page);
  header = new Header(this.page);
  productTiles = new ProductTile(this.page);

  get headerText() {
    return this.page.locator(".heading");
  }

  async goto(): Promise<any> {
    await this.page.goto(this.url);
  }
}
