# Code Review: Yuuqq/shared

## Overview
This is a comprehensive code review of the `Yuuqq/shared` repository, which provides shared frontend behavior and styling for 51 educational journalism tools. The review focuses on security, architecture, reliability, and maintainability.

## Findings

### CRITICAL

1. **Auto-Execution of Actions from URL State (CSRF / State-Injection)**
   - **File:** `url-state.js` (Lines ~165-175, `autoApplyState` function)
   - **Impact:** When a user opens a shared link, the script restores the state and automatically simulates a click on action buttons (e.g., `scanBtn`, `renderBtn`). An attacker can craft a malicious URL to force a victim's browser to execute actions (like scanning a network or making expensive API calls) without their consent.
   - **Fix Suggestion:** Remove the automatic `.click()` execution. State restoration should only populate inputs. If auto-execution is strictly required for UX, it must be gated behind an explicit user opt-in (e.g., "Do you want to run this shared configuration?").

2. **DOM-based XSS in Onboarding Tooltips**
   - **File:** `onboarding.js` (Functions `insertFlowGuide` and `startTour`)
   - **Impact:** `tip.text` is directly interpolated into HTML strings via `.innerHTML` without sanitization. Because default generic tips can extract text from DOM elements (`cleanButtonLabel` reads `.value`), an attacker could potentially inject malicious scripts via a crafted URL state that populates an input, which is then read and rendered as HTML by the onboarding module.
   - **Fix Suggestion:** Implement and use an `escapeHtml()` helper (similar to the one in `toast.js`) to sanitize `tip.text` before inserting it into `innerHTML`, or construct DOM nodes natively and use `.textContent`.

### HIGH

1. **Sensitive Data Leakage to LocalStorage**
   - **File:** `autosave.js` (Function `shouldPersistField`)
   - **Impact:** Unlike `url-state.js` which filters out inputs containing terms like `api-key` or `secret`, `autosave.js` only ignores `type="password"`. If a tool uses a `<input type="text" id="apiKey">`, its value is saved in plaintext to `localStorage`. Any XSS vulnerability on the domain would expose these credentials.
   - **Fix Suggestion:** Port the heuristic filtering logic from `url-state.js` (`shouldShareField`) into `autosave.js` to ensure fields matching `/(api[-_ ]?key|secret|token|password)/` are never saved to disk.

### MEDIUM

1. **CSP Violation via Inline Styles**
   - **File:** Multiple (`dark-toggle.js`, `onboarding.js`, `global-nav.js`, `toast.js`)
   - **Impact:** The codebase heavily relies on injecting `<style>` blocks and applying inline `style.cssText`. If consumer projects adopt a standard Content Security Policy (CSP) that restricts `unsafe-inline`, these modules will silently break or fail to render.
   - **Fix Suggestion:** Move injected CSS strings into dedicated CSS files (e.g., `modern-styles.css` or `design-tokens.css`) and toggle CSS classes via JS rather than dynamically building stylesheets in JS.

2. **Brittle Cross-Tool URL Resolution**
   - **File:** `global-nav.js` (Function `buildTargetUrl`)
   - **Impact:** The regex `/^(.*\/)P\d{2}-[^/]+\//` assumes a highly specific URL directory structure (`/PXX-name/`). If a tool is deployed at a root domain, or inside a non-matching subfolder, the command palette navigation will generate broken links (404s).
   - **Fix Suggestion:** Calculate neighbor tool paths relative to the current script's origin path (`window.Shared.loader.base` from `loader.js`), or use a central routing configuration instead of regex DOM location scraping.

3. **Missing Automated Testing Strategy**
   - **File:** Repository-wide
   - **Impact:** Because these scripts execute globally across 51 downstream repositories, the blast radius for regressions is massive. There are currently no unit tests (for logic like base64 en/decoding) or browser-based integration tests.
   - **Fix Suggestion:** Introduce a testing framework like Playwright or Jest. At minimum, add unit tests for parsing, sanitization, and serialization logic.

### LOW

1. **Canvas Tainting in PNG Export**
   - **File:** `export-png.js`
   - **Impact:** Rendering the DOM via SVG `<foreignObject>` will fail to export if the target DOM contains external images without appropriate CORS headers (the canvas becomes tainted and throws a security error on `.toDataURL()`).
   - **Fix Suggestion:** Add a specific `try-catch` block for the `.toDataURL()` call that gracefully degrades and warns the user about cross-origin image restrictions, rather than throwing a generic error.

2. **Scroll and Resize Event Thrashing**
   - **File:** `onboarding.js`
   - **Impact:** The `reposition` function is bound directly to `window.addEventListener("scroll")` and `"resize"` without debouncing or requestAnimationFrame wrappers, which could lead to layout thrashing and poor scroll performance on mobile devices.
   - **Fix Suggestion:** Wrap the `reposition` callback execution in `requestAnimationFrame()` to sync DOM measurements with the browser's paint cycle.

3. **Unhandled Storage Quota Exceeded Limits**
   - **File:** `autosave.js`
   - **Impact:** The autosave function blindly serializes the entire form state. If a tool contains very large payloads (e.g., base64 images or massive text bodies), it may exceed the 5MB local storage limit, breaking the save mechanism silently.
   - **Fix Suggestion:** Add checks for payload size before saving, or ensure `safeSetItem` emits a visible toast warning if a `QuotaExceededError` occurs.
