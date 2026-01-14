import API from "../../api-endpoints/api";
import { expect, test } from "./global-api-setup";

test("Can search for products", async ({ request }) => {
  const api = new API(request);

  const response = await test.step("Search for products with query 'apple'", async () =>
    await api.products.getSearchProducts("apple").request());

  expect(response.responseBody).not.toBeNull();
  expect(response.responseBody.status).toBe("success");
  expect(response.responseBody.data).not.toBeNull();
  expect(response.responseBody.data.length).toBeGreaterThan(0);

  for (const product of response.responseBody.data) {
    expect(product.name.toLowerCase()).toContain("apple");
  }
});

test("Searching for non-existent product returns empty list", async ({ request }) => {
  const api = new API(request);

  const response = await test.step("Search for products with query 'non-existent-product-12345'", async () =>
    await api.products.getSearchProducts("non-existent-product-12345").request());

  expect(response.responseBody).not.toBeNull();
  expect(response.responseBody.status).toBe("success");
  expect(response.responseBody.data).not.toBeNull();
  expect(response.responseBody.data.length).toBe(0);
});
