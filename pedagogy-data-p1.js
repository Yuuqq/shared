/**
 * 📖 新闻素养教学面板 (Pedagogy Panel)
 * 自包含组件：自动检测工具 ID → 渲染折叠式教学面板
 * 包含：学习目标 · 背景知识 · 学术参考 · 反思问题
 */
(function () {
  "use strict";

  /* ── 样式注入 ── */
  const STYLE = document.createElement("style");
  STYLE.textContent = `
.pedagogy-panel{margin:16px auto;max-width:800px;border:1px solid var(--line,#e0d6cf);border-radius:var(--radius-md,10px);background:var(--card,#fff);overflow:hidden;font-size:.88rem;line-height:1.7;box-shadow:0 1px 3px rgba(0,0,0,.06)}
.pedagogy-toggle{width:100%;padding:14px 20px;background:linear-gradient(135deg,rgba(199,73,31,.08),rgba(199,73,31,.02));border:none;cursor:pointer;display:flex;align-items:center;gap:10px;font-size:.92rem;font-weight:600;color:var(--ink,#2c2418);text-align:left;transition:background .2s}
.pedagogy-toggle:hover{background:linear-gradient(135deg,rgba(199,73,31,.14),rgba(199,73,31,.05))}
.pedagogy-toggle .arrow{transition:transform .25s;font-size:.7rem}
.pedagogy-panel.open .pedagogy-toggle .arrow{transform:rotate(90deg)}
.pedagogy-body{max-height:0;overflow:hidden;transition:max-height .35s ease}
.pedagogy-panel.open .pedagogy-body{max-height:2000px}
.pedagogy-content{padding:0 20px 20px}
.pedagogy-section{margin-bottom:16px}
.pedagogy-section h3{font-size:.85rem;font-weight:700;color:var(--accent,#c7491f);margin:0 0 6px;display:flex;align-items:center;gap:6px}
.pedagogy-section p,.pedagogy-section li{color:var(--ink-secondary,#6b5e50);font-size:.84rem}
.pedagogy-section ul{margin:4px 0 0;padding-left:18px}
.pedagogy-refs{list-style:none;padding:0;margin:4px 0 0}
.pedagogy-refs li{padding:4px 0;border-bottom:1px solid var(--line,#e0d6cf);font-size:.8rem;color:var(--ink-secondary,#6b5e50)}
.pedagogy-refs li:last-child{border-bottom:none}
.pedagogy-reflect{background:rgba(199,73,31,.04);border-radius:var(--radius-sm,6px);padding:12px 14px;margin-top:8px}
.pedagogy-reflect li{margin-bottom:4px;font-style:italic}
`;
  document.head.appendChild(STYLE);

  /* ── 工具 ID 检测 ── */
  const url = location.pathname + location.hostname;
  const match = url.match(/P(\d{2})/i) || document.title.match(/P(\d{2})/i);
  if (!match) return;
  const pid = "P" + match[1];

  /* ── 教学内容库 ── */
  const DATA = {
    P00: null, // 学习中枢本身不需要
    P01: {
      goal: "理解不同大语言模型（LLM）在同一提示词下的输出差异，培养对 AI 生成内容的批判性评估能力。",
      background: "大语言模型的输出受训练数据、参数规模、对齐策略（RLHF）等因素影响，不同模型对同一问题的回答可能存在事实偏差、风格差异和幻觉倾向的显著区别。新闻从业者需要理解这种差异性，避免对任何单一 AI 输出盲目信任。",
      refs: [
        "Zhao, W.X. et al. (2023). A Survey of Large Language Models. arXiv:2303.18223",
        "Ouyang, L. et al. (2022). Training language models to follow instructions with human feedback. NeurIPS 2022"
      ],
      reflect: [
        "同一个问题，不同模型给出了怎样不同的回答？哪些差异涉及事实判断？",
        "如果你是编辑，你会如何决定采信哪个模型的输出？你的判断标准是什么？"
      ]
    },
    P02: {
      goal: "掌握文本情感分析的基本原理，理解情感极性判断在新闻报道倾向性检测中的应用。",
      background: "情感分析（Sentiment Analysis）是自然语言处理的核心任务之一。通过词典法或机器学习模型，可以自动判断文本的情感倾向（正面/负面/中性）。在新闻领域，情感分析可以揭示报道的立场偏向：同一事件的不同报道可能使用不同情感色彩的词汇，影响读者的判断。",
      refs: [
        "Liu, B. (2012). Sentiment Analysis and Opinion Mining. Morgan & Claypool",
        "Hamborg, F. et al. (2019). Automated identification of media bias in news articles. JCDL 2019"
      ],
      reflect: [
        "一篇看似客观的新闻报道，经过情感分析后是否显示出明显的情感倾向？",
        "情感分析工具的局限性在哪里？讽刺、反语等修辞手法会如何影响结果？"
      ]
    },
    P03: {
      goal: "了解语音识别（ASR）技术的工作原理，学会利用浏览器原生 Web Speech API 进行语音转文字。",
      background: "自动语音识别将声音信号转换为文字。现代 ASR 系统基于深度学习（如 Transformer 架构的 Whisper 模型），识别准确率已接近人类水平，但在噪声环境、方言、专业术语方面仍有局限。记者可以用 ASR 加速采访记录，但必须人工校对——未经核实的转录可能引入'幻听'错误。",
      refs: [
        "Radford, A. et al. (2023). Robust Speech Recognition via Large-Scale Weak Supervision (Whisper). ICML 2023",
        "W3C Web Speech API Specification. https://wicg.github.io/speech-api/"
      ],
      reflect: [
        "Web Speech API 的转录结果与你听到的原文有哪些出入？这些误差可能造成什么影响？",
        "如果一段采访录音的转录结果被直接发布，可能引发什么新闻伦理问题？"
      ]
    },
    P04: {
      goal: "识别新闻文本中的行话和专业术语，理解'信息不对称'如何阻碍公众对公共事务的理解。",
      background: "政府公文、法律文书和学术报告中充斥着普通读者难以理解的术语。这种'行话壁垒'不仅降低了信息的可达性（Accessibility），还可能被有意利用来模糊关键信息。Plain Language 运动主张公共信息应使用清晰易懂的语言，这也是新闻工作者的核心职责之一——将复杂信息翻译成公众能理解的语言。",
      refs: [
        "Kimble, J. (2006). Lifting the Fog of Legalese. Carolina Academic Press",
        "Schriver, K.A. (2017). Plain Language in the US Gains Momentum. IEEE Trans. Professional Communication"
      ],
      reflect: [
        "你选择分析的文本中，哪些术语对普通读者构成了理解障碍？",
        "如何在保持准确性的前提下，将这些术语'翻译'成通俗语言？"
      ]
    },
    P05: {
      goal: "学会使用 Flesch 可读性指标评估新闻文本的阅读难度，理解可读性与信息传播效果的关系。",
      background: "Flesch Reading Ease 公式基于句子长度和音节数量计算文本的阅读难度，分数越高越容易阅读（60-70 分适合普通公众）。AP（美联社）写作风格指南推荐新闻写作保持在 8 年级阅读水平。AI 生成的文本往往呈现异常均匀的句长和可读性分数，这也是检测 AI 内容的一个辅助指标。",
      refs: [
        "Flesch, R. (1948). A New Readability Yardstick. Journal of Applied Psychology, 32(3), 221-233",
        "DuBay, W.H. (2004). The Principles of Readability. Impact Information"
      ],
      reflect: [
        "你分析的新闻文本的 Flesch 分数是多少？目标读者能轻松理解吗？",
        "对比人类写作和 AI 写作的可读性分数，你发现了什么规律？"
      ]
    },
    P06: {
      goal: "掌握提示词工程（Prompt Engineering）的核心原则，学会构建有效的新闻采编提示词。",
      background: "提示词是人与 AI 交互的接口。好的提示词需要明确任务目标、提供上下文、指定输出格式和约束条件。在新闻场景中，提示词工程可以辅助稿件润色、标题生成、事实摘要等任务，但记者必须理解：AI 对提示词的'服从'并不等于输出的'正确'。",
      refs: [
        "White, J. et al. (2023). A Prompt Pattern Catalog to Enhance Prompt Engineering with ChatGPT. arXiv:2302.11382",
        "Reynolds, L. & McDonell, K. (2021). Prompt Programming for Large Language Models. CHI EA 2021"
      ],
      reflect: [
        "同一个新闻任务，不同结构的提示词产生了怎样不同的结果？",
        "你能否设计一个提示词，让 AI 拒绝生成虚假信息？这说明了提示词的什么局限？"
      ]
    },
    P07: {
      goal: "理解内容分发平台（微信公众号）的排版规范，学会将 Markdown 转换为平台适配格式。",
      background: "微信公众号是中国最重要的媒体分发平台之一，其编辑器对 HTML/CSS 有严格限制（不支持外部样式表、JavaScript）。Markdown 到微信排版的转换涉及内联样式注入、图片处理、代码高亮等技术。理解平台技术约束是数字时代记者的必备技能。",
      refs: [
        "Gruber, J. (2004). Markdown: Syntax. https://daringfireball.net/projects/markdown/",
        "Newman, N. et al. (2023). Reuters Institute Digital News Report 2023"
      ],
      reflect: [
        "为什么微信公众号不支持外部 CSS？这种技术限制对内容创作有什么影响？",
        "作为数字记者，你认为了解分发平台的技术规范为什么重要？"
      ]
    },
    P08: {
      goal: "通过互动测验检验和巩固新闻核查知识，理解 AI 幻觉（Hallucination）现象及其对新闻报道的影响。",
      background: "AI 幻觉是指大语言模型生成看似合理但实际虚假的信息，包括虚构引用、编造统计数据和错误归因。研究表明，GPT-4 生成的学术引用中约 30-70% 是完全虚构的。对新闻工作者而言，任何 AI 辅助生成的事实性内容都必须经过独立核实。",
      refs: [
        "Ji, Z. et al. (2023). Survey of Hallucination in Natural Language Generation. ACM Computing Surveys",
        "Huang, L. et al. (2023). A Survey on Hallucination in Large Language Models. arXiv:2311.05232"
      ],
      reflect: [
        "你在测验中答错的题目揭示了你在核查知识上的哪些盲区？",
        "为什么 AI 会'自信地'生成错误信息？这对你使用 AI 辅助报道有什么启示？"
      ]
    },
    P09: {
      goal: "了解 SSML（语音合成标记语言）的结构，掌握用标记控制语音合成的语调、停顿和语速。",
      background: "SSML 是 W3C 标准，允许开发者精细控制文本到语音（TTS）的输出效果。在播客制作、新闻音频化的趋势下，SSML 让记者可以控制 AI 朗读新闻的方式——在关键数据处放慢语速，在引用处改变语调。这是'音频新闻学'（Audio Journalism）的技术基础。",
      refs: [
        "W3C. (2010). Speech Synthesis Markup Language (SSML) Version 1.1. https://www.w3.org/TR/speech-synthesis11/",
        "Dowling, D. & Vogan, T. (2015). Can We 'Snowfall' This? Digital Journalism, 3(2), 209-224"
      ],
      reflect: [
        "同一段新闻文本，不同的 SSML 标记如何改变了听感？哪种设置最适合新闻播报？",
        "AI 驱动的新闻播报与人类主播相比，优势和局限分别是什么？"
      ]
    },
    P10: {
      goal: "掌握 AIGC（AI 生成内容）检测的核心指标——困惑度（Perplexity）和爆发度（Burstiness），理解其统计学原理。",
      background: "困惑度衡量语言模型对文本的'惊讶程度'：AI 生成的文本因为遵循模型的概率分布，困惑度通常较低（模型对自己的输出最不惊讶）。爆发度衡量句长的方差：人类写作天然有长短句交错的节奏感，而 AI 文本句长分布更均匀。这两个指标结合使用可以辅助判断文本是否为 AI 生成。",
      refs: [
        "Gehrmann, S. et al. (2019). GLTR: Statistical Detection and Visualization of Generated Text. ACL 2019",
        "Mitchell, E. et al. (2023). DetectGPT: Zero-Shot Machine-Generated Text Detection. ICML 2023"
      ],
      reflect: [
        "你测试的文本的困惑度和爆发度指标分别是多少？它们指向什么结论？",
        "AI 检测工具有误判的可能吗？如果一篇人类写的文章被误判为 AI 生成，会有什么后果？"
      ]
    },
    P11: {
      goal: "学会使用数据清洗工具处理脏数据，理解数据质量对新闻报道可靠性的决定性影响。",
      background: "真实世界的数据充满错误：缺失值、重复行、格式不一致、异常值。数据新闻学的第一步不是可视化，而是清洗。'Garbage In, Garbage Out'——如果基础数据有误，再漂亮的图表也是在传播错误信息。CSV（逗号分隔值）是最常见的数据交换格式，但它在编码、分隔符、引号处理上有诸多陷阱。",
      refs: [
        "Meyer, P. (2002). Precision Journalism: A Reporter's Introduction to Social Science Methods (4th ed.)",
        "Bradshaw, P. (2017). The Data Journalism Handbook 2. European Journalism Centre"
      ],
      reflect: [
        "你清洗数据时发现了哪些问题？如果直接使用未清洗的数据制图，结论会有什么不同？",
        "记者在使用政府公开数据时，应该做哪些数据质量检查？"
      ]
    },
    P12: {
      goal: "理解本福特定律的数学原理，学会将其作为数据造假的初步筛查工具。",
      background: "本福特定律（Benford's Law）描述了自然产生的数据集中，首数字的分布规律：1 出现的概率约 30.1%，2 约 17.6%，9 仅约 4.6%。人工编造的数据往往不符合这一分布，因此本福特检验常用于会计审计和选举舞弊检测。该方法由 Frank Benford 于 1938 年系统论证，但早在 1881 年 Simon Newcomb 就注意到了对数表前几页磨损更严重的现象。",
      refs: [
        "Benford, F. (1938). The Law of Anomalous Numbers. Proceedings of the APS, 78(4), 551-572",
        "Nigrini, M.J. (2012). Benford's Law: Applications for Forensic Accounting, Auditing, and Fraud Detection. Wiley"
      ],
      reflect: [
        "你测试的数据集是否符合本福特分布？偏离的程度说明了什么？",
        "本福特定律有什么局限？什么类型的数据不适合用它检验？"
      ]
    },
    P13: {
      goal: "掌握桑基图（Sankey Diagram）的信息表达逻辑，学会用流量图揭示资源分配的结构性问题。",
      background: "桑基图以线条宽度表示流量大小，直觉地呈现资源从源头到终点的分配路径。它最初由 Matthew Sankey 用于展示蒸汽机的能量损耗，如今广泛应用于预算分析、能源审计和供应链可视化。在数据新闻中，桑基图可以清晰揭示'钱从哪里来、花到哪里去'。",
      refs: [
        "Riehmann, P. et al. (2005). Interactive Sankey Diagrams. IEEE InfoVis 2005",
        "Cairo, A. (2016). The Truthful Art. New Riders"
      ],
      reflect: [
        "你创建的桑基图揭示了资源分配中的哪些不均衡现象？",
        "与柱状图或饼图相比，桑基图在呈现'流向'信息时有什么独特优势？"
      ]
    },
    P14: {
      goal: "学会用时间轴叙事呈现新闻事件的发展脉络，理解时序可视化在调查报道中的关键作用。",
      background: "时间轴是调查报道的核心工具之一。通过将事件按时间顺序排列，记者可以发现被孤立报道所掩盖的规律：事件的频率在加速吗？关键决策和后果之间有多长的时间差？谁在什么时候知道了什么？这些问题只有在时间维度上才能被有效追踪。",
      refs: [
        "Tufte, E.R. (2001). The Visual Display of Quantitative Information (2nd ed.)",
        "Brehmer, M. et al. (2017). Timelines Revisited: A Design Space and Considerations for Expressive Storytelling. IEEE TVCG"
      ],
      reflect: [
        "将事件放到时间轴上后，你发现了哪些在单篇报道中不明显的模式？",
        "时间轴的哪些设计选择（间隔、标注、分段）会影响读者对事件严重性的判断？"
      ]
    },
    P15: {
      goal: "理解地理信息在新闻叙事中的作用，学会用互动地图增强报道的空间维度。",
      background: "故事地图（Story Map）将叙事与地理位置绑定，让读者'跟随'事件在空间中展开。从空气污染热点到难民迁徙路线，地理可视化揭示了纯文字报道难以传达的空间关系。Esri 的 StoryMaps 和开源的 Leaflet 是这一领域的代表工具。地理数据的准确性和隐私保护（避免暴露敏感地点）是需要特别注意的伦理问题。",
      refs: [
        "Segel, E. & Heer, J. (2010). Narrative Visualization: Telling Stories with Data. IEEE TVCG",
        "Rosling, H. et al. (2018). Factfulness. Flatiron Books"
      ],
      reflect: [
        "你的故事地图中，地理位置的选择是否暴露了特定群体的隐私？",
        "相比纯文本叙事，地图叙事在哪些方面增强了你对事件的理解？"
      ]
    },
    P16: {
      goal: "学会用树图（Treemap）分层呈现预算数据，理解面积编码在预算透明度中的应用。",
      background: "树图用嵌套矩形的面积来编码层次化数据的数值大小，是呈现预算构成的有力工具。《纽约时报》和《卫报》的交互式预算可视化都采用了树图。Ben Shneiderman 于 1992 年发明了树图算法，最初用于可视化磁盘空间使用情况。在公共财政领域，树图让公民可以直觉地感知'纳税人的每一块钱花在了哪里'。",
      refs: [
        "Shneiderman, B. (1992). Tree Visualization with Tree-Maps: 2-D Space-Filling Approach. ACM TOG, 11(1), 92-99",
        "Johnson, B. & Shneiderman, B. (1991). Tree-Maps: A Space-Filling Approach to the Visualization of Hierarchical Information Structures. IEEE Visualization"
      ],
      reflect: [
        "从树图中，你能快速识别出预算占比最大和最小的项目吗？",
        "面积编码和柱状图的高度编码相比，人类在感知上的误差有什么不同？"
      ]
    },
    P17: {
      goal: "掌握前后对比（Before-After）可视化技术，理解视觉对比在新闻解释中的说服力。",
      background: "前后对比滑块是新闻可视化中最直觉的交互形式之一。从卫星影像到城市变迁，'之前 vs 之后'的直接对比比任何数据表格都更有冲击力。但要注意，对比的有效性取决于：两张图的拍摄条件是否一致（角度、光线、季节），以及是否存在选择性展示（Cherry Picking）——只展示变化最剧烈的区域。",
      refs: [
        "Bostock, M. et al. (2011). D3: Data-Driven Documents. IEEE TVCG",
        "Kennedy, H. & Hill, R.L. (2018). The Feeling of Numbers: Emotions in Everyday Engagements with Data. Sociology"
      ],
      reflect: [
        "你选择的前后对比图片，拍摄条件是否一致？光线和角度差异是否影响了对比效果？",
        "如何避免'Cherry Picking'——即只选择支持自己结论的对比图片？"
      ]
    },
    P18: {
      goal: "理解竞速柱图（Bar Chart Race）的动态叙事能力，学会用时间动画揭示趋势变化。",
      background: "竞速柱图通过动画展示排名随时间的演变，是近年最流行的数据可视化形式之一。它的叙事力量在于'竞赛'的隐喻：观众自然会关注'谁在超越谁'。但这种格式也有风险——动画可能过度强调短期波动，掩盖长期趋势。数据可视化大师 Alberto Cairo 警告：动画应服务于数据叙事，而非取代静态图表的精确性。",
      refs: [
        "Chalabi, M. (2019). Why Bar Chart Races Went Viral. The Guardian",
        "Cairo, A. (2019). How Charts Lie: Getting Smarter about Visual Information. W.W. Norton"
      ],
      reflect: [
        "观看竞速柱图时，你的注意力集中在排名前列的竞争者上。这种注意力偏差可能遗漏了什么？",
        "如果将动画暂停在不同时间点，你得出的结论会有什么不同？"
      ]
    },
    P19: {
      goal: "理解色彩无障碍设计原则，学会使用对比度检测确保可视化内容对色盲用户友好。",
      background: "全球约 8% 的男性和 0.5% 的女性有某种形式的色觉缺陷。如果新闻图表仅依赖颜色区分数据系列，这些读者将无法获取关键信息。WCAG 2.1 AA 标准要求文本与背景的对比度至少为 4.5:1（大号文本 3:1）。设计者应使用色盲友好的调色板，并用形状、纹理、标签等辅助手段补充颜色编码。",
      refs: [
        "W3C. (2018). Web Content Accessibility Guidelines (WCAG) 2.1. https://www.w3.org/TR/WCAG21/",
        "Okabe, M. & Ito, K. (2008). Color Universal Design (CUD). J*Fly Data Depository"
      ],
      reflect: [
        "你的调色板在色盲模拟下是否仍能区分不同数据系列？如果不能，你会如何改进？",
        "为什么无障碍设计不仅仅是'对残障人士友好'，而是'对所有人都更好的设计'？"
      ]
    },
    P20: {
      goal: "了解词云的信息表达局限性，学会结合情感分析增强词频可视化的分析深度。",
      background: "词云将词频映射为字号大小，是最常见也最受争议的可视化形式。批评者指出词云缺乏精确性（人类无法准确比较面积差异）、忽略了词的语境和共现关系。当词云与情感分析结合时（积极词=暖色、消极词=冷色），它的分析价值得到提升，但仍然不是严谨数据分析的替代品。",
      refs: [
        "Hearst, M.A. & Rosner, D. (2008). Tag Clouds: Data Analysis Tool or Social Signaller? HICSS 2008",
        "Viégas, F.B. & Wattenberg, M. (2008). TIMELINES: Tag Clouds and the Case for Vernacular Visualization. Interactions"
      ],
      reflect: [
        "词云中字号最大的词是否真的是文本的'核心主题'？还是仅仅因为它是高频功能词？",
        "如果你是编辑，你会在严肃调查报道中使用词云吗？为什么？"
      ]
    },
    P21: {
      goal: "掌握 EXIF 元数据在数字取证中的作用，学会从图片中提取地理坐标、设备型号和时间戳。",
      background: "EXIF（Exchangeable Image File Format）是嵌入在 JPEG/TIFF 文件中的元数据标准。它记录了拍摄设备（制造商、机型）、时间（精确到秒）、GPS 坐标（如果设备启用了定位）和相机参数（光圈、快门、ISO）。在 OSINT（开源情报）调查中，EXIF 是验证图片真伪的第一步。但要注意：社交媒体平台通常会剥离 EXIF 数据以保护用户隐私。",
      refs: [
        "JEIDA. (2002). EXIF Version 2.2 Standard. JEITA CP-3451",
        "Bellingcat. (2021). Digital Forensics: EXIF Data Analysis. Bellingcat Investigation Toolkit"
      ],
      reflect: [
        "你测试的图片是否包含 GPS 坐标？如果包含，这些信息可能暴露了什么？",
        "为什么社交媒体平台会自动剥离 EXIF？作为调查记者，你如何应对这个挑战？"
      ]
    },
    P22: {
      goal: "理解阴影方位分析在地理验证中的原理，学会通过太阳高度角和方位角推算拍摄时间和地点。",
      background: "太阳在天空中的位置由纬度、日期和时间唯一确定。因此，照片中的阴影方向和长度可以反推拍摄的大致时间和地点。SunCalc 等工具基于天文算法计算任意时间地点的太阳高度角和方位角。Bellingcat 在 MH17 空难调查中使用阴影分析确定了关键视频的拍摄时间，成为 OSINT 调查的经典案例。",
      refs: [
        "Meeus, J. (1998). Astronomical Algorithms (2nd ed.). Willmann-Bell",
        "Higgins, E. (2021). We Are Bellingcat: Global Crime, Online Sleuths, and the Bold Future of News. Bloomsbury"
      ],
      reflect: [
        "输入不同的坐标和时间后，阴影角度如何变化？你能否反推一张照片的拍摄时间？",
        "这种分析方法的精度取决于什么因素？在阴天是否还能使用？"
      ]
    },
    P23: {
      goal: "掌握 Google Dork 高级搜索语法，学会用结构化查询进行开源情报检索。",
      background: "Google Dorking 是利用搜索引擎的高级运算符（site:, filetype:, inurl:, intitle: 等）进行精确信息检索的技术。它是 OSINT 调查的基础能力：通过组合运算符，调查记者可以在公开互联网上找到数据库泄露、未受保护的文件服务器，或特定域名下的非公开页面。合法使用 Dorking 是记者职业技能的一部分，但不得用于未授权访问。",
      refs: [
        "Long, J. (2005). Google Hacking for Penetration Testers. Syngress",
        "Bazzell, M. (2023). OSINT Techniques: Resources for Uncovering Online Information (10th ed.)"
      ],
      reflect: [
        "使用 filetype:pdf site:gov.cn 搜索到了哪些公共文档？这些文档是否容易被普通搜索找到？",
        "Dorking 获取的信息在法律上是否属于'公开信息'？使用时有什么伦理边界？"
      ]
    },
    P24: {
      goal: "学会使用多引擎反向图片搜索追溯图片来源，理解反向搜索在打击'旧图新用'虚假信息中的关键作用。",
      background: "反向图片搜索（Reverse Image Search）是数字新闻核查的核心工具。通过将图片而非关键词作为搜索输入，可以找到图片的最早出处——从而判断一张声称是'最新现场照'的图片是否实际上是多年前的旧照。Google Lens、Yandex 和 TinEye 三个引擎使用不同的算法，建议交叉使用以提高召回率。",
      refs: [
        "Wardle, C. & Derakhshan, H. (2017). Information Disorder. Council of Europe Report",
        "Silverman, C. (Ed.) (2014). Verification Handbook. European Journalism Centre"
      ],
      reflect: [
        "你搜索的图片在不同引擎中返回了相同的结果吗？差异说明了什么？",
        "如果反向搜索找不到任何结果，是否就意味着图片是原创的？还有哪些可能的解释？"
      ]
    },
    P25: {
      goal: "了解网页历史归档（Web Archive）的原理，学会使用 Wayback Machine 追溯已删除或修改的网页内容。",
      background: "Wayback Machine（由 Internet Archive 运营）自 1996 年起对全球网页进行定期快照归档，目前已存储超过 8000 亿个网页快照。对调查记者而言，Wayback Machine 是追溯'被删除的证据'的关键工具：政治人物修改过的竞选承诺、公司删除的产品声明、被撤下的新闻报道——只要曾经在网上存在过，Wayback Machine 可能就有存档。",
      refs: [
        "Kahle, B. (2007). Universal Access to All Knowledge. American Archivist, 70(1), 23-31",
        "Ainsworth, S.G. et al. (2011). How Much of the Web Is Archived? JCDL 2011"
      ],
      reflect: [
        "选择一个重要网站，查看它 5 年前和今天的版本有什么变化？这些变化是否'值得报道'？",
        "如果一个关键网页既被删除了也没有被 Wayback Machine 归档，还有什么替代方法可以获取？"
      ]
    }
  };

  // Part 2 will be appended
  window.__PEDAGOGY_DATA_P1 = DATA;
})();
