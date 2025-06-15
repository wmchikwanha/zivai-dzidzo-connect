
export interface LessonStep {
  question: string;
  options: string[];
  correctAnswer: number;
  lesson: string;
}

export interface LanguageLessons {
  welcome: string;
  steps: LessonStep[];
}

export const lessons: Record<string, LanguageLessons> = {
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
