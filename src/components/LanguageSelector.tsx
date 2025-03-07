
import React from 'react';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { Language, useLanguage } from '@/context/LanguageContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const LanguageSelector = () => {
  const { language, setLanguage, translate } = useLanguage();

  const languages: { value: Language; label: string; flag: string }[] = [
    { value: 'english', label: translate('language.english'), flag: '🇺🇸' },
    { value: 'spanish', label: translate('language.spanish'), flag: '🇪🇸' },
    { value: 'french', label: translate('language.french'), flag: '🇫🇷' },
    { value: 'mandarin', label: translate('language.mandarin'), flag: '🇨🇳' },
    { value: 'arabic', label: translate('language.arabic'), flag: '🇸🇦' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex gap-2 items-center">
          <Globe className="h-4 w-4" />
          <span>{languages.find(l => l.value === language)?.flag}</span>
          <span>{languages.find(l => l.value === language)?.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.value}
            className={`flex items-center gap-2 ${language === lang.value ? 'bg-primary/10' : ''}`}
            onClick={() => setLanguage(lang.value)}
          >
            <span className="text-lg">{lang.flag}</span>
            <span>{lang.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
