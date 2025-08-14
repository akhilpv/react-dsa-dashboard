import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import type { Product } from "../../features/products/types/product.types";
import { useNavigate } from "react-router-dom";

// Max Heap implementation for Top Sellers
class MaxHeap {
  private heap: Product[] = [];

  insert(product: Product) {
    this.heap.push(product);
    this.bubbleUp();
  }

  private bubbleUp() {
    let i = this.heap.length - 1;
    while (i > 0) {
      let parent = Math.floor((i - 1) / 2);
      if (this.heap[parent].salesCount >= this.heap[i].salesCount) break;
      [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
      i = parent;
    }
  }

  extractMax(): Product | undefined {
    if (!this.heap.length) return undefined;
    const max = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length && end) {
      this.heap[0] = end;
      this.sinkDown(0);
    }
    return max;
  }

  private sinkDown(i: number) {
    const length = this.heap.length;
    while (true) {
      let left = 2 * i + 1;
      let right = 2 * i + 2;
      let largest = i;

      if (left < length && this.heap[left].salesCount > this.heap[largest].salesCount) {
        largest = left;
      }
      if (right < length && this.heap[right].salesCount > this.heap[largest].salesCount) {
        largest = right;
      }
      if (largest === i) break;

      [this.heap[i], this.heap[largest]] = [this.heap[largest], this.heap[i]];
      i = largest;
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

export const TopSellers: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.products);
  const navigate = useNavigate();

  const topSellers = React.useMemo(() => {
    const heap = new MaxHeap();
    products.forEach((p) => {
      heap.insert(p);
    });

    const result: Product[] = [];
    for (let i = 0; i < 5 && !heap.isEmpty(); i++) {
      const item = heap.extractMax();
      if (item) result.push(item);
    }
    return result;
  }, [products]);

  if (!topSellers.length) {
    return null;
  }

  return (
    <div className="border p-4 rounded bg-blue-50">
      <h2 className="font-bold text-blue-700 mb-2">Top Selling Products</h2>
      <ul className="space-y-1">
        {topSellers.map((p) => (
          <li
            key={p.id}
            className="flex justify-between cursor-pointer hover:bg-blue-100 p-1 rounded"
            onClick={() => navigate(`/products/${p.id}`)}
          >
            <span>{p.name}</span>
            <span className="text-blue-600 font-bold">{p.salesCount} sold</span>
          </li>
        ))}
      </ul>
    </div>
  );
};