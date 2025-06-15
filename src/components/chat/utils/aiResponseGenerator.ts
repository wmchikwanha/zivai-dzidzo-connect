
import { ChatMessage } from '../types';

export const generateAiResponse = async (userMessage: string, selectedLanguage: string): Promise<ChatMessage> => {
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
