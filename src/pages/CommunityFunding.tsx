
import React from 'react';
import Header from '../components/Header';
import { EmotionProvider } from '../context/EmotionContext';
import { FinanceProvider } from '../context/FinanceContext';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CommunityFunding = () => {
  return (
    <EmotionProvider>
      <FinanceProvider>
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-background/80">
          <Header />
          <main className="flex-1 pb-12">
            <div className="container mx-auto px-4 py-8">
              <div className="mb-6 flex items-center gap-2">
                <Link to="/">
                  <Button variant="ghost" size="sm">
                    ← Back to Dashboard
                  </Button>
                </Link>
              </div>
              <div className="text-center mb-10 animate-fade-in">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Globe className="w-8 h-8" />
                  </div>
                </div>
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400 mb-4">
                  Community Funding
                </h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Support social causes and community initiatives through our crowdfunding feature.
                </p>
              </div>
              
              <div className="glass-card rounded-xl p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-4">Featured Causes</h2>
                <div className="text-center py-20 text-muted-foreground">
                  <p>Community funding features will be implemented soon!</p>
                </div>
              </div>
            </div>
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

export default CommunityFunding;
