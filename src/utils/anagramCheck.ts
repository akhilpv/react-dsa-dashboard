export const isAnagram = (str1: string, str2: string) => {
  if (str1.length !== str2.length) return false;
  const count: Record<string, number> = {};
  for (let ch of str1) {
    count[ch] = (count[ch] || 0) + 1;
  }
  for (let ch of str2) {
    if (!count[ch]) return false;
    count[ch]--;
  }
  return true;
};