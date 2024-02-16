import {
  createInvoicePrice,
  buildPackages,
  produceRestockingList,
} from './example';

jest.mock('axios');

describe('createInvoicePrice', () => {
  const product = {
    id: '503124-fs-42343-fdsmt31432-0e',
    productCode: 'ACE6',
    name: 'Remeha Ace 6kW',
    description: 'Slightly less popular heat pump in the Netherlands',
    stock: 1,
  };

  test('should calculate total price correctly', () => {
    const productWithPrice = {
      ...product,
      unitPrice: 700,
    };
    const total = 100;

    expect(createInvoicePrice(productWithPrice, total)).toBe(800);
  });

  test("should return total if product don't have unitPrice prop", () => {
    const total = 100;

    expect(createInvoicePrice(product, total)).toBe(total);
  });
});

describe('buildPackages', () => {
  const product = {
    id: 'id1',
    productCode: 'ACE6',
    name: 'Remeha Ace 6kW',
    description: 'Slightly less popular heat pump in the Netherlands',
    stock: 3,
    unitPrice: 10,
  };
  const orders = [
    {
      id: '1',
      articles: ['id1', 'id2'],
      installationDate: '2024-01-10T00:00:00.000Z',
    },
  ];

  test('should build packages correctly', () => {
    const products = [
      product,
      { ...product, id: 'id2' },
      { ...product, id: 'id3' },
    ];
    const consoleSpy = jest.spyOn(console, 'log');

    buildPackages(orders, products);
    expect(consoleSpy).toHaveBeenCalledWith('Package for order 1: ', [
      product,
      { ...product, id: 'id2' },
    ]);
    expect(consoleSpy).toHaveBeenCalledWith('Total price for order 1: ', 20);
    consoleSpy.mockRestore();
  });

  test('should show warning message', () => {
    const products = [product];
    const consoleSpy = jest.spyOn(console, 'log');

    buildPackages(orders, products);
    expect(consoleSpy).toHaveBeenCalledWith(
      'Package for order 1: could not be done !!!'
    );
    consoleSpy.mockRestore();
  });
});

describe('produceRestockingList', () => {
  const product = {
    id: '1',
    productCode: 'ACE6',
    name: 'Remeha Ace 6kW',
    description: 'Slightly less popular heat pump in the Netherlands',
    stock: 4,
    unitPrice: 10,
  };

  test('should generate restocking list correctly', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const products = [
      product,
      { ...product, id: '2', stock: 1 },
      { ...product, id: '3', stock: 5 },
    ];
    produceRestockingList(products);
    expect(consoleSpy).toHaveBeenCalledWith('Restocking List:', [
      { ...product, id: '2', stock: 1 },
    ]);
    consoleSpy.mockRestore();
  });
});
