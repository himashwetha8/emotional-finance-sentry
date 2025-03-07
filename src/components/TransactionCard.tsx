
import React from 'react';
import { Transaction } from '../context/FinanceContext';
import { useFinance } from '../context/FinanceContext';
import { formatCurrency, formatDate, getCategoryIcon, getTransactionTypeColor } from '../utils/financeUtils';
import { getEmotionIcon, getEmotionColor } from '../utils/emotionUtils';

interface TransactionCardProps {
  transaction: Transaction;
  isPending?: boolean;
}

const TransactionCard: React.FC<TransactionCardProps> = ({ transaction, isPending = false }) => {
  const { approvePendingTransaction, rejectPendingTransaction } = useFinance();
  const { id, amount, category, description, date, type, emotion, isImpulse } = transaction;

  const handleApprove = () => {
    approvePendingTransaction(id);
  };

  const handleReject = () => {
    rejectPendingTransaction(id);
  };

  // Get the icon component for the category
  const IconComponent = getCategoryIcon(category);

  return (
    <div className={`relative bg-secondary/40 rounded-lg p-4 hover:bg-secondary/60 transition-colors ${
      isPending ? 'border border-primary/30' : ''
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-lg">
            <IconComponent className="h-5 w-5" />
          </div>
          <div>
            <div className="font-medium">{description}</div>
            <div className="text-sm text-muted-foreground">{category} • {formatDate(date)}</div>
          </div>
        </div>
        <div className={`font-semibold ${getTransactionTypeColor(type)}`}>
          {type === 'expense' ? '-' : '+'}{formatCurrency(amount)}
        </div>
      </div>
      
      {emotion && (
        <div className="mt-2 flex items-center">
          <div className={`text-xs px-2 py-0.5 rounded-full ${getEmotionColor(emotion)}`}>
            <span className="mr-1">{getEmotionIcon(emotion)}</span>
            <span>{emotion}</span>
          </div>
          {isImpulse && (
            <div className="ml-2 text-xs px-2 py-0.5 rounded-full bg-destructive/80 text-destructive-foreground">
              Impulse
            </div>
          )}
        </div>
      )}
      
      {isPending && (
        <div className="mt-3 flex justify-end space-x-2">
          <button 
            onClick={handleReject}
            className="px-3 py-1 text-sm rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors"
          >
            Decline
          </button>
          <button 
            onClick={handleApprove}
            className="px-3 py-1 text-sm rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Approve
          </button>
        </div>
      )}
    </div>
  );
};

export default TransactionCard;
