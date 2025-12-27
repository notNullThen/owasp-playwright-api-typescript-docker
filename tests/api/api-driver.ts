import test, { APIRequestContext, APIResponse, Response } from "@playwright/test";
import Utils from "../../support/utils";
import { additionalConfig } from "../../playwright.config";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "HEAD" | "PATCH";

export default abstract class APIDriver {
  constructor(private apiRequestContext: APIRequestContext, protected baseUrl: string) {
    this.baseUrl = Utils.connectUrlParts(process.env.BASE_URL, process.env.ENVIRONMENT, "api", this.baseUrl);
  }

  protected method: HttpMethod;
  protected fullURL: string;
  protected route: string;
  protected actualStatusCode: number;
  protected expectedStatusCodes = [200, 201];

  protected async request<T>(url: string, method: HttpMethod, expectedStatusCodes?: number[], body?: object) {
    this.expectedStatusCodes = expectedStatusCodes ?? this.expectedStatusCodes;
    this.method = method;
    this.fullURL = this.getFullURL(url);
    this.route = this.fullURL.replace(Utils.connectUrlParts(process.env.BASE_URL, process.env.ENVIRONMENT), "");

    return await test.step(`Request ${method} "${this.route}", expect ${this.expectedStatusCodes.join(
      ", "
    )}`, async () => {
      // @ts-expect-error we use string to define what http-method function we want to call, so initially TS complains here
      const response: APIResponse = await this.apiRequestContext[method.toLowerCase()](this.fullURL, {
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
        `Expected to return ${this.expectedStatusCodes.join(", ")}, but got ${this.actualStatusCode}. Endpoint:\n${
          this.method
        } ${this.route} `
      );
    }
  }

  protected getFullURL(url: string) {
    if (!url) url = "";
    return url.trim().length === 0 ? this.baseUrl : Utils.connectUrlParts(this.baseUrl, url);
  }
}
