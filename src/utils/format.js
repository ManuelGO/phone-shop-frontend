const priceFormatter = new Intl.NumberFormat('en-IE', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 2,
  minimumFractionDigits: 0,
});

export function formatPrice(price) {
  return typeof price === 'number' ? priceFormatter.format(price) : 'Price not available';
}

export function formatWeight(grams) {
  return typeof grams === 'number' ? `${grams} g` : null;
}
