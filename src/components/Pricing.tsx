import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, MessageCircle } from 'lucide-react';

interface PricingProps {
  onLearningClick: () => void;
}

export const Pricing = ({ onLearningClick }: PricingProps) => {
  const plans = [
    {
      name: "Free Tier",
      price: "Free",
      period: "Forever",
      description: "Perfect for getting started with AI education",
      features: [
        "Basic lessons via WhatsApp",
        "Community access",
        "3 AI interactions per day",
        "All three languages",
        "Basic progress tracking"
      ],
      cta: "Start Free",
      popular: false,
      color: "border-gray-200"
    },
    {
      name: "Premium",
      price: "$2",
      period: "per month",
      description: "Most popular for serious learners",
      features: [
        "Unlimited AI tutoring",
        "Downloadable content",
        "Verified certificates",
        "Offline access",
        "Priority community support",
        "Weekly live Q&A sessions"
      ],
      cta: "Upgrade with EcoCash",
      popular: true,
      color: "border-orange-500"
    },
    {
      name: "Pro",
      price: "$5",
      period: "per month",
      description: "For entrepreneurs building businesses",
      features: [
        "1-on-1 virtual mentoring",
        "Business plan assistance",
        "Advanced certifications",
        "Exclusive entrepreneur network",
        "Priority job matching",
        "Custom learning paths"
      ],
      cta: "Go Pro",
      popular: false,
      color: "border-red-500"
    }
  ];

  return (
    <section id="pricing" className="py-20 px-4 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Affordable for
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600"> Every Budget</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Flexible payment options through EcoCash, mobile money, or USD. Start free and upgrade when you're ready.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`${plan.color} bg-white/90 hover:shadow-lg transition-all duration-300 relative ${plan.popular ? 'scale-105' : ''}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-600 text-white">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-gray-900">{plan.name}</CardTitle>
                <div className="text-4xl font-bold text-gray-900 my-4">
                  {plan.price}
                  <span className="text-lg font-normal text-gray-600">/{plan.period}</span>
                </div>
                <CardDescription className="text-gray-600">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  onClick={onLearningClick}
                  className={`w-full ${plan.popular 
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white' 
                    : 'bg-white border border-orange-300 text-orange-700 hover:bg-orange-50'
                  }`}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            💡 <strong>Pay-as-you-learn:</strong> Only pay for months when you actively use premium features
          </p>
          <p className="text-gray-600">
            🏦 <strong>Payment methods:</strong> EcoCash, OneMoney, Telecash, USD Mobile Money, Bank Transfer
          </p>
        </div>
      </div>
    </section>
  );
};
