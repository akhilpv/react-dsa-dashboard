export class DoubleEndedPQ<T> {
  private items: { value: T; priority: number }[] = [];

  insert(value: T, priority: number) {
    this.items.push({ value, priority });
    this.items.sort((a, b) => a.priority - b.priority);
  }

  getMin() {
    return this.items[0];
  }

  getMax() {
    return this.items[this.items.length - 1];
  }

  removeMin() {
    return this.items.shift();
  }

  removeMax() {
    return this.items.pop();
  }

  getAll() {
    return [...this.items];
  }
}