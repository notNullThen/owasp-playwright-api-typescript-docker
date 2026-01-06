import test, { expect, Locator, Page } from "@playwright/test";
import FormFieldBase from "./form-field-base";
import Utils from "../support/utils";

export default class Dropdown extends FormFieldBase {
  constructor(options: { componentName: string; page?: Page; parent?: Locator }) {
    const { componentName: name, page = null, parent = null } = options;

    if (!page && !parent) {
      throw new Error("Either Page or parent Locator must be provided");
    }
    super(name, page, parent);
    this.body = this.body.filter({ has: this.page.getByRole("combobox") });
    this.page = parent ? parent.page() : page;
  }

  get input() {
    return this.body.getByRole("combobox");
  }

  get options() {
    return this.page.getByRole("listbox");
  }

  getByName(name: string) {
    const formField = new Dropdown({ componentName: this.componentName, page: this.page, parent: this.parent });
    formField.body = this.body.filter({ has: this.page.getByRole("combobox", { name }) });
    return formField;
  }

  getOptionByName(name: string) {
    return this.options.getByRole("option", { name });
  }

  async select(name: string) {
    await test.step(`Select "${this.componentName}" dropdown "${name}" option`, async () => {
      await this.input.click();
      // TODO: Remove retries after bug '123' is fixed
      if (!(await this.options.isVisible())) {
        // eslint-disable-next-line playwright/no-wait-for-timeout
        await this.page.waitForTimeout(1000);
        await this.input.click();
      }

      await Utils.waitForElementToBeStable(this.options);

      await this.getOptionByName(name).click();
      await expect(this.input).toHaveText(name);
    });
  }
}
