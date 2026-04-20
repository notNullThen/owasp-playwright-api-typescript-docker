import { Page } from "@playwright/test";
import Header from "../components/header";
import ProductTile from "../components/product-tile";
import APIEndpoints from "../api-endpoints/api-endpoints";

export default abstract class PageBase {
  api: APIEndpoints;
  header: Header;
  productTiles: ProductTile;

  constructor(
    protected page: Page,
    protected url: string,
  ) {
    this.api = new APIEndpoints(this.page);
    this.header = new Header(this.page);
    this.productTiles = new ProductTile(this.page);
  }

  get headerText() {
    return this.page.locator(".heading");
  }

  async goto(): Promise<any> {
    await this.page.goto(this.url);
  }
}
