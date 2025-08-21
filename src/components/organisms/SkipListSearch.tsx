import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { SkipList } from "../../utils/skipList";
import SearchInput from "../molecules/SearchInput";
import type { Product } from "../../features/products/types/product.types";

const SkipListSearch: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.products);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<Product | null>(null);

  // Build skip list on product.name
  const skipList = useMemo(
    () => new SkipList<Product>((a, b) => a.name.localeCompare(b.name)),
    []
  );

  useEffect(() => {
    skipList.getAll().forEach(() => {}); // just to initialize
    products.forEach((p) => skipList.insert(p));
  }, [products, skipList]);

  const handleSearch = (val: string) => {
    setQuery(val);
    const found = skipList.search({
      id: 0,
      name: val,
      sku: "",
      status: "in-stock",
      stock: 0,
      price: 0,
      category: "",
      expiryDate: "",
      salesCount: 0,
      discount: 0,
    });
    setResult(found);
  };

  return (
    <div className="max-w-xl mx-auto p-6 border rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Product Search (Skip List)</h2>
      <SearchInput
        value={query}
        onChange={handleSearch}
        placeholder="Enter product name..."
      />
      {result ? (
        <div className="mt-4 p-3 border rounded bg-green-100">
          ✅ Found: <strong>{result.name}</strong> ({result.category}) – ₹
          {result.price}
        </div>
      ) : query ? (
        <div className="mt-4 p-3 border rounded bg-red-100">❌ No match found</div>
      ) : null}
    </div>
  );
};

export default SkipListSearch;
