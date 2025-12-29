import { faker } from "@faker-js/faker";
import { UserPayload } from "../api/users-api";

export const generateRandomUser = () => {
  const password = faker.internet.password();

  const user: UserPayload = {
    email: faker.internet.email(),
    password: password,
    passwordRepeat: password,
    securityQuestion: {
      id: generateRandomId(),
      question: "Your eldest siblings middle name?",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    securityAnswer: faker.person.middleName(),
  };

  return user;
};

const generateRandomId = () => {
  return Date.now() + Math.floor(Math.random() * 1000);
};
