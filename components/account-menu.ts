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
    await test.step(`Open ${this.componentName}`, async () => {
      if (!(await this.isOpen())) {
        await this.body.click();
        await Utils.waitForElementToBeStable(this.menu);
      }
      // Here we use Playwright's expect().toBeVisible() instead of isOpen() for waiting until the menu is visible
      // and avoid potential timing issues.
      await expect(this.menu).toBeVisible();
    });
  }
}
