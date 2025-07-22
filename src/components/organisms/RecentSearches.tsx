import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';

const RecentSearches = () => {
  const terms = useSelector((state: RootState) => state.recentSearch.terms);

  if (terms.length === 0) return null;

  return (
    <div className="bg-gray-100 p-3 rounded mb-4">
      <h4 className="text-sm font-semibold mb-2 text-gray-700">Recent Searches:</h4>
      <div className="flex flex-wrap gap-2">
        {terms.map((term, index) => (
          <span
            key={index}
            className="bg-white border border-gray-300 text-gray-700 px-2 py-1 text-xs rounded"
          >
            {term}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;