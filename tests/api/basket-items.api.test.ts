import APIEndpoints from "../../api-endpoints/api-endpoints";
import { expect, test } from "./global-api-setup";

test("User can add item to basket", async ({ request, loginResponse }) => {
  const api = new APIEndpoints(request);

  const productsResponse = await api.products.getSearchProducts("").request();

  expect(productsResponse.responseBody.data).not.toBeNull();
  expect(productsResponse.responseBody.data.length).toBeGreaterThan(0);

  const productToAdd = productsResponse.responseBody.data[0];

  expect(productToAdd.id).toBeGreaterThan(0);

  const basketId = loginResponse.authentication.bid;
  expect(basketId, "Basket ID (from login) should be valid").toBeGreaterThan(0);

  const addResponse = await api.basketItems
    .postBasketItems({
      BasketId: basketId.toString(),
      ProductId: productToAdd.id,
      quantity: 1,
    })
    .request();

  expect(addResponse.responseBody).not.toBeNull();
  const addedItem = addResponse.responseBody;

  expect(addResponse.responseBody).not.toBeNull();

  expect(addedItem).not.toBeNull();
  expect(addedItem.data.id, "Added item ID should be valid").toBeGreaterThan(0);
  expect(addedItem.data.ProductId).toBe(productToAdd.id);
  expect(addedItem.data.BasketId).toBe(basketId.toString());
  expect(addedItem.data.quantity).toBe(1);
});
