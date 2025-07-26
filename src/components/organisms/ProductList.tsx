import React, { useMemo, useState } from 'react';
import type { Product } from '../../features/products/types/product.types';
import {
  getNextGreaterPrices,
  buildNextCheaperMap,
} from '../../utils/priceTrend';
import { ArrowUpRight, ArrowDown, LayoutGrid, List } from 'lucide-react';
import { getMinPriceIndicesPerBatch } from '../../utils/slidingWindowMin';
import { RecommendedCombo } from './RecommendedCombo';
interface ProductListProps {
  products: Product[];
  statusMap: Map<number, string>;
}

const ProductList: React.FC<ProductListProps> = ({ products, statusMap }) => {
  const [layout, setLayout] = useState<'list' | 'grid'>('list');
  const prices = products.map((p) => p.price);
  const batchSize = layout === 'grid' ? 4 : products.length;
  const target = 2000;
  const minIndices = useMemo(
    () => getMinPriceIndicesPerBatch(prices, batchSize),
    [products, layout]
  );
  const minIndexSet = new Set(minIndices);

  const prefixPrice = useMemo(() => {
    const prefix = new Array(products.length).fill(0);
    for (let i = 0; i < products.length; i++) {
      prefix[i] = (prefix[i - 1] || 0) + products[i].price;
    }
    return prefix;
  }, [products]);

  const nextGreaterPrices = useMemo(() => getNextGreaterPrices(prices), [products]);
  const nextCheaperMap = useMemo(() => buildNextCheaperMap(prices), [products]);

  return (
    <div className="space-y-4">
      {/* Header Section */}
      <RecommendedCombo products={products} target={target} />
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-700">
          🧾 Grand Total: ${prefixPrice[prefixPrice.length - 1] || 0}
        </h2>
        <button
          className="text-gray-600 hover:text-indigo-600"
          onClick={() => setLayout(layout === 'grid' ? 'list' : 'grid')}
          title={`Switch to ${layout === 'grid' ? 'List' : 'Grid'} view`}
        >
          {layout === 'grid' ? <List size={20} /> : <LayoutGrid size={20} />}
        </button>
      </div>

      {/* Conditional Layout Rendering */}
      {layout === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product, index) => {
            const status = statusMap.get(product.id) || 'unknown';
            const isOutOfStock = status === 'out-of-stock';
            const nextCheaperIdx = nextCheaperMap.get(index);
            const nextGreaterPrice = nextGreaterPrices[index];
            const hasGreaterPriceAhead = nextGreaterPrice !== -1;

            return (
              <div
                key={product.id}
                className={`p-4 border rounded ${isOutOfStock ? 'bg-red-100' : 'bg-gray-50'}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-sm text-gray-600">Status: {status}</p>
                    <p className="text-sm text-gray-600">SKU: {product.sku}</p>
                    <p className="text-sm text-gray-600">Stock: {product.stock}</p>
                    <p className="text-sm text-gray-600">Category: {product.category}</p>
                    {nextCheaperIdx !== undefined && (
                      <p className="text-sm text-green-700 mt-1">
                        💡 Cheaper ahead: {products[nextCheaperIdx].name} – ${products[nextCheaperIdx].price}
                      </p>
                    )}
                    {minIndexSet.has(index) && (
                      <span className="inline-block bg-yellow-200 text-yellow-800 text-xs px-2 py-1 rounded mt-1">
                        🏷️ Lowest in Batch
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-indigo-700 font-medium">${product.price}</p>
                    {hasGreaterPriceAhead ? (
                      <ArrowUpRight className="text-green-600 mt-2" title="Price may rise ahead" />
                    ) : (
                      <ArrowDown className="text-red-500 mt-2" title="No greater price ahead" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <ul className="space-y-3">
          {products.map((product, index) => {
            const status = statusMap.get(product.id) || 'unknown';
            const isOutOfStock = status === 'out-of-stock';
            const nextCheaperIdx = nextCheaperMap.get(index);
            const nextGreaterPrice = nextGreaterPrices[index];
            const hasGreaterPriceAhead = nextGreaterPrice !== -1;

            return (
              <li
                key={product.id}
                className={`flex flex-col sm:flex-row justify-between p-4 border rounded ${isOutOfStock ? 'bg-red-100' : 'bg-gray-50'
                  }`}
              >
                <div>
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-sm text-gray-600">Status: {status}</p>
                  <p className="text-sm text-gray-600">SKU: {product.sku}</p>
                  <p className="text-sm text-gray-600">Stock: {product.stock}</p>
                  <p className="text-sm text-gray-600">Category: {product.category}</p>
                  {nextCheaperIdx !== undefined && (
                    <p className="text-sm text-green-700 mt-1">
                      💡 Cheaper ahead: {products[nextCheaperIdx].name} – ${products[nextCheaperIdx].price}
                    </p>
                  )}
                  {minIndexSet.has(index) && (
                    <span className="inline-block bg-yellow-200 text-yellow-800 text-xs px-2 py-1 rounded mt-1">
                      🏷️ Lowest in Batch
                    </span>
                  )}
                </div>
                <div className="flex flex-col items-end justify-between sm:items-end">
                  <span className="text-right text-indigo-700 font-medium">${product.price}</span>
                  {hasGreaterPriceAhead ? (
                    <ArrowUpRight className="text-green-600 mt-2" title="Price may rise ahead" />
                  ) : (
                    <ArrowDown className="text-red-500 mt-2" title="No greater price ahead" />
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ProductList;