import { randomUUID } from "crypto";

import { Invoice, OrderReponse, Package } from "../lib/types";
import { OrderQueue } from "./queue";
import { ProductsStore } from "../product/store";

export class OrderService {
  readonly orderQueue: OrderQueue;
  private errorQueue: OrderReponse[] = [];

  constructor(
    private productsStore: ProductsStore,
    orders: OrderReponse[] = []
  ) {
    this.productsStore = productsStore;
    this.orderQueue = new OrderQueue(orders);
  }

  private handleOrder(order: OrderReponse) {
    let totalPrice = 0;
    let packages = new Map<Package["id"], Package>();

    for (const article of order.articles) {
      const product = this.productsStore.getProductById(article);

      if (!product) {
        console.error(
          `Process order ${order.id} failed: Product ${article} not found`
        );
        throw new Error(`Product ${article} not found`);
      }

      if (product.stock <= 0) {
        console.error(
          `Process order ${order.id} failed:\nProduct ${product.name} out of stock`
        );
        throw new Error(`Product ${article} out of stock`);
      }

      totalPrice += product.unitPrice;
    }

    // Using two loops to update stock only if all products are available
    for (const article of order.articles) {
      const product = this.productsStore.getProductById(article)!;
      packages.set(product.id, {
        id: product.id,
        name: product.name,
        description: product.description,
        quantity: packages.has(product.id)
          ? packages.get(product.id)!.quantity + 1
          : 1,
      });

      // TODO: Consider using batch update if you are going to implement a real database
      this.productsStore.updateStock(article);
    }

    const invoice: Invoice = {
      id: randomUUID(),
      orderId: order.id,
      packages: Array.from(packages.values()),
      installationDate: new Date(order.installationDate).toLocaleDateString(),
      totalPrice,
    };

    return invoice;
  }

  public processOrders() {
    while (this.orderQueue.tasksLeft > 0) {
      const order = this.orderQueue.dequeueOrder()!;

      try {
        const invoice = this.handleOrder(order);
        console.log(`--- Order ${order.id} processed ---`);
        console.log(`--- Invoice: ---`);
        console.log(invoice);
      } catch (error) {
        this.errorQueue.push(order);
      }
    }
  }
}
