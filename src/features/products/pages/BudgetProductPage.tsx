import React, { useState } from 'react';
import { useBudgetFilteredProducts } from '../hooks/useBudgetFilteredProducts';
import { ProductCard } from '../../../components/organisms/ProductCard';
export const BudgetProductPage: React.FC = () => {
  const [budget, setBudget] = useState(0);
  const filteredProducts = useBudgetFilteredProducts(budget);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Products Above Your Budget</h1>

      <input
        type="number"
        value={budget}
        onChange={(e) => setBudget(Number(e.target.value))}
        className="border p-2 rounded w-full max-w-sm"
        placeholder="Enter your budget"
      />

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
};
