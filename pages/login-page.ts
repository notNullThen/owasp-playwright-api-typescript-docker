import { Page } from "@playwright/test";
import Checkbox from "../components/checkbox";
import InputFormField from "../components/input-form-field";
import PageBase from "./page-base";

export default class LoginPage extends PageBase {
  constructor(page: Page) {
    super(page, "/#/login");
  }

  get emailInput() {
    return new InputFormField("Email", this.page).getByAriaLabel("email");
  }
  get passwordInput() {
    return new InputFormField("Password", this.page).getByAriaLabel("password");
  }
  get loginButton() {
    return this.page.getByRole("button", { name: "Login", exact: true });
  }
  get rememberMeCheckbox() {
    return new Checkbox("Remember Me", this.page).getByName("Remember me");
  }

  async login(email: string, password: string, rememberMe = true) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    if (rememberMe) {
      await this.rememberMeCheckbox.check();
    }

    const [, response] = await Promise.all([this.loginButton.click(), this.api.restUser.waitForLogin()]);

    // Add email check from header after component is ready

    return response;
  }
}
