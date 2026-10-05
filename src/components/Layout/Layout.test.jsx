import { describe, expect, it } from 'vitest';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderRoute } from '../../test/renderRoute.jsx';

describe('Layout', () => {
  it('offers a skip link to the main content as the first focusable element', async () => {
    const user = userEvent.setup();
    renderRoute('/');

    await user.tab();

    const skipLink = screen.getByRole('link', { name: 'Skip to main content' });
    expect(skipLink).toHaveFocus();
    expect(skipLink).toHaveAttribute('href', '#main-content');
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content');
  });

  it('does not move focus on the first page load', () => {
    renderRoute('/');
    expect(screen.getByRole('main')).not.toHaveFocus();
  });

  it('moves focus to the main content after navigating to another page', async () => {
    const user = userEvent.setup();
    renderRoute('/');

    const list = await screen.findByRole('list', { name: 'Phones' });
    await user.click(within(list).getAllByRole('link')[0]);

    expect(screen.getByRole('main')).toHaveFocus();
  });

  it('keeps focus in the search box while the query changes the URL', async () => {
    const user = userEvent.setup();
    renderRoute('/');
    await screen.findByRole('list', { name: 'Phones' });

    const search = screen.getByRole('searchbox');
    await user.type(search, 'apple');

    expect(search).toHaveFocus();
  });
});
