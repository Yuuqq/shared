/**
 * 🔍 Ctrl+K 全局命令面板 (Command Palette)
 * 引入方式: <script src="../shared/cmd-palette.js" defer></script>
 *
 * 功能：
 * 1. 按 Ctrl+K / Cmd+K 呼出搜索面板
 * 2. 模糊搜索 50 个工具项目名称
 * 3. 支持项目编号、中文名与 slug 搜索
 * 4. 展示最近访问工具与当前页面标记
 * 5. 回车或点击跳转到目标工具
 * 4. ESC 关闭
 */
(function () {
  const RECENT_STORAGE_KEY = "journalism_toolbox_recent_tools";
  const isLocalPreview = /^(localhost|127\.0\.0\.1)$/i.test(location.hostname);
  const toolBase = isLocalPreview ? `${location.origin}/projects` : "https://yuuqq.github.io";
  const TOOLS = [
    { id: "P01", name: "多模型口径对比器", url: "https://yuuqq.github.io/P01-model-compare/" },
    { id: "P02", name: "离线情感分析", url: "https://yuuqq.github.io/P02-offline-sentiment/" },
    { id: "P03", name: "语音转文字", url: "https://yuuqq.github.io/P03-webspeech-transcriber/" },
    { id: "P04", name: "术语粉碎机", url: "https://yuuqq.github.io/P04-jargon-crusher/" },
    { id: "P05", name: "可读性检测", url: "https://yuuqq.github.io/P05-flesch-meter/" },
    { id: "P06", name: "提示词构建器", url: "https://yuuqq.github.io/P06-prompt-builder/" },
    { id: "P07", name: "Markdown 微信排版", url: "https://yuuqq.github.io/P07-md-wechat-layout/" },
    { id: "P08", name: "幻觉错题本", url: "https://yuuqq.github.io/P08-hallucination-quiz/" },
    { id: "P09", name: "SSML 语音编辑器", url: "https://yuuqq.github.io/P09-ssml-editor/" },
    { id: "P10", name: "AIGC 检测器", url: "https://yuuqq.github.io/P10-aigc-detector/" },
    { id: "P11", name: "CSV 清洗器", url: "https://yuuqq.github.io/P11-csv-cleaner/" },
    { id: "P12", name: "本福特定律检验", url: "https://yuuqq.github.io/P12-benford-checker/" },
    { id: "P13", name: "桑基图看板", url: "https://yuuqq.github.io/P13-sankey-board/" },
    { id: "P14", name: "新闻时间轴", url: "https://yuuqq.github.io/P14-news-timeline/" },
    { id: "P15", name: "故事地图", url: "https://yuuqq.github.io/P15-story-map/" },
    { id: "P16", name: "预算树图", url: "https://yuuqq.github.io/P16-budget-treemap/" },
    { id: "P17", name: "前后对比滑块", url: "https://yuuqq.github.io/P17-before-after-slider/" },
    { id: "P18", name: "动态柱状竞速图", url: "https://yuuqq.github.io/P18-bar-race/" },
    { id: "P19", name: "无障碍调色板", url: "https://yuuqq.github.io/P19-a11y-palette-tester/" },
    { id: "P20", name: "词云情感分析", url: "https://yuuqq.github.io/P20-wordcloud-sentiment/" },
    { id: "P21", name: "EXIF 元数据扒皮机", url: "https://yuuqq.github.io/P21-exif-inspector/" },
    { id: "P22", name: "阴影方位验证", url: "https://yuuqq.github.io/P22-shadow-geo-validator/" },
    { id: "P23", name: "Google Dork 生成器", url: "https://yuuqq.github.io/P23-dork-builder/" },
    { id: "P24", name: "反向搜图集线器", url: "https://yuuqq.github.io/P24-reverse-search-hub/" },
    { id: "P25", name: "网页时光机", url: "https://yuuqq.github.io/P25-wayback-launcher/" },
    { id: "P26", name: "水军雷达", url: "https://yuuqq.github.io/P26-bot-radar/" },
    { id: "P27", name: "隐私条款高亮器", url: "https://yuuqq.github.io/P27-privacy-clause-highlighter/" },
    { id: "P28", name: "Deepfake 放大镜", url: "https://yuuqq.github.io/P28-deepfake-magnifier/" },
    { id: "P29", name: "逻辑谬误连线", url: "https://yuuqq.github.io/P29-fallacy-match/" },
    { id: "P30", name: "多源交叉验证", url: "https://yuuqq.github.io/P30-source-cross-check-launcher/" },
    { id: "P31", name: "编辑室伦理分叉", url: "https://yuuqq.github.io/P31-ethics-avg/" },
    { id: "P32", name: "滚动叙事工具包", url: "https://yuuqq.github.io/P32-scroll-story-kit/" },
    { id: "P33", name: "主编左右划", url: "https://yuuqq.github.io/P33-editor-swipe/" },
    { id: "P34", name: "聊天式报告", url: "https://yuuqq.github.io/P34-chat-ui-report/" },
    { id: "P35", name: "信息茧房迷宫", url: "https://yuuqq.github.io/P35-echo-chamber-maze/" },
    { id: "P36", name: "视障模式体验", url: "https://yuuqq.github.io/P36-a11y-blind-mode/" },
    { id: "P37", name: "沉默螺旋论坛", url: "https://yuuqq.github.io/P37-spiral-silence-bbs/" },
    { id: "P38", name: "VR 新闻阅读器", url: "https://yuuqq.github.io/P38-vr-news-viewer/" },
    { id: "P39", name: "打字防御战", url: "https://yuuqq.github.io/P39-typing-defense/" },
    { id: "P40", name: "S 曲线模拟器", url: "https://yuuqq.github.io/P40-s-curve-simulator/" },
    { id: "P41", name: "Agent 管理门户", url: "https://yuuqq.github.io/P41-agent-portal/" },
    { id: "P42", name: "记者作品集", url: "https://yuuqq.github.io/P42-portfolio/" },
    { id: "P43", name: "播客页面", url: "https://yuuqq.github.io/P43-podcast-page/" },
    { id: "P44", name: "数字杂志翻页器", url: "https://yuuqq.github.io/P44-zine-flipbook/" },
    { id: "P45", name: "新闻简报引擎", url: "https://yuuqq.github.io/P45-newsletter-engine/" },
    { id: "P46", name: "信息公开申请生成器", url: "https://yuuqq.github.io/P46-foia-generator/" },
    { id: "P47", name: "漏斗计算器", url: "https://yuuqq.github.io/P47-funnel-calculator/" },
    { id: "P48", name: "闪卡训练器", url: "https://yuuqq.github.io/P48-flashcard-trainer/" },
    { id: "P49", name: "RSS 报纸生成", url: "https://yuuqq.github.io/P49-rss-paper/" },
    { id: "P50", name: "OSINT 书签管理", url: "https://yuuqq.github.io/P50-osint-bookmarks/" }
  ];

  TOOLS.forEach((tool) => {
    tool.url = tool.url.replace("https://yuuqq.github.io", toolBase);
    tool.slug = tool.url.replace(/\/+$/, "").split("/").pop() || tool.id;
    tool.searchText = `${tool.id} ${tool.name} ${tool.slug}`.toLowerCase();
  });

  function safeGetRecentIds() {
    try {
      const raw = localStorage.getItem(RECENT_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed.filter((id) => typeof id === "string") : [];
    } catch (_e) {
      return [];
    }
  }

  function safeSetRecentIds(ids) {
    try {
      localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(ids.slice(0, 6)));
    } catch (_e) {}
  }

  function currentToolId() {
    const match = location.pathname.match(/(P\d{2})-/);
    return match ? match[1] : "";
  }

  function rememberCurrentTool() {
    const currentId = currentToolId();
    if (!currentId) return;
    const ids = [currentId, ...safeGetRecentIds().filter((id) => id !== currentId)];
    safeSetRecentIds(ids);
  }

  function normalize(text) {
    return String(text || "")
      .toLowerCase()
      .replace(/[_/]+/g, " ")
      .replace(/-/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function fuzzyMatch(query, text) {
    const q = normalize(query);
    const t = normalize(text);
    if (t.includes(q)) return true;
    let qi = 0;
    for (let ti = 0; ti < t.length && qi < q.length; ti++) {
      if (t[ti] === q[qi]) qi++;
    }
    return qi === q.length;
  }

  function scoreTool(query, tool, currentId, recentIds) {
    const q = normalize(query);
    const target = normalize(tool.searchText);
    if (!q) {
      let score = 0;
      if (tool.id === currentId) score += 300;
      const recentIndex = recentIds.indexOf(tool.id);
      if (recentIndex >= 0) score += 200 - recentIndex * 10;
      return score;
    }

    let score = -1;
    if (tool.id.toLowerCase() === q) score = 500;
    else if (normalize(tool.slug) === q) score = 450;
    else if (target.startsWith(q)) score = 320;
    else if (target.includes(q)) score = 250;
    else if (fuzzyMatch(q, target)) score = 160;

    if (score < 0) return -1;
    if (tool.id === currentId) score += 20;
    const recentIndex = recentIds.indexOf(tool.id);
    if (recentIndex >= 0) score += Math.max(0, 18 - recentIndex * 3);
    return score;
  }

  function buildFilteredTools(query) {
    const currentId = currentToolId();
    const recentIds = safeGetRecentIds();
    return TOOLS
      .map((tool) => ({ tool, score: scoreTool(query, tool, currentId, recentIds) }))
      .filter((entry) => entry.score >= 0)
      .sort((a, b) => b.score - a.score || a.tool.id.localeCompare(b.tool.id))
      .map((entry) => entry.tool);
  }

  function navigateToTool(tool, newTab) {
    if (!tool) return;
    if (newTab) {
      window.open(tool.url, "_blank", "noopener");
      return;
    }
    location.href = tool.url;
  }

  function createPalette() {
    const overlay = document.createElement("div");
    overlay.id = "cmdPaletteOverlay";
    overlay.style.cssText = "position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,0.5);backdrop-filter:blur(4px);display:none;align-items:flex-start;justify-content:center;padding-top:15vh;font-family:var(--font-sans,system-ui)";

    const box = document.createElement("div");
    box.style.cssText = "background:var(--card,#fff);border-radius:12px;box-shadow:0 16px 48px rgba(0,0,0,0.3);width:min(520px,90vw);max-height:60vh;overflow:hidden;display:flex;flex-direction:column";

    const header = document.createElement("div");
    header.style.cssText = "padding:12px 16px;border-bottom:1px solid var(--line,#e0e0e0);display:flex;align-items:center;gap:8px";
    header.innerHTML = '<span style="opacity:0.5;font-size:14px">🔍</span>';
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "搜索工具…  (输入名称或编号)";
    input.style.cssText = "flex:1;border:none;outline:none;font-size:15px;background:transparent;color:var(--ink,#1a1a1a);font-family:inherit";
    header.appendChild(input);
    const badge = document.createElement("kbd");
    badge.textContent = "ESC";
    badge.style.cssText = "font-size:11px;padding:2px 6px;border-radius:4px;background:var(--line,#e0e0e0);color:var(--ink-secondary,#666)";
    header.appendChild(badge);

    const list = document.createElement("div");
    list.style.cssText = "overflow-y:auto;max-height:45vh";

    const footer = document.createElement("div");
    footer.style.cssText = "padding:10px 14px;border-top:1px solid var(--line,#e0e0e0);font-size:12px;color:var(--ink-secondary,#666);display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap";
    footer.innerHTML = '<span>Enter 打开</span><span>Ctrl/Cmd+Enter 新标签</span><span>支持编号 / 中文 / slug 搜索</span>';

    box.appendChild(header);
    box.appendChild(list);
    box.appendChild(footer);
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    let selectedIdx = 0;
    let filtered = buildFilteredTools("");

    function render() {
      const currentId = currentToolId();
      if (!filtered.length) {
        list.innerHTML = '<div style="padding:18px 16px;color:var(--ink-secondary,#666);font-size:13px;">没有找到匹配工具。</div>';
        return;
      }

      list.innerHTML = filtered
        .map((t, i) => {
          const isCurrent = t.id === currentId;
          const badge = isCurrent
            ? '<span style="margin-left:auto;font-size:11px;padding:2px 6px;border-radius:999px;background:var(--accent-light,rgba(199,73,31,0.08));color:var(--accent,#c7491f);font-weight:600;">当前</span>'
            : "";
          return `<a href="${t.url}" style="display:flex;align-items:flex-start;gap:10px;padding:10px 16px;text-decoration:none;color:var(--ink,#1a1a1a);${i === selectedIdx ? "background:var(--accent-light,rgba(199,73,31,0.08))" : ""};transition:background .1s" data-idx="${i}">
            <span style="font-size:12px;color:var(--accent,#c7491f);font-weight:600;min-width:32px;padding-top:2px;">${t.id}</span>
            <span style="display:flex;flex-direction:column;gap:2px;min-width:0;">
              <span style="font-size:14px;line-height:1.35;">${t.name}</span>
              <span style="font-size:12px;color:var(--ink-secondary,#666);line-height:1.2;">${t.slug}</span>
            </span>
            ${badge}
          </a>`;
        })
        .join("");
    }

    function open() {
      overlay.style.display = "flex";
      input.value = "";
      filtered = buildFilteredTools("");
      selectedIdx = 0;
      render();
      setTimeout(() => input.focus(), 50);
    }

    function close() {
      overlay.style.display = "none";
    }

    input.addEventListener("input", () => {
      const q = input.value.trim();
      filtered = buildFilteredTools(q);
      selectedIdx = 0;
      render();
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); selectedIdx = Math.min(selectedIdx + 1, filtered.length - 1); render(); }
      if (e.key === "ArrowUp") { e.preventDefault(); selectedIdx = Math.max(selectedIdx - 1, 0); render(); }
      if (e.key === "Enter" && filtered[selectedIdx]) {
        e.preventDefault();
        navigateToTool(filtered[selectedIdx], e.ctrlKey || e.metaKey);
        close();
      }
      if (e.key === "Escape") close();
    });

    list.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      e.preventDefault();
      const idx = Number(a.dataset.idx);
      navigateToTool(filtered[idx], e.ctrlKey || e.metaKey);
      close();
    });

    list.addEventListener("mousemove", (e) => {
      const a = e.target.closest("a[data-idx]");
      if (!a) return;
      const idx = Number(a.dataset.idx);
      if (!Number.isNaN(idx) && idx !== selectedIdx) {
        selectedIdx = idx;
        render();
      }
    });

    overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });

    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        overlay.style.display === "none" ? open() : close();
      }
    });
  }

  rememberCurrentTool();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createPalette);
  } else {
    createPalette();
  }
})();
