import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';
import SearchBar from '../../../components/molecules/SearchBar';
import ProductList from '../../../components/organisms/ProductList';
import type { CategoryFilterType } from '../../../type/search.types';
import RecentSearches from '../../../components/organisms/RecentSearches';
const SearchPage = () => {
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState<'name' | 'price'>('name');
    const [stockFilter, setStockFilter] = useState<'all' | 'in-stock' | 'out-of-stock'>('all');
    const [categoryFilter, setCategoryFilter] = useState<CategoryFilterType>('all');

    const products = useSelector((state: RootState) => state.products.products);

    const categories = useMemo(() => {
        const unique = new Set(products.map((p) => p.category));
        return Array.from(unique);
    }, [products]);

    const statusMap = useMemo(() => {
        const map = new Map<number, string>();
        products.forEach((product) => {
            map.set(product.id, product.status || 'unknown');
        });
        return map;
    }, [products]);

    const stockMap = useMemo(()=>{
        const map: Record<number, boolean> = {};
        products.forEach((product) => {
        map[product.id] = product.stock > 0;
        });
        return map;
    },[products])

    const filtered = useMemo(() => {
        let result = products.filter(p =>
            p.name.toLowerCase().includes(search.toLowerCase())
        );
        
        if (stockFilter !== 'all') {
            result = result.filter(p =>
                stockFilter === 'in-stock' ? stockMap[p.id] : stockMap[p.id]
            );
        }
       
        if (categoryFilter !== 'all') {
            result = result.filter((p) => p.category === categoryFilter);
        }

        return result.sort((a, b) =>
            sortBy === 'price' ? a.price - b.price : a.name.localeCompare(b.name)
        );
    }, [products, search, sortBy, stockFilter,categoryFilter]);

    const outOfStockCount = useMemo(() => products.filter((p) => statusMap.get(p.id) === 'out-of-stock').length,
        [statusMap, products]);

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
            <SearchBar {...{ 
                search, 
                setSearch, 
                sortBy, 
                setSortBy,
                stockFilter,
                setStockFilter,
                categoryFilter,
                setCategoryFilter,
                categories }} />
            <RecentSearches />
            <ProductList products={filtered} statusMap={statusMap}/>
        </>
    );
};

export default SearchPage;