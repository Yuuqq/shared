# Changelog

All notable changes to `Yuuqq/shared` are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versioning follows [SemVer](https://semver.org/).

> Versioning policy: starting at **v2.5.0**, every release is also archived
> at `releases/v<MAJOR.MINOR.PATCH>/` so 51 downstream tools can pin a
> specific version. The unversioned root files always reflect the latest
> release for backwards compatibility, but new tools should reference the
> versioned path.

---

## [v2.5.0] – 2026-05-03 — *baseline release for the 12-month roadmap*

This release packages every fix and polish layer accumulated over the
2026-Q1+Q2 polish sprint and becomes the **first archived snapshot** at
`releases/v2.5/`.

### Added
- `ROADMAP.md` — 12-month technical roadmap covering Q1 (stability/DX),
  Q2 (telemetry/perf), Q3 (PWA/i18n), Q4 (ecosystem). Full work-item spec
  with priority, effort, acceptance criteria, dependencies, and risks.
  *(commits 2b910bd, 9e40814)*
- `releases/v2.5/` — first immutable version snapshot of all shared
  modules, enabling per-tool version pinning.

### Fixed
- **`dark-toggle.js` + `global-nav.js`** — bottom-right floating widgets
  now respect iOS safe-area insets via `calc(... + env(safe-area-inset-*, 0px))`,
  preventing the home indicator on iPhone X+ from occluding tap targets.
  Resolves to 0 on non-iOS browsers (no behavior change). *(c5737ab, 3ed0d5e)*
- **`dark-toggle.js`** — when no explicit user theme preference is stored,
  preserves `<meta name="theme-color" media="...">` pairs instead of
  collapsing to a single tag. Restores per-mode browser chrome coloring on
  Safari/Chrome mobile. *(483eb42)*
- **`dark-toggle.js`** — moved the floating toggle from top-right to
  bottom-right (above gnav-fab) so it no longer overlaps tools' own
  top-right action buttons across 51 tools. *(ae43e60)*
- **`onboarding.js`** — high-light ring + tooltip now follow the target
  element on `scroll` and `resize` events, fixing visible drift when
  users scrolled mid-step. *(03e60ac)*

### Changed
- *(no breaking changes — fully backwards compatible with v2.3.x)*

---

## [v2.3.2] – 2026-05-03

### Changed
- Unified `.touch-square` and `.square-target` as aliases — a single
  44×44px touch-target convention. Old class names continue to work. *(bc2a286)*

---

## [v2.3.1] – 2026-05-03

### Fixed
- Resolved 5 issues from architect review of the v2.3 UX layer. *(2835f31)*

---

## [v2.3.0] – 2026-05-03

### Added
- **Global UX experience layer** — six modules now auto-injected via
  shared/ and active across all 51 tools simultaneously: `dark-toggle`,
  `onboarding`, `global-nav` (⌘K palette), `autosave`,
  `url-state`, `toast`. Each module is a self-contained drop-in with
  zero per-tool wiring. *(6954fd2)*

---

## [v2.2.1] – 2026-05-03

### Fixed
- Heading scale tokens now gated behind `:where()` to avoid winning
  specificity over per-tool styles.
- CJK-friendly default `line-height` and `letter-spacing` for Chinese
  text density. *(e1e5066)*

---

## [v2.2.0] – 2026-05-03

### Added
- **`type-scale-v22`** — unified typography tokens
  (`--fs-1` … `--fs-7`, `--lh-tight`, `--lh-body`,
  `--lh-loose`) replacing per-tool ad-hoc font sizes. *(ada2cfe)*

---

## [v2.1.0] – 2026-04-06

### Added
- System theme auto-follow (`prefers-color-scheme` media listener with
  manual override).
- Cross-tab dark-mode sync via `storage` event.
- `<meta name="theme-color">` updates synchronized to current mode.
- `aria-pressed` on the toggle button for screen-reader correctness.
- Persistent control state across reloads. *(6d06829)*

---

## [v2.0.0] – 2026-04-05

### Added
- Enhanced visibility for the dark toggle (clearer hover + focus states).

### Fixed
- Darkened `--ink-secondary` semantic color to meet WCAG AA contrast
  against `--bg-base`. *(0052784)*

---

## [v1.0.0] – 2026-04-02

### Added
- Initial usability update across the shared library (the first release
  consumed simultaneously by multiple P-series tools). *(39c453c)*

---

## Cross-repository activity (2026-Q1+Q2 polish sprint)

The shared library above accounts for **15 commits**. The complete polish
sprint extended across **52 repositories** (`Yuuqq/shared` plus
`Yuuqq/P00` through `Yuuqq/P50`) with **~270 commits** in total,
broken down approximately as:

| Category | Repos affected | Approx. commits |
|---|---|---|
| L1 type-scale-v22 baseline | 51 tools | 51 |
| L2 universal UX baseline (skip-link / theme-color / color-scheme / og / print / reduced-motion / lazy img) | 51 tools | 51 |
| L3 v2.4.1 deep polish (hero gradient / btn / card / focus / status pill) | 51 tools | 51 |
| L4 Tier-1 tool-specific enhancements | 11 tools | 22 |
| L4 Tier-2 archetype-driven enhancements | 40 tools | 80 |
| Fixes (P21 nested dropzone, P38 img alt) | 2 tools | 2 |
| `shared/` library (this changelog) | 1 repo | 15 |
| **Total** | **52 repos** | **~270** |

Per-tool changelogs are out of scope for this central document. Use
`git log` on the relevant `Yuuqq/P##` repository for fine-grained
history. The shared library's CHANGELOG is the canonical reference for
cross-tool behavioral changes.

---

## Upcoming (per ROADMAP.md)

- **v2.5.x patch series** — fixes only, as discovered via incoming
  Q2-A error telemetry once it ships.
- **v3.0.0** *(target Q1-2026-end)* — `loader.js` consolidation
  (Q1-B) + versioned release infrastructure activated downstream.
  Migration guide will live in `MIGRATION.md`.

---

*This changelog is a living document and updated on every release.*
