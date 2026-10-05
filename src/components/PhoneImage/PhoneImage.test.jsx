import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { PhoneImage } from './PhoneImage.jsx';

describe('PhoneImage', () => {
  it('shows the image when it loads', () => {
    render(<PhoneImage src="https://example.com/phone.jpg" alt="Acme One" />);
    expect(screen.getByRole('img', { name: 'Acme One' })).toHaveAttribute(
      'src',
      'https://example.com/phone.jpg',
    );
  });

  it('shows a placeholder with the same name when the image fails to load', () => {
    render(<PhoneImage src="https://example.com/broken.jpg" alt="Acme One" />);

    fireEvent.error(screen.getByRole('img', { name: 'Acme One' }));

    const placeholder = screen.getByRole('img', { name: 'Acme One' });
    expect(placeholder.tagName).toBe('DIV');
    expect(placeholder).toHaveTextContent('Image not available');
  });

  it('shows a placeholder when there is no image URL', () => {
    render(<PhoneImage src={null} alt="Acme One" />);
    expect(screen.getByRole('img', { name: 'Acme One' })).toHaveTextContent('Image not available');
  });

  it('tries again when the URL changes after a failure', () => {
    const { rerender } = render(<PhoneImage src="https://example.com/broken.jpg" alt="Acme One" />);
    fireEvent.error(screen.getByRole('img', { name: 'Acme One' }));

    rerender(<PhoneImage src="https://example.com/fixed.jpg" alt="Acme One" />);

    expect(screen.getByRole('img', { name: 'Acme One' })).toHaveAttribute(
      'src',
      'https://example.com/fixed.jpg',
    );
  });
});
