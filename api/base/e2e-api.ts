import { Page } from "@playwright/test";
import RestUserE2EAPI from "../rest-user-e2e-api";
import IntegrationAPI from "./integration-api";

export default class E2EAPI {
  constructor(private page: Page) {}

  requests = new IntegrationAPI(this.page.request);

  restUser = new RestUserE2EAPI(this.page);
}
