import { APIRequestContext, Page } from "@playwright/test";
import APIEndpointBase, { RequestParameters } from "./api-endpoint-base";

export type Context = Page | APIRequestContext;

export default abstract class APIBase extends APIEndpointBase {
  constructor(private context: Context, baseURL: string) {
    super(baseURL);
  }

  public action<T>(params: RequestParameters) {
    const isRequestContext = !("goto" in this.context);

    if (isRequestContext) {
      return {
        request: async () => {
          return await this.setParameters(params).request<T>(this.context as APIRequestContext);
        },
      };
    }

    return {
      request: async () => {
        return await this.setParameters(params).request<T>(this.context as APIRequestContext);
      },

      wait: async () => {
        return await this.setParameters(params).wait<T>(this.context as Page);
      },
    };
  }
}
