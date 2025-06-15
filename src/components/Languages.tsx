
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const Languages = () => {
  const languages = [
    {
      flag: "🇬🇧",
      name: "English",
      localName: "English",
      description: "Professional terminology with Zimbabwean context and examples from local business environment.",
      example: "Learn to register your business with ZIMRA and optimize your trade operations."
    },
    {
      flag: "🟡",
      name: "Shona",
      localName: "ChiShona",
      description: "Chiedza cheAI (AI Light) - Traditional wisdom metaphors integrated with modern learning.",
      example: "Dzidza kubatana kweAI nebhizinesi rako kuti uwane mari yakawanda."
    },
    {
      flag: "🔵",
      name: "Ndebele",
      localName: "IsiNdebele",
      description: "UbuHlakani be-AI (AI Intelligence) - Cultural learning styles and community values.",
      example: "Funda ukusebenzisa i-AI ekuthuthukiseni ibhizinisi lakho eliselokishini."
    }
  ];

  return (
    <section id="languages" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Learn in 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600"> Your Language</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Authentic, culturally-sensitive education that respects how Zimbabweans naturally communicate and learn.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {languages.map((language, index) => (
            <Card key={index} className="border-orange-200 hover:shadow-lg transition-all duration-300 bg-white/80">
              <CardHeader className="text-center">
                <div className="text-6xl mb-4">{language.flag}</div>
                <CardTitle className="text-2xl text-gray-900">{language.name}</CardTitle>
                <CardDescription className="text-lg font-medium text-orange-600">
                  {language.localName}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {language.description}
                </p>
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <p className="text-sm text-gray-700 italic">
                    "{language.example}"
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Smart language detection automatically identifies your preference, and you can seamlessly switch between languages just like in everyday Zimbabwean conversation.
          </p>
        </div>
      </div>
    </section>
  );
};
