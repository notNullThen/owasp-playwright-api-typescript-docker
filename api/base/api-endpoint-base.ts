import test, { APIRequestContext, APIResponse, Page, Response } from "@playwright/test";
import { additionalConfig } from "../../playwright.config";
import config from "../../playwright.config";
import Utils from "../../support/utils";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "HEAD" | "PATCH";

export type RequestParameters = {
  url: string;
  method: HttpMethod;
  expectedStatusCodes?: number[];
  body?: object;
};

export default abstract class APIEndpointBase {
  private apiWaitTimeout = additionalConfig.apiWaitTimeout;
  private fullURL: string;
  private route: string;
  private method: HttpMethod;
  private expectedStatusCodes: number[];
  private params: RequestParameters;

  constructor(private baseAPIURL: string) {
    this.baseAPIURL = Utils.connectUrlParts(config.use.baseURL, this.baseAPIURL);
  }

  private actualStatusCode: number;

  public setParameters(params: RequestParameters) {
    this.fullURL = Utils.connectUrlParts(this.baseAPIURL, params.url);
    this.route = this.fullURL.replace(Utils.connectUrlParts(config.use.baseURL), "");
    this.method = params.method;
    this.expectedStatusCodes = params.expectedStatusCodes ?? additionalConfig.expectedAPIResponseCodes;
    this.params = params;
    return this;
  }

  public async request<T>(context: APIRequestContext) {
    return await test.step(`Request ${this.method} "${this.route}", expect ${this.expectedStatusCodes.join(
      ", "
    )}`, async () => {
      // @ts-expect-error we use string to define what http-method function we want to call, so initially TS complains here
      const response: APIResponse = await context[this.method.toLowerCase()](this.fullURL, {
        data: this.params.body,
        timeout: additionalConfig.apiWaitTimeout,
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

  private async getResponse<T>(response: APIResponse | Response) {
    try {
      const responseObject = await response.json();
      const responseBody = responseObject as T;
      return { response, responseBody };
    } catch {
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
