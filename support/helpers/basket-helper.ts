import test from "@playwright/test";
import API from "../../api-endpoints/api";
import { APIContext } from "../../api-base/api-endpoint-base";

export const addProductToBasket = async (
  options: { basketId: number; productId: number; quantity: number },
  context: APIContext,
) => {
  const { basketId, productId, quantity } = options;

  return await test.step(`Add product with ID '${productId}' to basket with ID '${basketId}'`, async () =>
    await new API(context).basketItems
      .postBasketItems({
        BasketId: basketId.toString(),
        ProductId: productId,
        quantity: quantity,
      })
      .request());
};
