import { describe, expect, it } from 'vitest';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { API_BASE_URL } from '../config.js';
import { server } from '../test/mocks/server.js';
import { renderRoute } from '../test/renderRoute.jsx';

function specValue(label) {
  const specs = screen.getByRole('region', { name: 'Specifications' });
  return within(specs).getByText(label).nextElementSibling;
}

describe('ProductDetailPage', () => {
  it('shows a loading message, then the product', async () => {
    renderRoute('/product/apple-iphone-8');

    expect(screen.getByText('Loading phone details')).toBeInTheDocument();
    expect(await screen.findByRole('heading', { level: 1, name: 'iPhone 8' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Apple iPhone 8' })).toHaveAttribute(
      'src',
      'https://example.com/apple-iphone-8.jpg',
    );
  });

  it('lists every specification the spec asks for', async () => {
    renderRoute('/product/apple-iphone-8');
    await screen.findByRole('heading', { level: 1, name: 'iPhone 8' });

    expect(specValue('Brand')).toHaveTextContent('Apple');
    expect(specValue('Model')).toHaveTextContent('iPhone 8');
    expect(specValue('Price')).toHaveTextContent('€809');
    expect(specValue('CPU')).toHaveTextContent('Hexa-core 2.39 GHz');
    expect(specValue('RAM')).toHaveTextContent('2 GB RAM');
    expect(specValue('Operating system')).toHaveTextContent('iOS 11');
    expect(specValue('Screen resolution')).toHaveTextContent('750 x 1334 pixels');
    expect(specValue('Battery')).toHaveTextContent('1821 mAh');
    expect(specValue('Main camera')).toHaveTextContent('12 MP');
    expect(specValue('Front camera')).toHaveTextContent('7 MP');
    expect(specValue('Dimensions')).toHaveTextContent('138.4 x 67.3 x 7.3 mm');
    expect(specValue('Weight')).toHaveTextContent('148 g');
  });

  it('marks missing values as not available', async () => {
    renderRoute('/product/acer-liquid-z6');
    await screen.findByRole('heading', { level: 1, name: 'Liquid Z6' });

    expect(specValue('Weight')).toHaveTextContent('Not available');
    expect(specValue('Main camera')).toHaveTextContent('8 MP, autofocus, LED flash');
  });

  it('preselects options when there is only one choice', async () => {
    renderRoute('/product/acer-liquid-z6');

    const storage = await screen.findByRole('group', { name: 'Storage' });
    expect(within(storage).getByRole('radio', { name: '8 GB' })).toBeChecked();
    expect(
      within(screen.getByRole('group', { name: 'Colour' })).getByRole('radio', { name: 'Black' }),
    ).toBeChecked();
    expect(screen.queryByText('Choose a storage and colour to continue.')).not.toBeInTheDocument();
  });

  it('leaves options unselected when there are several, until the user picks', async () => {
    const user = userEvent.setup();
    renderRoute('/product/apple-iphone-8');

    const storage = await screen.findByRole('group', { name: 'Storage' });
    const colour = screen.getByRole('group', { name: 'Colour' });
    expect(
      within(storage)
        .getAllByRole('radio')
        .every((radio) => !radio.checked),
    ).toBe(true);
    expect(screen.getByRole('button', { name: 'Add to cart' })).toBeDisabled();
    expect(screen.getByText('Choose a storage and colour to continue.')).toBeInTheDocument();

    await user.click(within(storage).getByRole('radio', { name: '256 GB' }));
    await user.click(within(colour).getByRole('radio', { name: 'Silver' }));

    expect(within(storage).getByRole('radio', { name: '256 GB' })).toBeChecked();
    expect(within(colour).getByRole('radio', { name: 'Silver' })).toBeChecked();
    expect(screen.queryByText('Choose a storage and colour to continue.')).not.toBeInTheDocument();
  });

  it('sets the document title to the product name', async () => {
    renderRoute('/product/apple-iphone-8');
    await screen.findByRole('heading', { level: 1, name: 'iPhone 8' });

    expect(document.title).toBe('Apple iPhone 8 | Phone Shop');
  });

  it('shows an error with a retry button when the product cannot be loaded', async () => {
    const user = userEvent.setup();
    server.use(
      http.get(
        `${API_BASE_URL}/product/:id`,
        () => HttpResponse.json({ message: 'An Unexpected Error Occurred' }, { status: 500 }),
        { once: true },
      ),
    );
    renderRoute('/product/apple-iphone-8');

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent("We couldn't load this phone");
    expect(screen.getByRole('link', { name: 'Back to all phones' })).toHaveAttribute('href', '/');

    await user.click(within(alert).getByRole('button', { name: 'Try again' }));

    expect(await screen.findByRole('heading', { level: 1, name: 'iPhone 8' })).toBeInTheDocument();
  });

  it('shows an error for an unknown product', async () => {
    renderRoute('/product/does-not-exist');

    expect(await screen.findByRole('alert')).toHaveTextContent("We couldn't load this phone");
  });
});
