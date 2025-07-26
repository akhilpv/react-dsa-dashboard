import { useMemo } from 'react';
import type { Product } from '../types/product.types';

export const useClosestProductPair = (
  products: Product[],
  target: number
): [Product, Product] | null => {
  return useMemo(() => {
    if (products.length < 2) return null;

    const sorted = [...products].sort((a, b) => a.price - b.price);
    let left = 0;
    let right = sorted.length - 1;
    let closestPair: [Product, Product] | null = null;
    let closestDiff = Infinity;

    while (left < right) {
      const sum = sorted[left].price + sorted[right].price;
      const diff = Math.abs(sum - target);

      if (diff < closestDiff) {
        closestDiff = diff;
        closestPair = [sorted[left], sorted[right]];
      }

      sum < target ? left++ : right--;
    }

    return closestPair;
  }, [products, target]);
};