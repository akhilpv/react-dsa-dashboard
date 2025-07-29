import type { Product } from "../features/products/types/product.types";
export function getProductsAboveBudget(products: Product[], budget: number): Product[] {
  const sorted = [...products].sort((a, b) => a.price - b.price);
  let low = 0, high = sorted.length - 1, result = -1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (sorted[mid].price >= budget) {
      result = mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return result !== -1 ? sorted.slice(result) : [];
}