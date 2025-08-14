import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { SegmentTree } from '../../utils/segmentTree';
type Product = {
  id: string;
  name: string;
  price: number;
};

export const SegmentTreeSearch: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.products);
  const [productId, setProductId] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    if (products.length === 0) return;

    // Build Segment Tree from product prices
    const prices = products.map((p) => p.price);
    const segTree = new SegmentTree(prices);

    let filtered = products;

    // Filter by Product ID if entered
    if (productId.trim()) {
      filtered = filtered.filter((p) =>
        p.id.toLowerCase().includes(productId.toLowerCase())
      );
    }

    // Filter by Price Range using Segment Tree if entered
    if (priceRange.min && priceRange.max) {
      const minPrice = parseFloat(priceRange.min);
      const maxPrice = parseFloat(priceRange.max);

      filtered = filtered.filter((p, idx) => {
        const total = segTree.query(1, 0, products.length - 1, idx, idx);
        return total >= minPrice && total <= maxPrice;
      });
    }

    setResults(filtered);
  }, [productId, priceRange, products]);

  return (
    <div className="p-4 border rounded bg-white shadow-md">
      <h2 className="text-lg font-bold mb-4">Segment Tree Search</h2>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="border p-2 rounded w-1/3"
        />
        <input
          type="number"
          placeholder="Min Price"
          value={priceRange.min}
          onChange={(e) =>
            setPriceRange({ ...priceRange, min: e.target.value })
          }
          className="border p-2 rounded w-1/3"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={priceRange.max}
          onChange={(e) =>
            setPriceRange({ ...priceRange, max: e.target.value })
          }
          className="border p-2 rounded w-1/3"
        />
      </div>

      <ul className="list-disc pl-6">
        {results.map((p) => (
          <li key={p.id}>
            {p.name} — ₹{p.price}
          </li>
        ))}
      </ul>
    </div>
  );
};