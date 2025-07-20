import React from "react";
import type { SearchBarProps, SortType,StockFilterType } from "../../type/search.types";
const SearchBar: React.FC<SearchBarProps> = ({   search,
  setSearch,
  sortBy,
  setSortBy,
  stockFilter,
  setStockFilter,
  categoryFilter,
  setCategoryFilter,
  categories }) => {
  return (
    <div className="flex gap-4 mb-6">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search product..."
        className="w-full px-4 py-2 border border-gray-300 rounded"
      />
      <select
        value={stockFilter}
        onChange={(e) => setStockFilter(e.target.value as StockFilterType)}
        className="px-3 py-2 border border-gray-300 rounded"
      >
        <option value="all">All</option>
        <option value="in-stock">In Stock</option>
        <option value="out-of-stock">Out of Stock</option>
      </select>
      <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="p-2 border rounded">
        <option value="all">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value as SortType)}
        className="px-3 py-2 border border-gray-300 rounded"
      >
        <option value="name">Sort by Name</option>
        <option value="price">Sort by Price</option>
      </select>
    </div>
  );
};

export default SearchBar;