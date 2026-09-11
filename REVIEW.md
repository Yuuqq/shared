# Code Review: Yuuqq/shared

## Overview
This is a comprehensive code review of the `Yuuqq/shared` repository, which provides shared frontend behavior and styling for 51 educational journalism tools. The review focuses on security, architecture, reliability, and maintainability.

## Findings

### CRITICAL

1. **Auto-Execution of Actions from URL State and State-Injection (CSRF)**
   - **File:** `url-state.js`
   - **Impact:** When a user opens a shared link, the script restores the state and automatically simulates a click on action buttons without user consent. Furthermore, the `restoreState` function fails to use `shouldShareField` to filter elements before overwriting their values, meaning an attacker can craft a hash that overwrites arbitrary inputs, including password fields or hidden administrative markers.
   - **Fix Suggestion:** Remove the automatic `.click()` execution. Ensure `restoreState` strictly enforces the `shouldShareField` filter before calling `writeFieldValue(el, value)`.

2. **DOM-based XSS in Onboarding Tooltips**
   - **File:** `onboarding.js` (Functions `insertFlowGuide` and `startTour`)
   - **Impact:** `tip.text` is directly interpolated into HTML strings via `.innerHTML` without sanitization. Because default generic tips can extract text from DOM elements, an attacker could potentially inject malicious scripts via a crafted URL state that populates an input, which is then read and rendered as HTML by the onboarding module.
   - **Fix Suggestion:** Implement and use an `escapeHtml()` helper (similar to the one in `toast.js`) to sanitize `tip.text` before inserting it into `innerHTML`, or construct DOM nodes natively and use `.textContent`.

3. **Loader Race Condition**
   - **File:** `loader.js`, `url-state.js`, `autosave.js`, etc.
   - **Impact:** `loader.js` injects scripts asynchronously after `DOMContentLoaded`. However, the injected scripts only listen for the `DOMContentLoaded` event without a fallback for `document.readyState`. This causes them to fail to initialize silently if loaded dynamically via `loader.js`.
   - **Fix Suggestion:** Wrap the initialization logic in a function and run it immediately if `document.readyState` is not `"loading"`, otherwise attach it to `DOMContentLoaded`.

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

3. **Service Worker Strategy Mismatch**
   - **File:** `sw.js`
   - **Impact:** The `sw.js` comment claims Network-First is used for API requests. However, the actual implementation uses Cache-First for same-origin GET requests and completely ignores/drops cross-origin requests, which will break external API integrations.
   - **Fix Suggestion:** Implement a proper Network-First strategy (fetch -> cache -> fallback) for cross-origin requests.

4. **Missing Automated Testing Strategy**
   - **File:** Repository-wide
   - **Impact:** Because these scripts execute globally across 51 downstream repositories, the blast radius for regressions is massive. There are currently no unit tests (for logic like base64 en/decoding) or browser-based integration tests.
   - **Fix Suggestion:** Introduce a testing framework like Playwright or Jest. At minimum, add unit tests for parsing, sanitization, and serialization logic.

### LOW

1. **Unhandled Storage Quota Exceeded Limits**
   - **File:** `autosave.js`
   - **Impact:** The autosave function blindly serializes the entire form state. If a tool contains very large payloads (e.g., base64 images or massive text bodies), it may exceed the 5MB local storage limit, breaking the save mechanism silently.
   - **Fix Suggestion:** Add checks for payload size before saving, or ensure `safeSetItem` emits a visible toast warning if a `QuotaExceededError` occurs.

2. **Global Nav Drift**
   - **File:** `global-nav.js` and `cmd-palette.js`
   - **Impact:** `global-nav.js` and `cmd-palette.js` use different URL routing rules which causes broken links depending on the deployment path.
   - **Fix Suggestion:** Standardize the routing logic across both navigation components to prevent link rot.
