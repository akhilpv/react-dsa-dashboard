import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { DoubleEndedPQ } from "../../utils/doubleEndedPQ";
const DiscountHighlights: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.products);

  const { lowestDiscountProduct, highestDiscountProduct } = useMemo(() => {
    const pq = new DoubleEndedPQ<any>();
    products.forEach((p) => {
      pq.insert(p, p.discount);
    });
    return {
      lowestDiscountProduct: pq.getMin()?.value,
      highestDiscountProduct: pq.getMax()?.value,
    };
  }, [products]);

  return (
    <div className="p-4 space-y-3 bg-white shadow rounded-2xl">
      <h2 className="text-lg font-semibold">Discount Highlights</h2>
      
      {highestDiscountProduct && (
        <div className="p-2 border rounded bg-green-100">
          <strong>Highest Discount:</strong> {highestDiscountProduct.name} (
          {highestDiscountProduct.discount}% off)
        </div>
      )}

      {lowestDiscountProduct && (
        <div className="p-2 border rounded bg-red-100">
          <strong>Lowest Discount:</strong> {lowestDiscountProduct.name} (
          {lowestDiscountProduct.discount}% off)
        </div>
      )}
    </div>
  );
};

export default DiscountHighlights;