import test, { expect, Page } from "@playwright/test";
import E2EAPI from "../api/base/e2e-api";
import ComponentBase from "../components/component-base";
import Utils from "../support/utils";
import MenuBase from "../components/menu-base";

export default abstract class PageBase {
  constructor(protected page: Page, protected url: string) {}

  api = new E2EAPI(this.page);
  header = new Header(this.page);

  async goto() {
    await this.page.goto(this.url);
  }
}

class Header extends ComponentBase {
  constructor(page: Page) {
    super("Page Header", page.locator("app-navbar"));
  }

  accountMenu = new AccountMenu(this.page);
}

class AccountMenu extends MenuBase {
  constructor(page: Page) {
    super("Account Menu", page.locator("#navbarAccount"));
  }

  get userProfileItem() {
    return this.menu.getByRole("menuitem").first();
  }

  async open() {
    await test.step(`Open ${this.componentName}`, async () => {
      if (!(await this.isMenuOpen())) {
        await this.body.click();
        await Utils.waitForElementToBeStable(this.menu);
      }
      await expect(this.menu).toBeVisible();
    });
  }

  async isMenuOpen() {
    return this.menu.isVisible();
  }
}
