import React from 'react';
import type { Product } from '../../features/products/types/product.types';

interface Props {
  related: Product[];
}

export const RelatedProducts: React.FC<Props> = ({ related }) => {
  if (!related.length) return null;

  return (
    <p className="text-sm text-blue-700 mt-1">
      🔗 <strong>Related:</strong>{' '}
      {related.map((p, i) => (
        <span key={p.id}>
          {p.name}
          {i < related.length - 1 && ', '}
        </span>
      ))}
    </p>
  );
}