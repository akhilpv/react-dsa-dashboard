export class SegmentTree {
  tree: number[];
  arr: number[];
  n: number;

  constructor(arr: number[]) {
    this.arr = arr;
    this.n = arr.length;
    this.tree = new Array(4 * this.n).fill(0);
    if (this.n > 0) {
      this.build(1, 0, this.n - 1);
    }
  }

  build(node: number, start: number, end: number) {
    if (start === end) {
      this.tree[node] = this.arr[start];
    } else {
      const mid = Math.floor((start + end) / 2);
      this.build(node * 2, start, mid);
      this.build(node * 2 + 1, mid + 1, end);
      this.tree[node] = this.tree[node * 2] + this.tree[node * 2 + 1];
    }
  }

  query(node: number, start: number, end: number, l: number, r: number): number {
    if (r < start || end < l) return 0; // No overlap
    if (l <= start && end <= r) return this.tree[node]; // Complete overlap
    const mid = Math.floor((start + end) / 2);
    const leftSum = this.query(node * 2, start, mid, l, r);
    const rightSum = this.query(node * 2 + 1, mid + 1, end, l, r);
    return leftSum + rightSum;
  }
}

