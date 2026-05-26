/**
 * 📖 教学面板：P26-P50 教学数据 + 渲染引擎
 */
(function () {
  "use strict";
  const D1 = window.__PEDAGOGY_DATA_P1 || {};
  const match = (location.pathname + location.hostname).match(/P(\d{2})/i) || document.title.match(/P(\d{2})/i);
  if (!match) return;
  const pid = "P" + match[1];

  const DATA2 = {
    P26: {
      goal: "掌握社交媒体 Bot 账号的行为特征识别，理解协同虚假行为（CIB）对公共舆论的操纵机制。",
      background: "社交媒体水军通常表现出异常行为模式：高频发帖（每分钟数十条）、高度同质化内容、密集的互相关注网络、以及非人类的活跃时间分布。Oxford Internet Institute 的研究表明，全球至少 81 个国家存在有组织的社交媒体操纵行为。网络科学中的'度分布'和'聚集系数'可以定量识别 Bot 集群。",
      refs: [
        "Bradshaw, S. & Howard, P.N. (2019). The Global Disinformation Order. Oxford Internet Institute",
        "Varol, O. et al. (2017). Online Human-Bot Interactions: Detection, Estimation, and Characterization. ICWSM 2017"
      ],
      reflect: [
        "在模拟网络中，Bot 集群和正常用户在网络拓扑上有什么可视的差异？",
        "如果你是平台审核员，你会用什么阈值来判定一个账号是 Bot？假阳性的代价是什么？"
      ]
    },
    P27: {
      goal: "学会识别隐私条款中的关键风险点，理解个人数据保护法律框架在新闻报道中的应用。",
      background: "隐私政策和用户协议通常以复杂法律语言写成，普通用户很少阅读。研究表明，完整阅读互联网上所有隐私政策需要约 76 个工作日。GDPR（欧盟通用数据保护条例）和 PIPL（中国个人信息保护法）对个人信息的收集、使用和跨境转移做出了严格规定。记者在报道中保护消息来源和受访者隐私，是最核心的职业伦理之一。",
      refs: [
        "McDonald, A.M. & Cranor, L.F. (2008). The Cost of Reading Privacy Policies. I/S: A Journal of Law and Policy",
        "Nissenbaum, H. (2010). Privacy in Context: Technology, Policy, and the Integrity of Social Life. Stanford UP"
      ],
      reflect: [
        "你分析的隐私条款中，有哪些数据收集行为超出了服务本身的合理需要？",
        "作为记者，在报道中引用受害者信息时，你的'隐私保护底线'在哪里？"
      ]
    },
    P28: {
      goal: "了解 Deepfake（深度伪造）技术的原理和检测方法，培养对合成媒体的批判性识别能力。",
      background: "Deepfake 技术基于对抗生成网络（GAN）或扩散模型，可以生成极其逼真的人脸替换视频和语音克隆。检测方法包括：像素级分析（面部边缘伪影、眼睛反光不一致）、频谱分析（GAN 生成的图像在频域有特征指纹）和生物特征分析（不自然的眨眼频率）。随着生成技术快速进化，检测与伪造之间的'军备竞赛'日趋激烈。",
      refs: [
        "Tolosana, R. et al. (2020). DeepFakes and Beyond: A Survey of Face Manipulation and Fake Detection. Information Fusion",
        "Chesney, R. & Citron, D.K. (2019). Deep Fakes: A Looming Challenge for Privacy, Democracy, and National Security. California Law Review"
      ],
      reflect: [
        "你能从放大的图像中识别出哪些 Deepfake 伪影？这些伪影为什么会产生？",
        "如果 Deepfake 技术发展到完全不可检测，新闻业应该如何应对？"
      ]
    },
    P29: {
      goal: "系统识别常见逻辑谬误，培养在新闻评论和公共辩论中发现推理错误的能力。",
      background: "逻辑谬误是表面上看似合理但实际上推理有误的论证。常见类型包括：稻草人谬误（歪曲对方观点），滑坡谬误（夸大因果链），诉诸权威（以身份代替证据），红鲱鱼（转移话题）。这些谬误在政治辩论、社交媒体争论和新闻评论中极为普遍。记者的批判性思维训练要求能够快速识别这些推理陷阱。",
      refs: [
        "Hamblin, C.L. (1970). Fallacies. Methuen",
        "Walton, D. (1995). A Pragmatic Theory of Fallacy. University of Alabama Press"
      ],
      reflect: [
        "在你最近阅读的新闻评论中，是否能找到至少一种逻辑谬误？它影响了你的判断吗？",
        "为什么逻辑谬误在社交媒体上特别有'传播力'？它利用了人类认知的什么弱点？"
      ]
    },
    P30: {
      goal: "掌握多源交叉核验（Cross-Check）的方法论，理解三角验证在新闻核查中的核心地位。",
      background: "交叉核验是新闻核查的金标准：任何关键事实至少需要两个独立来源的确认。三角验证（Triangulation）最初是地理测量术语，后被社会科学研究方法论采纳——通过不同方法、不同数据源或不同研究者的验证来增强结论的可信度。在假信息时代，单一消息源无论看起来多可靠，都不足以支撑发稿。",
      refs: [
        "Kovach, B. & Rosenstiel, T. (2014). The Elements of Journalism (3rd ed.). Three Rivers Press",
        "Denzin, N.K. (1978). The Research Act: A Theoretical Introduction to Sociological Methods. McGraw-Hill"
      ],
      reflect: [
        "你选择验证的信息是否有两个以上独立来源？来源之间是否真正'独立'（而非互相引用）？",
        "在什么情况下，你会接受只有一个来源的信息？你的判断标准是什么？"
      ]
    },
    P31: {
      goal: "通过互动叙事体验新闻伦理困境，理解功利主义、义务论和美德伦理在报道决策中的应用。",
      background: "新闻伦理没有简单的对错答案。功利主义（John Stuart Mill）追问'怎样做能使最多人受益'；义务论（Immanuel Kant）坚持'某些行为无论结果如何都不应做'（如未经同意公开私人信息）；美德伦理（Aristotle）问'一个有品格的记者会怎么做'。在灾难报道、涉及未成年人、消息来源保护等场景中，这三种伦理框架往往指向不同的行动方向。",
      refs: [
        "Ward, S.J.A. (2011). Ethics and the Media: An Introduction. Cambridge UP",
        "SPJ (Society of Professional Journalists). (2014). SPJ Code of Ethics. https://www.spj.org/ethicscode.asp"
      ],
      reflect: [
        "在你体验的伦理场景中，你做出的选择更接近哪种伦理框架？你对自己的选择满意吗？",
        "有没有某个场景让你感到'两难'？为什么这种感觉是健康的？"
      ]
    },
    P32: {
      goal: "学会使用滚动驱动叙事（Scrollytelling）技术讲述长篇新闻故事，理解交互叙事的设计原则。",
      background: "滚动叙事是数字新闻中最强大的沉浸式叙事形式之一。2012 年《纽约时报》的'Snow Fall'项目开创了这一体裁。其核心设计原则：文字和视觉元素随滚动渐次呈现，控制信息的'投喂节奏'；关键数据用固定（Sticky）元素持续在视口中；过渡动画用于暗示因果关系或时间推移。Intersection Observer API 是实现滚动触发的现代技术基础。",
      refs: [
        "Branch, J. (2012). Snow Fall: The Avalanche at Tunnel Creek. The New York Times",
        "Dowling, D. & Vogan, T. (2015). Can We 'Snowfall' This? Digital Journalism, 3(2), 209-224"
      ],
      reflect: [
        "你的滚动叙事中，哪些视觉/文字过渡最有效地引导了读者的注意力？",
        "滚动叙事与传统的图文混排报道相比，在'读者参与度'上有什么优势和劣势？"
      ]
    },
    P33: {
      goal: "学会使用卡片式左滑/右滑交互呈现新闻摘要，理解移动端信息消费的行为模式。",
      background: "Tinder 式的滑动交互（Swipe UI）利用了人类对二元判断的认知偏好和对触觉反馈的依赖。在新闻语境中，滑动可以用于快速筛选重要/不重要的信息、标记值得深读的文章、或评判新闻标题的可信度。但要注意，过度简化的二元交互（是/否）可能强化信息的极化消费。",
      refs: [
        "Banaji, M.R. & Greenwald, A.G. (2013). Blindspot: Hidden Biases of Good People. Bantam",
        "Toff, B. et al. (2021). Overcoming Indifference: What Attitudes Toward News Tell Us About Building Trust. Reuters Institute"
      ],
      reflect: [
        "你在'左滑/右滑'时，做出判断需要多长时间？这种速度是否足以进行深思熟虑的信息评估？",
        "滑动交互的'游戏化'是否可能让严肃的新闻判断变得过于轻率？"
      ]
    },
    P34: {
      goal: "了解对话式 AI 界面在新闻报告中的应用，学会用聊天式交互呈现调查性报道。",
      background: "对话式界面（Conversational UI）模拟人际对话的体验，降低了用户获取复杂信息的认知门槛。BBC、Quartz 等媒体已尝试用聊天机器人式界面推送新闻。这种格式特别适合：复杂事件的逐步解释、FAQ 式的政策解读、以及面向年轻受众的新闻消费。但要注意保持新闻内容的完整性——碎片化呈现可能导致关键上下文丢失。",
      refs: [
        "Dale, R. (2016). The Return of the Chatbots. Natural Language Engineering, 22(5), 811-817",
        "Linden, C.G. (2017). Decades of Automation in the Newsroom. Digital Journalism, 5(2), 123-140"
      ],
      reflect: [
        "对话式界面在呈现哪类新闻内容时效果最好？哪类内容不适合这种格式？",
        "如果读者只通过聊天机器人获取新闻，可能会遗漏什么重要的上下文信息？"
      ]
    },
    P35: {
      goal: "通过互动模拟体验信息茧房效应，理解推荐算法如何收窄用户的信息视野。",
      background: "信息茧房（Echo Chamber）和过滤气泡（Filter Bubble）描述了个性化推荐算法将用户封闭在同质化信息环境中的现象。Cass Sunstein 早在 2001 年就警告了'daily me'（只接收符合自己偏好的信息）的危险。Eli Pariser 在 2011 年提出'过滤气泡'概念后引发了广泛讨论。实证研究的结论较为复杂——算法过滤确实存在，但用户的主动选择行为可能是更强的因素。",
      refs: [
        "Sunstein, C. (2001). Republic.com. Princeton UP",
        "Pariser, E. (2011). The Filter Bubble: What the Internet Is Hiding from You. Penguin"
      ],
      reflect: [
        "在迷宫模拟中，你的'多样性分数'经过几轮选择后降到了什么水平？这个速度是否让你惊讶？",
        "你在日常使用社交媒体时，是否有意识地去接触不同立场的信息？为什么这样做很困难？"
      ]
    },
    P36: {
      goal: "理解视觉无障碍设计的必要性，通过模拟体验不同类型的视觉障碍以培养同理心。",
      background: "世界卫生组织估计全球有 22 亿人有不同程度的视觉障碍。色盲（影响约 8% 男性）、低视力、完全失明需要不同的设计策略。WCAG 2.1 提供了系统的无障碍设计标准，包括对比度、替代文本、键盘导航等。在新闻行业，确保可视化内容对所有人可访问不仅是伦理要求，也是法律义务（如美国的 ADA、中国的无障碍环境建设法）。",
      refs: [
        "WHO. (2019). World Report on Vision. World Health Organization",
        "W3C. (2018). Web Content Accessibility Guidelines (WCAG) 2.1"
      ],
      reflect: [
        "在模拟低视力的状态下浏览新闻网站，你能获取多少信息？这种体验说明了什么？",
        "你所在的新闻网站/项目是否通过了 WCAG AA 标准？需要哪些改进？"
      ]
    },
    P37: {
      goal: "理解沉默螺旋理论，通过 BBS 模拟体验多数意见的压力如何抑制少数声音的表达。",
      background: "Elisabeth Noelle-Neumann 于 1974 年提出沉默螺旋理论：人们倾向于观察舆论气候，如果感知自己的观点属于少数，就会倾向于保持沉默，从而形成恶性循环——沉默让少数意见看起来更加少数。在社交媒体时代，点赞数、转发量和评论情绪作为'准统计感官'（quasi-statistical sense），强化了这种螺旋效应。水军制造的虚假多数更是加剧了真实意见的压制。",
      refs: [
        "Noelle-Neumann, E. (1974). The Spiral of Silence: A Theory of Public Opinion. Journal of Communication, 24(2), 43-51",
        "Hampton, K.N. et al. (2014). Social Media and the Spiral of Silence. Pew Research Center"
      ],
      reflect: [
        "在模拟中，你是否在多数意见的压力下改变了自己的发言策略？这种改变是有意识的吗？",
        "在现实的社交媒体互动中，你是否曾因为担心被攻击而选择沉默？"
      ]
    },
    P38: {
      goal: "了解 VR/360° 新闻的沉浸式叙事潜力，理解'临场感'（Presence）对新闻共情的影响。",
      background: "虚拟现实新闻（Immersive Journalism）试图让观众'身临其境'地体验新闻事件——从叙利亚难民营到森林火灾现场。Nonny de la Peña 被称为'VR 新闻之母'，其 2012 年的作品'Hunger in Los Angeles'是该领域的开创性实验。研究表明，VR 新闻确实能增强观众的共情反应，但也引发了'灾难旅游'（Disaster Tourism）和'共情疲劳'（Empathy Fatigue）的伦理争议。",
      refs: [
        "de la Peña, N. et al. (2010). Immersive Journalism: Immersive Virtual Reality for the First-Person Experience of News. Presence, 19(4), 291-301",
        "Sánchez Laws, A.L. (2020). Can Immersive Journalism Enhance Empathy? Digital Journalism, 8(2), 213-228"
      ],
      reflect: [
        "VR 新闻是否让你对报道内容产生了更强的情感共鸣？这种共鸣是'好'的吗？",
        "在什么情况下，VR 新闻的沉浸感可能跨越了'告知'与'操纵'之间的界限？"
      ]
    },
    P39: {
      goal: "通过游戏化学习巩固媒体素养知识，理解游戏化（Gamification）在教育中的动机激活作用。",
      background: "打字防御游戏将媒体素养知识点转化为游戏机制：正确击落气泡代表正确识别虚假信息。游戏化学习利用了Mihaly Csikszentmihalyi 的'心流'理论——当任务难度与技能水平匹配时，学习者会进入高度专注的状态。Jane McGonigal 的研究表明，游戏机制可以显著提升学习动机和知识保留率。",
      refs: [
        "Csikszentmihalyi, M. (1990). Flow: The Psychology of Optimal Experience. Harper & Row",
        "Roozenbeek, J. & van der Linden, S. (2019). Fake news game confers psychological resistance against online misinformation. Palgrave Communications"
      ],
      reflect: [
        "你在游戏中对哪些题目反应最快/最慢？这反映了你在哪些知识领域的熟悉度差异？",
        "游戏化学习是否让你比阅读教科书更积极地参与？为什么？"
      ]
    },
    P40: {
      goal: "理解技术/创新采纳的 S 曲线模型，学会分析新闻业数字转型的扩散阶段。",
      background: "S 曲线（Sigmoid Curve）描述了技术在人群中从早期采纳到大规模扩散的典型路径。Everett Rogers 的创新扩散理论将采纳者分为五类：创新者（2.5%）、早期采纳者（13.5%）、早期多数（34%）、晚期多数（34%）和落后者（16%）。理解 S 曲线有助于新闻从业者判断新技术（如 AI 写作、VR 新闻）目前处于什么阶段，以做出合理的投资决策。",
      refs: [
        "Rogers, E.M. (2003). Diffusion of Innovations (5th ed.). Free Press",
        "Bass, F.M. (1969). A New Product Growth for Model Consumer Durables. Management Science, 15(5), 215-227"
      ],
      reflect: [
        "你认为 AI 辅助新闻写作目前处于 S 曲线的哪个阶段？你的判断依据是什么？",
        "作为新闻从业者，你是'早期采纳者'还是'晚期多数'？这对你的职业发展意味着什么？"
      ]
    },
    P41: {
      goal: "了解 AI Agent（智能体）的架构和工作流，理解 Agent 在新闻自动化中的应用前景。",
      background: "AI Agent 是具备感知环境、做出决策和执行行动能力的自主系统。在新闻领域，Agent 可以自动监控社交媒体热点、生成初步报道摘要、核查事实陈述、甚至管理内容分发。但'自动化偏差'（Automation Bias）——人类过度信任系统输出——是一个严重风险。编辑部必须建立'人在回路'（Human-in-the-Loop）机制。",
      refs: [
        "Wang, L. et al. (2024). A Survey on Large Language Model based Autonomous Agents. Frontiers of CS",
        "Diakopoulos, N. (2019). Automating the News: How Algorithms Are Rewriting the Media. Harvard UP"
      ],
      reflect: [
        "如果 AI Agent 可以自动化完成 80% 的新闻工作流程，编辑的角色会如何变化？",
        "你会信任一个 AI Agent 自动发布的新闻吗？需要什么条件你才会信任？"
      ]
    },
    P42: {
      goal: "学会用作品集（Portfolio）展示新闻作品，理解个人品牌建设在数字新闻时代的重要性。",
      background: "数字新闻时代的记者需要主动管理自己的专业形象。'个人品牌'不是自我推销，而是通过系统化地展示你的作品、专长和价值主张来建立专业公信力。一个好的新闻作品集应该展示：多样的报道类型、深度的调查能力、以及持续的专业发展轨迹。",
      refs: [
        "Molyneux, L. (2015). What Journalists Retweet: Opinion, Humor, and Brand Development on Twitter. Journalism, 16(7), 920-935",
        "Hedman, U. & Djerf-Pierre, M. (2013). The Social Journalist. Digital Journalism, 1(3), 368-385"
      ],
      reflect: [
        "你的作品集中，哪些作品最能体现你的'不可替代性'——即 AI 无法做到的能力？",
        "作为数字记者，你认为'个人品牌'与'新闻客观性'之间存在矛盾吗？"
      ]
    },
    P43: {
      goal: "了解播客（Podcast）作为新闻分发渠道的兴起，学会用简单技术制作新闻播客页面。",
      background: "播客是全球增长最快的媒体形式之一。Reuters 2023 年报告显示，34% 的受访者每月收听播客。音频新闻的独特优势在于'伴随性消费'——听众可以在通勤、运动中获取信息。对记者而言，播客提供了传统文字报道难以实现的'声音叙事'：环境音、受访者的语气和停顿，都传递着重要的情感信息。",
      refs: [
        "Newman, N. et al. (2023). Reuters Institute Digital News Report 2023",
        "Berry, R. (2016). Podcasting: Considering the Evolution of the Medium and its Association with the Word Radio. Radio Journal, 14(1), 7-22"
      ],
      reflect: [
        "在你常听的播客中，哪些'声音'元素（语调、环境音、音乐）对叙事效果贡献最大？",
        "与文字报道相比，播客形式在传递复杂数据和具体事实时有什么局限？"
      ]
    },
    P44: {
      goal: "体验翻页电子杂志（Flipbook）的互动阅读形式，理解数字出版的版式设计原则。",
      background: "翻页杂志模拟了纸质出版的翻页体验，同时融入了数字媒体的交互能力。在注意力经济时代，'物理隐喻'（Skeuomorphism）——让数字体验模拟物理体验——可以增加读者的参与感。但关键在于：版式设计必须服务于内容，而非相反。Edward Tufte 的'数据墨水比'原则同样适用于杂志排版。",
      refs: [
        "Tufte, E.R. (2001). The Visual Display of Quantitative Information (2nd ed.)",
        "Boczkowski, P.J. (2004). Digitizing the News: Innovation in Online Newspapers. MIT Press"
      ],
      reflect: [
        "翻页交互是否提升了你的阅读体验？还是仅仅是一种视觉花招？",
        "在移动端小屏幕上，翻页杂志的体验与长文滚动相比，哪种更适合新闻消费？"
      ]
    },
    P45: {
      goal: "掌握新闻简报（Newsletter）的策展和分发逻辑，理解邮件作为直接用户触达渠道的回归。",
      background: "在社交媒体算法不断削弱自然触达率的背景下，Newsletter（新闻简报）正在经历复兴。Substack、Revue 等平台让个人记者和独立媒体可以直接通过邮件将内容推送给订阅者，绕过平台算法的过滤。Newsletter 的核心价值是'策展'（Curation）——记者用专业判断力为读者筛选和解读信息，这种能力在信息泛滥时代越来越珍贵。",
      refs: [
        "Schmidt, T.R. et al. (2023). Understanding Email Newsletters. Digital Journalism, 11(9), 1704-1720",
        "Hendrickx, J. (2020). Journalism Innovation in the Platform Age: The Case of Newsletters. Journalism Practice"
      ],
      reflect: [
        "你订阅的 Newsletter 中，哪些最有价值？是因为独家内容还是因为策展角度？",
        "如果你要创建一份 Newsletter，你的'编辑方针'会是什么？你为读者提供什么独特价值？"
      ]
    },
    P46: {
      goal: "学会撰写信息公开申请（FOIA），理解信息公开制度在监督报道中的法律基础。",
      background: "信息自由法（Freedom of Information Act, FOIA）保障公民获取政府信息的权利。美国的 FOIA 于 1966 年颁布，中国的《政府信息公开条例》于 2008 年实施。信息公开申请是调查记者获取官方数据、内部文件和决策记录的法定渠道。许多重大调查报道——从水门事件到棱镜门——都依赖于信息公开制度。",
      refs: [
        "Cuillier, D. & Davis, C.N. (2019). The Art of Access: Strategies for Acquiring Public Records (2nd ed.). CQ Press",
        "中华人民共和国国务院. (2019). 中华人民共和国政府信息公开条例 (修订版)"
      ],
      reflect: [
        "你生成的信息公开申请在法律要件上是否完整？有没有可能被以'涉密'为由拒绝？",
        "如果申请被拒绝，你有哪些法律救济途径？"
      ]
    },
    P47: {
      goal: "掌握漏斗分析（Funnel Analysis）的方法，学会用转化率检验商业宣称的合理性。",
      background: "漏斗分析追踪用户从初始接触到最终转化的逐步流失率。在数据新闻中，漏斗可以用于检验企业的增长数据是否合理：如果一家公司声称年收入翻番但用户转化率远低于行业基准，数字的可信度就值得质疑。同理，漏斗分析也适用于检验政府政策的'预期受益人群'是否被层层筛选到极少数。",
      refs: [
        "Croll, A. & Yoskovitz, B. (2013). Lean Analytics: Use Data to Build a Better Startup Faster. O'Reilly",
        "Rogers, S. (2013). Facts Are Sacred: The Power of Data. Guardian Books"
      ],
      reflect: [
        "如果一家公司宣称 50% 的转化率但行业平均只有 2%，你会如何追问？需要哪些后续核查？",
        "在你的日常新闻消费中，是否遇到过被夸大的数据？漏斗思维如何帮助你辨别？"
      ]
    },
    P48: {
      goal: "利用间隔重复（Spaced Repetition）原理，通过闪卡训练强化新闻素养知识的长期记忆。",
      background: "间隔重复系统（SRS）基于 Hermann Ebbinghaus 的遗忘曲线理论：在即将遗忘的时间点复习，可以最大化记忆保留率。Leitner 盒子和 SuperMemo 算法是两种经典的 SRS 实现。将新闻素养知识点（术语定义、核查步骤、伦理原则）转化为闪卡，通过间隔重复训练，可以将短期记忆转化为可在实际工作中即时调用的长期知识。",
      refs: [
        "Ebbinghaus, H. (1885). Über das Gedächtnis. Duncker & Humblot",
        "Kang, S.H.K. (2016). Spaced Repetition Promotes Efficient and Effective Learning. Policy Insights from the Behavioral and Brain Sciences"
      ],
      reflect: [
        "经过间隔重复训练后，你对哪些知识点的记忆明显加强了？",
        "你认为新闻素养教育中，哪些知识点最需要'记住'（而不仅仅是'理解'）？"
      ]
    },
    P49: {
      goal: "了解 RSS（Really Simple Syndication）的工作原理，学会用信息聚合技术对抗算法推荐的局限性。",
      background: "RSS 是一种标准化的内容订阅协议，允许用户在一个阅读器中聚合多个信息源。与社交媒体的算法推送不同，RSS 给予用户完全的信息源控制权——你订阅什么就看到什么，没有算法过滤。在 Google Reader 关闭十年后，RSS 正在因为对算法推荐的反思而复兴。对新闻从业者而言，维护一份精心策展的 RSS 订阅列表是专业信息监测的基础设施。",
      refs: [
        "Winer, D. (2002). RSS 2.0 Specification. Berkman Center, Harvard Law School",
        "Madrigal, A.C. (2013). The Rise and Fall of Google Reader. The Atlantic"
      ],
      reflect: [
        "你当前的信息获取渠道有多少是由算法决定的？RSS 能如何改善你的信息饮食？",
        "如果你要为一个新闻编辑部建立 RSS 监控列表，你会订阅哪些来源？为什么？"
      ]
    },
    P50: {
      goal: "建立系统化的 OSINT 工具收藏和分类方法，理解开源情报调查的完整工作流程。",
      background: "OSINT（开源情报）是利用公开可获取的信息进行调查的方法论。Bellingcat 团队证明了公民调查者仅凭公开信息就能完成国家级的情报分析——从追踪 MH17 肇事导弹到识别 Skripal 中毒事件的嫌疑人。一个好的 OSINT 工具库需要覆盖：搜索引擎高级查询、社交媒体分析、地理空间情报（GEOINT）、数字取证和数据可视化等多个领域。",
      refs: [
        "Higgins, E. (2021). We Are Bellingcat: Global Crime, Online Sleuths, and the Bold Future of News. Bloomsbury",
        "Williams, H.J. & Blum, I. (2018). Defining Second Generation Open Source Intelligence (OSINT) for the Defense Enterprise. RAND Corporation"
      ],
      reflect: [
        "在你的 OSINT 书签中，哪些工具你最常用？哪些你还没有真正学会使用？",
        "OSINT 调查的'伦理红线'在哪里？获取公开信息是否等同于可以随意使用？"
      ]
    }
  };

  /* ── 合并数据 ── */
  const ALL = Object.assign({}, D1, DATA2);

  /* ── 渲染面板 ── */
  const d = ALL[pid];
  if (!d) return;

  const panel = document.createElement("div");
  panel.className = "pedagogy-panel";
  panel.innerHTML = `
    <button class="pedagogy-toggle" aria-expanded="false">
      <span class="arrow">▶</span>
      <span>📖 教学面板 — ${pid} 学习指引</span>
    </button>
    <div class="pedagogy-body">
      <div class="pedagogy-content">
        <div class="pedagogy-section">
          <h3>🎯 学习目标</h3>
          <p>${d.goal}</p>
        </div>
        <div class="pedagogy-section">
          <h3>📖 背景知识</h3>
          <p>${d.background}</p>
        </div>
        <div class="pedagogy-section">
          <h3>📚 学术参考</h3>
          <ol class="pedagogy-refs">${d.refs.map(r => `<li>${r}</li>`).join("")}</ol>
        </div>
        <div class="pedagogy-section">
          <h3>🤔 反思问题</h3>
          <div class="pedagogy-reflect">
            <ol>${d.reflect.map(q => `<li>${q}</li>`).join("")}</ol>
          </div>
        </div>
      </div>
    </div>
  `;

  const toggle = panel.querySelector(".pedagogy-toggle");
  toggle.addEventListener("click", () => {
    const open = panel.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });

  /* ── 插入到 DOM ── */
  const app = document.querySelector(".app") || document.querySelector("main") || document.body;
  const firstSection = app.querySelector("h1, h2, header, .hero");
  if (firstSection && firstSection.nextSibling) {
    firstSection.parentNode.insertBefore(panel, firstSection.nextSibling);
  } else {
    app.prepend(panel);
  }
})();
