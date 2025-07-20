import React from 'react';

type TabItem = {
  id: string;
  label: string;
};

type Props = {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tab: string) => void;
};

export const ProductTabs: React.FC<Props> = ({
  tabs,
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="flex border-b">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-2 font-medium ${
            tab.id === activeTab
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};