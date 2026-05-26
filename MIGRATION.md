# Migration Guide

This document captures breaking-change migration notes between MAJOR
versions of `Yuuqq/shared`. PATCH and MINOR releases are always
backwards-compatible and do not require migration — see
[`CHANGELOG.md`](./CHANGELOG.md) for those.

> 📌 **Status as of 2026-05-03**: no breaking migrations exist yet.
> The current line is **v2.5.x** and is fully back-compatible with v2.x.
> This file exists as a **template + landing page** for the upcoming
> **v3.0.0** release.

---

## Format

Each entry below follows this structure:

```
## v<old> → v<new>
- Release date:
- Affected modules:
- Breaking changes:
- Required actions (per tool):
- Codemod / sed snippet:
- Backwards-compat shim availability + EOL date:
- Reference PR / issue:
```

---

## v2.x → v3.0.0 *(planned, Q1-2027 per ROADMAP.md)*

**Status**: not yet released. The text below is a **placeholder spec**
to be filled in when v3.0.0 ships.

- **Release date**: TBD (target: end of Q1 2027)
- **Affected modules**: `loader.js` (new), all script-tag include patterns
- **Breaking changes** (anticipated):
  1. The 6 individual `<script>` tags for dark-toggle / global-nav /
     onboarding / autosave / url-state / toast are **replaced** by a
     single `<script src="../shared/loader.js" data-modules="...">`.
  2. `window.startOnboarding` and other globals may move into the
     `Shared` namespace (e.g. `Shared.onboarding.start()`).
- **Required actions per tool**:
  1. Replace 6–10 lines of `<script>` tags with 1 loader line.
  2. Update any code calling `window.startOnboarding` →
     `Shared.onboarding.start`.
- **Codemod**: a script will ship at `shared/scripts/migrate-v2-to-v3.mjs`.
  Run from each tool repo's root:
  ```bash
  curl -sL https://yuuqq.github.io/shared/scripts/migrate-v2-to-v3.mjs | node
  ```
- **Backwards-compat shim**: v2.x root paths
  (`../shared/dark-toggle.js` etc.) will continue to work as thin
  wrappers re-exporting from `releases/v2.5/`. **EOL: 2027-12-31.**
- **Reference**: ROADMAP.md § Q1-B

---

## How to add a new migration entry

When publishing a new MAJOR release:

1. Copy the template from the **Format** section above
2. Fill in every field — **do not** leave TBDs in published versions
3. Update the [README.md](./README.md) "Versioning policy" section if
   the policy itself changes
4. Cross-link from [CHANGELOG.md](./CHANGELOG.md) entry under "Changed"

---

*This file is a living document.*
