import test, { Locator, Page } from "@playwright/test";
import FormFieldBase from "./form-field-base";

export default class InputFormField extends FormFieldBase {
  private errorClass = "mat-form-field-invalid" as const;

  constructor(options: { componentName: string; page?: Page; parent?: Locator }) {
    const { componentName: name, page, parent } = options;

    super(name, page, parent);

    this.body = this.body.filter({ has: this.page.getByRole("textbox") });
  }

  get input() {
    return this.body.getByRole("textbox");
  }

  async fill(value: string | number) {
    await test.step(`Fill "${this.componentName}" input field with value: "${value}"`, async () => {
      await this.input.fill(String(value));
    });
  }

  async shouldHaveError() {
    await test.step(`Verify "${this.componentName}" input field has an error`, async () => {
      if (!(await this.hasError())) {
        throw new Error(`Expected "${this.componentName}" to have an error, but it does not.`);
      }
    });
  }

  async shouldNotHaveError() {
    await test.step(`Verify "${this.componentName}" input field has no error`, async () => {
      if (await this.hasError()) {
        throw new Error(`Expected "${this.componentName}" not to have an error, but it does.`);
      }
    });
  }

  async hasError() {
    const classAttribute = await this.body.getAttribute("class");
    if (!classAttribute) {
      throw new Error(`"${this.componentName}" has no any class attribute.`);
    }

    return classAttribute.includes(this.errorClass);
  }

  async pressEnter() {
    await test.step(`Press Enter key on "${this.componentName}" input field`, async () => {
      await this.input.press("Enter");
    });
  }

  public override getByName = (name: string) => this.getByNameBase<InputFormField>(name);
  public override getByText = (text: string) => this.getByTextBase<InputFormField>(text);
  public override getByIndex = (index: number) => this.getByIndexBase<InputFormField>(index);
  public override getByLabel = (label: string) => this.getByLabelBase<InputFormField>(label);
  public override getByAriaLabel = (ariaLabel: string) => this.getByAriaLabelBase<InputFormField>(ariaLabel);
  public override getByLocator = (locator: string) => this.getByLocatorBase<InputFormField>(locator);

  protected override create = () =>
    new InputFormField({ componentName: this.componentName, page: this.page, parent: this.parent });
}
