import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Crown, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  icon: React.ReactNode;
  features: string[];
  maxServices: number;
  commissionRate: number;
  priority: boolean;
}

const plans: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 29,
    icon: <Star className="w-6 h-6" />,
    features: [
      'List up to 3 services',
      'Basic profile customization',
      'Standard support',
      '15% platform commission'
    ],
    maxServices: 3,
    commissionRate: 15,
    priority: false
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 79,
    icon: <Crown className="w-6 h-6" />,
    features: [
      'List up to 10 services',
      'Advanced profile features',
      'Priority support',
      '10% platform commission',
      'Featured mentor badge',
      'Analytics dashboard'
    ],
    maxServices: 10,
    commissionRate: 10,
    priority: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 199,
    icon: <Zap className="w-6 h-6" />,
    features: [
      'Unlimited services',
      'Full profile customization',
      'Dedicated support',
      '5% platform commission',
      'Top mentor placement',
      'Advanced analytics',
      'Custom branding options'
    ],
    maxServices: -1,
    commissionRate: 5,
    priority: true
  }
];

export const SubscriptionPlans = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleSubscribe = async (planId: string) => {
    setIsLoading(planId);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to subscribe to a plan.",
          variant: "destructive"
        });
        return;
      }

      // Here you would integrate with Stripe for subscription payments
      // For now, we'll just update the mentor's subscription tier
      const { error } = await supabase
        .from('mentors')
        .update({ 
          subscription_tier: planId,
          subscription_end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        })
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Subscription Updated!",
        description: `You've successfully subscribed to the ${plans.find(p => p.id === planId)?.name} plan.`
      });

    } catch (error) {
      console.error('Subscription error:', error);
      toast({
        title: "Subscription Failed",
        description: "Please try again or contact support.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Mentor Plan</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select the plan that best fits your mentoring goals. Upgrade or downgrade anytime.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`relative ${plan.id === 'premium' ? 'border-orange-500 shadow-lg scale-105' : ''}`}
          >
            {plan.id === 'premium' && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-orange-500 text-white">Most Popular</Badge>
              </div>
            )}
            
            <CardHeader className="text-center">
              <div className="flex justify-center mb-2 text-orange-600">
                {plan.icon}
              </div>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <div className="text-3xl font-bold text-gray-900">
                ${plan.price}
                <span className="text-lg font-normal text-gray-600">/month</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handleSubscribe(plan.id)}
                disabled={isLoading === plan.id}
                className={`w-full ${
                  plan.id === 'premium' 
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700' 
                    : ''
                }`}
              >
                {isLoading === plan.id ? 'Processing...' : `Subscribe to ${plan.name}`}
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-500">
                  {plan.maxServices === -1 ? 'Unlimited' : plan.maxServices} services • {plan.commissionRate}% commission
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
