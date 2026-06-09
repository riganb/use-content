export type SupportedType = 'string' | 'number' | 'boolean';

export interface StringFieldConfig {
  label: string;
  type: 'string';
  initValue?: string;
}

export interface NumberFieldConfig {
  label: string;
  type: 'number';
  initValue?: number;
}

export interface BooleanFieldConfig {
  label: string;
  type: 'boolean';
  initValue?: boolean;
}

// Discriminated Union guarantees matching types for initValue
export type FieldConfig = StringFieldConfig | NumberFieldConfig | BooleanFieldConfig;

// The raw schema object passed into the hook
export type HookInputSchema = Record<string, FieldConfig>;

// Maps the input schema keys cleanly to their respective output primitive types
export type HookOutputData<T extends HookInputSchema> = {
  [K in keyof T]: T[K]['type'] extends 'string' ? string
  : T[K]['type'] extends 'number' ? number
  : T[K]['type'] extends 'boolean' ? boolean
  : never;
};

// Internal global state models used by the Context Provider
export type ContentValues = Record<string, string | number | boolean>;
export type ContentSchemas = Record<string, FieldConfig>;

export interface ContentContextType {
  values: ContentValues;
  schemas: ContentSchemas;
  registerFields: (schema: HookInputSchema) => void;
  updateValue: (key: string, value: string | number | boolean) => void;
}
