import { useEffect, useMemo } from 'react';
import { HookInputSchema, HookOutputData } from '../types';
import { useContentContext } from './ContentProviderDev';

export function useContentDev<T extends HookInputSchema>(schema: T): HookOutputData<T> {
  const { values, registerFields } = useContentContext();

  // 1. Register the schemas with the central context on mount
  useEffect(() => {
    registerFields(schema);
  }, [registerFields, schema]);

  // 2. Map the active context values back to the exact shape expected by the component
  return useMemo(() => {
    // Construct using a mutable record index to satisfy compilation index-write rules
    const result: Record<string, string | number | boolean> = {};

    for (const key of Object.keys(schema)) {
      const activeValue = values[key];

      if (activeValue !== undefined) {
        // Return the live mutating value from the context store
        result[key] = activeValue;
      } else {
        // Fallback safety: if context hasn't processed the state batch yet,
        // tentatively return the configuration's initial value so the UI doesn't flicker empty.
        const config = schema[key];
        result[key] = config.initValue !== undefined ? config.initValue : '';
      }
    }

    // Cast the finalized layout container to the expected public generic type structure
    return result as HookOutputData<T>;
  }, [schema, values]);
}
