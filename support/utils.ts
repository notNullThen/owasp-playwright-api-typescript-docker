import { BrowserContext } from "@playwright/test";

export default class Utils {
  public static async dismissCookies(context: BrowserContext) {
    await context.addCookies([
      {
        name: "cookieconsent_status",
        value: "dismiss",
        url: Utils.getBaseUrl(),
      },
    ]);
  }
  public static async dismissWelcomeBanner(context: BrowserContext) {
    await context.addCookies([
      {
        name: "welcomebanner_status",
        value: "dismiss",
        url: Utils.getBaseUrl(),
      },
    ]);
  }
  public static getBaseUrl() {
    return process.env.CI ? "http://juice-shop:3000" : "http://localhost:3000";
  }
  public static connectUrlParts(...parts: string[]) {
    return parts.map((part) => this.normalizeUrl(part)).join("/");
  }
  public static normalizeUrl(url: string) {
    return this.removeLeadingSlash(this.removeTrailingSlash(url));
  }
  public static removeTrailingSlash(url: string) {
    return url.endsWith("/") ? url.slice(0, -1) : url;
  }
  public static removeLeadingSlash(url: string) {
    return url.startsWith("/") ? url.slice(1) : url;
  }
}
