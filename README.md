## 🔜 Work in progress

# OWASP Juice Shop — Playwright UI + API Test Framework (TypeScript/Node.js)

Portfolio project demonstrating an **SDET-friendly** automation framework for the OWASP Juice Shop app: **Playwright UI + API testing**, a reusable **API tooling layer** (request + wait), **Allure 3 reporting**, and **Dockerized execution**.

## Playwright TypeScript/NodeJS version

Also available as a Playwright C#/.NET version: https://github.com/notNullThen/owasp-playwright-api-csharp-docker

## Framework Features

- **Test architecture**: Page Objects + reusable UI Components + data builders + hooks.
- **UI + API combined**: API calls for fast setup/verification; UI flows stay readable.
- **Network-aware assertions**: the same endpoint definitions support API `request()` and UI `wait()`.
- **Parallel-safe design**: per-test Playwright context + worker-scoped auth to avoid cross-test leaks.
- **Engineering hygiene**: configuration via `.env`, CI/Docker-friendly base URL switching, ESLint formatted, structured test reporting.

## Quick start

Runs Juice Shop, executes the full suite (API + UI), and serves Allure:

### Docker (recommended)

The project is configured to run tests in Docker using the official Playwright Node.js Docker image.

**To run tests in Docker:**

1. Clone the repository and navigate to it:

```bash
git clone https://github.com/notNullThen/owasp-playwright-api-typescript-docker.git
cd owasp-playwright-api-typescript-docker
```

2. Start Juice Shop + run tests + serve Allure:

```bash
docker compose up playwright --build
```

### Run in GitHub Codespaces

1. Wait until all the Codespace init commands complete (the `.env` file should appear)

2. Run all tests:

```bash
npm run test-all
```

3. Open Allure report:

```bash
npx allure serve ./allure/allure-results
```

## Run locally

1. Start Juice Shop:

```bash
docker run --rm -p 3000:3000 bkimminich/juice-shop:latest
```

2. Install Playwright dependencies:

```bash
npx playwright install --with-deps
```

3. Install Allure as global dependency:

```bash
npm i -g allure
allure serve ./allure/allure-results --port 8080
```

4. Create env file:

```bash
cp .env.example .env
```

5. Run tests with Allure reporting:

```bash

npm i
npm run test-all-allure
```

## Suites / filtering

This repo uses Playwright projects:

- API only: `npx playwright test --project=API` (or `npm run test-api`)
- UI only: `npx playwright test --project=UI` (or `npm run test-ui`)

## Configuration

- Environment variables load from `.env` via `dotenv` (see `playwright.config.ts`).
- Base URL switches automatically:
  - Local: `http://localhost:3000`
  - Docker/CI (`CI=true`): `http://juice-shop:3000`

## API tooling (the interesting bit)

API layer lives in `api-base/` and is designed so endpoints are defined once and reused for:

- direct API setup/verification via `request()`
- UI-network assertions via `wait()`

Example (wait for UI-triggered API call):

```ts
const loginResponseTask = api.restUser.postLogin().wait();
await Promise.all([loginButton.click(), loginResponseTask]);
const loginResponse = (await loginResponseTask).responseBody;
```

## Where to look

- Tests: `tests/api/`, `tests/ui/`
- API endpoints: `api-endpoints/`
- API handler: `api-base/`
- Pages/components: `pages/`, `components/`
- Hooks: `tests/global-setup.ts`
