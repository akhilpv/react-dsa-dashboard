export function updateSearchFrequency(category: string) {
  const freqMap = JSON.parse(localStorage.getItem('categoryFreq') || '{}');
  freqMap[category] = (freqMap[category] || 0) + 1;
  localStorage.setItem('categoryFreq', JSON.stringify(freqMap));
}

export function getSortedCategoriesByFrequency(categories: string[]) {
  const freqMap = JSON.parse(localStorage.getItem('categoryFreq') || '{}');
  return [...categories].sort(
    (a, b) => (freqMap[b] || 0) - (freqMap[a] || 0)
  );
}