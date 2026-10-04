import { describe, expect, it } from 'vitest';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { API_BASE_URL } from '../config.js';
import { server } from '../test/mocks/server.js';
import { renderRoute } from '../test/renderRoute.jsx';

async function findCards() {
  const list = await screen.findByRole('list', { name: 'Phones' });
  return within(list).getAllByRole('link');
}

describe('ProductListPage', () => {
  it('shows a loading message, then every product from the API', async () => {
    renderRoute('/');

    expect(screen.getByText('Loading phones')).toBeInTheDocument();

    const cards = await findCards();
    expect(cards).toHaveLength(3);
    expect(screen.getByText('3 results')).toBeInTheDocument();
  });

  it('shows brand, model, price and image on each card', async () => {
    renderRoute('/');

    const [card] = await findCards();
    expect(card).toHaveAttribute('href', '/product/acer-liquid-z6');
    expect(within(card).getByRole('img', { name: 'Acer Liquid Z6' })).toHaveAttribute(
      'src',
      'https://example.com/acer-liquid-z6.jpg',
    );
    expect(within(card).getByText('Acer')).toBeInTheDocument();
    expect(within(card).getByRole('heading', { name: 'Liquid Z6' })).toBeInTheDocument();
    expect(within(card).getByText('€120')).toBeInTheDocument();
  });

  it('shows a fallback when a product has no price', async () => {
    renderRoute('/');

    const cards = await findCards();
    expect(within(cards[2]).getByText('Price not available')).toBeInTheDocument();
  });

  it('filters by brand and model as the user types', async () => {
    const user = userEvent.setup();
    renderRoute('/');
    await findCards();

    const search = screen.getByRole('searchbox', { name: /search phones/i });

    await user.type(search, 'apple');
    expect(await findCards()).toHaveLength(1);
    expect(screen.getByText('1 result')).toBeInTheDocument();

    await user.clear(search);
    await user.type(search, 'galaxy');
    const [card] = await findCards();
    expect(card).toHaveTextContent('Galaxy S8');
  });

  it('keeps the search in the URL so it survives navigation', async () => {
    const user = userEvent.setup();
    const { router } = renderRoute('/');
    await findCards();

    await user.type(screen.getByRole('searchbox'), 'acer');

    expect(router.state.location.search).toBe('?q=acer');
  });

  it('restores the search from the URL', async () => {
    renderRoute('/?q=iphone');

    expect(await findCards()).toHaveLength(1);
    expect(screen.getByRole('searchbox')).toHaveValue('iphone');
  });

  it('tells the user when nothing matches', async () => {
    const user = userEvent.setup();
    renderRoute('/');
    await findCards();

    await user.type(screen.getByRole('searchbox'), 'nokia');

    expect(screen.getByText('No phones match "nokia"')).toBeInTheDocument();
    expect(screen.queryByRole('list', { name: 'Phones' })).not.toBeInTheDocument();
  });

  it('navigates to the detail page when a card is clicked', async () => {
    const user = userEvent.setup();
    const { router } = renderRoute('/');

    const [card] = await findCards();
    await user.click(card);

    expect(router.state.location.pathname).toBe('/product/acer-liquid-z6');
  });

  it('shows an error with a retry button when the API fails', async () => {
    const user = userEvent.setup();
    server.use(
      http.get(
        `${API_BASE_URL}/product`,
        () => HttpResponse.json({ message: 'An Unexpected Error Occurred' }, { status: 500 }),
        { once: true },
      ),
    );
    renderRoute('/');

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent("We couldn't load the phones");
    expect(alert).toHaveTextContent('An Unexpected Error Occurred');

    await user.click(within(alert).getByRole('button', { name: 'Try again' }));

    expect(await findCards()).toHaveLength(3);
  });
});
