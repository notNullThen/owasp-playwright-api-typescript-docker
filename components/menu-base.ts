import test, { expect } from "@playwright/test";
import ComponentBase from "./component-base";

export default class MenuBase extends ComponentBase {
  get menu() {
    return this.page.getByRole("menu");
  }

  async close() {
    await test.step(`Close ${this.name}`, async () => {
      const oldMenuCount = await this.menu.count();
      await this.page.keyboard.press("Escape");
      await expect(this.menu).toHaveCount(oldMenuCount - 1);
    });
  }
}
