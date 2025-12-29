import { Page } from "@playwright/test";
import PageBase from "../pages/page-base";

export default class HomePage extends PageBase {
  constructor(page: Page) {
    super(page, "/#");
  }
}
