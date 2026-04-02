/**
 * 🧭 全局导航栏 (Global Nav)
 * 自包含组件：为每个工具添加顶部导航 + 底部"探索更多"推荐
 * 解决"工具孤岛"问题，提升产品整体感
 */
(function () {
  "use strict";

  const isLocalPreview = /^(localhost|127\.0\.0\.1)$/i.test(location.hostname);
  const SITE = isLocalPreview ? `${location.origin}/projects` : "https://yuuqq.github.io";

  /* ── 样式注入 ── */
  const STYLE = document.createElement("style");
  STYLE.textContent = `
.gnav{position:sticky;top:0;z-index:900;background:var(--card,#fff);border-bottom:1px solid var(--line,#e0d6cf);padding:6px 16px;display:flex;align-items:center;justify-content:space-between;font-size:.78rem;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);opacity:.97}
.gnav-left{display:flex;align-items:center;gap:10px}
.gnav-home{text-decoration:none;color:var(--accent,#c7491f);font-weight:700;display:flex;align-items:center;gap:4px;padding:4px 10px;border-radius:6px;transition:background .15s}
.gnav-home:hover{background:rgba(199,73,31,.08)}
.gnav-crumb{color:var(--ink-secondary,#6b5e50);font-size:.75rem}
.gnav-right{display:flex;gap:6px}
.gnav-btn{background:none;border:1px solid var(--line,#e0d6cf);border-radius:6px;padding:4px 10px;font-size:.72rem;cursor:pointer;color:var(--ink-secondary,#6b5e50);transition:all .15s;text-decoration:none}
.gnav-btn:hover{border-color:var(--accent,#c7491f);color:var(--accent,#c7491f)}
.explore-section{margin:32px auto;max-width:800px;padding:0 16px}
.explore-section h3{font-size:.9rem;color:var(--ink-secondary,#6b5e50);margin:0 0 12px;font-weight:600}
.explore-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:8px}
.explore-card{padding:10px 14px;border-radius:var(--radius-sm,6px);border:1px solid var(--line,#e0d6cf);text-decoration:none;color:var(--ink,#2c2418);font-size:.82rem;transition:all .15s;display:flex;align-items:center;gap:8px}
.explore-card:hover{border-color:var(--accent,#c7491f);transform:translateY(-1px);box-shadow:0 2px 8px rgba(0,0,0,.08)}
.explore-emoji{font-size:1.1rem}
.explore-name{font-weight:600;font-size:.8rem}
.explore-desc{font-size:.7rem;color:var(--ink-secondary,#6b5e50)}
  `;
  document.head.appendChild(STYLE);

  /* ── 工具 ID 检测 ── */
  const url = location.pathname + location.hostname;
  const match = url.match(/P(\d{2})/i);
  if (!match) return;
  const num = parseInt(match[1]);
  const pid = "P" + match[1];

  /* ── 工具元数据 ── */
  const TOOLS = {
    P01:{n:"多模型对比",e:"🔀",c:"AI"},P02:{n:"情感分析",e:"💬",c:"AI"},P03:{n:"语音转文字",e:"🎙️",c:"AI"},
    P04:{n:"术语粉碎机",e:"🔨",c:"AI"},P05:{n:"可读性检测",e:"📊",c:"AI"},P06:{n:"提示词构建",e:"🛠️",c:"AI"},
    P07:{n:"微信排版",e:"📱",c:"AI"},P08:{n:"幻觉错题本",e:"🧠",c:"思维"},P09:{n:"SSML编辑",e:"🔊",c:"AI"},
    P10:{n:"AIGC检测",e:"🤖",c:"AI"},P11:{n:"CSV清洗",e:"🧹",c:"数据"},P12:{n:"本福特检测",e:"📈",c:"数据"},
    P13:{n:"桑基图",e:"🌊",c:"数据"},P14:{n:"新闻时间轴",e:"⏱️",c:"数据"},P15:{n:"故事地图",e:"🗺️",c:"数据"},
    P16:{n:"预算树图",e:"🌳",c:"数据"},P17:{n:"前后对比",e:"↔️",c:"数据"},P18:{n:"竞速柱图",e:"🏎️",c:"数据"},
    P19:{n:"调色板测试",e:"🎨",c:"思维"},P20:{n:"词云",e:"☁️",c:"数据"},P21:{n:"EXIF检测",e:"📷",c:"OSINT"},
    P22:{n:"阴影验证",e:"☀️",c:"OSINT"},P23:{n:"Dork构建",e:"🔍",c:"OSINT"},P24:{n:"反向搜图",e:"🖼️",c:"OSINT"},
    P25:{n:"时光机",e:"⏲️",c:"OSINT"},P26:{n:"水军雷达",e:"📡",c:"OSINT"},P27:{n:"隐私高亮",e:"🔒",c:"伦理"},
    P28:{n:"Deepfake放大",e:"🔬",c:"OSINT"},P29:{n:"谬误连连看",e:"🃏",c:"思维"},P30:{n:"交叉核验",e:"✅",c:"OSINT"},
    P31:{n:"伦理分叉",e:"⚖️",c:"伦理"},P32:{n:"滚动叙事",e:"📜",c:"伦理"},P33:{n:"主编划重点",e:"👆",c:"思维"},
    P34:{n:"聊天报告",e:"💬",c:"AI"},P35:{n:"信息茧房",e:"🫧",c:"思维"},P36:{n:"视障模式",e:"👁️",c:"思维"},
    P37:{n:"沉默螺旋",e:"🌀",c:"思维"},P38:{n:"VR新闻",e:"🥽",c:"伦理"},P39:{n:"打字防御",e:"⌨️",c:"思维"},
    P40:{n:"S曲线",e:"📉",c:"数据"},P41:{n:"Agent门户",e:"🤖",c:"AI"},P42:{n:"作品集",e:"💼",c:"伦理"},
    P43:{n:"播客页面",e:"🎧",c:"伦理"},P44:{n:"翻页杂志",e:"📖",c:"伦理"},P45:{n:"简报引擎",e:"📧",c:"伦理"},
    P46:{n:"FOIA生成",e:"📋",c:"伦理"},P47:{n:"漏斗计算",e:"🔻",c:"数据"},P48:{n:"闪卡训练",e:"🗂️",c:"思维"},
    P49:{n:"RSS报纸",e:"📰",c:"伦理"},P50:{n:"OSINT书签",e:"🔖",c:"OSINT"}
  };

  const SLUGS = {
    P01:"model-compare",P02:"offline-sentiment",P03:"webspeech-transcriber",P04:"jargon-crusher",
    P05:"flesch-meter",P06:"prompt-builder",P07:"md-wechat-layout",P08:"hallucination-quiz",
    P09:"ssml-editor",P10:"aigc-detector",P11:"csv-cleaner",P12:"benford-checker",
    P13:"sankey-board",P14:"news-timeline",P15:"story-map",P16:"budget-treemap",
    P17:"before-after-slider",P18:"bar-race",P19:"a11y-palette-tester",P20:"wordcloud-sentiment",
    P21:"exif-inspector",P22:"shadow-geo-validator",P23:"dork-builder",P24:"reverse-search-hub",
    P25:"wayback-launcher",P26:"bot-radar",P27:"privacy-clause-highlighter",P28:"deepfake-magnifier",
    P29:"fallacy-match",P30:"source-cross-check-launcher",P31:"ethics-avg",P32:"scroll-story-kit",
    P33:"editor-swipe",P34:"chat-ui-report",P35:"echo-chamber-maze",P36:"a11y-blind-mode",
    P37:"spiral-silence-bbs",P38:"vr-news-viewer",P39:"typing-defense",P40:"s-curve-simulator",
    P41:"agent-portal",P42:"portfolio",P43:"podcast-page",P44:"zine-flipbook",
    P45:"newsletter-engine",P46:"foia-generator",P47:"funnel-calculator",P48:"flashcard-trainer",
    P49:"rss-paper",P50:"osint-bookmarks"
  };

  const cur = TOOLS[pid];
  if (!cur) return;

  /* ── 导航栏 ── */
  const prevNum = num > 1 ? String(num - 1).padStart(2, "0") : null;
  const nextNum = num < 50 ? String(num + 1).padStart(2, "0") : null;
  const prevPid = prevNum ? "P" + prevNum : null;
  const nextPid = nextNum ? "P" + nextNum : null;

  const nav = document.createElement("nav");
  nav.className = "gnav";
  nav.innerHTML = `
    <div class="gnav-left">
      <a href="${SITE}/P00-dashboard/" class="gnav-home">🎓 学习中枢</a>
      <span class="gnav-crumb">/ ${cur.e} ${pid} ${cur.n}</span>
    </div>
    <div class="gnav-right">
      ${prevPid && TOOLS[prevPid] ? `<a href="${SITE}/${prevPid}-${SLUGS[prevPid]}/" class="gnav-btn">← ${TOOLS[prevPid].e} ${prevPid}</a>` : ""}
      ${nextPid && TOOLS[nextPid] ? `<a href="${SITE}/${nextPid}-${SLUGS[nextPid]}/" class="gnav-btn">${TOOLS[nextPid].e} ${nextPid} →</a>` : ""}
    </div>
  `;
  document.body.prepend(nav);

  /* ── 底部推荐 ── */
  const sameCat = Object.entries(TOOLS)
    .filter(([k, v]) => v.c === cur.c && k !== pid)
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  if (sameCat.length > 0) {
    const section = document.createElement("div");
    section.className = "explore-section";
    section.innerHTML = `
      <h3>🧭 同类工具推荐（${cur.c}）</h3>
      <div class="explore-grid">
        ${sameCat.map(([k, v]) => `
          <a href="${SITE}/${k}-${SLUGS[k]}/" class="explore-card">
            <span class="explore-emoji">${v.e}</span>
            <div><div class="explore-name">${k} ${v.n}</div></div>
          </a>
        `).join("")}
      </div>
    `;
    const footer = document.querySelector("footer, .footer");
    if (footer) { footer.parentNode.insertBefore(section, footer); }
    else { document.body.appendChild(section); }
  }
})();
