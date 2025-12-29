import { APIRequestContext, Page } from "@playwright/test";
import APIE2EDriver from "./api-e2e-driver";
import APIIntegrationDriver, { RequestParameters } from "./api-integration-driver";

export default abstract class APIDriver {
  constructor(protected baseURL: string) {}

  protected action<T>(options: RequestParameters) {
    return {
      request: async (apiRequestContext: APIRequestContext) => {
        const apiDriver = new APIIntegrationDriver(apiRequestContext, this.baseURL, options);
        return await apiDriver.request<T>();
      },

      wait: async (page: Page) => {
        const apiE2EDriver = new APIE2EDriver(page, this.baseURL, options);
        return await apiE2EDriver.waitFor<T>();
      },
    };
  }
}
