import { Locator, Page } from "@playwright/test";
import ComponentBase from "./component-base";

export default abstract class FormFieldBase extends ComponentBase {
  constructor(
    componentName: string,
    page?: Page,
    protected parent?: Locator,
  ) {
    const parentOrPage = parent || page;
    if (!parentOrPage) {
      throw new Error("Either Page or parent Locator must be provided");
    }
    super(componentName, parentOrPage.locator("mat-form-field"));

    if (parent) {
      this.page = parent.page();
    }
    if (page) {
      this.page = page;
    }
  }
}
