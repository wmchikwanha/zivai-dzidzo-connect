import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Bot, User, Lightbulb, BookOpen, Target, Zap } from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  category?: 'business-basics' | 'digital-hustles' | 'practical-math' | 'tech-skills';
  suggestions?: string[];
}

interface AiTutorChatProps {
  selectedLanguage: string;
  isOpen: boolean;
  onToggle: () => void;
}

export const AiTutorChat = ({ selectedLanguage, isOpen, onToggle }: AiTutorChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const getWelcomeMessage = () => {
    switch (selectedLanguage) {
      case 'shona':
        return 'Mhoroi! Ndini ZivAI tutor wako. Ndiri pano kuti ndikubatsire kudzidza business skills. Bvunza chero mubvunzo!';
      case 'ndebele':
        return 'Sawubona! NginguZivAI tutor wakho. Ngilapha ukukusiza ukufunda amakhono ebhizinisi. Buza umbuzo!';
      default:
        return 'Hello! I\'m your ZivAI tutor, here 24/7 to help you master business skills. Ask me anything about entrepreneurship, digital hustles, or practical business math!';
    }
  };

  const getQuickSuggestions = () => {
    switch (selectedLanguage) {
      case 'shona':
        return [
          'Ndingavhura sei WhatsApp Business?',
          'Mari inodiwa kutanga bhizinesi diki?',
          'Ndinogona sei kutengesa paOnline?',
          'EcoCash for business inoshanda sei?'
        ];
      case 'ndebele':
        return [
          'Ngingazivula kanjani i-WhatsApp Business?',
          'Malini adingekayo ukuqala ibhizinisi elincane?',
          'Ngingathengisa kanjani ku-Online?',
          'I-EcoCash yebhizinisi isebenza kanjani?'
        ];
      default:
        return [
          'How do I set up WhatsApp Business?',
          'How much money do I need to start a small business?',
          'How can I sell products online?',
          'How does EcoCash for business work?'
        ];
    }
  };

  const generateAiResponse = async (userMessage: string): Promise<ChatMessage> => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    // Simple AI response logic based on keywords
    let response = '';
    let category: ChatMessage['category'] = 'business-basics';
    let suggestions: string[] = [];

    const message = userMessage.toLowerCase();

    if (message.includes('whatsapp') || message.includes('social media')) {
      category = 'digital-hustles';
      response = selectedLanguage === 'shona' 
        ? '📱 WhatsApp Business ine features dzakakosha: Business Profile, Catalog, Quick Replies, uye Broadcast Lists. Izvi zvinokubatsira kuita professional uye kuwana ma-customers akawanda. Ungade kuti ndikudzidzise step-by-step?'
        : selectedLanguage === 'ndebele'
        ? '📱 I-WhatsApp Business inamafitsha abalulekile: Business Profile, Catalog, Quick Replies, kanye ne-Broadcast Lists. Lokhu kuyakusiza ukuthi ubonakale uprofessional futhi uthole amakhasimende amaningi. Ufuna ngikulawule step-by-step?'
        : '📱 WhatsApp Business has powerful features: Business Profile, Catalog, Quick Replies, and Broadcast Lists. These help you look professional and get more customers. Would you like me to walk you through the setup step-by-step?';
      
      suggestions = selectedLanguage === 'shona' 
        ? ['Ndidzidzise kusetup Business Profile', 'Catalog inoshanda sei?', 'Quick Replies ndezvipi?']
        : selectedLanguage === 'ndebele'
        ? ['Ngifundise ukusetup Business Profile', 'I-Catalog isebenza kanjani?', 'Yini i-Quick Replies?']
        : ['Teach me Business Profile setup', 'How does Catalog work?', 'What are Quick Replies?'];

    } else if (message.includes('money') || message.includes('mari') || message.includes('imali') || message.includes('start')) {
      response = selectedLanguage === 'shona' 
        ? '💰 Ungavhura bhizinesi diki nemari shoma se $20-50 USD. Zvakakosha ndezvinotevera: kusarudza chinhu chinodiwa, kutsvaga ma-customers, uye kuva ne-plan yekuchengetedza mari. Ungainde nechii chakanaka?'
        : selectedLanguage === 'ndebele'
        ? '💰 Ungaqala ibhizinisi elincane ngemali encane enjenge-$20-50 USD. Okubalulekile yilokhu: ukukhetha into edingekayo, ukuthola amakhasimende, kanye nokuba neqhinga lokonga imali. Ungafuna ukuqala ngani?'
        : '💰 You can start a small business with as little as $20-50 USD. Key things: choose something people need, find customers, and have a plan to save money. What type of business interests you?';
      
      suggestions = selectedLanguage === 'shona' 
        ? ['Bhizinesi dzipi dzinoshanda muZimbabwe?', 'Ndingawana customers sei?', 'Mari yekutanga business plan']
        : selectedLanguage === 'ndebele'
        ? ['Yimaphi amabhizinisi asebenza eZimbabwe?', 'Ngingathola kanjani amakhasimende?', 'Imali yokuqala business plan']
        : ['What businesses work in Zimbabwe?', 'How do I find customers?', 'Startup money business plan'];

    } else if (message.includes('profit') || message.includes('calculate') || message.includes('math')) {
      category = 'practical-math';
      response = selectedLanguage === 'shona' 
        ? '🧮 Profit calculation yakakosha: Profit = Selling Price - Cost Price. Example: Ukatengesa chinhu ne$10 wakachitenga ne$6, profit yako ndi $4. Profit margin = ($4/$10) x 100 = 40%. Iri rakanaka!'
        : selectedLanguage === 'ndebele'
        ? '🧮 Ukubala inzuzo kubalulekile: Inzuzo = Selling Price - Cost Price. Isibonelo: Uma uthengisa into nge-$10 oyithenge nge-$6, inzuzo yakho ngu-$4. I-profit margin = ($4/$10) x 100 = 40%. Kuhle!'
        : '🧮 Profit calculation is crucial: Profit = Selling Price - Cost Price. Example: If you sell something for $10 that cost you $6, your profit is $4. Profit margin = ($4/$10) x 100 = 40%. That\'s good!';
      
      suggestions = selectedLanguage === 'shona' 
        ? ['Profit margin yakanaka ndeye percentage ipi?', 'Ndingacalculate sei break-even point?', 'Currency exchange calculations']
        : selectedLanguage === 'ndebele'
        ? ['Yimaphi ama-percentage profit margin amahle?', 'Ngingayibala kanjani i-break-even point?', 'Ama-currency exchange calculations']
        : ['What\'s a good profit margin percentage?', 'How do I calculate break-even point?', 'Currency exchange calculations'];

    } else if (message.includes('online') || message.includes('digital') || message.includes('internet')) {
      category = 'digital-hustles';
      response = selectedLanguage === 'shona' 
        ? '💻 Online business opportunities muZimbabwe: Social media marketing, freelance writing, online tutoring, selling paFacebook/WhatsApp, cryptocurrency (legal ways), uye data reselling. Chipi chauri interested nacho?'
        : selectedLanguage === 'ndebele'
        ? '💻 Amathuba ebhizinisi le-online eZimbabwe: Social media marketing, freelance writing, online tutoring, ukuthengisa ku-Facebook/WhatsApp, cryptocurrency (indlela ezisemthethweni), kanye nokuthengisa i-data. Yini oyithanda?'
        : '💻 Online business opportunities in Zimbabwe: Social media marketing, freelance writing, online tutoring, selling on Facebook/WhatsApp, cryptocurrency (legal ways), and data reselling. What interests you?';
      
      suggestions = selectedLanguage === 'shona' 
        ? ['Ndingatanga sei social media marketing?', 'Freelance writing inoshanda sei?', 'Online tutoring setup']
        : selectedLanguage === 'ndebele'
        ? ['Ngingaqala kanjani i-social media marketing?', 'I-freelance writing isebenza kanjani?', 'I-online tutoring setup']
        : ['How do I start social media marketing?', 'How does freelance writing work?', 'Online tutoring setup'];

    } else {
      response = selectedLanguage === 'shona' 
        ? '🤔 Ndinanzwa mubvunzo wako. Asi handisikuita kunzwisisa zvakanaka. Ungandibvunze zvimwe? Kana ukabvunza nezve business basics, digital hustles, kana practical math?'
        : selectedLanguage === 'ndebele'
        ? '🤔 Ngiyawuzwa umbuzo wakho. Kodwa angikuqondi kahle. Ungangibuza okunye? Noma ungangibuza ngama-business basics, digital hustles, noma i-practical math?'
        : '🤔 I understand your question, but I need more details. Could you ask me something specific about business basics, digital hustles, or practical math? I\'m here to help!';
      
      suggestions = getQuickSuggestions();
    }

    return {
      id: Date.now().toString(),
      type: 'ai',
      content: response,
      timestamp: new Date(),
      category,
      suggestions
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const aiResponse = await generateAiResponse(inputMessage);
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error generating AI response:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        type: 'ai',
        content: getWelcomeMessage(),
        timestamp: new Date(),
        suggestions: getQuickSuggestions()
      };
      setMessages([welcomeMessage]);
    }
  }, [selectedLanguage]);

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'business-basics': return <BookOpen className="w-4 h-4" />;
      case 'digital-hustles': return <Zap className="w-4 h-4" />;
      case 'practical-math': return <Target className="w-4 h-4" />;
      case 'tech-skills': return <Lightbulb className="w-4 h-4" />;
      default: return <Bot className="w-4 h-4" />;
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={onToggle}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[600px] shadow-xl z-50 flex flex-col">
      <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-lg p-4">
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center space-x-2">
            <Bot className="w-5 h-5" />
            <span>ZivAI Tutor</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="text-white hover:bg-white/20"
          >
            ×
          </Button>
        </CardTitle>
        <p className="text-sm opacity-90">
          {selectedLanguage === 'shona' ? 'Tutor wako 24/7' :
           selectedLanguage === 'ndebele' ? 'Uthisha wakho 24/7' :
           'Your 24/7 Business Mentor'}
        </p>
      </CardHeader>

      <CardContent className="flex-1 p-0 flex flex-col">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-lg p-3 ${
                  message.type === 'user' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <div className="flex items-start space-x-2">
                    {message.type === 'ai' && (
                      <div className="flex-shrink-0 mt-1">
                        {getCategoryIcon(message.category)}
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                      {message.category && (
                        <Badge variant="outline" className="mt-2 text-xs">
                          {message.category.replace('-', ' ')}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {message.suggestions && (
                    <div className="mt-3 space-y-1">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-xs h-7 w-full justify-start"
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-4 h-4" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={
                selectedLanguage === 'shona' ? 'Nyora mubvunzo wako...' :
                selectedLanguage === 'ndebele' ? 'Bhala umbuzo wakho...' :
                'Type your question...'
              }
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              disabled={isTyping}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="bg-green-500 hover:bg-green-600 text-white px-4"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
