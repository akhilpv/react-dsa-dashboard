import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';
import SearchBar from '../../../components/molecules/SearchBar';
import ProductList from '../../../components/organisms/ProductList';

type StockFilterType = 'all' | 'in-stock' | 'out-of-stock';
type SearchBarProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  sortBy: SortType;
  setSortBy: React.Dispatch<React.SetStateAction<SortType>>;
  stockFilter: StockFilterType;
  setStockFilter: React.Dispatch<React.SetStateAction<StockFilterType>>;
};
const SearchPage = () => {
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState<'name' | 'price'>('name');
    const [stockFilter, setStockFilter] = useState<'all' | 'in-stock' | 'out-of-stock'>('all');
    const products = useSelector((state: RootState) => state.products.products);

    const statusMap = useMemo(() => {
        const map = new Map<number, string>();
        products.forEach((product) => {
            map.set(product.id, product.status || 'unknown');
        });
        return map;
    }, [products]);

    const filtered = useMemo(() => {
        let result = products.filter(p =>
            p.name.toLowerCase().includes(search.toLowerCase())
        );

        if (stockFilter !== 'all') {
            result = result.filter(p =>
            (p.stock > 0 && stockFilter === 'in-stock') ||
            (p.stock === 0 && stockFilter === 'out-of-stock')
            );
        }

        return result.sort((a, b) =>
            sortBy === 'price' ? a.price - b.price : a.name.localeCompare(b.name)
        );
    }, [products, search, sortBy, stockFilter]);

    const outOfStockCount = useMemo(
        () => products.filter((p) => statusMap.get(p.id) === 'out-of-stock').length,
        [statusMap, products]
    );

    return (
        <>
            <h2 className="text-lg font-semibold text-indigo-700 mb-4">
                Search + Sort
            </h2>

            {outOfStockCount > 0 && (
                <div className="bg-red-100 text-red-600 px-4 py-2 rounded mb-4 font-medium">
                 {outOfStockCount} product(s) are out of stock!
                </div>
            )}
            <SearchBar {...{ search, setSearch, sortBy, setSortBy,stockFilter,setStockFilter }} />
            <ProductList products={filtered} statusMap={statusMap}/>
        </>
    );
};

export default SearchPage;