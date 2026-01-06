import { Page } from "@playwright/test";
import ProductRow from "../components/product-row";
import PageBase from "./page-base";

export default class BasketPage extends PageBase {
  constructor(page: Page) {
    super(page, "#/basket");
  }

  products = new ProductRow(this.page);

  async goto() {
    const [, basketResponse] = await Promise.all([super.goto(), this.api.restBasket.getBasket().wait()]);
    return basketResponse;
  }
}
