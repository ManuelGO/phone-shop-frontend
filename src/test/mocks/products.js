export const productList = [
  {
    id: 'acer-liquid-z6',
    brand: 'Acer',
    model: 'Liquid Z6',
    price: '120',
    imgUrl: 'https://example.com/acer-liquid-z6.jpg',
  },
  {
    id: 'apple-iphone-8',
    brand: 'Apple',
    model: 'iPhone 8',
    price: '809',
    imgUrl: 'https://example.com/apple-iphone-8.jpg',
  },
  {
    id: 'samsung-galaxy-s8',
    brand: 'Samsung',
    model: 'Galaxy S8',
    price: '',
    imgUrl: 'https://example.com/samsung-galaxy-s8.jpg',
  },
];

export const productDetails = {
  'acer-liquid-z6': {
    ...productList[0],
    cpu: 'Quad-core 1.25 GHz Cortex-A53',
    ram: '1 GB RAM',
    os: 'Android 6.0 (Marshmallow)',
    displayResolution: '5.0 inches',
    displaySize: '720 x 1280 pixels (~294 ppi pixel density)',
    battery: 'Removable Li-Ion 2000 mAh battery',
    primaryCamera: ['8 MP', 'autofocus', 'LED flash'],
    secondaryCmera: '2 MP',
    dimentions: '145.5 x 72.5 x 8.5 mm',
    weight: '',
    options: {
      colors: [{ code: 1000, name: 'Black' }],
      storages: [{ code: 2000, name: '8 GB' }],
    },
  },
  'apple-iphone-8': {
    ...productList[1],
    cpu: 'Hexa-core 2.39 GHz',
    ram: '2 GB RAM',
    os: 'iOS 11',
    displayResolution: '4.7 inches',
    displaySize: '750 x 1334 pixels',
    battery: 'Non-removable Li-Ion 1821 mAh battery',
    primaryCamera: '12 MP',
    secondaryCmera: '7 MP',
    dimentions: '138.4 x 67.3 x 7.3 mm',
    weight: '148',
    options: {
      colors: [
        { code: 1000, name: 'Gold' },
        { code: 1001, name: 'Silver' },
      ],
      storages: [
        { code: 2000, name: '64 GB' },
        { code: 2001, name: '256 GB' },
      ],
    },
  },
};
