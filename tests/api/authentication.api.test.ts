import API from "../../api-endpoints/api";
import { expect, test } from "./global-api-setup";

test("User can authenticate successfully", async ({ request, createdUser }) => {
  const api = new API(request);

  const response = await api.restUser
    .postLogin({
      email: createdUser.payload.email,
      password: createdUser.payload.password,
    })
    .request();

  const loginResponse = response.responseBody.authentication;

  expect(response.responseBody).toBeDefined();
  expect(loginResponse.umail).toBe(createdUser.payload.email);
  expect(loginResponse.token).toBeDefined();
  expect(createdUser.payload.email).toBe(loginResponse.umail);
  expect(loginResponse.bid).toBeGreaterThan(0);
});
