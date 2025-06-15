
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Clock, Play, CheckCircle, ArrowRight, Lightbulb, BookOpen, Target, Zap, Calendar } from 'lucide-react';
import { MicroLesson, MicroLessonPart } from '@/data/microLearningContent';

interface MicroLearningModuleProps {
  lesson: MicroLesson;
  onComplete: () => void;
  selectedLanguage: string;
}

export const MicroLearningModule = ({ lesson, onComplete, selectedLanguage }: MicroLearningModuleProps) => {
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(lesson.parts[0]?.duration || 30);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isPartComplete, setIsPartComplete] = useState(false);

  const currentPart = lesson.parts[currentPartIndex];
  const progress = ((currentPartIndex + (isPartComplete ? 1 : 0)) / lesson.parts.length) * 100;

  useEffect(() => {
    setTimeRemaining(currentPart?.duration || 30);
    setIsTimerActive(false);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsPartComplete(false);
  }, [currentPartIndex, currentPart]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsTimerActive(false);
            if (!isPartComplete) setIsPartComplete(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeRemaining, isPartComplete]);

  const handleStartPart = () => {
    setIsTimerActive(true);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    setIsPartComplete(true);
    setIsTimerActive(false);
  };

  const handleNextPart = () => {
    if (currentPartIndex < lesson.parts.length - 1) {
      setCurrentPartIndex(currentPartIndex + 1);
    } else {
      onComplete();
    }
  };

  const getPartIcon = (type: MicroLessonPart['type']) => {
    switch (type) {
      case 'hook': return <Lightbulb className="w-5 h-5" />;
      case 'teach': return <BookOpen className="w-5 h-5" />;
      case 'practice': return <Target className="w-5 h-5" />;
      case 'apply': return <Zap className="w-5 h-5" />;
      case 'next': return <Calendar className="w-5 h-5" />;
      default: return <Play className="w-5 h-5" />;
    }
  };

  const getPartColor = (type: MicroLessonPart['type']) => {
    switch (type) {
      case 'hook': return 'from-yellow-500 to-orange-500';
      case 'teach': return 'from-blue-500 to-indigo-500';
      case 'practice': return 'from-green-500 to-emerald-500';
      case 'apply': return 'from-purple-500 to-pink-500';
      case 'next': return 'from-gray-500 to-slate-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-2xl mx-auto">
      {/* Header */}
      <div className={`bg-gradient-to-r ${getPartColor(currentPart.type)} text-white p-4`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            {getPartIcon(currentPart.type)}
            <span className="font-bold uppercase tracking-wide text-sm">
              {currentPart.type} ({currentPartIndex + 1}/5)
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Clock className="w-4 h-4" />
            <span>{formatTime(timeRemaining)}</span>
          </div>
        </div>
        <h3 className="text-xl font-bold">{currentPart.title}</h3>
        <Progress value={progress} className="mt-2 bg-white/20" />
      </div>

      {/* Content */}
      <div className="p-6">
        {!isTimerActive && !isPartComplete && (
          <div className="text-center">
            <div className="mb-4">
              <div className={`w-16 h-16 bg-gradient-to-r ${getPartColor(currentPart.type)} rounded-full flex items-center justify-center mx-auto mb-4`}>
                {getPartIcon(currentPart.type)}
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Ready for {currentPart.title}?
              </h4>
              <p className="text-gray-600 text-sm">
                Duration: {formatTime(currentPart.duration)}
              </p>
            </div>
            <Button onClick={handleStartPart} className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white">
              <Play className="w-4 h-4 mr-2" />
              Start {currentPart.type.charAt(0).toUpperCase() + currentPart.type.slice(1)}
            </Button>
          </div>
        )}

        {(isTimerActive || isPartComplete) && (
          <div className="space-y-4">
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-line text-gray-800 leading-relaxed">
                {currentPart.content}
              </div>
            </div>

            {/* Interactive Content */}
            {currentPart.interactive && currentPart.interactive.type === 'quiz' && (
              <div className="space-y-3">
                <h5 className="font-semibold text-gray-900">
                  {currentPart.interactive.question}
                </h5>
                <div className="space-y-2">
                  {currentPart.interactive.options?.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showResult}
                      variant={
                        showResult
                          ? index === currentPart.interactive!.correctAnswer
                            ? 'default'
                            : selectedAnswer === index
                            ? 'destructive'
                            : 'outline'
                          : 'outline'
                      }
                      className={`w-full text-left justify-start h-auto p-3 ${
                        showResult && index === currentPart.interactive!.correctAnswer
                          ? 'bg-green-500 hover:bg-green-600 text-white'
                          : ''
                      }`}
                    >
                      <span className="text-left whitespace-normal">{option}</span>
                      {showResult && index === currentPart.interactive!.correctAnswer && (
                        <CheckCircle className="w-4 h-4 ml-2 flex-shrink-0" />
                      )}
                    </Button>
                  ))}
                </div>

                {showResult && (
                  <div className={`p-3 rounded-lg ${
                    selectedAnswer === currentPart.interactive.correctAnswer
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-orange-50 border border-orange-200'
                  }`}>
                    <p className={`text-sm font-medium ${
                      selectedAnswer === currentPart.interactive.correctAnswer
                        ? 'text-green-800'
                        : 'text-orange-800'
                    }`}>
                      {selectedAnswer === currentPart.interactive.correctAnswer
                        ? (selectedLanguage === 'english' ? '🎉 Correct! Great job!' :
                           selectedLanguage === 'shona' ? '🎉 Zvakanaka! Mabata!' :
                           '🎉 Kulungile! Umsebenzi omuhle!')
                        : (selectedLanguage === 'english' ? '💡 Good try! The correct answer helps you maximize profits.' :
                           selectedLanguage === 'shona' ? '💡 Mukidza yakanaka! Mhinduro chaiyo inokubatsira kuwana purofiti yakawanda.' :
                           '💡 Ukuzama okuhle! Impendulo elungile ikusiza ukwandisa inzuzo.')}
                    </p>
                  </div>
                )}
              </div>
            )}

            {isPartComplete && (
              <div className="flex justify-end pt-4">
                <Button onClick={handleNextPart} className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white">
                  {currentPartIndex < lesson.parts.length - 1 ? (
                    <>
                      Next Part
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  ) : (
                    <>
                      Complete Lesson
                      <CheckCircle className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
