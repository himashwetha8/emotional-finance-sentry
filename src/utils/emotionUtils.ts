
import { Emotion } from '../context/EmotionContext';

// This is a mock implementation for demo purposes
// In a real app, this would use actual emotion recognition APIs

export const detectEmotion = async (): Promise<{ emotion: Emotion; confidence: number }> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  // For demo, return a random emotion
  const emotions: Emotion[] = ['happy', 'sad', 'angry', 'anxious', 'neutral'];
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
      return 'bg-emotion-happy text-white';
    case 'sad':
      return 'bg-emotion-sad text-white';
    case 'angry':
      return 'bg-emotion-angry text-white';
    case 'anxious':
      return 'bg-emotion-anxious text-black';
    case 'neutral':
    default:
      return 'bg-emotion-neutral text-white';
  }
};

export const getEmotionIcon = (emotion: Emotion): string => {
  switch (emotion) {
    case 'happy':
      return '😊';
    case 'sad':
      return '😔';
    case 'angry':
      return '😠';
    case 'anxious':
      return '😰';
    case 'neutral':
    default:
      return '😐';
  }
};

export const getEmotionLabel = (emotion: Emotion): string => {
  return emotion.charAt(0).toUpperCase() + emotion.slice(1);
};

export const getFinancialAdviceForEmotion = (emotion: Emotion): string => {
  switch (emotion) {
    case 'happy':
      return "You're feeling happy! That's great, but be cautious about making impulsive purchases driven by excitement.";
    case 'sad':
      return "When feeling sad, we often shop to feel better. Consider waiting 24 hours before making non-essential purchases.";
    case 'angry':
      return "Anger can lead to reactive financial decisions. Take a moment to calm down before proceeding with any transactions.";
    case 'anxious':
      return "Anxiety might make you overly cautious or impulsive with money. Consider stable, low-risk options if investing today.";
    case 'neutral':
    default:
      return "Your emotional state is balanced - this is a good time to review your financial plans objectively.";
  }
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
    emotion === 'angry' ? 0.7 :
    emotion === 'sad' ? 0.75 :
    emotion === 'anxious' ? 0.8 :
    emotion === 'happy' ? 0.85 : 1.0;
  
  const threshold = baseThreshold * amountFactor * emotionRiskFactor;
  
  return confidence > threshold && (emotion === 'angry' || emotion === 'sad' || emotion === 'anxious');
};
