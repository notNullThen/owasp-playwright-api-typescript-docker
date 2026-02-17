import { Locator, Page } from "@playwright/test";
import IterableComponentBase from "./iterable-component-base";

export default abstract class FormFieldBase extends IterableComponentBase {
  constructor(
    componentName: string,
    page?: Page,
    protected parent?: Locator,
  ) {
    const parentOrPage = parent || page;
    if (!parentOrPage) {
      throw new Error("Either Page or parent Locator must be provided");
    }
    super(componentName, parentOrPage.locator("mat-form-field"));

    if (parent) {
      this.page = parent.page();
    }
    if (page) {
      this.page = page;
    }
  }

  public abstract getByName(name: string): FormFieldBase;
  public abstract getByLabel(name: string): FormFieldBase;
  public abstract getByLocator(locator: string): FormFieldBase;
  public abstract getByAriaLabel(name: string): FormFieldBase;

  protected getByNameBase<T extends FormFieldBase>(name: string) {
    const formField = this.create() as T;
    formField.body = this.body.filter({ has: this.page.getByRole("combobox", { name }) });
    return formField;
  }

  protected getByLabelBase<T extends FormFieldBase>(name: string) {
    const inputFormField = this.create() as T;
    inputFormField.body = this.body.filter({ has: this.page.getByLabel(name, { exact: true }) });
    return inputFormField;
  }

  protected getByLocatorBase<T extends FormFieldBase>(locator: string) {
    const formField = this.create() as T;
    formField.body = this.body.filter({ has: this.page.locator(locator) });
    return formField;
  }

  protected getByAriaLabelBase<T extends FormFieldBase>(name: string) {
    const formField = this.create() as T;
    formField.body = this.body.filter({ has: this.page.getByRole("textbox", { name }) });
    return formField;
  }
}
