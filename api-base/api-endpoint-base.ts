import { APIRequestContext, Page } from "@playwright/test";
import APIBase, { RequestParameters } from "./api-base";

export type APIContext = Page | APIRequestContext;

export default abstract class APIEndpointBase {
  constructor(
    private context: APIContext,
    private baseURL: string,
  ) {}

  public action<T>(params: RequestParameters) {
    return {
      request: async () => {
        return await new APIBase(this.baseURL, params).request<T>(this.context as APIRequestContext);
      },

      wait: async () => {
        const isPage = "goto" in this.context;
        if (!isPage) {
          throw new Error("You can use wait() only in the context of UI Tests (context should be of 'Page' type)");
        }

        return await new APIBase(this.baseURL, params).wait<T>(this.context as Page);
      },
    };
  }
}
