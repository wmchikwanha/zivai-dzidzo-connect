
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowLeft, MessageCircle, Calendar, Share2 } from 'lucide-react';

interface SuccessMessageProps {
  data: {
    name: string;
    whatsapp: string;
    language: string;
    interests: string;
  };
  onBack: () => void;
}

export const SuccessMessage = ({ data, onBack }: SuccessMessageProps) => {
  const getLanguageDisplay = (lang: string) => {
    const languages = {
      english: '🇬🇧 English',
      shona: '🟡 ChiShona',
      ndebele: '🔵 IsiNdebele',
      mixed: '🌐 Mixed Languages'
    };
    return languages[lang as keyof typeof languages] || lang;
  };

  const getInterestDisplay = (interest: string) => {
    const interests = {
      'digital-entrepreneurship': 'Digital Entrepreneurship',
      'whatsapp-business': 'WhatsApp Business Skills',
      'online-marketing': 'Online Marketing',
      'financial-literacy': 'Financial Literacy',
      'tech-skills': 'Basic Tech Skills',
      'agriculture': 'Smart Agriculture',
      'everything': 'Everything - All Topics'
    };
    return interests[interest as keyof typeof interests] || interest;
  };

  return (
    <Card className="border-green-200 bg-green-50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-green-800">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <span>Welcome to ZivAI!</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-green-900 mb-2">
            You're on the list, {data.name.split(' ')[0]}! 🎉
          </h3>
          <p className="text-green-700 mb-4">
            We've received your application and you'll be among the first to experience ZivAI when we launch.
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-green-200">
          <h4 className="font-semibold text-gray-900 mb-3">Your Details:</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">WhatsApp:</span>
              <span className="font-medium">{data.whatsapp}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Language:</span>
              <Badge variant="outline">{getLanguageDisplay(data.language)}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Interest:</span>
              <Badge variant="outline" className="text-xs">{getInterestDisplay(data.interests)}</Badge>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-green-900">What happens next?</h4>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Calendar className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h5 className="font-medium text-gray-900">Launch Timeline</h5>
                <p className="text-sm text-gray-600">Expected launch: Q1 2025. We'll keep you updated on progress.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <MessageCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h5 className="font-medium text-gray-900">WhatsApp Updates</h5>
                <p className="text-sm text-gray-600">You'll receive important updates directly on WhatsApp at {data.whatsapp}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Share2 className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h5 className="font-medium text-gray-900">Spread the Word</h5>
                <p className="text-sm text-gray-600">Help us reach more Zimbabweans who could benefit from AI-powered learning</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border border-orange-200">
          <p className="text-sm text-gray-700 text-center">
            <strong>🚀 Pro tip:</strong> Save this WhatsApp number in your contacts: 
            <span className="font-mono bg-white px-2 py-1 rounded mx-1">+263 77 ZIVAI (94824)</span>
            for easy access when we launch!
          </p>
        </div>

        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="flex-1"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Form
          </Button>
          <Button 
            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
            onClick={() => {
              const message = `I just joined the ZivAI waitlist! 🚀 AI-powered learning through WhatsApp, coming to Zimbabwe. Check it out: ${window.location.origin}`;
              window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
            }}
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share with Friends
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
