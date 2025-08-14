export type Product = {
  id: number;
  name: string;
  quantity: number;
};

export class MinHeap {
  private heap: Product[] = [];

  insert(product: Product) {
    this.heap.push(product);
    this.bubbleUp();
  }

  private bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex].quantity <= this.heap[index].quantity) break;
      [this.heap[parentIndex], this.heap[index]] =
        [this.heap[index], this.heap[parentIndex]];
      index = parentIndex;
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

  private sinkDown(index: number) {
    const length = this.heap.length;
    while (true) {
      let left = 2 * index + 1;
      let right = 2 * index + 2;
      let smallest = index;

      if (left < length && this.heap[left].quantity < this.heap[smallest].quantity) {
        smallest = left;
      }
      if (right < length && this.heap[right].quantity < this.heap[smallest].quantity) {
        smallest = right;
      }
      if (smallest === index) break;
      [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
      index = smallest;
    }
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}