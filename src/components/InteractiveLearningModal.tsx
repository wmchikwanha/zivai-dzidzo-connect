
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, BookOpen, Trophy, ArrowLeft, Star } from 'lucide-react';
import { LearningCategoryGrid } from './learning/LearningCategoryGrid';
import { MicroLearningModule } from './learning/MicroLearningModule';
import { sampleMicroLessons } from '@/data/microLearningContent';

interface InteractiveLearningModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InteractiveLearningModal = ({ isOpen, onClose }: InteractiveLearningModalProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [learningProgress, setLearningProgress] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  const resetLearning = () => {
    setSelectedLanguage(null);
    setSelectedCategory(null);
    setCurrentLessonIndex(0);
    setLearningProgress(0);
    setCompletedLessons([]);
  };

  const handleClose = () => {
    resetLearning();
    onClose();
  };

  const handleBack = () => {
    if (selectedCategory) {
      setSelectedCategory(null);
      setCurrentLessonIndex(0);
    } else if (selectedLanguage) {
      setSelectedLanguage(null);
    }
  };

  const handleLessonComplete = () => {
    const currentLessons = sampleMicroLessons[selectedLanguage as keyof typeof sampleMicroLessons] || [];
    const currentLesson = currentLessons[currentLessonIndex];
    
    if (currentLesson && !completedLessons.includes(currentLesson.id)) {
      setCompletedLessons(prev => [...prev, currentLesson.id]);
    }
    
    // For demo purposes, just show completion
    setLearningProgress(100);
  };

  const getCurrentLesson = () => {
    if (!selectedLanguage) return null;
    const lessons = sampleMicroLessons[selectedLanguage as keyof typeof sampleMicroLessons] || [];
    return lessons[currentLessonIndex] || null;
  };

  const currentLesson = getCurrentLesson();

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            {(selectedLanguage && (selectedCategory || currentLesson)) && (
              <Button variant="ghost" size="sm" onClick={handleBack}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            <BookOpen className="w-5 h-5 text-green-600" />
            <span>ZivAI Micro-Learning</span>
            {learningProgress === 100 && (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                <Trophy className="w-3 h-3 mr-1" />
                Lesson Complete!
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>
        
        <div className="p-4">
          {!selectedLanguage ? (
            // Language Selection
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Start Your Micro-Learning Journey
                </h3>
                <p className="text-gray-600 mb-6">
                  Learn practical skills in focused 5-minute lessons. Choose your language to begin.
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
                    <p className="text-sm text-gray-600">Practical Business Skills</p>
                  </div>
                </Button>
                
                <Button 
                  onClick={() => setSelectedLanguage('shona')}
                  className="flex items-center justify-center space-x-3 p-4 h-auto bg-white border-2 border-orange-200 hover:border-orange-400 hover:bg-orange-50 text-gray-900"
                >
                  <span className="text-2xl">🟡</span>
                  <div className="text-left">
                    <p className="font-semibold">ChiShona</p>
                    <p className="text-sm text-gray-600">Hunyanzvi hweBhizinesi</p>
                  </div>
                </Button>
                
                <Button 
                  onClick={() => setSelectedLanguage('ndebele')}
                  className="flex items-center justify-center space-x-3 p-4 h-auto bg-white border-2 border-orange-200 hover:border-orange-400 hover:bg-orange-50 text-gray-900"
                >
                  <span className="text-2xl">🔵</span>
                  <div className="text-left">
                    <p className="font-semibold">IsiNdebele</p>
                    <p className="text-sm text-gray-600">Amakhono eBhizinisi</p>
                  </div>
                </Button>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border border-orange-200">
                <p className="text-sm text-gray-700">
                  <strong>✨ New Micro-Learning Format:</strong> Each lesson is exactly 5 minutes with 
                  Hook → Teach → Practice → Apply → Preview structure for maximum retention and immediate application.
                </p>
              </div>
            </div>
          ) : !selectedCategory && !currentLesson ? (
            // Category Selection
            <LearningCategoryGrid 
              selectedLanguage={selectedLanguage}
              onCategorySelect={setSelectedCategory}
            />
          ) : currentLesson ? (
            // Lesson Content
            <div className="space-y-4">
              <MicroLearningModule
                lesson={currentLesson}
                onComplete={handleLessonComplete}
                selectedLanguage={selectedLanguage}
              />

              {learningProgress === 100 && (
                <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Trophy className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-green-800 mb-2">
                      {selectedLanguage === 'english' ? 'Micro-Lesson Complete!' :
                       selectedLanguage === 'shona' ? 'Resoni Rapera!' :
                       'Isifundo Siqediwe!'}
                    </h4>
                    <p className="text-green-700 mb-4">
                      {selectedLanguage === 'english' 
                        ? 'You\'ve mastered practical WhatsApp Business skills! Ready to unlock the full curriculum with 30+ lessons?'
                        : selectedLanguage === 'shona'
                        ? 'Mava ne-master practical WhatsApp Business skills! Makagadzirira kuvhura curriculum yakazara ine 30+ maresoni?'
                        : 'Usubone amakhono e-WhatsApp Business asebenzayo! Usukulungele ukuvula ikharikyu-lamu egcwele enamafundo angama-30+?'
                      }
                    </p>
                    <div className="flex space-x-3 justify-center">
                      <Button 
                        onClick={handleClose}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        {selectedLanguage === 'english' ? 'Join Full Program' :
                         selectedLanguage === 'shona' ? 'Joina Program Yakazara' :
                         'Joyina Uhlelo Olugcwele'}
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => setSelectedCategory(null)}
                        className="border-green-300 hover:bg-green-50"
                      >
                        <Star className="w-4 h-4 mr-2" />
                        {selectedLanguage === 'english' ? 'Try Another Category' :
                         selectedLanguage === 'shona' ? 'Edza Chimwe Chikamu' :
                         'Zama Esinye Isigaba'}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
};
