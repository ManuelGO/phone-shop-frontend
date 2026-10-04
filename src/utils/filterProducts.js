function normalize(text) {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

// Every word in the query has to appear in the brand or model, in any order,
// so "liquid acer" finds "Acer Liquid Z6".
export function filterProducts(products, query) {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return products;

  return products.filter((product) => {
    const haystack = normalize(`${product.brand} ${product.model}`);
    return terms.every((term) => haystack.includes(term));
  });
}
