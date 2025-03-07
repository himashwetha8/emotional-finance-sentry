
import React from 'react';
import { useEmotion } from '../context/EmotionContext';
import { getEmotionIcon, getEmotionLabel, getEmotionColor } from '../utils/emotionUtils';
import { Brain } from 'lucide-react';

const Header: React.FC = () => {
  const { emotionState, toggleEmotionDetection } = useEmotion();
  const { currentEmotion, emotionConfidence, emotionDetectionEnabled } = emotionState;

  return (
    <header className="glass sticky top-0 z-10 w-full py-4 px-6 mb-8 flex items-center justify-between">
      <div className="flex items-center">
        <Brain className="text-primary mr-2 h-6 w-6" />
        <div className="text-primary font-bold text-2xl mr-2">FinAI</div>
        <div className="text-primary-foreground/70 text-sm italic">
          Smart, Simple, Secure!
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {emotionDetectionEnabled && (
          <div className="hidden md:flex items-center">
            <div className="text-sm mr-2">Current Emotion:</div>
            <div 
              className={`flex items-center px-3 py-1 rounded-full text-sm ${getEmotionColor(currentEmotion)}`}
            >
              <span className="mr-1">{getEmotionIcon(currentEmotion)}</span>
              <span>{getEmotionLabel(currentEmotion)}</span>
              <span className="ml-2 text-xs opacity-80">{(emotionConfidence * 100).toFixed(0)}%</span>
            </div>
          </div>
        )}
        
        <button 
          onClick={toggleEmotionDetection}
          className={`px-3 py-1 rounded-md text-sm transition-colors ${
            emotionDetectionEnabled 
              ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
          }`}
        >
          {emotionDetectionEnabled ? 'Disable Emotion Detection' : 'Enable Emotion Detection'}
        </button>
      </div>
    </header>
  );
};

export default Header;
