import { Locator } from "@playwright/test";

export default class ComponentBase {
  constructor(public body: Locator) {}

  protected page = this.body.page();

  public async count() {
    return this.body.count();
  }
}
