import HomePage from "../../pages/home-page";
import { productsData } from "../../data/products-data";
import { expect, test } from "./global-setup";

test("Can search for name", async ({ page }) => {
  const homePage = new HomePage(page);
  const partialName = productsData.raspberryJuice.name.split(" ")[0];

  await homePage.goto();
  await homePage.header.searchBar.search(partialName);

  const productTile = homePage.productTiles.getByName(productsData.raspberryJuice.name);
  await expect(productTile.body).toBeVisible();
});
