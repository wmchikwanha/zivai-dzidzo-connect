
import { useState } from 'react';

export const useInteractiveLearning = () => {
  const [isLearningOpen, setIsLearningOpen] = useState(false);

  const openLearning = () => setIsLearningOpen(true);
  const closeLearning = () => setIsLearningOpen(false);

  return {
    isLearningOpen,
    openLearning,
    closeLearning
  };
};
