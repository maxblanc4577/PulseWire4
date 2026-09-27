import React, { useState } from 'react';
import { 
  Radio, 
  ArrowRight, 
  ArrowUpRight, 
  Clock, 
  MapPin, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  Droplets, 
  Cpu, 
  ShieldAlert, 
  Activity, 
  Globe, 
  Scale, 
  Download, 
  Play, 
  Calendar, 
  BarChart3, 
  SlidersHorizontal, 
  ExternalLink, 
  Share2, 
  FileText, 
  Sparkles,
  CheckCircle,
  Quote,
  Eye,
  Bookmark,
  AlertTriangle,
  Wind,
  CloudRain,
  Waves,
  ChevronDown,
  ChevronUp,
  X,
  Shield,
  Layers
} from 'lucide-react';
import { 
  Article, 
  ImpactPillar, 
  RegionalDesk, 
  Publication, 
  LiveVitalityMetric,
  ARTICLES, 
  IMPACT_PILLARS, 
  REGIONAL_DESKS, 
  PUBLICATIONS, 
  VITALITY_METRICS 
} from '../data/pulsewireData';
import { getHighResImageUrl, getResponsiveSrcSet, getAvatarSrcSet } from '../utils/imageOptimizer';
import { analyzeArticleReadingTime, getEstimatedReadingTime } from '../utils/readingTime';
import { useI18n } from '../utils/i18n';

export interface CaribbeanWeatherAlert {
  id: string;
  regionCode: string;
  regionName: string;
  subLocation: string;
  coordinates: string;
  alertLevel: 'warning' | 'watch' | 'advisory';
  alertType: string;
  severityLabel: string;
  headline: string;
  telemetry: {
    windSpeed: string;
    gusts: string;
    pressure: string;
    precipitationForecast: string;
    marineSwell: string;
  };
  fieldStatus: string;
  safetyAction: string;
  updatedAt: string;
}

export type ClimateResilienceAlert = CaribbeanWeatherAlert;

export const CARIBBEAN_WEATHER_ALERTS: CaribbeanWeatherAlert[] = [
  {
    id: "alert-caribbean-storm-surge",
    regionCode: "latin-america-caribbean",
    regionName: "Caribbean & SIDS",
    subLocation: "Lesser Antilles Channel & Central Volcanic Highlands",
    coordinates: "15.30°N, 61.38°W",
    alertLevel: "warning",
    alertType: "Convective Tropical Surge & Coastal Inundation Warning",
    severityLabel: "Active Convective Weather Anomaly",
    headline: "Intense Atlantic Convective Bands Transiting Over Central Island Ridges",
    telemetry: {
      windSpeed: "44 kts (81 km/h)",
      gusts: "58 kts (107 km/h)",
      pressure: "1003.8 hPa",
      precipitationForecast: "+110 mm / 6 hrs",
      marineSwell: "3.6 m East-Northeasterly"
    },
    fieldStatus: "Automated river sluice sensors armed. Soufrière living reef breakwaters absorbing up to 92% of deep-sea wave momentum.",
    safetyAction: "Category-5 community shelters powered by solar microgrids activated on standby. Coastal craft moored in protected harbors.",
    updatedAt: "Live Telemetry • Updated 6 mins ago"
  },
  {
    id: "alert-sahel-horn-drought",
    regionCode: "sub-saharan-africa",
    regionName: "Sahel & Horn of Africa",
    subLocation: "Northern Senegal & Turkana Basin",
    coordinates: "14.50°N, 14.30°W",
    alertLevel: "warning",
    alertType: "Extreme Heat & Soil Desiccation Early Warning",
    severityLabel: "Severe Arid Thermal Anomaly",
    headline: "Prolonged High-Pressure Ridge Driving Ground Temperatures to 46°C",
    telemetry: {
      windSpeed: "28 kts (52 km/h)",
      gusts: "38 kts (70 km/h)",
      pressure: "1012.4 hPa",
      precipitationForecast: "0 mm / 10 days",
      marineSwell: "N/A (Continental Interior)"
    },
    fieldStatus: "Great Green Wall solar deep aquifers operating at 100% capacity. Automated drip lines supplying 240,000 hectares of multi-tier agroforestry.",
    safetyAction: "Livestock corridors routed to high-capacity solar boreholes. Emergency shade canopies deployed across pastoral trading hubs.",
    updatedAt: "Live Telemetry • Updated 12 mins ago"
  },
  {
    id: "alert-south-asia-monsoon",
    regionCode: "south-southeast-asia",
    regionName: "South Asia & Bengal Delta",
    subLocation: "Sundarbans Mangrove Delta & Lower Brahmaputra",
    coordinates: "21.94°N, 89.18°E",
    alertLevel: "watch",
    alertType: "Hydrological Surge & Tidal Inundation Advisory",
    severityLabel: "Monsoon Depression Interaction",
    headline: "Bay of Bengal Low-Pressure Cell Aligning With Perigean Spring Tides",
    telemetry: {
      windSpeed: "38 kts (70 km/h)",
      gusts: "52 kts (96 km/h)",
      pressure: "998.2 hPa",
      precipitationForecast: "+180 mm / 24 hrs",
      marineSwell: "4.1 m Tidal Surge Wave"
    },
    fieldStatus: "Women-managed stilt solar microgrids elevated above high-water mark. Reverse osmosis drinking water kiosks sealed and pressurized.",
    safetyAction: "Community early-warning sirens sounded across 12 delta islands. Multipurpose cyclone shelters stocked with clean power and grain reserves.",
    updatedAt: "Live Telemetry • Updated 18 mins ago"
  },
  {
    id: "alert-amazon-tapajos",
    regionCode: "latin-america-caribbean",
    regionName: "Amazon Basin & Pantanal",
    subLocation: "Tapajós River Drainage & Pará Interior",
    coordinates: "04.27°S, 55.98°W",
    alertLevel: "advisory",
    alertType: "River Low-Water & Wildfire Defense Watch",
    severityLabel: "Seasonal Hydrological Deficit",
    headline: "Tributary Depths Lowering; Satellite Drone Patrols Deployed",
    telemetry: {
      windSpeed: "18 kts (33 km/h)",
      gusts: "26 kts (48 km/h)",
      pressure: "1010.1 hPa",
      precipitationForecast: "< 5 mm / 7 days",
      marineSwell: "River Discharge: -28% vs median"
    },
    fieldStatus: "Munduruku sovereign satellite radar units active along 4.2M demarcated hectares. Thermal infrared camera drones patrolling boundary lines.",
    safetyAction: "Community river transport cooperatives shifting to shallow-draft solar skiffs. Firebreaks cleared around village perimeters.",
    updatedAt: "Live Telemetry • Updated 25 mins ago"
  },
  {
    id: "alert-pacific-atolls",
    regionCode: "pacific-islands-sids",
    regionName: "Pacific Atolls & Oceania",
    subLocation: "Fongafale Lagoon & Gilbert Islands Chain",
    coordinates: "08.52°S, 179.19°E",
    alertLevel: "watch",
    alertType: "King Tide Lagoon Inundation & Wave Overwash Advisory",
    severityLabel: "Oceanic King Tide Anomaly",
    headline: "Sub-Equatorial Swell Peak Aligning With Planetary Tidal Maxima",
    telemetry: {
      windSpeed: "24 kts (44 km/h)",
      gusts: "34 kts (63 km/h)",
      pressure: "1009.0 hPa",
      precipitationForecast: "+35 mm / 12 hrs",
      marineSwell: "3.2 m Long-Period Swell"
    },
    fieldStatus: "Digital twin LiDAR stations verifying coastal berm integrity. Decentralized solar water catchments operating with backflow valves closed.",
    safetyAction: "Reef passes closed to small artisanal craft. Low-lying households advised to utilize elevated community gathering platforms.",
    updatedAt: "Live Telemetry • Updated 30 mins ago"
  }
];

interface MainContentProps {
  onSelectArticle: (article: Article) => void;
  onSelectPublication: (pub: Publication) => void;
  onOpenSupport: () => void;
  selectedPillarId: string;
  onSelectPillar: (pillarId: string) => void;
  selectedRegionId: string;
  onSelectRegion: (regionId: string) => void;
  savedIds?: string[];
  onToggleBookmark?: (articleId: string) => void;
  articles?: Article[];
  vitalityMetrics?: LiveVitalityMetric[];
}

export const MainContent: React.FC<MainContentProps> = ({
  onSelectArticle,
  onSelectPublication,
  onOpenSupport,
  selectedPillarId,
  onSelectPillar,
  selectedRegionId,
  onSelectRegion,
  savedIds = [],
  onToggleBookmark,
  articles = ARTICLES,
  vitalityMetrics = VITALITY_METRICS
}) => {
  const { t } = useI18n();
  const [dispatchFilter, setDispatchFilter] = useState<string>('all');
  const [activeChartDataset, setActiveChartDataset] = useState<'clean-energy' | 'water-resilience' | 'debt-gap'>('clean-energy');

  // Climate Resilience Alert state specifically for Caribbean regions
  const [activeAlertIndex, setActiveAlertIndex] = useState(0);
  const [isAlertExpanded, setIsAlertExpanded] = useState(true);
  const [isAlertDismissed, setIsAlertDismissed] = useState(false);

  const activeAlert = CARIBBEAN_WEATHER_ALERTS[activeAlertIndex] || CARIBBEAN_WEATHER_ALERTS[0];

  // Currently active pillar & region objects
  const activePillar = IMPACT_PILLARS.find(p => p.id === selectedPillarId) || IMPACT_PILLARS[0];
  const activeRegion = REGIONAL_DESKS.find(r => r.id === selectedRegionId) || REGIONAL_DESKS[0];

  // Lead featured article
  const leadArticle = articles.find(a => a.featured) || articles[0];
  const secondaryArticles = articles.filter(a => a.id !== leadArticle?.id);

  // Geographic region matcher helper for filtering dispatches
  const isArticleMatchingRegion = (article: Article, regionId: string | null | undefined): boolean => {
    if (!regionId || regionId === 'all') return true;
    const reg = (article.region || '').toLowerCase();
    const title = (article.title || '').toLowerCase();
    const excerpt = (article.excerpt || '').toLowerCase();
    const text = `${reg} ${title} ${excerpt}`;

    switch (regionId) {
      case 'sub-saharan-africa':
        return text.includes('africa') || text.includes('sahel') || text.includes('senegal') || text.includes('chad') || text.includes('kenya') || text.includes('dakar');
      case 'latin-america-caribbean':
        return text.includes('latin') || text.includes('amazon') || text.includes('dominica') || text.includes('caribbean') || text.includes('brazil') || text.includes('tapajós') || text.includes('bridgetown');
      case 'south-southeast-asia':
        return text.includes('asia') || text.includes('sundarbans') || text.includes('bengal') || text.includes('india') || text.includes('bangladesh') || text.includes('dhaka') || text.includes('bangkok');
      case 'pacific-islands-sids':
        return text.includes('pacific') || text.includes('tuvalu') || text.includes('kiribati') || text.includes('oceania') || text.includes('sids') || text.includes('atoll') || text.includes('suva');
      case 'middle-east-north-africa':
        return text.includes('middle east') || text.includes('north africa') || text.includes('mena') || text.includes('morocco') || text.includes('jordan') || text.includes('amman');
      case 'europe-central-asia':
        return text.includes('europe') || text.includes('central asia') || text.includes('geneva') || text.includes('pamir') || text.includes('almaty');
      default:
        return text.includes(regionId.replace(/-/g, ' '));
    }
  };

  // Filtered stories for grid combining category and active geographic region
  const filteredArticles = secondaryArticles.filter(a => {
    const matchesCategory = dispatchFilter === 'all' 
      ? true 
      : a.pillarId === dispatchFilter || a.category.toLowerCase().includes(dispatchFilter.toLowerCase());
    const matchesRegion = isArticleMatchingRegion(a, selectedRegionId);
    return matchesCategory && matchesRegion;
  });

  // Icon mapping for pillars
  const renderPillarIcon = (name: string, className = "w-5 h-5") => {
    switch (name) {
      case 'Zap': return <Zap className={className} />;
      case 'Droplets': return <Droplets className={className} />;
      case 'TrendingUp': return <TrendingUp className={className} />;
      case 'Cpu': return <Cpu className={className} />;
      case 'ShieldAlert': return <ShieldAlert className={className} />;
      case 'Activity': return <Activity className={className} />;
      case 'Globe': return <Globe className={className} />;
      case 'Scale': return <Scale className={className} />;
      default: return <Zap className={className} />;
    }
  };

  // Chart dataset mock numbers
  const chartData = {
    'clean-energy': {
      title: "Decentralized Microgrid & Clean Power Capacity Worldwide (GW)",
      years: ['2021', '2022', '2023', '2024', '2025', '2026'],
      values: [48, 86, 142, 220, 310, 420],
      benchmark: 600,
      benchmarkLabel: "2030 Global South Clean Microgrid Target: 600 GW",
      insight: "Frontline developing nations across Africa, Asia, and the Caribbean are scaling decentralized renewables 3x faster than centralized fossil utilities."
    },
    'water-resilience': {
      title: "Protected Biosphere & Indigenous Watersheds Worldwide (Million Hectares)",
      years: ['2021', '2022', '2023', '2024', '2025', '2026'],
      values: [180, 240, 310, 420, 560, 720],
      benchmark: 1000,
      benchmarkLabel: "2030 Global 30x30 Protected Biosphere Target: 1,000M ha",
      insight: "Indigenous-led territorial demarcation in the Amazon, Sahelian regenerative green belts, and marine sanctuaries are driving terrestrial conservation."
    },
    'debt-gap': {
      title: "Global Climate Adaptation Capital Deployed vs Frontline Requirements ($ Billions)",
      years: ['2021', '2022', '2023', '2024', '2025', '2026'],
      values: [32, 48, 72, 105, 148, 192],
      benchmark: 380,
      benchmarkLabel: "Annual Frontline Climate Adaptation Requirement: $380B",
      insight: "Through the Bridgetown Initiative, catastrophe pause clauses in 42 nations have freed up $42B in emergency reconstruction liquidity."
    }
  };

  const currentChart = chartData[activeChartDataset];

  const handleExportCsv = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      ["Year,Observed_Value,Benchmark_Target", ...currentChart.years.map((y, i) => `${y},${currentChart.values[i]},${currentChart.benchmark}`)].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${activeChartDataset}-pulsewire-global-telemetry.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main id="top" className="w-full bg-neutral-50 overflow-hidden">
      
      {/* Global Newsroom Wire Notification Banner */}
      <div className="bg-cyan-950 text-cyan-200 border-b border-cyan-900/70 py-2.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono-data">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span className="font-bold text-white tracking-wide uppercase">Global Newsroom Wire:</span>
            <span className="text-cyan-300">Real-time development intelligence, field investigations, and resilience telemetry across 164 nations</span>
          </div>
          <div className="text-[11px] text-cyan-400/90 flex items-center space-x-3">
            <span>6 Global Bureaus Active</span>
            <span>•</span>
            <span>Open Data Commons</span>
          </div>
        </div>
      </div>

      {/* ⚠️ CLIMATE RESILIENCE ALERT BANNER (Active for Caribbean regions when severe weather detected) */}
      {!isAlertDismissed ? (
        <section 
          aria-label="Climate Resilience Alert"
          className="w-full bg-neutral-950 text-white border-b-2 border-amber-500 relative overflow-hidden shadow-lg"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4">
            
            {/* Alert Header Row */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-neutral-800">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center px-2.5 py-1 rounded text-[11px] font-mono-data font-black uppercase tracking-wider bg-amber-500 text-neutral-950 shadow-sm animate-pulse">
                  <AlertTriangle className="w-3.5 h-3.5 mr-1.5" />
                  {t('alert.title')}
                </span>
                <span className="text-xs font-mono-data text-amber-400 font-bold uppercase tracking-wider">
                  {activeAlert.alertType}
                </span>
                <span className="text-neutral-600 hidden sm:inline">•</span>
                <span className="text-xs text-neutral-300 font-mono-data">
                  {activeAlert.regionName} — <strong className="text-white">{activeAlert.subLocation}</strong>
                </span>
                <span className="text-[10px] text-neutral-400 font-mono-data hidden md:inline">
                  [{activeAlert.coordinates}]
                </span>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                {/* Station tabs for Global severe weather anomalies */}
                <div className="flex items-center space-x-1 bg-neutral-900 p-0.5 rounded-lg border border-neutral-800 text-[10px] font-mono-data">
                  <span className="px-2 py-0.5 text-neutral-500 uppercase font-bold hidden sm:inline">{t('alert.regions')}</span>
                  {CARIBBEAN_WEATHER_ALERTS.map((alert, idx) => (
                    <button
                      key={alert.id}
                      onClick={() => setActiveAlertIndex(idx)}
                      className={`px-2 py-1 rounded transition-colors ${
                        activeAlertIndex === idx
                          ? 'bg-amber-500 text-neutral-950 font-bold'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                      title={`${alert.regionName}: ${alert.alertType}`}
                    >
                      {idx === 0 ? 'Caribbean' : idx === 1 ? 'Sahel/Horn' : idx === 2 ? 'South Asia' : idx === 3 ? 'Amazon' : 'Pacific'}
                    </button>
                  ))}
                </div>

                {/* Toggle details */}
                <button
                  onClick={() => setIsAlertExpanded(!isAlertExpanded)}
                  className="px-2 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white text-xs font-mono-data flex items-center space-x-1 transition-colors"
                  title={isAlertExpanded ? "Collapse telemetry details" : "Expand telemetry details"}
                >
                  <span className="hidden sm:inline">{isAlertExpanded ? t('alert.hide') : t('alert.details')}</span>
                  {isAlertExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {/* Dismiss banner */}
                <button
                  onClick={() => setIsAlertDismissed(true)}
                  className="p-1 text-neutral-400 hover:text-amber-300 rounded hover:bg-neutral-800 transition-colors"
                  title="Dismiss alert banner"
                  aria-label="Dismiss alert"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Alert Headline & Severe Weather Telemetry */}
            <div className="pt-3 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                  <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
                    {activeAlert.headline}
                  </h4>
                </div>
                <span className="text-[11px] font-mono-data text-amber-400/90 font-medium">
                  {activeAlert.updatedAt}
                </span>
              </div>

              {/* 4-Stat Telemetry Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono-data text-xs">
                <div className="p-2.5 rounded-lg bg-neutral-900/95 border border-neutral-800 flex items-center space-x-2.5">
                  <Wind className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div className="truncate">
                    <span className="text-[10px] text-neutral-400 block uppercase">Sustained Wind & Gusts</span>
                    <span className="font-bold text-white">{activeAlert.telemetry.windSpeed}</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-neutral-900/95 border border-neutral-800 flex items-center space-x-2.5">
                  <CloudRain className="w-4 h-4 text-amber-400 shrink-0" />
                  <div className="truncate">
                    <span className="text-[10px] text-neutral-400 block uppercase">Radar Rainfall Rate</span>
                    <span className="font-bold text-amber-300">{activeAlert.telemetry.precipitationForecast}</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-neutral-900/95 border border-neutral-800 flex items-center space-x-2.5">
                  <Activity className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div className="truncate">
                    <span className="text-[10px] text-neutral-400 block uppercase">Barometric Pressure</span>
                    <span className="font-bold text-white">{activeAlert.telemetry.pressure}</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-neutral-900/95 border border-neutral-800 flex items-center space-x-2.5">
                  <Waves className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div className="truncate">
                    <span className="text-[10px] text-neutral-400 block uppercase">Offshore Reef Swell</span>
                    <span className="font-bold text-emerald-400">{activeAlert.telemetry.marineSwell}</span>
                  </div>
                </div>
              </div>

              {/* Expandable Field Status & Safety Actions */}
              {isAlertExpanded && (
                <div className="pt-1.5 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed animate-in fade-in duration-150">
                  <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-800/70 text-neutral-200">
                    <div className="flex items-center space-x-1.5 text-amber-400 font-mono-data text-[10px] font-bold uppercase tracking-wider mb-1">
                      <Shield className="w-3.5 h-3.5 text-amber-400" />
                      <span>{t('alert.fieldStatus')}</span>
                    </div>
                    <p className="text-neutral-300 text-[11px] leading-normal">{activeAlert.fieldStatus}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200">
                    <div className="flex items-center space-x-1.5 text-cyan-400 font-mono-data text-[10px] font-bold uppercase tracking-wider mb-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{t('alert.shelterProtocol')}</span>
                    </div>
                    <p className="text-neutral-300 text-[11px] leading-normal">{activeAlert.safetyAction}</p>
                  </div>
                </div>
              )}
            </div>

          </div>
        </section>
      ) : (
        /* Re-open notification if dismissed */
        <div className="bg-amber-950/90 text-amber-200 border-b border-amber-800/80 py-1.5 px-4 text-xs font-mono-data flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-bold text-white uppercase">{t('alert.title')}:</span>
            <span>Severe weather or climate anomaly detected in {activeAlert.regionName}.</span>
          </div>
          <button
            onClick={() => setIsAlertDismissed(false)}
            className="text-[11px] font-bold text-amber-300 hover:text-white underline cursor-pointer"
          >
            Show Telemetry Detail →
          </button>
        </div>
      )}

      {/* 1. LEAD BREAKING COVER STORY / EDITORIAL HERO */}
      <section className="border-b border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          
          {/* Breaking Wire Label */}
          <div className="flex items-center justify-between pb-6 border-b border-neutral-100 mb-8">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-ping"></span>
              <span className="text-xs font-mono-data uppercase font-extrabold tracking-wider text-cyan-900">
                {t('hero.leadLabel')}
              </span>
            </div>
            <span className="text-xs text-neutral-400 font-mono-data hidden sm:inline">
              {t('hero.verifiedBy')}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Primary Featured Story (8 Cols) */}
            <div className="lg:col-span-8 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-800 border border-amber-200 font-mono-data font-bold uppercase tracking-wider">
                    {leadArticle.category}
                  </span>
                  <span className="text-neutral-400">•</span>
                  <span className="text-neutral-600 flex items-center">
                    <MapPin className="w-3.5 h-3.5 text-cyan-600 mr-1" />
                    {leadArticle.region}
                  </span>
                  <span className="text-neutral-400">•</span>
                  <span 
                    className="text-neutral-600 flex items-center font-medium"
                    title={`Calculated reading time: ${analyzeArticleReadingTime(leadArticle).totalWordCount} total words at 200 WPM`}
                  >
                    <Clock className="w-3.5 h-3.5 mr-1 text-cyan-600" />
                    <span>{getEstimatedReadingTime(leadArticle)}</span>
                    <span className="text-[10px] text-neutral-400 font-mono-data ml-1 hidden sm:inline">
                      ({analyzeArticleReadingTime(leadArticle).bodyWordCount} words)
                    </span>
                  </span>
                </div>

                <h1 
                  onClick={() => onSelectArticle(leadArticle)}
                  className="text-3xl sm:text-5xl font-extrabold text-neutral-950 tracking-tight leading-[1.15] hover:text-cyan-800 transition-colors cursor-pointer"
                >
                  {leadArticle.title}
                </h1>

                <p className="text-lg text-neutral-600 leading-relaxed font-normal">
                  {leadArticle.subtitle}
                </p>

                {/* Hero Image Container */}
                <div 
                  onClick={() => onSelectArticle(leadArticle)}
                  className="rounded-2xl overflow-hidden shadow-lg border border-neutral-200 relative aspect-16/9 cursor-pointer group/img"
                >
                  <img
                    src={getHighResImageUrl(leadArticle.imageUrl, 2400, 88)}
                    srcSet={getResponsiveSrcSet(leadArticle.imageUrl, [800, 1400, 2000, 2400])}
                    sizes="(max-width: 768px) 100vw, 1200px"
                    alt={leadArticle.title}
                    className="w-full h-full object-cover group-hover/img:scale-102 transition-transform duration-500"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent flex flex-col justify-end p-4 sm:p-6 text-white">
                    <p className="text-xs sm:text-sm text-neutral-200 italic line-clamp-2">
                      {leadArticle.imageCaption}
                    </p>
                  </div>
                </div>

                <p className="text-neutral-700 text-sm sm:text-base leading-relaxed line-clamp-3">
                  {leadArticle.excerpt}
                </p>
              </div>

              {/* Action Buttons & Author Byline */}
              <div className="pt-6 mt-6 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={getHighResImageUrl(leadArticle.author.avatar, 400, 90, 'square')}
                    srcSet={getAvatarSrcSet(leadArticle.author.avatar)}
                    alt={leadArticle.author.name}
                    className="w-10 h-10 rounded-full object-cover border border-neutral-200"
                    decoding="async"
                  />
                  <div>
                    <p className="text-xs font-bold text-neutral-950">{leadArticle.author.name}</p>
                    <p className="text-[11px] text-neutral-500">{leadArticle.author.role}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 sm:space-x-3">
                  {onToggleBookmark && (
                    <button
                      onClick={() => onToggleBookmark(leadArticle.id)}
                      title={savedIds.includes(leadArticle.id) ? "Remove from saved" : "Save for later"}
                      className={`p-2.5 rounded-xl border transition-all flex items-center space-x-1.5 text-xs font-semibold ${
                        savedIds.includes(leadArticle.id)
                          ? 'bg-cyan-50 border-cyan-300 text-cyan-800'
                          : 'bg-white hover:bg-neutral-100 border-neutral-200 text-neutral-700'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${savedIds.includes(leadArticle.id) ? 'fill-cyan-600 text-cyan-600' : 'text-neutral-500'}`} />
                      <span className="hidden sm:inline">
                        {savedIds.includes(leadArticle.id) ? 'Saved' : 'Save'}
                      </span>
                    </button>
                  )}

                  <button
                    onClick={() => onSelectArticle(leadArticle)}
                    className="px-5 py-2.5 rounded-xl bg-neutral-950 hover:bg-cyan-900 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center space-x-2 shadow-sm"
                  >
                    <span>{t('hero.readStory')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar Editorial Column (4 Cols) */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-6 lg:border-l lg:border-neutral-200 lg:pl-8">
              
              {/* Vitality Scorecard Widget */}
              <div className="p-5 rounded-2xl bg-neutral-900 text-white space-y-3 shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono-data font-bold uppercase tracking-wider text-cyan-400">
                    Live Vitality Composite
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono-data font-bold bg-emerald-500/20 text-emerald-300">
                    +1.4 pts Q3
                  </span>
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-4xl font-extrabold tracking-tight font-mono-data">72.4</span>
                  <span className="text-neutral-400 text-xs">/ 100 benchmark</span>
                </div>
                <p className="text-xs text-neutral-300 leading-normal">
                  Aggregating real-time clean power adoption, geothermal enthalpy, food stability, and climate resilience metrics across Dominica and Caribbean island territories.
                </p>
                <div className="pt-2">
                  <a 
                    href="#data-hub-section" 
                    className="text-xs font-bold text-cyan-400 hover:text-cyan-300 inline-flex items-center space-x-1"
                  >
                    <span>Inspect Raw Methodology</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Fast Field Dispatches Wire List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                  <span className="text-xs font-bold uppercase tracking-wider font-mono-data text-neutral-900">
                    Field Bureau Dispatches
                  </span>
                  <span className="text-[11px] text-cyan-700 font-semibold font-mono-data">
                    {t('hero.latestWire')}
                  </span>
                </div>

                <div className="space-y-4">
                  {secondaryArticles.slice(0, 3).map((story) => (
                    <article 
                      key={story.id} 
                      onClick={() => onSelectArticle(story)}
                      className="group cursor-pointer space-y-1.5 pb-4 border-b border-neutral-100 last:border-0 last:pb-0 relative"
                    >
                      <div className="flex items-center justify-between text-[11px] text-neutral-500 font-mono-data">
                        <div className="flex items-center space-x-1.5">
                          <span className="text-cyan-700 font-bold uppercase">{story.category}</span>
                          <span>•</span>
                          <span>{story.region}</span>
                          <span>•</span>
                          <span className="flex items-center text-neutral-600 font-medium">
                            <Clock className="w-3 h-3 mr-0.5 text-cyan-600" />
                            {getEstimatedReadingTime(story)}
                          </span>
                        </div>
                        {onToggleBookmark && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleBookmark(story.id);
                            }}
                            title={savedIds.includes(story.id) ? "Remove from saved" : "Save for later"}
                            className="p-1 text-neutral-400 hover:text-cyan-600 transition-colors"
                          >
                            <Bookmark className={`w-3.5 h-3.5 ${savedIds.includes(story.id) ? 'fill-cyan-600 text-cyan-600' : ''}`} />
                          </button>
                        )}
                      </div>
                      <h3 className="text-sm font-bold text-neutral-900 group-hover:text-cyan-700 transition-colors leading-snug">
                        {story.title}
                      </h3>
                      <p className="text-xs text-neutral-500 line-clamp-2">
                        {story.excerpt}
                      </p>
                    </article>
                  ))}
                </div>
              </div>

              {/* Independent Pledge Callout */}
              <div className="p-4 rounded-xl bg-neutral-100 border border-neutral-200 text-xs space-y-2">
                <div className="flex items-center space-x-1.5 text-neutral-900 font-bold font-mono-data uppercase text-[11px]">
                  <ShieldCheck className="w-4 h-4 text-cyan-600" />
                  <span>Pulsewire Integrity Charter</span>
                </div>
                <p className="text-neutral-600 text-[11px] leading-relaxed">
                  We maintain zero commercial banner advertising, algorithmic clickbait, or governmental public relations retainers.
                </p>
                <button
                  onClick={onOpenSupport}
                  className="text-xs font-bold text-cyan-700 hover:text-cyan-900 underline"
                >
                  Join as an Institutional Supporter →
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 2. REAL-TIME VITALITY DASHBOARD STRIP */}
      <section className="bg-neutral-900 text-white border-b border-neutral-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              <h2 className="text-xs font-bold uppercase tracking-wider font-mono-data text-neutral-300">
                Global Development & Resilience Vitality Index (Live Indicators)
              </h2>
            </div>
            <span className="text-[11px] text-neutral-400 font-mono-data">
              Synchronized 10m ago via Open Data Commons
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {vitalityMetrics.map((metric, i) => (
              <div 
                key={i} 
                className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 hover:border-neutral-700 transition-colors space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-neutral-400 truncate pr-2">
                    {metric.title}
                  </span>
                  <span className={`text-[10px] font-mono-data font-bold px-1.5 py-0.5 rounded ${
                    metric.status === 'positive' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                    metric.status === 'warning' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                    'bg-red-950 text-red-400 border border-red-800'
                  }`}>
                    {metric.change}
                  </span>
                </div>

                <div className="flex items-baseline space-x-1.5">
                  <span className="text-2xl sm:text-3xl font-extrabold font-mono-data text-white">
                    {metric.value}
                  </span>
                  <span className="text-xs text-neutral-400 font-mono-data">{metric.unit}</span>
                </div>

                <p className="text-[11px] text-neutral-400 leading-normal line-clamp-2">
                  {metric.descriptor}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE 8 GLOBAL DEVELOPMENT PILLARS (PULSEWIRE IMPACT SYSTEM) */}
      <section id="pillars-section" className="py-16 sm:py-20 border-b border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Section Header */}
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center space-x-2 text-cyan-700 text-xs font-mono-data uppercase font-bold tracking-wider">
              <span>Systemic Action Framework</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">
              The 8 Caribbean Development Pillars
            </h2>
            <p className="text-neutral-600 text-base leading-relaxed">
              Replacing fragmented bureaucratic targets with eight quantifiable, field-verified resilience domains monitored continuously across Dominica and Caribbean island nations.
            </p>
          </div>

          {/* Interactive Pillar Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {IMPACT_PILLARS.map((pillar) => {
              const isSelected = pillar.id === activePillar.id;
              return (
                <button
                  key={pillar.id}
                  onClick={() => onSelectPillar(pillar.id)}
                  className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between h-28 group ${
                    isSelected
                      ? 'border-neutral-950 bg-neutral-950 text-white shadow-md'
                      : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-800'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span 
                      className={`w-6 h-6 rounded flex items-center justify-center font-mono-data text-xs font-bold text-white shadow-sm ${
                        isSelected ? 'bg-cyan-500 text-neutral-950' : ''
                      }`}
                      style={{ backgroundColor: isSelected ? undefined : pillar.color }}
                    >
                      {pillar.number}
                    </span>
                    <span className="text-[10px] font-mono-data text-neutral-400">
                      {pillar.currentProgress}%
                    </span>
                  </div>

                  <p className="text-[11px] font-bold leading-tight line-clamp-2">
                    {pillar.title}
                  </p>

                  {/* Micro Progress Bar */}
                  <div className="w-full bg-neutral-200/50 rounded-full h-1 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ 
                        width: `${pillar.currentProgress}%`, 
                        backgroundColor: isSelected ? '#22d3ee' : pillar.color 
                      }}
                    ></div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Pillar Deep-Dive Card */}
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 sm:p-10 shadow-sm space-y-8 animate-in fade-in duration-300">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column Info */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center space-x-3">
                  <span 
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-mono-data font-bold text-base shadow-sm"
                    style={{ backgroundColor: activePillar.color }}
                  >
                    0{activePillar.number}
                  </span>
                  <div>
                    <span className="text-xs font-mono-data font-bold uppercase tracking-wider text-neutral-500">
                      Pillar {activePillar.code} • 2030 Benchmark
                    </span>
                    <h3 className="text-2xl font-extrabold text-neutral-950 tracking-tight">
                      {activePillar.title}
                    </h3>
                  </div>
                </div>

                <p className="text-base text-neutral-700 leading-relaxed font-normal">
                  {activePillar.description}
                </p>

                <div className="p-4 rounded-xl bg-white border border-neutral-200 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-mono-data">
                    Binding 2030 Field Target:
                  </div>
                  <p className="text-sm font-semibold text-neutral-900">
                    "{activePillar.target2030}"
                  </p>
                </div>
              </div>

              {/* Right Column Progress & Metrics */}
              <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-neutral-200 space-y-5 shadow-sm">
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 font-mono-data">
                      Global Progress Velocity
                    </span>
                    <span className="text-xl font-extrabold font-mono-data text-neutral-950">
                      {activePillar.currentProgress}%
                    </span>
                  </div>
                  <div className="w-full bg-neutral-100 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500" 
                      style={{ width: `${activePillar.currentProgress}%`, backgroundColor: activePillar.color }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-[11px] text-neutral-400 mt-1 font-mono-data">
                    <span>2020 Baseline (0%)</span>
                    <span>2030 Target (100%)</span>
                  </div>
                </div>

                {/* Quantitative Metric Badges */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-neutral-100 text-center">
                  {activePillar.keyMetrics.map((km, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-100">
                      <span className="text-sm sm:text-base font-extrabold font-mono-data text-neutral-950 block">
                        {km.value}
                      </span>
                      <span className="text-[10px] text-neutral-500 font-medium block leading-tight">
                        {km.label}
                      </span>
                      <span className="text-[9px] font-mono-data font-bold text-emerald-600 block mt-0.5">
                        {km.change}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-neutral-500 pt-2 border-t border-neutral-100 font-mono-data">
                  <span>Tracked Funding: <strong className="text-neutral-900">{activePillar.fundingTracked}</strong></span>
                  <span>Active Projects: <strong className="text-neutral-900">{activePillar.activeProjects}</strong></span>
                </div>
              </div>

            </div>

            {/* Related Field Stories under this Pillar */}
            <div className="pt-6 border-t border-neutral-200">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xs font-bold uppercase tracking-wider font-mono-data text-neutral-700">
                  Field Dispatches Tagged with Pillar 0{activePillar.number}
                </h4>
                <button
                  onClick={() => {
                    setDispatchFilter(activePillar.id);
                    const el = document.getElementById('dispatches-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-xs font-bold text-cyan-700 hover:text-cyan-900 flex items-center"
                >
                  <span>View All Related Stories</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {articles.filter(a => a.pillarId === activePillar.id).slice(0, 2).map((story) => (
                  <div
                    key={story.id}
                    onClick={() => onSelectArticle(story)}
                    className="p-4 rounded-xl bg-white border border-neutral-200 hover:border-cyan-500 transition-all cursor-pointer flex space-x-4 items-center group shadow-xs"
                  >
                    <img
                      src={getHighResImageUrl(story.imageUrl, 1200, 88)}
                      srcSet={getResponsiveSrcSet(story.imageUrl, [400, 800, 1200])}
                      sizes="(max-width: 640px) 100px, 160px"
                      alt={story.title}
                      className="w-20 h-20 rounded-lg object-cover shrink-0"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="space-y-1 truncate">
                      <span className="text-[10px] font-mono-data font-bold uppercase text-neutral-400 flex items-center space-x-1.5">
                        <span>{story.region}</span>
                        <span>•</span>
                        <span className="flex items-center text-cyan-700 font-medium">
                          <Clock className="w-3 h-3 mr-0.5" />
                          {getEstimatedReadingTime(story)}
                        </span>
                      </span>
                      <h5 className="text-sm font-bold text-neutral-950 group-hover:text-cyan-700 transition-colors line-clamp-2">
                        {story.title}
                      </h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. REGIONAL DESKS & WHERE WE WORK (GLOBAL NETWORK) */}
      <section id="regional-desks-section" className="py-16 sm:py-20 bg-neutral-900 text-white border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-mono-data uppercase font-bold tracking-wider text-cyan-400">
                164 Nations Under Continuous Observation
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Global Regional Bureaus & Field Desks
              </h2>
              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
                Operating permanent field investigation bureaus across Sub-Saharan Africa, Latin America, South Asia, the Pacific, the Caribbean, and Central Asia to track real human progress and ecological survival.
              </p>
            </div>

            <div className="flex items-center space-x-2 text-xs font-mono-data text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>All 6 Continental Regional Bureaus Active</span>
            </div>
          </div>

          {/* Regional Selector Pills */}
          <div className="flex flex-wrap gap-2">
            {REGIONAL_DESKS.map((desk) => {
              const isSelected = desk.id === activeRegion.id;
              return (
                <button
                  key={desk.id}
                  onClick={() => onSelectRegion(desk.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
                    isSelected
                      ? 'bg-cyan-500 text-neutral-950 shadow-md'
                      : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white'
                  }`}
                >
                  <span>{desk.name}</span>
                  <span className={`text-[10px] font-mono-data px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-neutral-950/20 text-neutral-950 font-bold' : 'bg-neutral-900 text-neutral-400'
                  }`}>
                    {desk.humanVitalityScore} pts
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Region Showcase Box */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center space-x-3">
                <span className="text-xs font-mono-data font-bold text-cyan-400 uppercase tracking-wider">
                  Bureau HQ: {activeRegion.location}
                </span>
                <span className="text-neutral-600">•</span>
                <span className="text-xs text-neutral-400">
                  Bureau Head: <strong className="text-white">{activeRegion.bureauHead}</strong>
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                {activeRegion.name} Strategic Watch
              </h3>

              <p className="text-sm text-neutral-300 leading-relaxed">
                {activeRegion.focusSummary}
              </p>

              {/* Priority Alert Box */}
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/80 text-amber-200 text-xs space-y-1">
                <div className="font-bold font-mono-data uppercase text-[10px] text-amber-400 flex items-center space-x-1.5">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Immediate Bureau Priority Alert</span>
                </div>
                <p className="text-neutral-300 leading-relaxed">
                  {activeRegion.priorityAlert}
                </p>
              </div>

              {/* Regional Stats Grid */}
              <div className="grid grid-cols-3 gap-3 pt-2 font-mono-data">
                <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800">
                  <span className="text-[10px] text-neutral-400 block uppercase">Nations Covered</span>
                  <span className="text-xl font-bold text-white">{activeRegion.activeNations}</span>
                </div>
                <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800">
                  <span className="text-[10px] text-neutral-400 block uppercase">Vitality Score</span>
                  <span className="text-xl font-bold text-emerald-400">{activeRegion.humanVitalityScore}</span>
                </div>
                <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800">
                  <span className="text-[10px] text-neutral-400 block uppercase">Annual Velocity</span>
                  <span className="text-xl font-bold text-cyan-400">{activeRegion.vitalityChange}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-xl overflow-hidden aspect-4/3 relative border border-neutral-800 shadow-xl">
                <img
                  src={getHighResImageUrl(activeRegion.imageUrl, 2000, 88)}
                  srcSet={getResponsiveSrcSet(activeRegion.imageUrl, [600, 1200, 1800, 2400])}
                  sizes="(max-width: 1024px) 100vw, 600px"
                  alt={activeRegion.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-transparent flex flex-col justify-end p-5">
                  <span className="text-xs font-mono-data text-cyan-400 uppercase font-bold">
                    Field Photo Archive
                  </span>
                  <p className="text-xs text-neutral-200">
                    Active investigative missions in {activeRegion.name}
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. INTERACTIVE DATA STUDIO / VITALITY TRACKER */}
      <section id="data-hub-section" className="py-16 sm:py-20 border-b border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center space-x-2 text-cyan-700 text-xs font-mono-data uppercase font-bold tracking-wider">
              <BarChart3 className="w-4 h-4" />
              <span>Pulsewire Data Commons</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">
              Interactive Development Trajectory Visualizer
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Explore multi-year empirical metrics verified by independent satellite readings, public expenditure audits, and local census records.
            </p>
          </div>

          {/* Dataset Switcher Buttons */}
          <div className="flex flex-wrap gap-2 border-b border-neutral-200 pb-4">
            <button
              onClick={() => setActiveChartDataset('clean-energy')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeChartDataset === 'clean-energy'
                  ? 'bg-neutral-950 text-white shadow-sm'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              1. Clean Energy Microgrid Acceleration
            </button>
            <button
              onClick={() => setActiveChartDataset('water-resilience')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeChartDataset === 'water-resilience'
                  ? 'bg-neutral-950 text-white shadow-sm'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              2. Indigenous Watershed Defense (ha)
            </button>
            <button
              onClick={() => setActiveChartDataset('debt-gap')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeChartDataset === 'debt-gap'
                  ? 'bg-neutral-950 text-white shadow-sm'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              3. Climate Adaptation Capital Disparity
            </button>
          </div>

          {/* Dynamic SVG Visual Chart Card */}
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 sm:p-10 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-neutral-950">
                  {currentChart.title}
                </h3>
                <p className="text-xs text-neutral-500 font-mono-data mt-0.5">
                  Trajectory: 2021 – 2026 Observed vs 2030 Mandated Benchmark
                </p>
              </div>

              <button
                onClick={handleExportCsv}
                className="inline-flex items-center text-xs font-bold text-neutral-700 hover:text-neutral-950 bg-white border border-neutral-300 px-3.5 py-2 rounded-lg transition-colors shadow-xs"
              >
                <Download className="w-3.5 h-3.5 mr-1.5 text-neutral-500" />
                Export CSV Dataset
              </button>
            </div>

            {/* SVG Interactive Chart Component */}
            <div className="bg-white p-6 rounded-xl border border-neutral-200 space-y-4">
              
              {/* Benchmark Target Indicator */}
              <div className="flex items-center justify-between text-xs font-mono-data text-neutral-600 pb-2 border-b border-dashed border-neutral-200">
                <span className="flex items-center text-cyan-800 font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-600 mr-1.5"></span>
                  {currentChart.benchmarkLabel}
                </span>
                <span className="font-bold text-neutral-900">
                  Current Observed: {currentChart.values[currentChart.values.length - 1]}
                </span>
              </div>

              {/* Bar Chart Visualization */}
              <div className="grid grid-cols-6 gap-2 sm:gap-6 items-end h-56 pt-6 pb-2">
                {currentChart.years.map((yr, idx) => {
                  const val = currentChart.values[idx];
                  const maxVal = currentChart.benchmark;
                  const heightPercent = Math.min(100, Math.round((val / maxVal) * 100));

                  return (
                    <div key={yr} className="flex flex-col items-center h-full justify-end group/bar">
                      
                      {/* Tooltip on hover */}
                      <span className="text-[11px] font-mono-data font-bold text-neutral-800 mb-1 opacity-80 group-hover/bar:opacity-100 group-hover/bar:text-cyan-700 transition-opacity">
                        {val}
                      </span>

                      {/* Bar fill */}
                      <div className="w-full max-w-[42px] bg-neutral-100 rounded-t-lg overflow-hidden h-full flex items-end">
                        <div
                          className="w-full bg-cyan-600 group-hover/bar:bg-cyan-500 transition-all duration-500 rounded-t-lg"
                          style={{ height: `${heightPercent}%` }}
                        ></div>
                      </div>

                      {/* Year label */}
                      <span className="text-xs font-mono-data text-neutral-500 mt-2 font-medium">
                        {yr}
                      </span>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Key Analytical Takeaway Callout */}
            <div className="p-4 rounded-xl bg-cyan-50/70 border border-cyan-200/80 text-xs text-neutral-800 flex items-start space-x-3">
              <Sparkles className="w-4 h-4 text-cyan-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-cyan-950">Pulsewire Data Desk Analysis: </strong>
                <span>{currentChart.insight}</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. LATEST INVESTIGATIVE FIELD DISPATCHES GRID */}
      <section id="dispatches-section" className="py-16 sm:py-20 border-b border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center space-x-2 text-cyan-700 text-xs font-mono-data uppercase font-bold tracking-wider">
                <span>Direct Field Reports</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">
                Investigations & Field Dispatches
              </h2>
              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                Ground-level investigative accounts from the front lines of renewable transition, water defense, and economic self-determination.
              </p>
            </div>

            {/* Category & Region Filter Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              {/* Active Region Geographic Filter Indicator */}
              {selectedRegionId && selectedRegionId !== 'all' && (
                <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-cyan-50 border border-cyan-200 text-xs font-mono-data text-cyan-950">
                  <Globe className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                  <span>Region: <strong className="font-bold">{activeRegion?.name || selectedRegionId}</strong></span>
                  <button
                    onClick={() => onSelectRegion('all')}
                    className="ml-1 p-0.5 hover:bg-cyan-200 rounded text-cyan-800 transition-colors"
                    title="Clear region filter"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Category Filter Chips */}
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'all', label: 'All Dispatches' },
                  { id: 'clean-energy', label: 'Energy' },
                  { id: 'biodiversity', label: 'Biosphere' },
                  { id: 'digital-commons', label: 'Digital' },
                  { id: 'climate-adaptation', label: 'Climate' },
                  { id: 'food-water', label: 'Food & Water' }
                ].map((pill) => (
                  <button
                    key={pill.id}
                    onClick={() => setDispatchFilter(pill.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      dispatchFilter === pill.id
                        ? 'bg-neutral-900 text-white'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    {pill.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Stories 3-Column Grid or Empty State */}
          {filteredArticles.length === 0 ? (
            <div className="text-center py-16 px-4 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-4">
              <Globe className="w-10 h-10 text-neutral-400 mx-auto" />
              <div className="space-y-1">
                <h3 className="text-base font-bold text-neutral-900">No dispatches found for this selection</h3>
                <p className="text-xs text-neutral-500 max-w-md mx-auto">
                  There are no articles currently matching both the "{activeRegion?.name}" region filter and "{dispatchFilter}" category filter.
                </p>
              </div>
              <div className="flex items-center justify-center space-x-3 pt-2">
                <button
                  onClick={() => setDispatchFilter('all')}
                  className="px-4 py-2 rounded-xl bg-neutral-200 text-neutral-800 text-xs font-semibold hover:bg-neutral-300 transition-colors"
                >
                  Show All Categories
                </button>
                <button
                  onClick={() => onSelectRegion('all')}
                  className="px-4 py-2 rounded-xl bg-cyan-600 text-white text-xs font-semibold hover:bg-cyan-700 transition-colors"
                >
                  Show All Worldwide Regions
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <article
                  key={article.id}
                  onClick={() => onSelectArticle(article)}
                  className="bg-neutral-50 rounded-2xl border border-neutral-200 overflow-hidden hover:border-neutral-400 transition-all cursor-pointer flex flex-col justify-between group shadow-xs hover:shadow-md"
                >
                  <div>
                    {/* Photo Container */}
                    <div className="aspect-16/10 overflow-hidden relative bg-neutral-200">
                      <img
                        src={getHighResImageUrl(article.imageUrl, 1600, 88)}
                        srcSet={getResponsiveSrcSet(article.imageUrl, [600, 1000, 1600])}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute top-3 left-3 flex items-center space-x-1.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-neutral-950/80 backdrop-blur text-white font-mono-data">
                          {article.category}
                        </span>
                      </div>

                      {/* Prominent Estimated Reading Time Badge on Image */}
                      <div className="absolute bottom-3 left-3 flex items-center space-x-1.5">
                        <span 
                          className="px-2 py-0.5 rounded text-[10px] font-bold bg-neutral-950/85 backdrop-blur text-cyan-300 font-mono-data flex items-center shadow-xs border border-white/10"
                          title={`Estimated reading time: ${getEstimatedReadingTime(article)} (~${analyzeArticleReadingTime(article).totalWordCount} total words at 200 WPM)`}
                        >
                          <Clock className="w-3 h-3 mr-1 text-cyan-400 shrink-0" />
                          <span>{getEstimatedReadingTime(article)}</span>
                        </span>
                      </div>

                      {/* Quick Bookmark Toggle Button on Card */}
                      {onToggleBookmark && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleBookmark(article.id);
                          }}
                          title={savedIds.includes(article.id) ? "Remove from saved" : "Save for later"}
                          className={`absolute top-3 right-3 p-2 rounded-lg backdrop-blur transition-all ${
                            savedIds.includes(article.id)
                              ? 'bg-cyan-500 text-neutral-950 shadow-md'
                              : 'bg-neutral-950/60 hover:bg-neutral-950 text-white'
                          }`}
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${savedIds.includes(article.id) ? 'fill-current' : ''}`} />
                        </button>
                      )}
                    </div>

                    {/* Body Content */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center space-x-2 text-[11px] text-neutral-500 font-mono-data">
                        <span>{article.region}</span>
                        <span>•</span>
                        <span className="flex items-center font-medium text-neutral-700">
                          <Clock className="w-3.5 h-3.5 mr-1 text-cyan-600" />
                          {getEstimatedReadingTime(article)}
                        </span>
                        <span>•</span>
                        <span className="text-neutral-400 text-[10px]">
                          ({analyzeArticleReadingTime(article).bodyWordCount} words)
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-neutral-950 group-hover:text-cyan-700 transition-colors leading-snug">
                        {article.title}
                      </h3>

                      <p className="text-xs text-neutral-600 leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Author Footer */}
                  <div className="p-6 pt-0 border-t border-neutral-200/60 mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <img
                        src={getHighResImageUrl(article.author.avatar, 300, 90, 'square')}
                        srcSet={getAvatarSrcSet(article.author.avatar)}
                        alt={article.author.name}
                        className="w-7 h-7 rounded-full object-cover border border-neutral-200"
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="text-xs font-semibold text-neutral-800">
                        {article.author.name}
                      </span>
                    </div>

                    <span className="text-xs font-bold text-cyan-700 group-hover:translate-x-1 transition-transform inline-flex items-center">
                      Read →
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* 7. FIRST-PERSON VOICES FROM THE GROUND */}
      <section className="py-16 sm:py-20 bg-neutral-950 text-white border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono-data uppercase font-bold tracking-wider text-cyan-400">
                Voices of Resilience
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight">
                "We do not wait for bureaucratic aid that arrives five years after our topsoil washes away."
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Direct testimonials from the engineers, village trust chairs, and indigenous rangers reshaping their ecosystems without foreign paternalism.
              </p>
              <div className="pt-2">
                <button
                  onClick={onOpenSupport}
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center space-x-2"
                >
                  <span>Empower Community Field Teams</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
              
              <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
                <Quote className="w-6 h-6 text-cyan-400 opacity-60" />
                <p className="text-xs text-neutral-300 italic leading-relaxed">
                  "By scaling decentralized geothermal and solar microgrids across East Africa and the Caribbean, our communities have established real sovereignty from imported fossil fuels. When climate disasters strike, our clinics and schools stay fully powered."
                </p>
                <div className="pt-2 border-t border-neutral-800 flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-cyan-900/60 border border-cyan-700 flex items-center justify-center font-bold text-cyan-300 text-xs">
                    AO
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Dr. Amina Osei</p>
                    <p className="text-[10px] text-neutral-400">Thermal Energy Director, Nairobi Bureau</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
                <Quote className="w-6 h-6 text-cyan-400 opacity-60" />
                <p className="text-xs text-neutral-300 italic leading-relaxed">
                  "Combining indigenous ancestral knowledge with open satellite radar telemetry gives our rangers the power to defend millions of hectares. We are proving that community land rights are the world's most effective carbon defense shield."
                </p>
                <div className="pt-2 border-t border-neutral-800 flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-900/60 border border-emerald-700 flex items-center justify-center font-bold text-emerald-300 text-xs">
                    JS
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Chief Juarez Saw</p>
                    <p className="text-[10px] text-neutral-400">Munduruku Council Leader, Tapajós Basin</p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 8. FLAGSHIP PUBLICATIONS & POLICY BRIEFS */}
      <section id="publications-section" className="py-16 sm:py-20 border-b border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-mono-data uppercase font-bold tracking-wider text-cyan-700">
                Rigorous Field Research
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">
                Flagship Publications & Strategic Reports
              </h2>
              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                Peer-reviewed policy monographs, legal templates for nature-debt swaps, and open technical blueprints.
              </p>
            </div>

            <span className="text-xs font-mono-data text-neutral-500">
              Creative Commons BY-NC 4.0 Open Access
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PUBLICATIONS.map((pub) => (
              <div
                key={pub.id}
                onClick={() => onSelectPublication(pub)}
                className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 flex flex-col justify-between hover:border-cyan-500 transition-all cursor-pointer group shadow-xs hover:shadow-md"
              >
                <div className="space-y-4">
                  <div className="aspect-16/10 rounded-xl overflow-hidden shadow-sm border border-neutral-200 relative bg-neutral-900">
                    <img
                      src={getHighResImageUrl(pub.coverImage, 1600, 90)}
                      srcSet={getResponsiveSrcSet(pub.coverImage, [600, 1000, 1600])}
                      sizes="(max-width: 768px) 100vw, 400px"
                      alt={pub.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-mono-data font-bold bg-neutral-950 text-white">
                      {pub.pages} Pages
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono-data font-bold uppercase text-cyan-800">
                      {pub.edition}
                    </span>
                    <h3 className="text-base font-bold text-neutral-950 group-hover:text-cyan-700 transition-colors leading-snug mt-1">
                      {pub.title}
                    </h3>
                  </div>

                  <p className="text-xs text-neutral-600 leading-relaxed line-clamp-3">
                    {pub.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-200/80 mt-4 flex items-center justify-between">
                  <span className="text-[11px] font-mono-data text-neutral-500">
                    {pub.downloadCount} reads
                  </span>
                  <span className="text-xs font-bold text-cyan-700 flex items-center group-hover:underline">
                    <Download className="w-3.5 h-3.5 mr-1" />
                    Read & Download →
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. INDEPENDENCE CHARTER & EDITORIAL GOVERNANCE */}
      <section id="about-charter-section" className="py-16 sm:py-20 bg-neutral-100 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono-data uppercase font-bold tracking-wider text-cyan-800">
              Zero Propaganda • Zero Censorship
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">
              The Pulsewire Independence Charter
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Why independent global reporting and development verification cannot be governed by state actors, diplomatic committees, or commercial advertising cartels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-2xl bg-white border border-neutral-200 space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-700">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-neutral-950">
                1. Structural Editorial Autonomy
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Pulsewire is held in an irrevocable public trust. No government donor, corporate benefactor, or foundation board member has editorial preview privileges or redaction authority.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-neutral-200 space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-700">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-neutral-950">
                2. Open Telemetry & Methodology
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Every investigative finding is paired with raw orbital sensor telemetry, geo-coordinates, and peer-reviewed code. Our data commons is open source for researchers everywhere.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-neutral-200 space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-700">
                <Radio className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-neutral-950">
                3. Decentralized Field Leadership
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Rather than parachuting correspondents from Western capitals, over 90% of Pulsewire dispatches are directed and authored by resident journalists rooted in the regions they cover.
              </p>
            </div>

          </div>

          {/* CTA Banner */}
          <div className="rounded-2xl bg-neutral-950 text-white p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                Keep Caribbean & Dominica Truth Free and Open
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 max-w-xl">
                Support our independent correspondents, radar analysts, and legal defense taskforces across Dominica and the Caribbean.
              </p>
            </div>

            <button
              onClick={onOpenSupport}
              className="px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center space-x-2 shrink-0 shadow"
            >
              <span>Contribute to Pulsewire</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

    </main>
  );
};
