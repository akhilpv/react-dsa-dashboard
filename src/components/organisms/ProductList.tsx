import React from 'react';
import type { Product } from '../../features/products/types/product.types';

interface ProductListProps {
  products: Product[];
  statusMap: Map<number, string>; 
}

const ProductList: React.FC<ProductListProps> = ({ products, statusMap }) => {
  return (
    <ul className="space-y-3">
      {products.map((product) => {
        const status = statusMap.get(product.id) || 'unknown';
        const isOutOfStock = status === 'out-of-stock';

        return (
          <li
            key={product.id}
            className={`flex flex-col sm:flex-row justify-between p-4 border rounded ${
              isOutOfStock ? 'bg-red-100' : 'bg-gray-50'
            }`}
          >
            <div>
              <p className="font-semibold">{product.name}</p>
              <p className="text-sm text-gray-600">Status: {status}</p>
              <p className="text-sm text-gray-600">SKU: {product.sku}</p>
              <p className="text-sm text-gray-600">Stock: {product.stock}</p>
              <p className="text-sm text-gray-600">Category: {product.category}</p> 
            </div>
            <span className="text-right text-indigo-700 font-medium mt-2 sm:mt-0">
              ${product.price}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default ProductList;