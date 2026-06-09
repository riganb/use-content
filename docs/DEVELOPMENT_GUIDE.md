# Engineering & Implementation Guide

This guide establishes the structural scaffolding, type specifications, and lifecycle management protocols for building `@riganb/use-content`.

## Repository Directory Layout

```text
@riganb/use-content/
├── package.json               # Dual-exports conditional routing setup
├── tsconfig.json              # Compilation rules
├── .gitignore                 # Version control hygiene rules
├── .vscode/
│   └── settings.json          # Workspace-locked compiler and format rules
├── README.md                  # Public onboarding and consumer usage
├── CONTRIBUTING.md            # Styling guidelines and code constraints
├── docs/                      # Internal architectural blueprints
│   ├── PROJECT_PLAN.md        # Roadmap and scaling vision
│   └── DEVELOPMENT_GUIDE.md   # [This File] Deep technical specs
└── src/
    ├── index.ts               # Environment evaluator and entry pivot
    ├── types.ts               # Shared internal and public typings
    ├── dev/
    │   ├── ContentProviderDev.tsx # Active Context wrapper and dynamic React state engine
    │   ├── useContentDev.ts   # Active hooks, registration side-effects
    │   ├── Panel.tsx          # Main orchestrator mounting sub-components
    │   ├── PanelContainer.tsx # Drag handle, viewport anchoring, and visibility state shell
    │   ├── FieldList.tsx      # Schema iterator mapping keys to form row primitives
    │   ├── icons/
    │   │   └── GearIcon.tsx   # Inline SVG React component for the contracted floating trigger
    │   ├── styles/
    │   │   └── theme.ts       # Central dark purple-ish pastel design tokens (colors, typography)
    │   └── Controls/
    │       ├── StringControl.tsx  # Interactive input router primitive for string mutations
    │       ├── NumberControl.tsx  # Dynamic numeric input router primitive with parse guards
    │       └── BooleanControl.tsx # Toggle-switch input router primitive for true/false states
    └── prod/
        ├── ContentProviderProd.tsx # No-op pass-through Fragment (zero performance overhead)
        └── useContentProd.ts  # Minimal static return stub (zero bundle overhead)
```

## Data Types & Schemas

To ensure strong type safety, the field configuration is structured as a Discriminated Union. This prevents developers from accidentally assigning a type mismatch (e.g., setting `type: 'number'` but passing a string to `initValue`).

```typescript
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

// Discriminated union guarantees type coupling between 'type' and 'initValue'
export type FieldConfig = StringFieldConfig | NumberFieldConfig | BooleanFieldConfig;

export type HookInputSchema = Record<string, FieldConfig>;

// Evaluated output dynamic record map mapping input keys to correct primitive types
export type HookOutputData<T extends HookInputSchema> = {
  [K in keyof T]: T[K]['type'] extends 'string' ? string
                : T[K]['type'] extends 'number' ? number
                : T[K]['type'] extends 'boolean' ? boolean
                : never;
};
```

## State Registry & Lifecycle Mechanism

The central store maintains a dual-map structure inside the React Context:

1. `values`: `Record<string, string | number | boolean>` -> Holds the active state rendered to the user.
2. `schemas`: `Record<string, FieldConfig>` -> Holds metadata used by the UI Panel to render the form controllers dynamically.

### The Registration Lifecycle Sequence

When components render or mount sequentially, they register their schema rules on the fly:

```text
[Component Mounts]
       │
       ▼
Calls useContent(schema)
       │
       ▼
Hook loops over schema keys
       │
 ┌─────┴────────────────────────────────────────┐
 ▼                                              ▼
[Key Exists in Store]                  [Key is New to Store]
 ┌─────┴─────────────────────┐                  ┌─────┴─────────────────────┐
 │ Retain current active code│                  │ Initialize:               │
 │ state. Ignore new init.   │                  │ values[key] = initValue   │
 └───────────────────────────┘                  │ schemas[key] = metadata   │
                                                └───────────────────────────┘
```

## Production Bundling Swapping Protocol

Inside `src/index.ts`, conditional resolution ensures tree-shaking parameters are correctly triggered during production static compilation. Production builds will completely strip out all weights from the `/src/dev/` tree.

```typescript
import { useContentDev, ContentProviderDev } from './dev';
import { useContentProd, ContentProviderProd } from './prod';

const isProd = process.env.NODE_ENV === 'production';

export const useContent = isProd ? useContentProd : useContentDev;
export const ContentProvider = isProd ? ContentProviderProd : ContentProviderDev;
```
