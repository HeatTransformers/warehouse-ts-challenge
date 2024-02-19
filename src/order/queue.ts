import type { OrderReponse } from "../lib/types";

export class OrderQueue {
  private orders: OrderReponse[] = [];

  constructor(orders: OrderReponse[] = []) {
    const sortedOrders = structuredClone(orders).sort(
      (a, b) =>
        new Date(a.installationDate).getTime() -
        new Date(b.installationDate).getTime()
    );
    this.orders = sortedOrders;
  }

  public dequeueOrder() {
    return this.orders.shift();
  }

  public get tasksLeft() {
    return this.orders.length;
  }
}
