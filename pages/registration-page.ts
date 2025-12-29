import test, { Page } from "@playwright/test";
import InputField from "../components/input-form-field";
import PageBase from "./page-base";
import Dropdown from "../components/dropdown";

export default class RegistrationPage extends PageBase {
  constructor(page: Page) {
    super(page, "/#/register");
  }

  get emailInput() {
    return new InputField({ componentName: "Email", page: this.page }).getByLocator("#emailControl");
  }
  get passwordInput() {
    return new InputField({ componentName: "Password", page: this.page }).getByLocator("#passwordControl");
  }
  get repeatPasswordInput() {
    return new InputField({ componentName: "Repeat password", page: this.page }).getByLocator("#repeatPasswordControl");
  }
  get securityQuestionDropdown() {
    return new Dropdown({ componentName: "Security question", page: this.page }).getByName("security question");
  }
  get answerInput() {
    return new InputField({ componentName: "Security answer", page: this.page }).getByLocator("#securityAnswerControl");
  }
  get registerButton() {
    return this.page.locator("button[type=submit]");
  }

  async registerUser(options: { email: string; password: string; securityQuestion: string; securityAnswer: string }) {
    await test.step(`Fill ${options.email} user registration form`, async () => {
      await this.emailInput.fill(options.email);
      await this.emailInput.shouldNotHaveError();

      await this.passwordInput.fill(options.password);
      await this.passwordInput.shouldNotHaveError();

      await this.repeatPasswordInput.fill(options.password);
      await this.repeatPasswordInput.shouldNotHaveError();

      await this.securityQuestionDropdown.select(options.securityQuestion);
      await this.answerInput.fill(options.securityAnswer);
      await this.answerInput.shouldNotHaveError();

      await this.submit();
    });
  }

  async submit() {
    return await test.step("Submit registration form", async () => {
      const [, userResponse] = await Promise.all([
        this.registerButton.click(),
        this.api.users.postUser().wait(this.page),
        this.api.securityAnswers.postSecurityAnswers().wait(this.page),
      ]);
      return userResponse;
    });
  }
}
