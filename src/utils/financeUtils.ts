
import { Transaction, Budget, Account, FinancialInsight } from '../context/FinanceContext';
import { Emotion } from '../context/EmotionContext';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

export const getCategoryIcon = (category: string): string => {
  const icons: Record<string, string> = {
    'Food': '🍔',
    'Groceries': '🛒',
    'Shopping': '🛍️',
    'Entertainment': '🎬',
    'Travel': '✈️',
    'Transport': '🚗',
    'Housing': '🏠',
    'Utilities': '💡',
    'Healthcare': '⚕️',
    'Education': '📚',
    'Fitness': '💪',
    'Technology': '💻',
    'Clothing': '👕',
    'Gifts': '🎁',
    'Investments': '📈',
    'Salary': '💰',
    'Freelance': '💼',
    'Savings': '🏦',
  };

  return icons[category] || '💼';
};

export const getTransactionTypeColor = (type: Transaction['type']): string => {
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

export const getSpendingByEmotion = (
  transactions: Transaction[]
): Record<Emotion, number> => {
  const spendingByEmotion: Record<Emotion, number> = {
    happy: 0,
    sad: 0,
    angry: 0,
    anxious: 0,
    neutral: 0,
  };

  transactions.forEach((transaction) => {
    if (transaction.type === 'expense' && transaction.emotion) {
      spendingByEmotion[transaction.emotion] += transaction.amount;
    }
  });

  return spendingByEmotion;
};

export const getTotalBalance = (accounts: Account[]): number => {
  return accounts.reduce((total, account) => total + account.balance, 0);
};

export const getBudgetStatus = (
  budget: Budget
): 'on-track' | 'warning' | 'over-budget' => {
  const percentage = (budget.spent / budget.limit) * 100;
  
  if (percentage < 70) {
    return 'on-track';
  } else if (percentage < 100) {
    return 'warning';
  } else {
    return 'over-budget';
  }
};

export const generateInsight = (
  transactions: Transaction[],
  currentEmotion: Emotion
): FinancialInsight => {
  // This is simplified for demo purposes
  // In a real app, this would use more sophisticated analysis

  const insights = [
    {
      title: "Emotion-Driven Spending Detected",
      description: "You tend to spend more on shopping when feeling sad. Consider setting spending limits for when this emotion is detected.",
      emotionRelated: true,
      emotion: 'sad' as Emotion,
      impactLevel: 'medium' as const,
    },
    {
      title: "Investment Opportunity",
      description: "Based on your current financial situation and emotional state, now might be a good time to consider increasing your retirement contributions.",
      emotionRelated: false,
      impactLevel: 'high' as const,
    },
    {
      title: "Budget Alert",
      description: "You're approaching your entertainment budget limit for this month. Consider more cost-effective activities for the rest of the period.",
      emotionRelated: false,
      impactLevel: 'medium' as const,
    },
    {
      title: "Emotional Spending Pattern",
      description: "When feeling anxious, you've made several impulse purchases in the technology category. Consider implementing a 24-hour waiting period for these items.",
      emotionRelated: true,
      emotion: 'anxious' as Emotion,
      impactLevel: 'high' as const,
    },
    {
      title: "Saving Recommendation",
      description: "Your current financial stability and emotional baseline suggest this is an ideal time to increase your emergency fund contributions.",
      emotionRelated: true,
      emotion: 'neutral' as Emotion,
      impactLevel: 'medium' as const,
    },
  ];

  // Select a random insight for demo purposes
  const randomIndex = Math.floor(Math.random() * insights.length);
  return {
    id: `insight-${Date.now()}`,
    date: new Date(),
    ...insights[randomIndex],
  };
};
