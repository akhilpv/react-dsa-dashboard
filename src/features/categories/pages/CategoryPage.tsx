import React from 'react';
import { CategoryForm } from '../../../components/molecules/CategoryForm';
import { CategoryTree } from '../../../components/organisms/CategoryTree';

const CategoryPage = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
        Category Management
      </h2>
      <CategoryForm />
      <CategoryTree />
    </div>
  );
};

export default CategoryPage;