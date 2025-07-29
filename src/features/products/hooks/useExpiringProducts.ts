import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { lowerBoundByExpiry } from '../../../utils/expirySearch';
import type { Product } from '../types/product.types';
import type { RootState } from '../../../app/store';

/**
 * React hook to get all products whose expiryDate ≥ given date.
 * Assumes products are pre-sorted by expiryDate ascending.
 */
export const useExpiringProducts = (date: Date): Product[] => {
  const products = useSelector((state: RootState) => state.products.products);

  return useMemo(() => {
    const index = lowerBoundByExpiry(products, date);
    return products.slice(index);
  }, [products, date]);
};