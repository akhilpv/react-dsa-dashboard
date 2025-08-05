import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from '../../features/categories/slices/categorySlice';
import type { RootState } from '../../app/store';
import type { Category } from '../../features/categories/types/category.types';

export const CategoryForm: React.FC = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.categories.list);
  const [name, setName] = useState('');
  const [parentId, setParentId] = useState<number | undefined>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newCategory: Category = {
      id: Date.now(),
      name: name.trim(),
      parentId: parentId || undefined,
    };

    dispatch(addCategory(newCategory));
    setName('');
    setParentId(undefined);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mb-4">
      <input
        className="border p-2 rounded w-full"
        placeholder="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select
        className="border p-2 rounded w-full"
        value={parentId ?? ''}
        onChange={(e) => setParentId(e.target.value ? parseInt(e.target.value) : undefined)}
      >
        <option value="">No Parent (Top Level)</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Category
      </button>
    </form>
  );
};