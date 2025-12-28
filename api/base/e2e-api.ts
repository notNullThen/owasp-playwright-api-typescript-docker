import { Page } from "@playwright/test";
import RestUserIntegrationAPI from "../rest-user-integration-api";
import IntegrationAPI from "./integration-api";

export default class E2EAPI {
  constructor(private page: Page) {}

  requests = new IntegrationAPI(this.page.request);

  restUser = new RestUserIntegrationAPI(this.page);
}
