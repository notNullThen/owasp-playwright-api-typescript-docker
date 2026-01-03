import { Page } from "@playwright/test";
import PageBase from "./page-base";

export default class HomePage extends PageBase {
  constructor(page: Page) {
    super(page, "/#");
  }
}
