
import React from 'react';
import { useEmotion } from '../context/EmotionContext';
import { getEmotionIcon, getEmotionLabel, getEmotionColor } from '../utils/emotionUtils';

interface EmotionDetectorProps {
  isDetecting: boolean;
}

const EmotionDetector: React.FC<EmotionDetectorProps> = ({ isDetecting }) => {
  const { emotionState } = useEmotion();
  const { currentEmotion, emotionConfidence, emotionDetectionEnabled } = emotionState;

  if (!emotionDetectionEnabled) {
    return (
      <div className="flex flex-col items-center justify-center h-40 bg-secondary/30 rounded-lg">
        <div className="text-4xl mb-2">🔍</div>
        <div className="text-center">Emotion detection is disabled</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl mb-4 transition-all duration-300 ${
        isDetecting ? 'animate-pulse-subtle' : ''
      } ${getEmotionColor(currentEmotion)}`}>
        {getEmotionIcon(currentEmotion)}
      </div>
      
      <div className="text-center mb-2">
        <div className="text-xl font-medium">{getEmotionLabel(currentEmotion)}</div>
        <div className="text-sm text-muted-foreground">
          Confidence: {(emotionConfidence * 100).toFixed(0)}%
        </div>
      </div>
      
      {isDetecting && (
        <div className="text-xs text-muted-foreground animate-pulse">
          Analyzing emotional state...
        </div>
      )}
    </div>
  );
};

export default EmotionDetector;
