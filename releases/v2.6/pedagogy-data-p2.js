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
      module: "第7章 社交媒体数据挖掘（篇Ⅱ 方法篇 · Tier 2 实验工具）",
      terms: [
        "<b>网络科学（Network Science）</b>：用度分布、聚集系数等指标刻画账号关系网，定位异常集群。",
        "<b>围墙花园（Walled Garden）</b>：平台数据封闭不对外开放，水军识别只能依靠行为与拓扑特征。",
        "<b>协同虚假行为（CIB）</b>：批量账号协同发帖制造虚假多数，是水军雷达的核心识别目标。"
      ],
      exercise: [
        "<b>剿灭水军阵列</b>：① 载入默认示例网络，辨认力导向图中的真实网民、疑似水军与舆论攻击目标三类节点；② 在“网络特征提取台”按介数中心性与发帖时间差排序，记录分值最高的 5 个账号；③ 应用图过滤规则高亮疑似集群。产出物：一份含 5 个账号 ID、度数与聚集系数的排查表。完成标准：圈出节点全部落在同一红色集群内，误伤的真实网民不超过 1 个。",
        "<b>校准判定阈值</b>：① 将协同发帖时间差阈值从 60 秒逐档收紧到 5 秒；② 每档记录疑似水军数量与命中率；③ 找出误报最少的临界档位。完成标准：填出 4 档对照表，并用一句话说明阈值过严可能漏放的水军风险。"
      ],
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
      module: "第14章 新闻传播中的AI伦理（篇Ⅳ 反思篇 · 拓展工具）",
      terms: [
        "<b>知情同意（Informed Consent）</b>：用户在充分知情下自愿授权，是隐私条款合规的核心要件。",
        "<b>数据最小化（Data Minimization）</b>：只收集提供服务所必需的数据，超出即涉嫌过度收集。",
        "<b>个人信息保护法（PIPL）</b>：2021 年施行，确立个人信息处理的知情、同意与最小必要原则。",
        "<b>第三方共享（Third-party Sharing）</b>：App 将用户数据交给外部机构，是高亮仪的重点标记对象。"
      ],
      exercise: [
        "<b>体检一款新闻 App 的隐私条款</b>：① 将任一新闻类 App 隐私政策中“数据收集与使用”段落粘贴进“协议文本”框；② 运行内置词典（永久授权/第三方共享/精准定位）生成高亮；③ 阅读“风险汇总”与“命中摘要”。产出物：一份含至少 3 条命中摘录的风险清单。完成标准：每条摘录都标注了“过度收集/授权过宽/共享不透明”三类定性之一。",
        "<b>扩充检测词典</b>：① 从条款中找出词典未覆盖的可疑表述（如“用于改进服务”式兜底授权）；② 将关键词加入自定义词典后重新运行；③ 对比前后命中数量变化。完成标准：新关键词至少新增 1 处有效命中，并写明其对应的法律风险。"
      ],
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
      module: "第9章 AIGC与新闻写作（篇Ⅲ 实操篇 · 拓展工具）",
      terms: [
        "<b>深度伪造（Deepfake）</b>：用生成模型替换人脸或克隆语音的合成内容，是放大镜的检测对象。",
        "<b>合成媒体（Synthetic Media）</b>：AI 生成的图像、音视频等内容的统称。",
        "<b>AIGC（AI-Generated Content）</b>：人工智能生成内容，涵盖 AI 写作、绘画与深度伪造。"
      ],
      exercise: [
        "<b>放大镜找破绽</b>：① 载入示例人脸（或一张存疑的网络热传照片），放大至 4 倍以上；② 依次检查眼睛反光、牙齿边缘、发丝与耳廓过渡区；③ 对照“Deepfake 检查清单”逐项勾选。产出物：一张标注 2 处可疑伪影的截图。完成标准：能说明每处伪影对应的生成技术成因（如 GAN 边缘伪影、眨眼频率异常）。",
        "<b>真假图盲测</b>：① 请同伴向示例图库混入 6 张真假混合图片；② 仅凭放大镜在 5 分钟内完成真伪标注；③ 核对答案统计命中率。完成标准：命中率不低于 4/6，并写出一条“最容易被骗的破绽类型”。"
      ],
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
      module: "第13章 事实核查与开源情报（篇Ⅳ 反思篇 · Tier 2 实验工具）",
      terms: [
        "<b>稻草人谬误（Straw Man）</b>：歪曲对方观点再加以攻击，新闻评论中最常见的谬误之一。",
        "<b>滑坡谬误（Slippery Slope）</b>：断言小步骤必然引发灾难性连锁后果，缺乏中间论证。",
        "<b>红鲱鱼（Red Herring）</b>：用无关话题转移焦点，常见于危机公关回应与网络论战。"
      ],
      exercise: [
        "<b>评论区谬误归类</b>：① 进入第 1 关，把 6 张评论卡片逐一拖入对应的“谬误目标槽”；② 提交后在“学习面板”逐题查看解析；③ 打开“谬误图鉴”补录 3 组易混谬误的辨别信号。产出物：“本关错题”清零的通关记录。完成标准：6 张卡片至少 5 张归类正确，易混组各写一句区分要点。",
        "<b>自制谬误题干</b>：① 从真实新闻评论区找 1 条含谬误的留言；② 先自行判断类型，再用“搜索谬误”框核对定义；③ 抄录原句并写出识别信号。完成标准：识别信号同时包含“信号词”和“反问”两个要素。"
      ],
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
      module: "第13章 事实核查与开源情报（篇Ⅳ 反思篇 · Tier 2 实验工具）",
      prereq: "建议先完成：P24 假新闻溯源多线程聚合台",
      terms: [
        "<b>信源交叉验证（Cross-source Verification）</b>：关键事实至少由两个独立信源确认后才能发稿。",
        "<b>开源情报（OSINT）</b>：利用公开信息开展调查的方法论，交叉核验是其核心环节。",
        "<b>三角验证（Triangulation）</b>：用不同方法或不同来源相互印证，增强结论可信度。"
      ],
      exercise: [
        "<b>给热点声明找独立信源</b>：① 输入关键词“气候变化 碳中和”（或点击示例按钮）；② 点击“推荐组合”选取 3 类核查信源；③ 点击“发射已选信源”多站检索同一声明；④ 比对各信源表述与数据口径。产出物：导出的核查清单（含信源列表与结论栏）。完成标准：至少 2 个信源相互独立（非转载关系）且注明发布时间。注意：涉及外部网站检索，须在教师指导下合法合规进行。",
        "<b>识别“伪独立”信源</b>：① 任选一条待核声明，追查 2 个检索结果的首发出处；② 发现同源（转载/通稿）即替换信源重新发射；③ 在清单备注栏标注每个信源的独立性判定。完成标准：最终清单中信源两两不同源，且各有 1 句判定理由。"
      ],
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
      module: "第14章 新闻传播中的AI伦理（篇Ⅳ 反思篇 · Tier 2 实验工具）",
      terms: [
        "<b>功利主义（Utilitarianism）</b>：以“最大多数人的最大福祉”权衡报道决策的伦理框架。",
        "<b>义务论（Deontology）</b>：某些行为无论后果如何都不应做，如未经同意公开隐私。",
        "<b>美德伦理（Virtue Ethics）</b>：追问“有品格的记者会怎么做”，聚焦行动者而非规则。"
      ],
      exercise: [
        "<b>灾场报道的两难抉择</b>：① 完整游玩“遇难者身份是否公开”场景，在每个分支先写下直觉选择再确认；② 通关后打开“决策路径”回看全部节点；③ 给每个选择贴上功利主义/义务论/美德伦理标签。产出物：一张标注伦理框架的决策路径图。完成标准：至少 1 个节点能说明三种框架指向不同行动。",
        "<b>换框架重玩</b>：① 选一个已通关场景，改用“义务论优先”策略重新决策；② 对比两次结局差异；③ 用 100 字记录哪次更接近你的职业底线。完成标准：两次路径至少 2 个节点选择不同，且差异可追溯到伦理框架。"
      ],
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
      module: "第11章 多媒体与沉浸式新闻（篇Ⅲ 实操篇 · Tier 2 实验工具）",
      terms: [
        "<b>滚动叙事（Scrollytelling）</b>：内容随滚动渐次呈现的长篇报道形式，脚手架的核心体裁。",
        "<b>沉浸式新闻（Immersive Journalism）</b>：让读者“进入”新闻现场的叙事总称，滚动叙事是其形态之一。",
        "<b>交叉观察器（Intersection Observer）</b>：监听元素进入视口的浏览器 API，滚动触发的技术基础。"
      ],
      exercise: [
        "<b>给气候报道加一幕</b>：① 通读示例《升温的警钟》，记录各幕（引言/冰川消融/极端天气/海平面/转折点）的触发时机；② 在“冰川消融”与“极端天气频发”之间新增一幕“北极圈 38℃”；③ 仿照现有结构写入文字与图表占位并绑定滚动触发。产出物：新增一幕且可正常触发的页面。完成标准：新幕文字不超过 120 字，触发点位于视口下三分之一处。",
        "<b>节奏自检</b>：① 请同伴以正常速度滚动你的故事；② 记录停留超过 5 秒与被快速跳过的幕；③ 据此调整该幕信息量后复测。完成标准：修改后各幕停留时间差异不超过一倍。"
      ],
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
      module: "第14章 新闻传播中的AI伦理（篇Ⅳ 反思篇 · Tier 2 实验工具）",
      terms: [
        "<b>滑动交互（Swipe UI）</b>：左滑右滑的二元触控判断，本工具用于稿件快速取舍。",
        "<b>游戏化（Gamification）</b>：把游戏机制引入工作流程，可提速但可能弱化深思。",
        "<b>沉默的螺旋（Spiral of Silence）</b>：二元快判迎合多数偏好，可能挤压少数派选题。"
      ],
      exercise: [
        "<b>十分钟选题快判</b>：① 进入“主编的权柄”，对 10 张稿件卡片连续左滑（毙）右滑（留）；② 不回看不犹豫，凭第一反应完成；③ 打开“决策记录”复核每张卡片的题材与信源数。产出物：一份留稿清单与毙稿理由摘要。完成标准：能指出至少 1 次“因标题吸睛而误留”的决策。",
        "<b>快判 vs 慢判对照</b>：① 用 10 分钟重新审阅你毙掉的稿件；② 标记值得回收的稿件并各写一句理由；③ 对比两轮清单差异。完成标准：回收 1-2 篇稿件，并写 80 字反思滑动交互对编辑判断的影响。"
      ],
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
      module: "第9章 AIGC与新闻写作（篇Ⅲ 实操篇 · 拓展工具）",
      terms: [
        "<b>AIGC（AI-Generated Content）</b>：人工智能生成内容，聊天体报道可由 AI 辅助起草脚本。",
        "<b>对话式界面（Conversational UI）</b>：模拟聊天的信息呈现方式，降低复杂报道的阅读门槛。",
        "<b>碎片化消费（Snackable Content）</b>：以短碎片呈现新闻，易丢失关键上下文。"
      ],
      exercise: [
        "<b>把通报改成聊天体</b>：① 将一则警方通报（或示例文本）拆成 6-8 条对话气泡；② 在生成器中为每条气泡设置发言人（警方/记者/目击者）与时间戳；③ 生成预览并通读。产出物：一篇聊天体报道页面。完成标准：5W 要素齐全，单条气泡不超过 60 字。",
        "<b>上下文完整性检查</b>：① 请同伴仅读你的聊天体版本并复述事件要素；② 对照原文标出其遗漏或误解的信息；③ 补写 1-2 条承上启下的“记者旁白”气泡。完成标准：补写后复述遗漏不超过 1 处，且旁白气泡有明确视觉标识。"
      ],
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
      module: "第15章 媒介素养与受众分析（篇Ⅳ 反思篇 · Tier 2 实验工具）",
      terms: [
        "<b>信息茧房（Information Cocoon）</b>：只接触同类信息导致视野收窄，迷宫所模拟的现象。",
        "<b>过滤气泡（Filter Bubble）</b>：算法按偏好过滤内容，把用户封闭在同质信息中。",
        "<b>回音室（Echo Chamber）</b>：相似观点在封闭圈层内反复回响并不断强化。"
      ],
      exercise: [
        "<b>跑一轮“舒适路径”</b>：① 从起点出发，每步都选自己最想看的内容直至走出迷宫；② 打开“操作历史”查看多样性分数曲线；③ 记录最终分数与最低分出现的步数。产出物：一条完整选择轨迹与分数截图。完成标准：最终分数低于初始值，并能指出从第几步开始大幅下降。",
        "<b>刻意绕开茧房</b>：① 重置迷宫，本轮强制每 3 步至少选 1 个陌生立场内容；② 对比两条多样性曲线的终点差；③ 写 100 字说明“主动策略”是否有效。完成标准：第二轮最终分数高于第一轮，并给出至少 1 条日常可迁移的做法。"
      ],
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
      module: "第10章 数据新闻可视化实践（篇Ⅲ 实操篇 · 拓展工具）",
      terms: [
        "<b>可访问性（Accessibility）</b>：让视障等用户也能获取内容的设计标准，如 WCAG。",
        "<b>替代文本（Alt Text）</b>：图片的文字描述，是读屏软件获取图像信息的唯一渠道。",
        "<b>对比度（Contrast Ratio）</b>：文字与背景的亮度比，WCAG AA 要求不低于 4.5:1。"
      ],
      exercise: [
        "<b>在“失明模式”下读新闻</b>：① 开启全盲模拟，浏览“示例新闻”版块 3 分钟；② 仅凭读屏顺序记录你能获取的信息点；③ 切回正常模式对照遗漏。产出物：“可获得/完全丢失”两栏信息清单。完成标准：丢失栏至少列出 2 项（如缺替代文本的图片、仅靠颜色区分的警示）。",
        "<b>修复一处无障碍缺陷</b>：① 从丢失清单挑 1 项，对照“WCAG 无障碍规范说明”找到对应条款；② 给出具体修复方案（如补写 alt 文本）；③ 再次模拟验证。完成标准：修复项在盲模式下可被读出，并注明所依据的 WCAG 条款。"
      ],
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
      module: "第14章 新闻传播中的AI伦理（篇Ⅳ 反思篇 · Tier 2 实验工具）",
      prereq: "建议先完成：P26 协同水军雷达",
      terms: [
        "<b>沉默的螺旋（Spiral of Silence）</b>：感知自己属少数时趋于沉默，多数意见因此更显多数。",
        "<b>多智能体模拟（ABM）</b>：用大量自主个体模拟舆论演化，是本实验台的底层方法。",
        "<b>准统计感官（Quasi-statistical Sense）</b>：人们估测意见气候的能力，点赞数是其现代形态。"
      ],
      exercise: [
        "<b>复现一次沉默螺旋</b>：① 在“参数”面板把多数意见压力调至高位，运行论坛模拟；② 记录少数意见发帖量随时间的变化；③ 把压力调至低位重跑一遍对照。产出物：两轮运行的趋势记录。完成标准：高压轮次少数意见帖量明显衰减，且能用“准统计感官”解释成因。",
        "<b>注入水军观察虚假多数</b>：① 在高压设定下逐步上调水军（虚假账号）比例；② 观察真实少数派沉默速度的变化；③ 在“解读”面板核对理论预期。完成标准：能说出水军比例与沉默加速的关系，并写一句对平台审核的启示。"
      ],
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
      module: "第11章 多媒体与沉浸式新闻（篇Ⅲ 实操篇 · 拓展工具）",
      terms: [
        "<b>沉浸式新闻（Immersive Journalism）</b>：以第一人称“进入”新闻现场的报道形式。",
        "<b>临场感（Presence）</b>：用户感到“身在现场”的心理状态，是 VR 新闻的核心效果指标。",
        "<b>共情疲劳（Empathy Fatigue）</b>：高强度沉浸体验反复触发后，情感反应逐渐钝化。"
      ],
      exercise: [
        "<b>全景找线索</b>：① 载入示例 360° 新闻场景（如灾民安置点）；② 拖拽视角环视一周，找出 3 处叙事热点并记录方位；③ 开启引导旁白复看，对比有无解说时的发现差异。产出物：热点方位与信息清单。完成标准：3 处热点全部找到，并写出无引导时遗漏的那一处。",
        "<b>临场感与伦理自评</b>：① 结束浏览后给自己 1-5 分临场感评分并说明理由；② 对照“灾难旅游”争议写 100 字自评；③ 为该场景拟一条观看前提示语。完成标准：提示语包含情感准备与随时退出方式两点。"
      ],
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
      module: "第15章 媒介素养与受众分析（篇Ⅳ 反思篇 · 拓展工具）",
      terms: [
        "<b>游戏化（Gamification）</b>：用积分、限时等游戏机制提升学习动机的设计思路。",
        "<b>心流（Flow）</b>：任务难度与技能水平匹配时的专注状态，是本游戏难度分档的依据。",
        "<b>预防接种理论（Inoculation Theory）</b>：预先接触弱化版谬误可增强对虚假信息的抵抗力。"
      ],
      exercise: [
        "<b>两档难度通关</b>：① 以“简单”难度通关一局，记录击落正确率与得分；② 切换“困难”难度再通一局；③ 汇总两局中最常出错的谣言类型前 3 名。产出物：两局成绩记录与易错类型清单。完成标准：困难难度正确率不低于 60%，清单上每类附一句识别要点。",
        "<b>给同学出题</b>：① 从易错类型中挑 1 条真实谣言案例；② 改写成与游戏难度相当的题干；③ 请同桌作答并统计正误。完成标准：题干保留谣言的典型破绽，同桌作答结果记入你的观察笔记。"
      ],
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
      module: "第15章 媒介素养与受众分析（篇Ⅳ 反思篇 · Tier 2 实验工具）",
      terms: [
        "<b>创新扩散（Diffusion of Innovations）</b>：新技术按五类采纳者逐步普及的过程理论。",
        "<b>S 曲线（Sigmoid Curve）</b>：采纳率随时间呈慢—快—慢的 S 形增长轨迹。",
        "<b>早期采纳者（Early Adopters）</b>：紧跟创新者的第 2 批用户（约 13.5%），左右舆论风向。"
      ],
      exercise: [
        "<b>标定 AI 写作的曲线位置</b>：① 拖动滑块使曲线拐点对准“2023 年生成式 AI 进入新闻编辑部”节点；② 在“关键节点”面板读出创新者与早期采纳者占比；③ 截图保存曲线。产出物：一张标注当前位置的 S 曲线截图。完成标准：拐点与关键节点文字吻合，两组占比读数被记录在旁。",
        "<b>两代技术对比</b>：① 分别为“AI 写作”与“VR 新闻”各拟合一条 S 曲线；② 并排比较两者拐点的时间差；③ 写出对编辑部投入节奏的建议。完成标准：两条曲线参数不同且各有依据，建议不超过 80 字。"
      ],
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
      module: "第16章 新闻工作者的AI工作系统与未来图景（篇Ⅳ 反思篇 · 拓展工具）",
      terms: [
        "<b>AI 智能体（AI Agent）</b>：能感知环境、做出决策并执行任务的自动化系统。",
        "<b>人在回路（Human-in-the-Loop）</b>：在关键环节保留人工审核，防止全自动流程出错。",
        "<b>自动化偏差（Automation Bias）</b>：人类过度信任机器输出而放弃独立核验的倾向。"
      ],
      exercise: [
        "<b>巡检助手合集</b>：① 逐一点开大屏上的 3 个新闻助手（如摘要、核查、标题类），各执行一次示例任务；② 记录每个助手的输入、输出与耗时；③ 在“最近使用”确认调用记录。产出物：一份三助手能力对照表。完成标准：对照表含“出错时谁来发现”一栏并逐项填写。",
        "<b>设计个人 AI 工作流（对接【教材实验 16.1】）</b>：① 选定一个报道场景（如每日舆情简报）；② 列出该场景下 5 个重复任务；③ 用“出错成本×可检验性”矩阵逐项判定副驾驶/自动驾驶；④ 在“本地 JSON 配置”中把助手按流程串联，并为每个节点标注 L1/L2/L3 层级。产出物：一份含至少 5 个节点、带层级标签的工作流配置。完成标准：至少 1 个任务被判定为可自动驾驶，并写明判定理由。"
      ],
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
      module: "第12章 新闻数字产品开发与上线（篇Ⅲ 实操篇 · 拓展工具）",
      terms: [
        "<b>最小可行产品（MVP）</b>：用最小功能集快速上线验证需求，作品集首版可套用此思路。",
        "<b>个人品牌（Personal Branding）</b>：通过系统展示作品与专长建立专业公信力。",
        "<b>作品集（Portfolio）</b>：记者核心能力的可视化档案，是本工具的生成对象。"
      ],
      exercise: [
        "<b>上线你的第一版作品集（MVP）</b>：① 在“JSON 配置”中填入姓名、一句定位与联系方式；② 添加 3 个作品条目（标题+一句简介+链接）；③ 刷新预览并检查移动端显示。产出物：一份可分享的作品集页面。完成标准：3 个条目字段完整，移动端预览无排版错乱。",
        "<b>按“不可替代性”重排</b>：① 圈出 3 个作品中 AI 难以替代的能力（如现场突破、信源经营）；② 调整 JSON 中条目顺序，让最能体现该能力的作品置顶；③ 为置顶作品补 50 字“我的角色”说明。完成标准：每个作品都标注了个人独特贡献。"
      ],
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
      module: "第11章 多媒体与沉浸式新闻（篇Ⅲ 实操篇 · 拓展工具）",
      prereq: "建议先完成：P49 RSS 聚合报纸",
      terms: [
        "<b>播客（Podcast）</b>：按期更新、可订阅分发的音频节目，是新闻的“声音叙事”渠道。",
        "<b>章节标记（Chapter Marker）</b>：音频内的时间锚点，听众可点击直接跳转收听。",
        "<b>伴随性消费（Ambient Consumption）</b>：听众在通勤、运动时并行收听的媒介使用习惯。",
        "<b>RSS 订阅（RSS Feed）</b>：播客分发的标准协议，客户端凭它自动获取更新。"
      ],
      exercise: [
        "<b>发布一期新闻播客</b>：① 在“节目列表”新建单集，标题拟为《通勤路上的 AI 新闻课》并写 100 字简介；② 选用示例音频；③ 在“章节”面板添加开场/案例/结语 3 个章节标记并试听跳转。产出物：一期带 3 个章节的可播放单集页面。完成标准：点击每个章节标记都能准确跳转到对应内容。",
        "<b>无障碍试听检查</b>：① 只用键盘快捷键完成播放、暂停与章节跳转；② 检查页面是否提供简介或文字稿兜底；③ 记录缺失项。完成标准：快捷键全流程可用，并给出 1 条无障碍改进建议。"
      ],
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
      module: "第12章 新闻数字产品开发与上线（篇Ⅲ 实操篇 · 拓展工具）",
      terms: [
        "<b>数据—墨水比（Data-ink Ratio）</b>：版面应删除不承载信息的装饰，Tufte 的经典原则。",
        "<b>拟物化（Skeuomorphism）</b>：数字界面模仿实物（如 3D 翻页），增强读者熟悉感。",
        "<b>翻页书（Flipbook）</b>：模拟翻阅体验的数字杂志形式，是本工具的载体。"
      ],
      exercise: [
        "<b>编一本 4 页迷你杂志</b>：① 在“页面配置”中为 4 页分别设置标题、正文与配图；② 在“目录”核对页序并试翻 3D 动画；③ 删除每页 1 处纯装饰元素（无效花边、冗余动效）以提升数据—墨水比。产出物：一本 4 页可翻阅的电子杂志。完成标准：翻页流畅，且每处装饰删减都写明了理由。",
        "<b>移动端阅读对照</b>：① 分别在宽屏与手机宽度下翻阅你的杂志；② 记录小屏下失效的元素（文字溢出、按钮过小）；③ 修改配置修复 1 处。完成标准：修复后小屏可完整翻阅且文字无溢出。"
      ],
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
      module: "第12章 新闻数字产品开发与上线（篇Ⅲ 实操篇 · 拓展工具）",
      terms: [
        "<b>内容策展（Curation）</b>：以专业判断为读者筛选、解读信息，是新闻简报的核心价值。",
        "<b>打开率（Open Rate）</b>：打开邮件的订阅者占比，衡量简报触达效果的核心指标。",
        "<b>直接触达（Direct Distribution）</b>：绕开平台算法、直达订阅者邮箱的分发方式。"
      ],
      exercise: [
        "<b>编辑一期 500 字简报</b>：① 在“内容与品牌”中填入栏目名与本期主题（如“生成式 AI 进编辑部”）；② 从本周新闻中选 3 条，各写 50 字策展按语，说清“为什么值得读”；③ 生成预览并检查移动端排版。产出物：一期含 3 条按语的简报。完成标准：总字数不超过 500 字，且每条按语含 1 个判断句而非内容复述。",
        "<b>A/B 标题测试</b>：① 为同一期简报拟 2 个风格不同的标题；② 分别生成预览截图；③ 简述各自适配的读者群与打开率预期。完成标准：两个标题差异点明确，预期陈述附至少 1 条理由。"
      ],
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
      module: "第6章 网络信息自动采集（篇Ⅱ 方法篇 · 拓展工具）",
      terms: [
        "<b>信息自由（Freedom of Information）</b>：公民依法获取政府信息的权利，是调查报道的法定渠道。",
        "<b>信息公开申请（FOIA Request）</b>：向行政机关提交的正式索取文件请求，须写明具体事项。",
        "<b>信息采集（Information Gathering）</b>：新闻数据的获取环节，公开申请是其合法手段之一。"
      ],
      exercise: [
        "<b>起草一份空气质量数据申请</b>：① 申请单位填“某市生态环境局”；② 申请事项写明“2024 年 1-12 月国控站点 PM2.5 小时浓度数据”；③ 逐项补全申请人信息、证件号后四位与接收邮箱；④ 点击生成申请书并通读。产出物：一份完整的申请书文本。完成标准：含申请人信息、具体事项描述、所需信息形式、联系方式四项法定要件。",
        "<b>要件互查</b>：① 与同桌互换生成的申请书；② 对照法定要件清单逐项勾检；③ 各提 1 条可能被“补正告知”的风险点并修改。完成标准：互查后每份申请书的标记问题全部修复。"
      ],
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
      module: "第15章 媒介素养与受众分析（篇Ⅳ 反思篇 · 拓展工具）",
      terms: [
        "<b>转化漏斗（Conversion Funnel）</b>：追踪用户从初始接触到最终转化的逐级流失模型。",
        "<b>流失率（Drop-off Rate）</b>：相邻两层之间流失用户的比例，是漏斗核查的关键读数。",
        "<b>基准率（Base Rate）</b>：行业普遍达到的水平，用来判断宣称数据是否离谱。"
      ],
      exercise: [
        "<b>拆解一个网红品牌的宣称</b>：① 在“输入数据”录入案例：注册用户 100 万 → 月活 60 万 → 付费 3 万；② 生成漏斗图并读出各级转化率；③ 对照内置行业基准判断合理性。产出物：一张漏斗图与转化率清单。完成标准：正确算出 60% 与 5% 两级转化率，并写出 1 个对“爆款”宣称的追问。",
        "<b>反向估算验证</b>：① 假设付费转化符合行业基准 2%，反推宣称付费人数所对应的注册规模；② 与宣称的 100 万注册对比；③ 用倍数写出夸大结论。完成标准：估算过程可复现，结论以倍数表述（如约 1.5 倍）。"
      ],
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
      module: "配套附录C 术语表 · 全书概念自测（拓展工具）",
      terms: [
        "<b>间隔重复（Spaced Repetition）</b>：按遗忘曲线安排复习间隔，把短期记忆变成长期知识。",
        "<b>遗忘曲线（Forgetting Curve）</b>：记忆随时间衰减的规律，是闪卡排程的依据。",
        "<b>开源情报（OSINT）</b>：附录 C 高频词条之一，适合在核查类考点自测中重点巩固。"
      ],
      exercise: [
        "<b>一轮概念自测</b>：① 在搜索框输入“核查”筛选相关卡片，完成 10 张并逐张自评（认识/模糊/陌生）；② 对照“本题解析”订正理解；③ 把模糊与陌生的卡片集中进“错题本（本轮）”。产出物：一轮学习的汇总截图。完成标准：10 张全部完成自评，错题本至少收录 2 张。",
        "<b>间隔重测</b>：① 隔天（或下次课）只重测错题本中的卡片；② 对比两轮正确率；③ 把仍答错的词条手写进课堂笔记。完成标准：第二轮正确率不低于 80% 且高于第一轮。"
      ],
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
      module: "第6章 网络信息自动采集（篇Ⅱ 方法篇 · 拓展工具）",
      terms: [
        "<b>信息采集（Information Gathering）</b>：RSS 是记者主动订阅信源的自动化采集方式。",
        "<b>RSS 订阅（RSS Feed）</b>：站点输出的标准内容源，阅读器凭它聚合更新，无算法过滤。",
        "<b>网页存档（Web Archiving）</b>：对抓取内容留档备查，防止信源被删后无从引用。"
      ],
      exercise: [
        "<b>搭建编辑部监测报</b>：① 在“订阅源管理”添加 3 个示例源（可用工具内置推荐：国际通讯社、科技媒体、监管公告各一）；② 按主题分组并命名；③ 生成聚合报纸并通读头条。产出物：一份含 3 个分组的聚合报纸。完成标准：每个源都能拉取最新条目，分组名能反映选题方向。",
        "<b>算法对比实验</b>：① 记录你今天在推荐流看到的 10 条内容的来源；② 与你的 RSS 报纸头版来源对比重合度；③ 写 80 字结论：哪边来源更分散。完成标准：重合度有量化估计（如 2/10 重合）并给出一句解释。"
      ],
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
      module: "第13章 事实核查与开源情报（篇Ⅳ 反思篇 · 拓展工具）",
      prereq: "建议先完成：P23 Google Dorks 极速拼接器",
      terms: [
        "<b>开源情报（OSINT）</b>：仅用公开信息开展系统调查的方法论，是本导航站的收录范围。",
        "<b>信源交叉验证（Cross-source Verification）</b>：同一事实经多工具、多来源互证后再采信。",
        "<b>地理空间情报（GEOINT）</b>：借助地图与卫星影像定位事件时空信息的 OSINT 分支。"
      ],
      exercise: [
        "<b>组建洪灾核验工具箱</b>：① 假设任务：核验“某段洪灾视频”的拍摄地点与时间；② 在导航站按搜索、图像、地理、存档四类各选 1 个首选工具；③ 每个工具写 30 字选用理由。产出物：一张四类工具清单。完成标准：四类齐备，理由均与“地点/时间核验”任务直接相关。注意：实际使用外部工具时，须在教师指导下合法合规进行。",
        "<b>红队压测你的清单</b>：① 与同伴交换工具清单；② 各挑对方 1 个工具，提出“它解决不了什么”的质疑；③ 为清单补 1 个备用工具。完成标准：备用工具与被质疑工具功能互补而非重复。"
      ],
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

  const secModule = d.module ? `
        <div class="pedagogy-section">
          <h3>📦 教材定位</h3>
          <p class="pedagogy-module">${d.module}${d.prereq ? `　·　${d.prereq}` : ""}</p>
        </div>` : "";
  const secTerms = d.terms && d.terms.length ? `
        <div class="pedagogy-section">
          <h3>🔑 核心术语</h3>
          <ul class="pedagogy-terms">${d.terms.map(t => `<li>${t}</li>`).join("")}</ul>
        </div>` : "";
  const secExercise = d.exercise && d.exercise.length ? `
        <div class="pedagogy-section">
          <h3>✏️ 实操练习</h3>
          <ol class="pedagogy-exercise">${d.exercise.map(e => `<li>${e}</li>`).join("")}</ol>
        </div>` : "";

  panel.innerHTML = `
    <button class="pedagogy-toggle" aria-expanded="false">
      <span class="arrow">▶</span>
      <span>📖 教学面板 — ${pid} 学习指引</span>
    </button>
    <div class="pedagogy-body">
      <div class="pedagogy-content">
        ${secModule}
        <div class="pedagogy-section">
          <h3>🎯 学习目标</h3>
          <p>${d.goal}</p>
        </div>
        ${secTerms}
        <div class="pedagogy-section">
          <h3>📖 背景知识</h3>
          <p>${d.background}</p>
        </div>
        ${secExercise}
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
