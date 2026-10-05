import { describe, expect, it } from 'vitest';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderRoute } from './test/renderRoute.jsx';

function breadcrumbs() {
  return within(screen.getByRole('navigation', { name: 'Breadcrumb' }));
}

describe('shopping flow', () => {
  it('searches, opens a phone, adds it to the cart and comes back to the same search', async () => {
    const user = userEvent.setup();
    renderRoute('/');

    // Search the list.
    await screen.findByRole('list', { name: 'Phones' });
    await user.type(screen.getByRole('searchbox'), 'iphone');
    const list = screen.getByRole('list', { name: 'Phones' });
    expect(within(list).getAllByRole('link')).toHaveLength(1);

    // Open the only match.
    await user.click(within(list).getByRole('link', { name: /iPhone 8/ }));
    expect(await screen.findByRole('heading', { level: 1, name: 'iPhone 8' })).toBeInTheDocument();
    expect(breadcrumbs().getByText('Apple iPhone 8')).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('main')).toHaveFocus();

    // Choose the options and add to the cart.
    const addButton = screen.getByRole('button', { name: 'Add to cart' });
    expect(addButton).toBeDisabled();
    await user.click(
      within(screen.getByRole('group', { name: 'Storage' })).getByRole('radio', { name: '256 GB' }),
    );
    await user.click(
      within(screen.getByRole('group', { name: 'Colour' })).getByRole('radio', { name: 'Silver' }),
    );
    await user.click(addButton);

    expect(await screen.findByText('Apple iPhone 8 added to your cart.')).toBeInTheDocument();
    expect(screen.getByText('1 item in cart')).toBeInTheDocument();

    // The count stays in the header after going back to the list.
    await user.click(breadcrumbs().getByRole('link', { name: 'Home' }));
    expect(await screen.findByRole('heading', { level: 1, name: 'Phones' })).toBeInTheDocument();
    expect(screen.getByText('1 item in cart')).toBeInTheDocument();
  });

  it('restores the search when going back from a product', async () => {
    const user = userEvent.setup();
    const { router } = renderRoute('/');

    await screen.findByRole('list', { name: 'Phones' });
    await user.type(screen.getByRole('searchbox'), 'acer');
    await user.click(screen.getByRole('link', { name: /Liquid Z6/ }));
    await screen.findByRole('heading', { level: 1, name: 'Liquid Z6' });

    await router.navigate(-1);

    expect(await screen.findByRole('searchbox')).toHaveValue('acer');
    const list = await screen.findByRole('list', { name: 'Phones' });
    expect(within(list).getAllByRole('link')).toHaveLength(1);
  });
});
