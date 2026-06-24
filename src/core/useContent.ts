import { useEffect, useMemo } from 'react';
import type { HookInputSchema, HookOutputData } from '../types';
import { useOptionalContentContext } from './ContentContext';
import { getInitialValue, isProduction } from './values';

export function useContent<T extends HookInputSchema>(schema: T): HookOutputData<T> {
  const context = useOptionalContentContext();
  const enabled = context?.enabled ?? false;
  const registerFields = context?.registerFields;
  const values = context?.values;

  if (!context && !isProduction) {
    throw new Error('useContent must be wrapped within a <ContentProvider />');
  }

  useEffect(() => {
    if (enabled && registerFields) {
      registerFields(schema);
    }
  }, [enabled, registerFields, schema]);

  return useMemo(() => {
    const result: Record<string, string | number | boolean> = {};

    for (const key of Object.keys(schema)) {
      const activeValue = enabled ? values?.[key] : undefined;
      result[key] = activeValue !== undefined ? activeValue : getInitialValue(schema, key);
    }

    return result as HookOutputData<T>;
  }, [enabled, schema, values]);
}
