
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Smartphone, Users, Play } from 'lucide-react';

interface HeroProps {
  onLearningClick: () => void;
}

export const Hero = ({ onLearningClick }: HeroProps) => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="bg-orange-100 text-orange-800 border-orange-200 mb-6">
            🇿🇼 Made for Zimbabwe • Yakagadzirirwa Zimbabwe • Yenzelwe iZimbabwe
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Learn AI Skills
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-600 to-yellow-600">
              Through WhatsApp
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
            Accessible AI-powered education for every Zimbabwean. No apps to download, 
            no complex registration - just text <strong>"DZIDZO"</strong> to start learning practical skills 
            that create real opportunities.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              onClick={onLearningClick}
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-4 text-lg"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Start Learning Now
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              onClick={onLearningClick}
              className="border-orange-300 text-orange-700 hover:bg-orange-50 px-8 py-4 text-lg"
            >
              <Play className="w-5 h-5 mr-2" />
              Try Interactive Demo
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-3 p-4 bg-white/60 rounded-lg border border-orange-200">
              <MessageCircle className="w-8 h-8 text-green-600" />
              <div className="text-left">
                <p className="font-semibold text-gray-900">WhatsApp Learning</p>
                <p className="text-sm text-gray-600">No downloads needed</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-3 p-4 bg-white/60 rounded-lg border border-orange-200">
              <Users className="w-8 h-8 text-orange-600" />
              <div className="text-left">
                <p className="font-semibold text-gray-900">Three Languages</p>
                <p className="text-sm text-gray-600">English, Shona, Ndebele</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-3 p-4 bg-white/60 rounded-lg border border-orange-200">
              <Smartphone className="w-8 h-8 text-blue-600" />
              <div className="text-left">
                <p className="font-semibold text-gray-900">Any Phone</p>
                <p className="text-sm text-gray-600">Works everywhere</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
