import ComponentBase from "./component-base";
import ProductTile from "./product-tile";

export default class SearchResults extends ComponentBase {
  productTiles = new ProductTile(this.page);

  get headerText() {
    return this.body.locator(".heading");
  }
}
