# Yuuqq 工具箱 · 12 个月技术路线图

> **周期**：2026-05-03 → 2027-05-02
> **范围**：`Yuuqq/P00` – `Yuuqq/P50` 共 51 个教育新闻工具 + `Yuuqq/shared` 共享库
> **当前基线**：v2.5（4 层 polish 全量交付）
> **作者**：项目维护者
> **文档性质**：living document — 每季度末复盘并更新下季度细节
> **最近更新**：2026-05-03（v1.4 — Q1-B 全量收官，51 工具迁移完成）

---

> **状态更新（2026-05-03）**：
> - Q1-A 共享库版本治理 ✅ **首步完成** —
> `releases/v2.5/` 已建立，[CHANGELOG.md](./CHANGELOG.md) 记录全部 15 次提交，
> [README.md](./README.md) 提供入口文档，[MIGRATION.md](./MIGRATION.md)
> 为 v3.0.0 留好模板。commit `4cd50a6`。
> - Q1-B 加载脚本归一化 ✅ **完整完成** — `loader.js` v2.6.x 发版，
>   13 项断言全过；**51/51 工具批量迁移完成**，共移除 414
>   行 `<script>` 标签换成 51 行 loader 声明；加载模式 16 → 1（KPI 达成）。

> **相关文档**：[README.md](./README.md) · [CHANGELOG.md](./CHANGELOG.md) · [MIGRATION.md](./MIGRATION.md)

---

## 目录

- [一、阅读指南](#一阅读指南)
- [二、当前基线快照](#二当前基线快照2026-05-03)
- [三、12 个月节奏总览](#三12-个月节奏总览)
- [四、Q1 · 稳定性与开发体验（2026-05 ~ 07）](#四q1--稳定性与开发体验2026-05--07)
- [五、Q2 · 质量观测与性能（2026-08 ~ 10）](#五q2--质量观测与性能2026-08--10)
- [六、Q3 · 可达性与传播（2026-11 ~ 2027-01）](#六q3--可达性与传播2026-11--2027-01)
- [七、Q4 · 生态与扩展（2027-02 ~ 04）](#七q4--生态与扩展2027-02--04)
- [八、横向贯穿轨道](#八横向贯穿轨道)
- [九、优先级矩阵与依赖图](#九优先级矩阵与依赖图)
- [十、风险登记册](#十风险登记册)
- [十一、KPI 总表](#十一kpi-总表)
- [十二、一年后预期成果](#十二一年后预期成果)
- [附录 A · 立即可执行清单（本周）](#附录-a--立即可执行清单本周)
- [附录 B · 命名 / 版本 / 提交规范](#附录-b--命名--版本--提交规范)
- [附录 C · 术语表](#附录-c--术语表)

---

## 一、阅读指南

每个 work item 包含 6 个固定字段：

| 字段 | 含义 |
|---|---|
| **优先级** | P0 = 必做且阻塞下游 / P1 = 必做 / P2 = 可视情况 |
| **工时** | 单人专注估算（不含等待 review / CI 时间）|
| **背景** | 为什么要做（关联的 bug、痛点、机会）|
| **具体步骤** | 可直接执行的步骤序列，含命令 / 文件路径 |
| **交付物** | 可见、可验证的产出列表 |
| **验收标准** | 完成判定的二元条件 |
| **依赖** | 必须先完成的其他 work item |
| **风险** | 已识别的实施风险与对策 |

---

## 二、当前基线快照（2026-05-03）

### 数据指标

| 项 | 值 |
|---|---|
| 工具仓库数 | 51（`P00-dashboard` ~ `P50-osint-bookmarks`）|
| 共享库 | `Yuuqq/shared`（10 个 JS + 1 个核心 CSS）|
| 累计提交（本季）| ~270 次跨 52 仓库 |
| design-tokens.css 体积 | 23.9 KB |
| 工具 styles.css 体积区间 | 8.4 – 30 KB |
| viewport / lang / favicon / description | 51/51 齐全 |
| `<img>` 缺 alt | 0/51 |
| 明文 `http://` / `eval` / `document.write` | 0/51 |
| 已知未修 bug | 0 |

### 已完成的 polish 层级

```
L1  type-scale-v22 字体节奏        ✅ 51/51
L2  通用 UX 基线                    ✅ 51/51
    (skip-link / theme-color / color-scheme / og / print / reduced-motion / lazy img)
L3  v2.4.1 深度 polish              ✅ 51/51
    (hero gradient / btn / card / focus / status pill)
L4  工具特有强化                    ✅ 51/51
    (Tier-1 11 工具独有块 + Tier-2 40 工具按原型分类)
```

### shared/ 现状清单

| 文件 | 用途 | 字节 |
|---|---|---|
| `design-tokens.css` | 设计令牌、语义颜色、暗色模式 | 23,905 |
| `dark-toggle.js` | 暗色切换 + 自动注入 global-nav | 9,339 |
| `global-nav.js` | ⌘K 跨工具跳转浮窗 | 17,470 |
| `onboarding.js` | 高亮引导 + 流程卡片 | 18,056 |
| `toast.js` | 顶部消息条 | – |
| `autosave.js` | localStorage 自动暂存 | – |
| `url-state.js` | URL 持久化输入态 | – |
| `cmd-palette.js` | 命令面板（占位）| 54 |
| `kbd-hints.js` | 键盘提示（占位）| 52 |
| `export-png.js` | 截图导出 | – |
| `pedagogy-data-p1.js` `pedagogy-data-p2.js` | 教学卡数据（占位）| 59 |
| `vendor/` | 内嵌的 echarts 等 | – |

### 已识别但未修的设计权衡

| 项 | 现状 | 决策 |
|---|---|---|
| 引导期间右下角浮窗仍可点 | ring `pointer-events:none`，dark-toggle / gnav-fab 可触发 | 接受 — 用户可主动结束引导 |
| shared/ 无版本号 | 51 工具直接 import 同名文件 | 进入 Q1-A 修复 |
| 16 种 shared 加载顺序 | 等价但有漂移 | 进入 Q1-B 修复 |
| 0 自动化测试 | 仅靠 jsdom 抽样 + 用户反馈 | 进入 Q2-C 修复 |
| 0 错误遥测 | 全靠用户截图反馈 | 进入 Q2-A 修复 |

---

## 三、12 个月节奏总览

```
2026                                                     2027
05 06 07 │ 08 09 10 │ 11 12 01 │ 02 03 04
─────────┼──────────┼──────────┼──────────
   Q1    │    Q2    │    Q3    │    Q4
─────────┴──────────┴──────────┴──────────
稳定性 DX │ 质量 + 性能 │ PWA + i18n │ 生态扩展
```

| 季度 | 主题 | 期末验收 |
|---|---|---|
| **Q1** | 稳定性与开发体验 | shared/ 有 v2/v3 版本目录；51 工具加载模式 1 种；CI 红绿可阻断 |
| **Q2** | 质量观测与性能 | 错误遥测在线；51 工具均通过性能预算；核心算法测试 ≥ 80% |
| **Q3** | 可达性与传播 | 45+ 工具 PWA 离线可用；6 工具中英双语；51 工具 OG 大图 |
| **Q4** | 生态与扩展 | 5+ 新工具上线；5+ 工具 embed 版；插件 API 文档化；fork 模板可用 |

---

## 四、Q1 · 稳定性与开发体验（2026-05 ~ 07）

> **季度目标**：把"手工同步 51 仓库"的运维成本降到每周 < 2 小时。

### Q1-A · 共享库版本治理 🔴 P0 · 🟢 进行中（首步已完成 2026-05-03）
- **工时**：2 周（10 工作日）
- **背景**：51 工具直接引用 `https://yuuqq.github.io/shared/dark-toggle.js`，无版本号。一次 push 即同时影响 51 个生产页面。本季已经经历过 3 次紧急修复（onboarding 滚动、dark-toggle 位置、theme-color 媒体查询误删），如果其中任一引发兼容性破坏，影响面是全部工具。
- **具体步骤**
  1. 在 `Yuuqq/shared` 创建目录结构：
     ```
     shared/
     ├── latest/              # 当前指针（symlink 或 redirect 文件）
     ├── releases/
     │   ├── v2.5/            # 当前快照
     │   └── v3.0-rc/         # 下个主版本
     ├── CHANGELOG.md
     ├── MIGRATION.md
     └── README.md            # 引用范例
     ```
  2. 把当前 `shared/*.js` `shared/*.css` 复制到 `releases/v2.5/`
  3. 在 `latest/` 用 HTML 跳转或服务端 redirect 指向 `v2.5`
  4. 51 工具批量替换：
     ```bash
     # 一次脚本完成
     for repo in P*/; do
       sed -i 's|../shared/\([a-z-]*\.\(js\|css\)\)|../shared/releases/v2.5/\1|g' "$repo/index.html"
     done
     ```
  5. 写 `CHANGELOG.md`：列出 v2.0–v2.5 的变更
  6. 写 `MIGRATION.md`：v2 → v3 升级步骤模板
  7. 配套 GitHub Action：发布新版本时自动复制到新目录 + 打 tag
- **交付物**
  - [ ] `Yuuqq/shared/releases/v2.5/` 全量副本
  - [ ] `Yuuqq/shared/CHANGELOG.md`
  - [ ] 51 工具 `index.html` 引用版本化路径
  - [ ] 发版 workflow `.github/workflows/release.yml`
- **验收标准**
  - 在 `releases/` 目录提交一个测试性破坏（删掉 `dark-toggle.js` 一个函数），51 个工具页面均**不受影响**
  - 任意 release 可在 60 秒内通过修改 `latest/` 指针完成回滚
- **依赖**：无（可立即开始）
- **风险**
  | 风险 | 概率 | 对策 |
  |---|---|---|
  | 51 工具 sed 替换误伤 | 中 | 先用 dry-run 出 diff，人工抽查 5 个 |
  | GitHub Pages 缓存导致旧版本仍生效 | 中 | 在新 release HTML 里加 `<meta http-equiv="cache-control" content="max-age=300">` |

### Q1-B · 加载脚本归一化 🟡 P1 · ✅ **已完成（2026-05-03）**
- **工时**：1 周（5 工作日）
- **背景**：审计发现 51 工具有 16 种不同的 shared 加载顺序。新增一个 shared 模块需要改 51 个 index.html。
- **具体步骤**
  1. 写 `shared/loader.js`：
     ```js
     // 单文件接管所有依赖，按需 / 按 data-* 配置
     // <script src="../shared/loader.js" data-modules="dark,nav,toast,onboarding"></script>
     ```
  2. 51 工具 `index.html` 用 1 行 `<script>` 替换原 8–10 行
  3. loader 内部按声明顺序串行加载 + 异常隔离
  4. 保留 ESM 兼容：`loader.mjs` 同步提供 import 形式
- **交付物**
  - [ ] `shared/releases/v3.0-rc/loader.js`（ESM + UMD 双发）
  - [ ] 51 工具 `index.html` 改用 loader（1 个 commit/工具，可批量）
  - [ ] `loader` 单元测试（jsdom，覆盖 8 种 module 组合）
- **验收标准**
  - 任意工具开头只 1 行 `<script src=".../loader.js" data-modules="...">`
  - shared 加载模式从 16 → 1（脚本审计 grep 验证）
  - 加载耗时 ≤ 旧方案 110%（lighthouse 比对）
- **依赖**：Q1-A 的版本目录结构
- **风险**：loader 自身故障会让所有依赖失败 → 测试覆盖率必须 ≥ 95%

### Q1-C · 跨仓库 CI 🔴 P0
- **工时**：2 周
- **背景**：当前 0 自动化检查。本季的 onboarding bug、P21 嵌套虚线、P38 img alt 都是事后人工发现的，应该在 CI 阶段就拦截。
- **具体步骤**
  1. 在 51 工具的根加同一份 `.github/workflows/ci.yml`：
     ```yaml
     name: CI
     on: [push, pull_request]
     jobs:
       html:    uses: Yuuqq/shared/.github/workflows/_html-validate.yml@v1
       css:     uses: Yuuqq/shared/.github/workflows/_css-lint.yml@v1
       js:      uses: Yuuqq/shared/.github/workflows/_js-lint.yml@v1
       perf:    uses: Yuuqq/shared/.github/workflows/_lighthouse.yml@v1
     ```
  2. 复用工作流（reusable workflows）放在 `Yuuqq/shared/.github/workflows/`
  3. lighthouse 抓 5 指标：FCP / LCP / CLS / TBT / SI，写 PR comment
  4. shared/ 仓库变更时触发"金丝雀矩阵"：选 P00 / P01 / P11 / P32 / P48 五个代表，部署到 `staging` 分支并截图，PR 内嵌图
- **交付物**
  - [ ] 51 工具 `.github/workflows/ci.yml`（一致）
  - [ ] `Yuuqq/shared/.github/workflows/_*.yml` 5 个可复用工作流
  - [ ] PR 模板自动注释 lighthouse 分数 + 截图 diff
- **验收标准**
  - 故意 push 一个语法错误（如 `</divv>`）→ CI 红色，阻断合并
  - shared/ 改动触发金丝雀截图，5 工具截图全部 PR 内可见
- **依赖**：Q1-A（版本号让金丝雀可以指向 staging release）
- **风险**：51 仓库批量加 workflow → 用脚本 + GitHub API 一次完成

### Q1-D · 监控终端 🟢 P2
- **工时**：1 周
- **背景**：维护者需要一眼看到 51 工具的健康度，避免某个仓库静默坏掉很久。
- **具体步骤**
  1. 在 `P00-dashboard` 加一个 `health.html` 页面
  2. 定时（每小时）从 GitHub API 抓：
     - 51 工具的最新 commit SHA + 时间
     - 最新 CI run 状态
     - GitHub Pages 部署状态
  3. 缓存到 `data/health.json` (静态文件，每小时 GitHub Action 更新)
  4. 前端读 JSON 渲染 51 工具卡片，🟢/🟡/🔴 状态
- **交付物**
  - [ ] `P00-dashboard/health.html`
  - [ ] `.github/workflows/health-snapshot.yml`（cron 每小时）
- **验收标准**
  - 任意工具 CI 失败 1 小时内显示 🔴
  - 维护者打开 dashboard < 3 秒可定位"哪些工具有问题"
- **依赖**：Q1-C 的 CI 必须先存在

---

## 五、Q2 · 质量观测与性能（2026-08 ~ 10）

> **季度目标**：从"被动等用户报 bug"转向"主动发现并测算"。

### Q2-A · 错误遥测 🔴 P0
- **工时**：2 周
- **背景**：本季 onboarding 滚动 bug 是用户截图反馈才发现的。如果有遥测，能在第一个用户遇到时就上报。
- **具体步骤**
  1. 在 `shared/loader.js` 注入：
     ```js
     window.addEventListener("error", e => report({type:"err",msg:e.message,...}));
     window.addEventListener("unhandledrejection", e => report({...}));
     ```
  2. 后端：Cloudflare Worker（免费层够）+ D1 数据库
  3. 上报字段：tool_id / error_msg / stack（截前 500 字符）/ ua / 时间戳
  4. **不收集**：cookie / IP / 任何输入内容 / referer 完整 URL
  5. P00 dashboard 加"近 7 天错误 Top 5"区块
  6. 隐私声明：在每工具 footer 加 1 行链接
- **交付物**
  - [ ] `shared/error-reporter.js`（loader 自动加载）
  - [ ] Cloudflare Worker 代码（`workers/error-collector/`）
  - [ ] `P00-dashboard/errors.html` 错误浏览页
  - [ ] 隐私声明 `Yuuqq/shared/PRIVACY.md`
- **验收标准**
  - 故意在 P01 抛 `throw new Error("test")` → Cloudflare Worker 5 分钟内可见
  - 错误聚合按 `tool_id + msg` 去重计数
  - 隐私扫描：上报 payload 不含任何用户输入字符
- **依赖**：Q1-B 的 loader（注入点）
- **风险**：Cloudflare 免费额度（每天 10w 请求）够用 — 51 工具 × 估算 0.1% 错误率 × 估算 10K 日活 = 远低于上限

### Q2-B · 性能预算 🟡 P1
- **工时**：2 周
- **背景**：v2.5 polish 累计加了不少 CSS/JS。需要硬性边界防止后续无意识膨胀。
- **预算定义**

  | 资产 | 预算 | 当前实际 | 余量 |
  |---|---|---|---|
  | HTML | ≤ 30 KB | 平均 18 KB | ✅ |
  | styles.css | ≤ 50 KB | 8.4–30 KB | ✅ |
  | 同步 JS（首屏阻塞） | ≤ 100 KB | 估算 ~80 KB | 🟡 |
  | 异步 JS（defer） | ≤ 300 KB | varies | – |
  | LCP @ 4G | ≤ 2.5 s | 未测 | ❓ |
  | CLS | ≤ 0.1 | 未测 | ❓ |

- **具体步骤**
  1. 在 Q1-C 的 lighthouse workflow 中加阈值，超过即 CI 红
  2. 重型可视化工具（P13 / P15 / P18 桑基/地图/条赛）允许例外，但需在 `.perf-exception.yml` 显式声明
  3. 加 `bundle-size-action`：监控每个 commit 的 styles.css / index.html 增量
- **交付物**
  - [ ] `shared/.github/workflows/_perf-budget.yml`
  - [ ] `.perf-exception.yml` 示例（重型工具用）
  - [ ] dashboard 加"性能榜"
- **验收标准**：51/51 工具均通过预算（含例外声明）

### Q2-C · 单元测试基线 🟢 P2
- **工时**：3 周
- **范围选择**
  - **shared/ 全员**：dark-toggle / onboarding / autosave / url-state / global-nav / loader
  - **核心算法工具**：P02 情感、P05 Flesch、P10 AIGC 困惑度、P12 本福德、P19 色盲对比度
- **栈选择**：vitest + jsdom（零 build 兼容当前 vanilla JS）
- **具体步骤**
  1. 在 `Yuuqq/shared` 加 `package.json` + `vitest.config.js`
  2. 测试目录约定：`tests/unit/*.test.js`
  3. 每个核心算法抽出纯函数（如 P12 的 `analyzeBenford(numbers): Result`），易测
  4. 51 工具仓库不强制有测试，但鼓励
- **交付物**
  - [ ] `shared/tests/unit/` 覆盖 6 模块
  - [ ] 10 工具仓库各 1 个核心算法测试
  - [ ] CI workflow `_unit-test.yml`
- **验收标准**：核心算法 line coverage ≥ 80%
- **依赖**：Q1-A（测试针对 versioned shared）

### Q2-D · 端到端可视回归 🟢 P2
- **工时**：2 周
- **具体步骤**
  1. Playwright + 51 工具 × 3 截图（首屏 / 操作中 / 结果态）= 153 张基线
  2. PR 自动 diff（pixel-diff），> 5% 阻断合并
  3. 每月 1 次"暗色模式截图巡检"
  4. 截图基线存 `Yuuqq/shared/visual-baselines/`（git LFS 或 release asset）
- **交付物**
  - [ ] `shared/.github/workflows/_visual-regression.yml`
  - [ ] 153 张基线截图
  - [ ] 写 `VISUAL_TEST.md` 操作手册
- **验收标准**：故意改 design-tokens.css 的 `--accent` → 5 工具金丝雀截图均检测出差异

---

## 六、Q3 · 可达性与传播（2026-11 ~ 2027-01）

> **季度目标**：从"个人项目"扩展为"可被任何人用、装、嵌入"的公共基础设施。

### Q3-A · PWA 离线化 🔴 P0
- **工时**：3 周
- **背景**：教学场景常在不稳定网络（教室 WiFi / 田野调查），断网即用不了。
- **具体步骤**
  1. 写 `shared/sw.js` 通用 service worker（cache-first + 1 周过期）
  2. 写 `shared/manifest.json` 模板，每工具填 `name` `theme_color`
  3. 51 工具 `index.html` 加：
     ```html
     <link rel="manifest" href="manifest.json">
     <script>navigator.serviceWorker?.register('./sw.js')</script>
     ```
  4. 离线时显示底部"离线模式可用"小徽章
  5. **不适用**的工具（需联网的）跳过：P15 story-map（OSM 瓦片）、P14 部分场景
  6. 评估 PWA 安装提示（A2HS）— 默认关闭，需要时再开
- **交付物**
  - [ ] `shared/sw.js` `shared/sw-template.js`（工具可继承）
  - [ ] `shared/manifest.json` 模板
  - [ ] 45+ 工具集成完成（剩余 ~6 标注 "需联网"）
- **验收标准**
  - Lighthouse PWA 评分 ≥ 90 / 工具
  - Chrome DevTools → Network → Offline → 工具仍可用
  - 重新联网后自动拉新版本（hash check）
- **依赖**：Q1-A（sw 缓存版本化资源更可靠）

### Q3-B · 国际化骨架 🟡 P1
- **工时**：3 周
- **范围**：先做 P00 dashboard + 5 个最热工具的英文版
- **具体步骤**
  1. 写 `shared/i18n.js`：`t("key")` 函数，根据 `?lang=` 或 `navigator.language`
  2. 文案抽到 `locales/zh.json` `locales/en.json`
  3. P00 + 选中的 5 工具配 `data-i18n="key"` 属性
  4. 切换器放在 dark-toggle 旁边（同样 fixed，bottom-right 列）
  5. SEO：`<link rel="alternate" hreflang="en" href="...?lang=en">`
- **交付物**
  - [ ] `shared/i18n.js`
  - [ ] 6 工具完成中英双语
  - [ ] `LANG_GUIDE.md` 给后续工具 / 贡献者
- **验收标准**
  - 6 工具 `?lang=en` 加载后所有 hardcoded 中文消失
  - 切换语言不刷新页面（SPA 风格）
- **依赖**：无强依赖，但建议 Q3-A 之后做（避免 sw 缓存冲突）

### Q3-C · 分享卡 / OG 升级 🟢 P2
- **工时**：1 周
- **背景**：当前 OG 是统一通用文案，分享到微信/Twitter 不抓眼球。
- **具体步骤**
  1. 设计模板：1200×630，左侧工具名 + 副标题，右侧 v2.5 hero 渐变 + 工具品牌色
  2. 用 `satori` (vercel/satori) + GitHub Action 自动生成 51 张 PNG
  3. push 到各工具仓库 `og-image.png`
  4. `index.html` 改 `<meta property="og:image" content="./og-image.png">`
- **交付物**
  - [ ] `shared/scripts/generate-og.mjs`
  - [ ] 51 张 og-image.png
  - [ ] `.github/workflows/_og-regen.yml`（工具改名时自动重生）
- **验收标准**：所有 51 工具在 Twitter card validator / WeChat 分享均显示新大图

### Q3-D · SEO + 站内搜索 🟢 P2
- **工时**：1 周
- **具体步骤**
  1. 把 P00 dashboard 当前的客户端 fuzzy 搜索升级为 BM25
  2. `shared/search-index.json`：51 工具元数据（标题、描述、tags、用法关键词、典型 query）
  3. 升级 `global-nav.js` ⌘K 也用同一索引
- **交付物**
  - [ ] `shared/search-index.json`
  - [ ] BM25 实现 `shared/search-engine.js`
- **验收标准**
  - 搜"假新闻"应返回 P10 / P24 / P28 而非按 ID 顺序
  - 中文+拼音+英文混合 query 都能命中
- **依赖**：无

---

## 七、Q4 · 生态与扩展（2027-02 ~ 04）

> **季度目标**：让"维护一个工具集"演化为"经营一个工具生态"。

### Q4-A · 新工具孵化 🟡 P1（持续）
- **工时**：每个新工具 1–2 天
- **依据**：基于 Q2-A 错误遥测 + Q3 真实使用数据 + 用户访谈反馈
- **候选清单**

  | ID | 候选工具 | 主题 | 预计工时 |
  |---|---|---|---|
  | P51 | 实地采访录音转录 + 说话人分离 | AI 教学 | 2 d |
  | P52 | 短视频字幕烧录 | 工具 | 1 d |
  | P53 | Telegram 频道存档器 | OSINT | 2 d |
  | P54 | 截图水印追踪 | OSINT | 1 d |
  | P55 | LLM 多角色辩论模拟器 | 媒介素养 | 2 d |
  | P56 | 论文引用图谱可视化 | 数据新闻 | 2 d |
  | P57 | 信息可信度评分卡 | 媒介素养 | 1 d |

- **流程**：每个新工具走 v2.5 模板 + 走 Q1/Q2/Q3 全部基础设施
- **验收标准**：单个新工具从 fork 模板到上线 ≤ 1 个工作日

### Q4-B · 嵌入式版本 🟡 P1
- **工时**：3 周
- **背景**：让教师能把工具嵌入自己的 Notion / WordPress / 课件
- **具体步骤**
  1. 选 5–8 个高价值工具：P10 AIGC 检测、P12 本福德、P19 色盲、P05 Flesch、P29 谬误、P48 闪卡
  2. 增加 `?embed=1` 参数，进入 embed mode：
     - 隐藏 hero / 浮窗 / 教程
     - 仅露核心交互
     - 自适应 iframe 高度（`postMessage` 通知父页）
  3. 写 `EMBED.md` 指南 + 复制即用的 `<iframe>` 片段
  4. `postMessage` 协议：父页可读 result 数据
- **交付物**
  - [ ] 6+ 工具 embed mode 完成
  - [ ] `shared/embed-bridge.js`（postMessage 通信）
  - [ ] `Yuuqq/shared/EMBED.md`
- **验收标准**
  - 在 CodePen 嵌入工具，正常工作 + 高度自适应
  - 父页能通过 `postMessage` 读到工具结果
- **依赖**：Q1-A 的 release 路径（embed 需引用稳定版本）

### Q4-C · 插件架构 🟢 P2
- **工时**：4 周
- **背景**：每加一个全局功能（如 dark-toggle）都要改 shared/loader。希望第三方能贡献 plugin。
- **具体步骤**
  1. 定义 plugin API：
     ```js
     // shared/plugins/typing-stats/index.js
     definePlugin({
       id: "typing-stats",
       version: "1.0.0",
       deps: ["loader@>=1.0"],
       init(ctx) { /* ctx.on("input", ...) */ }
     });
     ```
  2. loader 支持 `data-modules="dark,nav,@community/typing-stats"` 加载社区插件
  3. 维护 plugin registry：`Yuuqq/shared/plugins/REGISTRY.json`
  4. 写贡献指南
- **交付物**
  - [ ] `shared/plugin-api.js`
  - [ ] 2 个示范插件（typing-stats、export-pdf）
  - [ ] `PLUGIN_GUIDE.md`
- **验收标准**：第三方贡献者可以提交 PR 加 plugin 而无需改 loader

### Q4-D · 一键 fork 模板 🟢 P2
- **工时**：1 周
- **具体步骤**
  1. 创建 `Yuuqq/p-template` 仓库（标记为 GitHub template）
  2. 包含：
     - v2.5 完整 polish CSS
     - shared/loader 引用
     - GitHub Actions ci.yml
     - manifest.json 模板
     - i18n locales 模板
     - README 含"如何 30 分钟开新工具"
  3. 配 codespaces / dev container 配置
- **交付物**
  - [ ] `Yuuqq/p-template`（template repo）
  - [ ] `QUICKSTART.md`
- **验收标准**：新人按 README 操作，30 min 内可上线一个 hello-world 工具

---

## 八、横向贯穿轨道

| 轨道 | 节奏 | 内容 |
|---|---|---|
| **安全审计** | 季度 1 次 | CSP 头、SRI 校验、CDN 依赖（marked / dompurify）的 CVE 扫描、token 泄露扫描 |
| **设计令牌升级** | 半年 1 次 | v2.5 → v2.6 → v3.0；跟踪 Figma / Material 主流变化；微调 type-scale-v23 |
| **用户访谈** | 月度 3 位 | 学生 1 / 教师 1 / 记者 1；30 分钟半结构化；笔记存 `Yuuqq/docs/interviews/` |
| **文档化** | 季度末 | 更新 `Yuuqq/docs` 站；写季度 retrospective |
| **依赖巡检** | 月度 | dependabot；marked / dompurify 锁版本 + SRI |

---

## 九、优先级矩阵与依赖图

### 重要性 × 紧急度

```
重要 ↑
     │
P0 ⭐│  Q1-A 共享库版本    │
     │  Q1-C CI            │
     │  Q2-A 错误遥测      │
     │  Q3-A PWA           │
─────┼─────────────────────┼─────
P1   │  Q1-B 加载归一化    │  Q4-A 新工具
     │  Q2-B 性能预算      │  Q4-B 嵌入版
     │  Q3-B i18n          │
─────┼─────────────────────┼─────
P2   │  Q1-D 监控终端      │  Q4-C 插件
     │  Q2-C 单元测试      │  Q4-D fork 模板
     │  Q2-D 视觉回归      │
     │  Q3-C OG 卡         │
     │  Q3-D BM25 搜索     │
     │                     │
     紧急 ←──────────────→ 不紧急
```

### 依赖图

```
Q1-A 共享库版本 ─┬─→ Q1-B 加载归一化 ─→ Q2-A 错误遥测 ─→ Q3-A PWA
                ├─→ Q1-C CI ─────────→ Q1-D 监控
                │                    └→ Q2-B 性能预算
                │                    └→ Q2-D 视觉回归
                ├─→ Q2-C 单元测试
                ├─→ Q3-A PWA
                └─→ Q4-B 嵌入版

Q3-B i18n  →  Q4-A 新工具（自带双语）
Q4-D 模板  ←  Q1-C CI + Q3-A PWA + Q3-B i18n（模板需含全部基础设施）
```

**关键路径**：Q1-A → Q1-B → Q2-A → Q3-A → Q4-D（贯穿 12 个月，必须按序）

---

## 十、风险登记册

| ID | 风险 | 概率 | 影响 | 对策 | 触发条件 |
|---|---|---|---|---|---|
| R1 | 单人维护 51 仓库精力不足 | 高 | 高 | Q1-A/B/C 优先做完，每周维护降到 < 2h | 季度任务延期 > 1 月 |
| R2 | GitHub Pages 政策变化 / 限流 | 低 | 高 | Q3 评估 Cloudflare Pages 备份 | Pages 服务异常 > 1 周 |
| R3 | 重大 CSS 标准（如 OKLCH 普及）需要重构 | 中 | 中 | "设计令牌升级"轨道兜底 | Chrome 主流版本变更 |
| R4 | 用户仍是 0 真实反馈 | 中 | 中 | Q2-A 错误遥测 + Q4-D fork 模板降低社区门槛 | 半年内无外部贡献 |
| R5 | Cloudflare Worker 免费额度被打满 | 低 | 中 | 加 sampling（10% 上报）+ 升级到付费层 | 月请求量 > 10w |
| R6 | shared/ 重大不向后兼容变更 | 中 | 高 | Q1-A 版本目录 + 多版本并存策略 | 累计 v3 兼容性 issue > 5 |
| R7 | 第三方插件质量良莠不齐 | 中 | 低 | 插件 review 机制 + 标记 official/community | Q4-C 之后 |
| R8 | i18n 后翻译质量不一致 | 中 | 低 | 招募志愿翻译 + glossary 统一术语 | 6 工具译文上线后 |

---

## 十一、KPI 总表

| 维度 | 当前 | Q1 末 | Q2 末 | Q3 末 | Q4 末 |
|---|---|---|---|---|---|
| 工具总数 | 51 | 51 | 51 | 51 | 56+ |
| 平均 bug 修复时间 | ? | ≤ 3 d | ≤ 1 d | ≤ 1 d | ≤ 4 h |
| 自动化测试覆盖率 | 0% | 0% | 80%（核心算法）| 80% | 80% |
| Lighthouse PWA 评分 | ~30 | ~30 | ~30 | ≥ 90 | ≥ 90 |
| Lighthouse 性能评分 | 未测 | 测出 | ≥ 85 | ≥ 90 | ≥ 90 |
| 错误遥测覆盖工具数 | 0 | 0 | 51 | 51 | 56+ |
| 双语工具数 | 0 | 0 | 0 | 6 | 10+ |
| 嵌入式工具数 | 0 | 0 | 0 | 0 | 6+ |
| shared/ 加载模式数 | 16 | 1 | 1 | 1 | 1 |
| shared/ 版本数 | 1（无标号）| 1（v2.5）| 2 | 3 | 3 |
| 社区贡献数（PR）| 0 | 0 | 0 | 0 | ≥ 1 |

---

## 十二、一年后预期成果

到 2027-05 时项目应当：

- ✅ 51 → 56–60 工具，每个均：
  - PWA 离线可用
  - 中英双语
  - Lighthouse 性能 / a11y / best-practices ≥ 90
  - 自动错误遥测
- ✅ shared/ 有版本号、有 CHANGELOG、有插件架构
- ✅ 任意工具的 bug 平均修复时间 < 4 小时（CI + 截图回归 + 错误遥测三件套）
- ✅ 新人开新工具 < 30 分钟（一键模板）
- ✅ 5–10 个工具有 embed 嵌入版，进入第三方课件
- ✅ 至少 1 个社区贡献（plugin 或 PR）
- ✅ 项目从"个人作品集"演化为"可持续的公共基础设施"

---

## 附录 A · 立即可执行清单（本周）

按依赖顺序的最小启动集（5 个工作日）：

```
Day 1
□ 创建 Yuuqq/shared/releases/v2.5/ 目录，复制当前文件
□ 写 CHANGELOG.md：列 v2.0–v2.5 历次变更
□ 写 latest/index.html 跳转

Day 2
□ 51 工具批量 sed 替换 import 路径（先 dry-run）
□ 抽样 5 工具人工验证 → 全量 push
□ 监控 GitHub Pages 重新构建是否成功

Day 3
□ 写 .github/workflows/_html-validate.yml
□ 写 .github/workflows/_css-lint.yml
□ 写 .github/workflows/_js-lint.yml
□ 在 P01 仓库测试通过

Day 4
□ 用 GitHub API 把 ci.yml 同步到 51 仓库
□ 触发一次全量 CI run，修复任何红色

Day 5
□ Q1-A + Q1-C 验收
□ 写本周 retrospective 到 docs/retro/2026-W18.md
□ 启动 Q1-B（loader.js 设计 stub）
```

---

## 附录 B · 命名 / 版本 / 提交规范

### 版本号（SemVer）
- shared/ 用 SemVer：`MAJOR.MINOR.PATCH`
  - MAJOR：破坏性 API 变更（如删除 dark-toggle.js 公开函数）
  - MINOR：新增模块或新增 plugin 钩子
  - PATCH：bug 修复 / 性能优化
- 工具仓库不强制 SemVer，按提交即发布

### 分支策略
- `main`：生产 = GitHub Pages
- `staging`：CI 金丝雀（Q1-C）
- 功能分支：`feat/<short-name>` `fix/<short-name>`

### 提交规范（Conventional Commits）
```
<type>(<scope>): <subject>

<body>

<footer>
```

| type | 用途 |
|---|---|
| feat | 新功能 |
| fix | bug 修复 |
| docs | 仅文档 |
| style | 代码格式（非功能）|
| refactor | 重构（非 feat 非 fix）|
| perf | 性能优化 |
| test | 加测试 |
| chore | 杂项（依赖、配置）|

scope 例：`(p01)` `(shared)` `(dark-toggle)` `(loader)`

### 文件命名
- 工具仓库：`P##-kebab-case-name`
- shared 模块：`kebab-case.js`
- 插件：`@community/<name>` 或 `@official/<name>`

---

## 附录 C · 术语表

| 术语 | 含义 |
|---|---|
| **Tier-1 工具** | 11 个有独有 polish 块的工具（P00 / P32 / P37 / P48 / P20 / P29 / P27 / P46 / P04 / P08 / P45）|
| **Tier-2 工具** | 其余 40 个走通用模板的工具 |
| **shared/** | `Yuuqq/shared` 仓库 → GitHub Pages 提供共享 JS/CSS |
| **金丝雀矩阵** | shared 改动时先部署到 5 个代表性工具的 staging，截图入 PR |
| **archetype** | Tier-2 polish 时按 UI 组件类型自动检测的原型（chart_svg / file_upload / range_slider 等）|
| **flow-guide** | 每工具页底部的 "5 步流程" 折叠卡 |
| **onboarding ring** | 高亮目标元素的脉冲圆环 + 暗化背景 |
| **gnav-fab** | 右下角 ⌘K 浮动按钮（global-nav） |

---

## 修订历史

| 版本 | 日期 | 变更 |
|---|---|---|
| 1.0 | 2026-05-03 | 初版，4 季度路线图 |
| 1.1 | 2026-05-03 | 打磨：加目录、依赖图、KPI 总表、立即执行清单、规范附录 |
| 1.2 | 2026-05-03 | 加 Q1-A 进度横幅；交叉引用 README / CHANGELOG / MIGRATION |
| 1.3 | 2026-05-03 | Q1-B loader 基础设施完成；标记 Q1-B 进行中 |
| 1.4 | 2026-05-03 | Q1-B 51 工具批量迁移完成；标记 Q1-B 已完成 |

---

**End of ROADMAP.md**
