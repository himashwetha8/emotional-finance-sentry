
import React from 'react';
import Header from '../components/Header';
import { EmotionProvider } from '../context/EmotionContext';
import { FinanceProvider } from '../context/FinanceContext';
import { LanguageProvider, useLanguage } from '../context/LanguageContext';
import { MessageSquare, Globe, Check, Users, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import LanguageSelector from '@/components/LanguageSelector';

// Create a separate component for the page content to use the language context
const MultilingualContent = () => {
  const { translate } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-background/80">
      <Header />
      <main className="flex-1 pb-12">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6 flex items-center justify-between">
            <Link to="/">
              <Button variant="ghost" size="sm">
                {translate('back.dashboard')}
              </Button>
            </Link>
            <LanguageSelector />
          </div>
          <div className="text-center mb-10 animate-fade-in">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <MessageSquare className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400 mb-4">
              {translate('multilingual.title')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {translate('multilingual.subtitle')}
            </p>
          </div>
          
          <div className="glass-card rounded-xl p-6 mb-8 bg-card/60 backdrop-blur-sm border border-border/50">
            <h2 className="text-2xl font-semibold mb-6">{translate('multilingual.settings')}</h2>
            <div className="flex flex-col items-center">
              <p className="mb-4 text-muted-foreground">{translate('multilingual.select')}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 w-full max-w-3xl">
                {['english', 'spanish', 'french', 'mandarin', 'arabic'].map((lang) => (
                  <Button 
                    key={lang}
                    onClick={() => useLanguage().setLanguage(lang as any)}
                    variant={useLanguage().language === lang ? "default" : "outline"}
                    className="py-6 flex flex-col gap-2 h-auto"
                  >
                    <span className="text-2xl">
                      {lang === 'english' && '🇺🇸'}
                      {lang === 'spanish' && '🇪🇸'}
                      {lang === 'french' && '🇫🇷'}
                      {lang === 'mandarin' && '🇨🇳'}
                      {lang === 'arabic' && '🇸🇦'}
                    </span>
                    <span>{translate(`language.${lang}`)}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="glass-card rounded-xl p-6 mb-8 bg-card/60 backdrop-blur-sm border border-border/50">
            <h2 className="text-2xl font-semibold mb-6">{translate('multilingual.benefits.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-border/50 rounded-lg p-5 hover:bg-accent/10 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Globe className="w-5 h-5" />
                  </div>
                  <h3 className="font-medium text-lg">{translate('multilingual.benefits.global')}</h3>
                </div>
                <p className="text-muted-foreground">{translate('multilingual.benefits.global.desc')}</p>
              </div>
              
              <div className="border border-border/50 rounded-lg p-5 hover:bg-accent/10 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="font-medium text-lg">{translate('multilingual.benefits.inclusive')}</h3>
                </div>
                <p className="text-muted-foreground">{translate('multilingual.benefits.inclusive.desc')}</p>
              </div>
              
              <div className="border border-border/50 rounded-lg p-5 hover:bg-accent/10 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Check className="w-5 h-5" />
                  </div>
                  <h3 className="font-medium text-lg">{translate('multilingual.benefits.accurate')}</h3>
                </div>
                <p className="text-muted-foreground">{translate('multilingual.benefits.accurate.desc')}</p>
              </div>
              
              <div className="border border-border/50 rounded-lg p-5 hover:bg-accent/10 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <h3 className="font-medium text-lg">{translate('multilingual.benefits.customized')}</h3>
                </div>
                <p className="text-muted-foreground">{translate('multilingual.benefits.customized.desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="py-6 bg-secondary/20 border-t border-border/40">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            {translate('app.name')} – {translate('app.tagline')}
          </p>
        </div>
      </footer>
    </div>
  );
};

const MultilingualSupport = () => {
  return (
    <EmotionProvider>
      <FinanceProvider>
        <LanguageProvider>
          <MultilingualContent />
        </LanguageProvider>
      </FinanceProvider>
    </EmotionProvider>
  );
};

export default MultilingualSupport;
