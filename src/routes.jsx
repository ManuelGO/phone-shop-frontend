import { Layout } from './components/Layout/Layout.jsx';
import { AppErrorPage } from './pages/AppErrorPage.jsx';
import { ErrorPage } from './pages/ErrorPage.jsx';
import { NotFoundPage } from './pages/NotFoundPage.jsx';
import { ProductDetailPage } from './pages/ProductDetailPage.jsx';
import { ProductListPage } from './pages/ProductListPage.jsx';

export const routes = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <AppErrorPage />,
    handle: { crumb: () => 'Home' },
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <ProductListPage /> },
          {
            path: 'product/:id',
            element: <ProductDetailPage />,
            handle: { crumb: () => 'Product details' },
          },
          {
            path: '*',
            element: <NotFoundPage />,
            handle: { crumb: () => 'Not found' },
          },
        ],
      },
    ],
  },
];
