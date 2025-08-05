const RECENTLY_VIEWED_KEY = 'recentProducts';
const MAX_RECENTS = 5;

export function updateRecentlyViewed(productId: string): string[] {
  const stored = JSON.parse(localStorage.getItem(RECENTLY_VIEWED_KEY) || '[]');

  const filtered = stored.filter((id: string) => id !== productId);
  const updated = [productId, ...filtered].slice(0, MAX_RECENTS);

  localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updated));
  return updated;
}

export function getRecentlyViewed(): string[] {
  return JSON.parse(localStorage.getItem(RECENTLY_VIEWED_KEY) || '[]');
}