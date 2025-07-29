import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getProductsAboveBudget } from '../../../utils/budgetFilter';
import type { RootState } from '../../../app/store';

export function useBudgetFilteredProducts(budget: number) {
  const products = useSelector((state: RootState) => state.products.products);

  const filtered = useMemo(() => {
    return getProductsAboveBudget(products, budget);
  }, [products, budget]);

  return filtered;
}
