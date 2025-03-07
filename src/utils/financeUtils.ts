import { format } from 'date-fns';
import { Emotion } from '../context/EmotionContext';
import { Account, Transaction } from '../context/FinanceContext';
import { 
  Calendar, 
  DollarSign, 
  ShoppingBag, 
  Coffee, 
  Film, 
  Heart, 
  Home, 
  Briefcase,
  Wallet,
  PiggyBank,
  TrendingUp,
  CreditCard
} from 'lucide-react';

// Define TransactionType from the Transaction type
export type TransactionType = 'expense' | 'income' | 'investment' | 'saving';

// Format currency with a dollar sign and two decimal places
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Format date to a readable string
export const formatDate = (date: Date): string => {
  return format(date, 'MMM d, yyyy');
};

// Get an icon for a transaction category
export const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'food':
      return Coffee;
    case 'shopping':
      return ShoppingBag;
    case 'entertainment':
      return Film;
    case 'healthcare':
      return Heart;
    case 'housing':
      return Home;
    case 'salary':
      return Briefcase;
    case 'investment':
      return TrendingUp;
    case 'saving':
      return PiggyBank;
    default:
      return Wallet;
  }
};

// Get color for transaction type
export const getTransactionTypeColor = (type: TransactionType): string => {
  switch (type) {
    case 'expense':
      return 'text-finance-expense';
    case 'income':
      return 'text-finance-income';
    case 'investment':
      return 'text-finance-investment';
    case 'saving':
      return 'text-finance-saving';
    default:
      return 'text-foreground';
  }
};

// Get the total balance across all accounts
export const getTotalBalance = (accounts: Account[]): number => {
  return accounts.reduce((total, account) => total + account.balance, 0);
};

// Get transactions for a specific account
export const getAccountTransactions = (
  transactions: Transaction[],
  accountId: string
): Transaction[] => {
  // The Transaction interface doesn't have an account property, 
  // so we'll just return transactions that match by id pattern or description
  if (accountId) {
    return transactions.filter((transaction) => 
      transaction.id.includes(accountId) || 
      transaction.description.toLowerCase().includes(accountId.toLowerCase())
    );
  }
  return transactions;
};

// Calculate the total for a specific transaction type (income, expense, etc.)
export const getTotalByType = (
  transactions: Transaction[],
  type: TransactionType
): number => {
  return transactions
    .filter((transaction) => transaction.type === type)
    .reduce((total, transaction) => total + transaction.amount, 0);
};

// Calculate spending by category
export const getSpendingByCategory = (
  transactions: Transaction[]
): Record<string, number> => {
  const categories: Record<string, number> = {};
  
  transactions
    .filter((transaction) => transaction.type === 'expense')
    .forEach((transaction) => {
      const { category, amount } = transaction;
      categories[category] = (categories[category] || 0) + amount;
    });
  
  return categories;
};

// Calculate spending by emotion
export const getSpendingByEmotion = (
  transactions: Transaction[]
): Record<Emotion, number> => {
  const emotions: Record<Emotion, number> = {
    happy: 0,
    sad: 0,
    angry: 0,
    anxious: 0,
    neutral: 0,
    excited: 0,
    confident: 0,
    frustrated: 0,
    overwhelmed: 0,
    content: 0
  };
  
  transactions
    .filter((transaction) => transaction.type === 'expense')
    .forEach((transaction) => {
      const { emotion, amount } = transaction;
      emotions[emotion] = (emotions[emotion] || 0) + amount;
    });
  
  return emotions;
};

// Determine if a transaction is an impulse purchase based on emotion and amount
export const isImpulsePurchase = (
  transaction: Transaction,
  userAvgSpending: number
): boolean => {
  const { emotion, amount, type } = transaction;
  
  if (type !== 'expense') return false;
  
  const impulsiveEmotions: Emotion[] = ['sad', 'angry', 'excited', 'overwhelmed'];
  const isImpulsiveEmotion = impulsiveEmotions.includes(emotion);
  const isHigherThanAvg = amount > userAvgSpending * 1.5;
  
  return isImpulsiveEmotion && isHigherThanAvg;
};

// Calculate average spending per transaction
export const getAverageSpending = (transactions: Transaction[]): number => {
  const expenses = transactions.filter(
    (transaction) => transaction.type === 'expense'
  );
  
  if (expenses.length === 0) return 0;
  
  const totalExpenses = expenses.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );
  
  return totalExpenses / expenses.length;
};
