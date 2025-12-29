import HomePage from "../../components/home-page";
import { productsData } from "../../data/products-data";
import { test } from "../global-setup";

test("Can search for name", async ({ page }) => {
  const homePage = new HomePage(page);
  const partialName = productsData.raspberryJuice.name.split(" ")[0];

  await homePage.goto();
  await homePage.header.searchBar.search(partialName);
});
