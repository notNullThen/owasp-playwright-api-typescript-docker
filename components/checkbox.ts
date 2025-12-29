import test, { expect, Locator, Page } from "@playwright/test";
import ComponentBase from "./component-base";

export default class Checkbox extends ComponentBase {
  private checkedClass = "mdc-checkbox--selected";
  private parent: Locator;

  constructor(options: { name: string; page?: Page; parent?: Locator }) {
    const { name, page = null, parent = null } = options;

    if (!page && !parent) {
      throw new Error("Either Page or parent Locator must be provided");
    }
    super(name, (parent || page).locator("mat-checkbox"));
    this.page = parent ? parent.page() : page;
    this.parent = parent;
  }

  get checkbox() {
    return this.body.getByRole("checkbox");
  }

  async check() {
    await test.step(`Check "${this.name}" checkbox`, async () => {
      const isChecked = await this.isChecked();
      if (!isChecked) {
        await this.checkbox.click();
      }

      await this.shouldBeChecked();
    });
  }

  async uncheck() {
    await test.step(`Uncheck "${this.name}" checkbox`, async () => {
      const isChecked = await this.isChecked();
      if (isChecked) {
        await this.checkbox.click();
      }

      await this.shouldBeUnchecked();
    });
  }

  // In this case it would be better to use .isChecked() from Playwright directly,
  // but sometimes custom checkboxes do not reflect the state properly in the accessible tree.
  // So for demonstration purposes, we implement our own isChecked() method.
  async isChecked() {
    const classAttribute = await this.checkbox.getAttribute("class");
    return classAttribute.includes(this.checkedClass);
  }

  async shouldBeChecked() {
    await test.step(`Verify "${this.name}" checkbox is checked`, async () => {
      const isChecked = await this.isChecked();
      expect(isChecked).toBe(true);
    });
  }

  async shouldBeUnchecked() {
    await test.step(`Verify "${this.name}" checkbox is not checked`, async () => {
      const isChecked = await this.isChecked();
      expect(isChecked).toBe(false);
    });
  }

  getByName(name: string) {
    const checkbox = new Checkbox({ name: this.name, page: this.page, parent: this.parent });
    checkbox.body = this.body.filter({ has: this.page.getByText(name, { exact: true }) });
    return checkbox;
  }
}
