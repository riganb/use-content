# Engineering & Implementation Guide

This guide establishes the structural scaffolding, type specifications, and lifecycle management protocols for building `@riganb/use-content`.

## Repository Directory Layout

```text
@riganb/use-content/
├── package.json               # Dual-exports conditional routing setup
├── tsconfig.json              # Compilation rules
├── tsup.config.ts             # [New] Build and compilation parameters
├── .gitignore                 # Version control hygiene rules
├── .vscode/
│   └── settings.json          # Workspace-locked compiler and format rules
├── README.md                  # Public onboarding and consumer usage
├── CONTRIBUTING.md            # Styling guidelines and code constraints
├── docs/                      # Internal architectural blueprints
│   ├── PROJECT_PLAN.md        # Roadmap and scaling vision
│   └── DEVELOPMENT_GUIDE.md   # [This File] Deep technical specs
└── src/
    ├── index.ts               # Public hook, provider, client, and lazy panel boundary
    ├── types.ts               # Shared internal and public typings
    ├── core/
    │   ├── ContentContext.ts  # Shared runtime context used by hook and dev panel
    │   ├── ContentProvider.ts # Runtime provider, state store, and lazy panel boundary
    │   ├── createContentClient.ts # Shared client configuration factory
    │   ├── useContent.ts      # Public hook implementation
    │   └── values.ts          # Enabled resolution and value fallback helpers
    ├── dev/
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

## Runtime Context Selection Protocol

Inside `src/index.ts`, `ContentProvider` resolves whether the content runtime is enabled. The default still follows `NODE_ENV`, while the public `enabled` prop or `createContentClient()` can override that default for preview deployments.

```typescript
// src/index.ts
export { ContentProvider } from './core/ContentProvider';
export { createContentClient } from './core/createContentClient';
export { useContent } from './core/useContent';
```

```typescript
// src/core/ContentProvider.ts
const DevPanel = lazy(() => import('../dev/Panel.js').then((module) => ({ default: module.Panel })));

export function ContentProvider({ children, client, enabled }: ContentProviderProps) {
  const resolvedEnabled = client?.enabled ?? enabled ?? !isProd;
  // Provides one runtime context and renders the lazy dev panel only when enabled.
}
```

## Phase Gamma: Compilation, Bundling & Distribution Specs

To ensure universal compatibility across modern framework environments (Vite, Next.js, Webpack, etc.) while preserving strict optimization boundaries, compilation uses a customized `tsup` orchestration script.

### 1. Code Generation Targets

Compilation automatically branches into two distinct module structures:

* **ESM (ECMAScript Modules):** Generates `.js` code distributions intended for modern module bundlers that utilize tree-shaking and async chunk loading mechanisms.
* **CJS (CommonJS):** Generates `.cjs` fallback paths targeting legacy Node server environments or older server-side rendering configurations.
* **Declarations:** Compiles standard structural `.d.ts` definitions to provide automated type inference within modern code editors.

### 2. Environment Selection Guardrails

The compiler is intentionally instructed **not** to inject or pre-bake the `process.env.NODE_ENV` value during our compilation step. The runtime default remains `enabled = process.env.NODE_ENV !== 'production'`, but applications can pass `enabled={true}` or a client configured with `{ enabled: true }` for preview deployments.

The main entry must not statically import the developer panel, controls, or icons. The ESM build enables splitting so the lazy panel import can become a separate async chunk.

### 3. Local Verification Protocol

Before shipping packages to public artifact registries, package validity can be verified locally through the following sandboxed workflow:

```bash
# 1. Build the production module packages locally
npm run build

# 2. Package the compiled artifacts into a compressed local tarball
npm pack

# 3. Navigate into an isolated testing sandbox application and install the tarball directly
npm install ../path/to/riganb-use-content-x.y.z.tgz

```

---
