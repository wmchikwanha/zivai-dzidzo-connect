
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

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      <Header />
      <Hero />
      <Features />
      <Languages />
      <Pricing />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
