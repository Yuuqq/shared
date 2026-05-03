/*!
 * Yuuqq/shared loader.mjs — v2.6.0 (ESM variant)
 *
 * Programmatic API for module-aware tools that prefer ES modules over
 * the script-tag loader. Same module registry as loader.js.
 *
 * Usage:
 *   import { load } from "../shared/loader.mjs";
 *   await load(["dark", "nav", "toast"], { base: "../shared/", tokens: "auto" });
 */
const MODULE_MAP = {
  "dark":       "dark-toggle.js",
  "nav":        "global-nav.js",
  "onboarding": "onboarding.js",
  "toast":      "toast.js",
  "autosave":   "autosave.js",
  "url-state":  "url-state.js",
  "export-png": "export-png.js",
  "cmd":        "cmd-palette.js",
  "kbd":        "kbd-hints.js",
};

export const VERSION = "v2.6.0";
export const map = MODULE_MAP;

function injectTokensIfNeeded(base, mode) {
  if (mode === "off") return;
  if (mode === "auto") {
    const existing = document.querySelectorAll('link[rel="stylesheet"]');
    for (const el of existing) if (/design-tokens\.css/.test(el.href)) return;
  }
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = base + "design-tokens.css";
  link.setAttribute("data-shared-loader", "tokens");
  document.head.appendChild(link);
}

function injectScript(base, id) {
  return new Promise((resolve) => {
    const file = MODULE_MAP[id];
    if (!file) {
      console.warn("[shared/loader] Unknown module:", id);
      resolve({ id, status: "unknown" });
      return;
    }
    if (document.querySelector(`script[data-shared-loader="${id}"]`)) {
      resolve({ id, status: "loaded" });
      return;
    }
    const s = document.createElement("script");
    s.src = base + file;
    s.async = false;
    s.setAttribute("data-shared-loader", id);
    s.onload  = () => resolve({ id, status: "loaded" });
    s.onerror = () => {
      console.error("[shared/loader] Module failed:", id);
      resolve({ id, status: "error", error: new Error(`Failed: ${file}`) });
    };
    document.head.appendChild(s);
  });
}

/**
 * Load shared modules in declaration order with per-module isolation.
 *
 * @param {string[]} modules - short names from MODULE_MAP keys
 * @param {object} opts
 * @param {string} opts.base - shared/ base path (default: same dir as loader)
 * @param {"auto"|"off"|"force"} opts.tokens - design-tokens.css injection
 * @returns {Promise<Record<string, "loaded"|"error"|"unknown">>}
 */
export async function load(modules, opts = {}) {
  const base = opts.base || new URL(".", import.meta.url).href;
  const tokens = opts.tokens || "auto";

  injectTokensIfNeeded(base, tokens);

  const status = {};
  for (const id of modules) {
    const r = await injectScript(base, id);
    status[id] = r.status;
  }

  globalThis.Shared = globalThis.Shared || {};
  globalThis.Shared.loader = { version: VERSION, base, status, map: MODULE_MAP };

  document.dispatchEvent(new CustomEvent("shared:loader:ready", {
    detail: { status }
  }));

  return status;
}
