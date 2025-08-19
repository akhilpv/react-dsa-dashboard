import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { addProductDiscount } from "../../features/discounts/slices/discountSlice";

export default function DiscountManager() {
  const dispatch = useDispatch();
  const discounts = useSelector((state: RootState) => state.discounts.list);

  const handleAddDiscount = (productId: string, label: string, discount: number) => {
    dispatch(addProductDiscount({ productId, label, discount }));
  };

  return (
    <div className="p-4 bg-white shadow rounded-2xl">
      <h2 className="text-xl font-bold mb-3">Discount Manager</h2>

      <div className="flex gap-2 mb-3">
        <button
          onClick={() => handleAddDiscount("p1", "50% OFF", 50)}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Add Big Discount (p1)
        </button>
        <button
          onClick={() => handleAddDiscount("p2", "5% OFF", 5)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Small Discount (p2)
        </button>
      </div>

      <ul className="list-disc ml-5">
        {discounts.map((d, idx) => (
          <li key={idx}>
            {d.label} ({d.priority}%) → Product: {d.productId}
          </li>
        ))}
      </ul>
    </div>
  );
}