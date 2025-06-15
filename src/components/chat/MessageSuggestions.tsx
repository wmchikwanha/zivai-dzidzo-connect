
import React from 'react';
import { Button } from '@/components/ui/button';

interface MessageSuggestionsProps {
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
}

export const MessageSuggestions = ({ suggestions, onSuggestionClick }: MessageSuggestionsProps) => {
  return (
    <div className="mt-3 space-y-1">
      {suggestions.map((suggestion, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          onClick={() => onSuggestionClick(suggestion)}
          className="text-xs h-7 w-full justify-start"
        >
          {suggestion}
        </Button>
      ))}
    </div>
  );
};
