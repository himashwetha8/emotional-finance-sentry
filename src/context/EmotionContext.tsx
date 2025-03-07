
import React, { createContext, useState, useContext, ReactNode } from 'react';

export type Emotion = 'happy' | 'sad' | 'angry' | 'anxious' | 'neutral';

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

  return (
    <EmotionContext.Provider
      value={{
        emotionState,
        setCurrentEmotion,
        toggleEmotionDetection,
        resetEmotionHistory,
      }}
    >
      {children}
    </EmotionContext.Provider>
  );
};
