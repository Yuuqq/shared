/**
 * 📸 通用 PNG 导出模块
 * 用法: <script src="../shared/export-png.js" defer></script>
 *
 * 自动检测页面中 id="exportPngBtn" 的按钮。
 * 点击后截取 data-target 指定的容器（默认 "#timeline" 或 "main"）为 PNG 并下载。
 *
 * 使用纯 Canvas API，不依赖任何第三方库。
 * 对于 ECharts 图表，直接调用 chart.getDataURL()。
 */
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("exportPngBtn");
    if (!btn) return;

    btn.addEventListener("click", async function () {
      const targetId = btn.getAttribute("data-target") || "timeline";
      const target = document.getElementById(targetId);
      if (!target) {
        const statusEl = document.getElementById("status");
        if (statusEl) statusEl.textContent = "状态: 未找到可导出的内容区域";
        return;
      }

      btn.disabled = true;
      btn.textContent = "📸 导出中...";

      try {
        // Check if target contains a canvas (e.g. ECharts)
        const canvas = target.querySelector("canvas");
        if (canvas) {
          downloadCanvas(canvas, "chart-export.png");
        } else {
          // Fallback: use SVG foreignObject approach for DOM content
          await domToImage(target, "export.png");
        }
        const statusEl = document.getElementById("status");
        if (statusEl) statusEl.textContent = "状态: PNG 已导出";
      } catch (err) {
        const statusEl = document.getElementById("status");
        if (statusEl) statusEl.textContent = "状态: 导出失败 - " + err.message;
      } finally {
        btn.disabled = false;
        btn.textContent = "📸 导出 PNG";
      }
    });
  });

  function downloadCanvas(canvas, filename) {
    const link = document.createElement("a");
    link.download = filename;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  async function domToImage(element, filename) {
    const rect = element.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    // Clone the element to avoid modifying the original
    const clone = element.cloneNode(true);
    clone.style.width = w + "px";
    clone.style.height = h + "px";

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:system-ui,sans-serif;">
          ${new XMLSerializer().serializeToString(clone)}
        </div>
      </foreignObject>
    </svg>`;

    const img = new Image();
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    return new Promise((resolve, reject) => {
      img.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = w * 2;  // 2x for retina
        canvas.height = h * 2;
        const ctx = canvas.getContext("2d");
        ctx.scale(2, 2);
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);
        downloadCanvas(canvas, filename);
        resolve();
      };
      img.onerror = reject;
      img.src = url;
    });
  }
})();
