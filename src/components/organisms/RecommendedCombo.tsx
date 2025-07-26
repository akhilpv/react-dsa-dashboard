import React from 'react';
import { useClosestProductPair } from '../../features/products/hooks/useClosestProductPair';
import type { Product } from '../../features/products/types/product.types';
interface Props {
  products: Product[];
  target: number;
}

export const RecommendedCombo: React.FC<Props> = ({ products, target }) => {
  const pair = useClosestProductPair(products, target);

  if (!pair) return null;

  const [first, second] = pair;
  const total = first.price + second.price;

  return (
    <div className="p-4 bg-slate-50 border rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-2">🎯 Recommended Combo</h2>
      <div className="flex gap-4 items-center">
        <div className="flex-1">
          ✅ <strong>{first.name}</strong> (₹{first.price})
        </div>
        <div className="flex-1">
          ➕ <strong>{second.name}</strong> (₹{second.price})
        </div>
        <div className="text-green-600 font-bold">
          = ₹{total} (Closest to ₹{target})
        </div>
      </div>
    </div>
  );
};
