import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { API_BASE_URL } from '../../config.js';
import { productDetails, productList } from './products.js';

export const handlers = [
  http.get(`${API_BASE_URL}/product`, () => HttpResponse.json(productList)),
  http.get(`${API_BASE_URL}/product/:id`, ({ params }) => {
    const product = productDetails[params.id];
    return product
      ? HttpResponse.json(product)
      : HttpResponse.json({ message: 'An Unexpected Error Occurred', code: 0 }, { status: 500 });
  }),
  http.post(`${API_BASE_URL}/cart`, () => HttpResponse.json({ count: 1 })),
];

export const server = setupServer(...handlers);
