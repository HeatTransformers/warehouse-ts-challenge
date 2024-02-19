import { formatProductResponse, formatToolsResponse } from "./lib/formatters";
import { getJSON } from "./lib/helpers";
import {
  OrderReponse,
  ProductResponse,
  ProductType,
  ToolsResponse,
} from "./lib/types";

export class Api {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.BASE_URL || "http://localhost:3000/";
  }

  public async fetchHeatPumps() {
    const products = await getJSON<ProductResponse[]>(
      this.baseUrl + "heatPumps"
    );
    if (!products) return [];

    return formatProductResponse(products, ProductType.HeatPump);
  }

  public async fetchInstallationMaterials() {
    const products = await getJSON<ProductResponse[]>(
      this.baseUrl + "installationMaterials"
    );
    if (!products) return [];

    return formatProductResponse(products, ProductType.InstallationMaterial);
  }

  public async fetchTools() {
    const products = await getJSON<ToolsResponse[]>(this.baseUrl + "tools");
    if (!products) return [];

    return formatToolsResponse(products);
  }

  public async fetchOrders() {
    const orders = await getJSON<OrderReponse[]>(this.baseUrl + "orders");

    return orders;
  }
}
