import { Page } from "@playwright/test";
import InputFormField from "../components/input-form-field";
import PageBase from "./page-base";

export default class RegistrationPage extends PageBase {
  constructor(page: Page) {
    super(page, "/#/register");
  }

  get emailInput() {
    return new InputFormField(this.page).getByLocator("#emailControl");
  }
  get passwordInput() {
    return new InputFormField(this.page).getByLocator("#passwordControl");
  }
  get repeatPasswordInput() {
    return new InputFormField(this.page).getByLocator("#repeatPasswordControl");
  }
}
