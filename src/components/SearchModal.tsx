import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight, FileText, Globe, Layers, BookOpen } from 'lucide-react';
import { ARTICLES, IMPACT_PILLARS, REGIONAL_DESKS, PUBLICATIONS, Article } from '../data/pulsewireData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
  onSelectPillar: (pillarId: string) => void;
  onSelectRegion: (regionId: string) => void;
  articles?: Article[];
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectArticle,
  onSelectPillar,
  onSelectRegion,
  articles = ARTICLES
}) => {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'articles' | 'pillars' | 'regions' | 'reports'>('all');

  const filteredResults = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) {
      return {
        articles: articles.slice(0, 3),
        pillars: IMPACT_PILLARS.slice(0, 3),
        regions: REGIONAL_DESKS.slice(0, 2),
        publications: PUBLICATIONS.slice(0, 2)
      };
    }

    return {
      articles: articles.filter(a => 
        a.title.toLowerCase().includes(q) || 
        a.excerpt.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.region.toLowerCase().includes(q)
      ),
      pillars: IMPACT_PILLARS.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      ),
      regions: REGIONAL_DESKS.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.focusSummary.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q)
      ),
      publications: PUBLICATIONS.filter(pub =>
        pub.title.toLowerCase().includes(q) ||
        pub.summary.toLowerCase().includes(q)
      )
    };
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/80 backdrop-blur-sm flex justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div 
        className="bg-white text-neutral-900 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden my-auto border border-neutral-200 flex flex-col relative max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-neutral-200 bg-neutral-50/50">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search field dispatches, data pillars, regional bureaus, or reports..."
              className="w-full bg-white border border-neutral-300 rounded-xl pl-12 pr-12 py-3.5 text-base text-neutral-950 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 shadow-sm"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-12 text-xs font-semibold text-neutral-400 hover:text-neutral-700"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 ml-2 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 font-mono-data mr-2">
              Filter:
            </span>
            {(['all', 'articles', 'pillars', 'regions', 'reports'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1 rounded-full text-xs font-semibold capitalize transition-colors ${
                  activeFilter === filter
                    ? 'bg-neutral-900 text-white'
                    : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                {filter === 'all' ? 'All Results' : filter}
              </button>
            ))}
          </div>
        </div>

        {/* Results Scroll Area */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Articles Section */}
          {(activeFilter === 'all' || activeFilter === 'articles') && filteredResults.articles.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-neutral-400 font-mono-data">
                <FileText className="w-3.5 h-3.5 text-cyan-600" />
                <span>Field Dispatches ({filteredResults.articles.length})</span>
              </div>
              <div className="grid gap-2">
                {filteredResults.articles.map((art) => (
                  <button
                    key={art.id}
                    onClick={() => {
                      onSelectArticle(art);
                      onClose();
                    }}
                    className="p-3 rounded-xl hover:bg-neutral-50 border border-neutral-100 transition-colors text-left flex items-start justify-between group"
                  >
                    <div className="space-y-1 pr-4">
                      <div className="flex items-center space-x-2 text-[11px] text-neutral-500">
                        <span className="font-semibold text-cyan-700">{art.category}</span>
                        <span>•</span>
                        <span>{art.region}</span>
                        <span>•</span>
                        <span>{art.readTime}</span>
                      </div>
                      <h4 className="text-sm font-bold text-neutral-900 group-hover:text-cyan-700 transition-colors">
                        {art.title}
                      </h4>
                      <p className="text-xs text-neutral-500 line-clamp-1">
                        {art.excerpt}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-cyan-600 shrink-0 mt-2 transition-transform group-hover:translate-x-1" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Pillars Section */}
          {(activeFilter === 'all' || activeFilter === 'pillars') && filteredResults.pillars.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-neutral-400 font-mono-data">
                <Layers className="w-3.5 h-3.5 text-amber-600" />
                <span>Impact Pillars ({filteredResults.pillars.length})</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-2">
                {filteredResults.pillars.map((pil) => (
                  <button
                    key={pil.id}
                    onClick={() => {
                      onSelectPillar(pil.id);
                      onClose();
                      const el = document.getElementById('pillars-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="p-3 rounded-xl hover:bg-neutral-50 border border-neutral-100 transition-colors text-left flex items-center space-x-3 group"
                  >
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-mono-data text-xs font-bold shrink-0 shadow-sm"
                      style={{ backgroundColor: pil.color }}
                    >
                      {pil.number}
                    </div>
                    <div className="truncate">
                      <h4 className="text-xs font-bold text-neutral-900 group-hover:text-cyan-700 truncate">
                        {pil.title}
                      </h4>
                      <p className="text-[11px] text-neutral-500 truncate">
                        {pil.activeProjects} projects • {pil.fundingTracked}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Regional Desks */}
          {(activeFilter === 'all' || activeFilter === 'regions') && filteredResults.regions.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-neutral-400 font-mono-data">
                <Globe className="w-3.5 h-3.5 text-emerald-600" />
                <span>Regional Bureaus ({filteredResults.regions.length})</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-2">
                {filteredResults.regions.map((reg) => (
                  <button
                    key={reg.id}
                    onClick={() => {
                      onSelectRegion(reg.id);
                      onClose();
                      const el = document.getElementById('regional-desks-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="p-3 rounded-xl hover:bg-neutral-50 border border-neutral-100 transition-colors text-left flex items-center justify-between group"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-neutral-900 group-hover:text-cyan-700">
                        {reg.name}
                      </h4>
                      <p className="text-[11px] text-neutral-500">
                        {reg.location}
                      </p>
                    </div>
                    <span className="text-xs font-mono-data text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                      {reg.humanVitalityScore} pts
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Publications */}
          {(activeFilter === 'all' || activeFilter === 'reports') && filteredResults.publications.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-neutral-400 font-mono-data">
                <BookOpen className="w-3.5 h-3.5 text-purple-600" />
                <span>Publications & Policy Briefs ({filteredResults.publications.length})</span>
              </div>
              <div className="grid gap-2">
                {filteredResults.publications.map((pub) => (
                  <div
                    key={pub.id}
                    className="p-3 rounded-xl hover:bg-neutral-50 border border-neutral-100 transition-colors flex items-center justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-mono-data uppercase text-purple-600 font-bold">
                        {pub.category}
                      </span>
                      <h4 className="text-xs font-bold text-neutral-900">{pub.title}</h4>
                      <p className="text-[11px] text-neutral-500">{pub.edition} • {pub.pages} Pages</p>
                    </div>
                    <span className="text-xs font-bold text-cyan-600">
                      {pub.downloadCount} reads
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Zero state */}
          {filteredResults.articles.length === 0 && 
           filteredResults.pillars.length === 0 && 
           filteredResults.regions.length === 0 && 
           filteredResults.publications.length === 0 && (
            <div className="text-center py-12 space-y-2">
              <p className="text-sm font-semibold text-neutral-700">No records found for "{query}"</p>
              <p className="text-xs text-neutral-400">Try searching for "solar", "geothermal", "Amazon", "debt", "microgrid", or "Sahel".</p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
