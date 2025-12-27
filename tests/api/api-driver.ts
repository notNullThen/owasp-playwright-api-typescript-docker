import test, { APIRequestContext, APIResponse, expect } from "@playwright/test";
import Utils from "../../support/utils";
import { additionalConfig } from "../../playwright.config";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "HEAD" | "PATCH";

export default abstract class APIDriver {
  constructor(private apiRequestContext: APIRequestContext, protected baseUrl: string) {
    this.baseUrl = Utils.connectUrlParts(process.env.BASE_URL, process.env.ENVIRONMENT, "api", this.baseUrl);
  }

  protected async request<T>(url: string, method: HttpMethod, expectedStatusCode?: number, body?: object) {
    const fullURL = this.getFullURL(url);
    const route = fullURL.replace(Utils.connectUrlParts(process.env.BASE_URL, process.env.ENVIRONMENT), "");

    return await test.step(`Request ${method}${
      expectedStatusCode ? ` ${expectedStatusCode}` : ""
    } "${route}"`, async () => {
      // @ts-expect-error we use string to define what http-method function we want to call, so initially TS complains here
      const response: APIResponse = await this.apiRequestContext[method.toLowerCase()](fullURL, {
        data: body,
        timeout: additionalConfig.apiWaitTimeout,
      });

      if (expectedStatusCode) {
        const status = response.status();
        expect(status, `Expected to return ${expectedStatusCode}. Got ${status}. Method:\n${method} ${route} `).toBe(
          expectedStatusCode
        );
      }

      try {
        const responseObject = await response.json();
        const responseBody = responseObject as T;
        return { response, responseBody };
      } catch {
        return { response, responseBody: null };
      }
    });
  }

  protected getFullURL(url: string) {
    if (!url) url = "";
    return url.trim().length === 0 ? this.baseUrl : Utils.connectUrlParts(this.baseUrl, url);
  }
}
