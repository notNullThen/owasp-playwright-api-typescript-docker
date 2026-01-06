import { additionalConfig } from "../playwright.config";
import Utils from "../support/utils";
import config from "../playwright.config";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "HEAD" | "PATCH";

export type RequestParameters = {
  url?: string;
  method: HttpMethod;
  expectedStatusCodes?: number[];
  body?: object;
};

export default abstract class APIParametersBase {
  protected apiWaitTimeout = additionalConfig.apiWaitTimeout;
  protected fullURL: string;
  protected route: string;
  protected method: HttpMethod;
  protected expectedStatusCodes: number[];
  protected params: RequestParameters;

  constructor(private baseAPIURL: string) {
    this.baseAPIURL = Utils.connectUrlParts(config.use.baseURL, this.baseAPIURL);
  }

  protected aquireParameters(params: RequestParameters) {
    // Cloning the current instance to avoid racing conditions when calling API endpoints in parallel (Promise.all)
    const clone = Object.create(this) as APIParametersBase;

    clone.fullURL = Utils.connectUrlParts(this.baseAPIURL, params.url);
    clone.route = clone.fullURL.replace(Utils.connectUrlParts(config.use.baseURL), "");
    clone.method = params.method;
    clone.expectedStatusCodes = params.expectedStatusCodes ?? additionalConfig.expectedAPIResponseCodes;
    clone.params = params;

    return clone as this;
  }
}
