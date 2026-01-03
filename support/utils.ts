import { BrowserContext, Locator } from "@playwright/test";
import { additionalConfig } from "../playwright.config";

export default class Utils {
  static PRICE_SYMBOL = "¤" as const;

  static async waitForElementToBeStable(element: Locator) {
    const handle = await element.elementHandle();
    await handle.waitForElementState("stable");
  }

  static formatPrice(price: number) {
    const priceString = price <= 99.99 ? price.toFixed(2) : price.toFixed(0);
    return `${priceString}${Utils.PRICE_SYMBOL}`;
  }

  static getPriceFromText(priceText: string) {
    return Number(priceText.replace(Utils.PRICE_SYMBOL, ""));
  }

  static async dismissCookies(context: BrowserContext) {
    await context.addCookies([
      {
        name: "cookieconsent_status",
        value: "dismiss",
        url: Utils.getBaseUrl(),
      },
    ]);
  }

  static async dismissWelcomeBanner(context: BrowserContext) {
    await context.addCookies([
      {
        name: "welcomebanner_status",
        value: "dismiss",
        url: Utils.getBaseUrl(),
      },
    ]);
  }

  static getBaseUrl() {
    return process.env.CI ? "http://juice-shop:3000" : "http://localhost:3000";
  }

  static connectUrlParts(...parts: string[]) {
    const connectedParts = parts
      .filter((part) => part)
      .map((part) => this.normalizeUrl(part))
      .filter((part) => part.trim().length > 0)
      .join("/");

    return connectedParts + "/";
  }

  static normalizeUrl(url: string) {
    return this.removeLeadingSlash(this.removeTrailingSlash(url));
  }

  static removeTrailingSlash(url: string) {
    return url.endsWith("/") ? url.slice(0, -1) : url;
  }

  static removeLeadingSlash(url: string) {
    return url.startsWith("/") ? url.slice(1) : url;
  }

  // Waits for the base URL to be ready before all tests run
  // Resolves Docker container startup lag
  static async waitForBaseUrlReady() {
    const maxAttempts = additionalConfig.baseUrlReady.retries;
    const delayBetweenAttemptsMs = additionalConfig.baseUrlReady.delay;

    const baseUrl = Utils.getBaseUrl();
    let attempt = 0;
    let isReady = false;

    while (attempt < maxAttempts && !isReady) {
      try {
        const response = await fetch(baseUrl);
        if (response.ok) {
          isReady = true;
          break;
        }
      } catch {
        // Ignore errors and retry
      }

      attempt++;
      await new Promise((resolve) => setTimeout(resolve, delayBetweenAttemptsMs));
    }

    if (!isReady) {
      throw new Error(`Base URL ${baseUrl} does not respond after ${maxAttempts} attempts.`);
    }
  }
}
