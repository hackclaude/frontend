const SEARCH_HISTORY_KEY = 'searchHistory';
const MAX_HISTORY_ITEMS = 10;

export function getSearchHistory(): string[] {
  try {
    const history = localStorage.getItem(SEARCH_HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch {
    return [];
  }
}

export function addSearchHistory(query: string): void {
  if (!query.trim()) return;

  const history = getSearchHistory();
  const trimmedQuery = query.trim();

  // Remove duplicate if exists
  const filteredHistory = history.filter((item) => item !== trimmedQuery);

  // Add to the beginning
  const newHistory = [trimmedQuery, ...filteredHistory].slice(0, MAX_HISTORY_ITEMS);

  try {
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
  } catch (error) {
    console.error('Failed to save search history:', error);
  }
}

export function removeSearchHistory(query: string): void {
  const history = getSearchHistory();
  const newHistory = history.filter((item) => item !== query);

  try {
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
  } catch (error) {
    console.error('Failed to remove search history:', error);
  }
}

export function clearSearchHistory(): void {
  try {
    localStorage.removeItem(SEARCH_HISTORY_KEY);
  } catch (error) {
    console.error('Failed to clear search history:', error);
  }
}
