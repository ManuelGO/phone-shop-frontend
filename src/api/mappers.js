const EMPTY_VALUES = new Set(['', '-']);

function toText(value) {
  if (Array.isArray(value)) {
    const parts = value
      .map((part) => String(part).trim())
      .filter((part) => !EMPTY_VALUES.has(part));
    return parts.length ? parts.join(', ') : null;
  }
  if (value === null || value === undefined) return null;
  const text = String(value).trim();
  return EMPTY_VALUES.has(text) ? null : text;
}

function toNumber(value) {
  const text = toText(value);
  if (text === null) return null;
  const number = Number(text);
  return Number.isFinite(number) ? number : null;
}

function toOptions(options) {
  return Array.isArray(options)
    ? options
        .filter((option) => option && option.code !== undefined && option.name)
        .map((option) => ({ code: option.code, name: String(option.name) }))
    : [];
}

export function toProductSummary(raw) {
  return {
    id: raw.id,
    brand: toText(raw.brand) ?? '',
    model: toText(raw.model) ?? '',
    price: toNumber(raw.price),
    imageUrl: raw.imgUrl,
  };
}

// The API has a few quirks that are fixed here so the rest of the app never
// sees them: misspelled keys (dimentions, secondaryCmera), displayResolution
// and displaySize holding each other's values, and fields that are sometimes
// a string and sometimes a list.
export function toProductDetail(raw) {
  return {
    ...toProductSummary(raw),
    cpu: toText(raw.cpu),
    ram: toText(raw.ram),
    os: toText(raw.os),
    displayResolution: toText(raw.displaySize),
    displaySize: toText(raw.displayResolution),
    battery: toText(raw.battery),
    primaryCamera: toText(raw.primaryCamera),
    secondaryCamera: toText(raw.secondaryCmera),
    dimensions: toText(raw.dimentions),
    weight: toNumber(raw.weight),
    options: {
      colors: toOptions(raw.options?.colors),
      storages: toOptions(raw.options?.storages),
    },
  };
}
