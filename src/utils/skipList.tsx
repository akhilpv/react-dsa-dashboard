// utils/skipList.ts
class SkipNode<T> {
  value: T;
  forward: SkipNode<T>[];

  constructor(value: T, level: number) {
    this.value = value;
    this.forward = new Array(level + 1).fill(null);
  }
}

export class SkipList<T> {
  private MAX_LEVEL = 4; // adjustable
  private P = 0.5;       // probability factor
  private level = 0;
  private header: SkipNode<T>;

  constructor(private compareFn: (a: T, b: T) => number) {
    this.header = new SkipNode<T>(null as unknown as T, this.MAX_LEVEL);
  }

  private randomLevel(): number {
    let lvl = 0;
    while (Math.random() < this.P && lvl < this.MAX_LEVEL) {
      lvl++;
    }
    return lvl;
  }

  insert(value: T) {
    const update = new Array(this.MAX_LEVEL + 1).fill(null);
    let current = this.header;

    for (let i = this.level; i >= 0; i--) {
      while (
        current.forward[i] &&
        this.compareFn(current.forward[i].value, value) < 0
      ) {
        current = current.forward[i];
      }
      update[i] = current;
    }

    const lvl = this.randomLevel();
    if (lvl > this.level) {
      for (let i = this.level + 1; i <= lvl; i++) {
        update[i] = this.header;
      }
      this.level = lvl;
    }

    const newNode = new SkipNode(value, lvl);
    for (let i = 0; i <= lvl; i++) {
      newNode.forward[i] = update[i].forward[i];
      update[i].forward[i] = newNode;
    }
  }

  search(value: T): T | null {
    let current = this.header;

    for (let i = this.level; i >= 0; i--) {
      while (
        current.forward[i] &&
        this.compareFn(current.forward[i].value, value) < 0
      ) {
        current = current.forward[i];
      }
    }

    current = current.forward[0];
    if (current && this.compareFn(current.value, value) === 0) {
      return current.value;
    }
    return null;
  }

  getAll(): T[] {
    let result: T[] = [];
    let node = this.header.forward[0];
    while (node) {
      result.push(node.value);
      node = node.forward[0];
    }
    return result;
  }
}
