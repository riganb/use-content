import React, {
  Suspense,
  lazy,
  useCallback,
  useMemo,
  useState
} from 'react';
import type {
  ContentProviderProps,
  ContentSchemas,
  ContentValues,
  HookInputSchema
} from '../types';
import { ContentContext } from './ContentContext';
import { resolveEnabled } from './values';

const DevPanel = lazy(() =>
  import('../dev/Panel.js').then((module) => ({ default: module.Panel }))
);

export function ContentProvider({
  children,
  client,
  enabled
}: ContentProviderProps): React.ReactElement {
  const resolvedEnabled = resolveEnabled(client ? client.enabled : enabled);
  const [values, setValues] = useState<ContentValues>({});
  const [schemas, setSchemas] = useState<ContentSchemas>({});

  const registerFields = useCallback((incomingSchema: HookInputSchema) => {
    if (!resolvedEnabled) {
      return;
    }

    setSchemas((prevSchemas) => {
      let schemasChanged = false;
      const nextSchemas = { ...prevSchemas };

      for (const [key, config] of Object.entries(incomingSchema)) {
        if (!(key in nextSchemas)) {
          nextSchemas[key] = config;
          schemasChanged = true;
        }
      }

      return schemasChanged ? nextSchemas : prevSchemas;
    });

    setValues((prevValues) => {
      let valuesChanged = false;
      const nextValues = { ...prevValues };

      for (const [key, config] of Object.entries(incomingSchema)) {
        if (!(key in nextValues)) {
          nextValues[key] = config.initValue !== undefined ? config.initValue : '';
          valuesChanged = true;
        }
      }

      return valuesChanged ? nextValues : prevValues;
    });
  }, [resolvedEnabled]);

  const updateValue = useCallback((key: string, value: string | number | boolean) => {
    if (!resolvedEnabled) {
      return;
    }

    setValues((prev) => ({
      ...prev,
      [key]: value
    }));
  }, [resolvedEnabled]);

  const contextValue = useMemo(() => ({
    enabled: resolvedEnabled,
    values,
    schemas,
    registerFields,
    updateValue
  }), [registerFields, resolvedEnabled, schemas, updateValue, values]);

  return React.createElement(
    ContentContext.Provider,
    { value: contextValue },
    children,
    resolvedEnabled
      ? React.createElement(
        Suspense,
        { fallback: null },
        React.createElement(DevPanel)
      )
      : null
  );
}
