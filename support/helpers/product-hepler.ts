import test, { APIRequestContext } from "@playwright/test";
import API from "../../api-endpoints/api";

export const getProductByName = async (name: string, context: APIRequestContext) => {
  return await test.step(`Get product with name "${name}"`, async () => {
    const searchResults = await new API(context).products.getSearchProducts(name).request();

    const product = searchResults.responseBody.data.find((product) =>
      product.name.toLowerCase().includes(name.toLowerCase()),
    );
    if (!product) throw new Error(`Product with name "${name}" not found in search results`);

    return product;
  });
};
