
import React, { createContext, useContext, useState } from 'react';

// Define supported languages
export type Language = 'english' | 'spanish' | 'french' | 'mandarin' | 'arabic';

// Define the context shape
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  translate: (key: string) => string;
};

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'english',
  setLanguage: () => {},
  translate: () => '',
});

// Translation data for different languages
const translations: Record<Language, Record<string, string>> = {
  english: {
    // General
    'app.name': 'FinAI',
    'app.tagline': 'Smart, Simple, Secure!',
    'back.dashboard': '← Back to Dashboard',
    
    // Multilingual page
    'multilingual.title': 'Multilingual Support',
    'multilingual.subtitle': 'Access financial advice in multiple languages for greater accessibility.',
    'multilingual.settings': 'Language Settings',
    'multilingual.select': 'Select your preferred language',
    'multilingual.benefits.title': 'Benefits of Multilingual Support',
    'multilingual.benefits.global': 'Global Accessibility',
    'multilingual.benefits.global.desc': 'Access FinAI in your native language, no matter where you are.',
    'multilingual.benefits.inclusive': 'Inclusive Design',
    'multilingual.benefits.inclusive.desc': 'We believe financial tools should be accessible to everyone.',
    'multilingual.benefits.accurate': 'Accurate Translations',
    'multilingual.benefits.accurate.desc': 'Financial terms are properly localized for better understanding.',
    'multilingual.benefits.customized': 'Customized Experience',
    'multilingual.benefits.customized.desc': 'Get financial insights tailored to your regional context.',
    
    // Language names
    'language.english': 'English',
    'language.spanish': 'Spanish',
    'language.french': 'French',
    'language.mandarin': 'Mandarin',
    'language.arabic': 'Arabic',
  },
  spanish: {
    // General
    'app.name': 'FinAI',
    'app.tagline': '¡Inteligente, Simple, Seguro!',
    'back.dashboard': '← Volver al Panel',
    
    // Multilingual page
    'multilingual.title': 'Soporte Multilingüe',
    'multilingual.subtitle': 'Acceda a consejos financieros en varios idiomas para mayor accesibilidad.',
    'multilingual.settings': 'Configuración de Idioma',
    'multilingual.select': 'Seleccione su idioma preferido',
    'multilingual.benefits.title': 'Beneficios del Soporte Multilingüe',
    'multilingual.benefits.global': 'Accesibilidad Global',
    'multilingual.benefits.global.desc': 'Acceda a FinAI en su idioma nativo, sin importar dónde se encuentre.',
    'multilingual.benefits.inclusive': 'Diseño Inclusivo',
    'multilingual.benefits.inclusive.desc': 'Creemos que las herramientas financieras deben ser accesibles para todos.',
    'multilingual.benefits.accurate': 'Traducciones Precisas',
    'multilingual.benefits.accurate.desc': 'Los términos financieros están correctamente localizados para una mejor comprensión.',
    'multilingual.benefits.customized': 'Experiencia Personalizada',
    'multilingual.benefits.customized.desc': 'Obtenga información financiera adaptada a su contexto regional.',
    
    // Language names
    'language.english': 'Inglés',
    'language.spanish': 'Español',
    'language.french': 'Francés',
    'language.mandarin': 'Mandarín',
    'language.arabic': 'Árabe',
  },
  french: {
    // General
    'app.name': 'FinAI',
    'app.tagline': 'Intelligent, Simple, Sécurisé !',
    'back.dashboard': '← Retour au Tableau de Bord',
    
    // Multilingual page
    'multilingual.title': 'Support Multilingue',
    'multilingual.subtitle': 'Accédez à des conseils financiers en plusieurs langues pour une meilleure accessibilité.',
    'multilingual.settings': 'Paramètres de Langue',
    'multilingual.select': 'Sélectionnez votre langue préférée',
    'multilingual.benefits.title': 'Avantages du Support Multilingue',
    'multilingual.benefits.global': 'Accessibilité Mondiale',
    'multilingual.benefits.global.desc': 'Accédez à FinAI dans votre langue maternelle, où que vous soyez.',
    'multilingual.benefits.inclusive': 'Conception Inclusive',
    'multilingual.benefits.inclusive.desc': 'Nous croyons que les outils financiers doivent être accessibles à tous.',
    'multilingual.benefits.accurate': 'Traductions Précises',
    'multilingual.benefits.accurate.desc': 'Les termes financiers sont correctement localisés pour une meilleure compréhension.',
    'multilingual.benefits.customized': 'Expérience Personnalisée',
    'multilingual.benefits.customized.desc': 'Obtenez des informations financières adaptées à votre contexte régional.',
    
    // Language names
    'language.english': 'Anglais',
    'language.spanish': 'Espagnol',
    'language.french': 'Français',
    'language.mandarin': 'Mandarin',
    'language.arabic': 'Arabe',
  },
  mandarin: {
    // General
    'app.name': 'FinAI',
    'app.tagline': '智能，简单，安全！',
    'back.dashboard': '← 返回仪表板',
    
    // Multilingual page
    'multilingual.title': '多语言支持',
    'multilingual.subtitle': '通过多种语言获取财务建议，提高可访问性。',
    'multilingual.settings': '语言设置',
    'multilingual.select': '选择您偏好的语言',
    'multilingual.benefits.title': '多语言支持的好处',
    'multilingual.benefits.global': '全球可访问性',
    'multilingual.benefits.global.desc': '无论您身在何处，都可以使用您的母语访问FinAI。',
    'multilingual.benefits.inclusive': '包容性设计',
    'multilingual.benefits.inclusive.desc': '我们相信金融工具应该对每个人开放。',
    'multilingual.benefits.accurate': '精确翻译',
    'multilingual.benefits.accurate.desc': '金融术语经过适当本地化，以便更好地理解。',
    'multilingual.benefits.customized': '定制体验',
    'multilingual.benefits.customized.desc': '获取适合您地区背景的金融见解。',
    
    // Language names
    'language.english': '英语',
    'language.spanish': '西班牙语',
    'language.french': '法语',
    'language.mandarin': '普通话',
    'language.arabic': '阿拉伯语',
  },
  arabic: {
    // General
    'app.name': 'فين إيه آي',
    'app.tagline': 'ذكي، بسيط، آمن!',
    'back.dashboard': '← العودة إلى لوحة المعلومات',
    
    // Multilingual page
    'multilingual.title': 'دعم متعدد اللغات',
    'multilingual.subtitle': 'الوصول إلى المشورة المالية بلغات متعددة لزيادة إمكانية الوصول.',
    'multilingual.settings': 'إعدادات اللغة',
    'multilingual.select': 'حدد لغتك المفضلة',
    'multilingual.benefits.title': 'فوائد الدعم متعدد اللغات',
    'multilingual.benefits.global': 'إمكانية الوصول العالمية',
    'multilingual.benefits.global.desc': 'الوصول إلى فين إيه آي بلغتك الأم، بغض النظر عن مكان وجودك.',
    'multilingual.benefits.inclusive': 'تصميم شامل',
    'multilingual.benefits.inclusive.desc': 'نحن نؤمن بأن الأدوات المالية يجب أن تكون متاحة للجميع.',
    'multilingual.benefits.accurate': 'ترجمات دقيقة',
    'multilingual.benefits.accurate.desc': 'المصطلحات المالية مترجمة بشكل صحيح لفهم أفضل.',
    'multilingual.benefits.customized': 'تجربة مخصصة',
    'multilingual.benefits.customized.desc': 'احصل على رؤى مالية مصممة خصيصًا لسياقك الإقليمي.',
    
    // Language names
    'language.english': 'الإنجليزية',
    'language.spanish': 'الإسبانية',
    'language.french': 'الفرنسية',
    'language.mandarin': 'الماندرين',
    'language.arabic': 'العربية',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('english');

  // Translation function
  const translate = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = () => useContext(LanguageContext);
