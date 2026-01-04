# OWASP Juice Shop — Playwright UI + API Test Framework (TypeScript)

Portfolio project showcasing an **SDET-friendly test framework on top of Playwright** for the OWASP Juice Shop web app.

## Playwright C#/.NET version

Also available as a Playwright C#/.NET version: https://github.com/notNullThen/owasp-js-playwright-api-csharp/

## Project overview

This repository contains a test automation framework for OWASP Juice Shop.

It demonstrates a practical automation architecture with both UI and API flows along with an API tooling which significantly simplifies API waiting/interaction.

- **UI tests**: validate key user workflows (e.g., registration, login, search).
- **API tooling**: used for fast setup/verification and for asserting UI-triggered network calls.

**Note on test coverage:**
This suite demonstrates framework capabilities and a core testing strategy. More extensive coverage (negative cases, additional flows, etc.) can be added on top of the same architecture.

### Reporting: Allure Report 3 for Node.js (non-global)

Allure is used via `npx` (local install in the repo), and results are stored under `./allure/allure-results`.

### Traces

Playwright tracing is enabled in [playwright.config.ts](playwright.config.ts) (useful for demo/debug, including successful runs depending on Playwright retention settings).

## Benefits / what this demonstrates

- **Unified UI + API approach**: UI flows stay readable while setup stays fast.
- **Network-aware UI assertions**: the same endpoint definitions support both `request()` and `wait()`.
- **Parallel-ready auth**: worker-scoped storage state for fast, isolated parallel runs.
- **Docker-ready solution**: Juice Shop + tests + Allure can run end-to-end via Docker Compose.

## Prerequisites

- Node.js (recommended: v18+)
- npm
- Optional: Docker + Docker Compose (recommended for a reproducible and stable demo)

## Running tests

### Docker

The project is configured to run tests in Docker using official Playwright NodeJS Docker image.

**To run tests in Docker:**

1. Clone the repository and navigate it:

```bash
git clone https://github.com/notNullThen/owasp-js-playwright-api-typescript.git
cd owasp-js-playwright-api-typescript
```

2. Create `.env` file from `.env.example` file

```bash
cp .env.example .env
```

3. Build the Docker image and run tests

```bash
docker compose up playwright --build
```

This will:

- Start OWASP Juice Shop on `http://juice-shop:3000`
- Run the test suite and serve the Allure report.

### Local (run tests on your machine)

1. Start OWASP Juice Shop:

```bash
docker run --rm -p 3000:3000 bkimminich/juice-shop:latest
```

2. Clone the repository and navigate it:

```bash
git clone https://github.com/notNullThen/owasp-js-playwright-api-typescript.git
cd owasp-js-playwright-api-typescript
```

3. Install NPM packages & Playwright dependencies:

```bash
npm i && npx playwright install --with-deps
```

4. Create `.env` file from `.env.example` file

```bash
cp .env.example .env
```

5. Run all tests with opening Allure reports:

```bash
npm run test-all-allure
```

## Configuration

Environment variables are loaded via `dotenv` in [playwright.config.ts](playwright.config.ts).

❗️ For demonstration and convenience purposes the `.env.example` already contains values.

## Running options

Scripts are defined in [package.json](package.json):

- Run all tests:

```bash
npm run test-all
```

- Open Playwright UI mode:

```bash
npm run test-viewer
```

- Run all tests + generate & open Allure report locally:

```bash
npm run test-all-allure
```

## Code quality

This project is configured with ESLint and Playwright-specific lint rules:

```bash
npx eslint .
```

## API tooling

The API tooling layer is located under [api/base/](api/base/). It provides a fluent interface for defining endpoints once and reusing them across both API and UI tests.

### Architecture

- [api/base/api-base.ts](api/base/api-base.ts): exposes `action(...).request()` and `action(...).wait()` depending on context
- [api/base/api-endpoint-base.ts](api/base/api-endpoint-base.ts): executes requests / waits for responses, parses JSON, validates status codes
- [api/base/api-parameters-base.ts](api/base/api-parameters-base.ts): builds normalized URLs and clones request definitions to avoid race conditions under `Promise.all`

### Usage examples

**Direct API request (fast setup):**

```ts
import { test } from "@playwright/test";
import API from "./api/api";

test("create user via API", async ({ request }) => {
  var userPayload = { ... };
  const api = new API(request);
  await api.users.postUser(userPayload).request();
});
```

**Wait for UI-triggered API call:**

```ts
// Inside a page object method
const [, loginResponse] = await Promise.all([this.loginButton.click(), this.api.restUser.postLogin().wait()]);
```

## Auth & parallel execution

Worker-scoped auth is implemented in [tests/ui/global-setup.ts](tests/ui/global-setup.ts). Tests can opt out by including `[no-autologin]` in the test title.

## Example tests

- Auth flows: [tests/ui/auth.ui.test.ts](tests/ui/auth.ui.test.ts)
- Search flow: [tests/ui/search.ui.test.ts](tests/ui/search.ui.test.ts)

## Project structure

- [api/](api/) — API client wrappers and tooling
- [pages/](pages/) — Page Objects
- [components/](components/) — reusable UI Components
- [tests/](tests/) — test specs
- [data/](data/) — test data builders
- [support/](support/) — utilities (base URL, banners, data helpers)

## Notes

- Base URL switches automatically in Docker/CI: locally it uses `http://localhost:3000`, in Compose it uses `http://juice-shop:3000` (see [support/utils.ts](support/utils.ts)).
- API calls validate expected status codes by default 200/201 (can be changed in [playwright.config.ts](playwright.config.ts) > expectedAPIResponseCodes).
- API failures include endpoint/method context.
