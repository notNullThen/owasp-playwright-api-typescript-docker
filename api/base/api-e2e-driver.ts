import Utils from "../../support/utils";
import APIIntegrationDriver, { RequestParameters as RequestOptions } from "./api-integration-driver";
import test, { Page } from "@playwright/test";

export default class APIE2EDriver extends APIIntegrationDriver {
  constructor(private page: Page, baseAPIURL: string, options: RequestOptions) {
    super(page.request, baseAPIURL, options);
  }

  public async waitFor<T>() {
    return await test.step(`Wait for ${this.method} "${this.route}" ${this.expectedStatusCodes.join(
      ", "
    )}`, async () => {
      const response = await this.page.waitForResponse(
        (response) => {
          // Ignore trailing slash and casing differences
          const actualUrl = Utils.normalizeUrl(response.url());
          const expectedUrl = Utils.normalizeUrl(this.fullURL);
          const requestMethod = response.request().method();

          if (!actualUrl.toLowerCase().includes(expectedUrl.toLowerCase())) return false;
          if (requestMethod.toLowerCase() !== this.method.toLowerCase()) return false;
          return true;
        },
        { timeout: this.apiWaitTimeout }
      );

      this.actualStatusCode = response.status();
      this.validateStatusCode();

      return await this.getResponse<T>(response);
    });
  }
}
