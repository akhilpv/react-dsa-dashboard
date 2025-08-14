import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { MinHeap } from "../../utils/minHeap";
import type { Product } from "../../utils/minHeap";
export const LowStockAlert: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.products);

  const topUrgent = React.useMemo(() => {
    const heap = new MinHeap();
    products.forEach((p: Product) => heap.insert(p));
    const urgentList: Product[] = [];
    for (let i = 0; i < 5 && !heap.isEmpty(); i++) {
      const item = heap.extractMin();
      if (item) urgentList.push(item);
    }
    return urgentList;
  }, [products]);

  return (
    <div className="border p-4 rounded bg-red-50">
      <h2 className="font-bold text-red-700 mb-2">Low Stock Alerts</h2>
      {topUrgent.length === 0 ? (
        <p>No low-stock products 🎉</p>
      ) : (
        <ul className="space-y-1">
          {topUrgent.map((p) => (
            <li key={p.id} className="flex justify-between">
              <span>{p.name}</span>
              <span className="text-red-600 font-bold">{p.quantity}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};