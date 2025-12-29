import { APIRequestContext } from "@playwright/test";
import { generateRandomUser } from "../data/users-data";
import { User } from "../api/users-api";
import API from "../api/base/api";

export const acquireAccount = async (requestContext: APIRequestContext): Promise<User> => {
  const api = new API();
  const user = generateRandomUser();

  // Create user
  const { responseBody } = await api.users.postUser(user).request(requestContext);
  await api.securityAnswers.postSecurityAnswers({
    answer: user.securityAnswer,
    SecurityQuestionId: user.securityQuestion.id,
    UserId: responseBody.data.id,
  });

  return { response: responseBody, payload: user };
};
