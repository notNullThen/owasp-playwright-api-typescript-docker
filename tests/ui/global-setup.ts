/* See https://playwright.dev/docs/auth#moderate-one-account-per-parallel-worker */

import { test as baseTest } from "@playwright/test";
import { acquireAccount } from "../../support/data-management";
import LoginPage from "../../pages/login-page";
import Utils from "../../support/utils";
import { User } from "../../api-endpoints/users-api";
import { LoginResponse } from "../../api-endpoints/rest-user-api";
import APIParametersBase from "../../api-base/api-parameters-base";
import { formatBearerToken } from "../../api-base/Helpers/bearer-token";

const createdUsers = new Map<number, User>();
const loginResponses = new Map<number, LoginResponse>();

export * from "@playwright/test";

// As web-app we use for testing does't work well when authenticated storage is used,
// we are moving away from documentation and implement autologin in the page fixture,
// which is still good as we get separate user for each test (still supporting parallelism).
export const test = baseTest.extend<unknown, { createdUser?: User; loginResponse?: LoginResponse }>({
  createdUser: [
    async ({}, use) => {
      const workerIndex = test.info().workerIndex;
      await use(createdUsers.get(workerIndex));
    },
    { scope: "worker" },
  ],
  loginResponse: [
    async ({}, use) => {
      const workerIndex = test.info().workerIndex;
      await use(loginResponses.get(workerIndex));
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
    const loginAPIResponse = await loginPage.login(user.payload.email, user.payload.password);

    loginResponses.set(workerIndex, loginAPIResponse.responseBody);
    const token = formatBearerToken(loginAPIResponse.responseBody.authentication.token);
    APIParametersBase.setToken(token);

    await use(page);
  },
});

test.beforeEach(async ({ page }) => {
  const context = page.context();
  await Utils.dismissCookies(context);
  await Utils.dismissWelcomeBanner(context);
});
