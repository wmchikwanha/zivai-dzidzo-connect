
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Volume2 } from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoModal = ({ isOpen, onClose }: DemoModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [userInput, setUserInput] = useState('');

  const demoFlow = [
    {
      type: 'system',
      message: 'Welcome to ZivAI! 🇿🇼',
      delay: 0
    },
    {
      type: 'system',
      message: 'Choose your language to start learning:\n🇬🇧 English\n🟡 ChiShona\n🔵 IsiNdebele',
      delay: 1000
    },
    {
      type: 'language-select',
      delay: 2000
    }
  ];

  const languageContent = {
    english: {
      welcome: "Great choice! Let's start with digital entrepreneurship basics. 📱💼",
      lesson: "Today's lesson: Setting up your online business\n\n💡 Did you know? 78% of Zimbabwean businesses that go digital increase their income within 6 months!",
      question: "What's your main business goal?\nA) Increase sales\nB) Reach more customers\nC) Learn digital marketing",
      response: "Excellent! Let's create a learning path just for you. Your next lesson will arrive tomorrow at 9 AM. 🎯"
    },
    shona: {
      welcome: "Zvakanaka! Ngatiranganeyi kubva padanho rechekutanga reBhizinesi re-AI. 📱💼",
      lesson: "Chichemo chezuva ranhasi: Kutanga bhizinesi rako online\n\n💡 Waiziva here? 78% yemabhizinesi eZimbabwe anoenda online anowedzera mari mukati memwedzi mitanhatu!",
      question: "Chii chinangwa chako chikuru mubhizinesi?\nA) Kuwedzera kutengesa\nB) Kusvika kune vamwe vatengi\nC) Kudzidza digital marketing",
      response: "Zvakanaka! Ngatigadzireyi nzira yekudzidza yakakutenzirawao. Chichemo chako chinotevera chichasvika mangwana pa9 AM. 🎯"
    },
    ndebele: {
      welcome: "Kuhle! Asiqaleni ngezingqubo zokuqala zebhizinisi le-AI. 📱💼",
      lesson: "Isifundo sanamhla: Ukuqalisa ibhizinisi lakho online\n\n💡 Wawukwazi yini? I-78% yamabhizinisi aseZimbabwe aya online akhuphula imali ngaphakathi kwezinyanga eziyisithupha!",
      question: "Yini inhloso yakho enkulu ebhizinisini?\nA) Ukwandisa ukuthengisa\nB) Ukufinyelela amakhasimende amaningi\nC) Ukufunda i-digital marketing",
      response: "Kuhle kakhulu! Asakheni indlela yokufunda ekwenzelwe wena. Isifundo sakho esilandelayo sizofika kusasa ngo-9 AM. 🎯"
    }
  };

  const resetDemo = () => {
    setCurrentStep(0);
    setSelectedLanguage(null);
    setUserInput('');
  };

  useEffect(() => {
    if (isOpen) {
      resetDemo();
    }
  }, [isOpen]);

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    setCurrentStep(3);
  };

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const getCurrentContent = () => {
    if (!selectedLanguage) return null;
    return languageContent[selectedLanguage as keyof typeof languageContent];
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5 text-green-600" />
            <span>ZivAI WhatsApp Demo</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="bg-green-50 rounded-lg p-4 min-h-[400px]">
          {/* WhatsApp-style header */}
          <div className="bg-green-600 text-white p-3 rounded-t-lg mb-4 flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold">Z</span>
            </div>
            <div>
              <p className="font-semibold text-sm">ZivAI Assistant</p>
              <p className="text-xs opacity-90">Online now</p>
            </div>
          </div>

          {/* Chat messages */}
          <div className="space-y-3">
            {currentStep >= 0 && (
              <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-green-500">
                <p className="text-sm">{demoFlow[0].message}</p>
              </div>
            )}
            
            {currentStep >= 1 && (
              <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-green-500">
                <p className="text-sm whitespace-pre-line">{demoFlow[1].message}</p>
              </div>
            )}

            {currentStep >= 2 && !selectedLanguage && (
              <div className="flex space-x-2 justify-center">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleLanguageSelect('english')}
                  className="text-xs"
                >
                  🇬🇧 English
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleLanguageSelect('shona')}
                  className="text-xs"
                >
                  🟡 ChiShona
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleLanguageSelect('ndebele')}
                  className="text-xs"
                >
                  🔵 IsiNdebele
                </Button>
              </div>
            )}

            {currentStep >= 3 && selectedLanguage && (
              <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-green-500">
                <p className="text-sm">{getCurrentContent()?.welcome}</p>
              </div>
            )}

            {currentStep >= 4 && selectedLanguage && (
              <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-green-500">
                <p className="text-sm whitespace-pre-line">{getCurrentContent()?.lesson}</p>
                <Button size="sm" variant="ghost" className="mt-2 text-xs">
                  <Volume2 className="w-3 h-3 mr-1" />
                  Listen
                </Button>
              </div>
            )}

            {currentStep >= 5 && selectedLanguage && (
              <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-green-500">
                <p className="text-sm whitespace-pre-line">{getCurrentContent()?.question}</p>
              </div>
            )}

            {currentStep >= 5 && selectedLanguage && currentStep < 6 && (
              <div className="flex space-x-2 justify-center">
                <Button size="sm" variant="outline" onClick={handleNext} className="text-xs">A</Button>
                <Button size="sm" variant="outline" onClick={handleNext} className="text-xs">B</Button>
                <Button size="sm" variant="outline" onClick={handleNext} className="text-xs">C</Button>
              </div>
            )}

            {currentStep >= 6 && selectedLanguage && (
              <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500">
                <p className="text-sm">{getCurrentContent()?.response}</p>
              </div>
            )}
          </div>

          {/* Demo controls */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <Badge variant="outline" className="text-xs">
                Demo Mode
              </Badge>
              <div className="space-x-2">
                {currentStep < 6 && selectedLanguage && (
                  <Button size="sm" onClick={handleNext} disabled={currentStep >= 6}>
                    <Send className="w-3 h-3 mr-1" />
                    Next
                  </Button>
                )}
                <Button size="sm" variant="outline" onClick={resetDemo}>
                  Restart
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center pt-4">
          <p className="text-sm text-gray-600 mb-4">
            This is just a demo! The real experience happens directly in your WhatsApp.
          </p>
          <Button 
            onClick={onClose}
            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Text "DZIDZO" to Start Real Learning
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
