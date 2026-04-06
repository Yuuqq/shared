/**
 * 🌗 全局暗色模式切换器 (Dark Mode Toggle)
 * 引入方式: <script src="../shared/dark-toggle.js" defer></script>
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

  function safeSetTheme(theme) {
    try {
      if (theme === null) {
        localStorage.removeItem(STORAGE_KEY);
      } else {
        localStorage.setItem(STORAGE_KEY, theme);
      }
    } catch (_e) {}
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
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "theme-color";
      document.head.appendChild(meta);
    }
    const computedBg = getComputedStyle(document.documentElement).getPropertyValue("--bg").trim();
    meta.setAttribute("content", computedBg || (theme === "dark" ? "#1a1a2e" : "#f4f0e8"));
  }

  function applyTheme(theme, options) {
    const persist = options?.persist === true;
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme;
    if (persist) safeSetTheme(theme);
    syncThemeColor(theme);
    const btn = document.getElementById("darkToggleBtn");
    if (btn) {
      btn.textContent = theme === "dark" ? "☀️" : "🌙";
      btn.setAttribute("aria-label", theme === "dark" ? "切换到亮色模式" : "切换到暗色模式");
      btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    }
  }

  function createToggle() {
    const btn = document.createElement("button");
    btn.id = "darkToggleBtn";
    btn.type = "button";
    btn.style.cssText = [
      "position:fixed", "top:12px", "right:12px", "z-index:9999",
      "width:44px", "height:44px", "border-radius:50%",
      "border:2px solid var(--line)", "background:var(--card)",
      "color:var(--ink)", "font-size:22px", "cursor:pointer",
      "display:flex", "align-items:center", "justify-content:center",
      "box-shadow:0 2px 8px rgba(0,0,0,0.15)", "transition:all .2s ease",
      "line-height:1", "padding:0"
    ].join(";");
    btn.setAttribute("aria-pressed", document.documentElement.getAttribute("data-theme") === "dark" ? "true" : "false");
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
