import { Page } from "@playwright/test";
import ComponentBase from "./component-base";
import InputFormField from "./input-form-field";

export default class SearchBar extends ComponentBase {
  constructor(page: Page) {
    super("Search Bar", page.locator("app-mat-search-bar"));
  }

  searchInput = new InputFormField({ name: "Search Input", parent: this.body });
}
