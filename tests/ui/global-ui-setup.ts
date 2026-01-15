/* See https://playwright.dev/docs/auth#moderate-one-account-per-parallel-worker */

import { APIRequestContext, test as baseTest } from "@playwright/test";
import { acquireAccount } from "../../support/data-management";
import LoginPage from "../../pages/login-page";
import Utils from "../../support/utils";
import { User } from "../../api-endpoints/users-api";
import { LoginResponse } from "../../api-endpoints/rest-user-api";
import { formatBearerToken } from "../../api-base/helpers/bearer-token";
import { tokenStorage } from "../../api-base/helpers/token-storage";

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

    await Utils.dismissCookies(context);
    await Utils.dismissWelcomeBanner(context);
    await Utils.waitForBaseUrlReady();

    if (test.info().title.includes("[no-autologin]")) {
      await use(page);
      return;
    }

    await loginToCurrentUser(context.request, loginPage);

    await use(page);
  },
});

test.beforeEach(async ({ page }) => {
  const context = page.context();
  await Utils.dismissCookies(context);
  await Utils.dismissWelcomeBanner(context);
});

async function aquireUser(request: APIRequestContext) {
  let currentUser = createdUsers.get(test.info().workerIndex);
  if (currentUser) {
    return currentUser;
  }

  currentUser = await acquireAccount(request);
  createdUsers.set(test.info().workerIndex, currentUser);
  return currentUser;
}

async function loginToCurrentUser(request: APIRequestContext, loginPage: LoginPage) {
  const currentUser = await aquireUser(request);
  const workerIndex = test.info().workerIndex;
  const loggedInResponse = loginResponses.get(workerIndex);
  if (loggedInResponse) {
    return loggedInResponse;
  }

  await loginPage.goto();
  const loginAPIResponse = await loginPage.login(currentUser.payload.email, currentUser.payload.password);

  loginResponses.set(workerIndex, loginAPIResponse.responseBody);

  const token = formatBearerToken(loginAPIResponse.responseBody.authentication.token);
  // It was decided to use own token handling implementation,
  // as somehow "await page.setExtraHTTPHeaders({ Authorization: token });" is not wokring properly:
  // "Basket shows correct details" test fails with 401 response.
  tokenStorage.set(request, token);

  return loginAPIResponse;
}
