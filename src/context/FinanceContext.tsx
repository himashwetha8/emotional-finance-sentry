
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Emotion } from './EmotionContext';

export interface Transaction {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: Date;
  type: 'expense' | 'income' | 'investment' | 'saving';
  emotion?: Emotion;
  emotionConfidence?: number;
  isImpulse?: boolean;
}

export interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
  period: 'daily' | 'weekly' | 'monthly';
}

export interface Account {
  id: string;
  name: string;
  balance: number;
  type: 'checking' | 'savings' | 'investment' | 'credit';
}

export interface FinancialInsight {
  id: string;
  title: string;
  description: string;
  emotionRelated: boolean;
  emotion?: Emotion;
  impactLevel: 'low' | 'medium' | 'high';
  date: Date;
}

interface FinanceState {
  transactions: Transaction[];
  accounts: Account[];
  budgets: Budget[];
  insights: FinancialInsight[];
  pendingTransactions: Transaction[];
}

interface FinanceContextType {
  financeState: FinanceState;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  addPendingTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  approvePendingTransaction: (id: string) => void;
  rejectPendingTransaction: (id: string) => void;
  updateAccount: (accountId: string, balance: number) => void;
  addInsight: (insight: Omit<FinancialInsight, 'id' | 'date'>) => void;
}

const initialFinanceState: FinanceState = {
  transactions: [],
  accounts: [
    {
      id: '1',
      name: 'Main Checking',
      balance: 4250.75,
      type: 'checking',
    },
    {
      id: '2',
      name: 'Savings',
      balance: 12750.50,
      type: 'savings',
    },
    {
      id: '3',
      name: 'Investment Portfolio',
      balance: 28450.25,
      type: 'investment',
    },
  ],
  budgets: [
    {
      id: '1',
      category: 'Food',
      limit: 500,
      spent: 320,
      period: 'monthly',
    },
    {
      id: '2',
      category: 'Entertainment',
      limit: 200,
      spent: 150,
      period: 'monthly',
    },
    {
      id: '3',
      category: 'Shopping',
      limit: 300,
      spent: 275,
      period: 'monthly',
    },
  ],
  insights: [],
  pendingTransactions: [],
};

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};

export const FinanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [financeState, setFinanceState] = useState<FinanceState>(initialFinanceState);

  const addTransaction = (transactionData: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transactionData,
      id: `tx-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    };

    setFinanceState((prev) => ({
      ...prev,
      transactions: [newTransaction, ...prev.transactions],
    }));

    // Update account balance
    if (transactionData.type === 'expense') {
      updateAccount('1', financeState.accounts[0].balance - transactionData.amount);
    } else if (transactionData.type === 'income') {
      updateAccount('1', financeState.accounts[0].balance + transactionData.amount);
    }
  };

  const addPendingTransaction = (transactionData: Omit<Transaction, 'id'>) => {
    const newPendingTransaction = {
      ...transactionData,
      id: `pending-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    };

    setFinanceState((prev) => ({
      ...prev,
      pendingTransactions: [newPendingTransaction, ...prev.pendingTransactions],
    }));
  };

  const approvePendingTransaction = (id: string) => {
    const pendingTx = financeState.pendingTransactions.find((tx) => tx.id === id);
    
    if (pendingTx) {
      // Add to regular transactions
      addTransaction({
        amount: pendingTx.amount,
        category: pendingTx.category,
        description: pendingTx.description,
        date: new Date(),
        type: pendingTx.type,
        emotion: pendingTx.emotion,
        emotionConfidence: pendingTx.emotionConfidence,
        isImpulse: pendingTx.isImpulse,
      });
      
      // Remove from pending
      setFinanceState((prev) => ({
        ...prev,
        pendingTransactions: prev.pendingTransactions.filter((tx) => tx.id !== id),
      }));
    }
  };

  const rejectPendingTransaction = (id: string) => {
    setFinanceState((prev) => ({
      ...prev,
      pendingTransactions: prev.pendingTransactions.filter((tx) => tx.id !== id),
    }));
  };

  const updateAccount = (accountId: string, balance: number) => {
    setFinanceState((prev) => ({
      ...prev,
      accounts: prev.accounts.map((account) =>
        account.id === accountId ? { ...account, balance } : account
      ),
    }));
  };

  const addInsight = (insightData: Omit<FinancialInsight, 'id' | 'date'>) => {
    const newInsight = {
      ...insightData,
      id: `insight-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      date: new Date(),
    };

    setFinanceState((prev) => ({
      ...prev,
      insights: [newInsight, ...prev.insights],
    }));
  };

  return (
    <FinanceContext.Provider
      value={{
        financeState,
        addTransaction,
        addPendingTransaction,
        approvePendingTransaction,
        rejectPendingTransaction,
        updateAccount,
        addInsight,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};
