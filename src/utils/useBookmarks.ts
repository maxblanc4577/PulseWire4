import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'pulsewire_saved_articles';
const RECENTLY_VIEWED_KEY = 'pulsewire_recently_viewed_articles';
const MAX_RECENT_ARTICLES = 5;

export function useBookmarks() {
  // 1. Saved / Bookmarked Article IDs
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Failed to load saved articles from localStorage', e);
    }
    return [];
  });

  // 2. Recently Viewed / Read Article IDs (Tracks last 5 articles opened)
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(RECENTLY_VIEWED_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed.slice(0, MAX_RECENT_ARTICLES);
      }
    } catch (e) {
      console.error('Failed to load recently viewed articles from localStorage', e);
    }
    return [];
  });

  // Listen for storage changes in other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) setSavedIds(parsed);
        } catch (err) {
          // ignore
        }
      }
      if (e.key === RECENTLY_VIEWED_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) setRecentlyViewedIds(parsed.slice(0, MAX_RECENT_ARTICLES));
        } catch (err) {
          // ignore
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const saveToStorage = useCallback((ids: string[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch (e) {
      console.error('Failed to save articles to localStorage', e);
    }
  }, []);

  const saveRecentlyViewedToStorage = useCallback((ids: string[]) => {
    try {
      localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(ids));
    } catch (e) {
      console.error('Failed to save recently viewed articles to localStorage', e);
    }
  }, []);

  const toggleBookmark = useCallback((articleId: string) => {
    setSavedIds((prev) => {
      const exists = prev.includes(articleId);
      const next = exists ? prev.filter((id) => id !== articleId) : [articleId, ...prev];
      saveToStorage(next);
      return next;
    });
  }, [saveToStorage]);

  const isBookmarked = useCallback((articleId: string) => {
    return savedIds.includes(articleId);
  }, [savedIds]);

  const clearAllBookmarks = useCallback(() => {
    setSavedIds([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Failed to clear bookmarks', e);
    }
  }, []);

  // Track an article when opened by user - keeps latest 5 articles in chronological order (newest first)
  const trackRecentlyViewed = useCallback((articleId: string) => {
    if (!articleId) return;
    setRecentlyViewedIds((prev) => {
      // Remove if already in list, then prepend to start
      const filtered = prev.filter((id) => id !== articleId);
      const next = [articleId, ...filtered].slice(0, MAX_RECENT_ARTICLES);
      saveRecentlyViewedToStorage(next);
      return next;
    });
  }, [saveRecentlyViewedToStorage]);

  const removeRecentlyViewed = useCallback((articleId: string) => {
    setRecentlyViewedIds((prev) => {
      const next = prev.filter((id) => id !== articleId);
      saveRecentlyViewedToStorage(next);
      return next;
    });
  }, [saveRecentlyViewedToStorage]);

  const clearRecentlyViewed = useCallback(() => {
    setRecentlyViewedIds([]);
    try {
      localStorage.removeItem(RECENTLY_VIEWED_KEY);
    } catch (e) {
      console.error('Failed to clear recently viewed articles', e);
    }
  }, []);

  return {
    savedIds,
    savedCount: savedIds.length,
    toggleBookmark,
    isBookmarked,
    clearAllBookmarks,
    recentlyViewedIds,
    recentlyViewedCount: recentlyViewedIds.length,
    trackRecentlyViewed,
    removeRecentlyViewed,
    clearRecentlyViewed
  };
}
