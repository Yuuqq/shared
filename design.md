# Design: 新闻传播 AI 实验工具箱（JOU）

The locked system. Every Hallmark run on a P-tool page reads this first; pages share it. Change it on purpose; the file is the rule.

## System
- Genre: editorial
- Shape of the first page: app screen（各工具自有工作台布局；不强制营销 hero）
- Theme: custom（vibe: "羊皮纸手稿 · 朱砂强调 · 方角学术"）
- Axes: light / grotesk-sans / warm · posture: restrained
- Depth default: restyle（保留各工具布局与接线；系统与 chrome 统一）
- Brand keep: 羊皮纸纸色、朱砂强调、圆角 ≤6px、Noto Sans SC 正文、楷系/Noto Serif SC 标题、EB Garamond 仅拉丁
- Do not keep as brand: Inter / IBM Plex 显示、emoji 图标、蓝紫渐变、字距大写 kicker、中间点元信息串、card 套 teach-card

## Tokens
`design-tokens.css`（本仓）与各工具旁的 `modern-styles.css` 为源。角色对齐如下（变量名保持现有兼容别名）：

```css
:root {
  /* paper / ink — existing names are canonical */
  --bg: #F0E6CF;           /* paper */
  --card: #F7EFDA;         /* paper-hi */
  --ink: #3A2E20;
  --ink-secondary: #6E5B41;
  --line: #D3C4A0;
  --accent: #A2402F;       /* cinnabar */
  --accent-hover: #7C2F22;
  --accent-light: rgba(162, 64, 47, 0.08);
  --accent-ink: #F7EFDA;   /* text on accent fill */
  --ok: #51724B;           /* verdigris */
  --warn: #8C6A2F;         /* gold */
  --bad: #A2402F;
  --focus: var(--accent);
  --font-sans: "Noto Sans SC", "Microsoft YaHei", "PingFang SC", sans-serif;
  --font-serif: "Kaiti SC", "STKaiti", "KaiTi", "Noto Serif SC", "Songti SC", serif;
  --latin: "EB Garamond", Georgia, "Times New Roman", serif;
  --font-mono: ui-monospace, "SF Mono", Consolas, monospace;
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-pill: 4px;
  --rule-hair: 1px;
  --shadow-card: 0 2px 14px rgba(107, 90, 68, 0.16);
  --space-xs: 4px; --space-sm: 8px; --space-md: 16px; --space-lg: 24px; --space-xl: 32px;
}
```

Aliases that must remain: `--paper`, `--paper-hi`, `--cinnabar`, `--hei`, `--kai`, `--gold`, `--verdigris`.

Print media: never literal `#fff` / `#000`. Use `--print-paper` / `--print-ink` tokens (near-white parchment tint and near-black ink), or `color-mix` from `--bg` / `--ink`.

Dark: existing `data-theme="dark"` / prefers-color-scheme maps stay; no navy blues.

## Controls
- Primary: `--accent` fill · `--accent-ink` text · `--radius-md` · height 44–52px
- Secondary: hairline `--line` outline · same radius/height · ink text
- Inputs: `--line` border; `:focus-visible` instant ring (≥3:1), no fade-in on the ring
- Status: `role="status"` text; no decorative status dots; no emoji icons

## Chrome（所有工具同一）
- Top: 左 wordmark「新闻实验工具」+ 右 `P##`（正文脸、小一号、无 tracked-caps）
- Teach: 单层 `details`，**默认闭合**；摘要纯文字「如何使用」；禁止 🎓；禁止 `card` 内再套 `teach-card`
- Footer: 一行数据边界（附录 A 口径：是否离机 / 示例数据 / 不得当结论）+ 链到工具箱索引；禁止 📋 / 🔒 emoji
- Favicon: 单色 SVG 标记；禁止 📰 emoji data-URI
- Nav/cmd palette titles: strip leading emoji from tool names in `global-nav.js` TOOLS list

## Motion
- Character: still / calm；禁止 `transition: all`
- Never animate `width` / `height` / `top` / `left`；prefer `transform` / `opacity`
- Focus ring: instant（no transition on outline / box-shadow used as focus）
- `prefers-reduced-motion: reduce` on every non-essential transition

## Floor house rules（教学工具箱）
- No purple→blue / indigo stock gradients
- No card-in-card
- No invented metrics
- Labels: body face, step smaller, sentence case, untracked
- `overflow-x: clip` on `html` and `body`

## Exports
- This repo: `design-tokens.css`, `modern-styles.css`, `tool-chrome.css`（新建共享壳）
- Each P-tool still may keep a thin local `styles.css` for layout only; colour/type/radius/motion must use tokens
