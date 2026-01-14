import { productsData } from "../../data/products-data";
import BasketPage from "../../pages/basket-page";
import HomePage from "../../pages/home-page";
import { addProductToBasket } from "../../support/helpers/basket-helper";
import { getProductByName } from "../../support/helpers/product-hepler";
import { expect, test } from "./global-ui-setup";

test("Can search and add product to basket", async ({ page }) => {
  const homePage = new HomePage(page);
  const basketPage = new BasketPage(page);
  const product = productsData.bananaJuice;
  const partialName = product.name.split(" ")[0];

  await homePage.goto();
  await homePage.header.searchBar.search(partialName);
  await homePage.productTiles.getByName(product.name).addToBasket();

  await page.reload();
  await basketPage.goto();
  const expectedProduct = await basketPage.products.getByName(product.name);
  await expect(expectedProduct.body).toBeVisible();
});

test("Basket shows correct details", async ({ page, loginResponse }) => {
  const basketPage = new BasketPage(page);

  const product = productsData.bananaJuice;
  const searchQuery = product.name.split(" ")[0].toLowerCase();
  const productResponse = await getProductByName(searchQuery, page.request);
  const basketId = loginResponse.authentication.bid;
  const quantity = 2;

  await addProductToBasket({ basketId, productId: productResponse.id, quantity }, page.request);

  await basketPage.goto();
  const row = basketPage.products.getByIndex(0);

  const rowProductName = await row.getProductName();
  test.expect(rowProductName).toBe(product.name);

  const rowQuantity = await row.getQuantityValue();
  test.expect(rowQuantity).toBe(quantity);

  const rowPrice = await row.getPriceValue();
  test.expect(rowPrice).toBe(product.price);

  const totalPrice = await basketPage.getTotalPriceValue();
  test.expect(totalPrice).toBe(product.price * quantity);
});
