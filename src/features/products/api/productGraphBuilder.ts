import type { Product } from '../types/product.types';

export const buildProductGraph = (products: Product[]): Record<number, number[]> => {
  const graph: Record<number, number[]> = {};

  for (const product of products) {
    graph[product.id] = [];

    for (const other of products) {
      if (product.id !== other.id && product.category === other.category) {
        graph[product.id].push(other.id);
      }
    }
  }

  return graph;
};