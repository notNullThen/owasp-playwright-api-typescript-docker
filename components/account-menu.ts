import test, { Page } from "@playwright/test";
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
      const isOpen = await this.isOpen();
      if (!isOpen) {
        await this.body.click();
        await Utils.waitForElementToBeStable(this.menu);
      }

      await this.menu.waitFor({ state: "visible" });
    });
  }
}
