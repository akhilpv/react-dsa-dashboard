import React from "react";
type SortType = 'name' | 'price';
type SearchBarProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  sortBy: SortType;
  setSortBy: React.Dispatch<React.SetStateAction<SortType>>;
};
const SearchBar: React.FC<SearchBarProps> = ({ search, setSearch, sortBy, setSortBy }) => {
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
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded"
      >
        <option value="name">Sort by Name</option>
        <option value="price">Sort by Price</option>
      </select>
    </div>
  );
};

export default SearchBar;