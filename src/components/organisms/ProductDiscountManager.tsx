import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { addDiscountToProduct } from "../../features/products/slices/productSlice";
import { addProductDiscount } from "../../features/discounts/slices/discountSlice";
export default function ProductDiscountManager() {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);

  const handleApplyDiscount = (productId: string, discount: number) => {
    dispatch(addDiscountToProduct({ productId, discount }));
    dispatch(addProductDiscount({ 
      productId, 
      label: `${discount}% OFF`, 
      discount 
    }));
  };

  return (
    <div className="p-4 bg-white shadow rounded-2xl">
      <h2 className="text-lg font-bold mb-3">Apply Discounts</h2>
      {products.map(p => (
        <div key={p.id} className="flex justify-between items-center mb-2">
          <span>{p.name} — ₹{p.price}</span>
          <button
            onClick={() => handleApplyDiscount(p.id, Math.floor(Math.random() * 50) + 1)}
            className="px-3 py-1 bg-indigo-500 text-white rounded"
          >
            Apply Random Discount
          </button>
        </div>
      ))}
    </div>
  );
}