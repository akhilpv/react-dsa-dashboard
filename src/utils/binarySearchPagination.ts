export function binarySearchIndex<T>(
  data: T[],
  predicate: (item: T) => boolean
): number {
  let low = 0;
  let high = data.length - 1;
  let result = -1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (predicate(data[mid])) {
      result = mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return result;
}