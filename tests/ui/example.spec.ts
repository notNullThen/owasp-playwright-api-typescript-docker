import { expect, test } from "../global-setup";

test("has title", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("All Products")).toBeVisible();
});
