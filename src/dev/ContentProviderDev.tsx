import React, { createContext, useCallback, useContext, useState } from 'react';
import {
  ContentContextType,
  ContentSchemas,
  ContentValues,
  HookInputSchema
} from '../types';

const ContentContext = createContext<ContentContextType | null>(null);

export const ContentProviderDev: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [values, setValues] = useState<ContentValues>({});
  const [schemas, setSchemas] = useState<ContentSchemas>({});

  // Dynamic Registration Engine
  const registerFields = useCallback((incomingSchema: HookInputSchema) => {
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

    setValues((prevValues) => {
      let valuesChanged = false;
      const nextValues = { ...prevValues };

      for (const [key, config] of Object.entries(incomingSchema)) {
        // Rule 1: If key is entirely new, initialize its default value
        if (!(key in nextValues)) {
          nextValues[key] = config.initValue !== undefined ? config.initValue : '';
          valuesChanged = true;
        }
      }

      // Mirror state check for values mapping
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
      {/* Our Floating UI Panel will be mounted here in Phase 2 */}
    </ContentContext.Provider>
  );
};

// Custom internal hook to safely tap into the context
export const useContentContext = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be wrapped within a <ContentProvider />');
  }
  return context;
};
