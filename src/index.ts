import { Api } from "./api";
import { OrderService } from "./order";
import { ProductsStore } from "./product/store";

async function main() {
  const api = new Api();
  const store = new ProductsStore(api);

  const [orders] = await Promise.all([
    api.fetchOrders(),
    store.fetchProducts(),
  ]);

  const orderService = new OrderService(store, orders);

  orderService.processOrders();
  store.getRestockList().forEach((product) => {
    console.log(
      `Product ${product.name} (${product.productCode}) needs restock`
    );
  });
}

main().catch((error) => {
  console.error("Error processing orders", error);
});
