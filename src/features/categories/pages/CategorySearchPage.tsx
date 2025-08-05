import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';
import { Trie } from '../../../utils/trie';
import { getSortedCategoriesByFrequency } from '../../../utils/categoryFrequency';
import { updateSearchFrequency } from '../../../utils/categoryFrequency';
export const CategorySearchPage: React.FC = () => {
  const categories = useSelector((state: RootState) => state.categories.list);
  const categoryNames = useMemo(() => categories.map(cat => cat.name), [categories]);

  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const trie = useMemo(() => new Trie(), []);

  useEffect(() => {
    trie.clear(); // make sure previous data is reset
    categoryNames.forEach(name => trie.insert(name));
  }, [categoryNames]);

  useEffect(() => {
    setSuggestions(trie.getSuggestions(query));
  }, [query, trie]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setSuggestions(trie.getSuggestions(val));
    updateSearchFrequency(val); 
  };

  const rankedSuggestions = useMemo(() => {
    return getSortedCategoriesByFrequency(suggestions);
  }, [suggestions]);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Search Categories</h2>
      <input
        type="text"
        list="category-options"
        value={query}
        onChange={handleChange}
        placeholder="Start typing category..."
        className="w-full border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <datalist id="category-options">
        {rankedSuggestions.map((sug, index) => (
          <option key={index} value={sug} />
        ))}
      </datalist>
    </div>
  );
};