import { productsData } from "../../data/products-data";
import BasketPage from "../../pages/basket-page";
import HomePage from "../../pages/home-page";
import { expect, test } from "./global-setup";

test("Can search and add product to basket", async ({ page }) => {
  const homePage = new HomePage(page);
  const basketPage = new BasketPage(page);
  const product = productsData.bananaJuice;
  const partialName = product.name.split(" ")[0];

  await homePage.goto();
  await homePage.header.searchBar.search(partialName);
  await homePage.productTiles.getByName(product.name).addToBasket();

  await basketPage.goto();
  const expectedProduct = await basketPage.products.getByName(product.name);
  await expect(expectedProduct.body).toBeVisible();
});
