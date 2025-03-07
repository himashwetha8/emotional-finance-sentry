
import { Emotion } from '../context/EmotionContext';
import { Account, Transaction, TransactionType } from '../context/FinanceContext';

// Format currency with a dollar sign and two decimal places
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
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
  return transactions.filter((transaction) => transaction.accountId === accountId);
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
