import { useMemo } from 'react';
import { bfsTraverse } from '../../../utils/bfs';
import { buildProductGraph } from '../api/productGraphBuilder';
import type { Product } from '../types/product.types';

export const useRelatedProducts = (
  products: Product[],
  productId: number,
  maxDepth = 1
): Product[] => {
  const graph = useMemo(() => buildProductGraph(products), [products]);

  const relatedIds = useMemo(
    () => bfsTraverse(productId, graph, maxDepth),
    [productId, graph, maxDepth]
  );

  return useMemo(
    () => relatedIds.map((id) => products.find((p) => p.id === id)).filter(Boolean) as Product[],
    [relatedIds, products]
  );
};