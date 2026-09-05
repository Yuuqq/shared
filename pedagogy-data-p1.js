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
.pedagogy-panel.open .pedagogy-body{max-height:4000px}
.pedagogy-content{padding:14px 20px 20px}
.pedagogy-section{margin-bottom:16px}
.pedagogy-section h3{font-size:.85rem;font-weight:700;color:var(--accent,#c7491f);margin:0 0 6px;display:flex;align-items:center;gap:6px}
.pedagogy-section p,.pedagogy-section li{color:var(--ink-secondary,#6b5e50);font-size:.84rem}
.pedagogy-section ul{margin:4px 0 0;padding-left:18px}
.pedagogy-refs{list-style:none;padding:0;margin:4px 0 0}
.pedagogy-refs li{padding:4px 0;border-bottom:1px solid var(--line,#e0d6cf);font-size:.8rem;color:var(--ink-secondary,#6b5e50)}
.pedagogy-refs li:last-child{border-bottom:none}
.pedagogy-reflect{background:rgba(199,73,31,.04);border-radius:var(--radius-sm,6px);padding:12px 14px;margin-top:8px}
.pedagogy-reflect li{margin-bottom:4px;font-style:italic}
.pedagogy-module{font-weight:600;color:var(--accent,#c7491f)}
.pedagogy-terms li{margin-bottom:4px}
.pedagogy-exercise li{margin-bottom:8px}
.pedagogy-terms b{color:var(--ink,#2c2418)}
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
      ],
      module: "第9章 AIGC与新闻写作（篇Ⅲ 实操篇 · Tier 1 实验工具）",
      terms: [
        "<b>幻觉 Hallucination</b>：AI 自信地编造看似合理却虚假的信息，使用前必须核实。",
        "<b>AIGC（AI Generated Content）</b>：AI 生成的内容，新闻中引用的每处事实都需人工核验。",
        "<b>人机协同 Human-AI Collaboration</b>：AI 负责生成初稿、人负责核实把关的分工模式。"
      ],
      exercise: [
        "【教材实验 2.1】目标：测量不同模型的幻觉率。步骤：准备 5 个确知答案的事实性问题，分别输入至少 2 个大模型；逐条核实并标记“正确/部分正确/幻觉”；填入对比表。产出物/完成标准：一张“模型×问题”对比表，并分析幻觉率与问题类型的关系。",
        "【教材实验 9.2】目标：比较模型的新闻写作质量。步骤：用同一新闻写作提示词请求 2-3 个模型生成同题稿件；从事实准确性、流畅度、结构、幻觉、多余建议五个维度逐项对比。产出物/完成标准：五维度对比表+一段选稿结论，说明你会采信哪一版及理由。"
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
      ],
      module: "第8章 非结构化信息的智能处理（篇Ⅱ 方法篇 · Tier 1 实验工具）",
      terms: [
        "<b>情感分析 Sentiment Analysis</b>：用算法自动判断文本倾向正面、负面还是中性。",
        "<b>自然语言处理 NLP</b>：让计算机理解人类语言的技术，情感分析是其经典任务。",
        "<b>可读性 Readability</b>：文本易读程度指标，与情感色彩共同影响传播效果。"
      ],
      exercise: [
        "【教材实验 8.1】目标：评估词典法情感分析的准确率。步骤：收集 10 条不同媒体的新闻标题，正面、负面、中性各 3-4 条；逐条输入工具，记录得分与影响得分的关键词；统计误判情形；再自造一条“反讽标题”测试词典法的局限。产出物/完成标准：结果记录表+200 字方法局限性分析，能说清反讽标题被误判的原因。"
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
      ],
      module: "第8章 非结构化信息的智能处理（篇Ⅱ 方法篇 · 拓展工具）",
      terms: [
        "<b>自然语言处理 NLP</b>：语音转文字是 NLP 的分支，深度学习大幅提升准确率。",
        "<b>幻觉 Hallucination</b>：ASR 在噪声、方言中会“幻听”出原文没有的字词。",
        "<b>人机协同 Human-AI Collaboration</b>：机器转录加人工校对，才是安全的协同流程。"
      ],
      exercise: [
        "目标：检验录音条件对转写准确率的影响。步骤：录制约 1 分钟“某市地铁调价听证会”模拟采访，分别在安静环境与有背景噪音时各读一遍；用工具转写并对照原文标出每处错误。产出物/完成标准：两份带错误标记的转写稿，并算出噪音环境的错误数是安静环境的多少倍。"
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
      ],
      module: "第8章 非结构化信息的智能处理（篇Ⅱ 方法篇 · 拓展工具）",
      terms: [
        "<b>可读性 Readability</b>：行话堆砌会拉低可读性，阻碍公众理解公共事务。",
        "<b>命名实体识别 NER</b>：自动识别文本中的人名、机构名与专业术语等实体。",
        "<b>自然语言处理 NLP</b>：术语检测与通俗化改写建议都依托 NLP 技术。"
      ],
      exercise: [
        "目标：拆除公共文件中的“行话壁垒”。步骤：粘贴一段 300 字左右的“某市地铁调价听证会公告”，运行分析并记录被标出的术语；为其中 5 个术语各写一句大白话改写。产出物/完成标准：一张“原术语/通俗改写”对照表，5 处改写均不损失原意。"
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
      ],
      module: "第8章 非结构化信息的智能处理（篇Ⅱ 方法篇 · Tier 1 实验工具）",
      terms: [
        "<b>可读性 Readability</b>：Flesch 分数越高越易读，60-70 分适合普通公众。",
        "<b>句子爆发性 Sentence Burstiness</b>：长短句交错的节奏感，直接影响阅读难度。",
        "<b>自然语言处理 NLP</b>：可读性计算是基于句长与词汇量的文本量化任务。"
      ],
      exercise: [
        "【教材实验 8.2】目标：比较三类媒体的可读性差异。步骤：从大众媒体、财经媒体、学术媒体各摘取 300 字以上文本；逐段输入工具，记录平均句长、词汇复杂度与综合得分；对比三类媒体差异并讨论其与目标读者的关系。产出物/完成标准：三类媒体对比表+300 字分析，能解释分数差异与读者定位的对应关系。"
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
      ],
      module: "第4章 提示词工程学：与AI对话的方法论（篇Ⅰ 理论篇 · 拓展工具）",
      terms: [
        "<b>副驾驶模式 Copilot Mode</b>：人主导决策、AI 辅助执行，提示词质量决定效果。",
        "<b>自动驾驶模式 Autopilot Mode</b>：把任务全权交给 AI，新闻场景中风险极高。",
        "<b>幻觉 Hallucination</b>：再好的提示词也无法根除幻觉，输出仍须独立核实。"
      ],
      exercise: [
        "目标：验证提示词结构对输出质量的影响。步骤：以“把 200 字地铁调价通稿改写成短视频口播稿”为任务，先用一句模糊提示、再用“角色+任务+要求+格式”四要素提示各执行一次；从任务完成度、事实保留、字数控制三方面对比两版输出。产出物/完成标准：两版提示词与输出对照表，指出至少 2 处由结构差异导致的质量差别。"
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
      ],
      module: "第9章 AIGC与新闻写作（篇Ⅲ 实操篇 · 拓展工具）",
      terms: [
        "<b>可读性 Readability</b>：字号、行距、段距等排版选择塑造移动端阅读体验。",
        "<b>AIGC（AI Generated Content）</b>：AI 生成的 Markdown 初稿，排版后方可分发。",
        "<b>视觉编码 Visual Encoding</b>：用字号与颜色等视觉通道传达内容的层级关系。"
      ],
      exercise: [
        "目标：完成一次公众号适配排版。步骤：撰写一篇含多级标题、列表、引用与图片占位的 400 字 Markdown 短讯（主题：某市地铁调价听证会召开）；用工具转换为微信格式并预览；按手机宽度检查标题层级、行距与图片显示。产出物/完成标准：转换后的预览结果，无样式丢失、层级清晰，可直接粘贴进公众号后台。"
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
      ],
      module: "第2章 人机协同的理论框架（篇Ⅰ 理论篇 · 拓展工具）",
      terms: [
        "<b>幻觉 Hallucination</b>：AI 编造看似合理却虚假的信息，是核查测验的核心考点。",
        "<b>人机协同 Human-AI Collaboration</b>：把核实环节留给人，是使用 AI 的底线。",
        "<b>副驾驶模式 Copilot Mode</b>：AI 提供线索、人做判断的协作方式。",
        "<b>三层代理权模型 Three-Layer Proxy Model</b>：划分哪些任务可托付给 AI 的权限层级框架。"
      ],
      exercise: [
        "目标：摸清个人核查知识盲区。步骤：完成工具内全部测验题并记录得分；将错题按“幻觉识别、信源核验、数据核查”归类，找出最薄弱一类；针对该类查阅本页参考文献补学后复测错题。产出物/完成标准：错题归因清单+复测记录，复测正确率达到 80% 以上。"
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
      ],
      module: "第8章 非结构化信息的智能处理（篇Ⅱ 方法篇 · 拓展工具）",
      terms: [
        "<b>自然语言处理 NLP</b>：文本转语音（TTS）是 NLP 技术链条的输出端。",
        "<b>情感分析 Sentiment Analysis</b>：先判断文本情感，再据此设计朗读语调与语速。",
        "<b>可读性 Readability</b>：书面语改口语播报，需兼顾“易读”与“易听”。"
      ],
      exercise: [
        "目标：用 SSML 改善新闻播报听感。步骤：取一段 100 字“地铁调价方案”快讯，先不加标记合成一次；再为关键数字（如“上调 0.5 元”）加停顿与放慢标记、为引语改变语调，二次合成；对比试听两次结果。产出物/完成标准：听感对比笔记，标记版的数字信息明显更易听清，并能说明至少 1 处标记的作用。"
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
      ],
      module: "第9章 AIGC与新闻写作（篇Ⅲ 实操篇 · Tier 1 实验工具）",
      terms: [
        "<b>困惑度 Perplexity</b>：模型对文本的“惊讶度”，AI 文本的困惑度通常偏低。",
        "<b>爆发性 Burstiness</b>：文本节奏的起伏程度，人类写作普遍高于 AI 文本。",
        "<b>句子爆发性 Sentence Burstiness</b>：句长方差指标，长短交错是人类写作特征。",
        "<b>AIGC（AI Generated Content）</b>：AI 生成内容，即本工具的检测对象。"
      ],
      exercise: [
        "【教材实验 9.1】目标：用困惑度与爆发性判别 AI 文本。步骤：准备三段文本——自己写的 300 字、AI 同主题生成的 300 字、人工改写后的 AI 文本；分别检测困惑度、爆发性与综合判定；重点观察改写后指标的变化，并讨论可能的误判情形。产出物/完成标准：三段文本指标记录表+400 字分析，须含对误判情形的讨论。"
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
      ],
      module: "第5章 新闻数据的获取与管理（篇Ⅱ 方法篇 · Tier 1 实验工具）",
      terms: [
        "<b>数据清洗 Data Cleaning</b>：修正缺失、重复与格式错误，是数据分析的第一步。",
        "<b>数据脱敏 Data Anonymization</b>：清洗时抹去姓名、证件号等个人标识信息。",
        "<b>暗数据 Dark Data</b>：沉睡在表格中未被利用的数据，清洗后可能变成新闻线索。"
      ],
      exercise: [
        "目标：完成一次端到端的数据清洗。步骤：用工具内置示例或自备一份含缺失值、重复行、日期格式混乱的“某市地铁各线路日客流量”CSV；按“去重→补缺→统一格式→校验数值范围”流程清洗；导出结果并记录每步删除或修改的行数。产出物/完成标准：清洗日志+干净的 CSV，无重复行、日期格式统一、数值均在合理区间。"
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
      ],
      module: "第5章 新闻数据的获取与管理（篇Ⅱ 方法篇 · Tier 1 实验工具）",
      terms: [
        "<b>本福特定律 Benford's Law</b>：自然数据的首位数字呈稳定分布，1 约占三成。",
        "<b>抽样检验 Sampling Inspection</b>：从大数据集中抽取样本做本福特符合性检验。",
        "<b>数据清洗 Data Cleaning</b>：检验前须剔除负数与文本值，否则分布失真。"
      ],
      exercise: [
        "目标：用本福特定律筛查疑似造假数据。步骤：录入一组真实统计数（如某省各市一般公共预算收入，至少 50 条，可用工具示例数据），查看首位数字分布与理论值的吻合度；再手工编造 30 个“看起来随机”的金额录入，对比两组分布。产出物/完成标准：两组首数字分布对比+50 字结论，能指出编造组在哪些数字上明显偏离。"
      ],
      prereq: "建议先完成：P11 数据清洗工具"
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
      ],
      module: "第10章 数据新闻可视化实践（篇Ⅲ 实操篇 · Tier 1 实验工具）",
      terms: [
        "<b>桑基图 Sankey Diagram</b>：以线条宽度呈现流量从源头到去向的分配结构。",
        "<b>视觉编码 Visual Encoding</b>：把数值映射为线条宽度、颜色等图形属性。",
        "<b>前注意属性 Pre-attentive Attributes</b>：粗细与颜色可被读者在一瞬间感知比较。"
      ],
      exercise: [
        "目标：用桑基图揭示资金流向。步骤：为“某市地铁调价后新增票款”设定 3 个来源（票价收入、财政补贴、广告收入）与 4 个去向（运营、维护、安保、票务优惠），编造合理金额；在工具中录入并生成桑基图。产出物/完成标准：一张桑基图，线条宽度与金额成比例、来源合计等于去向合计，并写出 50 字读图结论。"
      ],
      prereq: "建议先完成：P11 数据清洗工具"
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
      ],
      module: "第10章 数据新闻可视化实践（篇Ⅲ 实操篇 · Tier 1 实验工具）",
      terms: [
        "<b>视觉编码 Visual Encoding</b>：用位置、长度与时间刻度呈现事件先后序列。",
        "<b>前注意属性 Pre-attentive Attributes</b>：给关键节点加醒目颜色，读者一眼捕捉。",
        "<b>滚动叙事 Scrollytelling</b>：随滚动逐段展开的时间轴，是常见新闻叙事形式。"
      ],
      exercise: [
        "目标：为公共事件建立时间轴。步骤：围绕“某市地铁调价”梳理 6-8 个关键节点（听证会公告、方案公示、征求意见、修改、批复、实施等）；按时间顺序录入事件、日期与一句话说明；为转折性节点设置醒目标记。产出物/完成标准：不少于 6 个节点的时间轴，时间无错序，且能读出“决策与后果之间的时间差”。"
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
      ],
      module: "第10章 数据新闻可视化实践（篇Ⅲ 实操篇 · Tier 1 实验工具）",
      terms: [
        "<b>故事地图 StoryMap</b>：把叙事段落与地理位置绑定的互动地图形式。",
        "<b>视觉编码 Visual Encoding</b>：以标记的颜色与大小表达各地点的属性差异。",
        "<b>可访问性 Accessibility</b>：地图须配文字描述，照顾读屏与方向感弱的读者。"
      ],
      exercise: [
        "目标：制作一张本地新闻故事地图。步骤：选一条地铁新线，收集沿线 5 个站点的新闻事件（开通日期、客流、周边商圈变化等）；在工具中为每个地点标注位置、图片占位与 100 字以内叙述；按线路顺序编排浏览动线。产出物/完成标准：含 5 个以上地点的故事地图，每个地点都有时间、事件、来源三项信息。"
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
      ],
      module: "第10章 数据新闻可视化实践（篇Ⅲ 实操篇 · 拓展工具）",
      terms: [
        "<b>视觉编码 Visual Encoding</b>：树图以矩形面积编码数值，用嵌套表达层级。",
        "<b>前注意属性 Pre-attentive Attributes</b>：深浅配色帮助读者瞬间锁定最大板块。",
        "<b>数据—墨水比 Data-ink Ratio</b>：删去多余边框与装饰，让面积本身传达信息。"
      ],
      exercise: [
        "目标：用树图拆解预算构成。步骤：录入“某市交通年度预算”两级数据（一级：地铁、公交、道路等；二级：如地铁下分运营、建设、补贴），金额自拟但两级合计须一致；生成树图并检查面积与金额是否成比例；调整配色突出最大板块。产出物/完成标准：两级树图+50 字读图结论，能直接指出占比最大与最小的二级项目。"
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
      ],
      module: "第11章 多媒体与沉浸式新闻（篇Ⅲ 实操篇 · Tier 1 实验工具）",
      terms: [
        "<b>沉浸式新闻 Immersive Journalism</b>：让读者直观“亲临”现场感受前后变化。",
        "<b>滚动叙事 Scrollytelling</b>：拖动滑块逐段揭示画面的交互叙事方式。",
        "<b>可访问性 Accessibility</b>：对比图须配文字图注，兼顾无法看图的读者。"
      ],
      exercise: [
        "目标：完成一组经得起推敲的前后对比。步骤：选取同一机位的“地铁新线开通前/后街景”两张图（可用工具示例图）；核对两图角度、光线、季节是否一致后加载进滑块工具；撰写 100 字图注，注明拍摄时间与来源。产出物/完成标准：可拖动的对比作品+规范图注，图注交代拍摄条件且无选择性取景问题。"
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
      ],
      module: "第10章 数据新闻可视化实践（篇Ⅲ 实操篇 · 拓展工具）",
      terms: [
        "<b>视觉编码 Visual Encoding</b>：以柱长与排名位置随时间动态编码数值变化。",
        "<b>前注意属性 Pre-attentive Attributes</b>：运动与变色引导注意，也可能夸大波动。",
        "<b>数据—墨水比 Data-ink Ratio</b>：过度动画装饰会稀释数据本身的信息量。"
      ],
      exercise: [
        "目标：用竞速柱图呈现排名演变并保持严谨。步骤：整理 5 个城市近 10 年地铁运营里程数据（可用统计年鉴或工具示例数据），录入生成竞速柱图；在第 1、5、10 年三个时点暂停并截图核对排名。产出物/完成标准：动画作品+三张暂停截图，截图排名与源数据一致，并写出 1 条“动画可能掩盖长期趋势”的风险提示。"
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
      ],
      module: "第10章 数据新闻可视化实践（篇Ⅲ 实操篇 · 拓展工具）",
      terms: [
        "<b>可访问性 Accessibility</b>：图表应对色盲用户友好，对比度需达 WCAG AA 标准。",
        "<b>前注意属性 Pre-attentive Attributes</b>：形状、纹理可作为颜色之外的识别通道。",
        "<b>视觉编码 Visual Encoding</b>：不能仅靠色相区分数据系列，应做冗余编码。"
      ],
      exercise: [
        "目标：修复一张色盲不友好的新闻图表。步骤：用红绿配色的“各线路客流对比”柱状图（可用工具示例）运行检测，记录色盲模拟下的混淆情况；改用色盲友好调色板，并叠加纹理或数值标签；复测对比度至达标。产出物/完成标准：修改前后对照截图，复测达到 WCAG AA（4.5:1），灰度模式下各系列仍可区分。"
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
      ],
      module: "第10章 数据新闻可视化实践（篇Ⅲ 实操篇 · 拓展工具）",
      terms: [
        "<b>视觉编码 Visual Encoding</b>：词云以字号编码词频，但人眼比较面积并不精确。",
        "<b>情感分析 Sentiment Analysis</b>：为高频词标注正负色彩，可增强词云的分析力。",
        "<b>前注意属性 Pre-attentive Attributes</b>：最大字号与暖色总是最先被读者注意到。"
      ],
      exercise: [
        "目标：批判性地使用词云。步骤：粘贴 800 字左右“某市地铁调价听证会”报道全文生成词云；记录字号最大的 5 个词，判断它们是主题词还是高频虚词；开启情感标色（积极暖色、消极冷色）再次生成并对照。产出物/完成标准：两版词云截图+150 字说明，指出词云至少 1 个局限并提出 1 项改进设置（如停用词表）。"
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
      ],
      module: "第13章 事实核查与开源情报（篇Ⅳ 反思篇 · Tier 1 实验工具）",
      terms: [
        "<b>开源情报 OSINT</b>：只用公开信息核验线索的调查方法，EXIF 检验是第一步。",
        "<b>深度伪造 Deepfake</b>：AI 伪造图像泛滥，元数据核验的意义随之上升。",
        "<b>数据脱敏 Data Anonymization</b>：社交平台剥离 EXIF 坐标，正是一种隐私脱敏。"
      ],
      exercise: [
        "目标：体验元数据的核查价值与流失。步骤：选一张不含敏感位置的手机原图（如校园活动照）或工具示例图，检测并记录设备、时间、GPS 字段；把该图发到社交平台再下载，重新检测并对比字段变化。产出物/完成标准：两次检测对照表，能指出平台剥离了哪些字段及其对核查的影响。"
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
      ],
      module: "第13章 事实核查与开源情报（篇Ⅳ 反思篇 · Tier 1 实验工具）",
      terms: [
        "<b>开源情报 OSINT</b>：借助太阳方位等公开规律推算影像拍摄时空的核查手段。",
        "<b>深度伪造 Deepfake</b>：光影是否合理，是识别伪造影像的关键物理线索。",
        "<b>人机协同 Human-AI Collaboration</b>：工具算出候选时刻，最终判断由人完成。"
      ],
      exercise: [
        "目标：用阴影反推照片拍摄时间。步骤：选一张有清晰阴影的户外新闻照片（如“地铁开通仪式”示例图），估读影子的方向与长短；在工具中输入拍摄地坐标与候选日期，滑动时间找出阴影与照片吻合的时刻；换一个日期重复并比较差异。产出物/完成标准：推断出的拍摄时间区间+推理记录，能说出至少 2 个影响精度的因素。"
      ],
      prereq: "建议先完成：P21 EXIF 元数据分析"
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
      ],
      module: "第13章 事实核查与开源情报（篇Ⅳ 反思篇 · 拓展工具）",
      terms: [
        "<b>开源情报 OSINT</b>：Dorking 是 OSINT 的基础检索技能，只使用公开渠道。",
        "<b>暗数据 Dark Data</b>：挂在服务器上却几乎无人查阅的公开文件，Dorking 可定位。",
        "<b>数据脱敏 Data Anonymization</b>：搜到的文件可能含未脱敏的个人信息，引用须谨慎。"
      ],
      exercise: [
        "目标：用高级检索语法定位官方文件。步骤：围绕“某市地铁调价听证会”设计 3 条检索式（如 site:gov.cn 地铁 票价 听证、filetype:pdf 地铁 调价 方案、intitle:听证会 地铁）；逐一执行并记录命中结果；核对最相关文件的发布机构与日期。产出物/完成标准：3 条检索式+结果清单，至少 1 条命中官方来源，并能说明每个运算符的作用。"
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
      ],
      module: "第13章 事实核查与开源情报（篇Ⅳ 反思篇 · 拓展工具）",
      terms: [
        "<b>开源情报 OSINT</b>：反向搜图是核查“旧图新用”的标准 OSINT 流程。",
        "<b>深度伪造 Deepfake</b>：AI 生成图可能查无历史记录，须结合多线索判断。",
        "<b>人机协同 Human-AI Collaboration</b>：引擎返回候选来源，采信与否由记者判断。"
      ],
      exercise: [
        "目标：核查一张热传的“现场图”。步骤：从社交平台选取一条“某市地铁突发积水”热传配图（或教师提供的示例图），分别提交 Google Lens、Yandex、TinEye 三个引擎；记录各引擎最早收录时间与原始出处；综合三边结果下判断。产出物/完成标准：三引擎对照表+“旧图新用/无法证实/首发原创”三选一结论及依据。"
      ],
      prereq: "建议先完成：P21 EXIF 元数据分析"
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
      ],
      module: "第6章 网络信息自动采集（篇Ⅱ 方法篇 · 拓展工具）",
      terms: [
        "<b>暗数据 Dark Data</b>：被删除或改版的网页旧版本，存档中可能仍可找回。",
        "<b>开源情报 OSINT</b>：网页历史快照是 OSINT 取证常用的证据来源。",
        "<b>数据脱敏 Data Anonymization</b>：旧快照可能保留他人已删除的隐私，引用须谨慎。"
      ],
      exercise: [
        "目标：追溯被修改的网页内容。步骤：选取一个发布过“地铁调价方案征求意见”的政府或媒体页面；在 Wayback Machine 中找到征求意见期与正式发布后的历史快照；逐项比对票价、优惠幅度等关键条款的变化并记录快照日期。产出物/完成标准：版本对照笔记，至少找出 1 处实质性修改，并注明两个快照的确切日期与网址。"
      ]
    }
  };

  // Part 2 will be appended
  window.__PEDAGOGY_DATA_P1 = DATA;
})();
