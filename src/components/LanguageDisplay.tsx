
import React from 'react';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Link } from 'react-router-dom';

const LanguageDisplay = () => {
  const { language } = useLanguage();
  
  // Get flag based on current language
  const getFlag = () => {
    switch(language) {
      case 'english': return '🇺🇸';
      case 'spanish': return '🇪🇸';
      case 'french': return '🇫🇷';
      case 'mandarin': return '🇨🇳';
      case 'arabic': return '🇸🇦';
      default: return '🇺🇸';
    }
  };

  return (
    <Link to="/multilingual-support">
      <Button variant="ghost" size="sm" className="flex gap-1 items-center">
        <Globe className="h-4 w-4" />
        <span>{getFlag()}</span>
      </Button>
    </Link>
  );
};

export default LanguageDisplay;
