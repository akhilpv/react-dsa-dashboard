export const bfsTraverse = (
  startId: number,
  graph: Record<number, number[]>,
  maxDepth = 1
): number[] => {
  const visited = new Set<number>();
  const queue: [number, number][] = [[startId, 0]];
  const result: number[] = [];

  while (queue.length) {
    const [current, depth] = queue.shift()!;
    if (depth > maxDepth || visited.has(current)) continue;

    visited.add(current);
    if (current !== startId) result.push(current);

    for (const neighbor of graph[current] || []) {
      queue.push([neighbor, depth + 1]);
    }
  }

  return result;
};