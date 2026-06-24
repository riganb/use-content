import { createContext, useContext } from 'react';
import type { ContentContextType } from '../types';

export const ContentContext = createContext<ContentContextType | null>(null);

export const useContentContext = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContentContext must be wrapped within a <ContentProvider />');
  }
  return context;
};

export const useOptionalContentContext = () => useContext(ContentContext);
