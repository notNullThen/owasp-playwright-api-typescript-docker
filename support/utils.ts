import { BrowserContext, Locator } from "@playwright/test";

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
    return parts
      .filter((part) => part && part.trim().length > 0)
      .map((part) => this.normalizeUrl(part))
      .join("/");
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
}
