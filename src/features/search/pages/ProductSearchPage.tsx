import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';
import { ProductCard } from '../../../components/organisms/ProductCard';
import { binarySearchIndex } from '../../../utils/binarySearchPagination';
import { SegmentTreeSearch } from '../../../components/organisms/SegmentTreeSearch';
export const ProductSearchPage: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.products);
  const [query, setQuery] = useState('');
  const [resultIndex, setResultIndex] = useState<number | null>(null);

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => a.id - b.id);
  }, [products]);

  const handleSearch = () => {
    const targetID = parseInt(query.trim());
    if (!isNaN(targetID)) {
      const idx = binarySearchIndex(sortedProducts, (p) => p.id >= targetID);
      if (idx !== -1 && sortedProducts[idx].id === targetID) {
        setResultIndex(idx);
      } else {
        setResultIndex(null);
      }
    }
  };

  const foundProduct = resultIndex !== null ? sortedProducts[resultIndex] : null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">🔍 Search Product by ID</h2>
      <div className="flex gap-2 mb-6">
       
        <SegmentTreeSearch />
        
      </div>

      {foundProduct ? (
        <div>
          <h3 className="text-lg font-medium mb-2">✅ Found Product</h3>
          <ProductCard product={foundProduct} />
        </div>
      ) : (
        query && <p className="text-red-500">No product found with ID {query}</p>
      )}
    </div>
  );
};