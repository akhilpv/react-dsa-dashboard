export type SortType = 'name' | 'price';
export type StockFilterType = 'all' | 'in-stock' | 'out-of-stock';
export type CategoryFilterType = 'all' | string;
export type SearchBarProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  sortBy: SortType;
  setSortBy: React.Dispatch<React.SetStateAction<SortType>>;
  stockFilter: StockFilterType;
  setStockFilter: React.Dispatch<React.SetStateAction<StockFilterType>>;
  categoryFilter: CategoryFilterType;
  setCategoryFilter: React.Dispatch<React.SetStateAction<CategoryFilterType>>;
  categories: string[];
  onExactSearch?: (input: string) => void;
};
