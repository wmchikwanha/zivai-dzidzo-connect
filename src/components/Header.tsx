
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, Menu } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-white/90 backdrop-blur-sm border-b border-orange-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">Z</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">ZivAI</h1>
              <p className="text-sm text-orange-600">Know AI • Ziva AI • UbuHlakani be-AI</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-gray-700 hover:text-orange-600 transition-colors">Features</a>
            <a href="#languages" className="text-gray-700 hover:text-orange-600 transition-colors">Languages</a>
            <a href="#pricing" className="text-gray-700 hover:text-orange-600 transition-colors">Pricing</a>
            <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white">
              <MessageCircle className="w-4 h-4 mr-2" />
              Start Learning
            </Button>
          </nav>
          
          <Button variant="ghost" className="md:hidden">
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </header>
  );
};
