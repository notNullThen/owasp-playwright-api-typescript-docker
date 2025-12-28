import { generateRandomUser } from "../../data/users";
import LoginPage from "../../pages/login-page";
import RegistrationPage from "../../pages/registration-page";
import { expect, test } from "../global-setup";

test("user registration & login [no-login]", async ({ page }) => {
  const registrationPage = new RegistrationPage(page);
  const loginPage = new LoginPage(page);

  const generatedUser = generateRandomUser();

  await registrationPage.goto();

  await expect(registrationPage.registerButton).toBeDisabled();

  await registrationPage.registerUser({
    email: generatedUser.email,
    password: generatedUser.password,
    securityQuestion: generatedUser.securityQuestion.question,
    securityAnswer: generatedUser.securityAnswer,
  });

  await page.waitForURL("**/login");

  await loginPage.login(generatedUser.email, generatedUser.password);
});
