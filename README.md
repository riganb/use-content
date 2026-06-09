# @riganb/use-content

A lightweight, type-safe, headless content injection hook and live-editing developer panel for React applications. Author content configurations directly inside your components and manipulate values live with zero application configuration.

---

## ✨ Features

* **Zero-Config Dashboard:** An atmospheric, responsive twilight-purple developer panel injected automatically into your development application root.
* **Inline Schema Registration:** Write component mock schemas directly where they live; fields self-register instantly upon runtime mounting.
* **Discriminated Type Safety:** Tight TypeScript union coupling that guarantees `initValue` types match their assigned control primitives perfectly.
* **Absolute Zero Production Footprint:** Automatic compilation switches evaluate environment conditions at the builder level, allowing production bundlers to completely tree-shake and strip out the developer panel, saving critical client bandwidth.

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

## ⚡ Production Infrastructure (Zero-Cost Overhead)

This package implements an environment-aware compilation entry pivot inside its main distribution layout.

When your application framework builds its static production bundles (e.g., via `npm run build` using Vite, Next.js, or Webpack), the compiler evaluates the literal conditional check `process.env.NODE_ENV === 'production'`.

Because the evaluation branch is left completely unresolved during library build-time:

1. The bundler detects the entire `/dev/` directory tree (the premium panel, inline SVG assets, custom form components, and state synchronization loops) as dead, unreachable code blocks.
2. It completely scrapes them away using **Tree-Shaking**.
3. The hook switches over to a lean, no-op performance pass-through module that skips registration loops and delivers your specified fallback `initValue` keys instantly, resulting in an added final application weight of **less than 1 kB**.

---

## 📜 License

Distributed under the MIT Open-Source License. See the accompanying `LICENSE` file for full legislative details.
