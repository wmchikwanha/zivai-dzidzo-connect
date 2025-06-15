
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Target, Zap, Lightbulb, Bot } from 'lucide-react';
import { ChatMessage as ChatMessageType } from './types';
import { MessageSuggestions } from './MessageSuggestions';

interface ChatMessageProps {
  message: ChatMessageType;
  onSuggestionClick: (suggestion: string) => void;
}

export const ChatMessage = ({ message, onSuggestionClick }: ChatMessageProps) => {
  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'business-basics': return <BookOpen className="w-4 h-4" />;
      case 'digital-hustles': return <Zap className="w-4 h-4" />;
      case 'practical-math': return <Target className="w-4 h-4" />;
      case 'tech-skills': return <Lightbulb className="w-4 h-4" />;
      default: return <Bot className="w-4 h-4" />;
    }
  };

  return (
    <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] rounded-lg p-3 ${
        message.type === 'user' 
          ? 'bg-green-500 text-white' 
          : 'bg-gray-100 text-gray-900'
      }`}>
        <div className="flex items-start space-x-2">
          {message.type === 'ai' && (
            <div className="flex-shrink-0 mt-1">
              {getCategoryIcon(message.category)}
            </div>
          )}
          <div className="flex-1">
            <p className="text-sm whitespace-pre-line">{message.content}</p>
            {message.category && (
              <Badge variant="outline" className="mt-2 text-xs">
                {message.category.replace('-', ' ')}
              </Badge>
            )}
          </div>
        </div>
        
        {message.suggestions && (
          <MessageSuggestions 
            suggestions={message.suggestions} 
            onSuggestionClick={onSuggestionClick} 
          />
        )}
      </div>
    </div>
  );
};
