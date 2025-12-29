import { Page } from "@playwright/test";
import ComponentBase from "./component-base";

export default class ProductTile extends ComponentBase {
  constructor(page: Page) {
    super("Product tile", page.locator("mat-grid-tile"));
  }

  get name() {
    return this.body.locator(".item-name");
  }
}
