import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { MessageCircle, Menu } from 'lucide-react';

interface HeaderProps {
  onDemoClick: () => void;
}

export const Header = ({ onDemoClick }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { href: '#features', label: 'Features' },
    { href: '#languages', label: 'Languages' },
    { href: '#pricing', label: 'Pricing' },
  ];

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
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="text-gray-700 hover:text-orange-600 transition-colors"
              >
                {item.label}
              </button>
            ))}
            <Button 
              onClick={onDemoClick}
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Start Learning
            </Button>
          </nav>
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-6 mt-8">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className="text-left text-lg text-gray-700 hover:text-orange-600 transition-colors py-2"
                  >
                    {item.label}
                  </button>
                ))}
                <Button 
                  onClick={() => {
                    setIsOpen(false);
                    onDemoClick();
                  }}
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white w-full mt-4"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Start Learning
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
