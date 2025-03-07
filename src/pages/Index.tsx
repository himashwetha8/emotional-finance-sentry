
import React from 'react';
import Header from '../components/Header';
import EmotionalDashboard from '../components/EmotionalDashboard';
import { EmotionProvider } from '../context/EmotionContext';
import { FinanceProvider } from '../context/FinanceContext';
import FeatureHighlights from '../components/FeatureHighlights';

const Index = () => {
  return (
    <EmotionProvider>
      <FinanceProvider>
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-background/80">
          <Header />
          <main className="flex-1 pb-12">
            <div className="container mx-auto px-4 py-8">
              <div className="text-center mb-12 animate-fade-in">
                <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400 mb-4">
                  FinAI: Smart Finance & Investment Assistant
                </h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  AI-powered personal finance and investment assistant designed to help you track expenses,
                  manage budgets, and make smarter financial decisions based on your emotional state.
                </p>
              </div>
            </div>
            <EmotionalDashboard />
            <FeatureHighlights />
          </main>
          <footer className="py-6 bg-secondary/20 border-t border-border/40">
            <div className="container mx-auto px-4 text-center">
              <p className="text-sm text-muted-foreground">
                FinAI – Smart, Simple, Secure!
              </p>
            </div>
          </footer>
        </div>
      </FinanceProvider>
    </EmotionProvider>
  );
};

export default Index;
