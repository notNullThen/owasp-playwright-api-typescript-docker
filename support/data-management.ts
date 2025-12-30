import { APIRequestContext } from "@playwright/test";
import { generateRandomUser } from "../data/users-data";
import { User } from "../api/users-api";
import API from "../api/api";

export const acquireAccount = async (context: APIRequestContext): Promise<User> => {
  const api = new API(context);
  const user = generateRandomUser();

  // Create user
  const response = await api.users.createUser(user);
  await api.securityAnswers
    .postSecurityAnswers({
      answer: user.securityAnswer,
      SecurityQuestionId: user.securityQuestion.id,
      UserId: response.data.id,
    })
    .request();

  return { response: response, payload: user };
};
