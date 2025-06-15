
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Volume2, CheckCircle, ArrowRight, ThumbsUp, ThumbsDown, Star } from 'lucide-react';

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
  const [showFeedback, setShowFeedback] = useState(false);
  const [lessonRating, setLessonRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const lessons = {
    english: {
      welcome: "Welcome to ZivAI! 🇿🇼 I'm your AI business mentor. Today we'll learn how to start a profitable WhatsApp Business in Zimbabwe - no capital needed! Ready to begin your entrepreneurial journey?",
      steps: [
        {
          question: "First, let's identify your opportunity. In Zimbabwe, which product/service has the highest demand on WhatsApp groups?",
          options: ["Mobile data/airtime reselling", "Food delivery (sadza, rice)", "Fashion/clothing imports"],
          lesson: "Excellent! Mobile data/airtime reselling is perfect because: 1) Everyone needs data daily 2) You can start with just $5 USD 3) Profit margins are 10-15% 4) No storage needed. Let me show you exactly how Sarah from Harare started with $5 and now makes $200/month!"
        },
        {
          question: "Sarah's success secret: She found the right supplier. In Zimbabwe, which is the most reliable way to get wholesale rates for airtime?",
          options: ["Directly from Econet/NetOne agents", "Online bulk SMS platforms", "WhatsApp vendor groups"],
          lesson: "Perfect! Econet/NetOne agents give you the best wholesale rates. Here's the exact process: 1) Visit your nearest Econet shop 2) Ask for 'agent registration' 3) Minimum is $20 USD 4) You get 8-12% discount immediately. This means buying $1 airtime for $0.88-0.92!"
        },
        {
          question: "Now for marketing genius: Tonderai from Chitungwiza gets 50+ customers daily. His secret WhatsApp strategy is:",
          options: ["Post in 20+ community groups daily", "Create status updates with prices", "Build a broadcast list of loyal customers"],
          lesson: "Brilliant! Broadcast lists are the goldmine! Here's why: 1) Message 256 people instantly 2) Looks personal, not spam 3) No group admin issues 4) Customers feel special. Tonderai's template: 'Good morning fam! Fresh data deals: 1GB-$1.50, 5GB-$6.50. Reply with your number for instant delivery 📱✨'"
        },
        {
          question: "Final mastery level: Chipo from Bulawayo makes $400/month. She expanded beyond airtime by adding:",
          options: ["ZESA tokens & DStv payments", "Grocery delivery", "Mobile phone repairs"],
          lesson: "Outstanding! ZESA & DStv payments are perfect additions because: 1) Same customer base 2) Higher transaction values 3) Monthly recurring income 4) No extra capital needed. Chipo charges $0.50 per ZESA purchase and $1 per DStv payment. With 200 customers paying monthly = $300 extra income!"
        },
        {
          question: "BONUS REALISTIC SCENARIO: A customer wants $10 ZESA but only has Ecocash. The agent fee is $0.30. How much do you charge to still make $0.50 profit?",
          options: ["$10.80 total", "$11.00 total", "$10.50 total"],
          lesson: "Perfect calculation! $10.80 total ($10 ZESA + $0.30 agent fee + $0.50 your profit). This is real-world pricing that customers accept because you're saving them a trip to the shops. You've mastered the complete business model! 🎉"
        }
      ]
    },
    shona: {
      welcome: "Mauya kuZivAI! 🇿🇼 Ndiri mudzidzisi wenyu webhizinesi. Nhasi tichadzidzwa kuita bhizinesi rinobhadhara reWhatsApp muZimbabwe - pasina mari yekutanga! Makagadzirira kutanga rwendo rwenyu rwekushanda?",
      steps: [
        {
          question: "Kutanga, ngatione mukana wenyu. MuZimbabwe, ndecheyi chinhu chine kudiwa kwakanyanya muWhatsApp groups?",
          options: ["Kutengesa data/airtime", "Kuendesa chikafu (sadza, mupunga)", "Kutengesa hembe dzinouyiswa"],
          lesson: "Zvakanaka! Kutengesa data/airtime zvakanaka nokuti: 1) Munhu wese anoda data zuva rega rega 2) Unogona kutanga ne$5 USD chete 3) Purofiti 10-15% 4) Hausina kuchengetera. Ndichakunyorera kuti Sarah wekuHarare akatanga sei ne$5 iye zvino ari kuita $200 pamwedzi!"
        },
        {
          question: "Chakavanzika chaSarah: Akawana mutengesi akanaka. MuZimbabwe, ndeipi nzira yakanaka yekuwana mitengo yakaderera yeairtime?",
          options: ["Kubva kuEconet/NetOne agents zvakananga", "Online bulk SMS platforms", "WhatsApp vendor groups"],
          lesson: "Zvakanaka! Econet/NetOne agents vanokupa mitengo yakanaka. Nzira yacho: 1) Enda kuEconet shop iri pedyo 2) Bvunza 'agent registration' 3) Minimum nde$20 USD 4) Unowana kuderedzwa kwe8-12% pakarepo. Izvi zvinoreva kutenga $1 airtime ne$0.88-0.92!"
        },
        {
          question: "Zvino kushambadzira: Tonderai wekuChitungwiza anowana vatengi 50+ zuva rega rega. Strategy yake yeWhatsApp ndeye:",
          options: ["Kupost mu20+ community groups zuva rega rega", "Kugadzira status updates nemitengo", "Kuvaka broadcast list yevatengi vakavimbika"],
          lesson: "Zvakanaka! Broadcast lists ndiyo goridhe! Nokuda kwei: 1) Tumira vanhu 256 kamwe kamwe 2) Inoratidza yakawanda, kwete spam 3) Hapana matambudziko egroup admin 4) Vatengi vanonzwa vakakosha. Template yaTonderai: 'Mangwanani shamwari! Data deals itsva: 1GB-$1.50, 5GB-$6.50. Pindura nehutamba hwako kuti uwane pakarepo 📱✨'"
        },
        {
          question: "Chikamu chekupedzisira: Chipo wekuBulawayo anoita $400 pamwedzi. Akawedzera kunze kweairtime:",
          options: ["ZESA tokens & DStv kubhadhara", "Kuendesa zvokudya", "Kugadzira mafoni"],
          lesson: "Zvakanaka! ZESA & DStv kubhadhara zvakanaka nokuti: 1) Vatengi vamwe chete 2) Mari yakawanda pakutengeserana 3) Mari inouya mwedzi wega wega 4) Hapana imwe mari yaunoda. Chipo anotora $0.50 paZESA uye $1 paDStv. Nevatengi 200 vanobhadhara mwedzi wega wega = $300 imwe mari!"
        },
        {
          question: "BONUS REALISTIC SCENARIO: Mutengi anoda $10 ZESA asi ane Ecocash chete. Agent fee nde$0.30. Ungamutorerei kuti uwane $0.50 purofiti?",
          options: ["$10.80 yakazara", "$11.00 yakazara", "$10.50 yakazara"],
          lesson: "Calculation yakanaka! $10.80 yakazara ($10 ZESA + $0.30 agent fee + $0.50 purofiti yako). Iyi ndiyo mitengo yechokwadi iyo vatengi vanobvuma nokuti uri kuvachengetedza rwendo rwekuenda kuzvitoro. Watoona bhizinesi rose! 🎉"
        }
      ]
    },
    ndebele: {
      welcome: "Siyakwamukela eZivAI! 🇿🇼 NgingumaIututor wakho webhizinisi. Namhla sizofunda ukwenza ibhizinisi elikhokhelayo le-WhatsApp eZimbabwe - ngaphandle kwemali yokuqala! Usukulungele ukuqala uhambo lwakho lokusebenza?",
      steps: [
        {
          question: "Kuqala, asithole ithuba lakho. EZimbabwe, yini eledlubeka kakhulu emaqenjini e-WhatsApp?",
          options: ["Ukuthengisa i-data/airtime", "Ukulethisa ukudla (sadza, irayisi)", "Ukuthengisa izingubo ezilethwayo"],
          lesson: "Kuhle kakhulu! Ukuthengisa i-data/airtime kuhle ngoba: 1) Wonke umuntu udinga i-data nsuku zonke 2) Ungaqala nge-$5 USD kuphela 3) Inzuzo 10-15% 4) Awudingi ukugcina. Ngizakutshela ukuthi uSarah wase-Harare waqala kanjani nge-$5 manje esenza u-$200 ngenyanga!"
        },
        {
          question: "Imfihlo kaSarah: Wathola umthengisi omuhle. EZimbabwe, iyiphi indlela enhle yokuthola amanani aphansi e-airtime?",
          options: ["Ngqo ku-Econet/NetOne agents", "Ama-platform e-online bulk SMS", "Amaqembu e-WhatsApp vendor"],
          lesson: "Kuhle! I-Econet/NetOne agents zikunika amanani amahle. Indlela yikho: 1) Hamba ku-Econet shop eseduze 2) Cela 'agent registration' 3) Okuncane ngu-$20 USD 4) Uthola isaphulelo se-8-12% khongolose. Lokhu kusho ukuthenga u-$1 airtime ngo-$0.88-0.92!"
        },
        {
          question: "Manje ukukhangisa: uTonderai wase-Chitungwiza uthola amakhasimende angama-50+ nsuku zonke. Isu lakhe le-WhatsApp yileli:",
          options: ["Ukupost emaqenjini angama-20+ nsuku zonke", "Ukwenza ama-status updates ngamanani", "Ukwakha uhlu lwe-broadcast lwamakhasimende athembekileyo"],
          lesson: "Kuhle kakhulu! Ama-broadcast lists yigolide! Kungenxa yalokhu: 1) Thumela abantu abangama-256 sikhathi sinye 2) Kubonakala ngokwakho, hayi spam 3) Awukho ezinkingeni ze-group admin 4) Amakhasimende azizwa ekhethekile. Template kaTonderai: 'Sawubona mndeni! Ama-data deals amusha: 1GB-$1.50, 5GB-$6.50. Phendula ngenombolo yakho ukuze uthole masinyane 📱✨'"
        },
        {
          question: "Ingxenye yokugcina: uChipo wase-Bulawayo wenza u-$400 ngenyanga. Wengeza ngaphandle kwe-airtime:",
          options: ["Ama-ZESA tokens & ukubhadala i-DStv", "Ukulethisa ukudla", "Ukulungisa amafoni"],
          lesson: "Kuhle kakhulu! I-ZESA & DStv ukubhadala kuhle ngoba: 1) Amakhasimende afanayo 2) Imali eningi ekuthengisaneni 3) Imali eyingenayo inyanga zonke 4) Awudingi enye imali. UChipo uthatha u-$0.50 ku-ZESA no-$1 ku-DStv. Ngamakhasimende angama-200 akhokhayo inyanga zonke = $300 enye imali!"
        },
        {
          question: "BONUS REALISTIC SCENARIO: Ikhasimende lifuna u-$10 ZESA kodwa linayo i-Ecocash kuphela. I-agent fee ngu-$0.30. Ungalithathela malini ukuze uthole u-$0.50 inzuzo?",
          options: ["$10.80 yonke", "$11.00 yonke", "$10.50 yonke"],
          lesson: "Ukubala okuhle! $10.80 yonke ($10 ZESA + $0.30 agent fee + $0.50 inzuzo yakho). Lawa ngamanani angempela amakhasimende awavumayo ngoba uwasindisa uhambo lokuya ezitolo. Usuphumelele lonke ibhizinisi! 🎉"
        }
      ]
    }
  };

  const currentLessons = lessons[selectedLanguage as keyof typeof lessons];

  useEffect(() => {
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
    
    // Show feedback when lesson is complete
    if (progress === 100 && !showFeedback) {
      setTimeout(() => setShowFeedback(true), 3000);
    }
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
    addMessage('user', option);
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      const currentLesson = currentLessons.steps[currentStep];
      addMessage('ai', currentLesson.lesson);
      
      const nextStep = currentStep + 1;
      if (nextStep < currentLessons.steps.length) {
        setTimeout(() => {
          setCurrentStep(nextStep);
          addMessage('ai', currentLessons.steps[nextStep].question);
        }, 3000);
      } else {
        setTimeout(() => {
          addMessage('system', selectedLanguage === 'english' 
            ? "🎉 Congratulations! You've mastered the Zimbabwe WhatsApp Business model. You now have practical knowledge to start earning within 24 hours!"
            : selectedLanguage === 'shona'
            ? "🎉 Makorokoto! Matoona WhatsApp Business model yeZimbabwe. Mave neuzivo hwekutanga kuwana mari mukati memaawa 24!"
            : "🎉 Halala! Usubone i-Zimbabwe WhatsApp Business model. Manje unolwazi lokuthi uqale ukwenza imali phakathi kwamahora angama-24!"
          );
        }, 2000);
      }
    }, 1500);
  };

  const handleSendMessage = () => {
    if (currentInput.trim()) {
      addMessage('user', currentInput);
      setCurrentInput('');
      
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage('ai', selectedLanguage === 'english'
          ? "That's a great question! For detailed guidance on specific business challenges, join our full ZivAI course. Let's continue with the current lesson."
          : selectedLanguage === 'shona'
          ? "Icho mubvunzo wakanaka! Kuti uwane ruzivo rwakadzama nezvedhrama dzebhizinesi, joina course yedu yakazara yeZivAI. Ngatiendezvei nechichemo."
          : "Lowo ngumbuzo omuhle! Ukuze uthole isiqondiso esijulile ngezinselelo zebhizinisi, joyina ikhosi yethu ephelele ye-ZivAI. Masiqhubeke nesifundo."
        );
      }, 1000);
    }
  };

  const handleFeedbackSubmit = () => {
    console.log('Lesson Feedback Submitted:', {
      language: selectedLanguage,
      rating: lessonRating,
      feedback: feedbackText,
      timestamp: new Date()
    });
    setFeedbackSubmitted(true);
    
    // Show thank you message
    setTimeout(() => {
      addMessage('system', selectedLanguage === 'english'
        ? "Thank you for your feedback! 🙏 Your input helps us improve ZivAI for all Zimbabwean entrepreneurs."
        : selectedLanguage === 'shona'
        ? "Tinotenda nekupa mazano! 🙏 Mazano enyu anotibatsira kuvandudza ZivAI kune vese vanoshanda muZimbabwe."
        : "Siyabonga ngempendulo yakho! 🙏 Impendulo yakho isisiza ukuthuthukisa i-ZivAI kubo bonke osomabhizinisi baseZimbabwe."
      );
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-green-50 rounded-lg h-96 flex flex-col">
      {/* Progress bar */}
      <div className="bg-green-600 text-white p-2 rounded-t-lg">
        <div className="flex items-center justify-between text-sm">
          <span>
            {selectedLanguage === 'english' ? 'WhatsApp Business Mastery' : 
             selectedLanguage === 'shona' ? 'WhatsApp Business Hunyanzvi' : 
             'I-WhatsApp Business Ubugcisa'}
          </span>
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
          <p className="font-semibold text-sm">ZivAI Business Mentor</p>
          <p className="text-xs opacity-90">
            {selectedLanguage === 'english' ? 'Online • Teaching practical skills' :
             selectedLanguage === 'shona' ? 'Online • Kudzidzisa hunyanzvi hwechokwadi' :
             'Online • Efundisa amakhono angempela'}
          </p>
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

        {/* Feedback Section */}
        {showFeedback && !feedbackSubmitted && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mt-4">
            <h4 className="font-semibold text-orange-800 mb-3 flex items-center">
              <Star className="w-4 h-4 mr-2" />
              {selectedLanguage === 'english' ? 'Rate this lesson' :
               selectedLanguage === 'shona' ? 'Ratai chichemo ichi' :
               'Linganisa lesi sifundo'}
            </h4>
            
            <div className="flex space-x-1 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setLessonRating(star)}
                  className={`w-8 h-8 ${lessonRating >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                >
                  <Star className="w-full h-full fill-current" />
                </button>
              ))}
            </div>
            
            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder={selectedLanguage === 'english' ? 'Tell us what you learned and how we can improve...' :
                         selectedLanguage === 'shona' ? 'Tiudzei zvamakadzidza uye kuti tingavandudza sei...' :
                         'Sitshele ukuthi ufundeni nokuthi singathuthukisa kanjani...'}
              className="w-full p-2 border border-orange-300 rounded text-sm h-16 resize-none"
            />
            
            <div className="flex space-x-2 mt-3">
              <Button
                size="sm"
                onClick={handleFeedbackSubmit}
                disabled={lessonRating === 0}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                {selectedLanguage === 'english' ? 'Submit Feedback' :
                 selectedLanguage === 'shona' ? 'Tumira Mazano' :
                 'Thumela Impendulo'}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowFeedback(false)}
              >
                {selectedLanguage === 'english' ? 'Skip' :
                 selectedLanguage === 'shona' ? 'Siya' :
                 'Yeqa'}
              </Button>
            </div>
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
              ? "Ask about the business model..." 
              : selectedLanguage === 'shona'
              ? "Bvunzai nezve business model..."
              : "Buza nge-business model..."
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
