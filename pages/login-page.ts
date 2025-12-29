import { expect, Page } from "@playwright/test";
import Checkbox from "../components/checkbox";
import InputFormField from "../components/input-form-field";
import PageBase from "./page-base";

export default class LoginPage extends PageBase {
  constructor(page: Page) {
    super(page, "/#/login");
  }

  get emailInput() {
    return new InputFormField({ name: "Email", page: this.page }).getByAriaLabel("email");
  }
  get passwordInput() {
    return new InputFormField({ name: "Password", page: this.page }).getByAriaLabel("password");
  }
  get loginButton() {
    return this.page.getByRole("button", { name: "Login", exact: true });
  }
  get rememberMeCheckbox() {
    return new Checkbox({ name: "Remember Me", page: this.page }).getByName("Remember me");
  }

  async login(email: string, password: string, rememberMe = true) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    if (rememberMe) {
      await this.rememberMeCheckbox.check();
    }

    const [, response] = await Promise.all([this.loginButton.click(), this.api.restUser.waitForLogin()]);

    await this.header.accountMenu.open();
    await expect(this.header.accountMenu.userProfileItem).toContainText(email);
    await this.header.accountMenu.close();

    return response;
  }
}
