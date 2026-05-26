/**
 * shared/global-nav.js — 51 工具跨页快速跳转浮窗
 * 用法：在任意工具的 index.html 末尾加 <script src="../shared/global-nav.js" defer></script>
 *
 * 功能：
 * - 右下角浮动 ⌘K 按钮（屏幕缩略图标）
 * - ⌘K / Ctrl+K 唤起搜索式跳转面板
 * - 中文/拼音/编号模糊匹配
 * - ↑↓ 键盘导航，Enter 跳转，Esc 关闭
 * - localStorage 记住最近使用的 5 个，置顶展示
 * - 完全本地化、零依赖、不阻塞页面渲染
 * - 自动跳过暗色/亮色模式（继承当前页主题）
 */

(function () {
    if (window.__globalNavInited) return;
    window.__globalNavInited = true;

    /* ---------- 工具清单（51 个）---------- */
    const TOOLS = [
        { id: "P00", slug: "P00-dashboard", title: "🏠 工具集导航", desc: "总入口", category: "AI 教学" },
        { id: "P01", slug: "P01-model-compare", title: "模型对比器", desc: "并排对比 LLM 输出", category: "AI 教学" },
        { id: "P02", slug: "P02-offline-sentiment", title: "离线情感分析仪", desc: "纯前端中文情感", category: "AI 教学" },
        { id: "P03", slug: "P03-webspeech-transcriber", title: "WebSpeech 转录器", desc: "浏览器语音转文字", category: "AI 教学" },
        { id: "P04", slug: "P04-jargon-crusher", title: "黑话粉碎机", desc: "替换学术名词", category: "AI 教学" },
        { id: "P05", slug: "P05-flesch-meter", title: "可读性测量仪", desc: "Flesch 中文易读度", category: "AI 教学" },
        { id: "P06", slug: "P06-prompt-builder", title: "提示词构建器", desc: "结构化 Prompt 拼装", category: "AI 教学" },
        { id: "P07", slug: "P07-md-wechat-layout", title: "Markdown 微信排版", desc: "MD → 公众号 HTML", category: "AI 教学" },
        { id: "P08", slug: "P08-hallucination-quiz", title: "幻觉测试题", desc: "AI 幻觉识别训练", category: "AI 教学" },
        { id: "P09", slug: "P09-ssml-editor", title: "SSML 编辑器", desc: "语音合成标记可视化", category: "AI 教学" },
        { id: "P10", slug: "P10-aigc-detector", title: "AIGC 解构器", desc: "困惑度+突发性检测", category: "AI 教学" },
        { id: "P11", slug: "P11-csv-cleaner", title: "CSV 清洗工具", desc: "去重/筛选/导出", category: "数据新闻" },
        { id: "P12", slug: "P12-benford-checker", title: "本福德定律检验器", desc: "数据真伪检验", category: "数据新闻" },
        { id: "P13", slug: "P13-sankey-board", title: "桑基图编辑板", desc: "流向可视化", category: "数据新闻" },
        { id: "P14", slug: "P14-news-timeline", title: "新闻时间线", desc: "事件序列可视化", category: "数据新闻" },
        { id: "P15", slug: "P15-story-map", title: "故事地图", desc: "Leaflet 地图叙事", category: "数据新闻" },
        { id: "P16", slug: "P16-budget-treemap", title: "预算树图", desc: "层级支出可视化", category: "数据新闻" },
        { id: "P17", slug: "P17-before-after-slider", title: "前后对比滑块", desc: "图片对比", category: "数据新闻" },
        { id: "P18", slug: "P18-bar-race", title: "条形图竞速", desc: "动态排名动画", category: "数据新闻" },
        { id: "P19", slug: "P19-a11y-palette-tester", title: "色彩可达性测试", desc: "WCAG 对比度", category: "数据新闻" },
        { id: "P20", slug: "P20-wordcloud-sentiment", title: "情感词云", desc: "中文分词云图", category: "数据新闻" },
        { id: "P21", slug: "P21-exif-inspector", title: "EXIF 元数据查看", desc: "照片信息提取", category: "OSINT" },
        { id: "P22", slug: "P22-shadow-geo-validator", title: "阴影地理校验", desc: "太阳位置反推", category: "OSINT" },
        { id: "P23", slug: "P23-dork-builder", title: "搜索语法构造器", desc: "Google Dorks", category: "OSINT" },
        { id: "P24", slug: "P24-reverse-search-hub", title: "以图搜图集合站", desc: "多引擎跳转", category: "OSINT" },
        { id: "P25", slug: "P25-wayback-launcher", title: "Wayback 启动器", desc: "归档版本查询", category: "OSINT" },
        { id: "P26", slug: "P26-bot-radar", title: "水军雷达", desc: "账号行为模式", category: "OSINT" },
        { id: "P27", slug: "P27-privacy-clause-highlighter", title: "隐私条款高亮", desc: "用户协议关键句", category: "OSINT" },
        { id: "P28", slug: "P28-deepfake-magnifier", title: "深度伪造放大镜", desc: "图像细节核查", category: "OSINT" },
        { id: "P29", slug: "P29-fallacy-match", title: "逻辑谬误连连看", desc: "媒介素养游戏", category: "媒介素养" },
        { id: "P30", slug: "P30-source-cross-check-launcher", title: "信源交叉检验启动器", desc: "多源对照", category: "OSINT" },
        { id: "P31", slug: "P31-ethics-avg", title: "伦理平均值", desc: "新闻伦理评估", category: "媒介素养" },
        { id: "P32", slug: "P32-scroll-story-kit", title: "滚动叙事工具包", desc: "Scrollytelling", category: "数据新闻" },
        { id: "P33", slug: "P33-editor-swipe", title: "编辑滑卡", desc: "Tinder 式选题", category: "媒介素养" },
        { id: "P34", slug: "P34-chat-ui-report", title: "聊天 UI 截图器", desc: "微信对话生成", category: "工具" },
        { id: "P35", slug: "P35-echo-chamber-maze", title: "回音壁迷宫", desc: "信息茧房模拟", category: "媒介素养" },
        { id: "P36", slug: "P36-a11y-blind-mode", title: "无障碍盲模式", desc: "失明视角模拟", category: "媒介素养" },
        { id: "P37", slug: "P37-spiral-silence-bbs", title: "沉默的螺旋 BBS", desc: "舆论模拟器", category: "媒介素养" },
        { id: "P38", slug: "P38-vr-news-viewer", title: "VR 新闻观察器", desc: "A-Frame 360° 新闻", category: "前沿" },
        { id: "P39", slug: "P39-typing-defense", title: "打字防御战", desc: "新传术语打字游戏", category: "媒介素养" },
        { id: "P40", slug: "P40-s-curve-simulator", title: "S 曲线模拟器", desc: "扩散模型可视化", category: "数据新闻" },
        { id: "P41", slug: "P41-agent-portal", title: "代理门户", desc: "Agent 工具集成", category: "AI 教学" },
        { id: "P42", slug: "P42-portfolio", title: "个人作品集", desc: "新传学子主页", category: "工具" },
        { id: "P43", slug: "P43-podcast-page", title: "播客单集页", desc: "音频文章模板", category: "工具" },
        { id: "P44", slug: "P44-zine-flipbook", title: "电子小册翻页", desc: "Zine 模板", category: "工具" },
        { id: "P45", slug: "P45-newsletter-engine", title: "Newsletter 引擎", desc: "邮件订阅排版", category: "工具" },
        { id: "P46", slug: "P46-foia-generator", title: "信息公开申请书", desc: "FOIA 模板生成", category: "工具" },
        { id: "P47", slug: "P47-funnel-calculator", title: "转化率漏斗计算器", desc: "自媒体投放分析", category: "工具" },
        { id: "P48", slug: "P48-flashcard-trainer", title: "新传刷题闪卡", desc: "考研知识卡", category: "工具" },
        { id: "P49", slug: "P49-rss-paper", title: "RSS 聚合报纸", desc: "feed 阅读器", category: "工具" },
        { id: "P50", slug: "P50-osint-bookmarks", title: "OSINT 导航站", desc: "公开情报收藏", category: "OSINT" }
    ];

    const RECENT_KEY = "globalNav.recent";
    const MAX_RECENT = 5;

    /* ---------- DOM 构造 ---------- */
    const styleEl = document.createElement("style");
    styleEl.textContent = `
        .gnav-fab {
            /* iOS safe-area: home indicator + landscape notch insets */
            position: fixed;
            right: calc(16px + env(safe-area-inset-right, 0px));
            bottom: calc(16px + env(safe-area-inset-bottom, 0px));
            z-index: 9998;
            width: 44px; height: 44px; border-radius: 50%; border: none;
            background: var(--accent, #c7491f); color: #fff; cursor: pointer;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            display: flex; align-items: center; justify-content: center;
            font-size: 18px; transition: transform .2s, box-shadow .2s;
        }
        .gnav-fab:hover { transform: scale(1.08); box-shadow: 0 6px 18px rgba(0,0,0,0.28); }
        .gnav-fab:focus-visible { outline: 3px solid var(--accent, #c7491f); outline-offset: 3px; }
        .gnav-overlay {
            position: fixed; inset: 0; z-index: 9999;
            background: rgba(0,0,0,0.45); backdrop-filter: blur(4px);
            display: none; align-items: flex-start; justify-content: center;
            padding: 80px 16px 16px; animation: gnavFade .15s ease-out;
        }
        .gnav-overlay.open { display: flex; }
        @keyframes gnavFade { from { opacity: 0 } to { opacity: 1 } }
        .gnav-panel {
            width: 100%; max-width: 560px; max-height: 70vh;
            background: var(--card, #fff); color: var(--ink, #1a1a1a);
            border-radius: 14px; box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            display: flex; flex-direction: column; overflow: hidden;
            animation: gnavSlide .2s ease-out;
        }
        @keyframes gnavSlide { from { transform: translateY(-12px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
        .gnav-search {
            border: none; outline: none; padding: 16px 20px; font-size: 16px;
            background: transparent; color: inherit; border-bottom: 1px solid var(--line, #ddd);
            font-family: inherit;
        }
        .gnav-list { flex: 1; overflow-y: auto; padding: 4px; }
        .gnav-item {
            display: flex; align-items: center; gap: 12px;
            padding: 10px 14px; border-radius: 8px; cursor: pointer;
            font-size: 14px; line-height: 1.4;
        }
        .gnav-item.active, .gnav-item:hover {
            background: var(--accent-light, rgba(199,73,31,0.08));
        }
        .gnav-id {
            display: inline-block; min-width: 36px; font-family: var(--font-mono, monospace);
            font-size: 11px; padding: 2px 6px; border-radius: 4px;
            background: var(--line, #eee); color: var(--ink-secondary, #666);
            text-align: center;
        }
        .gnav-meta { flex: 1; min-width: 0; }
        .gnav-title { font-weight: 600; }
        .gnav-desc { font-size: 12px; color: var(--ink-secondary, #888); }
        .gnav-cat {
            font-size: 11px; padding: 2px 8px; border-radius: 999px;
            background: var(--accent-light, rgba(199,73,31,0.08));
            color: var(--accent, #c7491f); white-space: nowrap;
        }
        .gnav-section {
            padding: 6px 14px; font-size: 11px; font-weight: 600;
            color: var(--ink-secondary, #888); text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        .gnav-empty { padding: 24px; text-align: center; color: var(--ink-secondary, #888); }
        .gnav-footer {
            padding: 8px 14px; font-size: 11px; color: var(--ink-secondary, #888);
            border-top: 1px solid var(--line, #ddd); display: flex; gap: 14px; justify-content: center;
        }
        .gnav-kbd {
            display: inline-block; padding: 1px 6px; border-radius: 3px;
            background: var(--line, #eee); font-family: var(--font-mono, monospace); font-size: 10px;
        }
        @media (max-width: 600px) {
            .gnav-fab { right: calc(12px + env(safe-area-inset-right, 0px)); bottom: calc(12px + env(safe-area-inset-bottom, 0px)); }
            .gnav-overlay { padding-top: 40px; }
        }
        @media print { .gnav-fab, .gnav-overlay { display: none !important; } }
    `;
    document.head.appendChild(styleEl);

    const fab = document.createElement("button");
    fab.className = "gnav-fab";
    fab.setAttribute("aria-label", "打开 51 工具快速导航 (⌘K)");
    fab.innerHTML = "⌘K";
    fab.title = "工具导航 (⌘K / Ctrl+K)";
    document.body.appendChild(fab);

    const overlay = document.createElement("div");
    overlay.className = "gnav-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "工具快速导航");
    overlay.innerHTML = `
        <div class="gnav-panel">
            <input type="text" class="gnav-search" placeholder="搜索工具：编号、名称、描述、拼音首字母…" aria-label="搜索" />
            <div class="gnav-list" role="listbox"></div>
            <div class="gnav-footer">
                <span><span class="gnav-kbd">↑↓</span> 选择</span>
                <span><span class="gnav-kbd">↵</span> 打开</span>
                <span><span class="gnav-kbd">Esc</span> 关闭</span>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);

    const search = overlay.querySelector(".gnav-search");
    const list = overlay.querySelector(".gnav-list");
    let activeIdx = 0;
    let filtered = [];

    /* ---------- 状态 ---------- */
    function getRecent() {
        try { return JSON.parse(localStorage.getItem(RECENT_KEY) || "[]"); }
        catch { return []; }
    }
    function pushRecent(id) {
        try {
            const arr = getRecent().filter(x => x !== id);
            arr.unshift(id);
            localStorage.setItem(RECENT_KEY, JSON.stringify(arr.slice(0, MAX_RECENT)));
        } catch {}
    }

    /* ---------- 渲染 ---------- */
    function detectCurrentSlug() {
        const m = location.pathname.match(/(P\d{2}-[a-z0-9-]+)/i);
        return m ? m[1] : null;
    }
    const currentSlug = detectCurrentSlug();

    function buildTargetUrl(slug) {
        // 从当前路径定位 P##-* 段，从其根重建邻居 URL，支持子页面情况
        // /foo/P29-x/index.html → /foo/P29-x/  → root=/foo/  → /foo/P02-y/index.html
        // /foo/P29-x/sub/page.html → root=/foo/  → /foo/P02-y/index.html
        const path = location.pathname;
        const m = path.match(/^(.*\/)P\d{2}-[^/]+\//);
        const base = m ? m[1] : path.replace(/[^/]*$/, "");
        return base + slug + "/index.html";
    }

    function fuzzyMatch(tool, q) {
        if (!q) return true;
        const hay = (tool.id + " " + tool.slug + " " + tool.title + " " + tool.desc + " " + tool.category).toLowerCase();
        return q.toLowerCase().split(/\s+/).every(part => hay.includes(part));
    }

    function render() {
        const q = search.value.trim();
        const recentIds = getRecent();
        const current = currentSlug;

        // 排序：当前隐藏 / 最近优先 / 其余按 id
        const filtered_ = TOOLS
            .filter(t => fuzzyMatch(t, q))
            .filter(t => t.slug !== current)
            .sort((a, b) => {
                const ra = recentIds.indexOf(a.id);
                const rb = recentIds.indexOf(b.id);
                if (ra !== -1 || rb !== -1) {
                    if (ra === -1) return 1;
                    if (rb === -1) return -1;
                    return ra - rb;
                }
                return a.id.localeCompare(b.id);
            });
        filtered = filtered_;

        if (filtered.length === 0) {
            list.innerHTML = `<div class="gnav-empty">没有匹配的工具，试试输入「P29」「逻辑」「osint」…</div>`;
            return;
        }
        const recentSet = new Set(recentIds);
        let html = "";
        let inRecent = false;
        let inOther = false;
        filtered.forEach((t, i) => {
            if (!q && recentSet.has(t.id) && !inRecent) {
                html += `<div class="gnav-section">最近使用</div>`;
                inRecent = true;
            } else if (!q && !recentSet.has(t.id) && !inOther) {
                html += `<div class="gnav-section">全部工具 (${TOOLS.length})</div>`;
                inOther = true;
            }
            html += `
                <div class="gnav-item${i === activeIdx ? " active" : ""}" role="option" data-idx="${i}">
                    <span class="gnav-id">${t.id}</span>
                    <div class="gnav-meta">
                        <div class="gnav-title">${escapeHtml(t.title)}</div>
                        <div class="gnav-desc">${escapeHtml(t.desc)}</div>
                    </div>
                    <span class="gnav-cat">${escapeHtml(t.category)}</span>
                </div>
            `;
        });
        list.innerHTML = html;
        list.querySelectorAll(".gnav-item").forEach(el => {
            el.addEventListener("click", () => activate(parseInt(el.dataset.idx, 10)));
            el.addEventListener("mouseenter", () => {
                activeIdx = parseInt(el.dataset.idx, 10);
                updateActiveClass();
            });
        });
        scrollActiveIntoView();
    }

    function escapeHtml(str) {
        return String(str).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
    }

    function updateActiveClass() {
        list.querySelectorAll(".gnav-item").forEach((el, i) => {
            el.classList.toggle("active", parseInt(el.dataset.idx, 10) === activeIdx);
        });
        scrollActiveIntoView();
    }
    function scrollActiveIntoView() {
        const active = list.querySelector(".gnav-item.active");
        if (active && typeof active.scrollIntoView === "function") {
            try { active.scrollIntoView({ block: "nearest" }); } catch (_e) {}
        }
    }

    function activate(idx) {
        const tool = filtered[idx];
        if (!tool) return;
        pushRecent(tool.id);
        const url = buildTargetUrl(tool.slug);
        window.location.href = url;
    }

    /* ---------- 事件 ---------- */
    function open() {
        overlay.classList.add("open");
        search.value = "";
        activeIdx = 0;
        render();
        setTimeout(() => search.focus(), 30);
    }
    function close() {
        overlay.classList.remove("open");
    }

    fab.addEventListener("click", open);
    overlay.addEventListener("click", e => {
        if (e.target === overlay) close();
    });
    search.addEventListener("input", () => { activeIdx = 0; render(); });
    document.addEventListener("keydown", e => {
        // ⌘K / Ctrl+K 唤起
        if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
            e.preventDefault();
            overlay.classList.contains("open") ? close() : open();
            return;
        }
        if (!overlay.classList.contains("open")) return;
        if (e.key === "Escape") { e.preventDefault(); close(); }
        else if (e.key === "ArrowDown") {
            e.preventDefault();
            activeIdx = Math.min(activeIdx + 1, filtered.length - 1);
            updateActiveClass();
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            activeIdx = Math.max(activeIdx - 1, 0);
            updateActiveClass();
        } else if (e.key === "Enter") {
            e.preventDefault();
            activate(activeIdx);
        }
    });

    /* ---------- 初始 ---------- */
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", render);
    } else {
        render();
    }
})();
