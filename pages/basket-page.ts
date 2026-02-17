import { Page } from "@playwright/test";
import BasketTable from "../components/product-row";
import PageBase from "./page-base";
import Utils from "../support/utils";

export default class BasketPage extends PageBase {
  constructor(page: Page) {
    super(page, "#/basket");
  }

  basketTable = new BasketTable(this.page);

  get price() {
    return this.page.locator("#price");
  }

  async goto() {
    const [, basketResponse] = await Promise.all([super.goto(), this.api.restBasket.getBasket().wait()]);
    return basketResponse;
  }

  async getTotalPriceValue() {
    const priceText = await this.price.innerText();
    const priceWithoutPrefix = priceText.replace("Total Price:", "").trim();
    return Utils.getPriceFromText(priceWithoutPrefix);
  }
}
