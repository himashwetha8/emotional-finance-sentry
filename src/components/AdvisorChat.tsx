
import React, { useState, useRef, useEffect } from 'react';
import { useEmotion } from '../context/EmotionContext';
import { getEmotionIcon, getFinancialAdviceForEmotion } from '../utils/emotionUtils';
import { mockChatMessages } from '../data/mockData';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const AdvisorChat: React.FC = () => {
  const { emotionState, isRiskyEmotion, isCautiousEmotion } = useEmotion();
  const { currentEmotion } = emotionState;
  
  // Ensure mockChatMessages is properly typed with 'user' | 'ai' for sender
  const [messages, setMessages] = useState<Message[]>(
    mockChatMessages.map(msg => ({
      ...msg,
      sender: msg.sender as 'user' | 'ai'
    }))
  );
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: `msg-${Date.now()}-user`,
      sender: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: `msg-${Date.now()}-ai`,
        sender: 'ai',
        content: generateAIResponse(inputValue, currentEmotion),
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userMessage: string, emotion: string): string => {
    // This is a simplified mock response generator
    // In a real app, this would call an actual AI service
    
    const lowerCaseMessage = userMessage.toLowerCase();
    
    if (lowerCaseMessage.includes('invest') || lowerCaseMessage.includes('stock')) {
      return `I notice you're feeling ${emotion} today. Based on your emotional state, now might ${isRiskyEmotion(emotion as any) || isCautiousEmotion(emotion as any) ? 'not be' : 'be'} a good time to make investment decisions. ${getEmotionIcon(emotion as any)} ${emotion === 'anxious' ? 'Consider waiting until you feel more balanced, or focus on lower-risk investments for now.' : ''}`;
    }
    
    if (lowerCaseMessage.includes('spend') || lowerCaseMessage.includes('buy') || lowerCaseMessage.includes('purchase')) {
      return `Before making a purchase, I'd like to note that you're feeling ${emotion} today. ${getEmotionIcon(emotion as any)} People often make ${emotion === 'happy' || emotion === 'excited' ? 'impulsive purchases when excited' : 'comfort purchases when feeling down'}. Would you like to set a 24-hour waiting period for this purchase?`;
    }
    
    if (lowerCaseMessage.includes('save') || lowerCaseMessage.includes('budget')) {
      return `That's a great topic to discuss! Your emotional state (${emotion}) ${getEmotionIcon(emotion as any)} is actually ideal for planning and budgeting. Based on your recent spending patterns, I recommend setting aside 15% of your income for savings. Would you like me to suggest a detailed savings plan?`;
    }
    
    return `Thanks for your message. I notice you're feeling ${emotion} today ${getEmotionIcon(emotion as any)}. ${getFinancialAdviceForEmotion(emotion as any)} How can I help you with your financial decisions today?`;
  };

  return (
    <div className="flex flex-col h-96">
      <div className="flex-1 overflow-y-auto mb-4 pr-2">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                  message.sender === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-secondary-foreground'
                }`}
              >
                <div className="text-sm">{message.content}</div>
                <div className="text-xs mt-1 opacity-70">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-secondary text-secondary-foreground px-4 py-3 rounded-2xl flex items-center space-x-1">
                <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="flex space-x-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          placeholder="Ask your financial advisor..."
          className="flex-1 px-4 py-2 bg-secondary rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <button
          onClick={handleSendMessage}
          disabled={!inputValue.trim() || isTyping}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AdvisorChat;
