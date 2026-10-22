# Project specification and milestone tracker

This document turns the exercise brief into a list of numbered requirements and tracks which
milestone delivers each one. It also records the decisions made along the way and what we
learned about the API.

It was kept as a private working document while the project was built, and published in the
repository once the work was finished, as a record of how it was planned and built.

Last updated: 2026-10-22

## Contents

1. [Goal](#goal)
2. [Requirements](#requirements)
3. [Milestones](#milestones)
4. [API reference](#api-reference)
5. [Decision log](#decision-log)
6. [Workflow](#workflow)
7. [Working with an AI assistant](#working-with-an-ai-assistant)

## Goal

A small single-page app for buying mobile phones. It has two views, a product list and a
product detail page, and talks to the API provided for the exercise.

## Requirements

Status values: **Done** (merged into `main`), **In review** (pull request open), **Ready for review** (built locally, not yet committed), **Planned**.

### General

| ID  | Requirement                                                                      | Milestone | Status |
| --- | -------------------------------------------------------------------------------- | --------- | ------ |
| G1  | Built with React or Preact                                                       | 1         | Done   |
| G2  | Plain JavaScript (ES6+), preferably not TypeScript                               | 1         | Done   |
| G3  | Single-page app with client-side routing, no multi-page app and no SSR           | 3         | Done   |
| G4  | Scripts: `start` (development), `build` (production), `test`, `lint`             | 1         | Done   |
| G5  | Code in a public repository, committed in steps as milestones are reached        | 1         | Done   |
| G6  | README in the first commit, explaining how to run the project plus any notes     | 1         | Done   |
| G7  | Free choice of visual design, but following the layout in the brief's wireframes | 3–7       | Done   |

### Product list page (PLP)

| ID  | Requirement                                                   | Milestone | Status |
| --- | ------------------------------------------------------------- | --------- | ------ |
| L1  | Shows every product returned by the API                       | 4         | Done   |
| L2  | Filters the list by the text the user types in the search box | 4         | Done   |
| L3  | Selecting a product navigates to its detail page              | 4         | Done   |
| L4  | At most four products per row, adapting to the screen size    | 4         | Done   |
| L5  | Each item shows image, brand, model and price                 | 4         | Done   |

### Search bar

| ID  | Requirement                              | Milestone | Status |
| --- | ---------------------------------------- | --------- | ------ |
| S1  | A text input for the search              | 4         | Done   |
| S2  | Matches the text against brand and model | 4         | Done   |
| S3  | Filters in real time, on every change    | 4         | Done   |

### Product detail page (PDP)

| ID  | Requirement                                                                                                                            | Milestone | Status |
| --- | -------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------ |
| D1  | Two columns: the image in the first, details and actions in the second                                                                 | 5         | Done   |
| D2  | A link back to the product list                                                                                                        | 3         | Done   |
| D3  | Shows the product image                                                                                                                | 5         | Done   |
| D4  | Description shows at least brand, model, price, CPU, RAM, operating system, screen resolution, battery, cameras, dimensions and weight | 5         | Done   |

### Product actions

| ID  | Requirement                                                                          | Milestone | Status |
| --- | ------------------------------------------------------------------------------------ | --------- | ------ |
| A1  | Selectors for storage and colour                                                     | 5         | Done   |
| A2  | A selector is shown even when it has a single option, and that option is preselected | 5         | Done   |
| A3  | An "Add" button that adds the product with the chosen options to the cart            | 6         | Done   |
| A4  | The add request sends the product id, the colour code and the storage code           | 2, 6      | Done   |
| A5  | The cart count from the response is shown in the header on every page and persisted  | 6         | Done   |

### Header

| ID  | Requirement                                           | Milestone | Status |
| --- | ----------------------------------------------------- | --------- | ------ |
| H1  | The app title or icon links to the product list       | 3         | Done   |
| H2  | Breadcrumbs show the current page and link back       | 3, 5      | Done   |
| H3  | The number of items in the cart is shown on the right | 3, 6      | Done   |

### API and data persistence

| ID  | Requirement                                                    | Milestone | Status               |
| --- | -------------------------------------------------------------- | --------- | -------------------- |
| P1  | Integrate with the three endpoints of the exercise API         | 2         | Done                 |
| P2  | Store API responses on the client                              | 2         | Done                 |
| P3  | Stored data expires after one hour and is fetched again        | 2         | Done                 |
| P4  | Any client-side storage is allowed (browser storage or memory) | 2         | Done, `localStorage` |

## Milestones

| #   | Milestone                              | Branch                    | Pull request | Status    | Merged     |
| --- | -------------------------------------- | ------------------------- | ------------ | --------- | ---------- |
| 1   | Project setup, tooling and README      | `main` (first commit)     | -            | Done      | 2026-10-03 |
| -   | Continuous integration                 | `ci/github-actions`       | #1           | Done      | 2026-10-03 |
| 2   | API client with one-hour cache         | `feat/api-client`         | #2           | Done      | 2026-10-03 |
| 3   | Routing, layout and header             | `feat/routing-layout`     | #3           | Done      | 2026-10-03 |
| 4   | Product list page with search          | `feat/product-list`       | #4           | Done      | 2026-10-04 |
| 5   | Product detail page                    | `feat/product-detail`     | #5           | Done      | 2026-10-05 |
| -   | Ignore local working notes             | `chore/ignore-local-docs` | #6           | Done      | 2026-10-05 |
| 6   | Add to cart and persisted cart count   | `feat/add-to-cart`        | #7           | Done      | 2026-10-05 |
| 7   | Accessibility and responsive polish    | `feat/a11y-polish`        | #8           | Done      | 2026-10-05 |
| 8   | Final tests, documentation and wrap-up | `docs/wrap-up`            | #9           | Done      | 2026-10-05 |
| -   | Publish this document                  | `docs/publish-spec`       | -            | In review | -          |

### 1. Project setup, tooling and README

**Goal:** a project that runs, builds, tests and lints from the first commit.

**Delivered**

- Vite 8 with React 19.3 in plain JavaScript
- Scripts: `start`, `build`, `preview`, `test`, `test:watch`, `lint`, `format`
- ESLint 9 flat config with React, React Hooks, React Refresh and jsx-a11y rules, plus Prettier
- Vitest 5 with Testing Library and jsdom
- `.editorconfig`, `.nvmrc`, MIT licence, README
- Node requirement aligned with the dependencies: `^22.22.2 || ^24.15.0 || >=26.0.0`

**Acceptance criteria**

- [x] `npm start`, `npm run build`, `npm test` and `npm run lint` all work
- [x] README explains how to install and run the project
- [x] README is part of the first commit

### CI. Continuous integration (PR #1)

**Goal:** no change reaches `main` without passing the checks.

**Delivered**

- GitHub Actions workflow running `npm ci`, lint, format check, tests and build on Node 22 and 24
- Runs on every pull request and every push to `main`
- `main` is protected: pull request required, both CI jobs required and up to date, linear
  history, no force pushes, conversations resolved before merging
- `format:check` script so CI and local runs use the same command

**Acceptance criteria**

- [x] The workflow runs on pull requests and passes on both Node versions
- [x] A pull request cannot be merged while the checks fail

### 2. API client with one-hour cache (PR #2)

**Goal:** a data layer that the pages can use without knowing about the API's quirks.

**Delivered**

- `src/api/client.js`: fetch wrapper. Failures become an `ApiError` with a status (0 when the
  network is down). GET requests are cached for one hour, and failed reads are never cached.
- `src/utils/storage.js`: `localStorage` helpers with expiry. Storage failures and malformed
  entries are treated as a cache miss, so the app keeps working without storage.
- `src/api/mappers.js`: normalises the API responses in one place (see
  [API reference](#api-reference))
- `getProducts()`, `getProduct(id)` and `addToCart({ id, colorCode, storageCode })`
- `VITE_API_BASE_URL` to override the API address, with `.env.example`

**Acceptance criteria**

- [x] A second read within one hour is served from the cache
- [x] After one hour the data is fetched again
- [x] Adding to the cart is never cached
- [x] The app works when `localStorage` is unavailable

### 3. Routing, layout and header (PR #3)

**Goal:** the app shell that the pages plug into.

**Delivered**

- Routes: `/`, `/product/:id` and a not found page, using React Router's data router
  without loaders
- Header with the title linking home, breadcrumbs and the cart count
- Breadcrumbs built from `handle.crumb` on each route, with `aria-current` on the current page
- `CartProvider` and `useCart()` reading the persisted count, ignoring invalid values
- Errors at two levels: page errors keep the header, and a standalone fallback covers
  failures in the layout itself

**Acceptance criteria**

- [x] Navigation works without full page reloads
- [x] The title links to the list from every page
- [x] Breadcrumbs reflect the current page
- [x] The detail page has a link back to the list
- [x] A saved cart count is shown in the header after a reload

### 4. Product list page with search (PR #4)

**Goal:** browse and search every product.

**Delivered**

- Grid of up to four cards per row, adapting to the screen width without breakpoints
- Cards with image, brand, model and price, linking to the detail page
- Live search on brand and model:
  - every word has to match, in any order
  - case and accents are ignored
  - the query is kept in `?q=` so it survives navigation and reloads
- Result count announced to screen readers
- Loading, error with retry, and empty states
- Concurrent reads of the same path share one request
- Tests run against an MSW mock of the API

**Acceptance criteria**

- [x] All products from the API are listed
- [x] Typing filters the list immediately by brand and model
- [x] Never more than four items per row
- [x] Clicking a product opens its detail page
- [x] Products without a price show "Price not available"

### 5. Product detail page (PR #5)

**Goal:** show everything about a phone and let the user choose options.

**Delivered**

- Two-column layout that stacks on narrow screens
- Specifications list with every attribute from the brief. Missing values show
  "Not available".
- Storage and colour selectors as native radio groups, with single options preselected
- "Add to cart" disabled until both options are chosen
- Breadcrumb and document title show the product name
- Loading, error and retry states, including unknown ids

**Acceptance criteria**

- [x] Image in the first column, details and actions in the second
- [x] All attributes listed in D4 are shown
- [x] Single options are preselected
- [x] The add button cannot be used until storage and colour are chosen
- [x] Merged into `main`

### 6. Add to cart and persisted cart count (PR #7)

**Goal:** complete the purchase flow.

**Scope**

- Connect "Add to cart" to `POST /api/cart` with the product id and the selected colour and
  storage codes
- Show "Adding…" while the request is in progress and prevent double submits
- Add the returned count to the current total, because the API always answers `count: 1`
  (see [decision 7](#decision-log))
- Persist the total in `localStorage` so the header shows it on every page and after a reload
- Confirm success, and show an error the user can retry if the request fails

**Acceptance criteria**

- [x] Adding a product sends `{ id, colorCode, storageCode }`
- [x] The header count increases after each successful add
- [x] The count survives navigation and a page reload
- [x] A failed request shows an error and leaves the count unchanged

### 7. Accessibility and responsive polish (PR #8)

**Goal:** make the app comfortable on every screen and with assistive technology.

**Scope**

- Check the list and detail pages at phone, tablet and desktop widths
- Keyboard-only pass through the whole flow
- Colour contrast and focus styles
- Skeleton placeholders while loading, if they help the perceived speed
- Image fallback when an image fails to load

**Acceptance criteria**

- [x] No horizontal scrolling at 360px wide
- [x] Everything can be done with the keyboard alone
- [x] Text meets WCAG AA contrast

**Delivered**

- Checked at 360px on the list, the detail page with the longest product name and the not
  found page: no horizontal scrolling
- Skip link to the main content, and focus moves to the main content after each navigation
  (but not when only the search query changes)
- `scroll-padding-top` so the sticky header never covers the focused element
- Search box and option borders raised to 3:1 contrast (WCAG 1.4.11). All text already met AA:
  muted text is 4.63:1 on the background
- `PhoneImage` shows a placeholder when an image is missing or fails to load, on the cards and
  the detail page
- Skeleton placeholders left out: the loading message already explains the slow first load

### 8. Final tests, documentation and wrap-up (PR #9)

**Goal:** leave the project easy to review and run.

**Scope**

- Fill any remaining test gaps, for example the cart flow from end to end
- Final README pass: features, project structure, decisions and known limitations
- Replace the milestone list in the README with design decisions and known limitations
  sections
- Mark every requirement in this document as done

**Acceptance criteria**

- [x] Every requirement above is marked Done
- [x] README describes the finished project

**Delivered**

- End-to-end test of the whole flow: search, open the match, choose options, add to the cart,
  and go back with the count kept. A second test checks that the browser's back button
  restores the search.
- Tests for the remaining untested API branches: a non-JSON error body, a list response that
  isn't a list, and an empty product response. Line coverage was already around 98%.
- README: features, project structure, design decisions and known limitations. The milestone
  list is gone.

## API reference

Base URL: `https://itx-frontend-test.onrender.com/api`

| Method | Path           | Body                             | Response                             |
| ------ | -------------- | -------------------------------- | ------------------------------------ |
| GET    | `/product`     | -                                | Array of product summaries           |
| GET    | `/product/:id` | -                                | One product with details and options |
| POST   | `/cart`        | `{ id, colorCode, storageCode }` | `{ count }`                          |

### Behaviour observed in the live API

These were found by calling the API directly before writing the client. `src/api/mappers.js`
handles all of them so the rest of the app never sees them.

| Observation                                                                 | How the app handles it                                                 |
| --------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `dimentions` and `secondaryCmera` are misspelled                            | Renamed to `dimensions` and `secondaryCamera`                          |
| `displayResolution` and `displaySize` hold each other's values              | Swapped back                                                           |
| Cameras, `ram` and `os` are sometimes a string and sometimes a list         | Lists are joined into one string                                       |
| Some prices and weights are empty strings, and `-` is used as a placeholder | Converted to `null`, shown as "Not available" or "Price not available" |
| Prices and weights are strings                                              | Parsed as numbers                                                      |
| Unknown product ids return HTTP 500 instead of 404                          | Shown as an error on the detail page                                   |
| Invalid cart requests return HTTP 400 with a `message`                      | The message is passed on in the `ApiError`                             |
| `POST /cart` always returns `count: 1`                                      | The app keeps the running total itself (milestone 6)                   |
| The API is on a free tier and can take around 30 seconds to wake up         | The loading message warns about it                                     |

## Decision log

| #   | Decision                                                                          | Reason                                                                                                                                  | Milestone |
| --- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| 1   | React 19                                                                          | React has no formal LTS. 19 is the only actively maintained major version, while 18 received its last patch in April 2024.              | 1         |
| 2   | Vite instead of a heavier framework                                               | The brief rules out SSR, and Vite is the standard lightweight setup for a client-only React app.                                        | 1         |
| 3   | Plain JavaScript                                                                  | The brief prefers it over TypeScript.                                                                                                   | 1         |
| 4   | `eslint-plugin-react` for `jsx-uses-vars`, with a narrow `no-unused-vars` pattern | Lets lint catch unused constants without false positives for components used in JSX.                                                    | 1         |
| 5   | Custom cache on `localStorage` instead of a data-fetching library                 | The brief asks for this behaviour explicitly, and it is small enough to own.                                                            | 2         |
| 6   | Normalise API data in a single mapper                                             | Keeps the API's quirks out of the UI code.                                                                                              | 2         |
| 7   | Keep the cart total on the client                                                 | The API always answers `count: 1`, so its response can't be shown directly.                                                             | 2, 6      |
| 8   | React Router data router without loaders                                          | Needed for `useMatches` (breadcrumbs) and per-route error elements. Loaders were left out so slow API responses don't block navigation. | 3         |
| 9   | Two levels of error handling                                                      | Page errors keep the header usable, and a standalone fallback covers failures in the layout.                                            | 3         |
| 10  | Search query kept in the URL                                                      | It survives going to a product and back, and reloads.                                                                                   | 4         |
| 11  | Concurrent requests for the same path share one fetch                             | Avoids double requests in development under StrictMode and between components that need the same product.                               | 4         |
| 12  | MSW for tests, with unhandled requests failing the test                           | Tests never reach the real API by accident.                                                                                             | 4         |
| 13  | Prices shown in euros (`€170`)                                                    | The API sends bare numbers. One-line change in `src/utils/format.js`.                                                                   | 4         |
| 14  | Native radio inputs for the option selectors                                      | Keyboard and screen reader support come for free. Single options stay enabled rather than disabled, so they don't look unavailable.     | 5         |
| 15  | Cart total kept in `CartProvider` and saved with an effect                        | One place owns the total. Saving in an effect keeps the state update pure.                                                              | 6         |
| 16  | Cart count synced across tabs through the `storage` event                         | Two open tabs would otherwise show different totals.                                                                                    | 6         |
| 17  | Detail page content keyed by product id                                           | Selections and messages reset when another product opens on the same route.                                                             | 6         |
| 18  | Focus moves to `<main>` when the path changes                                     | Client-side navigation doesn't move focus, so screen reader users got no cue that the page changed. Search changes keep their focus.    | 7         |
| 19  | Separate `--color-control-border` token for control outlines                      | Control boundaries need 3:1, but the softer border still suits card and table dividers.                                                 | 7         |

## Workflow

- One branch per milestone, named with a Conventional Commits type (`feat/`, `ci/`, `docs/`)
- Commit messages follow Conventional Commits
- Every change goes through a pull request. CI must pass on Node 22 and 24 before it can be
  merged, and pull requests are squash-merged so each one becomes a single commit on `main`.
- Changes are reviewed by the project owner before they are committed and pushed

## Working with an AI assistant

The code was written with Claude Code, an AI coding assistant, working under the project
owner's direction. The process was set up so that every change stayed reviewable and the
owner kept the decisions:

- **This document came first.** The brief was turned into numbered requirements and
  milestones before any feature work, and each milestone was planned against them.
- **Small, reviewable steps.** One branch and one pull request per milestone. The assistant
  stopped before each commit so the owner could review the change, and the owner merged
  every pull request.
- **Checks on every change.** Lint, the formatting check, the tests and the production build
  ran locally before each commit, and again in CI before merging.
- **Independent reviews.** Changes were also reviewed by separate AI reviewers that were given
  only the code, not the goal, so they judged it on its own merits. Their findings were
  checked against the code before acting on them. For example, the two-level error handling
  in milestone 3 came out of one of these reviews.
- **Verified in a real browser.** Behaviour that tests can't fully prove, such as the layout
  at 360px, the skip link, keyboard focus and the image fallback, was checked by hand in
  Chrome against the live API.
- **Decisions are recorded.** The [decision log](#decision-log) explains why each choice was
  made, and deviations from the plan are written down rather than hidden, for example
  leaving out skeleton placeholders in milestone 7.
