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

  function safeGetTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (_e) {
      return null;
    }
  }

  function safeSetTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (_e) {}
  }

  function getPreferred() {
    const stored = safeGetTheme();
    if (stored === "dark" || stored === "light") return stored;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    safeSetTheme(theme);
    const btn = document.getElementById("darkToggleBtn");
    if (btn) {
      btn.textContent = theme === "dark" ? "☀️" : "🌙";
      btn.setAttribute("aria-label", theme === "dark" ? "切换到亮色模式" : "切换到暗色模式");
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
    btn.addEventListener("mouseenter", function() { btn.style.transform = "scale(1.1)"; });
    btn.addEventListener("mouseleave", function() { btn.style.transform = "scale(1)"; });
    btn.addEventListener("click", function () {
      const current = document.documentElement.getAttribute("data-theme") || getPreferred();
      applyTheme(current === "dark" ? "light" : "dark");
    });
    document.body.appendChild(btn);
  }

  // Init
  applyTheme(getPreferred());
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createToggle);
  } else {
    createToggle();
  }
})();
