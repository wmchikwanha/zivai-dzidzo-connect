
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, MessageCircle, Users, BookOpen, Smartphone } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useInteractiveLearning } from '@/hooks/useInteractiveLearning';
import { SignupForm } from '@/components/SignupForm';
import { SuccessMessage } from '@/components/SuccessMessage';

const Contact = () => {
  const { isLearningOpen, openLearning, closeLearning } = useInteractiveLearning();
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);

  const handleSignupSuccess = (data: any) => {
    setSubmittedData(data);
    setShowSuccess(true);
  };

  const handleBackToForm = () => {
    setShowSuccess(false);
    setSubmittedData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      <Header onLearningClick={openLearning} />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Join the ZivAI Revolution
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Be among the first to experience AI-powered education through WhatsApp. 
              Sign up for early access and help shape the future of learning in Zimbabwe.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="outline" className="bg-orange-50 border-orange-200 text-orange-700">
                <Users className="w-4 h-4 mr-2" />
                500+ Early Adopters
              </Badge>
              <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700">
                <BookOpen className="w-4 h-4 mr-2" />
                3 Languages
              </Badge>
              <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">
                <Smartphone className="w-4 h-4 mr-2" />
                WhatsApp Native
              </Badge>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Form Section */}
            <div>
              {showSuccess ? (
                <SuccessMessage data={submittedData} onBack={handleBackToForm} />
              ) : (
                <SignupForm onSuccess={handleSignupSuccess} />
              )}
            </div>

            {/* Info Section */}
            <div className="space-y-6">
              <Card className="border-orange-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageCircle className="w-5 h-5 text-orange-600" />
                    <span>What to Expect</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Early Access</h4>
                      <p className="text-sm text-gray-600">Be the first to try ZivAI when we launch in Q1 2025</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Free Beta Access</h4>
                      <p className="text-sm text-gray-600">Complete access to all features during the beta period</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Shape the Product</h4>
                      <p className="text-sm text-gray-600">Your feedback will directly influence ZivAI's development</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Launch Discounts</h4>
                      <p className="text-sm text-gray-600">Exclusive pricing for early supporters</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">
                    Ready to Learn Right Now?
                  </h3>
                  <p className="text-blue-700 mb-4">
                    Try our interactive demo while you wait for the full launch.
                  </p>
                  <Button 
                    onClick={openLearning}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Try Interactive Demo
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer onLearningClick={openLearning} />
    </div>
  );
};

export default Contact;
