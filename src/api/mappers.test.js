import { describe, expect, it } from 'vitest';
import { toProductDetail, toProductSummary } from './mappers.js';

const rawDetail = {
  id: 'ZmGrkLRPXOTpxsU4jjAcv',
  brand: 'Acer',
  model: 'Iconia Talk S',
  price: '170',
  imgUrl: 'https://example.com/a.jpg',
  cpu: 'Quad-core 1.3 GHz Cortex-A53',
  ram: '2 GB RAM',
  os: 'Android 6.0 (Marshmallow)',
  displayResolution: '7.0 inches (~69.8% screen-to-body ratio)',
  displaySize: '720 x 1280 pixels (~210 ppi pixel density)',
  battery: 'Non-removable Li-Ion 3400 mAh battery (12.92 Wh)',
  primaryCamera: ['13 MP', 'autofocus'],
  secondaryCmera: ['2 MP', '720p'],
  dimentions: '191.7 x 101 x 9.4 mm (7.55 x 3.98 x 0.37 in)',
  weight: '260',
  options: {
    colors: [{ code: 1000, name: 'Black' }],
    storages: [
      { code: 2000, name: '16 GB' },
      { code: 2001, name: '32 GB' },
    ],
  },
};

describe('toProductSummary', () => {
  it('maps the list fields and parses the price', () => {
    expect(toProductSummary(rawDetail)).toEqual({
      id: 'ZmGrkLRPXOTpxsU4jjAcv',
      brand: 'Acer',
      model: 'Iconia Talk S',
      price: 170,
      imageUrl: 'https://example.com/a.jpg',
    });
  });

  it('returns a null price when the API sends an empty one', () => {
    expect(toProductSummary({ ...rawDetail, price: '' }).price).toBeNull();
  });
});

describe('toProductDetail', () => {
  it('fixes misspelled keys and the swapped display fields', () => {
    const product = toProductDetail(rawDetail);

    expect(product.dimensions).toBe('191.7 x 101 x 9.4 mm (7.55 x 3.98 x 0.37 in)');
    expect(product.secondaryCamera).toBe('2 MP, 720p');
    expect(product.displayResolution).toBe('720 x 1280 pixels (~210 ppi pixel density)');
    expect(product.displaySize).toBe('7.0 inches (~69.8% screen-to-body ratio)');
  });

  it('joins list values and turns placeholders into null', () => {
    const product = toProductDetail({
      ...rawDetail,
      os: ['Android 7.0', 'planned upgrade'],
      dimentions: '-',
      battery: '',
      weight: '',
    });

    expect(product.primaryCamera).toBe('13 MP, autofocus');
    expect(product.os).toBe('Android 7.0, planned upgrade');
    expect(product.dimensions).toBeNull();
    expect(product.battery).toBeNull();
    expect(product.weight).toBeNull();
  });

  it('keeps the option codes needed by the cart', () => {
    expect(toProductDetail(rawDetail).options).toEqual({
      colors: [{ code: 1000, name: 'Black' }],
      storages: [
        { code: 2000, name: '16 GB' },
        { code: 2001, name: '32 GB' },
      ],
    });
  });

  it('copes with missing options', () => {
    expect(toProductDetail({ ...rawDetail, options: undefined }).options).toEqual({
      colors: [],
      storages: [],
    });
  });
});
