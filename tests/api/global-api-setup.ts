/* See https://playwright.dev/docs/auth#moderate-one-account-per-parallel-worker */

import { APIRequestContext, test as baseTest, request } from "@playwright/test";
import { acquireAccount } from "../../support/data-management";
import { User } from "../../api-endpoints/users-api";
import { LoginResponse } from "../../api-endpoints/rest-user-api";
import { formatBearerToken } from "../../api-base/Helpers/bearer-token";
import API from "../../api-endpoints/api";
import { tokenStorage } from "../../api-base/Helpers/token-storage";

const createdUsers = new Map<number, User>();
const loginResponses = new Map<number, LoginResponse>();

export * from "@playwright/test";

// As web-app we use for testing does't work well when authenticated storage is used,
// we are moving away from documentation and implement autologin in the page fixture,
// which is still good as we get separate user for each test (still supporting parallelism).
export const test = baseTest.extend<unknown, { createdUser?: User; loginResponse?: LoginResponse }>({
  createdUser: [
    async ({}, use) => {
      await use(await aquireUser(await request.newContext()));
    },
    { scope: "worker" },
  ],
  loginResponse: [
    async ({}, use) => {
      await use(await loginToCurrentUser(await request.newContext()));
    },
    { scope: "worker" },
  ],
  request: async ({ request }, use) => {
    if (test.info().title.includes("[no-autologin]")) {
      await use(request);
      return;
    }
    await loginToCurrentUser(request);
    await use(request);
  },
});

async function aquireUser(request?: APIRequestContext) {
  let currentUser = createdUsers.get(test.info().workerIndex);
  if (currentUser) {
    return currentUser;
  }

  currentUser = await acquireAccount(request);
  createdUsers.set(test.info().workerIndex, currentUser);
  return currentUser;
}

async function loginToCurrentUser(request?: APIRequestContext) {
  const currentUser = await aquireUser(request);
  const loggedInResponse = loginResponses.get(test.info().workerIndex);
  if (loggedInResponse) {
    return loggedInResponse;
  }

  const loginAPIResponse = await new API(request).restUser
    .postLogin({
      email: currentUser.payload.email,
      password: currentUser.payload.password,
    })
    .request();

  loginResponses.set(test.info().workerIndex, loginAPIResponse.responseBody);

  const token = formatBearerToken(loginAPIResponse.responseBody.authentication.token);
  // It was decided to use own token handling implementation,
  // as somehow "await page.setExtraHTTPHeaders({ Authorization: token });" is not wokring properly:
  // "Basket shows correct details" test fails with 401 response.
  if (request) tokenStorage.set(request, token);

  return loginAPIResponse.responseBody;
}
