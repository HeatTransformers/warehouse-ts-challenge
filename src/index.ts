import { Api } from "./api";

async function main() {
  const client = new Api();
  const products = await client.fetchAllProducts();

  console.log(products);
}

main();
