# Project Plan: @riganb/use-content

A lightweight, local-first visual content editor tool for development environments. It allows design, marketing, and product teams to update text, numbers, images, and other complex content formats in real time directly on a development build via an interactive form panel.

## Core Architectural Pillars
1. **Zero-Production Overhead**: The production build must strip away the UI panel, schemas, and mutation logic, leaving only an ultra-lightweight stub that returns initial values.
2. **Central State Registry**: A single unified Context acting as a reactive store. Fields register dynamically when hooks mount. If a field key already exists, it preserves its current live state instead of resetting to a newly mounted default.
3. **Zero External Dependencies (Initial)**: Avoid Tailwind, Framer Motion, or external UI libraries for Version 1 to guarantee a trivial, zero-config installation. The codebase remains highly decoupled to allow visual polish or animation frameworks to be introduced seamlessly in later iterations.
4. **Extensible Type Registry**: The core type evaluation and form rendering pipelines must be structured abstractly, allowing new simple or complex content data types to be added incrementally without rewriting the core orchestration engine.

## Feature Progression Roadmap

### Phase 1: Core Architecture & Synchronization (Current Focus)
- [ ] Establish repository layout and package configuration (`package.json`, TypeScript setups).
- [ ] Design the environment-aware dual entry point (`process.env.NODE_ENV` switching).
- [ ] Build the central `ContentProvider` and dynamic registration hook engine.
- [ ] Verify state consistency across separate components utilizing overlapping keys (initially supporting `string`, `number`, and `boolean`).

### Phase 2: Floating UI Panel & Form Fields
- [ ] Implement the persistent top-right action trigger (floating anchor button).
- [ ] Build the expand/collapse slide-out canvas for desktop and full-bleed drawer for mobile.
- [ ] Generate real-time dynamic forms mapped to the initial type schemas (`string` -> text input, `number` -> step counter, `boolean` -> checkbox toggle).
- [ ] Embed light-mode localized styles using semantic CSS variables.

### Phase 3: Persistence & Polish
- [ ] Introduce optional structural scoping IDs for handling complex isolated components.
- [ ] Add explicit opt-in `localStorage` synchronization for session persistence across hot-reloads.
- [ ] Implement explicit developer logging warnings if schemas clash across component initializations.

## Future Considerations & Scaling
- **Advanced Core Types**: Extend the schema to natively support rich imagery (URLs/file uploads), select dropdowns, multi-line text areas, and color pickers.
- **Visual Polish**: Introduce an optional, smooth animation layer (such as Framer Motion) and stylized design themes (like TailwindCSS support) once the underlying architecture is thoroughly stabilized.
- **Remote / Shared Synchronization**: Explore upgrading the local-first architecture to optionally broadcast live state changes to other team members via WebSockets or a shared backend database.
