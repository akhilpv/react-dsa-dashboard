import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';
import { Trie } from '../../../utils/trie';
import { getSortedCategoriesByFrequency, updateSearchFrequency } from '../../../utils/categoryFrequency';
import { isAnagram } from '../../../utils/anagramCheck';

export const CategorySearchPage: React.FC = () => {
  const categories = useSelector((state: RootState) => state.categories.list);
  const categoryNames = useMemo(() => categories.map(cat => cat.name), [categories]);

  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [anagramQuery, setAnagramQuery] = useState('');
  const [anagramMatches, setAnagramMatches] = useState<string[]>([]);

  const trie = useMemo(() => new Trie(), []);

  useEffect(() => {
    trie.clear(); 
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

  const handleAnagramChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setAnagramQuery(val);
    const matches = categoryNames.filter(cat =>
      isAnagram(cat.toLowerCase(), val.toLowerCase())
    );
    setAnagramMatches(matches);
  };

  const rankedSuggestions = useMemo(() => {
    return getSortedCategoriesByFrequency(suggestions);
  }, [suggestions]);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Search Categories</h2>

      {/* Normal Trie-based search */}
      <input
        type="text"
        list="category-options"
        value={query}
        onChange={handleChange}
        placeholder="Start typing category..."
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <datalist id="category-options">
        {rankedSuggestions.map((sug, index) => (
          <option key={index} value={sug} />
        ))}
      </datalist>

      {/* Anagram Search */}
      <input
        type="text"
        value={anagramQuery}
        onChange={handleAnagramChange}
        placeholder="Search by anagram (e.g., 'Tanits' → Statin)"
        className="w-full border border-gray-300 rounded px-3 py-2 mt-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      {/* Show results */}
      <div className="mt-3">
        {anagramMatches.length > 0 ? (
          anagramMatches.map((m, idx) => (
            <p key={idx} className="text-green-600 font-semibold">
              ✅ Did you mean: {m}?
            </p>
          ))
        ) : anagramQuery ? (
          <p className="text-red-500">No anagram matches found</p>
        ) : null}
      </div>
    </div>
  );
};
