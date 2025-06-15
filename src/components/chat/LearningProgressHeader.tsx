
import React from 'react';
import { DollarSign } from 'lucide-react';

interface LearningProgressHeaderProps {
  selectedLanguage: string;
  userProgress: number;
}

export const LearningProgressHeader = ({ selectedLanguage, userProgress }: LearningProgressHeaderProps) => {
  const getProgressText = () => {
    switch (selectedLanguage) {
      case 'english': return 'Complete';
      case 'shona': return 'Yakapera';
      case 'ndebele': return 'Qediwe';
      default: return 'Complete';
    }
  };

  const getTitle = () => {
    switch (selectedLanguage) {
      case 'english': return 'WhatsApp Business Mastery';
      case 'shona': return 'WhatsApp Business Hunyanzvi';
      case 'ndebele': return 'I-WhatsApp Business Ubugcisa';
      default: return 'WhatsApp Business Mastery';
    }
  };

  return (
    <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-3 rounded-t-lg">
      <div className="flex items-center justify-between text-sm mb-2">
        <span className="font-semibold flex items-center">
          <DollarSign className="w-4 h-4 mr-1" />
          {getTitle()}
        </span>
        <span className="bg-white/20 px-2 py-1 rounded text-xs">
          {Math.round(userProgress)}% {getProgressText()}
        </span>
      </div>
      <div className="w-full bg-green-500/30 rounded-full h-3 relative overflow-hidden">
        <div 
          className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full transition-all duration-500 relative"
          style={{ width: `${userProgress}%` }}
        >
          {userProgress > 10 && (
            <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
          )}
        </div>
      </div>
    </div>
  );
};
