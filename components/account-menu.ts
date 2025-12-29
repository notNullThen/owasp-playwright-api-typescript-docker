import test, { expect, Page } from "@playwright/test";
import MenuBase from "./menu-base";
import Utils from "../support/utils";

export default class AccountMenu extends MenuBase {
  constructor(page: Page) {
    super("Account Menu", page.locator("#navbarAccount"));
  }

  get userProfileItem() {
    return this.menu.getByRole("menuitem").first();
  }

  async open() {
    await test.step(`Open ${this.name}`, async () => {
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
