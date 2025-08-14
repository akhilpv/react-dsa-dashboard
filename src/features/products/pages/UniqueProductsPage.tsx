import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";

export const UniqueProductsPage: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.products);

  const uniqueProducts = useMemo(() => {
    const seen = new Set<string>(); 
    return products.filter((p) => {
      if (seen.has(p.id)) return false;
      seen.add(p.id);
      return true;
    });
  }, [products]);

  return (
    <div className="p-4">
      <h2 className="font-bold mb-3">Unique Products</h2>
      <ul>
        {uniqueProducts.map((p) => (
          <li key={p.id}>
            {p.name} — ₹{p.price}
          </li>
        ))}
      </ul>
    </div>
  );
};