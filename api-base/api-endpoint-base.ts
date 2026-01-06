import { APIRequestContext, Page } from "@playwright/test";
import APIBase from "./api-base";
import { RequestParameters } from "./api-parameters-base";

export type APIContext = Page | APIRequestContext;

export default abstract class APIEndpointBase extends APIBase {
  constructor(private context: APIContext, baseURL: string) {
    super(baseURL);
  }

  public action<T>(params: RequestParameters) {
    return {
      request: async () => {
        return await this.aquireParameters(params).request<T>(this.context as APIRequestContext);
      },

      wait: async () => {
        const isPage = "goto" in this.context;
        if (!isPage) {
          throw new Error("You can use wait() only in the context of UI Tests (context should be of 'Page' type)");
        }

        return await this.aquireParameters(params).wait<T>(this.context as Page);
      },
    };
  }
}
