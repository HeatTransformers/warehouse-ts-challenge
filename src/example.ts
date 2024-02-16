import axios from 'axios';
import { Order, Material, Tool, Product } from './types';

export const createInvoicePrice = (product: Product, total: number): number => {
  if (product && 'unitPrice' in product && product.unitPrice) {
    return total + product.unitPrice;
  }

  return total;
};

export const buildPackages = (orders: Order[], products: Product[]): void => {
  orders.every((order) => {
    const packageArticles: Product[] = [];
    let totalPrice: number = 0;

    const result = order.articles.every((articleId) => {
      const index = products.findIndex((product) => product.id === articleId);
      if (products[index] && products[index].stock > 0) {
        packageArticles.push(products[index]);
        products[index].stock--;
        totalPrice = createInvoicePrice(products[index], totalPrice);

        return true;
      } else {
        console.log(`Package for order ${order.id}: could not be done !!!`);
        return false;
      }
    });

    if (!result) {
      return false;
    }
    console.log(`Package for order ${order.id}: `, packageArticles);
    console.log(`Total price for order ${order.id}: `, totalPrice);
    return true;
  });
};

export const produceRestockingList = (products: Product[]): void => {
  const restockingList: Product[] = products.filter(
    (product) => product.stock <= 3
  );

  console.log('Restocking List:', restockingList);
};

export const exampleFunction = async () => {
  let products: Product[] = [];

  const getData = async <T>(url: string): Promise<T[]> => {
    const response = await axios.get('http://localhost:3000/' + url);

    return response.data;
  };

  const [heatPumps, installationMaterials, tools] = await axios.all([
    getData<Material>('heatPumps'),
    getData<Material>('installationMaterials'),
    getData<Tool>('tools'),
  ]);

  products = [...heatPumps, ...installationMaterials, ...tools];

  const orderList = await getData<Order>('orders');

  if (!orderList || orderList.length === 0) {
    console.log('No orders provided');
    return;
  }

  buildPackages(orderList, products);
  produceRestockingList(products);
};
