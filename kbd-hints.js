/**
 * ⌨️ 快捷键提示浮条
 * 用法: <script src="../shared/kbd-hints.js" defer></script>
 *
 * 在页面底部注入一个半透明的快捷键提示条。
 * 根据配置自动检测当前页面上下文来展示对应提示。
 * 点击可折叠/展开。
 */
(function () {
  const HINTS_MAP = {
    "P48": [
      { keys: "Space", desc: "翻转卡片" },
      { keys: "1", desc: "认识" },
      { keys: "2", desc: "不确定" },
      { keys: "3", desc: "不认识" },
      { keys: "← →", desc: "上/下一张" }
    ],
    "P33": [
      { keys: "←", desc: "扣留" },
      { keys: "→", desc: "发布" }
    ],
    "P31": [
      { keys: "1-4", desc: "选择分支" }
    ],
    "P29": [
      { keys: "Enter", desc: "检查答案" }
    ]
  };

  document.addEventListener("DOMContentLoaded", function () {
    // Detect project ID from URL
    const pathParts = location.pathname.split("/").filter(Boolean);
    const projectFolder = pathParts.find(p => /^P\d/.test(p)) || "";
    const projectId = projectFolder.replace(/-.*$/, ""); // e.g. "P48"

    const hints = HINTS_MAP[projectId];
    if (!hints || hints.length === 0) return;

    const bar = document.createElement("div");
    bar.id = "kbdHintBar";
    bar.style.cssText = [
      "position:fixed", "bottom:max(12px, env(safe-area-inset-bottom))", "right:76px", "z-index:30",
      "background:#241B11", "color:#F7EFDA", "font-size:13px",
      "display:flex", "align-items:center", "gap:12px",
      "font-family:var(--font-mono, monospace)",
      "border-radius:6px", "border:1px solid #5C4A32", "box-shadow:0 8px 22px rgba(0,0,0,0.22)"
    ].join(";");

    const label = document.createElement("button");
    label.type = "button";
    label.textContent = "快捷键";
    label.setAttribute("aria-expanded", "false");
    label.style.cssText = "cursor:pointer;font:inherit;color:inherit;background:transparent;border:0;min-width:44px;min-height:44px;padding:0 10px;";
    bar.appendChild(label);

    const content = document.createElement("span");
    content.id = "kbdHintContent";
    content.innerHTML = hints.map(h =>
      `<kbd style="background:#555;padding:2px 6px;border-radius:3px;margin:0 2px;font-size:12px;">${h.keys}</kbd> ${h.desc}`
    ).join("&nbsp;&nbsp;│&nbsp;&nbsp;");
    bar.appendChild(content);

    // Toggle
    let collapsed = true;
    function renderState() {
      content.style.display = collapsed ? "none" : "inline";
      bar.style.width = collapsed ? "auto" : "max-content";
      bar.style.maxWidth = "calc(100vw - 96px)";
      label.setAttribute("aria-expanded", collapsed ? "false" : "true");
    }
    renderState();

    label.addEventListener("click", () => {
      collapsed = !collapsed;
      renderState();
    });

    document.body.appendChild(bar);
  });
})();
