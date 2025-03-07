
import { Emotion, RISKY_EMOTIONS, CAUTIOUS_EMOTIONS, BALANCED_EMOTIONS } from '../context/EmotionContext';

// This is a mock implementation for demo purposes
// In a real app, this would use actual emotion recognition APIs

export const detectEmotion = async (): Promise<{ emotion: Emotion; confidence: number }> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  // For demo, return a random emotion
  const emotions: Emotion[] = [
    'happy', 'sad', 'angry', 'anxious', 'neutral', 
    'excited', 'confident', 'frustrated', 'overwhelmed', 'content'
  ];
  const randomIndex = Math.floor(Math.random() * emotions.length);
  const randomEmotion = emotions[randomIndex];
  
  // Random confidence between 0.65 and 0.95
  const randomConfidence = Math.random() * (0.95 - 0.65) + 0.65;
  
  return {
    emotion: randomEmotion,
    confidence: parseFloat(randomConfidence.toFixed(2)),
  };
};

export const getEmotionColor = (emotion: Emotion): string => {
  switch (emotion) {
    case 'happy':
    case 'content':
      return 'bg-emotion-happy text-white';
    case 'sad':
      return 'bg-emotion-sad text-white';
    case 'angry':
    case 'frustrated':
      return 'bg-emotion-angry text-white';
    case 'anxious':
    case 'overwhelmed':
      return 'bg-emotion-anxious text-black';
    case 'excited':
      return 'bg-amber-400 text-black';
    case 'confident':
      return 'bg-emerald-600 text-white';
    case 'neutral':
    default:
      return 'bg-emotion-neutral text-white';
  }
};

export const getEmotionIcon = (emotion: Emotion): string => {
  switch (emotion) {
    case 'happy':
      return '😊';
    case 'content':
      return '😌';
    case 'sad':
      return '😔';
    case 'angry':
      return '😠';
    case 'frustrated':
      return '😤';
    case 'anxious':
      return '😰';
    case 'overwhelmed':
      return '😩';
    case 'excited':
      return '😃';
    case 'confident':
      return '😎';
    case 'neutral':
    default:
      return '😐';
  }
};

export const getEmotionLabel = (emotion: Emotion): string => {
  return emotion.charAt(0).toUpperCase() + emotion.slice(1);
};

export const getFinancialAdviceForEmotion = (emotion: Emotion): string => {
  // Risky emotions
  if (RISKY_EMOTIONS.includes(emotion)) {
    switch (emotion) {
      case 'excited':
        return "Your excitement may lead to impulsive purchases. Consider implementing a 24-hour waiting period for non-essential items.";
      case 'angry':
        return "Anger can cloud judgment. Take a moment to cool down before making any financial decisions today.";
      case 'frustrated':
        return "When frustrated, we often seek retail therapy. Try to address the source of frustration rather than spending to feel better.";
      case 'overwhelmed':
        return "Feeling overwhelmed can lead to hasty decisions. Focus on simplifying your finances today rather than making new commitments.";
    }
  }
  
  // Cautious emotions
  if (CAUTIOUS_EMOTIONS.includes(emotion)) {
    switch (emotion) {
      case 'anxious':
        return "Anxiety might make you overly cautious or impulsive with money. Consider stable, low-risk options if investing today.";
      case 'sad':
        return "When feeling sad, we often shop to feel better. Consider waiting 24 hours before making non-essential purchases.";
    }
  }
  
  // Balanced emotions
  if (BALANCED_EMOTIONS.includes(emotion)) {
    switch (emotion) {
      case 'neutral':
        return "Your emotional state is balanced - this is a good time to review your financial plans objectively.";
      case 'content':
        return "A content state of mind is perfect for thoughtful financial planning. Consider revisiting your long-term goals.";
      case 'confident':
        return "Confidence is great for financial decision-making, but balance it with careful research before making major moves.";
      case 'happy':
        return "Your positive mood is conducive to creative financial thinking, just be mindful of over-optimism in your projections.";
    }
  }
  
  return "Consider how your current emotional state might be influencing your financial decisions today.";
};

export const shouldBlockTransaction = (
  emotion: Emotion, 
  amount: number, 
  confidence: number
): boolean => {
  // Higher threshold for larger amounts
  const baseThreshold = 0.8;
  
  // Adjust threshold based on transaction size
  const amountFactor = amount > 500 ? 0.7 : amount > 100 ? 0.8 : 0.9;
  
  // Different emotions have different risk profiles
  const emotionRiskFactor = 
    RISKY_EMOTIONS.includes(emotion) ? 0.7 :
    CAUTIOUS_EMOTIONS.includes(emotion) ? 0.8 : 1.0;
  
  const threshold = baseThreshold * amountFactor * emotionRiskFactor;
  
  return confidence > threshold && RISKY_EMOTIONS.includes(emotion);
};
