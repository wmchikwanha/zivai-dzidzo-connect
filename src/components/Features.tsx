
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, GraduationCap, DollarSign, Users, Smartphone, Globe } from 'lucide-react';

export const Features = () => {
  const features = [
    {
      icon: MessageCircle,
      title: "WhatsApp-First Learning",
      description: "Learn directly through WhatsApp - the app you already use daily. No downloads, no new passwords, no barriers.",
      color: "text-green-600"
    },
    {
      icon: GraduationCap,
      title: "Practical Skills Training",
      description: "Digital entrepreneurship, STEM applications, business registration, and income-generating skills tailored for Zimbabwe.",
      color: "text-blue-600"
    },
    {
      icon: Users,
      title: "AI-Powered Mentorship",
      description: "Personal AI tutor available 24/7, plus connections to successful local entrepreneurs and professionals.",
      color: "text-purple-600"
    },
    {
      icon: DollarSign,
      title: "EcoCash Integration",
      description: "Flexible payment options starting from $2/month. Pay-as-you-learn model that fits your budget.",
      color: "text-orange-600"
    },
    {
      icon: Smartphone,
      title: "Works on Any Device",
      description: "Optimized for basic smartphones and even feature phones. Ultra-lightweight and data-efficient.",
      color: "text-red-600"
    },
    {
      icon: Globe,
      title: "Cultural Relevance",
      description: "Content that respects Ubuntu philosophy, uses local examples, and addresses real economic challenges.",
      color: "text-yellow-600"
    }
  ];

  return (
    <section id="features" className="py-20 px-4 bg-white/50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Designed for
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600"> Real Zimbabwe</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Every feature built with deep understanding of local challenges, opportunities, and the spirit of kushandira pamwe (working together).
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-orange-200 hover:shadow-lg transition-all duration-300 hover:shadow-orange-100 bg-white/80">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-orange-50 rounded-lg">
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-gray-900">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
