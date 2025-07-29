import React from 'react';
import type { Product } from '../../features/products/types/product.types';

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="border p-4 rounded shadow hover:shadow-md transition">
      <h2 className="font-semibold text-lg">{product.name}</h2>
      <p className="text-gray-600">Price: ₹{product.price}</p>
    </div>
  );
};
