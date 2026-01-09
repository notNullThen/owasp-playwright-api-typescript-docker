import { generateRandomUser } from "../../data/users-data";
import LoginPage from "../../pages/login-page";
import RegistrationPage from "../../pages/registration-page";
import { acquireAccount } from "../../support/data-management";
import { expect, test } from "./global-setup";

test("User Registration [no-autologin]", async ({ page }) => {
  const registrationPage = new RegistrationPage(page);

  const generatedUser = generateRandomUser();

  await registrationPage.goto();

  await expect(registrationPage.registerButton).toBeDisabled();

  await registrationPage.registerUser({
    email: generatedUser.email,
    password: generatedUser.password,
    securityQuestion: generatedUser.securityQuestion.question,
    securityAnswer: generatedUser.securityAnswer,
  });
});

test("User Login [no-autologin]", async ({ page, request }) => {
  const loginPage = new LoginPage(page);

  const createdUser = await acquireAccount(request);

  await loginPage.goto();
  await loginPage.login(createdUser.payload.email, createdUser.payload.password);
});
