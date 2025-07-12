import React from 'react';
import type { Product } from '../../features/products/types/product.types';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <ul className="space-y-3">
      {products.map(product => (
        <li key={product.id} className="flex justify-between p-4 border rounded bg-gray-50">
          <span>{product.name}</span>
          <span className="text-gray-600">${product.price}</span>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;