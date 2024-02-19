import { randomUUID } from "crypto";

export type OrderReponse = {
  id: string;
  articles: Array<string>;
  installationDate: string;
};

export type ProductResponse = {
  id: string;
  productCode: string;
  name: string;
  description?: string;
  stock: number;
  unitPrice: number;
};

export type ToolsResponse = Omit<ProductResponse, "unitPrice">;

export enum ProductType {
  HeatPump = "heatPump",
  InstallationMaterial = "installationMaterial",
  Tool = "tool",
}

export interface Product extends ProductResponse {
  type: ProductType;
}

export type Package = {
  id: string;
  name: string;
  description?: string;
  quantity: number;
};

export type Invoice = {
  id: string;
  orderId: string;
  packages: Package[];
  installationDate: string;
  totalPrice: number;
};
