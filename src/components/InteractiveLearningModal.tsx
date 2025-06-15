
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, BookOpen, Trophy, ArrowLeft } from 'lucide-react';
import { LearningChat } from './LearningChat';

interface InteractiveLearningModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InteractiveLearningModal = ({ isOpen, onClose }: InteractiveLearningModalProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [learningProgress, setLearningProgress] = useState(0);

  const resetLearning = () => {
    setSelectedLanguage(null);
    setLearningProgress(0);
  };

  const handleClose = () => {
    resetLearning();
    onClose();
  };

  const handleBack = () => {
    resetLearning();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg mx-auto max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            {selectedLanguage ? (
              <Button variant="ghost" size="sm" onClick={handleBack}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
            ) : null}
            <BookOpen className="w-5 h-5 text-green-600" />
            <span>ZivAI Interactive Learning</span>
          </DialogTitle>
        </DialogHeader>
        
        {!selectedLanguage ? (
          <div className="space-y-6 p-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Start Your AI Learning Journey
              </h3>
              <p className="text-gray-600 mb-6">
                Real lessons, real progress, real certificates. Choose your language to begin learning practical digital skills.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <Button 
                onClick={() => setSelectedLanguage('english')}
                className="flex items-center justify-center space-x-3 p-4 h-auto bg-white border-2 border-orange-200 hover:border-orange-400 hover:bg-orange-50 text-gray-900"
              >
                <span className="text-2xl">🇬🇧</span>
                <div className="text-left">
                  <p className="font-semibold">English</p>
                  <p className="text-sm text-gray-600">Digital Entrepreneurship Basics</p>
                </div>
              </Button>
              
              <Button 
                onClick={() => setSelectedLanguage('shona')}
                className="flex items-center justify-center space-x-3 p-4 h-auto bg-white border-2 border-orange-200 hover:border-orange-400 hover:bg-orange-50 text-gray-900"
              >
                <span className="text-2xl">🟡</span>
                <div className="text-left">
                  <p className="font-semibold">ChiShona</p>
                  <p className="text-sm text-gray-600">Mazano e-Digital Business</p>
                </div>
              </Button>
              
              <Button 
                onClick={() => setSelectedLanguage('ndebele')}
                className="flex items-center justify-center space-x-3 p-4 h-auto bg-white border-2 border-orange-200 hover:border-orange-400 hover:bg-orange-50 text-gray-900"
              >
                <span className="text-2xl">🔵</span>
                <div className="text-left">
                  <p className="font-semibold">IsiNdebele</p>
                  <p className="text-sm text-gray-600">Izisekelo ze-Digital Business</p>
                </div>
              </Button>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border border-orange-200">
              <p className="text-sm text-gray-700">
                <strong>✨ What you'll learn:</strong> How to start an online business, 
                validate ideas, reach customers through WhatsApp Business, and build sustainable income streams.
              </p>
            </div>
          </div>
        ) : (
          <div className="p-4">
            <div className="mb-4">
              <Badge variant="outline" className="mb-2">
                Learning: {selectedLanguage === 'english' ? 'English' : selectedLanguage === 'shona' ? 'ChiShona' : 'IsiNdebele'}
              </Badge>
              <h4 className="font-semibold text-gray-900">
                Digital Entrepreneurship Fundamentals
              </h4>
            </div>
            
            <LearningChat 
              selectedLanguage={selectedLanguage} 
              onProgress={setLearningProgress}
            />

            {learningProgress === 100 && (
              <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Trophy className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-800">Lesson Complete!</span>
                </div>
                <p className="text-sm text-green-700 mb-3">
                  You've successfully completed your first AI-powered lesson. Ready for more?
                </p>
                <Button 
                  onClick={handleClose}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Join ZivAI to Continue Learning
                </Button>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
</tml-write>

<lov-write file_path="src/hooks/useInteractiveLearning.tsx">
import { useState } from 'react';

export const useInteractiveLearning = () => {
  const [isLearningOpen, setIsLearningOpen] = useState(false);

  const openLearning = () => setIsLearningOpen(true);
  const closeLearning = () => setIsLearningOpen(false);

  return {
    isLearningOpen,
    openLearning,
    closeLearning
  };
};
