export class Graph {
  private adjList: Map<number, number[]>;

  constructor() {
    this.adjList = new Map();
  }

  addNode(node: number) {
    if (!this.adjList.has(node)) {
      this.adjList.set(node, []);
    }
  }

  addEdge(from: number, to: number) {
    if (!this.adjList.has(from)) this.addNode(from);
    if (!this.adjList.has(to)) this.addNode(to);
    this.adjList.get(from)!.push(to);
  }

  getNeighbors(node: number): number[] {
    return this.adjList.get(node) || [];
  }

  dfs(start: number, visited: Set<number> = new Set()): number[] {
    const result: number[] = [];

    const traverse = (node: number) => {
      if (visited.has(node)) return;
      visited.add(node);
      result.push(node);

      const neighbors = this.getNeighbors(node);
      neighbors.forEach((n) => traverse(n));
    };

    traverse(start);
    return result;
  }
}
