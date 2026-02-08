type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "HEAD" | "PATCH";

export type RequestParameters = {
  url?: string;
  method: HttpMethod;
  expectedStatusCodes?: number[];
  body?: object;
  apiWaitTimeout?: number;
};

export default abstract class APIParametersBase {
  protected static initialApiWaitTimeout: number;
  protected static initialExpectedStatusCodes: number[];
  protected static baseURL: string;

  protected apiWaitTimeout?: number;
  protected expectedStatusCodes?: number[];
  protected fullURL?: string;
  protected route?: string;
  protected method?: HttpMethod;
  protected body?: object;

  constructor(private baseAPIURL: string) {
    this.baseAPIURL = this.connectUrlParts(APIParametersBase.baseURL, this.baseAPIURL);
  }

  protected aquireParameters(params: RequestParameters) {
    this.fullURL = this.connectUrlParts(this.baseAPIURL, params.url || "");
    this.route = this.fullURL.replace(this.connectUrlParts(APIParametersBase.baseURL), "");
    this.method = params.method;
    this.expectedStatusCodes = params.expectedStatusCodes ?? APIParametersBase.initialExpectedStatusCodes;
    this.apiWaitTimeout = params.apiWaitTimeout ?? APIParametersBase.initialApiWaitTimeout;
    this.body = params.body;

    return this;
  }

  public static setInitialConfig(options: { apiWaitTimeout: number; expectedStatusCodes: number[]; baseURL: string }) {
    const { apiWaitTimeout, expectedStatusCodes, baseURL } = options;
    this.initialApiWaitTimeout = apiWaitTimeout;
    this.initialExpectedStatusCodes = expectedStatusCodes;
    this.baseURL = baseURL;
  }

  protected connectUrlParts(...parts: string[]) {
    const connectedParts = parts
      .filter((part) => part)
      .map((part) => this.normalizeUrl(part))
      .filter((part) => part.trim().length > 0)
      .join("/");

    return connectedParts;
  }

  protected normalizeUrl(url: string) {
    return this.removeLeadingSlash(this.removeTrailingSlash(url));
  }

  private removeTrailingSlash(url: string) {
    return url.endsWith("/") ? url.slice(0, -1) : url;
  }

  private removeLeadingSlash(url: string) {
    return url.startsWith("/") ? url.slice(1) : url;
  }
}
