import type { Product } from "../../src/features/products/types/product.types";
export class MaxHeap {
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
