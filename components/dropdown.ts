import { Locator, Page } from "@playwright/test";
import ComponentFromParentBase from "./component-from-parent-base";

export default class Dropdown extends ComponentFromParentBase {
  constructor(page?: Page, parent?: Locator) {
    super("mat-select", page, parent);
  }
}
