import { Locator } from "@playwright/test";
import APIEndpoints from "../api-endpoints/api-endpoints";

export default abstract class ComponentBase {
  constructor(
    protected componentName: string,
    public body: Locator,
  ) {}

  protected page = this.body.page();
  protected api = new APIEndpoints(this.page);

  public async count() {
    return this.body.count();
  }
}
