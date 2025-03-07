
import React from 'react';
import Header from '../components/Header';
import EmotionalDashboard from '../components/EmotionalDashboard';
import { EmotionProvider } from '../context/EmotionContext';
import { FinanceProvider } from '../context/FinanceContext';

const Index = () => {
  return (
    <EmotionProvider>
      <FinanceProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 pb-12">
            <EmotionalDashboard />
          </main>
        </div>
      </FinanceProvider>
    </EmotionProvider>
  );
};

export default Index;
