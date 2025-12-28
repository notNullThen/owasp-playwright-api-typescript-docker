import Checkbox from "../components/checkbox";
import PageBase from "./page-base";

export default class LoginPage extends PageBase {
  async goto() {
    await this.page.goto("/#/login");
  }

  get emailInput() {
    return this.page.getByRole("textbox", { name: "email" });
  }
  get passwordInput() {
    return this.page.getByRole("textbox", { name: "password" });
  }
  get loginButton() {
    return this.page.getByRole("button", { name: "Login", exact: true });
  }
  get rememberMeCheckbox() {
    return new Checkbox(this.page).getByName("Remember me");
  }

  async login(email: string, password: string, rememberMe = true) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    if (rememberMe) {
      await this.rememberMeCheckbox.check();
    }

    const [, response] = await Promise.all([this.loginButton.click(), this.api.restUser.waitForLogin()]);
    return response;
  }
}
