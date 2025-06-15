
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Volume2, CheckCircle, ArrowRight } from 'lucide-react';

interface Message {
  id: string;
  type: 'ai' | 'user' | 'system';
  content: string;
  timestamp: Date;
  language?: string;
}

interface LearningChatProps {
  selectedLanguage: string;
  onProgress: (progress: number) => void;
}

export const LearningChat = ({ selectedLanguage, onProgress }: LearningChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [userProgress, setUserProgress] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const lessons = {
    english: {
      welcome: "Welcome to ZivAI! 🎓 I'm your AI tutor. Today we'll learn about digital entrepreneurship basics that can help you start earning online. Ready?",
      steps: [
        {
          question: "First, let's understand your goals. What interests you most?",
          options: ["Online selling", "Digital services", "Content creation"],
          lesson: "Excellent choice! Let me teach you the fundamentals..."
        },
        {
          question: "Here's a key principle: 'Start where you are, use what you have.' What skills do you already possess?",
          options: ["Communication", "Crafts/Art", "Technology"],
          lesson: "Perfect! We can build on that foundation."
        },
        {
          question: "Let's apply this: If you wanted to reach 100 customers in Zimbabwe, which platform would work best?",
          options: ["WhatsApp Business", "Facebook", "Word of mouth"],
          lesson: "Great thinking! WhatsApp Business is indeed the most effective in Zimbabwe because 95% of people use WhatsApp daily."
        },
        {
          question: "Final challenge: What's the first step to validate a business idea?",
          options: ["Ask 10 people if they'd buy", "Create a full product", "Quit your job"],
          lesson: "Excellent! Validation before creation saves time and money. You've completed the basics!"
        }
      ]
    },
    shona: {
      welcome: "Mauya kuZivAI! 🎓 Ndiri mudzidzisi wenyu we-AI. Nhasi tichadzidzwa nezve digital entrepreneurship zvinoita kuti mutange kuwana mari online. Makagadzirira?",
      steps: [
        {
          question: "Kutanga, ngatinzwisisane nezvinoda venyu. Chii chinokunakira zvikuru?",
          options: ["Kutengesa online", "Digital services", "Content creation"],
          lesson: "Sarudzo yakanaka! Ngandikudzidzisei zvekutanga..."
        },
        {
          question: "Heyi principle yakakosha: 'Tangai muri ipapo, shandisai zvamunazvo.' Ndeupi unyanzvi hwamunazvo kare?",
          options: ["Kutaurirana", "Zviumbwa/Art", "Technology"],
          lesson: "Zvakanaka! Tinogona kuvaka pamusoro pezvo."
        },
        {
          question: "Ngatishandise izvi: Kana muchida kusvika kune 100 vatengi muZimbabwe, ndeipi platform inoshanda zvakanaka?",
          options: ["WhatsApp Business", "Facebook", "Kutaura nemuromo"],
          lesson: "Mukufunga zvakanaka! WhatsApp Business ndiye anoshanda kwazvo muZimbabwe nokuti 95% yevanhu vanoshandisa WhatsApp zuva rega rega."
        },
        {
          question: "Dambudziko rekupedzisira: Ndeipi nhanho yekutanga kuti muone kana business idea inoshanda?",
          options: ["Bvunzai vanhu 10 kana vachatenga", "Gadzira chigadzirwa chakakwana", "Sirai basa renyu"],
          lesson: "Zvakanaka! Kuona kuti zvinoshanda musati magadzira zvinochengetedza nguva nemari. Mapedza zvekutanga!"
        }
      ]
    },
    ndebele: {
      welcome: "Siyakwamukela eZivAI! 🎓 NgingumaIututor wakho we-AI. Namhla sizofunda nge-digital entrepreneurship okungakusiza ukuthi uqale ukuthola imali online. Usulungile?",
      steps: [
        {
          question: "Kuqala, masiqonde imigomo yakho. Yini ekujabulisayo kakhulu?",
          options: ["Ukuthengisa online", "Digital services", "Content creation"],
          lesson: "Ukukhetha okuhle! Ake ngikufundise izisekelo..."
        },
        {
          question: "Nasi isimiso esibalulekileyo: 'Qala lapho okhona, sebenzisa lokho okunako.' Yimaphi amakhono onawo kakade?",
          options: ["Ukuxoxa", "Ubuciko", "Technology"],
          lesson: "Kuhle! Singakha phezu kwaleso sisekelo."
        },
        {
          question: "Masiyisebenzise lokhu: Uma ufuna ukufinyelela amakhasimende ayi-100 eZimbabwe, yiliphi iplatform elizosebenza kangcono?",
          options: ["WhatsApp Business", "Facebook", "Umlomo"],
          lesson: "Ukucabanga kahle! I-WhatsApp Business yiyo esebenza kakhulu eZimbabwe ngoba u-95% wabantu basebenzisa i-WhatsApp nsuku zonke."
        },
        {
          question: "Inselelo yokugcina: Yisiphi isinyathelo sokuqala ukuze ubone ukuthi umbono webhizinisi uyasebenza?",
          options: ["Buza abantu abayi-10 ukuthi bangayithenga", "Yakha umkhiqizo ophelele", "Yeka umsebenzi wakho"],
          lesson: "Kuhle kakhulu! Ukuqinisekisa ngaphambi kokwakha konga isikhathi nemali. Usuqedile izisekelo!"
        }
      ]
    }
  };

  const currentLessons = lessons[selectedLanguage as keyof typeof lessons];

  useEffect(() => {
    // Initialize with welcome message
    addMessage('ai', currentLessons.welcome);
    setTimeout(() => {
      addMessage('ai', currentLessons.steps[0].question);
    }, 1500);
  }, [selectedLanguage]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const progress = (currentStep / currentLessons.steps.length) * 100;
    setUserProgress(progress);
    onProgress(progress);
  }, [currentStep, onProgress]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addMessage = (type: 'ai' | 'user' | 'system', content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      language: selectedLanguage
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleOptionSelect = (option: string) => {
    // Add user response
    addMessage('user', option);
    
    // Show typing indicator
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      
      // Add lesson content
      const currentLesson = currentLessons.steps[currentStep];
      addMessage('ai', currentLesson.lesson);
      
      // Move to next step
      const nextStep = currentStep + 1;
      if (nextStep < currentLessons.steps.length) {
        setTimeout(() => {
          setCurrentStep(nextStep);
          addMessage('ai', currentLessons.steps[nextStep].question);
        }, 2000);
      } else {
        // Course completed
        setTimeout(() => {
          addMessage('system', selectedLanguage === 'english' 
            ? "🎉 Congratulations! You've completed your first lesson. Your certificate will be sent to your WhatsApp. Next lesson starts tomorrow!"
            : selectedLanguage === 'shona'
            ? "🎉 Makorokoto! Mapedza chichemo chenyu chekutanga. Certificate yenyu ichatumirwa kuWhatsApp yenyu. Chichemo chinotevera chinotanga mangwana!"
            : "🎉 Halala! Usuqedile isifundo sakho sokuqala. Isetifiketi yakho izothunyelwa ku-WhatsApp yakho. Isifundo esilandelayo siqala kusasa!"
          );
        }, 2000);
      }
    }, 1500);
  };

  const handleSendMessage = () => {
    if (currentInput.trim()) {
      addMessage('user', currentInput);
      setCurrentInput('');
      
      // Simple AI response for free-form questions
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage('ai', selectedLanguage === 'english'
          ? "That's a great question! In our full course, we cover this in detail. For now, let's continue with the current lesson."
          : selectedLanguage === 'shona'
          ? "Icho mubvunzo wakanaka! Mukosi yedu yakazara, tinotsanangura izvi zvakajeka. Zvino ngatiendezvei nechichemo chatiri nacho."
          : "Lowo ngumbuzo omuhle! Ekhosini yethu ephelele, sikuphawula lokhu ngokucacileyo. Okwamanje, masiqhubeke nesifundo samanje."
        );
      }, 1000);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-green-50 rounded-lg h-96 flex flex-col">
      {/* Progress bar */}
      <div className="bg-green-600 text-white p-2 rounded-t-lg">
        <div className="flex items-center justify-between text-sm">
          <span>Lesson Progress</span>
          <span>{Math.round(userProgress)}%</span>
        </div>
        <div className="w-full bg-green-500 rounded-full h-2 mt-1">
          <div 
            className="bg-white h-2 rounded-full transition-all duration-500"
            style={{ width: `${userProgress}%` }}
          />
        </div>
      </div>

      {/* Chat header */}
      <div className="bg-green-600 text-white p-3 flex items-center space-x-2">
        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
          <span className="text-sm font-bold">Z</span>
        </div>
        <div>
          <p className="font-semibold text-sm">ZivAI Tutor</p>
          <p className="text-xs opacity-90">Online • Teaching now</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg text-sm ${
                message.type === 'user'
                  ? 'bg-green-500 text-white'
                  : message.type === 'system'
                  ? 'bg-blue-100 text-blue-800 border border-blue-200'
                  : 'bg-white border border-gray-200 shadow-sm'
              }`}
            >
              <p>{message.content}</p>
              <p className={`text-xs mt-1 ${
                message.type === 'user' ? 'text-green-100' : 'text-gray-500'
              }`}>
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-lg p-3 text-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}

        {/* Current options */}
        {currentStep < currentLessons.steps.length && !isTyping && messages.length > 2 && (
          <div className="flex flex-wrap gap-2 justify-center mt-4">
            {currentLessons.steps[currentStep].options.map((option, index) => (
              <Button
                key={index}
                size="sm"
                variant="outline"
                onClick={() => handleOptionSelect(option)}
                className="text-xs border-green-300 hover:bg-green-50"
              >
                {option}
              </Button>
            ))}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-3 border-t border-gray-200 bg-white rounded-b-lg">
        <div className="flex space-x-2">
          <input
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={selectedLanguage === 'english' 
              ? "Ask a question..." 
              : selectedLanguage === 'shona'
              ? "Bvunzai mubvunzo..."
              : "Buza umbuzo..."
            }
            className="flex-1 p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <Button size="sm" onClick={handleSendMessage}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
