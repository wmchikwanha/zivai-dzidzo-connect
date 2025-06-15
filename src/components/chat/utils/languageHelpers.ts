
export const getWelcomeMessage = (selectedLanguage: string) => {
  switch (selectedLanguage) {
    case 'shona':
      return 'Mhoroi! Ndini ZivAI tutor wako. Ndiri pano kuti ndikubatsire kudzidza business skills. Bvunza chero mubvunzo!';
    case 'ndebele':
      return 'Sawubona! NginguZivAI tutor wakho. Ngilapha ukukusiza ukufunda amakhono ebhizinisi. Buza umbuzo!';
    default:
      return 'Hello! I\'m your ZivAI tutor, here 24/7 to help you master business skills. Ask me anything about entrepreneurship, digital hustles, or practical business math!';
  }
};

export const getQuickSuggestions = (selectedLanguage: string) => {
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

export const getTutorSubtitle = (selectedLanguage: string) => {
  switch (selectedLanguage) {
    case 'shona': return 'Tutor wako 24/7';
    case 'ndebele': return 'Uthisha wakho 24/7';
    default: return 'Your 24/7 Business Mentor';
  }
};
