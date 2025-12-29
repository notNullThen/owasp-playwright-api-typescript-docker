import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import playwright from "eslint-plugin-playwright";

export default defineConfig([
  {
    ignores: ["**/allure/**"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  tseslint.configs.recommended,

  /* Playwright E2E tests TypeScript files */
  {
    files: ["**/*.ts"],
    extends: [playwright.configs["flat/recommended"]],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.json"],
      },
    },
    rules: {
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/no-floating-promises": "error",

      "@typescript-eslint/no-explicit-any": "off",
      "playwright/expect-expect": "off",
      "playwright/no-nested-step": "off",
      "playwright/no-conditional-in-test": "off",
      "playwright/no-conditional-expect": "off",
      "playwright/prefer-web-first-assertions": "off",
    },
  },
]);
