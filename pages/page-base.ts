import { Page } from "@playwright/test";
import E2EAPI from "../api/base/e2e-api";

export default abstract class PageBase {
  constructor(protected page: Page) {}

  public api = new E2EAPI(this.page);
}
