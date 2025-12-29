import { Page } from "@playwright/test";
import ComponentBase from "./component-base";
import Utils from "../support/utils";

export default class ProductTile extends ComponentBase {
  constructor(page: Page) {
    super("Product tile", page.locator("mat-grid-tile"));
  }

  get itemName() {
    return this.body.locator(".item-name");
  }
  get price() {
    return this.body.locator(".item-price");
  }
  get addToBasketButton() {
    return this.body.locator(".btn-basket");
  }

  async getPriceValue() {
    const priceText = await this.price.first().innerText();
    return Utils.getPriceFromText(priceText);
  }

  getByName(name: string) {
    const tile = new ProductTile(this.page);
    tile.body = tile.body.filter({ has: this.itemName.getByText(name) });
    return tile;
  }
}
