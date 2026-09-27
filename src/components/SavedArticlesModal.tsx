import React, { useState } from 'react';
import { 
  X, 
  Bookmark, 
  Clock, 
  Trash2, 
  ArrowRight, 
  BookOpen, 
  History, 
  Eye, 
  BookmarkCheck, 
  Sparkles,
  MapPin
} from 'lucide-react';
import { Article, ARTICLES } from '../data/pulsewireData';
import { getHighResImageUrl } from '../utils/imageOptimizer';
import { getEstimatedReadingTime } from '../utils/readingTime';
import { useI18n } from '../utils/i18n';

interface SavedArticlesModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedIds: string[];
  recentlyViewedIds?: string[];
  onToggleBookmark: (articleId: string) => void;
  onClearAll: () => void;
  onClearRecentlyViewed?: () => void;
  onRemoveRecentlyViewed?: (articleId: string) => void;
  onSelectArticle: (article: Article) => void;
  articles?: Article[];
}

export const SavedArticlesModal: React.FC<SavedArticlesModalProps> = ({
  isOpen,
  onClose,
  savedIds,
  recentlyViewedIds = [],
  onToggleBookmark,
  onClearAll,
  onClearRecentlyViewed,
  onRemoveRecentlyViewed,
  onSelectArticle,
  articles = ARTICLES
}) => {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<'saved' | 'recent'>('saved');

  if (!isOpen) return null;

  // Bookmarked articles
  const savedArticles = articles.filter((article) => savedIds.includes(article.id));

  // Recently viewed articles preserving exact chronology (last 5 viewed, most recent first)
  const recentArticles = recentlyViewedIds
    .map((id) => articles.find((a) => a.id === id))
    .filter((a): a is Article => Boolean(a))
    .slice(0, 5);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/80 backdrop-blur-sm flex justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div 
        className="bg-white text-neutral-900 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-auto border border-neutral-200 flex flex-col relative max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-neutral-200 bg-neutral-50/80 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 text-cyan-400 flex items-center justify-center shadow-xs shrink-0">
              {activeTab === 'saved' ? (
                <Bookmark className="w-5 h-5 fill-current" />
              ) : (
                <History className="w-5 h-5" />
              )}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-bold text-neutral-950">
                  {activeTab === 'saved' ? t('saved.title') : t('saved.recentTitle')}
                </h3>
                <span className="text-xs font-mono-data font-bold px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-800">
                  {activeTab === 'saved' ? savedArticles.length : `${recentArticles.length}/5`}
                </span>
              </div>
              <p className="text-xs text-neutral-500 font-mono-data">
                {activeTab === 'saved'
                  ? "Stored in your browser's persistent storage"
                  : 'Tracks the last 5 articles opened — persists across refreshes'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {activeTab === 'saved' && savedArticles.length > 0 && (
              <button
                onClick={onClearAll}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-1"
                title="Clear all saved articles"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t('saved.clearAll')}</span>
              </button>
            )}

            {activeTab === 'recent' && recentArticles.length > 0 && onClearRecentlyViewed && (
              <button
                onClick={onClearRecentlyViewed}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-1"
                title="Clear recently viewed history"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t('saved.clearHistory')}</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dual Tab Switcher: Bookmarks vs Recently Read */}
        <div className="px-5 sm:px-6 pt-3 pb-2 bg-neutral-100/60 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('saved')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'saved'
                  ? 'bg-neutral-950 text-white shadow-xs'
                  : 'bg-white text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50 border border-neutral-200'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
              <span>{t('saved.title')}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono-data ${
                activeTab === 'saved' ? 'bg-cyan-900 text-cyan-200' : 'bg-neutral-200 text-neutral-700'
              }`}>
                {savedArticles.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('recent')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'recent'
                  ? 'bg-neutral-950 text-white shadow-xs'
                  : 'bg-white text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50 border border-neutral-200'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>{t('saved.recentTitle')}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono-data ${
                activeTab === 'recent' ? 'bg-cyan-900 text-cyan-200' : 'bg-neutral-200 text-neutral-700'
              }`}>
                {recentArticles.length}
              </span>
            </button>
          </div>

          <span className="text-[11px] font-mono-data text-neutral-500 hidden sm:inline">
            {activeTab === 'saved' ? 'Persistent Bookmarks' : 'Last 5 Opened Dispatches'}
          </span>
        </div>

        {/* Content Area */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
          
          {/* TAB 1: SAVED ARTICLES */}
          {activeTab === 'saved' && (
            <>
              {savedArticles.length === 0 ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto">
                    <Bookmark className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-neutral-950">
                      {t('saved.emptySaved')}
                    </h4>
                    <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                      Click the bookmark icon on any field investigation or dispatch to save it here for offline reading or future reference.
                    </p>
                  </div>
                  
                  {recentArticles.length > 0 && (
                    <div className="pt-2">
                      <button
                        onClick={() => setActiveTab('recent')}
                        className="px-4 py-2 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-900 text-xs font-bold hover:bg-cyan-100 transition-colors inline-flex items-center space-x-1.5"
                      >
                        <History className="w-4 h-4 text-cyan-600" />
                        <span>View {recentArticles.length} Recently Viewed Dispatches</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  {savedArticles.map((article) => {
                    const estTime = getEstimatedReadingTime(article);
                    return (
                      <div
                        key={article.id}
                        className="p-4 rounded-xl border border-neutral-200 hover:border-cyan-500 bg-white hover:bg-neutral-50/50 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                      >
                        <div 
                          onClick={() => {
                            onSelectArticle(article);
                            onClose();
                          }}
                          className="flex items-start space-x-3.5 cursor-pointer flex-1"
                        >
                          <img
                            src={getHighResImageUrl(article.imageUrl, 800, 88)}
                            alt={article.title}
                            className="w-16 h-16 rounded-lg object-cover shrink-0 border border-neutral-200 group-hover:scale-103 transition-transform"
                            loading="lazy"
                            decoding="async"
                          />
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono-data text-neutral-500">
                              <span className="font-bold text-cyan-700 uppercase">{article.category}</span>
                              <span>•</span>
                              <span>{article.region}</span>
                              <span>•</span>
                              <span className="flex items-center">
                                <Clock className="w-3 h-3 mr-0.5 text-neutral-400" />
                                {estTime}
                              </span>
                            </div>
                            <h4 className="text-sm font-bold text-neutral-950 group-hover:text-cyan-700 transition-colors line-clamp-1">
                              {article.title}
                            </h4>
                            <p className="text-xs text-neutral-500 line-clamp-1">
                              {article.excerpt}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 self-end sm:self-auto shrink-0">
                          <button
                            onClick={() => {
                              onSelectArticle(article);
                              onClose();
                            }}
                            className="px-3 py-1.5 rounded-lg bg-neutral-950 hover:bg-cyan-900 text-white text-xs font-semibold flex items-center space-x-1 transition-colors"
                          >
                            <span>Read</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleBookmark(article.id);
                            }}
                            className="p-1.5 rounded-lg text-cyan-700 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Remove from saved"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {/* TAB 2: RECENTLY VIEWED / RECENTLY READ SECTION */}
          {activeTab === 'recent' && (
            <div className="space-y-3">
              <div className="bg-cyan-50/70 border border-cyan-200/70 rounded-xl p-3 flex items-center justify-between text-xs text-cyan-950">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-cyan-600 shrink-0" />
                  <span>
                    Tracks the <strong>last 5 articles</strong> you opened. Return to them quickly even if unbookmarked.
                  </span>
                </div>
                <span className="font-mono-data font-bold text-cyan-800 text-[11px] shrink-0 ml-2">
                  {recentArticles.length} / 5 stored
                </span>
              </div>

              {recentArticles.length === 0 ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto">
                    <History className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-neutral-950">
                      {t('saved.emptyRecent')}
                    </h4>
                    <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                      When you read articles in the reader, the 5 most recent will automatically appear here for quick access across page reloads.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl bg-neutral-950 text-white text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
                  >
                    Explore Global Dispatches & Field Wire
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentArticles.map((article, idx) => {
                    const isSaved = savedIds.includes(article.id);
                    const estTime = getEstimatedReadingTime(article);

                    return (
                      <div
                        key={article.id}
                        className="p-4 rounded-xl border border-neutral-200 hover:border-cyan-500 bg-white hover:bg-neutral-50/50 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group relative"
                      >
                        {/* Chronological badge: #1 is newest */}
                        <div 
                          onClick={() => {
                            onSelectArticle(article);
                            onClose();
                          }}
                          className="flex items-start space-x-3.5 cursor-pointer flex-1"
                        >
                          <div className="relative shrink-0">
                            <img
                              src={getHighResImageUrl(article.imageUrl, 800, 88)}
                              alt={article.title}
                              className="w-16 h-16 rounded-lg object-cover border border-neutral-200 group-hover:scale-103 transition-transform"
                              loading="lazy"
                              decoding="async"
                            />
                            <span className="absolute -top-1.5 -left-1.5 w-5 h-5 bg-neutral-900 text-white font-mono-data text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                              {idx + 1}
                            </span>
                          </div>

                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono-data text-neutral-500">
                              <span className="font-bold text-cyan-700 uppercase">{article.category}</span>
                              <span>•</span>
                              <span className="flex items-center">
                                <MapPin className="w-2.5 h-2.5 mr-0.5 text-neutral-400" />
                                {article.region}
                              </span>
                              <span>•</span>
                              <span className="flex items-center text-neutral-600 font-medium">
                                <Clock className="w-3 h-3 mr-0.5 text-cyan-600" />
                                {estTime}
                              </span>
                            </div>

                            <h4 className="text-sm font-bold text-neutral-950 group-hover:text-cyan-700 transition-colors line-clamp-1">
                              {article.title}
                            </h4>

                            <p className="text-xs text-neutral-500 line-clamp-1">
                              {article.excerpt}
                            </p>
                          </div>
                        </div>

                        {/* Actions: Bookmark toggle & Read button */}
                        <div className="flex items-center space-x-2 self-end sm:self-auto shrink-0">
                          {/* Quick Bookmark Toggle */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleBookmark(article.id);
                            }}
                            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-all ${
                              isSaved
                                ? 'bg-cyan-100 text-cyan-800 hover:bg-cyan-200'
                                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 hover:text-neutral-950'
                            }`}
                            title={isSaved ? "Saved to bookmarks" : "Save to bookmarks"}
                          >
                            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current text-cyan-700' : ''}`} />
                            <span className="hidden md:inline">{isSaved ? 'Saved' : 'Bookmark'}</span>
                          </button>

                          {/* Read button */}
                          <button
                            onClick={() => {
                              onSelectArticle(article);
                              onClose();
                            }}
                            className="px-3 py-1.5 rounded-lg bg-neutral-950 hover:bg-cyan-900 text-white text-xs font-semibold flex items-center space-x-1 transition-colors"
                          >
                            <span>Read</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>

                          {/* Remove from recent */}
                          {onRemoveRecentlyViewed && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onRemoveRecentlyViewed(article.id);
                              }}
                              className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                              title="Remove from recently viewed"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer Note */}
        <div className="p-4 border-t border-neutral-100 bg-neutral-50/70 flex items-center justify-between text-xs text-neutral-500">
          <div className="flex items-center space-x-2 font-mono-data text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>
              {activeTab === 'saved' 
                ? 'Bookmarks persist locally in your browser'
                : 'Last 5 opened articles saved automatically'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-xs font-bold text-cyan-700 hover:underline"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
