export const getNextGreaterPrices = (prices: number[]): number[] => {
    const stack: number[] = [];
    const result = Array(prices.length).fill(-1);

    for (let i = prices.length - 1; i >= 0; i--) {
        while (stack.length && stack[stack.length - 1] <= prices[i]) {
            stack.pop();
        }
        if (stack.length) result[i] = stack[stack.length - 1];
        stack.push(prices[i]);
    }

    return result;
};