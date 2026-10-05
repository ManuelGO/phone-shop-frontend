# Phone Shop

A small single-page app for browsing mobile phones and adding them to a cart. It has two
views: a product list with live search, and a product detail page where you pick storage
and colour before adding the phone to the cart.

It was built as a front-end technical exercise with React 19, Vite and React Router, in
plain JavaScript. It uses the product API provided for the exercise at
`https://itx-frontend-test.onrender.com/api`.

## Features

- **Product list:** every phone from the API in a grid of up to four per row, showing image,
  brand, model and price
- **Live search:** filters by brand and model as you type. Every word has to match, in any
  order, ignoring case and accents. The query is kept in the URL, so the browser's back button
  and a reload both restore it.
- **Product detail:** the image next to the full specifications, with storage and colour
  selectors. Options with a single choice are preselected.
- **Add to cart:** sends the chosen options to the API, shows the result and keeps a running
  total in the header on every page
- **Loading, error and empty states:** every request has a loading message and an error with a
  retry button. Missing values show "Not available", and broken images show a placeholder.
- **Accessibility:** a skip link, focus moved to the new page after each navigation, native
  radio buttons for the options, and contrast checked against WCAG AA

## Requirements

- Node.js 22.22 or later, or 24.15 or later (there is an `.nvmrc`, so `nvm use` will pick a
  suitable version)
- npm 10 or later

## Getting started

```bash
git clone <repository-url>
cd phone-shop-frontend
npm install
npm start
```

The app runs at http://localhost:3000.

## Scripts

| Command                | What it does                                       |
| ---------------------- | -------------------------------------------------- |
| `npm start`            | Starts the development server with hot reload      |
| `npm run build`        | Builds an optimised production bundle into `dist/` |
| `npm test`             | Runs the test suite once                           |
| `npm run lint`         | Checks the code with ESLint                        |
| `npm run format`       | Formats the code with Prettier                     |
| `npm run format:check` | Checks formatting without changing files           |
| `npm run preview`      | Serves the production build locally                |

## Configuration

The app talks to `https://itx-frontend-test.onrender.com/api` by default. To point it at a
different backend, copy `.env.example` to `.env.local` and change the value:

```bash
VITE_API_BASE_URL=https://itx-frontend-test.onrender.com/api
```

## Data caching

Product data is cached in `localStorage` for one hour. Within that window, the list and
detail pages are served from the cache without calling the API again. Once an entry
expires, the next visit fetches it again. Adding to the cart is never cached.

## Cart count

The cart endpoint answers every request with `count: 1` rather than the number of items in
the cart, so the app keeps the running total itself. Each successful add increases it by the
returned count, and the total is saved in `localStorage` so it shows in the header on every
page and after a reload. Open tabs stay in sync.

## Project structure

```text
src/
├── api/          Fetch wrapper with the one-hour cache, endpoints and response mappers
├── components/   UI pieces, each with its own CSS module
├── context/      Cart state shared across pages
├── hooks/        Data loading for the list and detail pages
├── pages/        One component per route, plus the error and not found pages
├── test/         Test setup, an MSW mock of the API and a route render helper
├── utils/        Search filtering, formatting and localStorage helpers
├── routes.jsx    Route table with breadcrumbs and error boundaries
└── App.jsx       Router and cart provider
```

Tests live next to the code they cover. They run against an MSW mock of the API, so they
never reach the real server.

## Design decisions

- **API quirks are fixed in one place.** The API has misspelled keys, two fields holding each
  other's values, fields that are sometimes a string and sometimes a list, and `-` used for
  missing values. `src/api/mappers.js` normalises all of it, so the rest of the app never sees
  it.
- **A small custom cache instead of a data-fetching library.** The brief asks for a one-hour
  client-side cache, and owning it keeps it small and easy to follow. Failed reads are never
  cached, and concurrent reads of the same path share one request.
- **No route loaders.** The app uses React Router's data router for breadcrumbs and per-route
  error boundaries, but loads data in the pages. That way a slow API response never blocks
  navigation.
- **Two levels of error handling.** An error in a page keeps the header usable. A separate
  fallback covers failures in the layout itself.
- **Plain JavaScript,** as the brief prefers it over TypeScript. Styles are CSS modules, so
  each component keeps its own styles without a CSS-in-JS dependency.

## Tech stack

- [React 19](https://react.dev) for the UI
- [Vite](https://vite.dev) for the dev server and build
- [React Router](https://reactrouter.com) for client-side routing
- [Vitest](https://vitest.dev) and [Testing Library](https://testing-library.com) for tests
- ESLint and Prettier for code quality

## Continuous integration

Every pull request and every push to `main` runs lint, the formatting check, the tests and
the production build on Node 22 and 24 through GitHub Actions. A pull request can only be
merged once these checks pass.

## Known limitations

- **The cart is a counter, not a cart.** The API only returns `count: 1` for each add, so the
  app can show how many items were added, but not which ones. It can't remove items either.
- **The cache can be up to an hour out of date.** A price changed on the server doesn't show
  until the cached entry expires. There is no way to refresh it by hand.
- **Unknown products show a generic error.** The API answers HTTP 500 instead of 404 for an id
  that doesn't exist, so the app can't tell a missing product from a server failure.
- **The in-page links back to the list drop the search.** "Back to all phones" and the
  breadcrumb go to the full list. The browser's back button keeps the search.
- **Prices are shown in euros.** The API sends bare numbers with no currency.
- **The first load can be slow.** The API is on a free tier and can take up to a minute to
  wake up.

## License

[MIT](LICENSE)
