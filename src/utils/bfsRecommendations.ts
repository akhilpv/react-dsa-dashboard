export type Graph = Record<string, string[]>; // productId -> related productIds

export const bfsRecommendations = (
  graph: Graph,
  startId: string,
  depth: number
): string[] => {
  const queue: [string, number][] = [[startId, 0]];
  const visited = new Set([startId]);
  const recommendations: string[] = [];

  while (queue.length) {
    const [current, level] = queue.shift()!;
    if (level >= depth) continue;

    for (const neighbor of graph[current] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        recommendations.push(neighbor);
        queue.push([neighbor, level + 1]);
      }
    }
  }

  return recommendations;
};