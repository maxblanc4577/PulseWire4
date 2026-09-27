import { useState, useEffect, useCallback } from 'react';
import { 
  Article, 
  ARTICLES, 
  LiveVitalityMetric, 
  VITALITY_METRICS 
} from '../data/pulsewireData';
import { upgradeArticleImages } from './imageOptimizer';

const ARTICLES_STORAGE_KEY = 'pulsewire_custom_articles_worldwide_v6';
const METRICS_STORAGE_KEY = 'pulsewire_vitality_metrics_worldwide_v6';

export function useArticlesManager() {
  // Articles state with automatic high-res picture resolution assurance
  const [articles, setArticles] = useState<Article[]>(() => {
    if (typeof window === 'undefined') return ARTICLES.map(upgradeArticleImages);
    try {
      // Clear legacy regional-only storage keys
      localStorage.removeItem('pulsewire_custom_articles_caribbean_v5');
      localStorage.removeItem('pulsewire_vitality_metrics_caribbean_v5');
      localStorage.removeItem('pulsewire_custom_articles_v4');

      const stored = localStorage.getItem(ARTICLES_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(upgradeArticleImages);
        }
      }
    } catch (e) {
      console.error('Failed to load articles from localStorage', e);
    }
    return ARTICLES.map(upgradeArticleImages);
  });

  // Vitality metrics state
  const [vitalityMetrics, setVitalityMetrics] = useState<LiveVitalityMetric[]>(() => {
    if (typeof window === 'undefined') return VITALITY_METRICS;
    try {
      const stored = localStorage.getItem(METRICS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load vitality metrics from localStorage', e);
    }
    return VITALITY_METRICS;
  });

  // Listen for storage events in other tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === ARTICLES_STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) {
            setArticles(parsed.length > 0 ? parsed.map(upgradeArticleImages) : ARTICLES.map(upgradeArticleImages));
          }
        } catch (err) {
          // ignore
        }
      }
      if (e.key === METRICS_STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) setVitalityMetrics(parsed);
        } catch (err) {
          // ignore
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const saveArticles = useCallback((newArticles: Article[]) => {
    const upgraded = newArticles.map(upgradeArticleImages);
    setArticles(upgraded);
    try {
      localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(upgraded));
    } catch (e) {
      console.error('Failed to save articles to localStorage', e);
    }
  }, []);

  const saveVitalityMetrics = useCallback((newMetrics: LiveVitalityMetric[]) => {
    setVitalityMetrics(newMetrics);
    try {
      localStorage.setItem(METRICS_STORAGE_KEY, JSON.stringify(newMetrics));
    } catch (e) {
      console.error('Failed to save vitality metrics to localStorage', e);
    }
  }, []);

  // Create article
  const createArticle = useCallback((newArticleData: Omit<Article, 'id'> & { id?: string }) => {
    const id = newArticleData.id || `custom-${Date.now()}`;
    const newArticle: Article = upgradeArticleImages({
      ...newArticleData,
      id,
      publishedAt: newArticleData.publishedAt || new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }),
      readTime: newArticleData.readTime || '6 min read'
    });

    setArticles((prev) => {
      const updated = [newArticle, ...prev];
      try {
        localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    return newArticle;
  }, []);

  // Update article
  const updateArticle = useCallback((id: string, updatedFields: Partial<Article>) => {
    setArticles((prev) => {
      const updated = prev.map((art) => {
        if (art.id === id) {
          return upgradeArticleImages({ ...art, ...updatedFields });
        }
        return art;
      });
      try {
        localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  }, []);

  // Delete article
  const deleteArticle = useCallback((id: string) => {
    setArticles((prev) => {
      const updated = prev.filter((art) => art.id !== id);
      try {
        localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  }, []);

  // Toggle breaking flag
  const toggleBreaking = useCallback((id: string) => {
    setArticles((prev) => {
      const updated = prev.map((art) => {
        if (art.id === id) {
          return { ...art, breaking: !art.breaking };
        }
        return art;
      });
      try {
        localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  }, []);

  // Set as featured lead story
  const setFeaturedLead = useCallback((id: string) => {
    setArticles((prev) => {
      const updated = prev.map((art) => ({
        ...art,
        featured: art.id === id
      }));
      try {
        localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  }, []);

  // Update individual vitality metric
  const updateVitalityMetric = useCallback((index: number, metric: LiveVitalityMetric) => {
    setVitalityMetrics((prev) => {
      const updated = [...prev];
      updated[index] = metric;
      try {
        localStorage.setItem(METRICS_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  }, []);

  // Reset to default dataset
  const resetToDefaults = useCallback(() => {
    const upgradedArticles = ARTICLES.map(upgradeArticleImages);
    setArticles(upgradedArticles);
    setVitalityMetrics(VITALITY_METRICS);
    try {
      localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(upgradedArticles));
      localStorage.setItem(METRICS_STORAGE_KEY, JSON.stringify(VITALITY_METRICS));
    } catch (e) {}
  }, []);

  return {
    articles,
    vitalityMetrics,
    createArticle,
    updateArticle,
    deleteArticle,
    toggleBreaking,
    setFeaturedLead,
    updateVitalityMetric,
    resetToDefaults,
    saveArticles,
    saveVitalityMetrics
  };
}
