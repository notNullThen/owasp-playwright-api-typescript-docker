import { Locator } from "@playwright/test";

export default abstract class ComponentBase {
  constructor(protected componentName: string, public body: Locator) {}

  protected page = this.body.page();

  public async count() {
    return this.body.count();
  }
}
