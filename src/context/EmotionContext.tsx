
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Expanded and more well-defined emotion types
export type Emotion = 'happy' | 'sad' | 'angry' | 'anxious' | 'neutral' | 'excited' | 'confident' | 'frustrated' | 'overwhelmed' | 'content';

// Emotion categories for financial decisions
export const RISKY_EMOTIONS: Emotion[] = ['excited', 'angry', 'frustrated', 'overwhelmed'];
export const CAUTIOUS_EMOTIONS: Emotion[] = ['anxious', 'sad'];
export const BALANCED_EMOTIONS: Emotion[] = ['neutral', 'content', 'confident', 'happy'];

export interface EmotionState {
  currentEmotion: Emotion;
  emotionConfidence: number;
  emotionHistory: Array<{ emotion: Emotion; timestamp: Date }>;
  emotionDetectionEnabled: boolean;
}

interface EmotionContextType {
  emotionState: EmotionState;
  setCurrentEmotion: (emotion: Emotion, confidence: number) => void;
  toggleEmotionDetection: () => void;
  resetEmotionHistory: () => void;
  isRiskyEmotion: (emotion: Emotion) => boolean;
  isCautiousEmotion: (emotion: Emotion) => boolean;
  isBalancedEmotion: (emotion: Emotion) => boolean;
}

const initialEmotionState: EmotionState = {
  currentEmotion: 'neutral',
  emotionConfidence: 0.8,
  emotionHistory: [],
  emotionDetectionEnabled: true,
};

const EmotionContext = createContext<EmotionContextType | undefined>(undefined);

export const useEmotion = () => {
  const context = useContext(EmotionContext);
  if (!context) {
    throw new Error('useEmotion must be used within an EmotionProvider');
  }
  return context;
};

export const EmotionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [emotionState, setEmotionState] = useState<EmotionState>(initialEmotionState);

  const setCurrentEmotion = (emotion: Emotion, confidence: number) => {
    setEmotionState((prev) => ({
      ...prev,
      currentEmotion: emotion,
      emotionConfidence: confidence,
      emotionHistory: [
        ...prev.emotionHistory,
        { emotion, timestamp: new Date() },
      ].slice(-50), // Keep last 50 emotion records
    }));
  };

  const toggleEmotionDetection = () => {
    setEmotionState((prev) => ({
      ...prev,
      emotionDetectionEnabled: !prev.emotionDetectionEnabled,
    }));
  };

  const resetEmotionHistory = () => {
    setEmotionState((prev) => ({
      ...prev,
      emotionHistory: [],
    }));
  };

  // Helper functions to categorize emotions for financial decisions
  const isRiskyEmotion = (emotion: Emotion): boolean => {
    return RISKY_EMOTIONS.includes(emotion);
  };

  const isCautiousEmotion = (emotion: Emotion): boolean => {
    return CAUTIOUS_EMOTIONS.includes(emotion);
  };

  const isBalancedEmotion = (emotion: Emotion): boolean => {
    return BALANCED_EMOTIONS.includes(emotion);
  };

  return (
    <EmotionContext.Provider
      value={{
        emotionState,
        setCurrentEmotion,
        toggleEmotionDetection,
        resetEmotionHistory,
        isRiskyEmotion,
        isCautiousEmotion,
        isBalancedEmotion,
      }}
    >
      {children}
    </EmotionContext.Provider>
  );
};
