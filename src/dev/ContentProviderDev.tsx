import React, { createContext, useCallback, useContext, useState } from 'react';
import type {
  ContentContextType,
  ContentSchemas,
  ContentValues,
  HookInputSchema
} from '../types';
import { Panel } from './Panel';

const ContentContext = createContext<ContentContextType | null>(null);

export const ContentProviderDev: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [values, setValues] = useState<ContentValues>({});
  const [schemas, setSchemas] = useState<ContentSchemas>({});

  // Dynamic Registration Engine
  const registerFields = useCallback((incomingSchema: HookInputSchema) => {
    // 1. Update Schemas State Matrix Safely
    setSchemas((prevSchemas) => {
      let schemasChanged = false;
      const nextSchemas = { ...prevSchemas };

      for (const [key, config] of Object.entries(incomingSchema)) {
        // Rule 1 & 2: Register the config layout if it doesn't exist in schemas yet
        if (!(key in nextSchemas)) {
          nextSchemas[key] = config;
          schemasChanged = true;
        }
      }

      // Only trigger React state updates if something actually changed
      if (schemasChanged) {
        return nextSchemas;
      }
      return prevSchemas;
    });

    // 2. Update Values State Matrix Safely
    setValues((prevValues) => {
      let valuesChanged = false;
      const nextValues = { ...prevValues };

      for (const [key, config] of Object.entries(incomingSchema)) {
        // Rule 1: If key is entirely new, initialize its default value
        if (!(key in nextValues)) {
          // Utilizing our locked-down initValue property configuration
          nextValues[key] = config.initValue !== undefined ? config.initValue : '';
          valuesChanged = true;
        }
      }

      // Mirror state check for values mapping to prevent infinite re-renders
      return valuesChanged ? nextValues : prevValues;
    });
  }, []);

  // Update Mutator (Triggered by the UI panel form elements)
  const updateValue = useCallback((key: string, value: string | number | boolean) => {
    setValues((prev) => ({
      ...prev,
      [key]: value
    }));
  }, []);

  return (
    <ContentContext.Provider value={{ values, schemas, registerFields, updateValue }}>
      {children}
      {/* Injecting our modular, dark purple visual playground panel at the application root.
        It safely listens to registration changes instantly out of the box!
      */}
      <Panel />
    </ContentContext.Provider>
  );
};

// Custom internal hook to safely tap into the context layout across sub-components
export const useContentContext = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContentContext must be wrapped within a <ContentProviderDev />');
  }
  return context;
};
