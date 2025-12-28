import test, { expect, Locator, Page } from "@playwright/test";
import FormFieldBase from "./form-field-base";
import Utils from "../support/utils";

export default class Dropdown extends FormFieldBase {
  constructor(componentName: string, page?: Page, protected parent?: Locator) {
    if (!page && !parent) {
      throw new Error("Either Page or parent Locator must be provided");
    }
    super(componentName, page, parent);
    this.body = this.body.filter({ has: this.page.getByRole("combobox") });
    this.page = parent ? parent.page() : page;
  }

  get options() {
    return this.page.getByRole("listbox");
  }

  getByName(name: string) {
    const formField = new Dropdown(this.componentName, this.page, this.parent);
    formField.body = this.body.filter({ has: this.page.getByRole("combobox", { name }) });
    return formField;
  }

  getOptionByName(name: string) {
    return this.options.getByRole("option", { name });
  }

  async select(name: string) {
    await test.step(`Select "${this.componentName}" dropdown "${name}" option`, async () => {
      await this.body.getByRole("combobox").click();
      await Utils.waitForElementToBeStable(this.options);

      await this.getOptionByName(name).click();
      await expect(this.body.getByRole("combobox")).toHaveText(name);
    });
  }
}
