import { describe, expect, it } from 'vitest';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { delay, http, HttpResponse } from 'msw';
import { API_BASE_URL } from '../config.js';
import { CART_COUNT_KEY } from '../context/CartProvider.jsx';
import { server } from '../test/mocks/server.js';
import { renderRoute } from '../test/renderRoute.jsx';

function captureCartRequests() {
  const bodies = [];
  server.use(
    http.post(`${API_BASE_URL}/cart`, async ({ request }) => {
      bodies.push(await request.json());
      return HttpResponse.json({ count: 1 });
    }),
  );
  return bodies;
}

function storedCount() {
  return JSON.parse(window.localStorage.getItem(`phone-shop:${CART_COUNT_KEY}`));
}

async function chooseIphoneOptions(user) {
  const storage = await screen.findByRole('group', { name: 'Storage' });
  await user.click(within(storage).getByRole('radio', { name: '256 GB' }));
  await user.click(
    within(screen.getByRole('group', { name: 'Colour' })).getByRole('radio', { name: 'Silver' }),
  );
}

describe('adding to the cart', () => {
  it('sends the product id with the selected colour and storage codes', async () => {
    const user = userEvent.setup();
    const requests = captureCartRequests();
    renderRoute('/product/apple-iphone-8');

    await chooseIphoneOptions(user);
    await user.click(screen.getByRole('button', { name: 'Add to cart' }));

    await screen.findByText('Apple iPhone 8 added to your cart.');
    expect(requests).toEqual([{ id: 'apple-iphone-8', colorCode: 1001, storageCode: 2001 }]);
  });

  it('sends preselected options without the user choosing them', async () => {
    const user = userEvent.setup();
    const requests = captureCartRequests();
    renderRoute('/product/acer-liquid-z6');

    await user.click(await screen.findByRole('button', { name: 'Add to cart' }));

    await screen.findByText('Acer Liquid Z6 added to your cart.');
    expect(requests).toEqual([{ id: 'acer-liquid-z6', colorCode: 1000, storageCode: 2000 }]);
  });

  it('adds up the count in the header and keeps it after navigating', async () => {
    const user = userEvent.setup();
    renderRoute('/product/acer-liquid-z6');
    const addButton = await screen.findByRole('button', { name: 'Add to cart' });

    await user.click(addButton);
    expect(await screen.findByText('1 item in cart')).toBeInTheDocument();

    await user.click(addButton);
    expect(await screen.findByText('2 items in cart')).toBeInTheDocument();
    expect(storedCount()).toBe(2);

    await user.click(screen.getByRole('link', { name: 'Back to all phones' }));
    expect(screen.getByText('2 items in cart')).toBeInTheDocument();
  });

  it('continues from the count saved by a previous visit', async () => {
    const user = userEvent.setup();
    window.localStorage.setItem(`phone-shop:${CART_COUNT_KEY}`, '4');
    renderRoute('/product/acer-liquid-z6');

    await user.click(await screen.findByRole('button', { name: 'Add to cart' }));

    expect(await screen.findByText('5 items in cart')).toBeInTheDocument();
    expect(storedCount()).toBe(5);
  });

  it('disables the button while the request is in progress', async () => {
    const user = userEvent.setup();
    server.use(
      http.post(`${API_BASE_URL}/cart`, async () => {
        await delay(50);
        return HttpResponse.json({ count: 1 });
      }),
    );
    renderRoute('/product/acer-liquid-z6');

    await user.click(await screen.findByRole('button', { name: 'Add to cart' }));

    expect(screen.getByRole('button', { name: 'Adding…' })).toBeDisabled();
    expect(await screen.findByRole('button', { name: 'Add to cart' })).toBeEnabled();
    expect(screen.getByText('1 item in cart')).toBeInTheDocument();
  });

  it('shows an error and leaves the count unchanged when the request fails', async () => {
    const user = userEvent.setup();
    server.use(
      http.post(`${API_BASE_URL}/cart`, () =>
        HttpResponse.json({ message: 'Invalid parameters' }, { status: 400 }),
      ),
    );
    renderRoute('/product/acer-liquid-z6');

    await user.click(await screen.findByRole('button', { name: 'Add to cart' }));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      "We couldn't add this phone to your cart. Invalid parameters",
    );
    expect(screen.getByText('0 items in cart')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add to cart' })).toBeEnabled();
  });

  it('clears the error once a retry succeeds', async () => {
    const user = userEvent.setup();
    server.use(http.post(`${API_BASE_URL}/cart`, () => HttpResponse.error(), { once: true }));
    renderRoute('/product/acer-liquid-z6');
    const addButton = await screen.findByRole('button', { name: 'Add to cart' });

    await user.click(addButton);
    expect(await screen.findByRole('alert')).toHaveTextContent('Could not reach the server');

    await user.click(addButton);
    await screen.findByText('Acer Liquid Z6 added to your cart.');
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
