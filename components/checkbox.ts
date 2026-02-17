import test, { expect, Locator, Page } from "@playwright/test";
import IterableComponentBase from "./iterable-component-base";

export default class Checkbox extends IterableComponentBase {
  private checkedClass = "mdc-checkbox--selected";
  private parent?: Locator;

  constructor(options: { componentName: string; page?: Page; parent?: Locator }) {
    const { componentName, page, parent } = options;
    const parentOrPage = parent || page;
    if (!parentOrPage) {
      throw new Error("Either Page or parent Locator must be provided");
    }
    super(componentName, parentOrPage.locator("mat-checkbox"));
    this.parent = parent;

    if (parent) {
      this.page = parent.page();
    }
    if (page) {
      this.page = page;
    }
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
    if (!classAttribute) {
      throw new Error(`"${this.componentName}" has no any class attribute.`);
    }

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

  public override getByIndex(index: number) {
    return this.getByIndexBase<Checkbox>(index);
  }

  public override getByText(text: string) {
    return this.getByTextBase<Checkbox>(text);
  }

  protected override create() {
    return new Checkbox({ componentName: this.componentName, page: this.page, parent: this.parent });
  }
}
