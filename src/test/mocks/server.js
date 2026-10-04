import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { API_BASE_URL } from '../../config.js';
import { productList } from './products.js';

export const handlers = [
  http.get(`${API_BASE_URL}/product`, () => HttpResponse.json(productList)),
  http.post(`${API_BASE_URL}/cart`, () => HttpResponse.json({ count: 1 })),
];

export const server = setupServer(...handlers);
