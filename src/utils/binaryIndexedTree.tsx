export class BinaryIndexedTree {
  private bit: number[];
  private n: number;

  constructor(arr: number[]) {
    this.n = arr.length;
    this.bit = new Array(this.n + 1).fill(0);
    arr.forEach((val, i) => this.update(i, val));
  }

  update(index: number, delta: number) {
    for (let i = index + 1; i <= this.n; i += i & -i) {
      this.bit[i] += delta;
    }
  }

  prefixSum(index: number) {
    let sum = 0;
    for (let i = index + 1; i > 0; i -= i & -i) {
      sum += this.bit[i];
    }
    return sum;
  }

  rangeSum(l: number, r: number) {
    return this.prefixSum(r) - (l > 0 ? this.prefixSum(l - 1) : 0);
  }
}
