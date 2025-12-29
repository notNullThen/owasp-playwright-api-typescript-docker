import { APIRequestContext } from "@playwright/test";
import IntegrationAPI from "../api/base/integration-api";
import { generateRandomUser } from "../data/users-data";
import { User } from "../api/users-integration-api";

export const acquireAccount = async (requestContext: APIRequestContext): Promise<User> => {
  const api = new IntegrationAPI(requestContext);
  const user = generateRandomUser();

  // Create user
  const { responseBody } = await api.users.postUser(user);
  await api.securityAnswers.postSecurityAnswers({
    answer: user.securityAnswer,
    SecurityQuestionId: user.securityQuestion.id,
    UserId: responseBody.data.id,
  });

  return { response: responseBody, payload: user };
};
