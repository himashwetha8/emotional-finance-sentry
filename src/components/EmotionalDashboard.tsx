
import React, { useState, useEffect } from 'react';
import { useEmotion } from '../context/EmotionContext';
import { useFinance } from '../context/FinanceContext';
import { formatCurrency, getTotalBalance } from '../utils/financeUtils';
import { getFinancialAdviceForEmotion, detectEmotion } from '../utils/emotionUtils';
import TransactionCard from './TransactionCard';
import FinancialInsight from './FinancialInsight';
import EmotionDetector from './EmotionDetector';
import AdvisorChat from './AdvisorChat';

const EmotionalDashboard: React.FC = () => {
  const { emotionState, setCurrentEmotion } = useEmotion();
  const { financeState, addInsight } = useFinance();
  const { currentEmotion, emotionDetectionEnabled } = emotionState;
  const { accounts, transactions, insights, pendingTransactions } = financeState;
  
  const [isDetecting, setIsDetecting] = useState(false);

  // Simulate emotion detection
  useEffect(() => {
    if (emotionDetectionEnabled && !isDetecting) {
      const detectEmotionPeriodically = async () => {
        setIsDetecting(true);
        try {
          const result = await detectEmotion();
          setCurrentEmotion(result.emotion, result.confidence);
        } finally {
          setIsDetecting(false);
        }
      };

      const timer = setTimeout(detectEmotionPeriodically, 10000);
      return () => clearTimeout(timer);
    }
  }, [emotionDetectionEnabled, currentEmotion, setCurrentEmotion, isDetecting]);

  // Total balance across all accounts
  const totalBalance = getTotalBalance(accounts);

  // Most recent transactions
  const recentTransactions = [...transactions].slice(0, 5);
  
  // Latest insights
  const latestInsights = [...insights].slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Account Summary Card */}
        <div className="glass-card rounded-xl p-6 md:col-span-2 flex flex-col">
          <h2 className="text-xl font-semibold mb-4">Account Summary</h2>
          <div className="flex-1 flex flex-col justify-center">
            <div className="text-3xl font-bold mb-2">{formatCurrency(totalBalance)}</div>
            <p className="text-muted-foreground">Total Balance</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            {accounts.map((account) => (
              <div key={account.id} className="bg-secondary/50 p-4 rounded-lg">
                <div className="text-sm text-muted-foreground">{account.name}</div>
                <div className="font-medium">{formatCurrency(account.balance)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Emotion Detection Card */}
        <div className="glass-card rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Emotion Tracker</h2>
          <EmotionDetector isDetecting={isDetecting} />
          <div className="mt-4 bg-secondary/50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Financial Advice</h3>
            <p className="text-sm text-muted-foreground">
              {getFinancialAdviceForEmotion(currentEmotion)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Recent Transactions Card */}
        <div className="glass-card rounded-xl p-6 md:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Transactions</h2>
            <button className="text-sm text-primary hover:text-primary/80 transition-colors">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <TransactionCard key={transaction.id} transaction={transaction} />
            ))}
            {recentTransactions.length === 0 && (
              <div className="text-center py-6 text-muted-foreground">
                No transactions yet
              </div>
            )}
          </div>
        </div>

        {/* Financial Insights Card */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Financial Insights</h2>
            <button className="text-sm text-primary hover:text-primary/80 transition-colors">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {latestInsights.map((insight) => (
              <FinancialInsight key={insight.id} insight={insight} />
            ))}
            {latestInsights.length === 0 && (
              <div className="text-center py-6 text-muted-foreground">
                No insights yet
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pending Transactions (if any) */}
      {pendingTransactions.length > 0 && (
        <div className="glass-card rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Pending Approvals</h2>
          <div className="space-y-3">
            {pendingTransactions.map((transaction) => (
              <TransactionCard 
                key={transaction.id} 
                transaction={transaction} 
                isPending 
              />
            ))}
          </div>
        </div>
      )}

      {/* AI Financial Advisor */}
      <div className="glass-card rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">AI Financial Advisor</h2>
        <AdvisorChat />
      </div>
    </div>
  );
};

export default EmotionalDashboard;
