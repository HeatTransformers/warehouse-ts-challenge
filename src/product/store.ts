import type { Product } from "../lib/types";
import { Api } from "../api";

export class ProductsStore {
  private products: Map<Product["id"], Product>;

  constructor(private api: Api) {
    this.api = api;
    this.products = new Map();
  }

  public async fetchProducts() {
    const products = (await Promise.all([
      this.api.fetchHeatPumps(),
      this.api.fetchInstallationMaterials(),
      this.api.fetchTools(),
    ])) as Product[][];

    this.products = products.flat(1).reduce((map, product) => {
      map.set(product.id, product);
      return map;
    }, new Map());
  }

  public getProductById(id: string) {
    return this.products.get(id);
  }

  public updateStock(id: string) {
    const product = this.products.get(id);

    if (product && product.stock > 0) {
      product.stock = product.stock - 1;
      return true;
    }

    return false;
  }

  public getRestockList() {
    return Array.from(this.products.values()).filter(
      (product) => product.stock <= 0
    );
  }
}
