export default class Utils {
  public static connectUrlParts(...parts: string[]) {
    return parts.map((part) => this.normalizeUrl(part)).join("/") + "/";
  }
  public static normalizeUrl(url: string) {
    return this.removeLeadingSlash(this.removeTrailingSlash(url));
  }
  public static removeTrailingSlash(url: string) {
    return url.endsWith("/") ? url.slice(0, -1) : url;
  }
  public static removeLeadingSlash(url: string) {
    return url.startsWith("/") ? url.slice(1) : url;
  }
}
