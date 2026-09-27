import React, { useState } from 'react';
import { 
  Radio, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  FileCheck, 
  ExternalLink, 
  Lock, 
  Globe2, 
  CheckCircle2, 
  Terminal, 
  Download 
} from 'lucide-react';
import { IMPACT_PILLARS, REGIONAL_DESKS } from '../data/pulsewireData';

interface FooterProps {
  onSelectPillar: (pillarId: string) => void;
  onSelectRegion: (regionId: string) => void;
  onOpenSupport: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectPillar,
  onSelectRegion,
  onOpenSupport,
  onOpenAdmin
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-neutral-950 text-neutral-300 border-t border-neutral-800">
      
      {/* Newsletter & Field Wire Signup Strip */}
      <div className="border-b border-neutral-800/80 bg-neutral-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-2">
              <div className="inline-flex items-center space-x-2 text-cyan-400 text-xs font-mono-data font-bold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                <span>The Daily Dispatch Wire</span>
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-white">
                Uncompromising field reporting and development intelligence directly in your inbox.
              </h3>
              <p className="text-sm text-neutral-400 max-w-xl">
                Every Tuesday and Friday: satellite environmental audits, clean energy grids, debt restructuring briefs, and first-hand field notes from correspondents across 164 nations worldwide. Zero sponsored spin.
              </p>
            </div>

            <div className="lg:col-span-6">
              {subscribed ? (
                <div className="bg-emerald-950/80 border border-emerald-700/80 text-emerald-200 rounded-xl p-4 flex items-center space-x-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-white">You are subscribed to the Pulsewire Dispatch.</p>
                    <p className="text-xs text-emerald-300">Confirmation dispatch sent. We respect your inbox privacy.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-grow">
                      <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-500" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your institutional or personal email..."
                        className="w-full bg-neutral-950 border border-neutral-700 text-white placeholder-neutral-500 text-sm rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shrink-0 shadow-sm"
                    >
                      <span>Join Dispatch</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center space-x-4 text-[11px] text-neutral-500">
                    <span className="flex items-center">
                      <Lock className="w-3 h-3 mr-1" />
                      Strict no-spam & zero commercial tracking policy
                    </span>
                    <span>•</span>
                    <span>140,000+ policy readers worldwide</span>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Main Multi-Column Institutional Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand & Editorial Charter Statement (Span 2) */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center text-cyan-400">
                <Radio className="w-5 h-5" />
              </div>
              <div className="flex items-baseline space-x-1">
                <span className="font-extrabold tracking-tight text-xl text-white">
                  PULSEWIRE
                </span>
                <span className="text-xs font-bold text-cyan-400 font-mono-data">
                  .COM
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed pr-6">
              Pulsewire is an independent development intelligence organization tracking human progress, clean power transitions, ecological defense, and systemic resilience across 164 nations worldwide.
            </p>

            <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-2">
              <div className="flex items-center space-x-2 text-cyan-400 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Certified Independent Governance</span>
              </div>
              <p className="text-[11px] text-neutral-400 leading-normal">
                Governed by an independent international editorial trust. No sovereign state, corporate conglomerate, or multilateral bureaucracy holds veto power over our field investigative findings.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <button 
                onClick={onOpenSupport}
                className="text-xs font-semibold text-white bg-neutral-800 hover:bg-neutral-700 px-3.5 py-1.5 rounded-lg border border-neutral-700 transition-colors"
              >
                Contribute to Investigation Fund
              </button>
              <button 
                onClick={() => scrollTo('about-charter-section')}
                className="text-xs font-semibold text-neutral-400 hover:text-white px-3 py-1.5 transition-colors"
              >
                Read 2026 Charter →
              </button>
            </div>
          </div>

          {/* Column 2: 8 Development Pillars */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-200 font-mono-data">
              8 Global Pillars
            </h4>
            <ul className="space-y-2 text-xs">
              {IMPACT_PILLARS.slice(0, 6).map((pillar) => (
                <li key={pillar.id}>
                  <button
                    onClick={() => {
                      onSelectPillar(pillar.id);
                      scrollTo('pillars-section');
                    }}
                    className="text-neutral-400 hover:text-cyan-400 transition-colors text-left truncate block w-full"
                  >
                    <span className="font-mono-data text-[10px] text-neutral-500 mr-1.5">
                      0{pillar.number}
                    </span>
                    {pillar.title}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => scrollTo('pillars-section')}
                  className="text-cyan-400 font-medium text-xs hover:underline pt-1 inline-block"
                >
                  View All 8 Pillars →
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Field Desks & Bureaus */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-200 font-mono-data">
              Global Regional Bureaus
            </h4>
            <ul className="space-y-2 text-xs">
              {REGIONAL_DESKS.map((desk) => (
                <li key={desk.id}>
                  <button
                    onClick={() => {
                      onSelectRegion(desk.id);
                      scrollTo('regional-desks-section');
                    }}
                    className="text-neutral-400 hover:text-cyan-400 transition-colors text-left block w-full truncate"
                  >
                    <span className="font-medium text-neutral-300">{desk.name}</span>
                    <span className="text-[10px] text-neutral-500 block">
                      {desk.location}
                    </span>
                  </button>
                </li>
              ))}
              <li className="pt-1">
                <span className="inline-flex items-center text-[11px] text-neutral-400">
                  <Globe2 className="w-3.5 h-3.5 text-cyan-400 mr-1.5" />
                  164 Monitored Sovereign Territories
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Open Data & Integrity */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-200 font-mono-data">
              Data & Standards
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <button 
                  onClick={onOpenAdmin} 
                  className="hover:text-cyan-400 text-cyan-400 font-semibold transition-colors flex items-center"
                >
                  <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-cyan-400" />
                  Editorial Admin Portal & CMS
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollTo('data-hub-section')} 
                  className="hover:text-cyan-400 transition-colors flex items-center"
                >
                  <Terminal className="w-3.5 h-3.5 mr-1.5 text-neutral-500" />
                  Public Data API & Commons
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollTo('publications-section')} 
                  className="hover:text-cyan-400 transition-colors flex items-center"
                >
                  <Download className="w-3.5 h-3.5 mr-1.5 text-neutral-500" />
                  Flagship Reports (PDF)
                </button>
              </li>
              <li>
                <a href="#charter" onClick={(e) => { e.preventDefault(); scrollTo('about-charter-section'); }} className="hover:text-cyan-400 transition-colors flex items-center">
                  <FileCheck className="w-3.5 h-3.5 mr-1.5 text-neutral-500" />
                  Editorial Verification Code
                </a>
              </li>
              <li>
                <a href="#whistleblower" onClick={(e) => { e.preventDefault(); scrollTo('about-charter-section'); }} className="hover:text-cyan-400 transition-colors flex items-center">
                  <Lock className="w-3.5 h-3.5 mr-1.5 text-neutral-500" />
                  SecureDrop Whistleblower Link
                </a>
              </li>
              <li>
                <a href="#financials" onClick={(e) => { e.preventDefault(); scrollTo('about-charter-section'); }} className="hover:text-cyan-400 transition-colors">
                  Annual Financial Disclosures
                </a>
              </li>
              <li>
                <a href="#careers" onClick={(e) => { e.preventDefault(); scrollTo('about-charter-section'); }} className="hover:text-cyan-400 transition-colors">
                  Investigative Fellowships & Bureaus (Roseau & Bridgetown)
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="mt-14 pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>© 2026 Pulsewire.com Media & Development Foundation.</span>
            <span>All rights reserved.</span>
            <span className="text-neutral-600">|</span>
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-neutral-300">Privacy Policy</a>
            <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-neutral-300">Terms of Service</a>
            <a href="#data-governance" onClick={(e) => e.preventDefault()} className="hover:text-neutral-300">Data Governance</a>
            <a href="#accessibility" onClick={(e) => e.preventDefault()} className="hover:text-neutral-300">Accessibility (WCAG 2.1 AAA)</a>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Admin Portal Entry Button */}
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 hover:border-cyan-500/60 text-xs font-mono-data transition-all group shadow-xs"
              title="Open Newsroom Editorial Admin CMS & Articles Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span>Admin Portal (CMS)</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-1" />
            </button>

            <span className="inline-flex items-center text-[11px] text-neutral-400 font-mono-data bg-neutral-900 px-2.5 py-1 rounded border border-neutral-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5"></span>
              API v2.8 Online
            </span>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-xs font-semibold text-neutral-400 hover:text-white hover:underline"
            >
              Back to Top ↑
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
