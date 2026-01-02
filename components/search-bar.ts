import test, { Page } from "@playwright/test";
import ComponentBase from "./component-base";
import InputFormField from "./input-form-field";

export default class SearchBar extends ComponentBase {
  constructor(page: Page) {
    super("Search Bar", page.locator("app-mat-search-bar"));
  }

  get searchInput() {
    return new InputFormField({ componentName: "Search", parent: this.body });
  }

  async search(query: string) {
    await test.step(`Search in ${this.componentName} for "${query}"`, async () => {
      const resultsText = this.page.getByText(`Search Results - ${query}`);

      await this.body.click();
      await this.searchInput.fill(query);
      await this.searchInput.pressEnter();
      await resultsText.waitFor({ state: "visible" });
    });
  }
}
