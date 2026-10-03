import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import { CartProvider } from './context/CartProvider.jsx';
import { routes } from './routes.jsx';

const router = createBrowserRouter(routes);

function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;
