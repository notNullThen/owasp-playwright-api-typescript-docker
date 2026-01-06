import test, { Page } from "@playwright/test";
import ComponentBase from "./component-base";
import Utils from "../support/utils";

export default class ProductTile extends ComponentBase {
  constructor(page: Page) {
    super("Product tile", page.locator("mat-grid-tile"));
  }

  private readonly _itemNameSelector = ".item-name" as const;

  get itemName() {
    return this.body.locator(this._itemNameSelector);
  }
  get price() {
    return this.body.locator(".item-price");
  }
  get addToBasketButton() {
    return this.body.locator(".btn-basket");
  }

  async getPriceValue() {
    const priceText = await this.price.innerText();
    return Utils.getPriceFromText(priceText);
  }

  async addToBasket() {
    return await test.step(`Add product '${await this.itemName.innerText()}' to basket`, async () => {
      const [, basketItemsResponse] = await Promise.all([
        this.addToBasketButton.click(),
        this.api.basketItems.postBasketItems().wait(),
      ]);

      return basketItemsResponse;
    });
  }

  getByName(name: string) {
    const tile = new ProductTile(this.page);
    tile.body = tile.body.filter({ has: this.page.locator(this._itemNameSelector).getByText(name) });
    return tile;
  }
}
