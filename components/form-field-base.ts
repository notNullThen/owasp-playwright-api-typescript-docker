import { Locator, Page } from "@playwright/test";
import ComponentBase from "./component-base";

export default abstract class FormFieldBase extends ComponentBase {
  constructor(name: string, page?: Page, protected parent?: Locator) {
    if (!page && !parent) {
      throw new Error("Either Page or parent Locator must be provided");
    }
    super(name, (parent || page).locator("mat-form-field"));
    this.page = parent ? parent.page() : page;
  }
}
