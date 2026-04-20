import { Locator, Page } from "@playwright/test";
import APIEndpoints from "../api-endpoints/api-endpoints";

export default abstract class ComponentBase {
  protected page: Page;
  protected api: APIEndpoints;

  constructor(
    protected componentName: string,
    public body: Locator,
  ) {
    this.page = this.body.page();
    this.api = new APIEndpoints(this.page);
  }

  public async count() {
    return this.body.count();
  }
}
