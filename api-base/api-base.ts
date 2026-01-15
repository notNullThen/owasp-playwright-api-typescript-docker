import test, { APIRequestContext, APIResponse, Page, Response } from "@playwright/test";
import APIParametersBase from "./api-parameters-base";
import { tokenStorage } from "./Helpers/token-storage";

export default abstract class APIBase extends APIParametersBase {
  private actualStatusCode: number;

  public async request<T>(context: APIRequestContext) {
    return await test.step(`Request ${this.method} "${this.route}", expect ${this.expectedStatusCodes.join(
      ", "
    )}`, async () => {
      const response: APIResponse = await context.fetch(this.fullURL, {
        method: this.method,
        headers: {
          Authorization: tokenStorage.get(context) || "",
        },
        data: this.body,
        timeout: this.apiWaitTimeout,
      });

      this.actualStatusCode = response.status();
      this.validateStatusCode();

      return await this.getResponse<T>(response);
    });
  }

  public async wait<T>(context: Page) {
    return await test.step(`Wait for ${this.method} "${this.route}" ${this.expectedStatusCodes.join(
      ", "
    )}`, async () => {
      const response = await context.waitForResponse(
        (response) => {
          // Ignore trailing slash and casing differences
          const actualUrl = this.normalizeUrl(response.url());
          const expectedUrl = this.normalizeUrl(this.fullURL);
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

  private async getResponse<T>(response: APIResponse | Response) {
    try {
      const responseObject = await response.json();
      const responseBody = responseObject as T;
      return { response, responseBody };
    } catch {
      try {
        console.error(`Failed to parse JSON response from ${response.url()}: ${await response.text()}`);
      } catch {
        // Ignore any errors while logging
      }
      return { response, responseBody: null };
    }
  }

  private validateStatusCode() {
    if (!this.expectedStatusCodes.includes(this.actualStatusCode)) {
      throw new Error(
        `Expected to return ${this.expectedStatusCodes.join(", ")}, but got ${this.actualStatusCode}.\nEndpoint: ${
          this.method
        } ${this.route} `
      );
    }
  }
}
