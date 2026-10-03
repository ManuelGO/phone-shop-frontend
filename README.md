# Phone Shop

A small single-page app for browsing mobile phones and adding them to a cart. It has two
views: a product list with live search, and a product detail page where you pick storage
and colour before adding the phone to the cart.

It was built as a front-end technical exercise with React 19, Vite and React Router, in
plain JavaScript. The backend lives in a separate repository.

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

## Project status

Work in progress. The project is being built in milestones, and each one is merged into
`main` through its own pull request:

1. Project setup, tooling and README
2. API client with a one-hour client-side cache
3. Routing, layout and header
4. Product list page with search
5. Product detail page
6. Add to cart and persisted cart count
7. Loading, error and empty states, accessibility and responsive polish
8. Component tests and final notes

## License

[MIT](LICENSE)
