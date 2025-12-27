import { additionalConfig } from "../playwright.config";
import Utils from "../support/utils";
import APIDriver, { HttpMethod } from "./api-driver";
import test, { Page } from "@playwright/test";

export default abstract class APIE2EDriver extends APIDriver {
  constructor(protected page: Page, baseUrl: string) {
    super(page.request, baseUrl);
  }

  protected async waitFor<T>(url: string, method: HttpMethod, expectedStatusCodes?: number[]) {
    this.expectedStatusCodes = expectedStatusCodes ?? this.expectedStatusCodes;
    this.method = method;
    this.fullURL = this.getFullURL(url);
    this.route = this.fullURL.replace(Utils.connectUrlParts(process.env.BASE_URL, process.env.ENVIRONMENT), "");

    return await test.step(`Wait for ${method} "${this.route}" ${this.expectedStatusCodes.join(", ")}`, async () => {
      const response = await this.page.waitForResponse(
        (response) => {
          // Ignore trailing slash and casing differences
          const actualUrl = Utils.normalizeUrl(response.url());
          const expectedUrl = Utils.normalizeUrl(this.fullURL);
          const requestMethod = response.request().method();

          if (!actualUrl.toLowerCase().includes(expectedUrl.toLowerCase())) return false;
          if (requestMethod.toLowerCase() !== method.toLowerCase()) return false;
          return true;
        },
        { timeout: additionalConfig.apiWaitTimeout }
      );

      this.actualStatusCode = response.status();
      this.validateStatusCode();

      return await this.getResponse<T>(response);
    });
  }
}
