type Node<T> = {
  id: number;
  type: "category" | "product";
  data: T;
  dependsOn?: number;
};

export function topologicalSort<T>(nodes: Node<T>[]): Node<T>[] {
  const indegree = new Map<number, number>();
  const graph = new Map<number, Node<T>[]>();

  // Initialize
  nodes.forEach((node) => {
    indegree.set(node.id, 0);
    graph.set(node.id, []);
  });

  // Build graph
  nodes.forEach((node) => {
    if (node.dependsOn) {
      indegree.set(node.id, (indegree.get(node.id) || 0) + 1);
      graph.get(node.dependsOn)?.push(node);
    }
  });

  // Queue with nodes having indegree = 0
  const queue: Node<T>[] = [];
  indegree.forEach((deg, id) => {
    if (deg === 0) {
      const node = nodes.find((n) => n.id === id);
      if (node) queue.push(node);
    }
  });

  const result: Node<T>[] = [];

  while (queue.length > 0) {
    const current = queue.shift()!;
    result.push(current);

    graph.get(current.id)?.forEach((neighbor) => {
      indegree.set(neighbor.id, (indegree.get(neighbor.id) || 1) - 1);
      if (indegree.get(neighbor.id) === 0) {
        queue.push(neighbor);
      }
    });
  }

  return result;
}