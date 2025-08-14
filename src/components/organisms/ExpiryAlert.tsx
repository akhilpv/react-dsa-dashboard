import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { ExpiryMinHeap } from "../../utils/expiryMinHeap";
import type { Product } from "../../utils/expiryMinHeap";
import { useNavigate } from "react-router-dom";

export const ExpiryAlert: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.products);
  const navigate = useNavigate();

  const soonToExpire = React.useMemo(() => {
    const heap = new ExpiryMinHeap();
    const today = new Date().getTime();

    products.forEach((p: Product) => {
      const expiryTime = new Date(p.expiryDate).getTime();
      if (expiryTime >= today) {
        heap.insert(p); 
      }
    });

    const urgentList: Product[] = [];
    for (let i = 0; i < 5 && !heap.isEmpty(); i++) {
      const item = heap.extractMin();
      if (item) urgentList.push(item);
    }
    return urgentList;
  }, [products]);

  return (
    <div className="border p-4 rounded bg-yellow-50">
      <h2 className="font-bold text-yellow-700 mb-2">Soon-to-Expire Products</h2>
      {soonToExpire.length === 0 ? (
        <p>No upcoming expiries 🎉</p>
      ) : (
        <ul className="space-y-1">
          {soonToExpire.map((p) => (
            <li
              key={p.id}
              className="flex justify-between cursor-pointer hover:bg-yellow-100 p-1 rounded"
              onClick={() => navigate(`/products/${p.id}`)}
            >
              <span>{p.name}</span>
              <span className="text-yellow-600 font-bold">
                {new Date(p.expiryDate).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};