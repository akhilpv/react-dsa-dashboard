import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';
import type { Product } from '../types/product.types';
import { ProductCard } from '../../../components/organisms/ProductCard';

export const RelatedProductPage: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.products);
  const categories = useSelector((state: RootState) => state.categories.list);

  const getRelatedCategoryIds = (categoryId: number): Set<number> => {
    const relatedIds = new Set<number>();
    const dfs = (id: number) => {
      relatedIds.add(id);
      categories
        .filter((cat) => cat.parentId === id)
        .forEach((child) => dfs(child.id));
    };
    dfs(categoryId);
    return relatedIds;
  };

  const productWithRelated = useMemo(() => {
    return products.map((product) => {
      const relatedCategoryIds = getRelatedCategoryIds(product.categoryId);
      const relatedProducts = products.filter(
        (p) =>
          p.id !== product.id && relatedCategoryIds.has(p.categoryId)
      );
      return { product, relatedProducts };
    });
  }, [products, categories]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Products & Related Recommendations</h1>
      <div className="space-y-10">
        {productWithRelated.map(({ product, relatedProducts }) => (
          <div key={product.id} className="border-b pb-6">
            <h2 className="text-xl font-semibold mb-2">📦 {product.name}</h2>
            <ProductCard product={product} />

            {relatedProducts.length > 0 && (
              <>
                <h3 className="mt-4 text-lg font-medium text-gray-600">You may also like:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                  {relatedProducts.map((rp) => (
                    <ProductCard key={rp.id} product={rp} />
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};