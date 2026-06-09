import { useMemo } from 'react';
import { HookInputSchema, HookOutputData } from '../types';

export function useContentProd<T extends HookInputSchema>(schema: T): HookOutputData<T> {
  return useMemo(() => {
    const result: Record<string, string | number | boolean> = {};

    for (const key of Object.keys(schema)) {
      const config = schema[key];
      // Inline pass-through: strictly return initial static values in production environments
      result[key] = config.initValue !== undefined ? config.initValue : '';
    }

    return result as HookOutputData<T>;
  }, [schema]);
}
