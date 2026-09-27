import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

export type SupportedLanguage = 'EN' | 'FR' | 'ES' | 'AR';

export interface Translations {
  [key: string]: {
    [lang in SupportedLanguage]: string;
  };
}

export const TRANSLATIONS: Record<string, Record<SupportedLanguage, string>> = {
  // Navigation & Header
  'nav.liveWire': {
    EN: 'Live Wire',
    FR: 'Fil en Direct',
    ES: 'Cable en Vivo',
    AR: 'الأخبار المباشرة'
  },
  'nav.nationsMonitored': {
    EN: '164 Nations Monitored',
    FR: '164 Nations Surveillées',
    ES: '164 Naciones Monitoreadas',
    AR: '١٦٤ دولة تحت المراقبة'
  },
  'nav.globalVitality': {
    EN: 'Global Vitality',
    FR: 'Vitalité Globale',
    ES: 'Vitalidad Global',
    AR: 'المؤشر الحيوي العالمي'
  },
  'nav.saved': {
    EN: 'Saved',
    FR: 'Enregistrés',
    ES: 'Guardados',
    AR: 'المحفوظات'
  },
  'nav.support': {
    EN: 'Support Independent Data →',
    FR: 'Soutenir les Données Indépendantes →',
    ES: 'Apoyar Datos Independientes →',
    AR: 'دعم البيانات المستقلة ←'
  },
  'nav.brandSubtitle': {
    EN: 'Global Development & Intelligence',
    FR: 'Développement Global & Renseignement',
    ES: 'Desarrollo Global e Inteligencia',
    AR: 'التنمية والاستخبارات العالمية'
  },
  'nav.focusPillars': {
    EN: 'Focus Pillars',
    FR: 'Piliers Stratégiques',
    ES: 'Pilares de Impacto',
    AR: 'ركائز التأثير'
  },
  'nav.regionalDesks': {
    EN: 'Regional Desks',
    FR: 'Bureaux Régionaux',
    ES: 'Mesas Regionales',
    AR: 'المكاتب الإقليمية'
  },
  'nav.dataIndices': {
    EN: 'Data & Indices',
    FR: 'Données & Indices',
    ES: 'Datos e Índices',
    AR: 'البيانات والمؤشرات'
  },
  'nav.fieldDispatches': {
    EN: 'Field Dispatches',
    FR: 'Dépêches de Terrain',
    ES: 'Despachos de Campo',
    AR: 'تقارير الميدان'
  },
  'nav.publications': {
    EN: 'Publications',
    FR: 'Publications',
    ES: 'Publicaciones',
    AR: 'المنشورات'
  },
  'nav.charter': {
    EN: 'Independence Charter',
    FR: "Charte d'Indépendance",
    ES: 'Carta de Independencia',
    AR: 'ميثاق الاستقلالية'
  },
  'nav.search': {
    EN: 'Search articles and data',
    FR: 'Rechercher articles et données',
    ES: 'Buscar artículos y datos',
    AR: 'بحث في المقالات والبيانات'
  },

  // Alert Banner
  'alert.title': {
    EN: 'Global Climate Resilience Alert',
    FR: 'Alerte Mondiale de Résilience Climatique',
    ES: 'Alerta Global de Resiliencia Climática',
    AR: 'إنذار الصمود المناخي العالمي'
  },
  'alert.regions': {
    EN: 'Regions:',
    FR: 'Régions :',
    ES: 'Regiones:',
    AR: 'المناطق:'
  },
  'alert.hide': {
    EN: 'Hide',
    FR: 'Masquer',
    ES: 'Ocultar',
    AR: 'إخفاء'
  },
  'alert.details': {
    EN: 'Details',
    FR: 'Détails',
    ES: 'Detalles',
    AR: 'التفاصيل'
  },
  'alert.fieldStatus': {
    EN: 'Regional Sensor & Telemetry Status:',
    FR: 'Statut Télémétrique & Capteurs Régionaux :',
    ES: 'Estado de Telemetría y Sensores Regionales:',
    AR: 'حالة أجهزة الاستشعار والتتبع الإقليمية:'
  },
  'alert.shelterProtocol': {
    EN: 'Community Resilience & Shelter Protocol:',
    FR: 'Protocole Communautaire & Abris :',
    ES: 'Protocolo de Resiliencia y Refugios Comunitarios:',
    AR: 'بروتوكول الملاجئ والصمود المجتمعي:'
  },

  // World Map Visualizer
  'map.sectionTag': {
    EN: 'Geographic Intelligence Interface',
    FR: 'Interface Géographique de Renseignement',
    ES: 'Interfaz Geográfica de Inteligencia',
    AR: 'واجهة الاستخبارات الجغرافية'
  },
  'map.title': {
    EN: 'Interactive World Telemetry & Regional Bureaus',
    FR: 'Télémétrie Mondiale Interactive & Bureaux Régionaux',
    ES: 'Telemetría Global Interactiva y Mesas Regionales',
    AR: 'خريطة التتبع العالمية والمكاتب الإقليمية'
  },
  'map.description': {
    EN: 'Select any continental bureau or island archipelago to filter field dispatches, inspect live vitality scores, and observe frontline environmental telemetry across 164 sovereign nations.',
    FR: 'Sélectionnez un bureau continental ou un archipel insulaire pour filtrer les dépêches, inspecter les scores de vitalité et observer la télémétrie dans 164 nations.',
    ES: 'Seleccione cualquier mesa continental o archipiélago insular para filtrar despachos de campo, inspeccionar índices de vitalidad y observar telemetría en 164 naciones.',
    AR: 'اختر أي مكتب قاري أو أرخبيل لتصفية التقارير الميدانية والاطلاع على مؤشرات الحيوية ومتابعة القياسات البيئية عبر ١٦٤ دولة.'
  },
  'map.filterAll': {
    EN: 'All Worldwide Regions',
    FR: 'Toutes les Régions',
    ES: 'Todas las Regiones',
    AR: 'كافة مناطق العالم'
  },
  'map.activeFilter': {
    EN: 'Filtered by:',
    FR: 'Filtré par :',
    ES: 'Filtrado por:',
    AR: 'تصفية حسب:'
  },
  'map.clearFilter': {
    EN: 'Reset Filter',
    FR: 'Réinitialiser',
    ES: 'Restablecer',
    AR: 'إعادة التعيين'
  },
  'map.storiesCount': {
    EN: 'dispatches available',
    FR: 'dépêches disponibles',
    ES: 'despachos disponibles',
    AR: 'تقريراً متاحاً'
  },
  'map.nations': {
    EN: 'Nations Monitored',
    FR: 'Nations Surveillées',
    ES: 'Naciones Monitoreadas',
    AR: 'دولة مراقبة'
  },
  'map.vitalityScore': {
    EN: 'Vitality Score',
    FR: 'Score de Vitalité',
    ES: 'Índice de Vitalidad',
    AR: 'مؤشر الحيوية'
  },

  // Hero Story
  'hero.leadLabel': {
    EN: 'Lead Global Investigation • Worldwide Energy Transition & Resilience Desk',
    FR: 'Enquête Mondiale Principale • Transition Énergétique & Résilience',
    ES: 'Investigación Global Principal • Transición Energética y Resiliencia',
    AR: 'التحقيق العالمي الرئيسي • مكتب تحول الطاقة والصمود'
  },
  'hero.verifiedBy': {
    EN: 'Verified by Pulsewire Global Telemetry Desks • 164 Nations Monitored',
    FR: 'Vérifié par les Bureaux Télémétriques Pulsewire • 164 Nations',
    ES: 'Verificado por las Mesas de Telemetría Pulsewire • 164 Naciones',
    AR: 'مُوثَّق بواسطة مكاتب التتبع العالمية • ١٦٤ دولة تحت الرصد'
  },
  'hero.readStory': {
    EN: 'Read Full Investigation',
    FR: "Lire l'Enquête Complète",
    ES: 'Leer Investigación Completa',
    AR: 'قراءة التحقيق كاملاً'
  },
  'hero.listenAloud': {
    EN: 'Listen Aloud',
    FR: 'Écouter la Dépêche',
    ES: 'Escuchar Despacho',
    AR: 'استماع صوتي'
  },
  'hero.keyFindings': {
    EN: 'Key Investigative Findings',
    FR: 'Principales Conclusions',
    ES: 'Conclusiones Principales',
    AR: 'أبرز نتائج التحقيق'
  },
  'hero.latestWire': {
    EN: 'Latest Field Dispatches',
    FR: 'Dernières Dépêches de Terrain',
    ES: 'Últimos Despachos de Campo',
    AR: 'أحدث التقارير الميدانية'
  },

  // Article Reader Modal
  'modal.readingProgress': {
    EN: 'Reading Progress',
    FR: 'Progression de Lecture',
    ES: 'Progreso de Lectura',
    AR: 'تقدم القراءة'
  },
  'modal.completed': {
    EN: 'completed',
    FR: 'terminé',
    ES: 'completado',
    AR: 'مكتمل'
  },
  'modal.minLeft': {
    EN: 'min left',
    FR: 'min restantes',
    ES: 'min restantes',
    AR: 'دقيقة متبقية'
  },
  'modal.speechSynthesis': {
    EN: 'Browser Speech Narration',
    FR: 'Narration Vocale du Navigateur',
    ES: 'Narración de Voz del Navegador',
    AR: 'القراءة الصوتية للمتصفح'
  },
  'modal.listen': {
    EN: 'Listen to Article',
    FR: "Écouter l'Article",
    ES: 'Escuchar Artículo',
    AR: 'استمع للمقال'
  },
  'modal.pause': {
    EN: 'Pause',
    FR: 'Pause',
    ES: 'Pausar',
    AR: 'إيقاف مؤقت'
  },
  'modal.stop': {
    EN: 'Stop',
    FR: 'Arrêter',
    ES: 'Detener',
    AR: 'إيقاف'
  },
  'modal.print': {
    EN: 'Print',
    FR: 'Imprimer',
    ES: 'Imprimir',
    AR: 'طباعة'
  },
  'modal.share': {
    EN: 'Share',
    FR: 'Partager',
    ES: 'Compartir',
    AR: 'مشاركة'
  },
  'modal.fontSize': {
    EN: 'Text Size',
    FR: 'Taille du Texte',
    ES: 'Tamaño de Texto',
    AR: 'حجم الخط'
  },

  // Saved Articles & History
  'saved.title': {
    EN: 'Saved Dispatches',
    FR: 'Dépêches Enregistrées',
    ES: 'Despachos Guardados',
    AR: 'التقارير المحفوظة'
  },
  'saved.recentTitle': {
    EN: 'Recently Viewed',
    FR: 'Récemment Consultés',
    ES: 'Vistos Recientemente',
    AR: 'المشاهدة مؤخراً'
  },
  'saved.clearAll': {
    EN: 'Clear List',
    FR: 'Vider la Liste',
    ES: 'Limpiar Lista',
    AR: 'مسح القائمة'
  },
  'saved.clearHistory': {
    EN: 'Clear History',
    FR: "Effacer l'Historique",
    ES: 'Borrar Historial',
    AR: 'مسح السجل'
  },
  'saved.read': {
    EN: 'Read',
    FR: 'Lire',
    ES: 'Leer',
    AR: 'قراءة'
  },
  'saved.emptySaved': {
    EN: 'Your reading list is empty',
    FR: 'Votre liste de lecture est vide',
    ES: 'Tu lista de lectura está vacía',
    AR: 'قائمة القراءة فارغة'
  },
  'saved.emptyRecent': {
    EN: 'No recently opened dispatches',
    FR: 'Aucune dépêche récemment ouverte',
    ES: 'No hay despachos abiertos recientemente',
    AR: 'لا توجد تقارير مفتوحة مؤخراً'
  },

  // Common UI actions
  'common.close': {
    EN: 'Close',
    FR: 'Fermer',
    ES: 'Cerrar',
    AR: 'إغلاق'
  },
  'common.minRead': {
    EN: 'min read',
    FR: 'min de lecture',
    ES: 'min de lectura',
    AR: 'دقيقة قراءة'
  },
  'common.exportCsv': {
    EN: 'Export CSV Dataset',
    FR: 'Exporter Données CSV',
    ES: 'Exportar Datos CSV',
    AR: 'تصدير بيانات CSV'
  },
  'common.allPillars': {
    EN: 'All Impact Pillars',
    FR: 'Tous les Piliers',
    ES: 'Todos los Pilares',
    AR: 'كافة الركائز'
  }
};

interface I18nContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const I18nContext = createContext<I18nContextType>({
  language: 'EN',
  setLanguage: () => {},
  t: (key: string) => key,
  isRTL: false
});

const LANGUAGE_STORAGE_KEY = 'pulsewire_active_language';

export const I18nProvider: React.FC<{
  children: React.ReactNode;
  initialLanguage?: SupportedLanguage;
}> = ({ children, initialLanguage = 'EN' }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    if (typeof window === 'undefined') return initialLanguage;
    try {
      const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (stored && ['EN', 'FR', 'ES', 'AR'].includes(stored)) {
        return stored as SupportedLanguage;
      }
    } catch (e) {}
    return initialLanguage;
  });

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch (e) {}
  };

  const isRTL = language === 'AR';

  useEffect(() => {
    document.documentElement.lang = language.toLowerCase();
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [language, isRTL]);

  const t = useMemo(() => {
    return (key: string): string => {
      const entry = TRANSLATIONS[key];
      if (!entry) return key;
      return entry[language] || entry.EN || key;
    };
  }, [language]);

  return React.createElement(
    I18nContext.Provider,
    { value: { language, setLanguage, t, isRTL } },
    children
  );
};

export const useI18n = () => useContext(I18nContext);

/**
 * Direct lookup helper when outside of React Context.
 */
export function translate(key: string, lang: SupportedLanguage = 'EN'): string {
  const entry = TRANSLATIONS[key];
  if (!entry) return key;
  return entry[lang] || entry.EN || key;
}
