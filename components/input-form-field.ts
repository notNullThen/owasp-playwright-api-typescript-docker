import { Locator, Page } from "@playwright/test";
import ComponentFromParentBase from "./component-from-parent-base";

export default class InputFormField extends ComponentFromParentBase {
  private errorClass = "mat-form-field-invalid";

  constructor(page?: Page, parent?: Locator) {
    super("mat-form-field", page, parent);
  }

  get input() {
    return this.body.getByRole("textbox");
  }

  getByLabel(name: string) {
    const formField = new InputFormField(this.page, this.parent);
    formField.body = this.body.filter({ has: this.page.getByLabel(name, { exact: true }) });
    return formField;
  }

  getByLocator(locator: string) {
    const formField = new InputFormField(this.page, this.parent);
    formField.body = this.body.filter({ has: this.page.locator(locator) });
    return formField;
  }

  getByAriaLabel(name: string) {
    const formField = new InputFormField(this.page, this.parent);
    formField.body = this.body.filter({ has: this.page.getByRole("textbox", { name }) });
    return formField;
  }

  async fill(value: string | number) {
    await this.input.fill(String(value));
  }

  async shouldHaveError() {
    if (!(await this.hasError())) {
      throw new Error("Expected form field to have an error, but it does not.");
    }
  }

  async shouldNotHaveError() {
    if (await this.hasError()) {
      throw new Error("Expected form field not to have an error, but it does.");
    }
  }

  async hasError() {
    const classAttribute = await this.body.getAttribute("class");
    return classAttribute.includes(this.errorClass);
  }
}
