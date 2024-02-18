export type OrderDTO = {
  id: String;
  articles: Array<string>;
  installationDate: string;
};

export type ProductDTO = {
  id: string;
  productCode: string;
  name: string;
  description: string;
  stock: number;
  unitPrice?: number;
};

export async function getJSON<T>(url: string): Promise<T> {
  return fetch(url).then((res) => res.json()) as unknown as T;
}

export class Api {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.BASE_URL || "http://localhost:3000/";
  }

  private async get<T>(path: string) {
    try {
      const response = await getJSON<T>(`${this.baseUrl}/${path}`);
      return response;
    } catch (error) {
      console.error("Error fetching data", error);
    }
  }

  public async getHeatPumps() {
    try {
      const data = await this.get<ProductDTO[]>("heatPumps");
      return data;
    } catch (error) {
      console.error("Error fetching heat pumps", error);
    }
  }

  public async getInstallationMaterials() {
    const data = await this.get<ProductDTO[]>("installationMaterials");
    return data;
  }

  public async getTools() {
    const data = await this.get<ProductDTO[]>("tools");
    return data;
  }

  public async getOrders() {
    const data = await this.get<OrderDTO[]>("orders");
    return data;
  }

  public async fetchAllProducts() {
    const products = await Promise.all([
      this.getHeatPumps(),
      this.getInstallationMaterials(),
      this.getTools(),
    ]);

    return products.flat();
  }
}
