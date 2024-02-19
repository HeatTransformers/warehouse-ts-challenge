import { Product, ProductResponse, ProductType, ToolsResponse } from "./types";

export function formatProductResponse(
  response: ProductResponse[],
  type: ProductType
): Product[] {
  return response.map((product) => ({
    ...product,
    type,
  }));
}

// I guessed that the `unitPrice` is always 0 for tools
export function formatToolsResponse(response: ToolsResponse[]): Product[] {
  return response.map((product) => ({
    ...product,
    unitPrice: 0,
    type: ProductType.Tool,
  }));
}
