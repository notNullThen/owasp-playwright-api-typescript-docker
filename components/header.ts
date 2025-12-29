import { Page } from "@playwright/test";
import ComponentBase from "./component-base";
import AccountMenu from "./account-menu";

export default class Header extends ComponentBase {
  constructor(page: Page) {
    super("Page Header", page.locator("app-navbar"));
  }

  accountMenu = new AccountMenu(this.page);
}
