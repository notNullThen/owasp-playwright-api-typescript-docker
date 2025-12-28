import { generateRandomUser } from "../../data/users";
import RegistrationPage from "../../pages/registration-page";
import { expect, test } from "../global-setup";

test("user registration [no-login]", async ({ page }) => {
  const registrationPage = new RegistrationPage(page);
  const generatedUser = generateRandomUser();

  await registrationPage.goto();

  await expect(registrationPage.registerButton).toBeDisabled();

  await registrationPage.emailInput.fill(generatedUser.email);
  await registrationPage.emailInput.shouldNotHaveError();

  await registrationPage.passwordInput.fill(generatedUser.password);
  await registrationPage.passwordInput.shouldNotHaveError();

  await registrationPage.repeatPasswordInput.fill(generatedUser.password);
  await registrationPage.repeatPasswordInput.shouldNotHaveError();

  await registrationPage.submit();
});
