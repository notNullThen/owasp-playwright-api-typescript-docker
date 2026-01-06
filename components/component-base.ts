import { Locator } from "@playwright/test";
import API from "../api-endpoints/api";

export default abstract class ComponentBase {
  constructor(protected componentName: string, public body: Locator) {}

  protected page = this.body.page();
  protected api = new API(this.page);

  public async count() {
    return this.body.count();
  }
}
