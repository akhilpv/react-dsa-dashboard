import React, { useMemo, useState } from "react";
import { BinaryIndexedTree } from "../../utils/binaryIndexedTree";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../app/store";
import { updateStock } from "../../features/products/slices/productSlice";

export const ProductStockRange: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.products);
  const dispatch = useDispatch();

  const stockArr = products.map((p) => p.stock);
  const bit = useMemo(() => new BinaryIndexedTree(stockArr), [stockArr]);

  const [range, setRange] = useState({ start: 0, end: stockArr.length - 1 });
  const [updateData, setUpdateData] = useState({ index: 0, change: 0 });

  const handleUpdateStock = () => {
    dispatch(updateStock({ index: updateData.index, change: updateData.change }));
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-bold mb-4">Product Stock Range Query</h2>

      {/* Range Query */}
      <div className="flex gap-2 mb-4">
        <input
          type="number"
          value={range.start}
          min="0"
          max={stockArr.length - 1}
          onChange={(e) => setRange({ ...range, start: Number(e.target.value) })}
          className="border px-2 py-1"
        />
        <input
          type="number"
          value={range.end}
          min="0"
          max={stockArr.length - 1}
          onChange={(e) => setRange({ ...range, end: Number(e.target.value) })}
          className="border px-2 py-1"
        />
        <span className="font-semibold">
          Total Stock: {bit.rangeSum(range.start, range.end)}
        </span>
      </div>

      {/* Update Stock */}
      <div className="flex gap-2">
        <input
          type="number"
          placeholder="Product Index"
          value={updateData.index}
          min="0"
          max={stockArr.length - 1}
          onChange={(e) =>
            setUpdateData({ ...updateData, index: Number(e.target.value) })
          }
          className="border px-2 py-1"
        />
        <input
          type="number"
          placeholder="Change in Stock"
          value={updateData.change}
          onChange={(e) =>
            setUpdateData({ ...updateData, change: Number(e.target.value) })
          }
          className="border px-2 py-1"
        />
        <button
          onClick={handleUpdateStock}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Update Stock
        </button>
      </div>
    </div>
  );
};