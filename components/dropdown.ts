import { Locator, Page } from "@playwright/test";
import ComponentBase from "./component-base";

export default class Dropdown extends ComponentBase {
  constructor(page?: Page, protected parent?: Locator) {
    if (!page && !parent) {
      throw new Error("Either Page or parent Locator must be provided");
    }
    super((parent || page).locator("mat-form-field", { has: page.getByRole("combobox") }));
    this.page = parent ? parent.page() : page;
  }

  getByName(name: string) {
    const formField = new Dropdown(this.page, this.parent);
    formField.body = this.body.filter({ has: this.page.getByRole("combobox", { name }) });
    return formField;
  }
}
