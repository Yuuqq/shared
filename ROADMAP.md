# Yuuqq 工具箱 · 技术路线图

> 周期：2026.05 – 2027.04（12 个月）
> 范围：P00–P50 共 51 个教育新闻工具 + `Yuuqq/shared` 共享库
> 当前基线：v2.5（4 层 polish 全量交付，shared 含 dark-toggle / global-nav / onboarding / toast / autosave / url-state / cmd-palette / kbd-hints / export-png / design-tokens 等）

---

## 总体节奏

| 季度 | 主题 | 关键产出 |
|---|---|---|
| Q1 · 2026.05–07 | 稳定性与开发体验 | shared 版本治理 + CI + 加载归一化 |
| Q2 · 2026.08–10 | 质量观测与性能 | 错误遥测 + 性能预算 + 单元/视觉回归 |
| Q3 · 2026.11–2027.01 | 可达性与传播 | PWA 离线 + i18n + OG 卡 + SEO |
| Q4 · 2027.02–04 | 生态与扩展 | 新工具孵化 + embed 嵌入 + 插件架构 + 一键模板 |

---

## Q1 · 2026.05 – 07 · **稳定性与开发体验**
> 目标：消除 51 仓库手工维护的拖累，建立可持续 CI 基础设施。

### A · 共享库版本治理（P0，2 周）
**问题**：51 工具直接 `import "../shared/xxx.js"` GitHub Pages 同名文件，无版本号。
一次破坏性变更可能瞬间打挂 51 个生产页面（onboarding 滚动 bug、dark-toggle
位置 bug 都是这种事故的预警）。

**方案**
- 在 `Yuuqq/shared` 引入 `releases/v2/` `releases/v3/` 子目录
- 51 工具改用 `<script src="../shared/releases/v2/dark-toggle.js">`
- 配套 `latest.html` 跳转 + `CHANGELOG.md`

**KPI**：单仓库变更可灰度；回滚 < 60s

### B · 加载脚本归一化（P1，1 周）
**问题**：审计发现 51 工具有 16 种不同的 shared 脚本加载顺序。

**方案**
- 写一个 `<script src="../shared/loader.js">` 一行接管所有依赖注入
- 51 工具 `index.html` 用 1 行替换 8–10 行

**KPI**：load 模式从 16 → 1

### C · 跨仓库 CI（P0，2 周）
- GitHub Actions：每次 push 51 仓库任一，触发：
  - HTML 校验（W3C nu）
  - CSS 校验（stylelint）
  - JS 语法 + ESLint
  - Lighthouse CI 抓 5 个核心指标（FCP/LCP/CLS/TBT/SI），写入 PR comment
- shared 仓库变更触发"金丝雀矩阵"：选 5 个代表性工具部署到 staging 分支并截图

**KPI**：所有 push 自动检查，红色阻断合并

### D · 监控终端（P2，1 周）
- 在 `P00-dashboard` 加一个"工具集健康面板"
- 抓所有 51 仓库最新 commit / GitHub Actions 状态 / Pages build 状态
- 工具卡片显示 🟢/🟡/🔴

---

## Q2 · 2026.08 – 10 · **质量观测与性能**

### A · 错误遥测（P0,2 周）
**问题**：当前用户报告 bug 全靠口头反馈（onboarding 滚动 bug 即来自用户截图）。

**方案**
- 在 `shared/loader.js` 加 `window.onerror` + `unhandledrejection` 收集器
- 后端用一个轻量 Cloudflare Worker 接收上报，存 D1
- 完全匿名，无 cookie，无 PII
- P00 dashboard 显示"近 7 天 5 大错误"

### B · 性能预算（P1，2 周）
- 给 51 工具设硬性预算：
  - HTML ≤ 30KB
  - styles.css ≤ 50KB
  - 首屏 JS（同步） ≤ 100KB
  - LCP ≤ 2.5s @ 4G
- CI 超出阈值警告
- 重型可视化工具（P13/P15/P18 桑基图/地图/条赛）允许例外但需声明

### C · 单元测试基线（P2，3 周）
- 选 10 个核心工具补 vitest（jsdom）
- 测算法层面：P12 本福德、P05 Flesch、P02 情感、P10 AIGC 困惑度
- shared/ 全员上测试（dark-toggle / onboarding / autosave 等）

**KPI**：核心算法覆盖率 ≥ 80%

### D · 端到端可视回归（P2，2 周）
- 用 Playwright 给 51 工具录每个工具 3 张关键截图（首屏 / 操作中 / 结果态）
- 主分支 PR 自动 diff，> 5% 像素变化阻断
- 每月一次"暗色模式截图巡检"

---

## Q3 · 2026.11 – 2027.01 · **可达性与传播**

### A · PWA 离线化（P0，3 周）
**问题**：教学场景常在不稳定网络（教室 WiFi / 田野调查），现在断网即用不了。

**方案**
- 给所有"纯前端"工具（约 45 个）加 service worker
- shared/ + index.html + styles.css 缓存到 Cache Storage
- 离线时显示"离线模式可用"小徽章
- P11 CSV / P21 EXIF 等本身就纯前端，可成"装机即用"

**KPI**：Lighthouse PWA 评分 ≥ 90 / 工具

### B · 国际化骨架（P1，3 周）
**问题**：51 工具仅中文，影响海外新闻教育推广。

**方案**
- `shared/i18n.js`：基于 URL `?lang=en`
- 文案抽到 `locales/zh.json` + `locales/en.json`
- 先做 P00 dashboard + 5 个最热工具的英文版
- 后续工具按需逐个翻译

### C · 分享卡 / Open Graph 升级（P2，1 周）
- 当前 OG 是通用文案。给每工具配 `og-image.png`（1200×630），用 v2.5 hero 渐变 + 工具名
- 微信 / Twitter / LinkedIn 分享时大图卡片
- 用 satori + workflow 自动生成

### D · SEO + 站内搜索（P2，1 周）
- `shared/search-index.json`：全 51 工具元数据（标题、描述、tags、用法关键词）
- P00 dashboard 升级搜索从客户端 fuzzy → BM25 排序

---

## Q4 · 2027.02 – 04 · **生态与扩展**

### A · 新工具孵化（P1，持续）
基于这一年的真实使用数据（错误遥测 + 用户反馈）规划 5–10 个新工具：

候选：
- P51 实地采访录音转录 + 说话人分离
- P52 短视频字幕烧录
- P53 Telegram 频道存档器
- P54 截图水印追踪
- P55 LLM 多角色辩论模拟器

每个新工具走 v2.5 模板 + i18n + PWA + 测试 = **一天落地**。

### B · 嵌入式版本（P1，3 周）
- 把 5–8 个高价值工具做成 `<iframe src="...?embed=1">`
- 教师可以嵌入自己的课件 / Notion / WordPress
- embed 模式：隐藏 hero / 浮窗，只露核心交互
- 走 `postMessage` 协议，外站可读结果数据

### C · 插件架构（P2，4 周）
**问题**：每加一个全局功能（如 dark-toggle）都要改 `shared/loader`。

**方案**
- 定义 `defineSharedPlugin({ id, init, deps })` API
- 第三方贡献者可以提交 plugin（如"打字时长统计"、"导出 PDF"）
- `shared/loader.js` 按需加载

### D · 一键 fork 模板（P2，1 周）
- 提供 `Yuuqq/p-template` 仓库
- 含完整 v2.5 polish + shared/ 引用 + GitHub Action 配置
- 新人开新工具：fork → rename → 写业务 → push，全栈 < 30 min

---

## 横向贯穿轨道（持续）

| 轨道 | 节奏 |
|---|---|
| 安全审计 | 季度 1 次：CSP、SRI、CDN 依赖审查（marked / dompurify 等）|
| 设计令牌升级 | 半年 1 次：v2.5 → v2.6 → v3.0，跟踪 Figma 主流变化 |
| 用户访谈 | 月度 3 位（学生 1 / 教师 1 / 记者 1）|
| 文档化 | 每完成一个 quarter，更新 `Yuuqq/docs` 站 |

---

## 优先级矩阵

```
                重要
                  │
  Q1-A 共享库版本   │   Q1-B 加载归一化
  Q1-C CI          │   Q2-B 性能预算
  Q2-A 错误遥测     │   Q2-C 单元测试
  Q3-A PWA         │   Q3-B i18n
─────────紧急─────┼─────不紧急───────
  Q3-C OG 卡片     │   Q4-C 插件架构
                  │   Q4-D 一键模板
                  │
              不重要
```

---

## 风险登记

| 风险 | 概率 | 对策 |
|---|---|---|
| 单人维护 51 仓库精力不足 | 高 | Q1-A/B/C 优先做完 → 每周维护降到 < 2h |
| GitHub Pages 政策变化 | 低 | Q3 评估 Cloudflare Pages 备份方案 |
| 重大 CSS 标准更新 | 中 | 横向"设计令牌升级"轨道兜底 |
| 用户仍是 0 真实反馈 | 中 | Q2-A 错误遥测 + Q4-D fork 模板降低社区贡献门槛 |

---

## 一年后预期成果

- ✅ 51 工具 → 56–60 工具
- ✅ 每个工具均：PWA 离线 + 中英双语 + 性能 90+ + 错误遥测
- ✅ shared/ 有版本号、有插件架构、有 CHANGELOG
- ✅ 任意工具的 bug 平均修复时间 < 1 天（CI + 截图回归 + 错误遥测三件套）
- ✅ 新人开新工具 < 30 分钟（一键模板）
- ✅ 5–10 个工具有 embed 嵌入版，进入第三方课件

---

## 当前基线快照（2026.05.03）

| 项 | 状态 |
|---|---|
| 工具数量 | 51（P00–P50）|
| 设计层级 | 4 层 polish 全量交付（type-scale-v22 / 通用 UX 基线 / v2.4.1 深度 polish / 工具特有强化）|
| shared/ 模块 | 10 个核心 JS + 1 个核心 CSS |
| 已知 bug | 0（onboarding 滚动 / dark-toggle 位置 / 媒体 theme-color / iOS safe-area / P21 嵌套虚线 / P38 img alt 全部已修）|
| viewport / lang / favicon / description | 51/51 齐全 |
| 已有 CI | 无 |
| 已有自动化测试 | 无 |
| 已有遥测 | 无 |

---

*本路线图为活文档（living document），每季度结束时复盘并更新下一季度的细节。*
*最近一次更新：2026-05-03*
