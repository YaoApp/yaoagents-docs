/**
 * Generate documentation file structure for Yao Agents docs.
 *
 * Directory layout:
 *   {product}/{locale}/{section}/index.yml   — section metadata + page ordering
 *   {product}/{locale}/{section}/{slug}.mdx  — article content
 *
 * index.yml schema:
 *   slug:    string          — URL slug (same as directory name)
 *   title:   string          — section title in this locale
 *   summary: string          — one-line section description
 *   pages:   Page[]          — ordered list of articles (defines sidebar order)
 *
 * Page:
 *   slug:    string          — file name without .mdx (also URL segment)
 *   title:   string          — article title in this locale
 *   summary: string          — one-line article description
 *
 * Benefits over old approach:
 *   - Ordering via array position (no NN- prefix hacks)
 *   - Titles are locale-aware in index.yml (not derived from file names)
 *   - Easy for parsers and agents to read, reorder, and insert articles
 *   - slug is stable across locales (same slug, different title/summary)
 */

import * as fs from "fs";
import * as path from "path";
import * as yaml from "yaml";

// ──────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────

interface Page {
  slug: string;
  title: string;
  summary: string;
}

interface Section {
  slug: string;
  children?: Section[];
  locales: Record<
    string,
    {
      title: string;
      summary: string;
      pages: Page[];
    }
  >;
}

interface Product {
  slug: string;
  locales: Record<string, { title: string; summary: string }>;
  sections: Section[];
}

// ──────────────────────────────────────────────
// Data: Yao Agents
// ──────────────────────────────────────────────

const yaoAgents: Product = {
  slug: "yao-agents",
  locales: {
    "en-us": {
      title: "Yao Agents",
      summary:
        "Product user manual — install, configure, and use Yao Agents on your devices.",
    },
    "zh-cn": {
      title: "Yao Agents",
      summary: "产品使用手册——在你的设备上安装、配置和使用 Yao Agents。",
    },
    "zh-tw": {
      title: "Yao Agents",
      summary: "產品使用手冊——在你的裝置上安裝、設定和使用 Yao Agents。",
    },
    "ja-jp": {
      title: "Yao Agents",
      summary:
        "製品ユーザーマニュアル——デバイスに Yao Agents をインストール・設定・利用する。",
    },
  },
  sections: [
    // ── A. Getting Started ──
    {
      slug: "getting-started",
      locales: {
        "en-us": {
          title: "Getting Started",
          summary: "From installation to understanding the core product.",
          pages: [
            {
              slug: "what-is-yao-agents",
              title: "What Is Yao Agents",
              summary:
                "Product positioning, core value, and what you can do with it. Includes a glossary quick-reference card.",
            },
            {
              slug: "installation",
              title: "Installation",
              summary:
                "Download and install on macOS, Windows, or Linux — as easy as installing any app.",
            },
            {
              slug: "ai-experts-intro",
              title: "AI Experts: Find the Right One",
              summary:
                "Core concept 1. Each AI Expert is a domain specialist. Learn how to pick the right one, describe your needs, and get the best results.",
            },
            {
              slug: "mission-control-intro",
              title: "Mission Control: Orchestrate Automation",
              summary:
                "Core concept 2. You are the commander — assemble a team of experts, define the workflow, and let them collaborate automatically.",
            },
            {
              slug: "whats-next",
              title: "What's Next",
              summary:
                "Brief overview of advanced capabilities: Tai Link, Integrations, Agent Hub. One-sentence intro + links.",
            },
          ],
        },
        "zh-cn": {
          title: "入门",
          summary: "从安装到理解产品核心，用户必读。",
          pages: [
            {
              slug: "what-is-yao-agents",
              title: "什么是 Yao Agents",
              summary:
                "产品定位、核心价值、你能用它做什么。末尾附术语速查卡片。",
            },
            {
              slug: "installation",
              title: "安装",
              summary:
                "在 macOS / Windows / Linux 上下载安装，像装普通 App 一样简单。",
            },
            {
              slug: "ai-experts-intro",
              title: "AI 专家：找对人，事半功倍",
              summary:
                "核心概念 1。每个 AI 专家都是对应领域的专才。如何选对专家、如何描述需求、如何获得最佳结果。",
            },
            {
              slug: "mission-control-intro",
              title: "任务控制中心：编排自动化",
              summary:
                "核心概念 2。你来编排——拉一组专家组成团队，定义流程，让它们自动协作完成。",
            },
            {
              slug: "whats-next",
              title: "更进一步",
              summary:
                "产品还有更多能力：Tai Link 连接多设备、集成接入 IM / API、Agent Hub 扩展新助手。",
            },
          ],
        },
        "zh-tw": {
          title: "入門",
          summary: "從安裝到理解產品核心，使用者必讀。",
          pages: [
            {
              slug: "what-is-yao-agents",
              title: "什麼是 Yao Agents",
              summary:
                "產品定位、核心價值、你能用它做什麼。末尾附術語速查卡片。",
            },
            {
              slug: "installation",
              title: "安裝",
              summary:
                "在 macOS / Windows / Linux 上下載安裝，像裝一般 App 一樣簡單。",
            },
            {
              slug: "ai-experts-intro",
              title: "AI 專家：找對人，事半功倍",
              summary:
                "核心概念 1。每個 AI 專家都是對應領域的專才。如何選對專家、如何描述需求、如何獲得最佳結果。",
            },
            {
              slug: "mission-control-intro",
              title: "任務控制中心：編排自動化",
              summary:
                "核心概念 2。你來編排——拉一組專家組成團隊，定義流程，讓它們自動協作完成。",
            },
            {
              slug: "whats-next",
              title: "更進一步",
              summary:
                "產品還有更多能力：Tai Link 連接多裝置、整合接入 IM / API、Agent Hub 擴展新助手。",
            },
          ],
        },
        "ja-jp": {
          title: "はじめに",
          summary:
            "インストールから製品のコアを理解するまで、必読ガイド。",
          pages: [
            {
              slug: "what-is-yao-agents",
              title: "Yao Agents とは",
              summary:
                "製品の位置づけ、コアバリュー、何ができるか。用語クイックリファレンス付き。",
            },
            {
              slug: "installation",
              title: "インストール",
              summary:
                "macOS / Windows / Linux でダウンロードしてインストール。",
            },
            {
              slug: "ai-experts-intro",
              title: "AI エキスパート：適切な専門家を選ぶ",
              summary:
                "コアコンセプト 1。各 AI エキスパートは専門分野のスペシャリストです。適切なエキスパートの選び方、要件の伝え方、最良の結果を得る方法。",
            },
            {
              slug: "mission-control-intro",
              title: "ミッションコントロール：自動化のオーケストレーション",
              summary:
                "コアコンセプト 2。あなたが指揮者です。専門家チームを編成し、ワークフローを定義して自動連携させます。",
            },
            {
              slug: "whats-next",
              title: "次のステップ",
              summary:
                "さらなる機能の概要：Tai Link、統合、Agent Hub。各機能の一行紹介とリンク。",
            },
          ],
        },
      },
    },

    // ── C. Mission Control ──
    {
      slug: "mission-control",
      children: [
        {
          slug: "execution-pipeline",
          locales: {
            "en-us": {
              title: "Execution Pipeline",
              summary:
                "How a robot executes automatically through stages. Each stage has a dedicated agent you can customize.",
              pages: [
                {
                  slug: "pipeline-overview",
                  title: "Pipeline Overview",
                  summary:
                    "Think of it as an assembly line — each station has a specialist. Products flow from start to finish.",
                },
                {
                  slug: "replacing-stage-agents",
                  title: "Replacing Stage Agents",
                  summary:
                    "Swap any default pipeline agent with one you installed or created.",
                },
              ],
            },
            "zh-cn": {
              title: "执行流水线",
              summary:
                "机器人按阶段自动执行。每个阶段有默认智能体，你也可以替换为自己的。",
              pages: [
                {
                  slug: "pipeline-overview",
                  title: "流水线概览",
                  summary:
                    "想象一条流水线——每个工位有一个专人负责，产品从头走到尾。",
                },
                {
                  slug: "replacing-stage-agents",
                  title: "替换阶段智能体",
                  summary:
                    "在高级配置中，将任意阶段的默认智能体替换为你安装或创建的智能体。",
                },
              ],
            },
            "zh-tw": {
              title: "執行流水線",
              summary:
                "機器人按階段自動執行。每個階段有預設智能體，你也可以替換為自己的。",
              pages: [
                {
                  slug: "pipeline-overview",
                  title: "流水線概覽",
                  summary:
                    "想像一條流水線——每個工位有一個專人負責，產品從頭走到尾。",
                },
                {
                  slug: "replacing-stage-agents",
                  title: "替換階段智能體",
                  summary:
                    "在進階設定中，將任意階段的預設智能體替換為你安裝或建立的智能體。",
                },
              ],
            },
            "ja-jp": {
              title: "実行パイプライン",
              summary:
                "ロボットがステージごとに自動実行。各ステージのデフォルトエージェントをカスタマイズ可能。",
              pages: [
                {
                  slug: "pipeline-overview",
                  title: "パイプライン概要",
                  summary:
                    "組立ラインのように、各ステーションに専門家が配置され、製品が最初から最後まで流れます。",
                },
                {
                  slug: "replacing-stage-agents",
                  title: "ステージエージェントの置き換え",
                  summary:
                    "デフォルトのパイプラインエージェントを、インストールまたは作成したものに差し替え。",
                },
              ],
            },
          },
        },
      ],
      locales: {
        "en-us": {
          title: "Mission Control",
          summary:
            "Core feature: orchestrate a team of experts to complete tasks automatically.",
          pages: [
            {
              slug: "what-is-mission-control",
              title: "What Is Mission Control",
              summary:
                "Core idea: you are the commander. Assemble experts, define the workflow, let them collaborate.",
            },
            {
              slug: "creating-a-robot",
              title: "Creating a Robot",
              summary:
                "Basic info, identity setup, and platform integration for a new robot.",
            },
            {
              slug: "progress-and-results",
              title: "Progress & Results",
              summary:
                "Running status, logs, deliverables, pause and resume.",
            },
            {
              slug: "scheduling-and-triggers",
              title: "Scheduling & Triggers",
              summary:
                "Scheduled execution, event triggers, Webhook notifications.",
            },
          ],
        },
        "zh-cn": {
          title: "任务控制中心",
          summary: "核心功能之二：编排专家组自动协作完成任务。",
          pages: [
            {
              slug: "what-is-mission-control",
              title: "什么是任务控制中心",
              summary:
                "核心理念：你是总指挥，编排一组专家完成一件事。",
            },
            {
              slug: "creating-a-robot",
              title: "创建机器人",
              summary: "基本信息、身份设定、平台集成。",
            },
            {
              slug: "progress-and-results",
              title: "查看进度与结果",
              summary: "运行状态、日志、产出物、中断与恢复。",
            },
            {
              slug: "scheduling-and-triggers",
              title: "定时与触发",
              summary: "定时执行、事件触发、Webhook 通知。",
            },
          ],
        },
        "zh-tw": {
          title: "任務控制中心",
          summary: "核心功能之二：編排專家組自動協作完成任務。",
          pages: [
            {
              slug: "what-is-mission-control",
              title: "什麼是任務控制中心",
              summary:
                "核心理念：你是總指揮，編排一組專家完成一件事。",
            },
            {
              slug: "creating-a-robot",
              title: "建立機器人",
              summary: "基本資訊、身份設定、平台整合。",
            },
            {
              slug: "progress-and-results",
              title: "查看進度與結果",
              summary: "執行狀態、日誌、產出物、中斷與恢復。",
            },
            {
              slug: "scheduling-and-triggers",
              title: "定時與觸發",
              summary: "定時執行、事件觸發、Webhook 通知。",
            },
          ],
        },
        "ja-jp": {
          title: "ミッションコントロール",
          summary:
            "コア機能：専門家チームをオーケストレーションしてタスクを自動完了。",
          pages: [
            {
              slug: "what-is-mission-control",
              title: "ミッションコントロールとは",
              summary:
                "コアアイデア：あなたが指揮者。専門家を編成し、ワークフローを定義。",
            },
            {
              slug: "creating-a-robot",
              title: "ロボットの作成",
              summary: "基本情報、アイデンティティ設定、プラットフォーム統合。",
            },
            {
              slug: "progress-and-results",
              title: "進捗と結果",
              summary: "実行状態、ログ、成果物、一時停止と再開。",
            },
            {
              slug: "scheduling-and-triggers",
              title: "スケジュールとトリガー",
              summary: "定期実行、イベントトリガー、Webhook通知。",
            },
          ],
        },
      },
    },

    // ── D. Built-in Agents ──
    {
      slug: "built-in-agents",
      locales: {
        "en-us": {
          title: "Built-in Agents",
          summary:
            "All pre-installed agents. Each has a detail page: intro, strengths, use cases, prompt reference, tips.",
          pages: [
            {
              slug: "general",
              title: "General",
              summary:
                "General-purpose assistant. Everyday Q&A, versatile tasks, best starting point for new users.",
            },
            {
              slug: "keeper",
              title: "Keeper",
              summary:
                "Knowledge base manager. Save/retrieve web pages, notes, files, bookmarks with tags and categories.",
            },
            {
              slug: "pm",
              title: "PM",
              summary:
                "Project manager. Task breakdown, progress tracking, team coordination.",
            },
            {
              slug: "postman",
              title: "Postman",
              summary:
                "Email assistant. Draft emails, scheduled sending, email templates.",
            },
            {
              slug: "insights",
              title: "Insights",
              summary:
                "Data analyst. Connect to databases, read spreadsheets, build ECharts dashboards with live VNC preview.",
            },
            {
              slug: "scout",
              title: "Market Scout",
              summary:
                "Market intelligence. Monitor subscription feeds, classify articles, organize insights.",
            },
            {
              slug: "slides",
              title: "Slides",
              summary:
                "Slide deck builder. Turn outlines or documents into themed HTML presentations, export to PDF.",
            },
            {
              slug: "transformer",
              title: "Transformer",
              summary:
                "Data structuring expert. Convert images, PDFs, JSON, and CSV into structured formats via Vision LLM.",
            },
            {
              slug: "website",
              title: "Web Builder",
              summary:
                "Website builder. Corporate sites, landing pages, forms — Next.js + Tailwind, VNC preview, SSH deploy.",
            },
            {
              slug: "applet",
              title: "Applet Workshop",
              summary:
                "Mini-app builder. Rapidly generate visual tools with Node.js, live VNC preview.",
            },
            {
              slug: "report-writer",
              title: "Report Writer",
              summary:
                "Report-writing robot (used in Mission Control). Auto-generates structured Markdown analysis reports.",
            },
            {
              slug: "robot-host",
              title: "Robot Host",
              summary:
                "Pipeline agent — Intake stage. Human-machine intermediary: collects input, reports status, confirms decisions.",
            },
            {
              slug: "robot-goals",
              title: "Robot Goals",
              summary:
                "Pipeline agent — Goal-setting stage. Understands requirements and breaks them into actionable goals.",
            },
            {
              slug: "robot-inspiration",
              title: "Robot Inspiration",
              summary:
                "Pipeline agent — Inspiration stage. Searches for relevant information and reference materials.",
            },
            {
              slug: "robot-tasks",
              title: "Robot Tasks",
              summary:
                "Pipeline agent — Execution stage. Carries out work step-by-step according to goals.",
            },
            {
              slug: "robot-validation",
              title: "Robot Validation",
              summary:
                "Pipeline agent — Validation stage. Checks output quality and identifies issues.",
            },
            {
              slug: "robot-delivery",
              title: "Robot Delivery",
              summary:
                "Pipeline agent — Delivery stage. Assembles final deliverables and formats output.",
            },
          ],
        },
        "zh-cn": {
          title: "内置智能体",
          summary:
            "所有随产品预装的智能体。每个有独立详情页：简介、擅长什么、使用场景、提示词参考、使用技巧。",
          pages: [
            {
              slug: "general",
              title: "General（通用助手）",
              summary: "日常问答、通用任务、新手首选。",
            },
            {
              slug: "keeper",
              title: "Keeper（知识库管理）",
              summary:
                "保存/检索内容（网页/笔记/文件/书签）、分类标签、外部数据导入。",
            },
            {
              slug: "pm",
              title: "PM（项目经理）",
              summary: "项目管理、任务拆解与跟踪、团队协作。",
            },
            {
              slug: "postman",
              title: "Postman（邮件助手）",
              summary: "邮件撰写、定时发送、邮件模板。",
            },
            {
              slug: "insights",
              title: "Insights（数据分析）",
              summary: "连接数据库、读取表格、构建 ECharts 交互看板，VNC 实时预览。",
            },
            {
              slug: "scout",
              title: "Market Scout（市场情报）",
              summary: "自动读取订阅源、抓取最新内容、分类归档市场洞察。",
            },
            {
              slug: "slides",
              title: "Slides（幻灯片制作）",
              summary: "从大纲或文档生成专业 HTML 演示稿并导出 PDF。",
            },
            {
              slug: "transformer",
              title: "Transformer（数据转换）",
              summary: "将图片、PDF、JSON、CSV 转换为结构化格式，支持 Vision LLM OCR。",
            },
            {
              slug: "website",
              title: "Web Builder（网站构建）",
              summary: "企业官网、落地页、表单应用，Next.js + Tailwind，VNC 预览 + SSH 部署。",
            },
            {
              slug: "applet",
              title: "Applet Workshop（小工具开发）",
              summary: "快速生成可视化 mini-tool，Node.js + VNC 实时预览。",
            },
            {
              slug: "report-writer",
              title: "Report Writer（报告撰写）",
              summary: "机器人类型。在任务编排中自动生成结构化 Markdown 分析报告。",
            },
            {
              slug: "robot-host",
              title: "Robot Host（接单）",
              summary:
                "流水线智能体。人机交互中介、接收输入、反馈状态。",
            },
            {
              slug: "robot-goals",
              title: "Robot Goals（定目标）",
              summary: "流水线智能体。理解需求、拆解为可执行目标。",
            },
            {
              slug: "robot-inspiration",
              title: "Robot Inspiration（找灵感）",
              summary: "流水线智能体。搜索信息、收集参考资料。",
            },
            {
              slug: "robot-tasks",
              title: "Robot Tasks（干活）",
              summary: "流水线智能体。按目标逐步执行具体工作。",
            },
            {
              slug: "robot-validation",
              title: "Robot Validation（验收）",
              summary: "流水线智能体。验证产出质量、发现问题。",
            },
            {
              slug: "robot-delivery",
              title: "Robot Delivery（交付）",
              summary: "流水线智能体。整理最终成果、交付输出。",
            },
          ],
        },
        "zh-tw": {
          title: "內建智能體",
          summary:
            "所有隨產品預裝的智能體。每個有獨立詳情頁。",
          pages: [
            { slug: "general", title: "General（通用助手）", summary: "日常問答、通用任務、新手首選。" },
            { slug: "keeper", title: "Keeper（知識庫管理）", summary: "儲存/檢索內容、分類標籤、外部資料匯入。" },
            { slug: "pm", title: "PM（專案經理）", summary: "專案管理、任務拆解與追蹤、團隊協作。" },
            { slug: "postman", title: "Postman（郵件助手）", summary: "郵件撰寫、定時發送、郵件範本。" },
            { slug: "insights", title: "Insights（資料分析）", summary: "連接資料庫、讀取表格、建構 ECharts 互動看板，VNC 即時預覽。" },
            { slug: "scout", title: "Market Scout（市場情報）", summary: "自動讀取訂閱源、擷取最新內容、分類歸檔市場洞察。" },
            { slug: "slides", title: "Slides（簡報製作）", summary: "從大綱或文件生成專業 HTML 簡報並匯出 PDF。" },
            { slug: "transformer", title: "Transformer（資料轉換）", summary: "將圖片、PDF、JSON、CSV 轉換為結構化格式，支援 Vision LLM OCR。" },
            { slug: "website", title: "Web Builder（網站建構）", summary: "企業官網、落地頁、表單應用，Next.js + Tailwind，VNC 預覽 + SSH 部署。" },
            { slug: "applet", title: "Applet Workshop（小工具開發）", summary: "快速生成可視化 mini-tool，Node.js + VNC 即時預覽。" },
            { slug: "report-writer", title: "Report Writer（報告撰寫）", summary: "機器人類型。在任務編排中自動生成結構化 Markdown 分析報告。" },
            { slug: "robot-host", title: "Robot Host（接單）", summary: "流水線智能體。人機互動中介。" },
            { slug: "robot-goals", title: "Robot Goals（定目標）", summary: "流水線智能體。理解需求、拆解為可執行目標。" },
            { slug: "robot-inspiration", title: "Robot Inspiration（找靈感）", summary: "流水線智能體。搜尋資訊、收集參考資料。" },
            { slug: "robot-tasks", title: "Robot Tasks（幹活）", summary: "流水線智能體。按目標逐步執行具體工作。" },
            { slug: "robot-validation", title: "Robot Validation（驗收）", summary: "流水線智能體。驗證產出品質、發現問題。" },
            { slug: "robot-delivery", title: "Robot Delivery（交付）", summary: "流水線智能體。整理最終成果、交付輸出。" },
          ],
        },
        "ja-jp": {
          title: "組み込みエージェント",
          summary: "製品にプリインストールされた全エージェント。各詳細ページあり。",
          pages: [
            { slug: "general", title: "General（汎用アシスタント）", summary: "日常Q&A、汎用タスク、初心者向け。" },
            { slug: "keeper", title: "Keeper（ナレッジベース）", summary: "コンテンツの保存/検索、タグ分類、外部データインポート。" },
            { slug: "pm", title: "PM（プロジェクトマネージャー）", summary: "プロジェクト管理、タスク分解、チーム連携。" },
            { slug: "postman", title: "Postman（メールアシスタント）", summary: "メール作成、予約送信、テンプレート。" },
            { slug: "insights", title: "Insights（データ分析）", summary: "データベース接続、スプレッドシート読み込み、EChartsダッシュボード構築、VNCライブプレビュー。" },
            { slug: "scout", title: "Market Scout（マーケット情報）", summary: "購読フィードを自動取得、記事分類、市場インサイトを整理。" },
            { slug: "slides", title: "Slides（スライド作成）", summary: "アウトラインや文書からHTML形式のプロスライドを生成し、PDFエクスポート。" },
            { slug: "transformer", title: "Transformer（データ変換）", summary: "画像・PDF・JSON・CSVを構造化形式に変換、Vision LLM OCR対応。" },
            { slug: "website", title: "Web Builder（ウェブサイト構築）", summary: "企業サイト・ランディングページ・フォームアプリ、Next.js + Tailwind、VNCプレビュー + SSHデプロイ。" },
            { slug: "applet", title: "Applet Workshop（ミニアプリ）", summary: "Node.jsでビジュアルミニツールを素早く生成、VNCライブプレビュー。" },
            { slug: "report-writer", title: "Report Writer（レポート作成）", summary: "ロボットタイプ。タスクオーケストレーションで構造化Markdownレポートを自動生成。" },
            { slug: "robot-host", title: "Robot Host（受付）", summary: "パイプラインエージェント。入力収集、ステータスフィードバック。" },
            { slug: "robot-goals", title: "Robot Goals（目標設定）", summary: "パイプラインエージェント。要件理解、実行可能な目標に分解。" },
            { slug: "robot-inspiration", title: "Robot Inspiration（インスピレーション）", summary: "パイプラインエージェント。情報検索、参考資料収集。" },
            { slug: "robot-tasks", title: "Robot Tasks（実行）", summary: "パイプラインエージェント。目標に沿って作業を実行。" },
            { slug: "robot-validation", title: "Robot Validation（検証）", summary: "パイプラインエージェント。成果物の品質検証。" },
            { slug: "robot-delivery", title: "Robot Delivery（納品）", summary: "パイプラインエージェント。最終成果物の整理・出力。" },
          ],
        },
      },
    },

    // ── E. Agent Hub ──
    {
      slug: "agent-hub",
      locales: {
        "en-us": {
          title: "Agent Hub",
          summary:
            "Extend capabilities: install ready-made agents or create your own.",
          pages: [
            {
              slug: "hub-overview",
              title: "Hub Overview",
              summary: "What is Agent Hub, browsing and discovering agents.",
            },
            {
              slug: "custom-assistants",
              title: "Custom AI Assistants",
              summary:
                "Four ways to get new assistants (easiest first): AI dev assistant, Hub install, OpenClaw Hub, or coding via yaoapps.com.",
            },
            {
              slug: "managing-agents",
              title: "Managing Agents",
              summary:
                "View installed agents, update, uninstall (built-in agents cannot be uninstalled).",
            },
            {
              slug: "agent-configuration",
              title: "Agent Configuration",
              summary:
                "Modify parameters, behavior, and permissions of installed agents.",
            },
          ],
        },
        "zh-cn": {
          title: "Agent 生态",
          summary: "扩展 Agent 能力：安装现成的，或自己创建。",
          pages: [
            {
              slug: "hub-overview",
              title: "Hub 概览",
              summary: "什么是 Agent Hub、浏览与发现。",
            },
            {
              slug: "custom-assistants",
              title: "自定义 AI 助手",
              summary:
                "四种方式获取新助手（由易到难）：AI 开发助手对话式创建、Hub 一键安装、OpenClaw Hub、编程开发。",
            },
            {
              slug: "managing-agents",
              title: "管理 Agent",
              summary:
                "查看已安装、更新、卸载（内置 Agent 不可卸载）。",
            },
            {
              slug: "agent-configuration",
              title: "Agent 配置",
              summary: "修改已安装 Agent 的参数、行为、权限。",
            },
          ],
        },
        "zh-tw": {
          title: "Agent 生態",
          summary: "擴展 Agent 能力：安裝現成的，或自己建立。",
          pages: [
            { slug: "hub-overview", title: "Hub 概覽", summary: "什麼是 Agent Hub、瀏覽與發現。" },
            { slug: "custom-assistants", title: "自訂 AI 助手", summary: "四種方式取得新助手（由易到難）：AI 開發助手、Hub 一鍵安裝、OpenClaw Hub、程式開發。" },
            { slug: "managing-agents", title: "管理 Agent", summary: "查看已安裝、更新、解除安裝（內建 Agent 不可解除安裝）。" },
            { slug: "agent-configuration", title: "Agent 設定", summary: "修改已安裝 Agent 的參數、行為、權限。" },
          ],
        },
        "ja-jp": {
          title: "Agent Hub",
          summary: "機能拡張：既製エージェントのインストールまたは自作。",
          pages: [
            { slug: "hub-overview", title: "Hub 概要", summary: "Agent Hubとは、エージェントの閲覧と発見。" },
            { slug: "custom-assistants", title: "カスタムAIアシスタント", summary: "新しいアシスタントを入手する4つの方法。AI開発アシスタント、Hubインストール、OpenClaw Hub、コーディング。" },
            { slug: "managing-agents", title: "エージェント管理", summary: "インストール済みの確認、更新、アンインストール。" },
            { slug: "agent-configuration", title: "エージェント設定", summary: "インストール済みエージェントのパラメータ、動作、権限を変更。" },
          ],
        },
      },
    },

    // ── F. Integrations ──
    {
      slug: "integrations",
      locales: {
        "en-us": {
          title: "Integrations",
          summary:
            "Outbound: connect to IM platforms and APIs. Inbound: connect AI models and MCP tools.",
          pages: [
            {
              slug: "chat-platforms",
              title: "Chat Platforms (IM)",
              summary:
                "Bind assistants/robots to Slack, WeChat, DingTalk, Feishu, Telegram, Discord.",
            },
            {
              slug: "api-direct-connect",
              title: "API Direct Connect",
              summary:
                "OpenAI-compatible Chat Completion protocol. Call your agents from any OpenAI-compatible tool.",
            },
            {
              slug: "api-keys",
              title: "API Keys",
              summary:
                "Generate and manage API keys for authenticating external calls to Yao Agents.",
            },
            {
              slug: "ai-models",
              title: "AI Models",
              summary:
                "Configure AI connectors: OpenAI, Claude, local models, etc.",
            },
            {
              slug: "mcp-tools",
              title: "MCP Tools",
              summary:
                "Connect external MCP servers to extend the tools available to assistants.",
            },
          ],
        },
        "zh-cn": {
          title: "集成",
          summary:
            "向外：接入 IM 平台和 API；向内：连接 AI 模型和 MCP 工具。",
          pages: [
            {
              slug: "chat-platforms",
              title: "聊天平台 (IM)",
              summary:
                "将助手/机器人绑定到 Slack、微信、钉钉、飞书、Telegram、Discord。",
            },
            {
              slug: "api-direct-connect",
              title: "API 直连",
              summary:
                "兼容 OpenAI Chat Completion 协议，从任何 OpenAI 兼容工具调用你的 Agent。",
            },
            {
              slug: "api-keys",
              title: "API 密钥",
              summary:
                "生成和管理 API Key，用于外部调用 Yao Agents 接口的认证。",
            },
            {
              slug: "ai-models",
              title: "AI 模型",
              summary:
                "配置 AI 连接器：OpenAI / Claude / 本地模型等。",
            },
            {
              slug: "mcp-tools",
              title: "MCP 工具",
              summary: "连接外部 MCP 服务器，扩展助手可用的工具。",
            },
          ],
        },
        "zh-tw": {
          title: "整合",
          summary: "向外：接入 IM 平台和 API；向內：連接 AI 模型和 MCP 工具。",
          pages: [
            { slug: "chat-platforms", title: "聊天平台 (IM)", summary: "將助手/機器人綁定到 Slack、微信、釘釘、飛書、Telegram、Discord。" },
            { slug: "api-direct-connect", title: "API 直連", summary: "相容 OpenAI Chat Completion 協定，從任何相容工具呼叫你的 Agent。" },
            { slug: "api-keys", title: "API 金鑰", summary: "產生和管理 API Key，用於外部呼叫 Yao Agents 介面的認證。" },
            { slug: "ai-models", title: "AI 模型", summary: "設定 AI 連接器：OpenAI / Claude / 本地模型等。" },
            { slug: "mcp-tools", title: "MCP 工具", summary: "連接外部 MCP 伺服器，擴展助手可用的工具。" },
          ],
        },
        "ja-jp": {
          title: "統合",
          summary: "外向き：IMプラットフォームとAPIに接続。内向き：AIモデルとMCPツールに接続。",
          pages: [
            { slug: "chat-platforms", title: "チャットプラットフォーム (IM)", summary: "アシスタント/ロボットをSlack、WeChat、DingTalk、Feishu、Telegram、Discordにバインド。" },
            { slug: "api-direct-connect", title: "API直接接続", summary: "OpenAI互換Chat Completionプロトコル。任意のツールからエージェントを呼び出し。" },
            { slug: "api-keys", title: "APIキー", summary: "外部からYao Agentsを呼び出すためのAPIキーの生成と管理。" },
            { slug: "ai-models", title: "AIモデル", summary: "AIコネクタの設定：OpenAI / Claude / ローカルモデルなど。" },
            { slug: "mcp-tools", title: "MCPツール", summary: "外部MCPサーバーに接続し、アシスタントが使えるツールを拡張。" },
          ],
        },
      },
    },

    // ── G. Settings ──
    {
      slug: "settings",
      locales: {
        "en-us": {
          title: "Settings",
          summary: "Personalize your Yao Agents experience.",
          pages: [
            { slug: "general-settings", title: "General Settings", summary: "Language, theme, startup behavior." },
            { slug: "account", title: "Account", summary: "Login, profile, security." },
            { slug: "data-management", title: "Data Management", summary: "Export conversations, backup data, clear cache." },
            { slug: "advanced-settings", title: "Advanced Settings", summary: "Proxy, storage path, performance options." },
          ],
        },
        "zh-cn": {
          title: "设置",
          summary: "个性化配置。",
          pages: [
            { slug: "general-settings", title: "通用设置", summary: "语言、主题、启动行为。" },
            { slug: "account", title: "账户", summary: "登录、个人信息、安全。" },
            { slug: "data-management", title: "数据管理", summary: "导出对话、备份数据、清除缓存。" },
            { slug: "advanced-settings", title: "高级设置", summary: "代理网络、存储路径、性能选项。" },
          ],
        },
        "zh-tw": {
          title: "設定",
          summary: "個人化設定。",
          pages: [
            { slug: "general-settings", title: "通用設定", summary: "語言、主題、啟動行為。" },
            { slug: "account", title: "帳戶", summary: "登入、個人資訊、安全。" },
            { slug: "data-management", title: "資料管理", summary: "匯出對話、備份資料、清除快取。" },
            { slug: "advanced-settings", title: "進階設定", summary: "代理網路、儲存路徑、效能選項。" },
          ],
        },
        "ja-jp": {
          title: "設定",
          summary: "パーソナライズ設定。",
          pages: [
            { slug: "general-settings", title: "一般設定", summary: "言語、テーマ、起動動作。" },
            { slug: "account", title: "アカウント", summary: "ログイン、プロフィール、セキュリティ。" },
            { slug: "data-management", title: "データ管理", summary: "会話のエクスポート、バックアップ、キャッシュクリア。" },
            { slug: "advanced-settings", title: "詳細設定", summary: "プロキシ、ストレージパス、パフォーマンスオプション。" },
          ],
        },
      },
    },
  ],
};

// ──────────────────────────────────────────────
// Data: Tai Link
// ──────────────────────────────────────────────

const taiLink: Product = {
  slug: "tai-link",
  locales: {
    "en-us": { title: "Tai Link", summary: "Device connectivity guide — connect your devices and let agents work across them." },
    "zh-cn": { title: "Tai Link", summary: "设备连接指南——连接你的多台设备，让助手跨设备工作。" },
    "zh-tw": { title: "Tai Link", summary: "裝置連接指南——連接你的多台裝置，讓助手跨裝置工作。" },
    "ja-jp": { title: "Tai Link", summary: "デバイス接続ガイド——デバイスを接続し、エージェントがデバイス間で動作。" },
  },
  sections: [
    {
      slug: "getting-started",
      locales: {
        "en-us": {
          title: "Getting Started",
          summary: "Install Tai Link and connect your first device.",
          pages: [
            { slug: "what-is-tai-link", title: "What Is Tai Link", summary: "Product positioning: let agents control your other devices." },
            { slug: "installation", title: "Installation", summary: "Install the Tai Link client on each platform." },
            { slug: "connect-first-device", title: "Connect Your First Device", summary: "Scan QR code or enter pairing code to complete the connection." },
          ],
        },
        "zh-cn": {
          title: "入门",
          summary: "安装 Tai Link 并连接第一台设备。",
          pages: [
            { slug: "what-is-tai-link", title: "什么是 Tai Link", summary: "产品定位：让 Agent 控制你的其他设备。" },
            { slug: "installation", title: "安装", summary: "在各平台安装 Tai Link 客户端。" },
            { slug: "connect-first-device", title: "连接第一台设备", summary: "扫码/输入配对码，完成连接。" },
          ],
        },
        "zh-tw": {
          title: "入門",
          summary: "安裝 Tai Link 並連接第一台裝置。",
          pages: [
            { slug: "what-is-tai-link", title: "什麼是 Tai Link", summary: "產品定位：讓 Agent 控制你的其他裝置。" },
            { slug: "installation", title: "安裝", summary: "在各平台安裝 Tai Link 客戶端。" },
            { slug: "connect-first-device", title: "連接第一台裝置", summary: "掃碼/輸入配對碼，完成連接。" },
          ],
        },
        "ja-jp": {
          title: "はじめに",
          summary: "Tai Linkをインストールし、最初のデバイスを接続。",
          pages: [
            { slug: "what-is-tai-link", title: "Tai Linkとは", summary: "製品の位置づけ：エージェントが他のデバイスを制御。" },
            { slug: "installation", title: "インストール", summary: "各プラットフォームにTai Linkクライアントをインストール。" },
            { slug: "connect-first-device", title: "最初のデバイスを接続", summary: "QRコードスキャンまたはペアリングコード入力で接続完了。" },
          ],
        },
      },
    },
    {
      slug: "user-guide",
      locales: {
        "en-us": {
          title: "User Guide",
          summary: "Manage devices, remote operations, file sync, and more.",
          pages: [
            { slug: "device-management", title: "Device Management", summary: "View device list, online status, naming." },
            { slug: "remote-operations", title: "Remote Operations", summary: "Control remote devices through agents." },
            { slug: "file-sync", title: "File Sync", summary: "Sync files between devices." },
            { slug: "remote-desktop", title: "Remote Desktop", summary: "VNC remote viewing and control." },
            { slug: "security-and-privacy", title: "Security & Privacy", summary: "Connection encryption, authorization management, disconnect devices." },
            { slug: "tunnel-mode", title: "Tunnel Mode", summary: "NAT traversal, no port forwarding required." },
          ],
        },
        "zh-cn": {
          title: "使用指南",
          summary: "设备管理、远程操作、文件同步等。",
          pages: [
            { slug: "device-management", title: "设备管理", summary: "查看设备列表、在线状态、命名。" },
            { slug: "remote-operations", title: "远程操作", summary: "通过 Agent 操控远程设备。" },
            { slug: "file-sync", title: "文件同步", summary: "设备间文件同步。" },
            { slug: "remote-desktop", title: "远程桌面", summary: "VNC 远程查看与控制。" },
            { slug: "security-and-privacy", title: "安全与隐私", summary: "连接加密、授权管理、断开设备。" },
            { slug: "tunnel-mode", title: "隧道模式", summary: "NAT 穿透，无需端口转发。" },
          ],
        },
        "zh-tw": {
          title: "使用指南",
          summary: "裝置管理、遠端操作、檔案同步等。",
          pages: [
            { slug: "device-management", title: "裝置管理", summary: "查看裝置清單、線上狀態、命名。" },
            { slug: "remote-operations", title: "遠端操作", summary: "透過 Agent 操控遠端裝置。" },
            { slug: "file-sync", title: "檔案同步", summary: "裝置間檔案同步。" },
            { slug: "remote-desktop", title: "遠端桌面", summary: "VNC 遠端查看與控制。" },
            { slug: "security-and-privacy", title: "安全與隱私", summary: "連線加密、授權管理、中斷裝置。" },
            { slug: "tunnel-mode", title: "隧道模式", summary: "NAT 穿透，無需端口轉發。" },
          ],
        },
        "ja-jp": {
          title: "ユーザーガイド",
          summary: "デバイス管理、リモート操作、ファイル同期など。",
          pages: [
            { slug: "device-management", title: "デバイス管理", summary: "デバイス一覧、オンライン状態、命名。" },
            { slug: "remote-operations", title: "リモート操作", summary: "エージェント経由でリモートデバイスを操作。" },
            { slug: "file-sync", title: "ファイル同期", summary: "デバイス間のファイル同期。" },
            { slug: "remote-desktop", title: "リモートデスクトップ", summary: "VNCリモート表示と操作。" },
            { slug: "security-and-privacy", title: "セキュリティとプライバシー", summary: "接続暗号化、認可管理、デバイス切断。" },
            { slug: "tunnel-mode", title: "トンネルモード", summary: "NATトラバーサル、ポートフォワーディング不要。" },
          ],
        },
      },
    },
  ],
};

// ──────────────────────────────────────────────
// Data: General (shared across products)
// ──────────────────────────────────────────────

const general: Product = {
  slug: "general",
  locales: {
    "en-us": { title: "General", summary: "Shared resources: glossary, FAQ, shortcuts, and more." },
    "zh-cn": { title: "通用", summary: "共享资源：术语表、常见问题、快捷键等。" },
    "zh-tw": { title: "通用", summary: "共享資源：術語表、常見問題、快捷鍵等。" },
    "ja-jp": { title: "共通", summary: "共有リソース：用語集、FAQ、ショートカットなど。" },
  },
  sections: [
    {
      slug: "resources",
      locales: {
        "en-us": {
          title: "Resources",
          summary: "Glossary, FAQ, shortcuts, system requirements, changelog, community.",
          pages: [
            { slug: "glossary", title: "Glossary", summary: "User-friendly explanations of key terms: AI Assistant, Robot, Agent, Pipeline, Hub, MCP, Tai Link, etc." },
            { slug: "faq", title: "FAQ", summary: "Common questions about installation, connectivity, agent usage, etc." },
            { slug: "sandbox-images", title: "Sandbox Images", summary: "Complete reference for all Docker sandbox images: what each image includes, which agents use it, and how to pull or update them." },
            { slug: "shortcuts", title: "Keyboard Shortcuts", summary: "Complete keyboard shortcut reference." },
            { slug: "system-requirements", title: "System Requirements", summary: "Minimum specs for each platform." },
            { slug: "changelog", title: "Changelog", summary: "Version release notes and updates." },
            { slug: "community", title: "Community", summary: "GitHub, Discord, feedback channels." },
          ],
        },
        "zh-cn": {
          title: "资源",
          summary: "术语表、常见问题、快捷键、系统要求、更新日志、社区。",
          pages: [
            { slug: "glossary", title: "术语表", summary: "用户友好的术语解释：AI 助手、机器人、智能体、流水线、Hub、MCP、Tai Link 等。" },
            { slug: "faq", title: "常见问题", summary: "安装问题、连接问题、Agent 使用问题等。" },
            { slug: "sandbox-images", title: "沙盒镜像", summary: "所有 Docker 沙盒镜像完整参考：各镜像包含的内容、适用 Agent、拉取与更新方法。" },
            { slug: "shortcuts", title: "快捷键", summary: "完整快捷键列表。" },
            { slug: "system-requirements", title: "系统要求", summary: "各平台最低配置。" },
            { slug: "changelog", title: "更新日志", summary: "版本更新内容。" },
            { slug: "community", title: "社区", summary: "GitHub、Discord、反馈渠道。" },
          ],
        },
        "zh-tw": {
          title: "資源",
          summary: "術語表、常見問題、快捷鍵、系統需求、更新日誌、社群。",
          pages: [
            { slug: "glossary", title: "術語表", summary: "使用者友善的術語解釋。" },
            { slug: "faq", title: "常見問題", summary: "安裝、連線、Agent 使用等常見問題。" },
            { slug: "sandbox-images", title: "沙盒映像", summary: "所有 Docker 沙盒映像完整參考：各映像內容、適用 Agent、拉取與更新方法。" },
            { slug: "shortcuts", title: "快捷鍵", summary: "完整快捷鍵列表。" },
            { slug: "system-requirements", title: "系統需求", summary: "各平台最低配置。" },
            { slug: "changelog", title: "更新日誌", summary: "版本更新內容。" },
            { slug: "community", title: "社群", summary: "GitHub、Discord、反饋管道。" },
          ],
        },
        "ja-jp": {
          title: "リソース",
          summary: "用語集、FAQ、ショートカット、システム要件、変更履歴、コミュニティ。",
          pages: [
            { slug: "glossary", title: "用語集", summary: "主要用語のわかりやすい説明。" },
            { slug: "faq", title: "よくある質問", summary: "インストール、接続、エージェント使用に関するFAQ。" },
            { slug: "sandbox-images", title: "サンドボックスイメージ", summary: "全Dockerサンドボックスイメージの完全リファレンス：各イメージの内容、対応Agent、取得・更新方法。" },
            { slug: "shortcuts", title: "キーボードショートカット", summary: "完全なショートカットリファレンス。" },
            { slug: "system-requirements", title: "システム要件", summary: "各プラットフォームの最小スペック。" },
            { slug: "changelog", title: "変更履歴", summary: "バージョンリリースノートと更新情報。" },
            { slug: "community", title: "コミュニティ", summary: "GitHub、Discord、フィードバックチャンネル。" },
          ],
        },
      },
    },
  ],
};

// ──────────────────────────────────────────────
// Generator
// ──────────────────────────────────────────────

const LOCALES = ["en-us", "zh-cn", "zh-tw", "ja-jp"];
const BASE = path.resolve(__dirname);

function ensureDir(dir: string) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeYaml(filePath: string, data: unknown) {
  fs.writeFileSync(filePath, yaml.stringify(data, { lineWidth: 0 }));
}

function writeMdx(filePath: string, slug: string, title: string, summary: string) {
  // Skip if file already exists — never overwrite authored content
  if (fs.existsSync(filePath)) return;

  const content = `---
slug: ${slug}
---

# ${title}

${summary}
`;
  fs.writeFileSync(filePath, content);
}

function generateSection(basePath: string, section: Section, locale: string) {
  const loc = section.locales[locale];
  if (!loc) return;

  const sectionDir = path.join(basePath, section.slug);
  ensureDir(sectionDir);

  const indexData: Record<string, unknown> = {
    slug: section.slug,
    title: loc.title,
    summary: loc.summary,
  };

  if (loc.pages.length > 0) {
    indexData.pages = loc.pages.map((p) => ({
      slug: p.slug,
      title: p.title,
      summary: p.summary,
    }));
  }

  if (section.children && section.children.length > 0) {
    indexData.children = section.children.map((c) => c.slug);
  }

  writeYaml(path.join(sectionDir, "index.yml"), indexData);

  for (const page of loc.pages) {
    writeMdx(
      path.join(sectionDir, `${page.slug}.mdx`),
      page.slug,
      page.title,
      page.summary
    );
  }

  if (section.children) {
    for (const child of section.children) {
      generateSection(sectionDir, child, locale);
    }
  }
}

function generateProduct(product: Product) {
  for (const locale of LOCALES) {
    const loc = product.locales[locale];
    if (!loc) continue;

    const productDir = path.join(BASE, product.slug, locale);
    ensureDir(productDir);

    const rootIndex: Record<string, unknown> = {
      slug: product.slug,
      title: loc.title,
      summary: loc.summary,
      sections: product.sections.map((s) => s.slug),
    };
    writeYaml(path.join(productDir, "index.yml"), rootIndex);

    for (const section of product.sections) {
      generateSection(productDir, section, locale);
    }
  }
}

// ──────────────────────────────────────────────
// Main
// ──────────────────────────────────────────────

console.log("Generating documentation structure...\n");

generateProduct(yaoAgents);
generateProduct(taiLink);
generateProduct(general);

console.log("Done! Directory structure created.");
console.log(`\nBase path: ${BASE}`);
