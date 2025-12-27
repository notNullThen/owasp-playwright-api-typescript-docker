import { additionalConfig } from "../../playwright.config";
import Utils from "../../support/utils";
import APIDriver, { HttpMethod } from "./api-driver";
import test, { expect, Page } from "@playwright/test";

export default abstract class APIE2EDriver extends APIDriver {
  constructor(protected page: Page, baseUrl: string) {
    super(page.request, baseUrl);
  }

  protected async waitFor<T>(url: string, method: HttpMethod, expectedStatusCode: number) {
    const fullURL = this.getFullURL(url);
    const route = fullURL.replace(Utils.connectUrlParts(process.env.BASE_URL, process.env.ENVIRONMENT), "");

    return await test.step(`Wait for ${method} ${expectedStatusCode} "${route}" API response`, async () => {
      const response = await this.page.waitForResponse(
        (response) => {
          // Ignore trailing slash and casing differences
          const actualUrl = Utils.normalizeUrl(response.url());
          const expectedUrl = Utils.normalizeUrl(fullURL);
          const requestMethod = response.request().method();

          if (!actualUrl.toLowerCase().includes(expectedUrl.toLowerCase())) return false;
          if (requestMethod.toLowerCase() !== method.toLowerCase()) return false;
          return true;
        },
        { timeout: additionalConfig.apiWaitTimeout }
      );

      const status = response.status();
      expect(status, `Expected to return ${expectedStatusCode}. Got ${status}. Method:\n${method} ${route} `).toBe(
        expectedStatusCode
      );

      try {
        const responseObject = await response.json();
        const responseBody = responseObject as T;
        return { response, responseBody };
      } catch {
        return { response, responseBody: null };
      }
    });
  }
}
