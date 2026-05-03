/**
 * 🌗 全局暗色模式切换器 (Dark Mode Toggle)
 * 本文件为 P00-dashboard 的本地副本，用于保持仓库自包含。
 * 若上游 shared 版本更新，需要按需同步这里的实现。
 * 引入方式: <script src="./shared/dark-toggle.js" defer></script>
 *
 * 功能：
 * 1. 在页面右上角注入浮动的 🌙/☀️ 切换按钮
 * 2. 用户偏好通过 localStorage 持久化
 * 3. 首次加载时跟随系统偏好 (prefers-color-scheme)
 */
(function () {
  const STORAGE_KEY = "journalism_toolbox_theme";
  const THEME_QUERY = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  function safeGetTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (_e) {
      return null;
    }
  }

  function hasStoredThemeKey() {
    try {
      for (let index = 0; index < localStorage.length; index += 1) {
        if (localStorage.key(index) === STORAGE_KEY) return true;
      }
    } catch (_e) {}
    return false;
  }

  function safeSetTheme(theme) {
    try {
      if (hasStoredThemeKey() && safeGetTheme() === null) {
        return false;
      }
      if (theme === null) {
        localStorage.removeItem(STORAGE_KEY);
        return !hasStoredThemeKey();
      } else {
        localStorage.setItem(STORAGE_KEY, theme);
        return safeGetTheme() === theme;
      }
    } catch (_e) {}
    return false;
  }

  function getStoredTheme() {
    const stored = safeGetTheme();
    return stored === "dark" || stored === "light" ? stored : null;
  }

  function getSystemTheme() {
    return THEME_QUERY && THEME_QUERY.matches ? "dark" : "light";
  }

  function getPreferred() {
    return getStoredTheme() || getSystemTheme();
  }

  function syncThemeColor(theme) {
    const computedBg = getComputedStyle(document.documentElement).getPropertyValue("--bg").trim();
    const content = computedBg || (theme === "dark" ? "#1a1a2e" : "#f4f0e8");
    let metas = Array.from(document.querySelectorAll('meta[name="theme-color"]'));
    if (!metas.length) {
      const meta = document.createElement("meta");
      meta.name = "theme-color";
      document.head.appendChild(meta);
      metas = [meta];
    }
    const primary = metas[0];
    primary.setAttribute("content", content);
    primary.removeAttribute("media");
    metas.slice(1).forEach(meta => meta.remove());
  }

  function syncToggleButton(btn, theme) {
    if (!btn) return;
    btn.textContent = theme === "dark" ? "☀️" : "🌙";
    btn.setAttribute("aria-label", theme === "dark" ? "切换到亮色模式" : "切换到暗色模式");
    btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
  }

  function applyTheme(theme, options) {
    const persist = options?.persist === true;
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme;
    if (persist && !safeSetTheme(theme)) {
      if (typeof window.showFreshToast === "function") {
        window.showFreshToast("主题偏好未写入浏览器存储，刷新后将恢复系统外观。", "warn", 4500);
      } else if (typeof window.replaceToasts === "function") {
        window.replaceToasts("主题偏好未写入浏览器存储，刷新后将恢复系统外观。", "warn", 4500);
      } else {
        window.clearToasts?.();
        window.pmMetrics?.reconcileStorageState?.({ resetPendingStatus: true, suppressActiveStatus: true });
        window.showToast?.("主题偏好未写入浏览器存储，刷新后将恢复系统外观。", "warn", 4500);
      }
    }
    syncThemeColor(theme);
    const btn = document.getElementById("darkToggleBtn");
    syncToggleButton(btn, theme);
  }

  function createToggle() {
    const btn = document.createElement("button");
    btn.id = "darkToggleBtn";
    btn.type = "button";
    // Position: bottom-right, stacked above the global-nav ⌘K fab.
    // Previously top-right (top:12px right:12px) which overlapped with
    // tools' own hero action buttons (教程 / 重置 / 导出 etc.). Moving
    // both floating UI to the bottom-right column keeps page content
    // clear of permanent overlays.
    btn.style.cssText = [
      "position:fixed", "bottom:72px", "right:16px", "z-index:9999",
      "width:44px", "height:44px", "border-radius:50%",
      "border:2px solid var(--line)", "background:var(--card)",
      "color:var(--ink)", "font-size:22px", "cursor:pointer",
      "display:flex", "align-items:center", "justify-content:center",
      "box-shadow:0 2px 8px rgba(0,0,0,0.15)", "transition:all .2s ease",
      "line-height:1", "padding:0"
    ].join(";");

    // Mobile: tighter spacing to mirror gnav-fab's @media (max-width:600px)
    // override (which uses bottom:12 right:12).
    if (window.matchMedia && window.matchMedia("(max-width: 600px)").matches) {
      btn.style.bottom = "68px";
      btn.style.right = "12px";
    }

    // Hide both floating widgets in print to avoid them appearing in PDFs
    // (gnav already self-hides via @media print; mirror that for parity).
    var darkPrintStyle = document.getElementById("darkTogglePrintStyle");
    if (!darkPrintStyle) {
      darkPrintStyle = document.createElement("style");
      darkPrintStyle.id = "darkTogglePrintStyle";
      darkPrintStyle.textContent = "@media print { #darkToggleBtn { display: none !important; } }";
      document.head.appendChild(darkPrintStyle);
    }
    syncToggleButton(btn, document.documentElement.getAttribute("data-theme") || getPreferred());
    btn.addEventListener("mouseenter", function() { btn.style.transform = "scale(1.1)"; });
    btn.addEventListener("mouseleave", function() { btn.style.transform = "scale(1)"; });
    btn.addEventListener("click", function () {
      const current = document.documentElement.getAttribute("data-theme") || getPreferred();
      applyTheme(current === "dark" ? "light" : "dark", { persist: true });
    });
    document.body.appendChild(btn);
  }

  function handleSystemThemeChange() {
    if (!getStoredTheme()) applyTheme(getSystemTheme());
  }

  if (THEME_QUERY) {
    if (typeof THEME_QUERY.addEventListener === "function") {
      THEME_QUERY.addEventListener("change", handleSystemThemeChange);
    } else if (typeof THEME_QUERY.addListener === "function") {
      THEME_QUERY.addListener(handleSystemThemeChange);
    }
  }

  window.addEventListener("storage", function (event) {
    if (event.key !== null && event.key !== STORAGE_KEY) return;
    applyTheme(getPreferred());
  });

  // Init
  applyTheme(getPreferred());
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createToggle);
  } else {
    createToggle();
  }
})();

/* ===== v2.1 自动加载 global-nav.js (51 工具跨页跳转) =====
 * 由 dark-toggle.js 代为注入，避免修改 51 个 index.html。
 * 若工具自行加载了 global-nav.js，IIFE 内部已有 __globalNavInited 哨兵防重复。
 */
(function autoLoadGlobalNav() {
  try {
    var src = document.currentScript && document.currentScript.src;
    if (!src) {
      // currentScript 在 defer 场景为 null，回退：找已加载的 dark-toggle.js
      var scripts = document.getElementsByTagName("script");
      for (var i = scripts.length - 1; i >= 0; i--) {
        if (scripts[i].src && scripts[i].src.indexOf("dark-toggle.js") !== -1) {
          src = scripts[i].src; break;
        }
      }
    }
    if (!src) return;
    var navSrc = src.replace(/dark-toggle\.js.*$/, "global-nav.js");
    // 去重：如果工具已经显式加载了 global-nav.js，跳过
    if (document.querySelector('script[src*="global-nav.js"]')) return;
    var s = document.createElement("script");
    s.src = navSrc;
    s.defer = true;
    s.onerror = function () {
      if (window.console && console.warn) console.warn("[dark-toggle] global-nav.js 加载失败:", navSrc);
    };
    document.head.appendChild(s);
  } catch (_e) {
    // global-nav 是渐进增强，失败不影响主功能
  }
})();
