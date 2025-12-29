import { Page } from "@playwright/test";
import ComponentBase from "./component-base";

export default class ProductTile extends ComponentBase {
  constructor(name: string, page: Page) {
    super(name, page.locator("mat-grid-tile"));
  }

  get name() {
    return this.body.locator(".item-name");
  }
}
