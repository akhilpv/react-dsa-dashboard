
import type { Product } from "../features/products/types/product.types";
export const lowerBoundByExpiry = (
  products: Product[],
  target: Date
): number => {
  let low = 0;
  let high = products.length - 1;
  let result = products.length;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const midDate = new Date(products[mid].expiryDate);

    if (midDate >= target) {
      result = mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return result;
};
