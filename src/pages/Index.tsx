
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Smartphone, Users, GraduationCap, DollarSign, Globe, LogIn, LogOut } from 'lucide-react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { Languages } from '@/components/Languages';
import { Pricing } from '@/components/Pricing';
import { Testimonials } from '@/components/Testimonials';
import { Footer } from '@/components/Footer';
import { AiTutorChat } from '@/components/chat/AiTutorChat';
import { useAiTutor } from '@/hooks/useAiTutor';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { isTutorOpen, toggleTutor } = useAiTutor();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const handleLearningClick = () => {
    navigate('/learning');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      {/* Auth Bar */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-2 flex justify-end">
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user.email}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => signOut()}
                className="flex items-center space-x-1"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/auth')}
              className="flex items-center space-x-1"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In</span>
            </Button>
          )}
        </div>
      </div>

      <Header onLearningClick={handleLearningClick} />
      <Hero onLearningClick={handleLearningClick} />
      
      {/* Quick Navigation Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Path</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Whether you're looking to learn or share your expertise, we have the perfect platform for you.
            </p>
            {!user && (
              <p className="text-orange-600 font-medium mt-2">
                Sign in to access the full mentoring platform
              </p>
            )}
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => user ? navigate('/browse-mentors') : navigate('/auth')}>
              <CardContent className="p-8 text-center">
                <GraduationCap className="w-16 h-16 text-orange-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">I Want to Learn</h3>
                <p className="text-gray-600 mb-6">Find expert mentors and book 1-on-1 sessions to accelerate your growth</p>
                <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 w-full">
                  {user ? 'Browse Mentors' : 'Sign In to Browse Mentors'}
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => user ? navigate('/mentor-dashboard') : navigate('/auth')}>
              <CardContent className="p-8 text-center">
                <Users className="w-16 h-16 text-orange-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">I Want to Mentor</h3>
                <p className="text-gray-600 mb-6">Share your expertise and earn money by helping others succeed</p>
                <Button variant="outline" className="w-full border-orange-600 text-orange-600 hover:bg-orange-50">
                  {user ? 'Start Mentoring' : 'Sign In to Start Mentoring'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <Features />
      <Languages />
      <Pricing onLearningClick={handleLearningClick} />
      <Testimonials />
      <Footer onLearningClick={handleLearningClick} />
      <AiTutorChat 
        selectedLanguage="english" 
        isOpen={isTutorOpen} 
        onToggle={toggleTutor} 
      />
    </div>
  );
};

export default Index;
