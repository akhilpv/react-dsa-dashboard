import React, { useMemo } from 'react';
import type { Product } from '../../features/products/types/product.types';

interface ProductListProps {
  products: Product[];
  statusMap: Map<number, string>; 
}

const ProductList: React.FC<ProductListProps> = ({ products, statusMap }) => {

  const prefixPrice = useMemo(() => {
    const prefix = new Array(products.length).fill(0);
    for (let i = 0; i < products.length; i++) {
      prefix[i] = (prefix[i - 1] || 0) + products[i].price;
    }
    return prefix;
  }, [products]);
  
  return (
    <div className="space-y-4">
    <h2 className="text-lg font-semibold text-gray-700">
        🧾 Grand Total: ${prefixPrice[prefixPrice.length - 1] || 0}
      </h2>
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
    </div>
  );
};

export default ProductList;