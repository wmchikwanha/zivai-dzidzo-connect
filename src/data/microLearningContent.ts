
export interface MicroLessonPart {
  type: 'hook' | 'teach' | 'practice' | 'apply' | 'next';
  title: string;
  content: string;
  duration: number; // in seconds
  interactive?: {
    type: 'quiz' | 'task' | 'calculation';
    question: string;
    options?: string[];
    correctAnswer?: number;
    taskDescription?: string;
  };
}

export interface MicroLesson {
  id: string;
  title: string;
  category: 'business-basics' | 'digital-hustles' | 'practical-math' | 'tech-skills';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  totalDuration: number; // 5 minutes = 300 seconds
  parts: MicroLessonPart[];
  nextLessonPreview?: string;
}

export interface LearningCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  totalLessons: number;
  estimatedTime: string;
}

export const learningCategories: Record<string, Record<string, LearningCategory>> = {
  english: {
    'business-basics': {
      id: 'business-basics',
      title: 'Business Basics',
      description: 'Foundation skills for starting your business in Zimbabwe',
      icon: '📊',
      totalLessons: 10,
      estimatedTime: '50 minutes'
    },
    'digital-hustles': {
      id: 'digital-hustles',
      title: 'Digital Hustles',
      description: 'Online income opportunities using your smartphone',
      icon: '💰',
      totalLessons: 8,
      estimatedTime: '40 minutes'
    },
    'practical-math': {
      id: 'practical-math',
      title: 'Practical Math',
      description: 'Essential calculations for business success',
      icon: '🧮',
      totalLessons: 6,
      estimatedTime: '30 minutes'
    },
    'tech-skills': {
      id: 'tech-skills',
      title: 'Tech Skills',
      description: 'Digital tools for modern entrepreneurs',
      icon: '📱',
      totalLessons: 6,
      estimatedTime: '30 minutes'
    }
  },
  shona: {
    'business-basics': {
      id: 'business-basics',
      title: 'Zvekutanga muBhizinesi',
      description: 'Mazano ekutanga bhizinesi muZimbabwe',
      icon: '📊',
      totalLessons: 10,
      estimatedTime: 'maminitsi 50'
    },
    'digital-hustles': {
      id: 'digital-hustles',
      title: 'Digital Kushanda',
      description: 'Nzira dzekuwana mari online ne-smartphone',
      icon: '💰',
      totalLessons: 8,
      estimatedTime: 'maminitsi 40'
    },
    'practical-math': {
      id: 'practical-math',
      title: 'Masvomhu Anoshandiswa',
      description: 'Maaccounts akakosha kubhizinesi',
      icon: '🧮',
      totalLessons: 6,
      estimatedTime: 'maminitsi 30'
    },
    'tech-skills': {
      id: 'tech-skills',
      title: 'Tech Skills',
      description: 'Zvishandiso zve-digital zve-entrepreneur',
      icon: '📱',
      totalLessons: 6,
      estimatedTime: 'maminitsi 30'
    }
  },
  ndebele: {
    'business-basics': {
      id: 'business-basics',
      title: 'Izisekelo ze-Business',
      description: 'Amakhono okuseka ibhizinisi e-Zimbabwe',
      icon: '📊',
      totalLessons: 10,
      estimatedTime: 'amaminithi angu-50'
    },
    'digital-hustles': {
      id: 'digital-hustles',
      title: 'I-Digital Hustles',
      description: 'Amathuba okwenza imali nge-smartphone',
      icon: '💰',
      totalLessons: 8,
      estimatedTime: 'amaminithi angu-40'
    },
    'practical-math': {
      id: 'practical-math',
      title: 'I-Math Esebenzayo',
      description: 'Ukubala okubalulekile ebhizinisini',
      icon: '🧮',
      totalLessons: 6,
      estimatedTime: 'amaminithi angu-30'
    },
    'tech-skills': {
      id: 'tech-skills',
      title: 'Amakhono e-Tech',
      description: 'Amathuluzi e-digital e-entrepreneur',
      icon: '📱',
      totalLessons: 6,
      estimatedTime: 'amaminithi angu-30'
    }
  }
};

export const sampleMicroLessons: Record<string, MicroLesson[]> = {
  english: [
    {
      id: 'whatsapp-business-setup',
      title: 'WhatsApp Business Gold Rush',
      category: 'digital-hustles',
      difficulty: 'beginner',
      totalDuration: 300,
      parts: [
        {
          type: 'hook',
          title: 'The $500 Question',
          content: '🔥 "Tatenda from Warren Park makes $500/month selling airtime on WhatsApp. Yesterday alone, he processed 47 transactions. What\'s his secret weapon that 90% of Zimbabweans don\'t know about?"',
          duration: 30
        },
        {
          type: 'teach',
          title: 'The WhatsApp Business Advantage',
          content: '💎 The secret? WhatsApp Business Features:\n\n✅ BUSINESS PROFILE - Customers see you\'re professional\n✅ CATALOG FEATURE - Display products with prices\n✅ QUICK REPLIES - Send pricing instantly\n✅ LABELS - Organize customers (VIP, New, etc.)\n✅ BROADCAST LISTS - Message 256 people at once\n\n📊 REAL IMPACT: Regular WhatsApp = 5% response rate, Business = 40% response rate!\n\nExample: Chipo in Bulawayo switched to WhatsApp Business. Her data sales jumped from 15 customers/day to 50+ customers/day in just 2 weeks!',
          duration: 120
        },
        {
          type: 'practice',
          title: 'Quick Challenge',
          content: 'Test your understanding:',
          duration: 90,
          interactive: {
            type: 'quiz',
            question: '📱 You have 100 customers wanting to buy data. Regular WhatsApp gets 5 sales, WhatsApp Business gets how many?',
            options: [
              '15 sales (same as regular)',
              '40 sales (8x better response)',
              '25 sales (5x better response)'
            ],
            correctAnswer: 1
          }
        },
        {
          type: 'apply',
          title: 'Your 48-Hour Action Plan',
          content: '🎯 TONIGHT:\n1. Download WhatsApp Business (free)\n2. Set business name: "[Your Name] Data & Services"\n3. Add business hours: "24/7 Service"\n\n📱 TOMORROW:\n4. Create catalog with 3 products:\n   • 1GB Data - $1.40\n   • 5GB Data - $6.20\n   • ZESA Tokens - $1 fee\n5. Message 10 friends: "Switched to WhatsApp Business for better service! 🚀"\n\n💰 Result: Professional image + instant customer confidence = more sales!',
          duration: 60
        },
        {
          type: 'next',
          title: 'Tomorrow\'s Power Move',
          content: '🔥 TOMORROW: "The Broadcast List Money Machine" - Learn how Sarah sends 1 message to 256 people and gets 80+ instant customers. The template that converts 40% of recipients into buyers!',
          duration: 30
        }
      ],
      nextLessonPreview: 'Master the Broadcast List strategy that turns 1 message into 80+ sales'
    }
  ],
  shona: [
    {
      id: 'whatsapp-business-setup-shona',
      title: 'WhatsApp Business Goridhe',
      category: 'digital-hustles',
      difficulty: 'beginner',
      totalDuration: 300,
      parts: [
        {
          type: 'hook',
          title: 'Mubvunzo we$500',
          content: '🔥 "Tatenda wekuWarren Park anoita $500/mwedzi achitengesa airtime paWhatsApp. Nezuro chete, akaita ma-transactions 47. Chakavanzika chake chii che90% yevanhu veZimbabwe vasingazive?"',
          duration: 30
        },
        {
          type: 'teach',
          title: 'Mukana weWhatsApp Business',
          content: '💎 Chakavanzika? WhatsApp Business Features:\n\n✅ BUSINESS PROFILE - Vatengi vanoona kuti muri professional\n✅ CATALOG FEATURE - Ratidza zvinhu nemitengo\n✅ QUICK REPLIES - Tumira mitengo nekukurumidza\n✅ LABELS - Ronga vatengi (VIP, New, etc.)\n✅ BROADCAST LISTS - Tumira message kuvanhu 256 kamwe chete\n\n📊 MUSIYANO CHAIWOWO: Regular WhatsApp = 5% vanopindura, Business = 40% vanopindura!\n\nMusenzaniso: Chipo muBulawayo akashandura kuWhatsApp Business. Kutengesa kwake data kwakakwira kubva pa15 vatengi/zuva kuenda ku50+ vatengi/zuva mumavhiki maviri chete!',
          duration: 120
        },
        {
          type: 'practice',
          title: 'Chidzidzo Chinokurumidza',
          content: 'Ongorora kunzwisisa kwako:',
          duration: 90,
          interactive: {
            type: 'quiz',
            question: '📱 Mune vatengi 100 vanoda kutenga data. Regular WhatsApp inowana ma-sales 5, WhatsApp Business inowana mangani?',
            options: [
              '15 sales (zvakafanana ne-regular)',
              '40 sales (8x zvirinani)',
              '25 sales (5x zvirinani)'
            ],
            correctAnswer: 1
          }
        },
        {
          type: 'apply',
          title: 'Chirongwa Chako che48-Maawa',
          content: '🎯 MANHERU ANO:\n1. Download WhatsApp Business (mahara)\n2. Isa zita rebhizinesi: "[Zita Rako] Data & Services"\n3. Wedzera nguva yebhizinesi: "24/7 Service"\n\n📱 MANGWANA:\n4. Gadzira catalog nezvinhu 3:\n   • 1GB Data - $1.40\n   • 5GB Data - $6.20\n   • ZESA Tokens - $1 fee\n5. Tumira shamwari 10: "Ndashandura kuWhatsApp Business kuti ndiwane service iri nani! 🚀"\n\n💰 Mhedzisiro: Professional image + kuvimba kwevatengi pakarepo = kutengesa kukawanda!',
          duration: 60
        },
        {
          type: 'next',
          title: 'Simba reMangwana',
          content: '🔥 MANGWANA: "The Broadcast List Money Machine" - Dzidza kuti Sarah anotumira sei message 1 kuvanhu 256 uye anowana vatengi 80+ pakarepo. Template inoshandura 40% yevanhu kuti vave vatengi!',
          duration: 30
        }
      ],
      nextLessonPreview: 'Dzidza Broadcast List strategy inoshandura message 1 kuita sales 80+'
    }
  ],
  ndebele: [
    {
      id: 'whatsapp-business-setup-ndebele',
      title: 'I-WhatsApp Business Igolide',
      category: 'digital-hustles',
      difficulty: 'beginner',
      totalDuration: 300,
      parts: [
        {
          type: 'hook',
          title: 'Umbuzo we$500',
          content: '🔥 "UTatenda wase-Warren Park wenza u-$500/nyanga ethengisa i-airtime ku-WhatsApp. Izolo nje, wenza ama-transactions angama-47. Yini imfihlo yakhe abangama-90% abaseZimbabwe abangayazi?"',
          duration: 30
        },
        {
          type: 'teach',
          title: 'Ithuba le-WhatsApp Business',
          content: '💎 Imfihlo? I-WhatsApp Business Features:\n\n✅ BUSINESS PROFILE - Amakhasimende abona ukuthi ungumsebenzi\n✅ CATALOG FEATURE - Bonisa izimpahla ngamanani\n✅ QUICK REPLIES - Thumela amanani masinyane\n✅ LABELS - Hlela amakhasimende (VIP, New, etc.)\n✅ BROADCAST LISTS - Thumela umlayezo kubantu abangama-256 kanye\n\n📊 UMEHLUKO WANGEMPELA: Regular WhatsApp = 5% bayaphendula, Business = 40% bayaphendula!\n\nIsibonelo: UChipo eBulawayo waguqukela ku-WhatsApp Business. Ukuthengisa kwakhe kwe-data kwaqoba kusuka ku-15 amakhasimende/usuku kwaya ku-50+ amakhasimende/usuku emavikini amabili nje!',
          duration: 120
        },
        {
          type: 'practice',
          title: 'Inselelo Esheshayo',
          content: 'Hlola ukuqonda kwakho:',
          duration: 90,
          interactive: {
            type: 'quiz',
            question: '📱 Unamakhasimende ayi-100 afuna ukuthenga i-data. I-Regular WhatsApp ithola ama-sales amahlanu, i-WhatsApp Business ithola mangaki?',
            options: [
              '15 sales (njenge-regular)',
              '40 sales (8x ngcono)',
              '25 sales (5x ngcono)'
            ],
            correctAnswer: 1
          }
        },
        {
          type: 'apply',
          title: 'Icebo Lakho Lama-48 Amahora',
          content: '🎯 KUSIHLWA:\n1. Download i-WhatsApp Business (mahhala)\n2. Faka igama lebhizinisi: "[Igama Lakho] Data & Services"\n3. Engeza amahora ebhizinisi: "24/7 Service"\n\n📱 KUSASA:\n4. Dala i-catalog ngezinto ezi-3:\n   • 1GB Data - $1.40\n   • 5GB Data - $6.20\n   • ZESA Tokens - $1 fee\n5. Thumela abangani abayi-10: "Ngiguqukele ku-WhatsApp Business ukuze ngithole insizakalo engcono! 🚀"\n\n💰 Umphumela: Isithombe esingumsebenzi + ukuthemba kwamakhasimende masinyane = ukuthengisa okuningi!',
          duration: 60
        },
        {
          type: 'next',
          title: 'Amandla Kusasa',
          content: '🔥 KUSASA: "The Broadcast List Money Machine" - Funda ukuthi uSarah uthumela kanjani umlayezo owodwa kubantu abangama-256 futhi athole amakhasimende angama-80+ masinyane. Itemplate eguqula abangama-40% abayitholayo babe ngabathengi!',
          duration: 30
        }
      ],
      nextLessonPreview: 'Funda i-Broadcast List strategy eguqula umlayezo owodwa ube ngama-sales angama-80+'
    }
  ]
};
