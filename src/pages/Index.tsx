
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Smartphone, Users, GraduationCap, DollarSign, Globe } from 'lucide-react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { Languages } from '@/components/Languages';
import { Pricing } from '@/components/Pricing';
import { Testimonials } from '@/components/Testimonials';
import { Footer } from '@/components/Footer';
import { DemoModal } from '@/components/DemoModal';
import { useDemo } from '@/hooks/useDemo';

const Index = () => {
  const { isDemoOpen, openDemo, closeDemo } = useDemo();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      <Header onDemoClick={openDemo} />
      <Hero onDemoClick={openDemo} />
      <Features />
      <Languages />
      <Pricing onDemoClick={openDemo} />
      <Testimonials />
      <Footer onDemoClick={openDemo} />
      <DemoModal isOpen={isDemoOpen} onClose={closeDemo} />
    </div>
  );
};

export default Index;
