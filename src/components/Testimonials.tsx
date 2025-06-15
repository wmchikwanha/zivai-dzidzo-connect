
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Chipo Musonza",
      location: "Chitungwiza",
      role: "Hairdresser & Online Seller",
      content: "ZivAI yakandidzidzisa kutengetera paWhatsApp. Zvino ndinotengesa zveumba throughout Zimbabwe. Mari yangu yakawedzera x3!",
      rating: 5,
      flag: "🟡"
    },
    {
      name: "Thabo Ncube",
      location: "Bulawayo",
      role: "Mechanic & Entrepreneur",
      content: "The business registration module helped me formalize my workshop. Now I get contracts with big companies. UbuHlakani be-AI!",
      rating: 5,
      flag: "🔵"
    },
    {
      name: "Faith Zimunya",
      location: "Harare",
      role: "Student & Part-time Trader",
      content: "Learning through WhatsApp is genius! I study while commuting. The AI tutor explains math problems better than my teacher.",
      rating: 5,
      flag: "🇬🇧"
    },
    {
      name: "Simba Chigwada",
      location: "Gweru",
      role: "Cross-border Trader",
      content: "Ndakadzidza digital marketing nedzimwe skills. Clients vangu vave kunditsvaga online. ZivAI yakashandura hupenyu hwangu!",
      rating: 5,
      flag: "🟡"
    }
  ];

  return (
    <section className="py-20 px-4 bg-white/50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Real Stories from
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600"> Real Zimbabweans</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Hear from learners who've transformed their lives through accessible AI education.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-orange-200 bg-white/80 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-2xl">{testimonial.flag}</span>
                </div>
                
                <p className="text-gray-700 mb-4 leading-relaxed text-sm">
                  "{testimonial.content}"
                </p>
                
                <div className="border-t border-orange-100 pt-4">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-sm text-orange-600">{testimonial.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
