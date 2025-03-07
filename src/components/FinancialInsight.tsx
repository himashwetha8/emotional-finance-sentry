
import React from 'react';
import { FinancialInsight as InsightType } from '../context/FinanceContext';
import { formatDate } from '../utils/financeUtils';
import { getEmotionIcon } from '../utils/emotionUtils';

interface FinancialInsightProps {
  insight: InsightType;
}

const FinancialInsight: React.FC<FinancialInsightProps> = ({ insight }) => {
  const { title, description, emotionRelated, emotion, impactLevel, date } = insight;
  
  const getImpactColor = (level: 'low' | 'medium' | 'high') => {
    switch (level) {
      case 'high':
        return 'bg-finance-expense/10 text-finance-expense border-finance-expense/30';
      case 'medium':
        return 'bg-finance-investment/10 text-finance-investment border-finance-investment/30';
      case 'low':
        return 'bg-finance-saving/10 text-finance-saving border-finance-saving/30';
      default:
        return 'bg-muted/50 text-muted-foreground border-border';
    }
  };

  return (
    <div className={`p-4 rounded-lg border ${getImpactColor(impactLevel)} hover-lift`}>
      <div className="font-medium mb-1">{title}</div>
      <p className="text-sm text-muted-foreground mb-2">{description}</p>
      <div className="flex justify-between items-center text-xs">
        <div className="flex items-center">
          {emotionRelated && emotion && (
            <span className="mr-1">
              {getEmotionIcon(emotion)}
            </span>
          )}
          <span>{formatDate(date)}</span>
        </div>
        <div className="capitalize">{impactLevel} Impact</div>
      </div>
    </div>
  );
};

export default FinancialInsight;
