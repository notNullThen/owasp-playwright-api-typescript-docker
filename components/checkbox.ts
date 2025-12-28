import { expect, Locator, Page } from "@playwright/test";
import ComponentFromParentBase from "./component-from-parent-base";

export default class Checkbox extends ComponentFromParentBase {
  private checkedClass = "mdc-checkbox--selected";

  constructor(page?: Page, parent?: Locator) {
    super("mat-checkbox", page, parent);
  }

  get checkbox() {
    return this.body.getByRole("checkbox");
  }

  async check() {
    const isChecked = await this.isChecked();
    if (!isChecked) {
      await this.checkbox.check();
    }

    await this.shouldBeChecked();
  }

  // In this case it would be better to use .isChecked() from Playwright directly,
  // but sometimes custom checkboxes do not reflect the state properly in the accessible tree.
  // So for demonstration purposes, we implement our own isChecked() method.
  async isChecked() {
    const classAttribute = await this.checkbox.getAttribute("class");
    return classAttribute.includes(this.checkedClass);
  }

  async shouldBeChecked() {
    const isChecked = await this.isChecked();
    expect(isChecked).toBe(true);
  }

  async shouldBeUnchecked() {
    const isChecked = await this.isChecked();
    expect(isChecked).toBe(false);
  }

  getByName(name: string) {
    const checkbox = new Checkbox(this.page, this.parent);
    checkbox.body = this.body.filter({ has: this.page.getByText(name, { exact: true }) });
    return checkbox;
  }
}
