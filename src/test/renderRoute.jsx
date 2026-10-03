import { render } from '@testing-library/react';
import { createMemoryRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import { CartProvider } from '../context/CartProvider.jsx';
import { routes } from '../routes.jsx';

export function renderRoute(path = '/') {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  const result = render(
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>,
  );
  return { ...result, router };
}
