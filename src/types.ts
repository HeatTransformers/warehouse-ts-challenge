export interface Order {
  id: string;
  articles: string[];
  installationDate: string;
}

export interface Material {
  id: string;
  productCode: string;
  name: string;
  description: string;
  stock: number;
  unitPrice: number;
}

export interface Tool {
  id: string;
  productCode: string;
  name: string;
  description: string;
  stock: number;
}

export type Product = Material | Tool;
