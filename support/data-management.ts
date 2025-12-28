import { APIRequestContext } from "@playwright/test";
import IntegrationAPI from "../api/base/integration-api";
import { generateRandomUser } from "../data/users";
import { User } from "../api/users-integration-api";

export const acquireAccount = async (requestContext: APIRequestContext): Promise<User> => {
  const integrationAPI = new IntegrationAPI(requestContext);
  const user = generateRandomUser();

  const { responseBody } = await integrationAPI.users.postUser(user);
  return { response: responseBody, payload: user };
};
