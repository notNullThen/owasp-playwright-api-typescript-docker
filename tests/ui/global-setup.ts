/* See https://playwright.dev/docs/auth#moderate-one-account-per-parallel-worker */

import { test as baseTest } from "@playwright/test";
import fs from "fs";
import path from "path";
import { acquireAccount } from "../../support/data-management";
import LoginPage from "../../pages/login-page";
import Utils from "../../support/utils";
import { User } from "../../api-endpoints/users-api";

const createdUsers = new Map<number, User>();

export * from "@playwright/test";
export const test = baseTest.extend<unknown, { workerStorageState: string; createdUser?: User }>({
  // Use the same storage state for all tests in this worker.
  storageState: ({ workerStorageState }, use) => use(workerStorageState),

  // Authenticate once per worker with a worker-scoped fixture.
  workerStorageState: [
    async ({ browser }, use) => {
      if (test.info().title.includes("[no-autologin]")) {
        await use(undefined);
        return;
      }

      await Utils.waitForBaseUrlReady();

      const id = test.info().parallelIndex;
      const fileName = path.resolve(test.info().project.outputDir, `.auth/${id}.json`);

      if (fs.existsSync(fileName)) {
        await use(fileName);
        return;
      }

      const context = await browser.newContext({ storageState: undefined, baseURL: Utils.getBaseUrl() });
      await Utils.dismissCookies(context);
      await Utils.dismissWelcomeBanner(context);

      const page = await context.newPage();
      const loginPage = new LoginPage(page);

      const user = await acquireAccount(page.request);
      createdUsers.set(id, user);

      await loginPage.goto();
      await loginPage.login(user.payload.email, user.payload.password);

      await page.context().storageState({ path: fileName });
      await page.close();
      await context.close();
      await use(fileName);
    },
    { scope: "worker" },
  ],
  createdUser: [
    async ({}, use) => {
      const parallelIndex = test.info().parallelIndex;
      await use(createdUsers.get(parallelIndex));
    },
    { scope: "worker" },
  ],
});

test.beforeEach(async ({ page }) => {
  const context = page.context();
  await Utils.dismissCookies(context);
  await Utils.dismissWelcomeBanner(context);
});
