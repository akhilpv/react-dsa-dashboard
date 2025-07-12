import { useState } from 'react';
import SearchSortTab from './SearchSortTab';
import UndoRedoTab from './UndoRedoTab';

const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState<'search' | 'undo'>('search');

  return (
    <div className="max-w-3xl mx-auto mt-6">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab('search')}
          className={`px-4 py-2 rounded ${
            activeTab === 'search' ? 'bg-indigo-600 text-white' : 'bg-gray-200'
          }`}
        >
          🔍 Search + Sort - Day 1
        </button>
        <button
          onClick={() => setActiveTab('undo')}
          className={`px-4 py-2 rounded ${
            activeTab === 'undo' ? 'bg-indigo-600 text-white' : 'bg-gray-200'
          }`}
        >
          🔁 Undo / Redo - Day 2
        </button>
      </div>

      <div className="bg-white p-4 rounded shadow">
        {activeTab === 'search' ? <SearchSortTab /> : <UndoRedoTab />}
      </div>
    </div>
  );
};

export default ProductTabs;