import { Page } from "@playwright/test";
import Utils from "../support/utils";
import TableBase, { RowBase } from "./table-base";

export default class BasketTable extends TableBase {
  constructor(page: Page) {
    super("Product Row", page.locator("app-purchase-basket mat-row"));
  }

  rows = new Row(this.componentName, this.body);
}

class Row extends RowBase {
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

  async getQuantityValue() {
    const quantityText = await this.quantityCell.innerText();
    return Number(quantityText);
  }

  async getPriceValue() {
    const priceText = await this.priceCell.innerText();
    return Utils.getPriceFromText(priceText);
  }

  getProductName = async () => this.nameCell.innerText();
  getByProductName = async (productName: string) => this.getByCellValue(productName, this.nameCell);

  public getByText = (text: string) => this.getByTextBase<Row>(text);
  public getByIndex = (index: number) => this.getByIndexBase<Row>(index);
  protected create = () => new Row(this.componentName, this.body);
}
