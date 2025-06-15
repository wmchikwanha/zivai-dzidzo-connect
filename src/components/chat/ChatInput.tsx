
import React from 'react';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

interface ChatInputProps {
  inputMessage: string;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  isTyping: boolean;
  selectedLanguage: string;
}

export const ChatInput = ({ 
  inputMessage, 
  onInputChange, 
  onSendMessage, 
  isTyping, 
  selectedLanguage 
}: ChatInputProps) => {
  const getPlaceholder = () => {
    switch (selectedLanguage) {
      case 'shona': return 'Nyora mubvunzo wako...';
      case 'ndebele': return 'Bhala umbuzo wakho...';
      default: return 'Type your question...';
    }
  };

  return (
    <div className="p-4 border-t">
      <div className="flex space-x-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
          placeholder={getPlaceholder()}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
          disabled={isTyping}
        />
        <Button
          onClick={onSendMessage}
          disabled={!inputMessage.trim() || isTyping}
          className="bg-green-500 hover:bg-green-600 text-white px-4"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
