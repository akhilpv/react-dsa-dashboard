import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { ProductCard } from '../organisms/ProductCard';

type Props = {
  productIds: string[];
  currentProductId: string;
};

export const RecentlyViewedProducts: React.FC<Props> = ({ productIds, currentProductId }) => {
  const products = useSelector((state: RootState) => state.products.products);

  const recentProducts = productIds
    .filter(id => id !== currentProductId)
    .map(id => products.find(p => p.id.toString() === id))
    .filter(Boolean);

  if (recentProducts.length === 0) return null;

  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold mb-4">Recently Viewed</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {recentProducts.map(product => (
          <ProductCard key={product!.id} product={product!} />
        ))}
      </div>
    </div>
  );
};