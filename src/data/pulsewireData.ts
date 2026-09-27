export interface Article {
  id: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: string;
  pillarId: string;
  region: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  imageUrl: string;
  imageCaption: string;
  featured?: boolean;
  breaking?: boolean;
  content: string[];
  keyFindings: string[];
  audioMinutes?: number;
}

export interface ImpactPillar {
  id: string;
  code: string;
  number: number;
  title: string;
  tagline: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
  iconName: string;
  target2030: string;
  currentProgress: number; // percentage
  activeProjects: number;
  fundingTracked: string;
  keyMetrics: { label: string; value: string; change: string }[];
}

export interface RegionalDesk {
  id: string;
  name: string;
  bureauHead: string;
  location: string;
  activeNations: number;
  featuredStoriesCount: number;
  focusSummary: string;
  humanVitalityScore: number; // 0 - 100
  vitalityChange: string;
  priorityAlert: string;
  imageUrl: string;
}

export interface Publication {
  id: string;
  title: string;
  edition: string;
  category: string;
  pages: number;
  releaseDate: string;
  summary: string;
  downloadCount: string;
  coverImage: string;
  highlights: string[];
}

export interface LiveVitalityMetric {
  title: string;
  value: string;
  unit: string;
  change: string;
  status: 'positive' | 'warning' | 'critical' | 'neutral';
  descriptor: string;
}

export const VITALITY_METRICS: LiveVitalityMetric[] = [
  {
    title: "Global Clean Power Grid Capacity",
    value: "44.8",
    unit: "%",
    change: "+7.2% YoY",
    status: "positive",
    descriptor: "Paced by accelerated solar microgrids in Sub-Saharan Africa and geothermal expansion in the Caribbean and East Africa."
  },
  {
    title: "Protected Biosphere & Indigenous Terrains",
    value: "31.4",
    unit: "%",
    change: "+3.8% YoY",
    status: "positive",
    descriptor: "30x30 target tracking across Amazonian demarcated reserves, African wildlife corridors, and Pacific marine sanctuaries."
  },
  {
    title: "Sovereign Climate Debt Clause Adoption",
    value: "58.2",
    unit: "%",
    change: "+18.4% YoY",
    status: "positive",
    descriptor: "Bridgetown Initiative catastrophe pause covenants integrated into emerging market sovereign debt issuances."
  },
  {
    title: "Decentralized Water & Food Resilience",
    value: "64.7",
    unit: "%",
    change: "+9.1% YoY",
    status: "positive",
    descriptor: "Community-managed solar aquifers, drought-tolerant seed banks, and coastal agroecology across 84 vulnerable territories."
  }
];

export const IMPACT_PILLARS: ImpactPillar[] = [
  {
    id: "clean-energy",
    code: "PW-01",
    number: 1,
    title: "Decarbonized Grid & Clean Power",
    tagline: "Universal, affordable, and zero-carbon energy access worldwide",
    description: "Accelerating geothermal enthalpy, distributed solar microgrids, and utility-scale battery storage across frontline emerging economies and island territories.",
    color: "#E59E00",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500",
    iconName: "Zap",
    target2030: "100% renewable energy access for 800 million underserved citizens",
    currentProgress: 68,
    activeProjects: 342,
    fundingTracked: "$1.42B",
    keyMetrics: [
      { label: "Microgrids Active", value: "2,840", change: "+42% YoY" },
      { label: "GW Renewable Added", value: "38.4 GW", change: "+26% YoY" },
      { label: "Diesel Displaced", value: "340M gal", change: "-31% emissions" }
    ]
  },
  {
    id: "food-water",
    code: "PW-02",
    number: 2,
    title: "Resilient Food & Water Systems",
    tagline: "Agroecology, watershed restoration, and food sovereignty",
    description: "Equipping smallholder farming networks with climate-resistant seed banks, solar drip irrigation, and ancestral terracing from the Sahel to the Andes.",
    color: "#16A34A",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500",
    iconName: "Droplets",
    target2030: "Zero catastrophic crop failure across critical agricultural watersheds",
    currentProgress: 61,
    activeProjects: 418,
    fundingTracked: "$890M",
    keyMetrics: [
      { label: "Hectares Restored", value: "4.8M ha", change: "+18% YoY" },
      { label: "Solar Wells Drilled", value: "6,200", change: "+54% YoY" },
      { label: "Seed Banks Formed", value: "840", change: "+32% YoY" }
    ]
  },
  {
    id: "economic-equity",
    code: "PW-03",
    number: 3,
    title: "Sovereign Debt Reform & Capital Access",
    tagline: "Fair climate financing, debt pause clauses, and local currency capital",
    description: "Tracking the restructuring of bilateral and multilateral debts, carbon credit integrity, and sovereign green bonds under the Bridgetown Initiative.",
    color: "#0891B2",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500",
    iconName: "TrendingUp",
    target2030: "All international climate adaptation loans transitioned to concessional grants",
    currentProgress: 52,
    activeProjects: 184,
    fundingTracked: "$3.8B",
    keyMetrics: [
      { label: "Debt Swapped for Nature", value: "$4.2B", change: "+64% YoY" },
      { label: "Catastrophe Clauses", value: "42 nations", change: "+18 this year" },
      { label: "Grant Ratio in Adaptation", value: "46%", change: "+12% YoY" }
    ]
  },
  {
    id: "digital-commons",
    code: "PW-04",
    number: 4,
    title: "Digital Public Infrastructure",
    tagline: "Open-source telemetry, public software rails, and data sovereignty",
    description: "Deploying open geospatial monitoring, satellite radar sensors, and community-owned data cooperatives to ensure digital autonomy worldwide.",
    color: "#4F46E5",
    bgColor: "bg-indigo-500/10",
    borderColor: "border-indigo-500",
    iconName: "Cpu",
    target2030: "Universal public digital identity and telemetry access across all 164 monitored nations",
    currentProgress: 76,
    activeProjects: 290,
    fundingTracked: "$620M",
    keyMetrics: [
      { label: "Open Sat Sensors Live", value: "1,450", change: "+88% YoY" },
      { label: "Municipalities on Open Rails", value: "520", change: "+45% YoY" },
      { label: "Open Data Commons PBs", value: "18.4 PB", change: "+92% YoY" }
    ]
  },
  {
    id: "climate-adaptation",
    code: "PW-05",
    number: 5,
    title: "Climate Defense & Disaster Shield",
    tagline: "Early warning sensors, Category-5 infrastructure, and bio-shields",
    description: "Hardening coastal seawalls, mangrove buffer lagoons, and subterranean electric utilities to withstand super-typhoons and flash droughts.",
    color: "#DC2626",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500",
    iconName: "ShieldAlert",
    target2030: "Zero preventable casualties from extreme weather via 100% early warning coverage",
    currentProgress: 81,
    activeProjects: 365,
    fundingTracked: "$1.15B",
    keyMetrics: [
      { label: "Early Warning Radar Hubs", value: "840", change: "+36% YoY" },
      { label: "Category-5 Shelters", value: "2,100", change: "+24% YoY" },
      { label: "Subterranean Conduits", value: "4,600 km", change: "+52% YoY" }
    ]
  },
  {
    id: "public-health",
    code: "PW-06",
    number: 6,
    title: "Frontline Health Infrastructure",
    tagline: "Decentralized medicine, solar cold-chains, and community clinics",
    description: "Building solar-powered health centers, regional vaccine production, and clean clinic sanitation to insulate communities from climate-induced epidemics.",
    color: "#059669",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500",
    iconName: "Activity",
    target2030: "100% of rural clinics with 24/7 continuous clean power and refrigerated cold-chains",
    currentProgress: 69,
    activeProjects: 240,
    fundingTracked: "$510M",
    keyMetrics: [
      { label: "Clinics Solarized", value: "3,800", change: "+31% YoY" },
      { label: "Cold-Chain Units Active", value: "14,200", change: "+44% YoY" },
      { label: "Telemedicine Hubs", value: "960", change: "+60% YoY" }
    ]
  },
  {
    id: "biodiversity",
    code: "PW-07",
    number: 7,
    title: "Ecological Restoration & Oceans",
    tagline: "Indigenous forest demarcation, coral nursery grids, and marine sanctuaries",
    description: "Defending old-growth rainforests, restoring degraded mangrove estuaries, and outlawing bottom-trawling in vital marine whale and fishery corridors.",
    color: "#15803D",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500",
    iconName: "Globe",
    target2030: "Protect 30% of global marine and terrestrial habitats under indigenous stewardship",
    currentProgress: 58,
    activeProjects: 310,
    fundingTracked: "$920M",
    keyMetrics: [
      { label: "Marine Sanctuaries", value: "1.2M sq km", change: "+28% YoY" },
      { label: "Indigenous Land Demarcated", value: "18.2M ha", change: "+14% YoY" },
      { label: "Coral Micro-Fragments", value: "620,000", change: "+72% YoY" }
    ]
  },
  {
    id: "civic-integrity",
    code: "PW-08",
    number: 8,
    title: "Accountable Governance & Public Budgets",
    tagline: "Open expenditure tracking, procurement transparency, and civic oversight",
    description: "Providing public ledger audits for climate adaptation grants, anti-corruption monitoring, and open participatory planning across 164 countries.",
    color: "#7C3AED",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500",
    iconName: "Scale",
    target2030: "100% of international development projects auditable with verified public milestones",
    currentProgress: 65,
    activeProjects: 195,
    fundingTracked: "$340M",
    keyMetrics: [
      { label: "Tenders Audited Publicly", value: "8,400", change: "$320M saved" },
      { label: "Participatory Townhalls", value: "1,850", change: "+35% YoY" },
      { label: "Open Budget Portals", value: "64 nations", change: "+14 this year" }
    ]
  }
];

export const REGIONAL_DESKS: RegionalDesk[] = [
  {
    id: "sub-saharan-africa",
    name: "Sub-Saharan Africa",
    bureauHead: "Dr. Amina Osei",
    location: "Nairobi Bureau HQ & Dakar Center",
    activeNations: 48,
    featuredStoriesCount: 142,
    focusSummary: "Rift Valley geothermal enthalpy, Sahel solar aquifers, community mini-grids, and decentralized agroforestry combating desertification across the Great Green Wall.",
    humanVitalityScore: 74.8,
    vitalityChange: "+4.2 pts",
    priorityAlert: "Kenya and Senegal expand decentralized rural microgrid connectivity to 14 million citizens.",
    imageUrl: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1600&q=88"
  },
  {
    id: "latin-america-caribbean",
    name: "Latin America & Caribbean",
    bureauHead: "Mariana Alencar & Daphne Etienne",
    location: "Belém Bureau & Roseau Caribbean Hub",
    activeNations: 33,
    featuredStoriesCount: 126,
    focusSummary: "Amazonian indigenous land demarcation, Dominica geothermal resilience, Caribbean catastrophe debt pauses under the Bridgetown Initiative, and Andean watershed defense.",
    humanVitalityScore: 79.5,
    vitalityChange: "+3.6 pts",
    priorityAlert: "Tapajós basin demarcates 4M hectares; Dominica launches 120MW Roseau Valley geothermal transmission.",
    imageUrl: "https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=1600&q=88"
  },
  {
    id: "south-southeast-asia",
    name: "South & Southeast Asia",
    bureauHead: "Devraj Mukherjee",
    location: "Bangkok Regional Desk & Dhaka Bureau",
    activeNations: 24,
    featuredStoriesCount: 118,
    focusSummary: "Mekong river delta hydrological modeling, Sundarbans women-led solar cooperatives, resilient salinity-tolerant rice variants, and heat-resilient urban cooling corridors.",
    humanVitalityScore: 76.2,
    vitalityChange: "+2.8 pts",
    priorityAlert: "Bangladesh climate loss & damage fund disburses $180M for cyclone shelter reinforcement.",
    imageUrl: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1600&q=88"
  },
  {
    id: "pacific-islands-sids",
    name: "Pacific Islands & SIDS",
    bureauHead: "Talia Tuisamoa",
    location: "Suva Bureau & Funafuti Observation Post",
    activeNations: 18,
    featuredStoriesCount: 94,
    focusSummary: "Atoll sea defense innovations, digital sovereignty archives in Tuvalu and Kiribati, oceanic sperm whale and shark sanctuaries, and sovereign blue carbon finance.",
    humanVitalityScore: 77.9,
    vitalityChange: "+3.1 pts",
    priorityAlert: "Pacific Islands Forum ratifies treaty ensuring digital statehood permanence regardless of sea level change.",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=88"
  },
  {
    id: "middle-east-north-africa",
    name: "Middle East & North Africa",
    bureauHead: "Tariq Mansoor",
    location: "Amman Bureau & Rabat Innovation Hub",
    activeNations: 20,
    featuredStoriesCount: 82,
    focusSummary: "Solar desalination grids, hyper-arid atmospheric water harvesting, ancient qanat restoration, and North African green hydrogen export infrastructure.",
    humanVitalityScore: 73.1,
    vitalityChange: "+2.2 pts",
    priorityAlert: "Morocco and Jordan scale concentrated solar thermal desalination producing 400M cubic meters of fresh water.",
    imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1600&q=88"
  },
  {
    id: "europe-central-asia",
    name: "Europe & Central Asia",
    bureauHead: "Elena Volkova",
    location: "Geneva Policy Center & Almaty Bureau",
    activeNations: 21,
    featuredStoriesCount: 78,
    focusSummary: "Transboundary glacier runoff telemetry in the Pamir and Tian Shan mountains, Aral Sea basin re-vegetation, and multilateral environmental treaty compliance.",
    humanVitalityScore: 81.3,
    vitalityChange: "+1.9 pts",
    priorityAlert: "Central Asian water-energy consortium establishes automated telemetry across 600 high-altitude glacial streams.",
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=88"
  }
];

export const ARTICLES: Article[] = [
  {
    id: "global-clean-power-shift",
    title: "The Continental Shift: How Decentralized Solar & Geothermal Grids Are Powering 300 Million Across the Global South",
    subtitle: "From the volcanic steam of Kenya's Great Rift Valley and Dominica's Roseau highlands to community solar mini-grids across the Sundarbans, frontline regions are leapfrogging obsolete fossil fuel infrastructure to establish clean, sovereign power grids.",
    excerpt: "An investigative field dispatch examining how decentralized renewable generation, underground distribution conduits, and local energy cooperatives are insulating developing economies from volatile fossil markets and extreme weather disruptions.",
    category: "Energy Transition",
    pillarId: "clean-energy",
    region: "Worldwide Field Desks",
    author: {
      name: "Dr. Amina Osei & Daphne Etienne",
      role: "Senior Global Energy Investigation Desk",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&crop=faces&w=400&h=400&q=90"
    },
    publishedAt: "September 26, 2026",
    readTime: "9 min read",
    audioMinutes: 11,
    imageUrl: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=2400&q=88",
    imageCaption: "Engineers inspect production wellheads and solar microgrid battery arrays that operate in tandem to supply uninterrupted baseload power across remote communities.",
    featured: true,
    breaking: false,
    keyFindings: [
      "Decentralized renewable power installations across 42 developing nations added 38.4 GW in 2025-2026, outpacing centralized fossil thermal builds by 3 to 1.",
      "Dominica's Laudat geothermal project and Kenya's Olkaria field expansion have driven commercial generation costs down by 48% relative to imported diesel benchmarks.",
      "Over 12,000 community-owned mini-grids now provide 24/7 power to rural healthcare clinics, cold-storage warehouses, and schools with 99.4% uptime during climate emergencies.",
      "High-voltage direct current (HVDC) regional links enable surplus renewable exports between neighboring sovereign territories without transmitting through carbon-heavy national grids."
    ],
    content: [
      "Across the emerald volcanic escarpments of East Africa's Great Rift Valley and the rugged peaks of the Caribbean's Morne Trois Pitons, a quiet technological revolution has rewritten the geopolitical calculus of global energy access.",
      "For over half a century, conventional economic planning insisted that rural electrification and industrial growth in developing regions required massive, centralized fossil fuel power stations connected by thousands of kilometers of vulnerable overland transmission lines. Developing states spent billions in scarce foreign exchange each month importing heavy fuel oil and diesel, leaving their national economies at the mercy of global supply shocks.",
      "Today, that paradigm is collapsing. In Kenya, geothermal enthalpy from the earth's mantle now generates over 85% of baseload electricity. In the Commonwealth of Dominica, high-pressure volcanic wells in the Roseau Valley are coming online to make the island nation 100% renewably powered while exporting clean power to neighboring territories. Across South Asia and the Sahel, solar-plus-storage mini-grids are operating as resilient islanded micro-utilities.",
      "'We are not simply changing the fuel source; we are changing who owns the resilience,' explains Dr. Amina Osei from Nairobi. 'When an extreme storm or fuel crisis strikes, these decentralized community systems continue generating power uninterrupted. It is sovereign, local, and unstoppable.'",
      "Pulsewire's correspondents visited sixty-four installations across Africa, Latin America, and Southeast Asia. The data reveals that decentralized clean generation is not merely cleaner; it is dramatically cheaper to deploy. The levelized cost of energy from hybrid solar-geothermal mini-grids has plummeted below 7 cents per kilowatt-hour, versus 28 cents for diesel generator alternatives.",
      "As multilateral financing mechanisms begin acknowledging these realities, investment is shifting from fossil fuel megaprojects to community-scale renewable commons, laying the foundation for permanent energy independence across the Global South."
    ]
  },
  {
    id: "tapajos-amazon-demarcation",
    title: "The Living Canopy: Satellite Telemetry and Indigenous Demarcation Reclaim 4 Million Hectares in the Tapajós Basin",
    subtitle: "Deep in the Brazilian Amazon, Munduruku cartographers and open-source radar satellites have documented and halted illegal deforestation corridors, establishing sovereign ancestral boundaries that protect one of Earth's vital carbon sinks.",
    excerpt: "Inside the sovereign indigenous monitoring network that blends multispectral satellite alerts with ground patrols to safeguard primary rainforest against illegal extractive incursions.",
    category: "Biosphere Defense",
    pillarId: "biodiversity",
    region: "Latin America & Amazonia",
    author: {
      name: "Mariana Alencar",
      role: "Amazonia Field Correspondent, Belém Bureau",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&crop=faces&w=400&h=400&q=90"
    },
    publishedAt: "September 24, 2026",
    readTime: "7 min read",
    audioMinutes: 8,
    imageUrl: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=2400&q=88",
    imageCaption: "Munduruku community cartographers verify boundary coordinates along the Tapajós River using ruggedized satellite GPS receivers and real-time radar canopy imagery.",
    featured: false,
    breaking: true,
    keyFindings: [
      "Autonomous indigenous patrols using Sentinel-1 synthetic aperture radar reduced illegal clearing by 76% in the Sawré Muybu territory.",
      "Over 4.2 million contiguous hectares of primary rainforest have been legally gazetted and demarcated with permanent federal title.",
      "Canopy carbon density in demarcated indigenous lands remains 3.4 times higher than adjacent unprotected public lands.",
      "Open-source drone photogrammetry enables immediate legal enforcement actions by federal environmental defense authorities."
    ],
    content: [
      "Along the meandering amber tributaries of the Tapajós River, the canopy stands unbroken: towering ceiba trees, ancient Brazil nut groves, and winding waterways that feed the heartbeat of the Amazon basin.",
      "For years, this critical biodiversity sanctuary was threatened by wildcat gold dredges and illegal logging roads that gnawed at the forest margins. Today, the Munduruku people have combined centuries-old ancestral stewardship with cutting-edge aerospace technology to establish a continuous defensive perimeter.",
      "Equipped with synthetic aperture radar that penetrates cloud cover and dense tree canopies, youth cartographers receive automated alerts whenever a single tree falls. Within hours, ground teams deploy to intercept incursions, transmitting geo-tagged telemetry directly to federal prosecutors.",
      "'The forest is not empty land waiting to be cleared,' explains tribal council leader Chief Juarez Saw. 'It is a living technological system that regulates rainfall for the entire continent. When we defend this border, we defend the global climate.'"
    ]
  },
  {
    id: "sahel-solar-aquifers",
    title: "Aquifers of the Sahel: Solar Deep-Pumping Grids Halt Desertification Across Northern Senegal and Chad",
    subtitle: "By tapping deep fossil aquifers with solar photovoltaic pump networks, pastoral cooperatives along the Great Green Wall are turning arid savannah into thriving agroecological greenbelts.",
    excerpt: "How solar-powered deep aquifer wells and drought-resistant acacia agroforestry are reversing desert encroachment and stabilizing food security for over two million farmers across the Sahelian belt.",
    category: "Food & Water",
    pillarId: "food-water",
    region: "Sub-Saharan Africa",
    author: {
      name: "Boubacar Diallo",
      role: "Sahel Agroecology Lead, Dakar Bureau",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&crop=faces&w=400&h=400&q=90"
    },
    publishedAt: "September 22, 2026",
    readTime: "6 min read",
    audioMinutes: 7,
    imageUrl: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=2400&q=88",
    imageCaption: "Farmers in northern Senegal harvest organic millet and leguminous vegetables irrigated by a community solar deep-well station that draws water from 180 meters underground.",
    featured: false,
    breaking: false,
    keyFindings: [
      "Over 3,400 solar deep-well pumping stations established across the Sahel, delivering 450 million cubic meters of clean water annually.",
      "Soil moisture retention improved by 42% through the combination of drip irrigation and ancestral Zaï water-harvesting pits.",
      "Farmer-managed natural regeneration (FMNR) has restored 850,000 hectares of degraded savannah to productive multi-strata agroforestry.",
      "Local seasonal migration dropped by 64% as year-round vegetable and dairy production created stable community economies."
    ],
    content: [
      "Where dry harmattan winds once stripped topsoil from bare, baked plains, vibrant green rows of millet, cowpeas, and moringa trees now stretch toward the horizon. In the Ferlo desert of northern Senegal, life has returned in abundance.",
      "The catalyst is an innovative network of solar-powered borehole pumps that draw fresh water from subterranean aquifers 180 meters beneath the sand. Powered entirely by sunlight, the systems operate with zero diesel costs, pumping water into elevated storage tanks that feed low-pressure drip irrigation lines.",
      "Alongside the water infrastructure, farmers are practicing Zaï planting: digging shallow basins filled with compost to capture every drop of seasonal rain and planting native nitrogen-fixing acacia trees that shade delicate crops from blistering 45°C midday sun.",
      "'Water was always beneath our feet; we only lacked the energy to lift it cleanly,' says cooperative director Fatou Cissé. 'Now, we grow food twelve months a year in the middle of the desert.'"
    ]
  },
  {
    id: "dominica-geothermal-revolution",
    title: "The Volcanic Grid: How Dominica Is Tapping Roseau Valley Steam to Export Clean Power Across the Eastern Caribbean",
    subtitle: "In the volcanic highlands of Laudat, deep production wells are unlocking 120MW of geothermal enthalpy—positioning the Nature Island to power its entire national grid and export clean electricity to Martinique and Guadeloupe.",
    excerpt: "An investigative field dispatch from Dominica's Roseau Valley geothermal fields, examining how subterranean volcanic enthalpy is replacing imported diesel and turning the Caribbean island into a sovereign green energy exporter.",
    category: "Energy Transition",
    pillarId: "clean-energy",
    region: "Caribbean & SIDS",
    author: {
      name: "Daphne Etienne",
      role: "Senior Caribbean Energy Correspondent, Roseau Bureau",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&crop=faces&w=400&h=400&q=90"
    },
    publishedAt: "September 20, 2026",
    readTime: "8 min read",
    audioMinutes: 10,
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=2400&q=88",
    imageCaption: "Drilling engineers and hydrologists inspect high-pressure geothermal wellhead valves in the Laudat highlands of Dominica's Roseau Valley, where steam temperatures exceed 240°C.",
    featured: false,
    breaking: false,
    keyFindings: [
      "Dominica's Laudat geothermal plant brings 10MW commercial phase online, satisfying over 80% of national baseload demand.",
      "Submarine HVDC interconnection cables to Martinique and Guadeloupe projected to generate $45M in annual sovereign export earnings.",
      "Domestic electricity generation costs decline by 52% compared to historical imported diesel tariffs.",
      "Closed-loop binary injection technology returns 100% of minerals into the subterranean reservoir, ensuring zero surface runoff."
    ],
    content: [
      "In the emerald volcanic highlands of Laudat, where sulfur mist drifts across the Morne Trois Pitons National Park buffer zone, heavy drill steel hums deep beneath the basalt bedrock.",
      "Nearly two thousand meters below the rainforest floor, superheated volcanic brine roars through fissures at temperatures exceeding 240 degrees Celsius. For decades, the Commonwealth of Dominica spent upwards of 12% of its GDP importing foreign diesel to fuel thermal generators in Roseau and Portsmouth.",
      "Today, that vulnerability is being permanently extinguished. Production wells RV-P1 and RV-P2 are providing continuous high-enthalpy steam capable of meeting the island's entire baseload needs and generating surplus power for export across the Eastern Caribbean archipelago.",
      "'When you flip the switch in Roseau, that light will come directly from the volcanic heartbeat of our own island,' says chief operating engineer Daphne Etienne. 'No hurricane can blow subterranean steam away.'"
    ]
  },
  {
    id: "sundarbans-solar-women",
    title: "Beyond the Monsoons: Women-Led Solar Cooperatives Electrify 1,200 Sundarbans Delta Communities",
    subtitle: "In the climate-vulnerable mangrove islands of the Bay of Bengal, women technicians are installing and maintaining saltwater-resistant solar microgrids that survive tidal surges and cyclones.",
    excerpt: "How grassroots women engineers in the mangrove deltas of India and Bangladesh are building decentralized solar networks that provide clean power, purified drinking water, and economic independence.",
    category: "Digital & Clean Infrastructure",
    pillarId: "clean-energy",
    region: "South & Southeast Asia",
    author: {
      name: "Devraj Mukherjee",
      role: "South Asia Regional Editor, Dhaka Bureau",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&crop=faces&w=400&h=400&q=90"
    },
    publishedAt: "September 18, 2026",
    readTime: "7 min read",
    audioMinutes: 8,
    imageUrl: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=2400&q=88",
    imageCaption: "Solar technicians in the Sundarbans mangrove delta calibrate lithium iron phosphate battery banks elevated on reinforced stilts four meters above high-tide level.",
    featured: false,
    breaking: false,
    keyFindings: [
      "Over 1,200 mangrove delta hamlets electrified by stilt-mounted solar microgrids resilient to 3-meter storm surges.",
      "Over 2,400 local women trained as certified solar engineers and digital payment ledger administrators.",
      "Solar-powered reverse osmosis kiosks provide 60,000 families with affordable drinking water, ending saltwater contamination.",
      "Maternal and infant healthcare mortality decreased by 41% due to electrified 24/7 emergency delivery centers."
    ],
    content: [
      "The Sundarbans delta—a labyrinth of tidal waterways, tiger-inhabited mangrove swamps, and fragile silt islands—is one of the most storm-battered landscapes on Earth. Extending the conventional national power grid across miles of tidal mudflats was long deemed impossible.",
      "Instead of waiting for giant utility companies, local women have taken electrification into their own hands. Known as the 'Solar Sisters of the Delta,' these trained technicians have assembled hundreds of community microgrids elevated on reinforced concrete pylons well above maximum storm surge levels.",
      "The microgrids do more than light homes: they power solar water desalinators that convert brackish tidal water into clean drinking water, run refrigeration for local fish catches, and power wireless digital education centers.",
      "'Before solar power, our daughters studied by kerosene lamps and inhaled toxic fumes,' says technician Ananya Roy. 'Today, we maintain the grid ourselves. We own our power, our water, and our future.'"
    ]
  },
  {
    id: "pacific-digital-sovereignty",
    title: "Sovereignty Above the Rising Tide: Tuvalu and Kiribati Pioneer the World's First Digital Sovereign Land Registry",
    subtitle: "Facing rising sea levels that threaten their low-lying coral atolls, Pacific island nations are creating decentralized, legally binding digital twins of their territories, culture, and statehood.",
    excerpt: "How low-lying atoll nations in the Pacific are anchoring their maritime boundaries, cultural heritage, and sovereign governance in permanent decentralized registries recognized by international law.",
    category: "Civic Integrity",
    pillarId: "digital-commons",
    region: "Pacific Islands & SIDS",
    author: {
      name: "Talia Tuisamoa",
      role: "Pacific Affairs Correspondent, Suva Bureau",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&crop=faces&w=400&h=400&q=90"
    },
    publishedAt: "September 15, 2026",
    readTime: "6 min read",
    audioMinutes: 7,
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=88",
    imageCaption: "Drone LiDAR surveying teams map coral atoll topographies in Funafuti, Tuvalu, creating millimeter-accurate 3D digital records of national territory and cultural monuments.",
    featured: false,
    breaking: false,
    keyFindings: [
      "The Pacific Islands Forum treaty confirms that maritime boundary baselines remain legally permanent regardless of sea-level shifts.",
      "High-resolution millimeter-accurate LiDAR maps completed for 33 coral atolls across Tuvalu, Kiribati, and the Marshall Islands.",
      "Decentralized digital government registry ensures continuous consular services, property ownership records, and diplomatic recognition.",
      "Traditional oral histories, navigation songs, and medicinal plant archives preserved in interactive sovereign cultural repositories."
    ],
    content: [
      "On the narrow coral spit of Fongafale in Funafuti, the Pacific Ocean laps against coconut palms on one side while a turquoise lagoon shimmers on the other. At high king tides, seawater bubbles up directly through the porous limestone ground.",
      "Yet rather than surrender to climate fatalism, the people of Tuvalu and neighboring atoll nations are pioneering a historic legal and technological defense of statehood.",
      "Through the Digital Nation Initiative, teams of surveyors have mapped every square meter of coral reef, village settlement, and ancestral burial ground using aerial LiDAR and 3D photogrammetry. Crucially, a landmark diplomatic treaty ratified by sixty nations guarantees that these digital records permanently lock in Tuvalu's maritime economic zones and sovereign rights under international law.",
      "'Our physical land may face the tides, but our sovereign statehood, our maritime zones, and our cultural identity are immortal,' declares Talia Tuisamoa. 'We are redefining what it means to be an enduring sovereign nation.'"
    ]
  },
  {
    id: "bridgetown-climate-debt-pause",
    title: "The Climate Debt Pause: How 42 Developing Nations Forced Multilateral Lenders to Adopt Catastrophe Rescheduling Clauses",
    subtitle: "Championed by Caribbean, African, and Pacific finance ministers under the Bridgetown Initiative, mandatory 24-month debt freezes after natural disasters are freeing up billions for emergency reconstruction.",
    excerpt: "An inside investigation into the geopolitical battle that forced the World Bank, IMF, and private bond markets to accept automatic debt suspension covenants when extreme climate disasters strike.",
    category: "Economic Reform",
    pillarId: "economic-equity",
    region: "Global Finance Desk",
    author: {
      name: "Marcus Vance",
      role: "Sovereign Finance Correspondent, Geneva Hub",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&crop=faces&w=400&h=400&q=90"
    },
    publishedAt: "September 12, 2026",
    readTime: "8 min read",
    audioMinutes: 9,
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=88",
    imageCaption: "Finance delegates and sovereign debt auditors convene in Geneva to finalize standard parametric catastrophe pause covenants for international bond issues.",
    featured: false,
    breaking: false,
    keyFindings: [
      "Over $42 billion in sovereign emerging market debt contracts now include mandatory 2-year debt service suspension clauses.",
      "When Category 5 storms or historic droughts trigger parametric thresholds, affected nations automatically retain 100% of debt service funds for healthcare and rebuilding.",
      "Credit rating agencies formally agree not to treat catastrophe clause activation as a sovereign default or credit downgrade.",
      "The Bridgetown Initiative architecture expands to include low-interest 50-year climate resilience loans from international development banks."
    ],
    content: [
      "For decades, an unyielding structural cruelty haunted developing nations struck by catastrophic climate disasters: while bridges lay collapsed, hospitals stood without power, and citizens suffered in flooded streets, foreign loan payments remained due on time.",
      "Nations were forced to borrow new high-interest commercial debt merely to service old loans, triggering devastating debt spirals that gutted public health and education budgets for generations.",
      "Under the relentless advocacy of the Bridgetown Initiative, led by prime ministers and finance ministers across the Caribbean, Africa, and the Pacific, that archaic system has been dismantled.",
      "Today, standard sovereign debt covenants incorporate Climate Resilient Debt Clauses (CRDCs). When independent meteorological satellites record tropical cyclones exceeding hurricane strength or catastrophic rainfall anomalies, all debt principal and interest payments automatically freeze for two full years.",
      "'In the past, a disaster meant financial bankruptcy,' explains Marcus Vance. 'Today, a country instantly retains hundreds of millions of dollars in its own treasury to heal its people, rebuild roads, and restore drinking water. It is the beginning of financial justice for the climate frontline.'"
    ]
  },
  {
    id: "sargassum-bio-economy-circularity",
    title: "From Ocean Crisis to Soil Nutrition: Turning Pelagic Sargassum and Coastal Biomass into High-Yield Bio-Fertilizers",
    subtitle: "In the Caribbean and West Africa, bio-chemists and farmer cooperatives are transforming suffocating brown tide blooms into organic, arsenic-free liquid plant nutrients that replace costly synthetic fertilizers.",
    excerpt: "How coastal communities turned an ecological crisis into a circular bio-economy dividend that restores degraded soils and cuts import costs for rural growers.",
    category: "Bio-Economy",
    pillarId: "food-water",
    region: "Atlantic Basin & West Africa",
    author: {
      name: "Caleb Sylvester",
      role: "Bio-Economy Correspondent, Castries Hub",
      avatar: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=2400&q=88"
    },
    publishedAt: "September 08, 2026",
    readTime: "5 min read",
    audioMinutes: 6,
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2400&q=88",
    imageCaption: "Technicians in a coastal bio-refinery test organic liquid bio-stimulants extracted from sustainably harvested pelagic seaweed biomass.",
    featured: false,
    breaking: false,
    keyFindings: [
      "Over 40,000 tons of pelagic sargassum harvested offshore before coastal decay, preventing toxic sulfur gas emissions.",
      "Proprietary enzymatic extraction successfully separates heavy metals, producing certified organic bio-stimulants rich in potassium and micronutrients.",
      "Smallholder farm yields increased by 24% while reducing synthetic chemical fertilizer expenditures by 45%.",
      "By-product cellulosic pulp is converted into biodegradable food packaging, displacing single-use plastics."
    ],
    content: [
      "For more than a decade, massive brown carpets of pelagic sargassum seaweed drifting across the tropical Atlantic have choked coastlines from the Caribbean to West Africa, suffocating coral reefs and ruining coastal tourism.",
      "Now, innovative bio-chemical ventures in the Caribbean, Senegal, and Ghana have ceased treating sargassum as waste and begun processing it as a high-value biological goldmine.",
      "Harvested offshore using specialized conveyor vessels, the clean biomass is fed into anaerobic digestors and enzymatic refining tanks. The process yields bio-methane gas for local electrical grids and nutrient-rich liquid plant stimulants that replace expensive imported synthetic fertilizers.",
      "'We are closing the nutrient loop between ocean and earth,' explains Caleb Sylvester. 'Instead of spending millions cleaning beaches, we produce clean energy and feed our soils with natural sovereign resources.'"
    ]
  }
];

export const PUBLICATIONS: Publication[] = [
  {
    id: "pub-vitality-2026",
    title: "Global Development & Resilience Vitality Index 2026",
    edition: "Flagship Global Assessment • Volume 16",
    category: "Flagship Data Report",
    pages: 248,
    releaseDate: "September 2026",
    summary: "The definitive independent assessment of clean energy transition, climate adaptation, and sovereign equity across 164 nations worldwide. Features empirical audits of decentralized microgrids, catastrophe debt pause covenants, and 30x30 biosphere protection.",
    downloadCount: "74.8k",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=90",
    highlights: [
      "Quantitative vitality rankings for 164 sovereign developing territories.",
      "Comprehensive benchmark: Decentralized clean power deployment vs fossil fuel retirements.",
      "The Bridgetown Clause Audit: Impact of debt pause clauses on post-disaster recovery timelines."
    ]
  },
  {
    id: "pub-climate-defense",
    title: "The Global Climate Shield: Community Infrastructure & Disaster Adaptation",
    edition: "Special Resilience Monograph",
    category: "Climate & Infrastructure",
    pages: 164,
    releaseDate: "August 2026",
    summary: "An in-depth empirical audit comparing adaptation infrastructure investments with actual field survival rates during super-typhoons, catastrophic flooding, and prolonged multi-year droughts across frontline continents.",
    downloadCount: "52.3k",
    coverImage: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=90",
    highlights: [
      "GIS database of 4,200 Category-5 hardened shelters across Africa, Asia, and the Caribbean.",
      "Cost-benefit calculus of living coral and mangrove barriers vs concrete sea defenses.",
      "Satellite early-warning telemetry latency across 120 climate-vulnerable island and delta states."
    ]
  },
  {
    id: "pub-digital-commons",
    title: "The Sovereign Energy Transition: Decentralized Grids & Public Commons",
    edition: "Technical & Policy Briefing",
    category: "Clean Tech & Energy",
    pages: 128,
    releaseDate: "July 2026",
    summary: "Technical blueprints and policy frameworks for scaling decentralized solar, geothermal, and ocean energy without foreign sovereign debt encumbrances.",
    downloadCount: "41.6k",
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=90",
    highlights: [
      "High-enthalpy geothermal reservoir management practices from Kenya and Dominica.",
      "Community mini-grid tariff models that ensure 100% rural affordability.",
      "Blockchain-verified carbon and biodiversity certificate registries."
    ]
  }
];

export const DESK_DISPATCHES_TICKER = [
  "NAIROBI: Kenya Olkaria Geothermal expansion delivers additional 140MW baseload to regional clean grid.",
  "ROSEAU: Dominica Geothermal Project completes high-capacity steam tests; undersea cable pact advanced.",
  "BANGKOK: Mekong Hydrology Network deploys 120 AI-enabled early-warning river sensor stations.",
  "BELÉM: Munduruku territory verifies zero illegal deforestation incursions across 4.2M demarcated hectares.",
  "SUVA: Pacific Islands Forum ratifies permanent digital statehood charter protecting maritime sovereignty.",
  "DAKAR: Sahel Great Green Wall solar aquifer initiative brings 180 new community wells online.",
  "BRIDGETOWN: CARICOM Climate Adaptation Facility secures $340M in debt-for-nature catastrophe pause swaps.",
  "GENEVA: UN Climate Resilience Panel endorses open-access telemetry standards across 164 nations."
];
