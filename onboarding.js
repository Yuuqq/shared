/**
 * 🎯 首次访问引导提示 + 建议流程卡
 * 引入方式: <script src="../shared/onboarding.js" defer></script>
 *
 * 功能：
 * 1. 在页面首屏注入「建议这样使用」流程卡，明确先后顺序
 * 2. 首次访问时展示 2-4 步高亮引导
 * 3. 支持跳过、完成后不再自动弹出、随时重新查看
 */
(function () {
  const SPECIFIC_TIPS_MAP = {
    P01: [
      { target: "textarea,input[type='text']", text: "先输入问题或采访提示词。" },
      { target: ".apiKey", text: "再填入 API Key 与模型参数，避免提交空请求。" },
      { target: "#runBtn,button[type='submit']", text: "确认后点击主按钮，并排查看多模型结果。" }
    ],
    P14: [
      { target: "#jsonInput", text: "先编辑或粘贴事件 JSON。" },
      { target: "#renderBtn", text: "再点击渲染生成时间线。" },
      { target: "#exportPngBtn", text: "满意后再导出 PNG。" }
    ],
    P20: [
      { target: "#textInput", text: "先粘贴足够长的新闻或评论文本，避免只抽出零散词项。" },
      { target: "#termLimit", text: "词项太多会挤坏可读性，可先调节展示词数再生成。" },
      { target: ".cloud-shell", text: "生成后先核对云图里的大词和右侧高频词是否一致，再决定是否导出或分享。" }
    ],
    P21: [
      { target: "#fileInput,input[type='file']", text: "先上传一张照片或把图片拖进来。" },
      { target: "#parseBtn", text: "再点击解析，提取 EXIF 元数据。" },
      { target: "#output", text: "结果会出现在这里，可继续复制元数据。" }
    ],
    P29: [
      { target: ".comments,#comments", text: "先观察左边的言论卡片。" },
      { target: ".board,.dropzone,.targets", text: "再拖到右边对应的谬误类型。" },
      { target: "#checkBtn,button[id*='check']", text: "完成后再检查答案。" }
    ],
    P46: [
      { target: "#agency", text: "先填写申请对象机关。" },
      { target: "#items", text: "再具体描述你要申请公开的信息。" },
      { target: "#genBtn", text: "最后一键生成申请书，并在预览里检查措辞。" }
    ],
    P48: [
      { target: "#startBtn", text: "先选题组与模式，再开始本轮。" },
      { target: "#flashcard,.flashcard", text: "点击卡片翻面，先回忆，再看答案。" },
      { target: "#knowBtn,#unsureBtn,#unknownBtn", text: "根据掌握程度作答，系统会安排复习。" }
    ]
  };

  const GENERIC_PRIMARY_RE = /(开始|生成|执行|运行|分析|解析|检测|比对|渲染|刷新|检查|启动|播放|计算|提交|创建|应用|预览|继续|查询)/i;
  const GENERIC_EXAMPLE_RE = /(示例|样例|Demo|Example|填入示例|载入示例)/i;
  const GENERIC_EXPORT_RE = /(导出|复制|下载|打印|保存|分享)/i;
  const GENERIC_SECONDARY_EXCLUDE_RE = /(清空|重置|关闭|取消|删除|移除|返回|上一步|折叠)/i;
  const FLOW_STYLE_ID = "onboarding-flow-style";

  function safeGetItem(key) {
    try {
      return localStorage.getItem(key);
    } catch (_e) {
      return null;
    }
  }

  function safeSetItem(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (_e) {}
  }

  function escapeSelector(value) {
    if (window.CSS && typeof window.CSS.escape === "function") {
      return window.CSS.escape(value);
    }
    return String(value).replace(/([ #;?%&,.+*~':"!^$[\]()=>|/@])/g, "\\$1");
  }

  function textOf(el) {
    return String(el?.textContent || el?.value || "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function firstVisible(selectors) {
    const nodes = Array.from(document.querySelectorAll(selectors));
    return (
      nodes.find((el) => {
        const rect = el.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      }) || null
    );
  }

  function detectFileTarget() {
    const inputs = Array.from(document.querySelectorAll("input[type='file']"));
    for (const input of inputs) {
      const inputRect = input.getBoundingClientRect();
      if (inputRect.width > 0 && inputRect.height > 0) return input;

      const associatedLabel = input.id
        ? document.querySelector(`label[for='${escapeSelector(input.id)}']`)
        : input.closest("label");
      if (associatedLabel) {
        const labelRect = associatedLabel.getBoundingClientRect();
        if (labelRect.width > 0 && labelRect.height > 0) return associatedLabel;
      }

      const visualWrap = input.closest(".dropzone, .drop-zone, .file-label, .uploader, .upload-area");
      if (visualWrap) {
        const wrapRect = visualWrap.getBoundingClientRect();
        if (wrapRect.width > 0 && wrapRect.height > 0) return visualWrap;
      }
    }
    return null;
  }

  function selectorForElement(el) {
    if (!el) return "";
    if (el.id) return `#${escapeSelector(el.id)}`;
    if (el.matches("input[type='file']")) return "input[type='file']";
    const safeClass = Array.from(el.classList || []).find((cls) => /^[a-z][\w-]{2,}$/.test(cls));
    if (safeClass) return `${el.tagName.toLowerCase()}.${safeClass}`;
    return el.tagName.toLowerCase();
  }

  function cleanButtonLabel(el) {
    const label = textOf(el).replace(/[^\S\r\n]+/g, " ");
    return label.slice(0, 18) || "主按钮";
  }

  function detectProjectId() {
    const pathParts = location.pathname.split("/").filter(Boolean);
    const projectFolder = pathParts.find((p) => /^P\d/.test(p)) || "";
    return projectFolder.replace(/-.*$/, "");
  }

  function dedupeTips(tips) {
    const seen = new Set();
    return tips.filter((tip) => {
      if (!tip || !tip.target || !tip.text) return false;
      const key = `${tip.target}::${tip.text}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function buildGenericTips() {
    const tips = [];

    const fileInput = detectFileTarget();
    const textInput = firstVisible("textarea, input[type='text'], input[type='search'], input[type='url'], input[type='number'], select");
    const exampleBtn = Array.from(document.querySelectorAll("button,[role='button'],.btn,a"))
      .find((el) => GENERIC_EXAMPLE_RE.test(textOf(el)));
    const primaryBtn = Array.from(document.querySelectorAll("button,[role='button'],.btn,a"))
      .find((el) => {
        const label = textOf(el);
        return label && GENERIC_PRIMARY_RE.test(label) && !GENERIC_SECONDARY_EXCLUDE_RE.test(label) && !GENERIC_EXPORT_RE.test(label);
      });
    const resultArea =
      firstVisible("#output,#result,#results,#preview,#previewFrame,#tableWrap,#chart,#news,#summaryPanel,#canvas,canvas,svg,.output,.result,.results,.preview,.table-wrap,.chart,.cloud-shell,.visualizer,[aria-live='polite'],[role='status'],#status");
    const exportBtn = Array.from(document.querySelectorAll("button,[role='button'],.btn,a,[download]"))
      .find((el) => GENERIC_EXPORT_RE.test(textOf(el)));

    if (fileInput) {
      tips.push({
        target: selectorForElement(fileInput),
        text: "先选择或拖入你要处理的文件。"
      });
    } else if (textInput) {
      tips.push({
        target: selectorForElement(textInput),
        text: "先填写、粘贴或调整这里的输入内容。"
      });
    }

    if (exampleBtn) {
      tips.push({
        target: selectorForElement(exampleBtn),
        text: `不确定怎么开始时，可以先点「${cleanButtonLabel(exampleBtn)}」跑通一遍。`
      });
    }

    if (primaryBtn) {
      tips.push({
        target: selectorForElement(primaryBtn),
        text: `确认输入后，点击「${cleanButtonLabel(primaryBtn)}」开始核心任务。`
      });
    }

    if (resultArea) {
      const isVisualResult = resultArea.matches("canvas,svg,.chart,.cloud-shell,.visualizer,[id*='chart'],[id*='canvas']");
      tips.push({
        target: selectorForElement(resultArea),
        text: isVisualResult
          ? "处理结果会出现在这里；先核对关键词、数值、节点或排序是否真实反映输入，再决定是否导出。"
          : "处理结果会出现在这里；先确认结果，再决定是否继续操作。"
      });
    }

    if (exportBtn) {
      tips.push({
        target: selectorForElement(exportBtn),
        text: `需要带走结果时，再使用「${cleanButtonLabel(exportBtn)}」。`
      });
    }

    return dedupeTips(tips).slice(0, 4);
  }

  function resolveTips(projectId) {
    const specific = dedupeTips(SPECIFIC_TIPS_MAP[projectId] || []);
    return (specific.length ? specific : buildGenericTips()).filter((tip) => document.querySelector(tip.target));
  }

  function ensureStyle() {
    if (document.getElementById(FLOW_STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = FLOW_STYLE_ID;
    style.textContent = `
.flow-guide{margin:16px 0;border:1px solid var(--line,#ddd);border-radius:14px;background:var(--card,#fff);box-shadow:0 6px 18px rgba(0,0,0,.06);overflow:hidden;position:relative;z-index:2}
.flow-guide:not([open]) .flow-guide-body{display:none}
.flow-guide summary{cursor:pointer;list-style:none;padding:14px 18px;font-weight:700;display:flex;align-items:center;justify-content:space-between;gap:12px}
.flow-guide summary::-webkit-details-marker{display:none}
.flow-guide summary span{color:var(--ink-secondary,#6b7280);font-size:.92rem;font-weight:500}
.flow-guide-body{padding:0 18px 16px}
.flow-guide-list{margin:0;padding-left:20px;display:grid;gap:8px;color:var(--ink,#111827);line-height:1.65}
.flow-guide-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:14px}
.flow-guide-btn{border:1px solid var(--line,#ddd);background:var(--card,#fff);color:var(--ink,#111827);padding:8px 12px;border-radius:999px;cursor:pointer;font:inherit}
.flow-guide-btn.primary{background:var(--accent,#c7491f);border-color:var(--accent,#c7491f);color:#fff}
.onboarding-ring{position:fixed;border:2px solid var(--accent,#c7491f);border-radius:10px;z-index:99997;pointer-events:none;animation:onboardingPulse 1.5s ease infinite;box-shadow:0 0 0 9999px rgba(15,23,42,.08)}
.onboarding-tip{position:fixed;z-index:99998;background:var(--card,#fff);border:1px solid var(--line,#ddd);border-radius:12px;padding:12px 14px;box-shadow:0 16px 40px rgba(0,0,0,.2);width:min(320px,calc(100vw - 24px));color:var(--ink,#111827);font:14px/1.55 var(--font-sans,system-ui)}
.onboarding-tip-title{font-weight:700;margin-bottom:6px}
.onboarding-tip-actions{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-top:10px}
.onboarding-tip-actions button{border:none;border-radius:8px;padding:7px 12px;cursor:pointer;font:inherit}
.onboarding-tip-actions .ghost{background:transparent;color:var(--ink-secondary,#6b7280)}
.onboarding-tip-actions .primary{background:var(--accent,#c7491f);color:#fff}
@keyframes onboardingPulse{0%,100%{box-shadow:0 0 0 0 rgba(199,73,31,.22),0 0 0 9999px rgba(15,23,42,.08)}50%{box-shadow:0 0 0 8px rgba(199,73,31,0),0 0 0 9999px rgba(15,23,42,.08)}}
@media (max-width:640px){
  .flow-guide summary{padding:12px 14px;align-items:flex-start;flex-direction:column}
  .flow-guide-body{padding:0 14px 14px}
  .flow-guide-actions{flex-direction:column;align-items:stretch}
  .flow-guide-btn{width:100%;text-align:center}
}
    `.trim();
    document.head.appendChild(style);
  }

  function insertFlowGuide(projectId, tips, startTour, storageKey) {
    if (!tips.length || document.querySelector(".flow-guide")) return;
    const main = document.querySelector("main");
    if (!main) return;

    const details = document.createElement("details");
    details.className = "flow-guide";
    details.open = false;
    details.innerHTML = `
      <summary>
        <strong>建议这样使用</strong>
        <span>先跑通一次，再替换成你的真实内容</span>
      </summary>
      <div class="flow-guide-body">
        <ol class="flow-guide-list">
          ${tips.map((tip) => `<li>${tip.text}</li>`).join("")}
        </ol>
        <div class="flow-guide-actions">
          <button type="button" class="flow-guide-btn primary" data-action="tour">高亮引导</button>
          <button type="button" class="flow-guide-btn" data-action="dismiss">不再自动弹出</button>
        </div>
      </div>
    `.trim();

    details.querySelector("[data-action='tour']").addEventListener("click", (e) => {
      e.stopPropagation();
      startTour(true);
    });
    details.querySelector("[data-action='dismiss']").addEventListener("click", () => {
      safeSetItem(storageKey, "1");
    });

    const anchor = main.querySelector(":scope > header, :scope > .hero, :scope > .card") || main.firstElementChild;
    if (anchor && anchor.nextSibling) {
      anchor.parentNode.insertBefore(details, anchor.nextSibling);
    } else {
      main.prepend(details);
    }
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function createTour(tips, storageKey) {
    let step = 0;
    let keyHandler = null;

    function clearTour() {
      document.querySelectorAll(".onboarding-ring,.onboarding-tip").forEach((el) => el.remove());
      if (keyHandler) {
        document.removeEventListener("keydown", keyHandler);
        keyHandler = null;
      }
    }

    function finish(markDone) {
      clearTour();
      if (markDone) safeSetItem(storageKey, "1");
    }

    function renderCurrent() {
      clearTour();
      if (step >= tips.length) {
        finish(true);
        return;
      }

      const tip = tips[step];
      const target = document.querySelector(tip.target);
      if (!target) {
        step += 1;
        renderCurrent();
        return;
      }

      target.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });

      setTimeout(() => {
        const rect = target.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) {
          step += 1;
          renderCurrent();
          return;
        }

        const ring = document.createElement("div");
        ring.className = "onboarding-ring";
        ring.style.top = `${Math.max(8, rect.top - 6)}px`;
        ring.style.left = `${Math.max(8, rect.left - 6)}px`;
        ring.style.width = `${Math.min(window.innerWidth - rect.left - 8, rect.width + 12)}px`;
        ring.style.height = `${Math.min(window.innerHeight - rect.top - 8, rect.height + 12)}px`;

        const tooltip = document.createElement("div");
        tooltip.className = "onboarding-tip";
        tooltip.innerHTML = `
          <div class="onboarding-tip-title">操作引导 ${step + 1}/${tips.length}</div>
          <div>${tip.text}</div>
          <div class="onboarding-tip-actions">
            <button type="button" class="ghost" data-action="skip">跳过</button>
            <button type="button" class="primary" data-action="next">${step < tips.length - 1 ? "下一步" : "完成"}</button>
          </div>
        `.trim();

        document.body.appendChild(ring);
        document.body.appendChild(tooltip);

        const width = tooltip.offsetWidth;
        const height = tooltip.offsetHeight;
        const topCandidate = rect.bottom + 12;
        const top =
          topCandidate + height <= window.innerHeight - 12
            ? topCandidate
            : Math.max(12, rect.top - height - 12);
        const centerLeft = rect.left + rect.width / 2 - width / 2;
        const left = clamp(centerLeft, 16, window.innerWidth - width - 16);

        tooltip.style.top = `${top}px`;
        tooltip.style.left = `${left}px`;

        tooltip.querySelector("[data-action='skip']").addEventListener("click", () => finish(true));
        tooltip.querySelector("[data-action='next']").addEventListener("click", () => {
          step += 1;
          renderCurrent();
        });

        keyHandler = (event) => {
          if (event.key === "Escape") finish(true);
        };
        document.addEventListener("keydown", keyHandler);
      }, 220);
    }

    return {
      start(force) {
        if (!force && safeGetItem(storageKey)) return;
        step = 0;
        renderCurrent();
      }
    };
  }

  document.addEventListener("DOMContentLoaded", function () {
    const projectId = detectProjectId();
    if (!projectId) return;

    const storageKey = `onboarding_done_${projectId}`;
    const tips = resolveTips(projectId);
    if (!tips.length) return;

    ensureStyle();

    const tour = createTour(tips, storageKey);
    insertFlowGuide(projectId, tips, (force) => tour.start(force), storageKey);

    if (!safeGetItem(storageKey)) {
      // Don't auto-start tour; user can click "高亮引导" to start
    }
  });
})();
