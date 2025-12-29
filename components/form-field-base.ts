import { Locator, Page } from "@playwright/test";
import ComponentBase from "./component-base";

export default abstract class FormFieldBase extends ComponentBase {
  constructor(componentName: string, page?: Page, protected parent?: Locator) {
    if (!page && !parent) {
      throw new Error("Either Page or parent Locator must be provided");
    }
    super(componentName, (parent || page).locator("mat-form-field"));
    this.page = parent ? parent.page() : page;
  }
}
