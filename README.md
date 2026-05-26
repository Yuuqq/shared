# Yuuqq/shared

Shared frontend library powering all 51 educational journalism tools in
the [`Yuuqq/P00`–`Yuuqq/P50`](https://github.com/Yuuqq) series.

> **One-line description**: design tokens + 6 globally-injected UX modules
> served via GitHub Pages and consumed by 51 sibling repositories through
> relative `../shared/` imports.

---

## 📦 What's inside

### Design layer

| File | Purpose |
|---|---|
| `design-tokens.css` | Semantic colors, type scale (`type-scale-v22`), spacing, motion tokens. Includes dark-mode variants and CJK-friendly defaults. |

### Behavior layer (6 globally-injected UX modules)

| File | Public surface | Drop-in via |
|---|---|---|
| `dark-toggle.js` | Floating dark/light toggle (bottom-right), system theme follow, cross-tab sync, theme-color meta sync | auto on script include |
| `global-nav.js` | ⌘K command palette + bottom-right gnav-fab; cross-tool jump | auto on script include |
| `onboarding.js` | High-light ring + step tooltips that follow scroll/resize | `window.startOnboarding(steps)` |
| `autosave.js` | Form state → `localStorage` per tool | auto on `<form data-autosave>` |
| `url-state.js` | Input state ↔ URL hash sync | auto on `<input data-url-state>` |
| `toast.js` | Top-center transient messages | `toast(msg, opts)` |

### Utility layer

| File | Purpose |
|---|---|
| `export-png.js` | Screenshot any DOM region to PNG download |
| `cmd-palette.js` / `kbd-hints.js` | Keyboard discoverability helpers |
| `pedagogy-data-p1.js` / `pedagogy-data-p2.js` | Shared pedagogical card content |
| `sw.js` | Service worker scaffolding (Q3-A PWA work) |
| `vendor/` | Pinned third-party deps (echarts, etc.) — no CDN |

---

## 🔌 How to consume

### Recommended (current)

From any `Yuuqq/P##` tool repository's `index.html`:

```html
<link rel="stylesheet" href="../shared/design-tokens.css">
<script defer src="../shared/dark-toggle.js"></script>
<script defer src="../shared/global-nav.js"></script>
<script defer src="../shared/onboarding.js"></script>
<!-- include only the modules you need -->
```

The `../shared/` relative path resolves to
`https://yuuqq.github.io/shared/` once deployed via GitHub Pages.

### Pinned to a specific version (recommended for new tools)

```html
<link rel="stylesheet" href="../shared/releases/v2.5/design-tokens.css">
<script defer src="../shared/releases/v2.5/dark-toggle.js"></script>
```

This insulates your tool from future shared/ changes. Bump the path
when you've validated the new release. See [CHANGELOG.md](./CHANGELOG.md)
for available versions.

### Single-entry-point loader (v2.6+, recommended for new tools)

```html
<script src="../shared/releases/v2.6/loader.js"
        data-modules="dark,nav,onboarding,toast,autosave,url-state"></script>
```

One line replaces the 6 individual `<script>` tags above.
`design-tokens.css` is auto-injected. Modules load in declaration order
with per-module error isolation. Inspect runtime status:

```js
window.Shared.loader.ready.then(status => console.log(status));
// → { dark: "loaded", nav: "loaded", toast: "loaded", ... }
```

Available module short-names:
`dark` · `nav` · `onboarding` · `toast` · `autosave` · `url-state`
· `export-png` · `cmd` · `kbd`. See [CHANGELOG v2.6.0](./CHANGELOG.md#v260--2026-05-03--q1-b-loader-infrastructure)
for full API.

ESM variant available at `loader.mjs` with `import { load } from` API.

> ✅ **As of v2.6.0**, a single `loader.js` is available — see below.

---

## 📐 Versioning policy

This library follows [SemVer](https://semver.org/):

- **MAJOR** (e.g. v2 → v3) — breaking changes to public API or default behavior
- **MINOR** (v2.4 → v2.5) — new modules or new opt-in hooks
- **PATCH** (v2.5.0 → v2.5.1) — bug fixes only

Starting at **v2.5.0**, every release is also archived under
`releases/v<MAJOR.MINOR>/` so 51 tools can pin a specific version.

For breaking-change migration notes, see
[`MIGRATION.md`](./MIGRATION.md).

---

## 📚 Documentation map

| Document | What it covers |
|---|---|
| [README.md](./README.md) | This file. Library overview + how to consume. |
| [CHANGELOG.md](./CHANGELOG.md) | Per-version history (Keep a Changelog format). |
| [ROADMAP.md](./ROADMAP.md) | 12-month plan (2026.05 – 2027.04), 4 quarters × 4 work items each. |
| [MIGRATION.md](./MIGRATION.md) | Breaking-change upgrade guides between MAJOR versions. |
| [PRIVACY.md](./PRIVACY.md) *(planned Q2-A)* | Data collection / telemetry policy. |

---

## 🧭 Conventions

- **Vanilla JS** only (no build step, no bundler, no transpiler)
- **No CDN deps** at runtime — everything in `vendor/` is committed
- **Self-contained modules** — each `.js` file in shared/ runs standalone
- **Progressive enhancement** — every module degrades gracefully if disabled
- **Accessibility-first** — WCAG AA contrast, keyboard navigation, ARIA, `prefers-reduced-motion`, iOS safe-area
- **Privacy-first** — zero tracking; future telemetry (Q2-A) will be opt-in and PII-free

---

## 🚀 Status (2026-05-03)

- Current release: **v2.5.0** ([CHANGELOG](./CHANGELOG.md#v250--2026-05-03--baseline-release-for-the-12-month-roadmap))
- Consumers: **51 tools** (P00–P50)
- Open known bugs: **0**
- Active work: see [ROADMAP.md](./ROADMAP.md) — currently in Q1
  (stabilization & developer experience)

---

## 🤝 Contributing

The plugin / community contribution architecture lands in **Q4-C**.
Until then, please open an issue at
[Yuuqq/shared/issues](https://github.com/Yuuqq/shared/issues) before
sending a PR — shared/ changes affect all 51 tools simultaneously.

---

*Maintained as a single-author project. See [ROADMAP.md § risks](./ROADMAP.md#十风险登记册) for sustainability mitigations.*
