export const getMinPriceIndicesPerBatch = (
  prices: number[],
  k: number
): number[] => {
  const result: number[] = [];
  const deque: number[] = [];

  for (let i = 0; i < prices.length; i++) {
    if (deque.length && deque[0] <= i - k) deque.shift();

    while (deque.length && prices[i] <= prices[deque[deque.length - 1]]) {
      deque.pop();
    }

    deque.push(i);

    if (i >= k - 1) {
      result.push(deque[0]);
    }
  }

  return result;
};