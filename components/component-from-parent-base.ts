import { Locator, Page } from "@playwright/test";
import ComponentBase from "./component-base";

export default abstract class ComponentFromParentBase extends ComponentBase {
  constructor(selector: string, page?: Page, protected parent?: Locator) {
    if (!page && !parent) {
      throw new Error("Either Page or parent Locator must be provided");
    }
    super(parent ? parent.locator(selector) : page.locator(selector));
    this.page = parent ? parent.page() : page;
  }
}
