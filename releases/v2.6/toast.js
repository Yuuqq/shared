/**
 * 🔔 全局 Toast 通知系统
 * 引入方式: <script src="../shared/toast.js" defer></script>
 *
 * API:
 *   window.showToast("消息内容", "success"|"info"|"warn"|"error", 3000)
 *
 * 自动堆叠，自动消失，支持手动关闭。
 */
(function () {
  let container = null;

  function ensureContainer() {
    if (container) return container;
    container = document.createElement("div");
    container.id = "toastContainer";
    container.setAttribute("role", "region");
    container.setAttribute("aria-label", "页面消息");
    container.setAttribute("aria-live", "polite");
    container.setAttribute("aria-relevant", "additions");
    container.style.cssText = [
      "position:fixed", "top:56px", "right:16px", "z-index:99998",
      "display:flex", "flex-direction:column", "gap:8px",
      "pointer-events:none", "max-width:360px"
    ].join(";");
    document.body.appendChild(container);
    return container;
  }

  const ICONS = { success: "✅", info: "ℹ️", warn: "⚠️", error: "❌" };
  const COLORS = {
    success: { bg: "var(--ok-light,#e8f5ee)", border: "var(--ok,#0b7a3b)" },
    info: { bg: "var(--accent-light,rgba(199,73,31,0.08))", border: "var(--accent,#c7491f)" },
    warn: { bg: "var(--warn-light,#fef7e0)", border: "var(--warn,#b86e00)" },
    error: { bg: "var(--bad-light,#fdecea)", border: "var(--bad,#a61f12)" }
  };

  window.showToast = function (message, type, duration) {
    type = type || "info";
    duration = duration || 3000;
    const c = COLORS[type] || COLORS.info;

    ensureContainer();

    const toast = document.createElement("div");
    const isAssertive = type === "error" || type === "warn";
    toast.setAttribute("role", isAssertive ? "alert" : "status");
    toast.setAttribute("aria-live", isAssertive ? "assertive" : "polite");
    toast.setAttribute("aria-atomic", "true");
    toast.style.cssText = [
      `background:${c.bg}`, `border-left:4px solid ${c.border}`,
      "padding:10px 14px", "border-radius:8px", "font-size:13px",
      "color:var(--ink,#1a1a1a)", "box-shadow:0 4px 12px rgba(0,0,0,0.12)",
      "display:flex", "align-items:center", "gap:8px",
      "pointer-events:auto", "cursor:pointer",
      "animation:toastSlideIn .25s ease-out",
      "font-family:var(--font-sans,system-ui)"
    ].join(";");

    toast.innerHTML = `<span aria-hidden="true">${ICONS[type] || ""}</span><span style="flex:1">${message}</span><span aria-hidden="true" style="opacity:0.4;font-size:11px">✕</span>`;
    toast.addEventListener("click", () => removeToast(toast));

    container.appendChild(toast);

    if (duration > 0) {
      setTimeout(() => removeToast(toast), duration);
    }
  };

  function removeToast(el) {
    if (!el || !el.parentNode) return;
    el.style.animation = "toastSlideOut .2s ease-in forwards";
    setTimeout(() => { if (el.parentNode) el.parentNode.removeChild(el); }, 200);
  }

  // Inject animation keyframes
  const style = document.createElement("style");
  style.textContent = `
    @keyframes toastSlideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    @keyframes toastSlideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }
  `;
  document.head.appendChild(style);
})();
