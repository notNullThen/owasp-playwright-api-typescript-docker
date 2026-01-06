/* See https://playwright.dev/docs/auth#moderate-one-account-per-parallel-worker */

import { test as baseTest } from "@playwright/test";
import { acquireAccount } from "../../support/data-management";
import LoginPage from "../../pages/login-page";
import Utils from "../../support/utils";
import { User } from "../../api-endpoints/users-api";

const createdUsers = new Map<number, User>();

export * from "@playwright/test";
export const test = baseTest.extend<unknown, { createdUser?: User }>({
  createdUser: [
    async ({}, use) => {
      const workerIndex = test.info().workerIndex;
      await use(createdUsers.get(workerIndex));
    },
    { scope: "worker" },
  ],
  page: async ({ page }, use) => {
    const context = page.context();
    const loginPage = new LoginPage(page);

    const workerIndex = test.info().workerIndex;

    await Utils.dismissCookies(context);
    await Utils.dismissWelcomeBanner(context);
    await Utils.waitForBaseUrlReady();

    if (test.info().title.includes("[no-autologin]")) {
      await use(page);
      return;
    }

    const user = await acquireAccount(context.request);
    createdUsers.set(workerIndex, user);

    await loginPage.goto();
    await loginPage.login(user.payload.email, user.payload.password);

    await use(page);
  },
});

test.beforeEach(async ({ page }) => {
  const context = page.context();
  await Utils.dismissCookies(context);
  await Utils.dismissWelcomeBanner(context);
});
