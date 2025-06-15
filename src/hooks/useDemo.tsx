
import { useState } from 'react';

export const useDemo = () => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  const openDemo = () => setIsDemoOpen(true);
  const closeDemo = () => setIsDemoOpen(false);

  return {
    isDemoOpen,
    openDemo,
    closeDemo
  };
};
