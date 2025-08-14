export type Product = {
  id: number;
  name: string;
  expiryDate: string; // e.g. "2025-08-15"
};

export class ExpiryMinHeap {
  private heap: Product[] = [];

  private getTime(p: Product) {
    return new Date(p.expiryDate).getTime();
  }

  insert(product: Product) {
    this.heap.push(product);
    this.bubbleUp();
  }

  private bubbleUp() {
    let i = this.heap.length - 1;
    while (i > 0) {
      let parent = Math.floor((i - 1) / 2);
      if (this.getTime(this.heap[parent]) <= this.getTime(this.heap[i])) break;
      [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
      i = parent;
    }
  }

  extractMin(): Product | undefined {
    if (this.heap.length === 0) return undefined;
    const min = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length > 0 && end) {
      this.heap[0] = end;
      this.sinkDown(0);
    }
    return min;
  }

  private sinkDown(i: number) {
    const length = this.heap.length;
    while (true) {
      let left = 2 * i + 1;
      let right = 2 * i + 2;
      let smallest = i;

      if (left < length && this.getTime(this.heap[left]) < this.getTime(this.heap[smallest])) {
        smallest = left;
      }
      if (right < length && this.getTime(this.heap[right]) < this.getTime(this.heap[smallest])) {
        smallest = right;
      }
      if (smallest === i) break;
      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
      i = smallest;
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}