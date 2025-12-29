import test, { expect, Locator, Page } from "@playwright/test";
import ComponentBase from "./component-base";

export default class Checkbox extends ComponentBase {
  private checkedClass = "mdc-checkbox--selected";
  private parent: Locator;

  constructor(options: { componentName: string; page?: Page; parent?: Locator }) {
    if (!options.componentName.endsWith(" Checkbox")) {
      options.componentName = options.componentName + " Checkbox";
    }

    const { componentName, page = null, parent = null } = options;
    if (!page && !parent) {
      throw new Error("Either Page or parent Locator must be provided");
    }
    super(componentName, (parent || page).locator("mat-checkbox"));
    this.page = parent ? parent.page() : page;
    this.parent = parent;
  }

  get checkbox() {
    return this.body.getByRole("checkbox");
  }

  async check() {
    await test.step(`Check "${this.componentName}" checkbox`, async () => {
      const isChecked = await this.isChecked();
      if (!isChecked) {
        await this.checkbox.click();
      }

      await this.shouldBeChecked();
    });
  }

  async uncheck() {
    await test.step(`Uncheck "${this.componentName}" checkbox`, async () => {
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
    await test.step(`Verify "${this.componentName}" checkbox is checked`, async () => {
      const isChecked = await this.isChecked();
      expect(isChecked).toBe(true);
    });
  }

  async shouldBeUnchecked() {
    await test.step(`Verify "${this.componentName}" checkbox is not checked`, async () => {
      const isChecked = await this.isChecked();
      expect(isChecked).toBe(false);
    });
  }

  getByName(name: string) {
    const checkbox = new Checkbox({ componentName: this.componentName, page: this.page, parent: this.parent });
    checkbox.body = this.body.filter({ has: this.page.getByText(name, { exact: true }) });
    return checkbox;
  }
}
