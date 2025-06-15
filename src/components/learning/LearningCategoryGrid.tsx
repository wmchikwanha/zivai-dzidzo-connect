
import React from 'react';
import { Button } from '@/components/ui/button';
import { Clock, BookOpen, TrendingUp } from 'lucide-react';
import { learningCategories } from '@/data/microLearningContent';

interface LearningCategoryGridProps {
  selectedLanguage: string;
  onCategorySelect: (categoryId: string) => void;
}

export const LearningCategoryGrid = ({ selectedLanguage, onCategorySelect }: LearningCategoryGridProps) => {
  const categories = learningCategories[selectedLanguage as keyof typeof learningCategories];

  if (!categories) return null;

  const getCategoryGradient = (categoryId: string) => {
    switch (categoryId) {
      case 'business-basics': return 'from-blue-500 to-indigo-600';
      case 'digital-hustles': return 'from-green-500 to-emerald-600';
      case 'practical-math': return 'from-purple-500 to-pink-600';
      case 'tech-skills': return 'from-orange-500 to-red-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {selectedLanguage === 'english' ? 'Choose Your Learning Path' :
           selectedLanguage === 'shona' ? 'Sarudza Nzira Yako Yekudzidza' :
           'Khetha Indlela Yakho Yokufunda'}
        </h2>
        <p className="text-gray-600">
          {selectedLanguage === 'english' ? 'Master practical skills in 5-minute micro-lessons' :
           selectedLanguage === 'shona' ? 'Dzidza zvinokosha mumaresioni emaminitsi 5' :
           'Funda amakhono asebenzayo emazifundweni amaminithi amahlanu'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.values(categories).map((category) => (
          <Button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className="h-auto p-0 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-900 hover:bg-gray-50"
            variant="outline"
          >
            <div className="w-full p-6">
              <div className={`w-16 h-16 bg-gradient-to-r ${getCategoryGradient(category.id)} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <span className="text-2xl">{category.icon}</span>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {category.title}
              </h3>
              
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {category.description}
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <BookOpen className="w-3 h-3" />
                  <span>{category.totalLessons} {selectedLanguage === 'english' ? 'lessons' : selectedLanguage === 'shona' ? 'maresoni' : 'izifundo'}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{category.estimatedTime}</span>
                </div>
              </div>
              
              <div className="mt-4 flex items-center justify-center space-x-1 text-xs font-medium text-green-600">
                <TrendingUp className="w-3 h-3" />
                <span>
                  {selectedLanguage === 'english' ? 'Start Learning' :
                   selectedLanguage === 'shona' ? 'Tanga Kudzidza' :
                   'Qala Ukufunda'}
                </span>
              </div>
            </div>
          </Button>
        ))}
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-lg">🎯</span>
          </div>
          <div>
            <h4 className="font-semibold text-green-800 mb-1">
              {selectedLanguage === 'english' ? 'Micro-Learning Method' :
               selectedLanguage === 'shona' ? 'Nzira ye-Micro-Learning' :
               'Indlela ye-Micro-Learning'}
            </h4>
            <p className="text-sm text-green-700">
              {selectedLanguage === 'english' 
                ? 'Each lesson takes exactly 5 minutes: Hook (30s) → Teach (2min) → Practice (1.5min) → Apply (1min) → Preview Next (30s)'
                : selectedLanguage === 'shona'
                ? 'Resoni rega rega rinotora maminitsi 5 chete: Hook (30s) → Kudzidzisa (2min) → Kudzidzira (1.5min) → Kushandisa (1min) → Kuona Rinotevera (30s)'
                : 'Isifundo ngasinye sitatha amaminithi amahlanu: I-Hook (30s) → Ukufundisa (2min) → Ukuprakthisa (1.5min) → Ukusebenzisa (1min) → Ukubuka Okulandelayo (30s)'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
