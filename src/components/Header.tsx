import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  Search, 
  Menu, 
  X, 
  Globe, 
  ChevronDown, 
  Sparkles, 
  ArrowUpRight, 
  Bookmark, 
  FileText, 
  BarChart3, 
  Compass, 
  HeartHandshake,
  Volume2
} from 'lucide-react';
import { DESK_DISPATCHES_TICKER, IMPACT_PILLARS, REGIONAL_DESKS } from '../data/pulsewireData';
import { useI18n, SupportedLanguage } from '../utils/i18n';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenSupport: () => void;
  onOpenSaved: () => void;
  onOpenAdmin?: () => void;
  savedCount: number;
  onSelectPillar: (pillarId: string) => void;
  onSelectRegion: (regionId: string) => void;
  activeLanguage: string;
  onChangeLanguage: (lang: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenSupport,
  onOpenSaved,
  onOpenAdmin,
  savedCount,
  onSelectPillar,
  onSelectRegion,
  activeLanguage,
  onChangeLanguage
}) => {
  const { t } = useI18n();
  const [tickerIndex, setTickerIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // Rotate ticker every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % DESK_DISPATCHES_TICKER.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Track scroll for sticky shadow
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="w-full relative z-40">
      {/* Top Utility & Intelligence Ticker Bar */}
      <div className="bg-neutral-950 text-neutral-300 text-xs border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col md:flex-row items-center justify-between gap-2">
          
          {/* Live Dispatch Wire Ticker */}
          <div className="flex items-center space-x-2.5 overflow-hidden w-full md:w-auto">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-cyan-950 text-cyan-400 border border-cyan-800/80 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse mr-1.5"></span>
              {t('nav.liveWire')}
            </span>
            <div className="truncate text-neutral-300 hover:text-white transition-colors cursor-pointer text-xs font-mono-data">
              {DESK_DISPATCHES_TICKER[tickerIndex]}
            </div>
          </div>

          {/* Quick Info & Language Selector */}
          <div className="flex items-center space-x-4 shrink-0 text-xs">
            <div className="hidden lg:flex items-center space-x-3 text-neutral-400">
              <span className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5"></span>
                {t('nav.nationsMonitored')}
              </span>
              <span className="text-neutral-700">|</span>
              <span className="font-mono-data text-[11px] text-neutral-400">
                {t('nav.globalVitality')}: <strong className="text-white font-medium">78.4 pts</strong> (+3.6%)
              </span>
            </div>

            <div className="flex items-center space-x-1 border-l border-neutral-800 pl-3">
              <Globe className="w-3.5 h-3.5 text-neutral-400 mr-1" />
              {(['EN', 'FR', 'ES', 'AR'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => onChangeLanguage(lang)}
                  className={`px-1.5 py-0.5 rounded text-[11px] font-medium transition-colors ${
                    activeLanguage === lang
                      ? 'bg-neutral-800 text-cyan-400 font-bold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            <button
              onClick={onOpenSaved}
              className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors border border-neutral-800"
              title="View saved articles"
            >
              <Bookmark className={`w-3.5 h-3.5 ${savedCount > 0 ? 'text-cyan-400 fill-cyan-400' : 'text-neutral-400'}`} />
              <span>{t('nav.saved')}</span>
              {savedCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono-data font-bold">
                  {savedCount}
                </span>
              )}
            </button>

            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 hover:bg-cyan-900 border border-cyan-700/70 text-[11px] font-mono-data font-bold transition-colors ml-1"
                title="Open Editorial Newsroom & Ingest External Link Desk"
              >
                <span>Editorial Desk / Ingest</span>
              </button>
            )}

            <button
              onClick={onOpenSupport}
              className="inline-flex items-center text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors pl-2"
            >
              {t('nav.support')}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div 
        className={`bg-white text-neutral-900 border-b border-neutral-200 transition-all duration-200 ${
          scrolled ? 'sticky top-0 shadow-md backdrop-blur-md bg-white/95' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Brand Logo & Editorial Moniker */}
            <div className="flex items-center space-x-6">
              <a 
                href="#top" 
                onClick={(e) => { e.preventDefault(); scrollToSection('top'); }}
                className="group flex items-center space-x-3 focus:outline-none"
              >
                {/* Logo Glyph */}
                <div className="w-10 h-10 rounded-lg bg-neutral-950 flex items-center justify-center text-white shadow-sm group-hover:bg-cyan-900 transition-colors">
                  <div className="relative flex items-center justify-center">
                    <Radio className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
                  </div>
                </div>

                {/* Brand Text */}
                <div className="flex flex-col">
                  <div className="flex items-baseline space-x-1">
                    <span className="font-extrabold tracking-tight text-2xl text-neutral-950">
                      PULSEWIRE
                    </span>
                    <span className="text-xs font-bold text-cyan-600 font-mono-data tracking-wider">
                      .COM
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">
                    {t('nav.brandSubtitle')}
                  </span>
                </div>
              </a>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1">
              
              {/* Pillars Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setOpenDropdown('pillars')}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button 
                  onClick={() => scrollToSection('pillars-section')}
                  className="px-3.5 py-2 text-sm font-semibold text-neutral-800 hover:text-cyan-700 rounded-md transition-colors flex items-center space-x-1"
                >
                  <span>{t('nav.focusPillars')}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === 'pillars' ? 'rotate-180' : ''}`} />
                </button>

                {openDropdown === 'pillars' && (
                  <div className="absolute top-full left-0 w-80 bg-white border border-neutral-200 rounded-xl shadow-xl p-3 grid gap-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-100">
                      8 Global Impact Pillars
                    </div>
                    {IMPACT_PILLARS.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          onSelectPillar(p.id);
                          scrollToSection('pillars-section');
                        }}
                        className="flex items-center space-x-3 px-3 py-2 rounded-lg text-left hover:bg-neutral-50 group transition-colors"
                      >
                        <div 
                          className="w-7 h-7 rounded flex items-center justify-center font-mono-data text-xs font-bold text-white shrink-0 shadow-sm"
                          style={{ backgroundColor: p.color }}
                        >
                          {p.number}
                        </div>
                        <div className="truncate">
                          <p className="text-xs font-semibold text-neutral-900 group-hover:text-cyan-700 truncate">
                            {p.title}
                          </p>
                          <p className="text-[11px] text-neutral-500 truncate">
                            {p.activeProjects} active initiatives
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Regional Desks Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setOpenDropdown('regions')}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button 
                  onClick={() => scrollToSection('regional-desks-section')}
                  className="px-3.5 py-2 text-sm font-semibold text-neutral-800 hover:text-cyan-700 rounded-md transition-colors flex items-center space-x-1"
                >
                  <span>{t('nav.regionalDesks')}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === 'regions' ? 'rotate-180' : ''}`} />
                </button>

                {openDropdown === 'regions' && (
                  <div className="absolute top-full left-0 w-72 bg-white border border-neutral-200 rounded-xl shadow-xl p-3 grid gap-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-100">
                      6 Continental Regional Bureaus
                    </div>
                    {REGIONAL_DESKS.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => {
                          onSelectRegion(r.id);
                          scrollToSection('regional-desks-section');
                        }}
                        className="flex items-center justify-between px-3 py-2 rounded-lg text-left hover:bg-neutral-50 group transition-colors"
                      >
                        <div>
                          <p className="text-xs font-semibold text-neutral-900 group-hover:text-cyan-700">
                            {r.name}
                          </p>
                          <p className="text-[11px] text-neutral-500">
                            {r.activeNations} countries monitored
                          </p>
                        </div>
                        <span className="text-xs font-mono-data font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                          {r.humanVitalityScore}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Data & Indices */}
              <button
                onClick={() => scrollToSection('data-hub-section')}
                className="px-3.5 py-2 text-sm font-semibold text-neutral-800 hover:text-cyan-700 rounded-md transition-colors"
              >
                {t('nav.dataIndices')}
              </button>

              {/* Field Dispatches */}
              <button
                onClick={() => scrollToSection('dispatches-section')}
                className="px-3.5 py-2 text-sm font-semibold text-neutral-800 hover:text-cyan-700 rounded-md transition-colors"
              >
                {t('nav.fieldDispatches')}
              </button>

              {/* Publications */}
              <button
                onClick={() => scrollToSection('publications-section')}
                className="px-3.5 py-2 text-sm font-semibold text-neutral-800 hover:text-cyan-700 rounded-md transition-colors"
              >
                {t('nav.publications')}
              </button>

              {/* About & Charter */}
              <button
                onClick={() => scrollToSection('about-charter-section')}
                className="px-3.5 py-2 text-sm font-semibold text-neutral-800 hover:text-cyan-700 rounded-md transition-colors"
              >
                {t('nav.charter')}
              </button>
            </nav>

            {/* Right Action Icons & Support CTA */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Saved Articles Bookmark Trigger */}
              <button
                onClick={onOpenSaved}
                aria-label="View saved articles"
                title={`Saved Dispatches (${savedCount})`}
                className="relative p-2.5 rounded-lg text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <Bookmark className={`w-4 h-4 ${savedCount > 0 ? 'text-cyan-600 fill-cyan-600' : ''}`} />
                {savedCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-600 text-white text-[10px] font-mono-data font-bold flex items-center justify-center shadow-xs">
                    {savedCount}
                  </span>
                )}
              </button>

              {/* Search Trigger */}
              <button
                onClick={onOpenSearch}
                aria-label="Search articles and data"
                className="p-2.5 rounded-lg text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Support / Contribute Button */}
              <button
                onClick={onOpenSupport}
                className="hidden sm:inline-flex items-center px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-neutral-950 hover:bg-cyan-900 text-white transition-all shadow-sm hover:shadow"
              >
                <HeartHandshake className="w-4 h-4 mr-2 text-cyan-400" />
                {t('nav.support')}
              </button>

              {/* Mobile Hamburger Trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="lg:hidden p-2 rounded-lg text-neutral-700 hover:bg-neutral-100"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-neutral-200 bg-white px-4 pt-3 pb-6 space-y-4 shadow-xl">
            <div className="space-y-1">
              <button
                onClick={() => scrollToSection('pillars-section')}
                className="w-full flex items-center justify-between py-2.5 text-sm font-semibold text-neutral-900 border-b border-neutral-100 text-left"
              >
                <span>{t('nav.focusPillars')}</span>
                <span className="text-xs text-cyan-600 font-normal">Explore →</span>
              </button>
              <button
                onClick={() => scrollToSection('regional-desks-section')}
                className="w-full flex items-center justify-between py-2.5 text-sm font-semibold text-neutral-900 border-b border-neutral-100 text-left"
              >
                <span>{t('nav.regionalDesks')}</span>
                <span className="text-xs text-cyan-600 font-normal">View Desks →</span>
              </button>
              <button
                onClick={() => scrollToSection('data-hub-section')}
                className="w-full flex items-center justify-between py-2.5 text-sm font-semibold text-neutral-900 border-b border-neutral-100 text-left"
              >
                <span>{t('nav.dataIndices')}</span>
                <span className="text-xs text-cyan-600 font-normal">View Trackers →</span>
              </button>
              <button
                onClick={() => scrollToSection('dispatches-section')}
                className="w-full flex items-center justify-between py-2.5 text-sm font-semibold text-neutral-900 border-b border-neutral-100 text-left"
              >
                <span>{t('nav.fieldDispatches')}</span>
                <span className="text-xs text-cyan-600 font-normal">Latest Stories →</span>
              </button>
              <button
                onClick={() => scrollToSection('publications-section')}
                className="w-full flex items-center justify-between py-2.5 text-sm font-semibold text-neutral-900 border-b border-neutral-100 text-left"
              >
                <span>{t('nav.publications')}</span>
                <span className="text-xs text-cyan-600 font-normal">Download →</span>
              </button>
              <button
                onClick={() => scrollToSection('about-charter-section')}
                className="w-full flex items-center justify-between py-2.5 text-sm font-semibold text-neutral-900 text-left"
              >
                <span>{t('nav.charter')}</span>
                <span className="text-xs text-cyan-600 font-normal">Read →</span>
              </button>
            </div>

            <div className="pt-2 flex flex-col space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSaved();
                }}
                className="w-full py-2.5 px-4 rounded-lg bg-cyan-50 border border-cyan-200 text-cyan-900 text-xs font-semibold flex items-center justify-between"
              >
                <span className="flex items-center space-x-2">
                  <Bookmark className="w-4 h-4 text-cyan-600 fill-cyan-600" />
                  <span>{t('nav.saved')}</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-cyan-200 text-cyan-900 text-xs font-mono-data font-bold">
                  {savedCount}
                </span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className="w-full py-2.5 px-4 rounded-lg bg-neutral-100 text-neutral-800 text-xs font-semibold flex items-center justify-center space-x-2"
              >
                <Search className="w-4 h-4 text-neutral-500" />
                <span>{t('nav.search')}</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSupport();
                }}
                className="w-full py-2.5 px-4 rounded-lg bg-neutral-950 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2"
              >
                <HeartHandshake className="w-4 h-4 text-cyan-400" />
                <span>{t('nav.support')}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
