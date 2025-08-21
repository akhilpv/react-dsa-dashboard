import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import type { Product } from "../../features/products/types/product.types";

// Circular Linked List Node
class Node {
  product: Product;
  next: Node | null;
  prev: Node | null;
  constructor(product: Product) {
    this.product = product;
    this.next = null;
    this.prev = null;
  }
}

const ProductCarousel: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.products);
  const [current, setCurrent] = useState<Node | null>(null);

  // Build circular linked list whenever products change
  useEffect(() => {
    if (products.length === 0) return;

    const nodes: Node[] = products.map((p) => new Node(p));

    // Link them circularly
    nodes.forEach((node, i) => {
      node.next = nodes[(i + 1) % nodes.length];
      node.prev = nodes[(i - 1 + nodes.length) % nodes.length];
    });

    setCurrent(nodes[0]); // start with first product
  }, [products]);

  const goNext = () => {
    if (current?.next) setCurrent(current.next);
  };

  const goPrev = () => {
    if (current?.prev) setCurrent(current.prev);
  };

  if (!current) {
    return <p className="text-center text-gray-500">No products available</p>;
  }

  return (
    <div className="max-w-lg mx-auto p-6 border rounded shadow-md text-center">
      <h2 className="text-2xl font-bold mb-4">🌀 Product Carousel</h2>

      <div className="p-6 border rounded-lg shadow-sm bg-gray-50">
        <h3 className="text-xl font-semibold">{current.product.name}</h3>
        <p className="text-gray-600">SKU: {current.product.sku}</p>
        <p className="text-gray-600">Category: {current.product.category}</p>
        <p className="text-green-600 font-bold">₹{current.product.price}</p>
        <p className="text-sm text-gray-500">
          Status: {current.product.status} | Stock: {current.product.stock}
        </p>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={goPrev}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          ← Previous
        </button>
        <button
          onClick={goNext}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default ProductCarousel;
