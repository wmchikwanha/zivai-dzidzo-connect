
export interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  category?: 'business-basics' | 'digital-hustles' | 'practical-math' | 'tech-skills';
  suggestions?: string[];
}

export interface AiTutorChatProps {
  selectedLanguage: string;
  isOpen: boolean;
  onToggle: () => void;
}
