import { Page } from "@playwright/test";
import ComponentBase from "./component-base";
import Utils from "../support/utils";

export default class ProductRow extends ComponentBase {
  constructor(page: Page) {
    super("Product Row", page.locator("app-purchase-basket mat-row"));
  }

  get cells() {
    return this.body.getByRole("cell");
  }
  get imageCell() {
    return this.cells.nth(0);
  }
  get nameCell() {
    return this.cells.nth(1);
  }
  get quantityCell() {
    return this.cells.nth(2);
  }
  get priceCell() {
    return this.cells.nth(3);
  }
  get deleteCell() {
    return this.cells.nth(4);
  }

  async getProductName() {
    return this.nameCell.innerText();
  }
  async getQuantityValue() {
    const quantityText = await this.quantityCell.innerText();
    return Number(quantityText);
  }
  async getPriceValue() {
    const priceText = await this.priceCell.innerText();
    return Utils.getPriceFromText(priceText);
  }

  async getByName(productName: string) {
    const index = await this.getIndexByName(productName);
    return this.getByIndex(index);
  }

  async getIndexByName(productName: string): Promise<number> {
    const rowsCount = await this.count();

    for (let i = 0; i < rowsCount; i++) {
      const row = new ProductRow(this.page).getByIndex(i);
      const actualProductName = await row.nameCell.innerText();

      if (productName === actualProductName) {
        return i;
      }
    }
    throw new Error(`Product with name '${productName}' not found in basket`);
  }

  getByIndex(index: number) {
    {
      const row = new ProductRow(this.page);
      row.body = this.body.nth(index);
      return row;
    }
  }
}
