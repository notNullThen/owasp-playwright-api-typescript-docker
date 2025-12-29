import test, { Locator, Page } from "@playwright/test";
import FormFieldBase from "./form-field-base";

export default class InputFormField extends FormFieldBase {
  private errorClass = "mat-form-field-invalid" as const;

  constructor(options: { name: string; page?: Page; parent?: Locator }) {
    const { name, page = null, parent = null } = options;

    if (!page && !parent) {
      throw new Error("Either Page or parent Locator must be provided");
    }
    super(name, page, parent);

    this.body = this.body.filter({ has: this.page.getByRole("textbox") });
    this.page = parent ? parent.page() : page;
  }

  get input() {
    return this.body.getByRole("textbox");
  }

  getByLabel(name: string) {
    const formField = new InputFormField({ name: this.name, page: this.page, parent: this.parent });
    formField.body = this.body.filter({ has: this.page.getByLabel(name, { exact: true }) });
    return formField;
  }
  getByLocator(locator: string) {
    const formField = new InputFormField({ name: this.name, page: this.page, parent: this.parent });
    formField.body = this.body.filter({ has: this.page.locator(locator) });
    return formField;
  }
  getByAriaLabel(name: string) {
    const formField = new InputFormField({ name: this.name, page: this.page, parent: this.parent });
    formField.body = this.body.filter({ has: this.page.getByRole("textbox", { name }) });
    return formField;
  }

  async fill(value: string | number) {
    await test.step(`Fill "${this.name}" input field with value: "${value}"`, async () => {
      await this.input.fill(String(value));
    });
  }

  async shouldHaveError() {
    await test.step(`Verify "${this.name}" input field has an error`, async () => {
      if (!(await this.hasError())) {
        throw new Error("Expected form field to have an error, but it does not.");
      }
    });
  }

  async shouldNotHaveError() {
    await test.step(`Verify "${this.name}" input field has no error`, async () => {
      if (await this.hasError()) {
        throw new Error("Expected form field not to have an error, but it does.");
      }
    });
  }

  async hasError() {
    const classAttribute = await this.body.getAttribute("class");
    return classAttribute.includes(this.errorClass);
  }
}
