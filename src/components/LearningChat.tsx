
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Volume2, CheckCircle, ArrowRight, ThumbsUp, ThumbsDown, Star, DollarSign, Users, Zap } from 'lucide-react';

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
  const [showOptions, setShowOptions] = useState(false);
  const [lessonComplete, setLessonComplete] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const lessons = {
    english: {
      welcome: "🎯 Welcome to ZivAI Business Bootcamp! I'm going to show you EXACTLY how ordinary Zimbabweans are making $200-500 USD monthly using just WhatsApp. This isn't theory - these are REAL strategies being used RIGHT NOW in Harare, Bulawayo, and rural areas. Ready to discover your path to financial freedom? 💰",
      steps: [
        {
          question: "💡 REALITY CHECK: Which of these WhatsApp businesses is currently making the MOST money for Zimbabweans with zero startup capital?",
          options: [
            "📱 Mobile data/airtime reselling (10-15% profit daily)", 
            "🍛 Food delivery from home kitchen (20-30% margins)", 
            "👕 Imported fashion/accessories (40-50% markup)"
          ],
          correctAnswer: 0,
          lesson: "🔥 BRILLIANT CHOICE! Data/airtime reselling is the GOLDMINE because: \n\n✅ DAILY NECESSITY - Everyone needs data EVERY day\n✅ INSTANT CASH FLOW - Customers pay immediately\n✅ NO STORAGE - Pure digital business\n✅ SCALABLE - Start with $5, grow to $500+/month\n\n📊 Sarah from Warren Park started with $5 USD in January. She now processes 50+ transactions daily and banks $280 monthly. Her secret? She found the RIGHT supplier network..."
        },
        {
          question: "🎯 THE SECRET SAUCE: Sarah's competitive edge comes from her supplier strategy. Which approach gives you the BEST wholesale rates in Zimbabwe?",
          options: [
            "🏪 Registered Econet/NetOne agent (8-12% discount)", 
            "💻 Online bulk platforms (varies)", 
            "👥 WhatsApp vendor groups (5-8% discount)"
          ],
          correctAnswer: 0,
          lesson: "💎 PERFECT! Agent registration is the MASTER KEY! Here's the exact process:\n\n📍 STEP 1: Visit nearest Econet/NetOne office\n📋 STEP 2: Ask for 'Agent Registration Form'\n💵 STEP 3: Minimum deposit $20 USD\n🎉 STEP 4: Instant 8-12% wholesale pricing\n\n🔥 GAME CHANGER: Buy $1 airtime for $0.88! That's $0.12 profit per dollar. Process 50 transactions daily = $6 daily profit = $180 monthly. And this is just the beginning..."
        },
        {
          question: "📈 SCALING SECRETS: Tonderai from Chitungwiza serves 200+ customers daily. His WhatsApp marketing system that NOBODY talks about:",
          options: [
            "📢 Broadcast Lists (personal messages to 256 people)", 
            "👥 Community groups posting (high visibility)", 
            "📱 Status updates with pricing (temporary visibility)"
          ],
          correctAnswer: 0,
          lesson: "🚀 GENIUS STRATEGY! Broadcast Lists are the HIDDEN WEAPON because:\n\n🎯 PERSONAL TOUCH - Customers think it's just for them\n⚡ INSTANT REACH - 256 people in one click\n🚫 NO SPAM FLAGS - Looks like personal message\n📈 HIGHER CONVERSION - 40% response rate vs 5% in groups\n\n💬 Tonderai's winning template:\n'Mangwanani family! 🌅 Fresh data specials:\n• 1GB - $1.40 (save $0.60!)\n• 5GB - $6.20 (save $2.30!)\nReply with number for instant delivery 📱✨'\n\nResult: 80+ daily sales!"
        },
        {
          question: "💰 THE MULTIPLICATION STRATEGY: Chipo from Bulawayo earns $450+ monthly. She expanded beyond data by adding these HIGH-VALUE services:",
          options: [
            "⚡ ZESA tokens & DStv payments (+$1-2 per transaction)", 
            "🛒 Grocery shopping & delivery (time-intensive)", 
            "🔧 Phone repairs & accessories (requires skills)"
          ],
          correctAnswer: 0,
          lesson: "🎯 BRILLIANT EXPANSION! ZESA & DStv are PROFIT MULTIPLIERS:\n\n💡 WHY IT WORKS:\n✅ SAME CUSTOMERS - No new marketing needed\n✅ HIGHER VALUES - $10-50 transactions vs $1-5 data\n✅ MONTHLY RECURRING - Predictable income\n✅ PREMIUM FEES - Charge $1-2 per service\n\n📊 CHIPO'S INCOME BREAKDOWN:\n• Data sales: $250/month\n• ZESA payments: $120/month (120 customers × $1 fee)\n• DStv payments: $80/month (40 customers × $2 fee)\n• TOTAL: $450/month\n\n🔥 The beauty? Same WhatsApp, same customers, TRIPLE the income!"
        },
        {
          question: "🧮 REAL-WORLD SCENARIO: A customer wants $15 ZESA but only has EcoCash. EcoCash charges $0.45 fee. To maintain your $1.50 profit, what's your total charge?",
          options: [
            "💵 $16.95 total ($15 + $0.45 + $1.50)", 
            "💵 $16.50 total (round down for customer)", 
            "💵 $17.00 total (round up for simplicity)"
          ],
          correctAnswer: 0,
          lesson: "🎯 PERFECT CALCULATION! $16.95 is the PROFITABLE price because:\n\n💰 BREAKDOWN:\n• ZESA token: $15.00\n• EcoCash fee: $0.45\n• YOUR PROFIT: $1.50\n• TOTAL: $16.95\n\n🔥 PRO TIP: Customers HAPPILY pay this because:\n✅ Saves them a trip to town\n✅ Instant service from home\n✅ Trusted relationship with you\n✅ Available 24/7\n\n📈 SCALE THIS: 10 customers daily × $1.50 profit = $15/day = $450/month just from ZESA!\n\n🎉 CONGRATULATIONS! You now have a COMPLETE blueprint to start earning within 48 hours!"
        }
      ]
    },
    shona: {
      welcome: "🎯 Mauya kuZivAI Business Bootcamp! Ndichakuratidza CHAIZVO kuti vanhu veZimbabwe vakazvirangarira vari kuita $200-500 USD pamwedzi vachishandisa WhatsApp chete. Hausi theory iyi - aya mazano ari kushandiswa CHAIZVO muHarare, Bulawayo, nekumaruwa. Makagadzirira kuwana nzira yekusununguka kwemari? 💰",
      steps: [
        {
          question: "💡 CHOKWADI: Ndeipi business yeWhatsApp iri kuita mari yakanyanya kuvana veZimbabwe vasina mari yekutanga?",
          options: [
            "📱 Kutengesa data/airtime (10-15% purofiti zuva rega rega)", 
            "🍛 Kuendesa chikafu kubva kumba (20-30% purofiti)", 
            "👕 Kutengesa hembe dzakauyiswa (40-50% purofiti)"
          ],
          correctAnswer: 0,
          lesson: "🔥 SARUDZO YAKANAKA! Data/airtime ndiyo GORIDHE nokuti: \n\n✅ ZVINODIKANWA ZUVA REGA REGA - Munhu wese anoda data\n✅ MARI INOKURUMIDZA - Vatengi vanobhadhara pakarepo\n✅ HAPANA KUCHENGETERA - Bhizinesi re-digital\n✅ RINOKURA - Tanga ne$5, kukura kusvika $500+/mwedzi\n\n📊 Sarah wekuWarren Park akatanga ne$5 USD muna January. Iye zvino anoita 50+ transactions zuva rega rega uye anowana $280 pamwedzi. Chakavanzika chake? Akawana network yakanaka yevakutengesa..."
        },
        {
          question: "🎯 CHAKAVANZIKA: Sarah anokunda vamwe nekuda kwemutengesi wake. Ndeipi nzira inokupa mitengo yakanaka muZimbabwe?",
          options: [
            "🏪 Kunyoresa se-agent kuEconet/NetOne (8-12% kuderedzwa)", 
            "💻 Online bulk platforms (zvinosiyana)", 
            "👥 WhatsApp vendor groups (5-8% kuderedzwa)"
          ],
          correctAnswer: 0,
          lesson: "💎 ZVAKANAKA! Agent registration ndiye KIYI GURU! Nzira yacho:\n\n📍 NHANHO 1: Enda kuoffice yeEconet/NetOne iri pedyo\n📋 NHANHO 2: Kumbira 'Agent Registration Form'\n💵 NHANHO 3: Minimum deposit $20 USD\n🎉 NHANHO 4: Mitengo ye-wholesale 8-12% pakarepo\n\n🔥 CHINHU CHINOSHANDURA: Tenga $1 airtime ne$0.88! Ndiyo $0.12 purofiti padhorobha. Ita 50 transactions zuva rega rega = $6 purofiti zuva rega rega = $180 pamwedzi. Uye uku kungori kutanga..."
        },
        {
          question: "📈 MAZANO EKUKURA: Tonderai wekuChitungwiza anoshandira 200+ vatengi zuva rega rega. System yake yeWhatsApp marketing iyo HAPANA anotaura nezvayo:",
          options: [
            "📢 Broadcast Lists (meseji dzakarongeka kuvanhu 256)", 
            "👥 Kupost muCommunity groups (vanhu vazhinji vanoona)", 
            "📱 Status updates nemitengo (vanhu vashoma vanoona)"
          ],
          correctAnswer: 0,
          lesson: "🚀 HUNGWARU CHAIHWO! Broadcast Lists ndicho CHOMBO CHAKAVANZIKA nokuti:\n\n🎯 CHINORATIDZA UKAMA - Vatengi vanofunga kuti chakaitirwo ivo chete\n⚡ KUNOKURUMIDZA KUSVIKA - Vanhu 256 nekudzvanyirira kamwe\n🚫 HAPANA SPAM - Chinoratidza semeseji yakarongeka\n📈 VANHU VAZHINJI VANOPINDURA - 40% vanopindura vs 5% mumagroups\n\n💬 Template yaTonderai inobudirira:\n'Mangwanani mhuri! 🌅 Data specials itsva:\n• 1GB - $1.40 (chengetedza $0.60!)\n• 5GB - $6.20 (chengetedza $2.30!)\nPindura nehutamba hwako kuti uwane pakarepo 📱✨'\n\nZvibereko: 80+ sales zuva rega rega!"
        },
        {
          question: "💰 STRATEGY YEKUWEDZERA: Chipo wekuBulawayo anowana $450+ pamwedzi. Akawedzera kunze kwedata ne-HIGH-VALUE services idzi:",
          options: [
            "⚡ ZESA tokens & DStv payments (+$1-2 pa transaction)", 
            "🛒 Kutenga groceries & kuendesa (zvinoda nguva yakawanda)", 
            "🔧 Kugadzira mafoni & accessories (zvinoda hunyanzvi)"
          ],
          correctAnswer: 0,
          lesson: "🎯 KWAWEDZERA ZVAKANAKA! ZESA & DStv ndiyo PROFIT MULTIPLIERS:\n\n💡 SEI ZVICHISHANDA:\n✅ VATENGI VAMWE CHETE - Hapana kuita marketing kutsva\n✅ MITENGO YAKAKURA - $10-50 transactions vs $1-5 data\n✅ MWEDZI WEGA WEGA - Mari inogona kutarisirwa\n✅ PREMIUM FEES - Tora $1-2 pabasa\n\n📊 MARI YAANOWANA CHIPO:\n• Data sales: $250/mwedzi\n• ZESA payments: $120/mwedzi (120 vatengi × $1 fee)\n• DStv payments: $80/mwedzi (40 vatengi × $2 fee)\n• TOTAL: $450/mwedzi\n\n🔥 Chakanaka? WhatsApp imwe chete, vatengi vamwe chete, KATATU mari!"
        },
        {
          question: "🧮 REAL-WORLD SCENARIO: Mutengi anoda $15 ZESA asi ane EcoCash chete. EcoCash inotora $0.45 fee. Kuti uwane $1.50 profit yako, unomutorerei yakazara?",
          options: [
            "💵 $16.95 yakazara ($15 + $0.45 + $1.50)", 
            "💵 $16.50 yakazara (kuderera kumutengi)", 
            "💵 $17.00 yakazara (kukukwidza kuti zvive nyore)"
          ],
          correctAnswer: 0,
          lesson: "🎯 CALCULATION YAKANAKA! $16.95 ndiyo MITENGO INOBHADHARA nokuti:\n\n💰 BREAKDOWN:\n• ZESA token: $15.00\n• EcoCash fee: $0.45\n• PUROFITI YAKO: $1.50\n• TOTAL: $16.95\n\n🔥 PRO TIP: Vatengi VANOBHADHARA nomufaro nokuti:\n✅ Vanovachengetedza rwendo rwekuenda kudhorobha\n✅ Service inokurumidza kubva kumba\n✅ Ukama hwakavimbika newe\n✅ Inowanikwa musi wese\n\n📈 KUKURA: 10 vatengi zuva rega rega × $1.50 profit = $15/zuva = $450/mwedzi kubva kuZESA chete!\n\n🎉 MAKOROKOTO! Iye zvino mune blueprint yakazara yekutanga kuwana mari mukati memaawa 48!"
        }
      ]
    },
    ndebele: {
      welcome: "🎯 Siyakwamukela eZivAI Business Bootcamp! Ngizakutshengisa OKUPHELELEYO ukuthi abantu baseZimbabwe abajwayelekileyo benza kanjani u-$200-500 USD ngenyanga besebenzisa i-WhatsApp kuphela. Akuyona i-theory le - lawa ngamasu asebenziswa MANJE eHarare, eBulawayo, nasemaphandleni. Usukulungele ukuthola indlela yakho yenkululeko yezimali? 💰",
      steps: [
        {
          question: "💡 IQINISO: Yiliphi ibhizinisi le-WhatsApp elikhokha kakhulu abaseZimbabwe abangenawo imali yokuqala?",
          options: [
            "📱 Ukuthengisa i-data/airtime (10-15% inzuzo nsuku zonke)", 
            "🍛 Ukulethisa ukudla kusukela ekhaya (20-30% inzuzo)", 
            "👕 Ukuthengisa izingubo ezilethwayo (40-50% inzuzo)"
          ],
          correctAnswer: 0,
          lesson: "🔥 UKUKHETHA OKUHLE! I-data/airtime yigolide ngoba: \n\n✅ KUDINGEKA NSUKU ZONKE - Wonke umuntu udinga i-data\n✅ IMALI ESHESHAYO - Amakhasimende akhokha khongolose\n✅ AKUKHO UKUGCINA - Ibhizinisi le-digital\n✅ LIYAKHULA - Qala nge-$5, khula uye ku-$500+/nyanga\n\n📊 USarah wase-Warren Park waqala nge-$5 USD ngo-January. Manje wenza 50+ ukusebenza nsuku zonke futhi uthola u-$280 ngenyanga. Imfihlo yakhe? Wathola inethiwekhi enhle yabathengisi..."
        },
        {
          question: "🎯 IMFIHLO: USarah wehlula abanye ngenxa yomthengisi wakhe. Yiyiphi indlela ekunika amanani amahle eZimbabwe?",
          options: [
            "🏪 Ukubhalisa njengo-agent ku-Econet/NetOne (8-12% isaphulelo)", 
            "💻 Ama-platform e-online bulk (kuyahluka)", 
            "👥 Amaqembu e-WhatsApp vendor (5-8% isaphulelo)"
          ],
          correctAnswer: 0,
          lesson: "💎 KUHLE! Ukubhalisa kwe-agent yiKIYI ENKULU! Indlela yakho:\n\n📍 ISINYATHELO 1: Hamba ku-office ye-Econet/NetOne eseduze\n📋 ISINYATHELO 2: Cela i-'Agent Registration Form'\n💵 ISINYATHELO 3: Okuncane u-deposit u-$20 USD\n🎉 ISINYATHELO 4: Amanani e-wholesale 8-12% khongolose\n\n🔥 OKUSHINTSHA KONKE: Thenga u-$1 airtime ngo-$0.88! Lokho kungu-$0.12 inzuzo ngedola. Yenza 50 ukusebenza nsuku zonke = $6 inzuzo nsuku zonke = $180 ngenyanga. Futhi lokhu kungokuqala nje..."
        },
        {
          question: "📈 AMASU OKUKHULISA: UTonderai wase-Chitungwiza usebenzela 200+ amakhasimende nsuku zonke. Uhlelo lwakhe lwe-WhatsApp marketing AKEKHO okhuluma ngalo:",
          options: [
            "📢 Ama-Broadcast Lists (imilayezo eqondene kubantu abangama-256)", 
            "👥 Ukupost emaqenjini omphakathi (ukubonakala okukhulu)", 
            "📱 Ama-status updates ngamanani (ukubonakala okwesikhashana)"
          ],
          correctAnswer: 0,
          lesson: "🚀 INGUQUKO EHLAKANIPHILE! Ama-Broadcast Lists yiSIKHALI ESIFIHLIWE ngoba:\n\n🎯 UKUTHINTA KOMUNTU SIQU - Amakhasimende acabanga ukuthi kwenzelwe wona kuphela\n⚡ UKUFINYELELA NGOKUSHESHA - Abantu abangama-256 ngokucindezela kanye\n🚫 AKUKHO OKUPHAZAMISA - Kubonakala njengomlayezo womuntu siqu\n📈 UKUPHENDULA OKUNINGI - 40% bayaphendula vs 5% emaqenjini\n\n💬 Itemplate kaTonderai esebenzayo:\n'Sawubona mndeni! 🌅 Ama-data specials amusha:\n• 1GB - $1.40 (gcinisa u-$0.60!)\n• 5GB - $6.20 (gcinisa u-$2.30!)\nPhendula ngenombolo yakho ukuze uthole masinyane 📱✨'\n\nUmphumela: 80+ ukuthengisa nsuku zonke!"
        },
        {
          question: "💰 INGUQUKO YOKUPHINDAPHINDA: UChipo wase-Bulawayo uthola u-$450+ ngenyanga. Wandisa ngaphandle kwe-data ngokwengeza lezi sinsizakalo ze-HIGH-VALUE:",
          options: [
            "⚡ Ama-ZESA tokens & ama-DStv payments (+$1-2 ngokusebenza)", 
            "🛒 Ukuthenga ukudla & ukulethisa (kudinga isikhathi eside)", 
            "🔧 Ukulungisa amafoni & ama-accessories (kudinga amakhono)"
          ],
          correctAnswer: 0,
          lesson: "🎯 UKWANDISA OKUHLE! I-ZESA & DStv yiPROFIT MULTIPLIERS:\n\n💡 KUNGANI KUSEBENZA:\n✅ AMAKHASIMENDE AFANAYO - Akudingeki ukukhangisa okusha\n✅ AMANANI AMAKHULU - Ukusebenza kwe-$10-50 vs $1-5 data\n✅ INYANGA ZONKE - Imali elindelekayo\n✅ IZIMALI EZIPHEZULU - Khokhisa u-$1-2 ngomsebenzi\n\n📊 IMALI KACHIPO:\n• Ukuthengisa i-data: $250/nyanga\n• Amabhayi e-ZESA: $120/nyanga (120 amakhasimende × $1 fee)\n• Amabhayi e-DStv: $80/nyanga (40 amakhasimende × $2 fee)\n• ISAMBA: $450/nyanga\n\n🔥 Okuhle? I-WhatsApp eyodwa, amakhasimende afanayo, imali EPHINDWE KATHATHU!"
        },
        {
          question: "🧮 ISIMO SANGEMPELA: Ikhasimende lifuna u-$15 ZESA kodwa linayo i-EcoCash kuphela. I-EcoCash ithatha u-$0.45 fee. Ukuze uthole u-$1.50 inzuzo yakho, ulithathela malini yonke?",
          options: [
            "💵 $16.95 yonke ($15 + $0.45 + $1.50)", 
            "💵 $16.50 yonke (yehlisela ikhasimende)", 
            "💵 $17.00 yonke (khweza ukuze kube lula)"
          ],
          correctAnswer: 0,
          lesson: "🎯 UKUBALA OKUHLE! U-$16.95 yinani ELIKHOKHA ngoba:\n\n💰 UKUHLUKANISWA:\n• I-ZESA token: $15.00\n• I-EcoCash fee: $0.45\n• INZUZO YAKHO: $1.50\n• ISAMBA: $16.95\n\n🔥 PRO TIP: Amakhasimende AKHOKHA ngenjabulo ngoba:\n✅ Ukubasindisa uhambo lokuya edolobheni\n✅ Insizakalo esheshayo evela ekhaya\n✅ Ubudlelwano obuthembekile nawe\n✅ Iyatholakala isikhathi sonke\n\n📈 UKUKHULA: 10 amakhasimende nsuku zonke × $1.50 inzuzo = $15/usuku = $450/nyanga kusukela ku-ZESA kuphela!\n\n🎉 HALALA! Manje unebhuluprinti ephelele yokuqala ukwenza imali phakathi kwamahora angama-48!"
        }
      ]
    }
  };

  const currentLessons = lessons[selectedLanguage as keyof typeof lessons];

  useEffect(() => {
    // Reset everything when language changes
    setMessages([]);
    setCurrentStep(0);
    setUserProgress(0);
    setShowOptions(false);
    setLessonComplete(false);
    setShowFeedback(false);
    setFeedbackSubmitted(false);
    
    // Add welcome message and first question
    setTimeout(() => {
      addMessage('ai', currentLessons.welcome);
      setTimeout(() => {
        addMessage('ai', currentLessons.steps[0].question);
        setShowOptions(true);
      }, 2000);
    }, 500);
  }, [selectedLanguage]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const progress = (currentStep / currentLessons.steps.length) * 100;
    setUserProgress(progress);
    onProgress(progress);
    
    // Show feedback when lesson is complete (100%)
    if (progress === 100 && !showFeedback && !feedbackSubmitted) {
      setLessonComplete(true);
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

  const handleOptionSelect = (option: string, optionIndex: number) => {
    setShowOptions(false);
    addMessage('user', option);
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      const currentLesson = currentLessons.steps[currentStep];
      
      // Add encouraging response based on choice
      let encouragement = "";
      if (optionIndex === currentLesson.correctAnswer) {
        encouragement = selectedLanguage === 'english' ? "🎯 Excellent choice! " : 
                      selectedLanguage === 'shona' ? "🎯 Sarudzo yakanaka! " : 
                      "🎯 Ukukhetha okuhle! ";
      } else {
        encouragement = selectedLanguage === 'english' ? "💡 Good thinking! Let me show you the most profitable approach: " : 
                      selectedLanguage === 'shona' ? "💡 Kunzwa kwakanaka! Rega ndikuratidze nzira inobhadhara: " : 
                      "💡 Ukucabanga okuhle! Ake ngikubonise indlela ekhokha kakhulu: ";
      }
      
      addMessage('ai', encouragement + currentLesson.lesson);
      
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      
      if (nextStep < currentLessons.steps.length) {
        setTimeout(() => {
          addMessage('ai', currentLessons.steps[nextStep].question);
          setShowOptions(true);
        }, 3000);
      } else {
        setTimeout(() => {
          addMessage('system', selectedLanguage === 'english' 
            ? "🎉 CONGRATULATIONS! You've mastered the complete Zimbabwe WhatsApp Business Blueprint! You now have practical, tested strategies to start earning $200-500 USD monthly within the next 30 days. These aren't theories - they're proven methods used by successful Zimbabwean entrepreneurs right now!"
            : selectedLanguage === 'shona'
            ? "🎉 MAKOROKOTO! Matoona Blueprint yakazara yeZimbabwe WhatsApp Business! Iye zvino mune mazano akawandisa, akaongororwa ekutanga kuwana $200-500 USD pamwedzi mukati memakore 30! Hausi theory - aya mazano anoshandiswa nevashandi vakafunga muZimbabwe parizvino!"
            : "🎉 HALALA! Usubone i-Zimbabwe WhatsApp Business Blueprint ephelele! Manje unamasu aqinisekisiwe okuqala ukwenza u-$200-500 USD ngenyanga phakathi kwezinsuku ezingama-30! Lawa kawayona amathiyori - yimisebenzi eqinisekisiwe esetshenziselwa osomabhizinisi baseZimbabwe abaphumelelayo manje!"
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
          ? "Thanks for your question! This demo focuses on the core business model. For detailed answers to specific challenges, join our full ZivAI program. Let's continue with the current lesson to complete your foundation knowledge! 💪"
          : selectedLanguage === 'shona'
          ? "Tinotenda nemubvunzo wenyu! Demo iyi inotarisa pamusoro pebusiness model. Kuti uwane mhinduro dzakadzama kumatambudziko chaiwo, joina program yedu yakazara yeZivAI. Ngatiendezvei nechichemo chino kuti tipedze ruzivo rwenyu rwehwaro! 💪"
          : "Siyabonga ngombuzo wakho! Le demo igxile ku-core business model. Ukuze uthole izimpendulo ezijulile ezinkingeni ezithile, joyina uhlelo lwethu olugcwele lwe-ZivAI. Masiqhubeke nesifundo samanje ukuze siqede ulwazi lwakho oluyisisekelo! 💪"
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
    
    setTimeout(() => {
      addMessage('system', selectedLanguage === 'english'
        ? "🙏 Thank you for your valuable feedback! Your input helps us refine ZivAI to better serve aspiring Zimbabwean entrepreneurs. Ready to turn this knowledge into real income? Join our full program!"
        : selectedLanguage === 'shona'
        ? "🙏 Tinotenda nemazano enyu akakosha! Mazano enyu anotibatsira kugadzirisa ZivAI kuti tishandire zvirinani vanoda kushanda muZimbabwe. Makagadzirira kushandura ruzivo urwu kuita mari chaiyo? Joina program yedu yakazara!"
        : "🙏 Siyabonga ngempendulo yakho ebalulekile! Impendulo yakho isisiza ukuthuthukisa i-ZivAI ukuze sisebenzele kangcono osomabhizinisi baseZimbabwe abafunayo. Usukulungele ukuguqula lolu lwazi ube yimali yangempela? Joyina uhlelo lwethu olugcwele!"
      );
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg h-96 flex flex-col border-2 border-green-200">
      {/* Enhanced Progress bar */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-3 rounded-t-lg">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="font-semibold flex items-center">
            <DollarSign className="w-4 h-4 mr-1" />
            {selectedLanguage === 'english' ? 'WhatsApp Business Mastery' : 
             selectedLanguage === 'shona' ? 'WhatsApp Business Hunyanzvi' : 
             'I-WhatsApp Business Ubugcisa'}
          </span>
          <span className="bg-white/20 px-2 py-1 rounded text-xs">
            {Math.round(userProgress)}% {selectedLanguage === 'english' ? 'Complete' : selectedLanguage === 'shona' ? 'Yakapera' : 'Qediwe'}
          </span>
        </div>
        <div className="w-full bg-green-500/30 rounded-full h-3 relative overflow-hidden">
          <div 
            className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full transition-all duration-500 relative"
            style={{ width: `${userProgress}%` }}
          >
            {userProgress > 10 && (
              <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Chat header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-3 flex items-center space-x-3 border-b border-green-500">
        <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center relative">
          <span className="text-sm font-bold text-green-800">Z</span>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        </div>
        <div>
          <p className="font-semibold text-sm flex items-center">
            <Zap className="w-4 h-4 mr-1" />
            ZivAI Business Mentor
          </p>
          <p className="text-xs opacity-90 flex items-center">
            <Users className="w-3 h-3 mr-1" />
            {selectedLanguage === 'english' ? 'Live • Teaching 1,000+ entrepreneurs' :
             selectedLanguage === 'shona' ? 'Live • Kudzidzisa 1,000+ vanoshanda' :
             'Live • Efundisa 1,000+ osomabhizinisi'}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-green-50/50 to-white">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg text-sm ${
                message.type === 'user'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md'
                  : message.type === 'system'
                  ? 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border-2 border-blue-200 shadow-sm'
                  : 'bg-white border border-green-200 shadow-sm hover:shadow-md transition-shadow'
              }`}
            >
              <p className="whitespace-pre-line">{message.content}</p>
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
            <div className="bg-white border border-green-200 rounded-lg p-3 text-sm shadow-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Options */}
        {showOptions && !isTyping && currentStep < currentLessons.steps.length && (
          <div className="space-y-2 mt-4">
            <p className="text-center text-sm text-gray-600 font-medium">
              {selectedLanguage === 'english' ? '👇 Choose your answer:' :
               selectedLanguage === 'shona' ? '👇 Sarudza mhinduro yenyu:' :
               '👇 Khetha impendulo yakho:'}
            </p>
            <div className="space-y-2">
              {currentLessons.steps[currentStep].options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleOptionSelect(option, index)}
                  className="w-full text-left text-xs bg-white border-2 border-green-300 hover:border-green-500 hover:bg-green-50 text-gray-800 p-3 h-auto rounded-lg transition-all duration-200 hover:shadow-md"
                  variant="outline"
                >
                  <span className="block text-left whitespace-normal">{option}</span>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Feedback Section */}
        {showFeedback && !feedbackSubmitted && (
          <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-lg p-4 mt-4 shadow-sm">
            <h4 className="font-semibold text-orange-800 mb-3 flex items-center">
              <Star className="w-4 h-4 mr-2" />
              {selectedLanguage === 'english' ? 'Rate this lesson & help us improve!' :
               selectedLanguage === 'shona' ? 'Ratai chichemo ichi & tibatsirei kuvandudza!' :
               'Linganisa lesi sifundo & sisize ukuthuthukisa!'}
            </h4>
            
            <div className="flex space-x-1 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setLessonRating(star)}
                  className={`w-8 h-8 transition-colors hover:scale-110 ${lessonRating >= star ? 'text-yellow-500' : 'text-gray-300 hover:text-yellow-300'}`}
                >
                  <Star className="w-full h-full fill-current" />
                </button>
              ))}
            </div>
            
            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder={selectedLanguage === 'english' ? 'What did you learn? How can we make this even better?' :
                         selectedLanguage === 'shona' ? 'Chii chamakadzidza? Tingagadzirise sei kuti chive nani?' :
                         'Ini oyifundile? Singakwenza kanjani ukuba ngcono kakhulu?'}
              className="w-full p-2 border border-orange-300 rounded text-sm h-16 resize-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
            
            <div className="flex space-x-2 mt-3">
              <Button
                size="sm"
                onClick={handleFeedbackSubmit}
                disabled={lessonRating === 0}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white disabled:opacity-50"
              >
                {selectedLanguage === 'english' ? 'Submit Feedback' :
                 selectedLanguage === 'shona' ? 'Tumira Mazano' :
                 'Thumela Impendulo'}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowFeedback(false)}
                className="border-orange-300 hover:bg-orange-50"
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

      {/* Enhanced Input area */}
      <div className="p-3 border-t-2 border-green-200 bg-white rounded-b-lg">
        <div className="flex space-x-2">
          <input
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={selectedLanguage === 'english' 
              ? "Ask about the business strategies..." 
              : selectedLanguage === 'shona'
              ? "Bvunzai nezve business strategies..."
              : "Buza ngamasu ebhizinisi..."
            }
            className="flex-1 p-2 border border-green-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            disabled={showOptions || isTyping}
          />
          <Button 
            size="sm" 
            onClick={handleSendMessage}
            disabled={showOptions || isTyping || !currentInput.trim()}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        {showOptions && (
          <p className="text-xs text-green-600 mt-1 text-center">
            {selectedLanguage === 'english' ? 'Please select from the options above to continue' :
             selectedLanguage === 'shona' ? 'Sarudzai kubva muzvikamu zvacho pamusoro kuti muenderere' :
             'Sicela ukhethe kwezinketho ezingenhla ukuze uqhubeke'}
          </p>
        )}
      </div>
    </div>
  );
};
