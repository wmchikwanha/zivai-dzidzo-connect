
import { useState } from 'react';

export const useAiTutor = () => {
  const [isTutorOpen, setIsTutorOpen] = useState(false);

  const openTutor = () => setIsTutorOpen(true);
  const closeTutor = () => setIsTutorOpen(false);
  const toggleTutor = () => setIsTutorOpen(!isTutorOpen);

  return {
    isTutorOpen,
    openTutor,
    closeTutor,
    toggleTutor
  };
};
