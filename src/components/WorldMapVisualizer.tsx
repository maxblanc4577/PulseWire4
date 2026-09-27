import React, { useState } from 'react';
import { 
  Globe, 
  MapPin, 
  Layers, 
  Activity, 
  Radio, 
  Check, 
  X, 
  ArrowRight, 
  Compass, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';
import { RegionalDesk, REGIONAL_DESKS, Article } from '../data/pulsewireData';
import { useI18n } from '../utils/i18n';

interface WorldMapVisualizerProps {
  regionalDesks?: RegionalDesk[];
  selectedRegionId: string | null;
  onSelectRegion: (regionId: string) => void;
  articles?: Article[];
  className?: string;
}

interface MapRegionData {
  id: string;
  name: string;
  deskId: string;
  cx: number; // SVG center X (viewBox 0 0 1000 500)
  cy: number; // SVG center Y
  coordinates: string;
  nationsCount: number;
  vitalityScore: number;
  vitalityChange: string;
  bureauHQ: string;
  path: string; // SVG path for continental zone highlight
}

// 6 Continental Regional Bureau Hubs & clickable geographic sectors
const MAP_REGIONS: MapRegionData[] = [
  {
    id: 'sub-saharan-africa',
    deskId: 'sub-saharan-africa',
    name: 'Sub-Saharan Africa',
    cx: 520,
    cy: 285,
    coordinates: '01.29°S, 36.82°E',
    nationsCount: 48,
    vitalityScore: 74.8,
    vitalityChange: '+4.2 pts',
    bureauHQ: 'Nairobi Bureau HQ & Dakar Center',
    path: 'M 480 200 C 510 195, 545 210, 560 240 C 575 270, 565 330, 545 375 C 525 400, 500 405, 485 365 C 470 330, 460 270, 460 240 C 460 215, 470 205, 480 200 Z'
  },
  {
    id: 'latin-america-caribbean',
    deskId: 'latin-america-caribbean',
    name: 'Latin America & Caribbean',
    cx: 295,
    cy: 295,
    coordinates: '01.45°S, 48.50°W',
    nationsCount: 33,
    vitalityScore: 79.5,
    vitalityChange: '+3.6 pts',
    bureauHQ: 'Belém Amazon Bureau & Roseau Hub',
    path: 'M 240 180 C 275 165, 310 175, 335 210 C 355 240, 360 290, 340 340 C 315 390, 290 445, 275 440 C 260 430, 260 360, 255 310 C 250 260, 230 220, 240 180 Z'
  },
  {
    id: 'south-southeast-asia',
    deskId: 'south-southeast-asia',
    name: 'South & Southeast Asia',
    cx: 720,
    cy: 235,
    coordinates: '13.75°N, 100.50°E',
    nationsCount: 24,
    vitalityScore: 76.2,
    vitalityChange: '+2.8 pts',
    bureauHQ: 'Bangkok Regional Desk & Dhaka Bureau',
    path: 'M 640 170 C 685 155, 740 160, 775 190 C 800 220, 785 275, 750 300 C 720 315, 680 280, 660 250 C 645 220, 635 190, 640 170 Z'
  },
  {
    id: 'pacific-islands-sids',
    deskId: 'pacific-islands-sids',
    name: 'Pacific Islands & SIDS',
    cx: 870,
    cy: 320,
    coordinates: '18.14°S, 178.44°E',
    nationsCount: 18,
    vitalityScore: 77.9,
    vitalityChange: '+3.1 pts',
    bureauHQ: 'Suva Bureau & Funafuti Post',
    path: 'M 810 260 C 860 240, 920 250, 950 280 C 970 315, 950 370, 910 380 C 865 385, 830 350, 815 310 C 805 285, 800 270, 810 260 Z'
  },
  {
    id: 'middle-east-north-africa',
    deskId: 'middle-east-north-africa',
    name: 'Middle East & North Africa',
    cx: 550,
    cy: 180,
    coordinates: '31.95°N, 35.93°E',
    nationsCount: 20,
    vitalityScore: 73.1,
    vitalityChange: '+2.2 pts',
    bureauHQ: 'Amman Bureau & Rabat Hub',
    path: 'M 450 150 C 510 140, 580 145, 610 175 C 625 200, 600 230, 560 235 C 520 240, 470 215, 450 190 C 440 175, 440 160, 450 150 Z'
  },
  {
    id: 'europe-central-asia',
    deskId: 'europe-central-asia',
    name: 'Europe & Central Asia',
    cx: 565,
    cy: 110,
    coordinates: '46.20°N, 06.14°E',
    nationsCount: 21,
    vitalityScore: 81.3,
    vitalityChange: '+1.9 pts',
    bureauHQ: 'Geneva Policy Center & Almaty Bureau',
    path: 'M 470 80 C 530 65, 630 70, 680 95 C 700 120, 670 145, 610 150 C 550 150, 490 135, 470 115 C 460 100, 460 90, 470 80 Z'
  }
];

export const WorldMapVisualizer: React.FC<WorldMapVisualizerProps> = ({
  selectedRegionId,
  onSelectRegion,
  articles = [],
  className = ''
}) => {
  const { t } = useI18n();
  const [hoveredRegion, setHoveredRegion] = useState<MapRegionData | null>(null);

  const activeRegion = MAP_REGIONS.find((r) => r.deskId === selectedRegionId) || null;

  // Count articles per region
  const getArticleCountForDesk = (deskId: string) => {
    return articles.filter(
      (a) =>
        a.pillarId === deskId ||
        a.region.toLowerCase().includes(deskId.replace(/-/g, ' ')) ||
        (deskId === 'sub-saharan-africa' && (a.region.includes('Africa') || a.region.includes('Sahel') || a.region.includes('Senegal'))) ||
        (deskId === 'latin-america-caribbean' && (a.region.includes('Amazon') || a.region.includes('Latin America') || a.region.includes('Dominica') || a.region.includes('Caribbean'))) ||
        (deskId === 'south-southeast-asia' && (a.region.includes('Asia') || a.region.includes('Sundarbans') || a.region.includes('Bengal'))) ||
        (deskId === 'pacific-islands-sids' && (a.region.includes('Pacific') || a.region.includes('Tuvalu') || a.region.includes('SIDS')))
    ).length;
  };

  return (
    <div className={`w-full bg-neutral-950 text-white rounded-3xl border border-neutral-800 shadow-2xl overflow-hidden relative ${className}`}>
      
      {/* Top Header & Telemetry Status Bar */}
      <div className="p-5 sm:p-6 border-b border-neutral-800/80 bg-neutral-900/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs font-mono-data uppercase font-bold text-cyan-400">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>{t('map.sectionTag')}</span>
            <span className="text-neutral-600">•</span>
            <span className="text-neutral-400 font-normal">164 Monitored Territories</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center space-x-2">
            <span>{t('map.title')}</span>
          </h3>
          <p className="text-xs text-neutral-400 max-w-2xl leading-relaxed">
            {t('map.description')}
          </p>
        </div>

        {/* Global Filter Bar Controls */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={() => onSelectRegion('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono-data transition-all flex items-center space-x-1.5 ${
              !selectedRegionId || selectedRegionId === 'all'
                ? 'bg-cyan-500 text-neutral-950 shadow-md'
                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{t('map.filterAll')}</span>
          </button>

          {activeRegion && (
            <div className="hidden sm:flex items-center space-x-2 pl-2 border-l border-neutral-800 text-xs font-mono-data">
              <span className="text-neutral-500">{t('map.activeFilter')}</span>
              <span className="text-cyan-400 font-bold">{activeRegion.name}</span>
              <button
                onClick={() => onSelectRegion('all')}
                className="p-1 hover:text-red-400 text-neutral-500 rounded"
                title={t('map.clearFilter')}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Interactive SVG World Map Canvas */}
      <div className="relative p-2 sm:p-6 bg-radial from-neutral-900/60 to-neutral-950 select-none overflow-hidden">
        
        {/* Subtle Map Grid Lat/Long Lines */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:24px_24px]" />

        <svg
          viewBox="0 0 1000 500"
          className="w-full h-auto max-h-[460px] drop-shadow-2xl"
          aria-label="Interactive World Map Visualizer"
        >
          <defs>
            {/* Ambient Radial Gradient Glow for Active Nodes */}
            <radialGradient id="activeNodeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#0891b2" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="oceanGridGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0c121e" />
              <stop offset="100%" stopColor="#080c14" />
            </linearGradient>

            <filter id="hubGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background Ocean Plate */}
          <rect width="1000" height="500" fill="url(#oceanGridGrad)" rx="16" />

          {/* Lat/Long Reference Rings & Equator */}
          <g stroke="#1e293b" strokeWidth="0.8" strokeDasharray="3 3" fill="none" opacity="0.6">
            <line x1="40" y1="250" x2="960" y2="250" /> {/* Equator */}
            <line x1="40" y1="140" x2="960" y2="140" /> {/* Tropic of Cancer */}
            <line x1="40" y1="360" x2="960" y2="360" /> {/* Tropic of Capricorn */}
            <line x1="500" y1="40" x2="500" y2="460" /> {/* Prime Meridian */}
            <circle cx="500" cy="250" r="220" />
          </g>

          {/* Generalized Stylized Continental Vector Outlines */}
          <g fill="#1e293b" stroke="#334155" strokeWidth="1" opacity="0.85">
            {/* North America */}
            <path d="M 120 70 L 160 55 L 240 60 L 300 80 L 310 130 L 260 170 L 210 210 L 170 170 L 130 130 L 105 95 Z" />
            {/* Greenland */}
            <path d="M 330 35 L 390 30 L 410 65 L 370 85 L 340 65 Z" />
            {/* South America */}
            <path d="M 230 200 L 290 190 L 350 230 L 360 290 L 320 380 L 280 440 L 260 410 L 250 300 L 220 230 Z" />
            {/* Europe */}
            <path d="M 450 75 L 530 65 L 580 90 L 560 140 L 510 160 L 460 145 L 440 105 Z" />
            {/* Africa */}
            <path d="M 440 165 L 570 155 L 610 210 L 580 320 L 540 400 L 490 380 L 460 300 L 430 230 L 435 185 Z" />
            {/* Asia Main */}
            <path d="M 590 60 L 760 50 L 890 85 L 860 180 L 800 240 L 730 250 L 640 210 L 590 140 Z" />
            {/* India Subcontinent */}
            <path d="M 660 170 L 720 180 L 700 260 L 660 240 Z" />
            {/* Southeast Asia Archipelago & Australia */}
            <path d="M 750 260 L 820 270 L 830 320 L 780 310 Z" />
            <path d="M 760 330 L 860 320 L 890 390 L 840 430 L 760 400 Z" />
            {/* Antarctica Ice Shelf */}
            <path d="M 160 475 L 840 475 L 820 490 L 180 490 Z" opacity="0.4" />
          </g>

          {/* Clickable Regional Continental Bureau Sectors with Interactive Fill */}
          <g>
            {MAP_REGIONS.map((region) => {
              const isSelected = selectedRegionId === region.deskId;
              const isHovered = hoveredRegion?.id === region.id;

              return (
                <path
                  key={`sector-${region.id}`}
                  d={region.path}
                  onClick={() => onSelectRegion(region.deskId)}
                  onMouseEnter={() => setHoveredRegion(region)}
                  onMouseLeave={() => setHoveredRegion(null)}
                  className="cursor-pointer transition-all duration-300"
                  fill={
                    isSelected
                      ? 'rgba(6, 182, 212, 0.45)'
                      : isHovered
                      ? 'rgba(6, 182, 212, 0.25)'
                      : 'rgba(30, 41, 59, 0.4)'
                  }
                  stroke={
                    isSelected
                      ? '#06b6d4'
                      : isHovered
                      ? '#22d3ee'
                      : 'rgba(100, 116, 139, 0.4)'
                  }
                  strokeWidth={isSelected ? '2.5' : isHovered ? '2' : '1'}
                  strokeDasharray={isSelected ? 'none' : '4 2'}
                />
              );
            })}
          </g>

          {/* Telemetry Connecting Arcs & Beacons */}
          <g stroke="rgba(6, 182, 212, 0.2)" strokeWidth="1" fill="none" strokeDasharray="2 3">
            <line x1="520" y1="285" x2="295" y2="295" />
            <line x1="520" y1="285" x2="720" y2="235" />
            <line x1="565" y1="110" x2="550" y2="180" />
            <line x1="720" y1="235" x2="870" y2="320" />
          </g>

          {/* Regional Bureau Hub Markers & Pulsing Pins */}
          {MAP_REGIONS.map((region) => {
            const isSelected = selectedRegionId === region.deskId;
            const isHovered = hoveredRegion?.id === region.id;
            const storiesCount = getArticleCountForDesk(region.deskId);

            return (
              <g
                key={`hub-${region.id}`}
                transform={`translate(${region.cx}, ${region.cy})`}
                onClick={() => onSelectRegion(region.deskId)}
                onMouseEnter={() => setHoveredRegion(region)}
                onMouseLeave={() => setHoveredRegion(null)}
                className="cursor-pointer group"
              >
                {/* Active Outer Pulse Ring */}
                {(isSelected || isHovered) && (
                  <circle
                    r="24"
                    fill="none"
                    stroke={isSelected ? '#06b6d4' : '#38bdf8'}
                    strokeWidth="1.5"
                    className="animate-ping opacity-75"
                  />
                )}

                {/* Ambient Radial Glow */}
                <circle
                  r={isSelected ? '20' : '14'}
                  fill="url(#activeNodeGlow)"
                  opacity={isSelected ? '1' : isHovered ? '0.8' : '0.4'}
                />

                {/* Core Hub Marker Pin */}
                <circle
                  r={isSelected ? '7' : isHovered ? '6' : '5'}
                  fill={isSelected ? '#06b6d4' : '#22d3ee'}
                  stroke="#ffffff"
                  strokeWidth="2"
                  filter="url(#hubGlow)"
                  className="transition-all duration-200"
                />

                {/* Hub Vitality Center Dot */}
                <circle
                  r="2"
                  fill="#080c14"
                />

                {/* Permanent Bureau Label */}
                <text
                  y={region.cy > 300 ? -14 : 20}
                  textAnchor="middle"
                  className={`text-[10px] font-mono-data font-bold transition-all pointer-events-none ${
                    isSelected
                      ? 'fill-cyan-300 font-extrabold text-[11px]'
                      : isHovered
                      ? 'fill-white'
                      : 'fill-neutral-400'
                  }`}
                >
                  {region.name}
                </text>

                {/* Quantitative Metric Label */}
                <text
                  y={region.cy > 300 ? -26 : 31}
                  textAnchor="middle"
                  className="text-[8px] font-mono-data fill-cyan-400/80 pointer-events-none font-medium"
                >
                  {region.vitalityScore} pts • {storiesCount} stories
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover / Selected Context Card Overlay */}
        {(hoveredRegion || activeRegion) && (
          <div className="mt-3 p-4 rounded-2xl bg-neutral-900/90 border border-neutral-700/80 backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-in fade-in duration-150">
            {(() => {
              const current = hoveredRegion || activeRegion;
              if (!current) return null;
              const storiesCount = getArticleCountForDesk(current.deskId);

              return (
                <>
                  <div className="flex items-center space-x-3.5">
                    <div className="w-10 h-10 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="text-sm font-bold text-white">
                          {current.name} Bureau
                        </h4>
                        <span className="text-[10px] font-mono-data px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
                          {current.coordinates}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400">
                        {current.bureauHQ} • <strong className="text-neutral-200">{current.nationsCount}</strong> {t('map.nations')}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono-data self-end md:self-auto">
                    <div className="text-right">
                      <span className="text-[10px] text-neutral-500 block uppercase">{t('map.vitalityScore')}</span>
                      <span className="text-sm font-bold text-emerald-400">{current.vitalityScore} pts ({current.vitalityChange})</span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-neutral-500 block uppercase">Catalog</span>
                      <span className="text-sm font-bold text-cyan-300">{storiesCount} {t('map.storiesCount')}</span>
                    </div>

                    <button
                      onClick={() => onSelectRegion(current.deskId)}
                      className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-neutral-950 text-xs font-bold font-sans transition-all flex items-center space-x-1.5 shadow-sm"
                    >
                      <span>Filter Dispatches</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </div>

      {/* Quick Regional Selector Pills Bar */}
      <div className="p-3 sm:p-4 bg-neutral-900 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-2 text-xs font-mono-data">
        <div className="flex items-center space-x-1 overflow-x-auto py-1 max-w-full">
          <span className="text-neutral-500 text-[11px] pr-2 shrink-0 hidden sm:inline">Regions:</span>
          {MAP_REGIONS.map((r) => {
            const isSelected = selectedRegionId === r.deskId;
            return (
              <button
                key={r.id}
                onClick={() => onSelectRegion(r.deskId)}
                className={`px-2.5 py-1 rounded-lg text-[11px] shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-cyan-500 text-neutral-950 font-bold'
                    : 'bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700'
                }`}
              >
                {r.name}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => onSelectRegion('all')}
          className="text-[11px] text-cyan-400 hover:underline shrink-0"
        >
          View All Worldwide
        </button>
      </div>

    </div>
  );
};
