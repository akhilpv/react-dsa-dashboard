import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import type { Category } from '../../features/categories/types/category.types';

type Props = {
  parentId?: number;
};

export const CategoryTree: React.FC<Props> = ({ parentId }) => {
  const categories = useSelector((state: RootState) => state.categories.list);
  const children: Category[] = categories.filter((cat) => cat.parentId === parentId);

  if (!children.length) return null;

  return (
    <ul className="ml-4 list-disc space-y-1">
      {children.map((cat) => (
        <li key={cat.id}>
          <strong>{cat.name}</strong>
          <CategoryTree parentId={cat.id} />
        </li>
      ))}
    </ul>
  );
};
