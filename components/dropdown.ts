import test, { expect, Locator, Page } from "@playwright/test";
import FormFieldBase from "./form-field-base";
import Utils from "../support/utils";

export default class DropdownFormField extends FormFieldBase {
  constructor(options: { componentName: string; page?: Page; parent?: Locator }) {
    const { componentName: name, page, parent } = options;
    super(name, page, parent);
    this.body = this.body.filter({ has: this.page.getByRole("combobox") });
  }

  get input() {
    return this.body.getByRole("combobox");
  }

  get options() {
    return this.page.getByRole("listbox");
  }

  getByName = (name: string) => this.getByNameBase<DropdownFormField>(name);

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

  public override getByText = (text: string) => super.getByTextBase<DropdownFormField>(text);
  public override getByIndex = (index: number) => super.getByIndexBase<DropdownFormField>(index);
  public override getByLabel = (label: string) => super.getByLabelBase<DropdownFormField>(label);
  public override getByAriaLabel = (ariaLabel: string) => super.getByAriaLabelBase<DropdownFormField>(ariaLabel);
  public override getByLocator = (locator: string) => super.getByLocatorBase<DropdownFormField>(locator);

  protected override create = () =>
    new DropdownFormField({ componentName: this.componentName, page: this.page, parent: this.parent });
}
