import { ContentProviderDev } from './dev/ContentProviderDev';
import { useContentDev } from './dev/useContentDev';
import { ContentProviderProd } from './prod/ContentProviderProd';
import { useContentProd } from './prod/useContentProd';

const isProd = process.env.NODE_ENV === 'production';

export const useContent = isProd ? useContentProd : useContentDev;
export const ContentProvider = isProd ? ContentProviderProd : ContentProviderDev;

export type { FieldConfig, HookInputSchema, SupportedType } from './types';
