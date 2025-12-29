import test, { APIRequestContext, APIResponse, Response } from "@playwright/test";
import Utils from "../../support/utils";
import { additionalConfig } from "../../playwright.config";
import config from "../../playwright.config";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "HEAD" | "PATCH";

export type RequestParameters = {
  url: string;
  method: HttpMethod;
  expectedStatusCodes?: number[];
  body?: object;
};

export default class APIIntegrationDriver {
  protected apiWaitTimeout = additionalConfig.apiWaitTimeout;
  protected fullURL: string;
  protected route: string;
  protected method: HttpMethod;
  protected expectedStatusCodes: number[];

  constructor(private context: APIRequestContext, protected baseAPIURL: string, private options: RequestParameters) {
    this.baseAPIURL = Utils.connectUrlParts(config.use.baseURL, this.baseAPIURL);
    this.fullURL = Utils.connectUrlParts(this.baseAPIURL, this.options.url);
    this.route = this.fullURL.replace(Utils.connectUrlParts(config.use.baseURL), "");
    this.method = this.options.method;
    this.expectedStatusCodes = this.options.expectedStatusCodes ?? additionalConfig.expectedAPIResponseCodes;
  }

  protected actualStatusCode: number;

  public async request<T>() {
    const { body } = this.options;

    return await test.step(`Request ${this.method} "${this.route}", expect ${this.expectedStatusCodes.join(
      ", "
    )}`, async () => {
      // @ts-expect-error we use string to define what http-method function we want to call, so initially TS complains here
      const response: APIResponse = await this.context[this.method.toLowerCase()](this.fullURL, {
        data: body,
        timeout: additionalConfig.apiWaitTimeout,
      });

      this.actualStatusCode = response.status();
      this.validateStatusCode();

      return await this.getResponse<T>(response);
    });
  }

  protected async getResponse<T>(response: APIResponse | Response) {
    try {
      const responseObject = await response.json();
      const responseBody = responseObject as T;
      return { response, responseBody };
    } catch {
      return { response, responseBody: null };
    }
  }

  protected validateStatusCode() {
    if (!this.expectedStatusCodes.includes(this.actualStatusCode)) {
      throw new Error(
        `Expected to return ${this.expectedStatusCodes.join(", ")}, but got ${this.actualStatusCode}.\nEndpoint: ${
          this.method
        } ${this.route} `
      );
    }
  }
}
