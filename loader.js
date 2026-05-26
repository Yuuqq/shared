/*!
 * Yuuqq/shared loader.js — v2.6.0
 * Single entry point for shared UX modules across the P-series tool suite.
 *
 * Usage (HTML):
 *   <script src="../shared/loader.js"
 *           data-modules="dark,nav,onboarding,toast,autosave,url-state"
 *           data-tokens="auto"></script>
 *
 * Behavior:
 *   - Resolves the loader's own URL to derive the shared/ base path
 *   - Optionally injects design-tokens.css (data-tokens="auto" by default)
 *   - Loads each module's <script> tag in declaration order
 *   - Per-module error isolation: one failure does not abort the rest
 *   - Exposes window.Shared.loader.{ status, modules, ready, version }
 *   - Idempotent: re-running is a no-op for already-loaded modules
 *
 * SemVer: introduced in v2.6.0. Backwards-compatible — root-path script
 *   tags continue to work for tools not yet migrated.
 */
(function () {
  "use strict";

  if (window.Shared && window.Shared.loader && window.Shared.loader.version) {
    // Already loaded; idempotent guard.
    return;
  }

  // --- Module registry ---------------------------------------------------
  // Short-name → file mapping. Keep this list in sync with the README.
  var MODULE_MAP = {
    "dark":       "dark-toggle.js",
    "nav":        "global-nav.js",
    "onboarding": "onboarding.js",
    "toast":      "toast.js",
    "autosave":   "autosave.js",
    "url-state":  "url-state.js",
    "export-png": "export-png.js",
    "cmd":        "cmd-palette.js",
    "kbd":         "kbd-hints.js",
    "pedagogy-p1": "pedagogy-data-p1.js",
    "pedagogy-p2": "pedagogy-data-p2.js"
  };

  var VERSION = "v2.6.1";

  // --- Locate own script + base path ------------------------------------
  function findSelf() {
    // document.currentScript works for non-async, non-deferred external scripts
    var s = document.currentScript;
    if (s && s.src) return s;
    // Fallback: scan for the script tag with a src ending in /loader.js
    var all = document.getElementsByTagName("script");
    for (var i = all.length - 1; i >= 0; i--) {
      if (/\/loader\.js(\?|$)/.test(all[i].src)) return all[i];
    }
    return null;
  }

  var self_ = findSelf();
  if (!self_) {
    console.warn("[shared/loader] Cannot locate own <script> tag; aborting.");
    return;
  }

  var basePath = self_.src.replace(/\/loader\.js(\?.*)?$/, "/");

  // --- Parse declared modules -------------------------------------------
  var declared = (self_.getAttribute("data-modules") || "")
    .split(",").map(function (s) { return s.trim(); }).filter(Boolean);

  var tokensMode = (self_.getAttribute("data-tokens") || "auto").toLowerCase();
  // "auto" = inject if not already present; "off" = never; "force" = always

  // --- State ------------------------------------------------------------
  var status = {};   // moduleId → "pending"|"loaded"|"error"|"unknown"
  var errors = {};   // moduleId → Error
  var readyResolve;
  var readyPromise = (typeof Promise !== "undefined")
    ? new Promise(function (res) { readyResolve = res; })
    : null;

  window.Shared = window.Shared || {};
  window.Shared.loader = {
    version: VERSION,
    base: basePath,
    declared: declared.slice(),
    status: status,
    errors: errors,
    ready: readyPromise,
    map: MODULE_MAP
  };

  // --- Inject design-tokens.css if requested -----------------------------
  function maybeInjectTokens() {
    if (tokensMode === "off") return;
    if (tokensMode === "auto") {
      var existing = document.querySelectorAll('link[rel="stylesheet"]');
      for (var i = 0; i < existing.length; i++) {
        if (/design-tokens\.css/.test(existing[i].href)) return; // already there
      }
    }
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = basePath + "design-tokens.css";
    link.setAttribute("data-shared-loader", "tokens");
    (document.head || document.documentElement).appendChild(link);
  }

  // --- Inject one module ------------------------------------------------
  function injectModule(id) {
    return new Promise(function (resolve) {
      var file = MODULE_MAP[id];
      if (!file) {
        status[id] = "unknown";
        errors[id] = new Error("Unknown module id: " + id);
        console.warn("[shared/loader] Unknown module:", id);
        resolve();
        return;
      }
      // Idempotency check
      var existing = document.querySelector(
        'script[data-shared-loader="' + id + '"]'
      );
      if (existing && status[id] === "loaded") { resolve(); return; }

      status[id] = "pending";
      var script = document.createElement("script");
      script.src = basePath + file;
      script.setAttribute("data-shared-loader", id);
      script.async = false; // preserve declaration order
      script.onload = function () {
        status[id] = "loaded";
        resolve();
      };
      script.onerror = function (e) {
        status[id] = "error";
        errors[id] = new Error("Failed to load " + file);
        console.error("[shared/loader] Module failed:", id, e);
        // Per-module isolation: still resolve so other modules continue
        resolve();
      };
      (document.head || document.documentElement).appendChild(script);
    });
  }

  // --- Sequential load --------------------------------------------------
  function loadAll() {
    maybeInjectTokens();
    if (declared.length === 0) {
      if (readyResolve) readyResolve(status);
      return;
    }
    var chain = Promise.resolve();
    declared.forEach(function (id) {
      chain = chain.then(function () { return injectModule(id); });
    });
    chain.then(function () {
      if (readyResolve) readyResolve(status);
      // Dispatch a custom event for listeners that prefer events
      try {
        document.dispatchEvent(new CustomEvent("shared:loader:ready", {
          detail: { status: status, errors: errors }
        }));
      } catch (e) { /* old IE fallback not needed */ }
    });
  }

  // Defer until DOM is at least interactive so document.head exists
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadAll, { once: true });
  } else {
    loadAll();
  }
})();
