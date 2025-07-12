import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';
import SearchBar from '../../../components/molecules/SearchBar';
import ProductList from '../../../components/organisms/ProductList';

const SearchSortTab = () => {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price'>('name');

  const products = useSelector((state: RootState) => state.products.products);

  const filtered = useMemo(() => {
    const res = products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    return res.sort((a, b) =>
      sortBy === 'price' ? a.price - b.price : a.name.localeCompare(b.name)
    );
  }, [search, sortBy, products]);

  return (
    <>
      <h2 className="text-lg font-semibold text-indigo-700 mb-4">
        Search + Sort (Dynamic)
      </h2>
      <SearchBar {...{ search, setSearch, sortBy, setSortBy }} />
      <ProductList products={filtered} />
    </>
  );
};

export default SearchSortTab;