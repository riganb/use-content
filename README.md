# @riganb/use-content

A lightweight, type-safe, headless content injection hook and live-editing developer panel for React applications. Author content configurations directly inside your components and manipulate values live with zero application configuration.

---

## ✨ Features

* **Zero-Config Dashboard:** An atmospheric, responsive twilight-purple developer panel injected automatically into your development application root.
* **Inline Schema Registration:** Write component mock schemas directly where they live; fields self-register instantly upon runtime mounting.
* **Discriminated Type Safety:** Tight TypeScript union coupling that guarantees `initValue` types match their assigned control primitives perfectly.
* **Explicit Environment Control:** `ContentProvider` defaults from `NODE_ENV`, but `enabled` or a `contentClient` can force the live developer context on preview deployments or force the empty production path anywhere.

---

## 📦 Installation

Install the library along with its peer dependencies using your package manager of choice:

```bash
npm install @riganb/use-content
```

---

## 🚀 Quick Start

### 1. Wrap Your Application Root

To orchestrate dynamic state syncing, place the environment-aware `ContentProvider` at the root of your React layout tree:

```tsx
import React from 'react';
import { ContentProvider } from '@riganb/use-content';

export function App() {
  return (
    <ContentProvider>
      <MyFeatureComponent />
    </ContentProvider>
  );
}
```

`ContentProvider` uses the developer context by default unless `process.env.NODE_ENV === 'production'`. Pass `enabled` when the deployment environment should decide independently from `NODE_ENV`:

```tsx
<ContentProvider enabled={process.env.NEXT_PUBLIC_CONTENT_ENABLED === 'true'}>
  <MyFeatureComponent />
</ContentProvider>
```

For shared configuration, create a content client and pass it to the provider:

```tsx
import { ContentProvider, createContentClient } from '@riganb/use-content';

const contentClient = createContentClient({
  enabled: process.env.NEXT_PUBLIC_CONTENT_ENABLED === 'true',
});

export function App() {
  return (
    <ContentProvider client={contentClient}>
      <MyFeatureComponent />
    </ContentProvider>
  );
}
```

### 2. Register Mock Content Hooks Inside Components

Call `useContent` anywhere inside your consumer tree. Pass a typed, self-contained schema configuration object to automatically render reactive dashboard primitives in development:

```tsx
import React from 'react';
import { useContent } from '@riganb/use-content';

export function MyFeatureComponent() {
  // Primitives register instantly and enforce type inference downstream
  const content = useContent({
    heroTitle: {
      label: 'Main Hero Title',
      type: 'string',
      initValue: 'Welcome to the Future',
    },
    maxCapacity: {
      label: 'Maximum Operational Limit',
      type: 'number',
      initValue: 120,
    },
    isMaintenanceMode: {
      label: 'Enable System Blackout',
      type: 'boolean',
      initValue: false,
    },
  });

  return (
    <div style={{ padding: '24px' }}>
      <h1>{content.heroTitle}</h1>
      <p>Room Limit: {content.maxCapacity} passengers</p>
      {content.isMaintenanceMode && <div className="alert">System Overhaul Active</div>}
    </div>
  );
}
```

---

## 🛠️ Dynamic Core Schemes

The hook engine parses three core presentational primitives dynamically:

| Control Type | Output Type | Live Interactive Primitives |
| --- | --- | --- |
| `'string'` | `string` | High-fidelity text inputs featuring soft border focus transitions. |
| `'number'` | `number` | Floating-point text controls equipped with structural verification guards. |
| `'boolean'` | `boolean` | Smoothly animated, sliding iOS-style toggles built with custom bezier transitions. |

---

## ⚡ Production Infrastructure

This package implements an environment-aware default inside its main provider.

When `enabled` is omitted, production builds use the no-op behavior because `process.env.NODE_ENV === 'production'`. In that mode, `useContent` skips registration and returns each field's `initValue`.

Preview deployments can opt into the full live panel by passing `enabled={true}` or a client configured with `{ enabled: true }`. Production deployments can force the empty context by passing `enabled={false}`.

The main entry does not statically import the developer panel. When content editing is enabled, the panel loads through a dynamic import so production bundles can keep the main path lightweight.

---

## 📜 License

Distributed under the MIT Open-Source License. See the accompanying `LICENSE` file for full legislative details.
