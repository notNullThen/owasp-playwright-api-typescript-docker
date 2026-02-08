import test, { Page } from "@playwright/test";
import InputFormField from "../components/input-form-field";
import PageBase from "./page-base";
import DropdownFormField from "../components/dropdown";

export default class RegistrationPage extends PageBase {
  constructor(page: Page) {
    super(page, "/#/register");
  }

  get emailInput() {
    return new InputFormField({ componentName: "Email", page: this.page }).getByLocator("#emailControl");
  }
  get passwordInput() {
    return new InputFormField({ componentName: "Password", page: this.page }).getByLocator("#passwordControl");
  }
  get repeatPasswordInput() {
    return new InputFormField({ componentName: "Repeat password", page: this.page }).getByLocator(
      "#repeatPasswordControl",
    );
  }
  get securityQuestionDropdown() {
    return new DropdownFormField({ componentName: "Security question", page: this.page }).getByName(
      "security question",
    );
  }
  get answerInput() {
    return new InputFormField({ componentName: "Security answer", page: this.page }).getByLocator(
      "#securityAnswerControl",
    );
  }
  get registerButton() {
    return this.page.locator("button[type=submit]");
  }

  async registerUser(options: { email: string; password: string; securityQuestion: string; securityAnswer: string }) {
    await test.step(`Fill ${options.email} user registration form`, async () => {
      const { password } = options;

      await this.emailInput.fill(options.email);
      await this.emailInput.shouldNotHaveError();

      await this.passwordInput.fill(password);
      await this.passwordInput.shouldNotHaveError();

      await this.repeatPasswordInput.fill(password);
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
        this.api.users.postUser().wait(),
        this.api.securityAnswers.postSecurityAnswers().wait(),
      ]);
      await this.page.waitForURL("**/login");

      return userResponse;
    });
  }
}
