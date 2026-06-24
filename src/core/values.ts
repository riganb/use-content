import type { HookInputSchema } from '../types';

export const isProduction = process.env.NODE_ENV === 'production';

export const resolveEnabled = (enabled?: boolean) => (
  enabled !== undefined ? enabled : !isProduction
);

export const getInitialValue = (schema: HookInputSchema, key: string) => {
  const config = schema[key];
  return config.initValue !== undefined ? config.initValue : '';
};
