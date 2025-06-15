
import React from 'react';
import { Zap, Users } from 'lucide-react';

interface ChatHeaderProps {
  selectedLanguage: string;
}

export const ChatHeader = ({ selectedLanguage }: ChatHeaderProps) => {
  const getLiveText = () => {
    switch (selectedLanguage) {
      case 'english': return 'Live • Teaching 1,000+ entrepreneurs';
      case 'shona': return 'Live • Kudzidzisa 1,000+ vanoshanda';
      case 'ndebele': return 'Live • Efundisa 1,000+ osomabhizinisi';
      default: return 'Live • Teaching 1,000+ entrepreneurs';
    }
  };

  return (
    <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-3 flex items-center space-x-3 border-b border-green-500">
      <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center relative">
        <span className="text-sm font-bold text-green-800">Z</span>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
      </div>
      <div>
        <p className="font-semibold text-sm flex items-center">
          <Zap className="w-4 h-4 mr-1" />
          ZivAI Business Mentor
        </p>
        <p className="text-xs opacity-90 flex items-center">
          <Users className="w-3 h-3 mr-1" />
          {getLiveText()}
        </p>
      </div>
    </div>
  );
};
