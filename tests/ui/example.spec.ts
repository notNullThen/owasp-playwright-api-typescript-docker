import { expect, test } from "../global-setup";

test.describe("Homepage", () => {
  test("has title", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText("All Products")).toBeVisible();

    await page.locator("#navbarAccount").click();
    const text = await page.getByRole("menuitem").first().innerText();
    console.log("!#!#!# USER:", text);
  });

  test("has title 2", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText("All Products")).toBeVisible();

    await page.locator("#navbarAccount").click();
    const text = await page.getByRole("menuitem").first().innerText();
    console.log("!#!#!# USER:", text);
  });

  test("has title 3", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText("All Products")).toBeVisible();

    await page.locator("#navbarAccount").click();
    const text = await page.getByRole("menuitem").first().innerText();
    console.log("!#!#!# USER:", text);
  });
});
