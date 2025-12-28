import { Page } from "@playwright/test";
import InputFormField from "../components/input-form-field";
import PageBase from "./page-base";
import Dropdown from "../components/dropdown";

export default class RegistrationPage extends PageBase {
  constructor(page: Page) {
    super(page, "/#/register");
  }

  get emailInput() {
    return new InputFormField("Email", this.page).getByLocator("#emailControl");
  }
  get passwordInput() {
    return new InputFormField("Password", this.page).getByLocator("#passwordControl");
  }
  get repeatPasswordInput() {
    return new InputFormField("Repeat password", this.page).getByLocator("#repeatPasswordControl");
  }
  get securityQuestionDropdown() {
    return new Dropdown("Security question", this.page).getByName("security question");
  }
  get answerInput() {
    return new InputFormField("Security answer", this.page).getByLocator("#securityAnswerControl");
  }
  get registerButton() {
    return this.page.locator("button[type=submit]");
  }

  async submit() {
    const [, userResponse] = await Promise.all([
      this.registerButton.click(),
      this.api.users.waitForPostUser(),
      this.api.securityAnswers.waitForPostSecurityAnswers(),
    ]);
    return userResponse;
  }
}
