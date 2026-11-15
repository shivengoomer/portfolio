export interface CaseStudyFeature {
  title: string;
  description: string;
  image?: string;
  icon: string; // lucide icon name as string
  span?: "wide" | "tall" | "normal";
}

export interface ArchNode {
  id: string;
  label: string;
  tech: string;
  detail: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  color?: string;
  category?: string;
  role?: string;
  inputs?: string[];
  outputs?: string[];
  iconKey?: string;
}

export interface ArchEdge {
  from: string;
  to: string;
  label?: string;
  protocol?: string;
  payload?: string;
  type?: "rest" | "stream" | "compute" | "event" | "default";
}

export interface EngineeringDecision {
  problem: string;
  decision: string;
  result: string;
  detail: string;
}

export interface OutcomeMetric {
  value: string;
  label: string;
  note?: string;
}

export interface CaseStudyData {
  projectId: string;
  headline: string;
  heroImage: string;
  features: CaseStudyFeature[];
  architecture: {
    nodes: ArchNode[];
    edges: ArchEdge[];
  };
  engineeringDecisions: EngineeringDecision[];
  outcomes: OutcomeMetric[];
}

const caseStudies: CaseStudyData[] = [
  {
    projectId: "nifty50-qa-platform",
    headline:
      "50 equities. Live quantitative intelligence. One institutional trading terminal.",
    heroImage: "/projects/nifty50/dashboard.png",
    features: [
      {
        title: "Real-Time Market Screener",
        description:
          "Multi-parameter equity screener with RSI, sector, volume, and bias filters across the full NIFTY 50 universe.",
        image: "/projects/nifty50/screener.png",
        icon: "ScanLine",
        span: "wide",
      },
      {
        title: "Quantitative Factor Scoring",
        description:
          "Composite momentum, risk, and setup scores computed server-side via FastAPI pipelines.",
        image: "/projects/nifty50/analytics.png",
        icon: "BarChart3",
        span: "normal",
      },
      {
        title: "TradingView Integration",
        description:
          "Candlestick charts with multi-timeframe nav, VWAP/EMA overlays, and volume profiling.",
        image: "/projects/nifty50/charts.png",
        icon: "CandlestickChart",
        span: "normal",
      },
      {
        title: "Institutional Terminal",
        description:
          "4-way split multi-chart terminal with Level-2 market depth order book visualisation.",
        image: "/projects/nifty50/terminal.png",
        icon: "Monitor",
        span: "wide",
      },
    ],
    architecture: {
      nodes: [
        {
          id: "ui",
          label: "Next.js Client",
          tech: "Next.js 14 + TypeScript",
          category: "CLIENT / UI",
          role: "User interface, client-side caching, and interactive terminal state",
          detail:
            "React App Router frontend rendering SSR initial state, managing reactive screener filters, and binding live charting widgets.",
          x: 13,
          y: 50,
          color: "#F25C2A",
          iconKey: "nextjs",
          inputs: ["User Interactions", "Filter Params", "Chart Timeframes"],
          outputs: ["REST Requests", "Rendered Views", "Order Book Displays"],
        },
        {
          id: "api",
          label: "FastAPI Backend",
          tech: "Python 3.11 + FastAPI",
          category: "API GATEWAY",
          role: "High-performance asynchronous API serving equities and screener metrics",
          detail:
            "Stateless async REST API serving factor rankings, filtered screener sets, and caching historical OHLCV data with Pydantic validation.",
          x: 39,
          y: 30,
          color: "#059669",
          iconKey: "fastapi",
          inputs: ["Screener Queries", "Ticker Symbols", "Timeframe Filters"],
          outputs: ["JSON Factor Scores", "Filtered Equity Lists", "Summary Metrics"],
        },
        {
          id: "tv",
          label: "TradingView Engine",
          tech: "Lightweight Charts v4",
          category: "VISUALIZATION",
          role: "High-frequency canvas charting with custom quantitative overlays",
          detail:
            "Embedded Lightweight Charts rendering multi-timeframe candlestick data, volume profile bars, VWAP lines, and EMA-20 bands with zero iframe lag.",
          x: 39,
          y: 70,
          color: "#2563EB",
          iconKey: "tradingview",
          inputs: ["OHLCV Candlestick Feed", "Indicator Overlays", "Chart Slices"],
          outputs: ["Interactive Canvas", "Crosshair Data", "Price Scales"],
        },
        {
          id: "quant",
          label: "Quant Engine",
          tech: "NumPy + Pandas Vectorization",
          category: "COMPUTE",
          role: "Mathematical factor modeling, momentum scores, and support/resistance detection",
          detail:
            "Vectorized calculations computing RSI-14, Relative Volume (RVOL), MACD divergences, and composite multi-factor ranking across 50 equities in milliseconds.",
          x: 65,
          y: 30,
          color: "#E11D48",
          iconKey: "numpy",
          inputs: ["Raw Daily & Intraday OHLCV", "Lookback Windows (20/50/200D)"],
          outputs: ["Composite Quant Scores", "Breakout Flags", "Support/Resistance"],
        },
        {
          id: "data",
          label: "Market Data Pipeline",
          tech: "NSE API + yfinance Pipeline",
          category: "DATA INGESTION",
          role: "Reliable market feed fetching, sanitization, and delta cache updates",
          detail:
            "Scheduled batch fetchers ingesting adjusted closing prices, volume spikes, and order-book snapshots with local Redis-like memory caches.",
          x: 65,
          y: 70,
          color: "#0891B2",
          iconKey: "database",
          inputs: ["NSE Exchange Ticker Feed", "Scheduled Cron Triggers"],
          outputs: ["Sanitized OHLCV Arrays", "Market Depth Book", "Sector Breadth"],
        },
        {
          id: "qa",
          label: "PyTest QA Layer",
          tech: "PyTest + VCR Regression CI",
          category: "VALIDATION & CI",
          role: "Automated mathematical regression testing and data fixture replay",
          detail:
            "Continuous validation suite verifying technical indicator math against verified benchmark formulas with recorded deterministic API fixtures.",
          x: 88,
          y: 50,
          color: "#8B5CF6",
          iconKey: "pytest",
          inputs: ["Factor Output Payloads", "Historical Price Fixtures"],
          outputs: ["Regression Assertions", "Coverage Reports", "CI Status"],
        },
      ],
      edges: [
        {
          from: "ui",
          to: "api",
          label: "REST / JSON",
          protocol: "HTTPS / REST",
          payload: "Filter queries & screener presets",
          type: "rest",
        },
        {
          from: "ui",
          to: "tv",
          label: "OHLCV Binding",
          protocol: "Canvas Data Binding",
          payload: "Candlestick arrays & overlays",
          type: "stream",
        },
        {
          from: "api",
          to: "quant",
          label: "Compute",
          protocol: "Async Python Call",
          payload: "Vectorized factor evaluation",
          type: "compute",
        },
        {
          from: "api",
          to: "data",
          label: "Fetch Feed",
          protocol: "In-Memory Delta",
          payload: "Cached tick data & order book",
          type: "rest",
        },
        {
          from: "quant",
          to: "qa",
          label: "Assert",
          protocol: "PyTest Harness",
          payload: "Mathematical factor validation",
          type: "event",
        },
        {
          from: "data",
          to: "tv",
          label: "Stream Ticks",
          protocol: "Time-series Feed",
          payload: "Real-time OHLCV updates",
          type: "stream",
        },
      ],
    },
    engineeringDecisions: [
      {
        problem: "Real-time screener results were slow on large dataset queries.",
        decision:
          "Moved factor computation server-side to FastAPI with pre-computed nightly caches for heavy indicators, serving delta updates only.",
        result:
          "Screener queries dropped from ~3s to under 400ms with consistent accuracy.",
        detail:
          "By separating compute (Python NumPy pipelines) from rendering (Next.js), we could cache expensive calculations like RSI and momentum overnight and only recompute on market open delta. This avoided shipping raw data to the client for local computation.",
      },
      {
        problem:
          "Embedding TradingView charts with custom overlays proved unreliable via iframe.",
        decision:
          "Switched to TradingView Lightweight Charts library for direct integration, adding custom VWAP/EMA plugins as React components.",
        result:
          "Full control over chart rendering, overlays, and data binding with no iframe cross-origin constraints.",
        detail:
          "Lightweight Charts gave us programmatic access to series, markers, and price scale — which iframes block entirely. Custom indicator plugins were written as small TypeScript classes extending the ISeriesPrimitive interface.",
      },
      {
        problem:
          "PyTest suite was tightly coupled to live market data, making CI flaky.",
        decision:
          "Introduced VCR-style fixture recording to snapshot real API responses, replaying them in CI without live network calls.",
        result:
          "100% deterministic CI runs with zero flakiness from market data variability.",
        detail:
          "Each test fixture records a live response once and serializes to JSON. CI replays from fixtures, ensuring the same test assertions run regardless of market hours or data availability.",
      },
    ],
    outcomes: [
      { value: "< 400ms", label: "Screener query latency", note: "down from ~3s" },
      { value: "50", label: "NIFTY equities covered", note: "real-time universe" },
      { value: "6", label: "Trading screens", note: "terminal to analytics" },
    ],
  },
  {
    projectId: "Mentora",
    headline:
      "AI-powered assessments — from exam creation to automated grading.",
    heroImage: "/projects/mentora/home.png",
    features: [
      {
        title: "AI Exam Generator",
        description:
          "Upload textbook material; Groq LLM generates CBSE-aligned exam sheets and answer keys in seconds.",
        image: "/projects/mentora/creator.png",
        icon: "Sparkles",
        span: "wide",
      },
      {
        title: "Automated Grading",
        description:
          "AI grading engine provides concept-gap tagging, qualitative feedback, and detailed scoring metrics.",
        image: "/projects/mentora/grading.png",
        icon: "CheckCircle2",
        span: "normal",
      },
      {
        title: "Student Practice Lab",
        description:
          "SM-2 spaced repetition surfaces weak concepts. 24/7 AI tutor answers doubts instantly.",
        image: "/projects/mentora/student.png",
        icon: "Brain",
        span: "normal",
      },
      {
        title: "Parent Analytics Portal",
        description:
          "Real-time competency tracker with grade metrics, announcements, and upcoming deadlines.",
        image: "/projects/mentora/parent.png",
        icon: "BarChart3",
        span: "wide",
      },
    ],
    architecture: {
      nodes: [
        {
          id: "client",
          label: "Next.js App Router",
          tech: "Next.js 14 + Zustand",
          category: "CLIENT / ROLE-BASED",
          role: "Role-gated interfaces for Teachers, Students, and Parents",
          detail:
            "Client dashboard rendering interactive assessment builders, student test runners, and real-time generation progress via Zustand store.",
          x: 13,
          y: 50,
          color: "#F25C2A",
          iconKey: "nextjs",
          inputs: ["Role Sessions", "Exam Blueprints", "Student Answers"],
          outputs: ["API Mutations", "PDF Downloads", "WebSocket Subscriptions"],
        },
        {
          id: "api",
          label: "Express Gateway",
          tech: "Node.js + Express API",
          category: "API GATEWAY",
          role: "Authentication, validation, and asynchronous job dispatch",
          detail:
            "Secure Node.js service validating Clerk JWTs, enforcing school domain boundaries, and creating BullMQ queue jobs.",
          x: 39,
          y: 30,
          color: "#059669",
          iconKey: "express",
          inputs: ["Client HTTP Requests", "Clerk Session Tokens"],
          outputs: ["Enqueued Job IDs", "Scoped DB Queries"],
        },
        {
          id: "ws",
          label: "WebSocket Server",
          tech: "ws + Event Emitters",
          category: "STREAMING",
          role: "Real-time push channel for asynchronous worker progress",
          detail:
            "Lightweight WebSocket server broadcasting live LLM token completion percentages and question compilation status to client dashboards.",
          x: 39,
          y: 70,
          color: "#0891B2",
          iconKey: "websocket",
          inputs: ["BullMQ Job Progress Events", "Client Subscriptions"],
          outputs: ["Live Progress Stream", "Completion Notifications"],
        },
        {
          id: "queue",
          label: "BullMQ Worker Pool",
          tech: "Redis + BullMQ",
          category: "ASYNC QUEUE",
          role: "Reliable background processing for compute-heavy generation and PDF rendering",
          detail:
            "Decoupled worker queues offloading Groq LLM queries, textbook OCR extraction, and PDFKit document generation from HTTP threads.",
          x: 65,
          y: 30,
          color: "#E11D48",
          iconKey: "redis",
          inputs: ["Assessment Blueprints", "Grading Jobs", "PDF Requests"],
          outputs: ["Completed Exam Schemas", "Compiled PDF Buffers"],
        },
        {
          id: "llm",
          label: "Groq LLaMA Inference",
          tech: "Groq API (LLaMA 3 70B)",
          category: "AI INFERENCE",
          role: "Sub-second natural language question formulation and evaluation",
          detail:
            "Ultra-low latency LLM inference executing structured prompts to generate curriculum-aligned questions, rubrics, and automated evaluations.",
          x: 65,
          y: 70,
          color: "#8B5CF6",
          iconKey: "groq",
          inputs: ["Structured Prompt Schema", "Curriculum Text Snippets"],
          outputs: ["JSON Question Sets", "Rubrics & Answers", "Feedback"],
        },
        {
          id: "db",
          label: "MongoDB & Clerk Auth",
          tech: "MongoDB Atlas + Clerk",
          category: "PERSISTENCE",
          role: "Multi-tenant document persistence and fine-grained RBAC",
          detail:
            "MongoDB stores exams, questions, and student grade histories, while Clerk manages session tokens and role metadata.",
          x: 88,
          y: 50,
          color: "#2563EB",
          iconKey: "mongodb",
          inputs: ["Graded Submissions", "User Metadata", "Exam Schemas"],
          outputs: ["Aggregated Analytics", "Role Scopes", "Historical Trends"],
        },
      ],
      edges: [
        {
          from: "client",
          to: "api",
          label: "REST / JWT",
          protocol: "HTTPS / REST",
          payload: "Assessment blueprints & submissions",
          type: "rest",
        },
        {
          from: "client",
          to: "ws",
          label: "WSS Feed",
          protocol: "WebSocket (WSS)",
          payload: "Real-time client progress sync",
          type: "stream",
        },
        {
          from: "api",
          to: "queue",
          label: "Enqueue Job",
          protocol: "Redis Stream",
          payload: "Background assessment payload",
          type: "compute",
        },
        {
          from: "queue",
          to: "llm",
          label: "LLM Inference",
          protocol: "Groq High-Speed API",
          payload: "Structured JSON schema prompt",
          type: "compute",
        },
        {
          from: "queue",
          to: "db",
          label: "Persist",
          protocol: "Mongoose ODM",
          payload: "Exams, rubrics & submission records",
          type: "event",
        },
        {
          from: "ws",
          to: "client",
          label: "Progress Push",
          protocol: "WebSocket",
          payload: "Completion events & percentage",
          type: "stream",
        },
        {
          from: "api",
          to: "db",
          label: "Role Scope",
          protocol: "MongoDB Query",
          payload: "User documents & assessments",
          type: "rest",
        },
      ],
    },
    engineeringDecisions: [
      {
        problem:
          "LLM generation (5–20s) would block HTTP requests and timeout in serverless environments.",
        decision:
          "Decoupled generation from request lifecycle using BullMQ job queues backed by Redis, with WebSocket progress pushes.",
        result:
          "HTTP requests return instantly; real-time progress streams to the UI without polling.",
        detail:
          "The Express gateway enqueues a job and immediately responds with a jobId. A BullMQ worker pool processes the job and emits completion events over WebSocket to the connected client. This pattern scales horizontally by adding workers.",
      },
      {
        problem:
          "CBSE-aligned question generation required strict curriculum constraints Groq couldn't reliably enforce alone.",
        decision:
          "Engineered structured prompt templates with chapter/difficulty/bloom-level parameters, with post-processing validation loops.",
        result:
          "Generated exams consistently matched CBSE format with minimal manual correction.",
        detail:
          "Each generation call uses a JSON schema output mode to force structured responses. A post-processing step validates question counts, marks allocation, and answer key completeness before persisting to MongoDB.",
      },
      {
        problem:
          "Three user roles (Teacher, Student, Parent) with overlapping data access created complex authorization logic.",
        decision:
          "Used Clerk's metadata system to encode roles, with server-side route guards mapping roles to data scopes.",
        result: "Zero role confusion in production; clean separation of data views per role.",
        detail:
          "Clerk's publicMetadata stores the user role set at registration. Express middleware reads the JWT and resolves a data scope object. MongoDB queries are pre-filtered by scope before returning to the client.",
      },
    ],
    outcomes: [
      { value: "< 2s", label: "Exam job initiation", note: "instant async enqueue" },
      { value: "5", label: "Role-gated views", note: "Teacher, Student, Parent" },
      { value: "CBSE", label: "Curriculum alignment", note: "structured LLM output" },
    ],
  },
  {
    projectId: "wpbot-news",
    headline:
      "Detecting phishing links, fake news, and deepfakes — where conversations happen.",
    heroImage: "/projects/wpbot-news/phishing.png",
    features: [
      {
        title: "Phishing Link Detection",
        description:
          "Real-time heuristic and reputation scoring flags malicious URLs shared in WhatsApp chats.",
        image: "/projects/wpbot-news/phishing.png",
        icon: "ShieldAlert",
        span: "wide",
      },
      {
        title: "Fake News Analysis",
        description:
          "NLP-powered source verification and FAISS similarity search detects fabricated news stories.",
        image: "/projects/wpbot-news/fakenews.png",
        icon: "FileSearch",
        span: "normal",
      },
      {
        title: "Deepfake Detection",
        description:
          "FaceForensics++ model identifies manipulated media in shared images and videos.",
        icon: "ScanFace",
        span: "normal",
      },
      {
        title: "WhatsApp Native",
        description:
          "Integrates via Baileys WhatsApp Web API — no app install required for end users.",
        icon: "MessageCircle",
        span: "wide",
      },
    ],
    architecture: {
      nodes: [
        {
          id: "wa",
          label: "WhatsApp Session",
          tech: "Baileys WA Web API",
          category: "INTERFACE",
          role: "Headless WhatsApp Web socket handling inbound messages & replies",
          detail:
            "Persistent reverse-engineered multi-device WhatsApp session receiving audio, video, text, and URL payloads from real users.",
          x: 13,
          y: 50,
          color: "#25D366",
          iconKey: "whatsapp",
          inputs: ["Incoming WhatsApp Chats", "Group Forwards", "Media Uploads"],
          outputs: ["Parsed Chat Messages", "Dispatched Verification Cards"],
        },
        {
          id: "router",
          label: "Message Router",
          tech: "Node.js Event Dispatcher",
          category: "ORCHESTRATOR",
          role: "Payload classifier routing text, media, and links to target models",
          detail:
            "Extracts URLs, text bodies, and video frames, dispatching to concurrent Python child processes for rapid classification.",
          x: 39,
          y: 50,
          color: "#F25C2A",
          iconKey: "router",
          inputs: ["Raw WhatsApp Messages"],
          outputs: ["Extracted URLs", "Embedded News Texts", "Keyframe Buffers"],
        },
        {
          id: "phishing",
          label: "Phishing Engine",
          tech: "Heuristics & Domain Scorer",
          category: "URL SECURITY",
          role: "Real-time malicious domain and credential harvesting detection",
          detail:
            "Checks URLs against reputation registries, homoglyph character spoofing, and SSL certificate validity in under 50ms.",
          x: 65,
          y: 24,
          color: "#EF4444",
          iconKey: "phishing",
          inputs: ["Extracted Links", "Redirect Chains"],
          outputs: ["Threat Reputation Score", "Malicious Flag & Reason"],
        },
        {
          id: "nlp",
          label: "NLP Fact Engine",
          tech: "FAISS + PyTorch Embeddings",
          category: "SEMANTIC SEARCH",
          role: "Vector search against verified news corpus to detect disinformation",
          detail:
            "Sentence-transformers embed incoming claims, performing sub-200ms cosine similarity search across indexed authoritative news archives.",
          x: 65,
          y: 50,
          color: "#8B5CF6",
          iconKey: "nlp",
          inputs: ["Forwarded News Text", "In-Memory Vector Corpus"],
          outputs: ["Similarity Confidence", "Matched Fact Check Source"],
        },
        {
          id: "deepfake",
          label: "Deepfake Detector",
          tech: "FaceForensics++ CNN",
          category: "VISION AI",
          role: "Spatial-temporal manipulation detection in facial videos and photos",
          detail:
            "CNN pipeline extracting faces via MTCNN and detecting warping artifacts, blending boundaries, and synthetic facial features.",
          x: 65,
          y: 76,
          color: "#0891B2",
          iconKey: "deepfake",
          inputs: ["Keyframe Media Streams", "Video Chunks"],
          outputs: ["Deepfake Probability Score", "Artifact Heatmap"],
        },
        {
          id: "resp",
          label: "Verdict Dispatcher",
          tech: "Node.js Formatter",
          category: "DISPATCH",
          role: "Synthesizes multi-model scores into concise WhatsApp warnings",
          detail:
            "Aggregates confidence scores from all three engines into friendly, emoji-annotated WhatsApp warning cards with verification links.",
          x: 88,
          y: 50,
          color: "#059669",
          iconKey: "resp",
          inputs: ["Security Engine Scores", "Matched Fact Checks"],
          outputs: ["Formatted WhatsApp Verdict Message"],
        },
      ],
      edges: [
        {
          from: "wa",
          to: "router",
          label: "Inbound Message",
          protocol: "Baileys WebSocket",
          payload: "Incoming chat event & media buffer",
          type: "stream",
        },
        {
          from: "router",
          to: "phishing",
          label: "URL Payload",
          protocol: "IPC Child Process",
          payload: "Extracted domains and URLs",
          type: "rest",
        },
        {
          from: "router",
          to: "nlp",
          label: "Text Payload",
          protocol: "IPC Python Pipe",
          payload: "News claims & forward body",
          type: "compute",
        },
        {
          from: "router",
          to: "deepfake",
          label: "Video Frames",
          protocol: "Shared Memory Pipe",
          payload: "Extracted face video frames",
          type: "stream",
        },
        {
          from: "phishing",
          to: "resp",
          label: "URL Verdict",
          protocol: "JSON Result",
          payload: "Reputation score & risk level",
          type: "event",
        },
        {
          from: "nlp",
          to: "resp",
          label: "Fact Score",
          protocol: "Cosine Match",
          payload: "Credibility rating & citations",
          type: "event",
        },
        {
          from: "deepfake",
          to: "resp",
          label: "Vision Score",
          protocol: "CNN Confidence",
          payload: "Manipulation probability",
          type: "event",
        },
        {
          from: "resp",
          to: "wa",
          label: "Send Warning",
          protocol: "Baileys Send Message",
          payload: "Actionable verdict card",
          type: "stream",
        },
      ],
    },
    engineeringDecisions: [
      {
        problem:
          "WhatsApp has no official bot API — standard webhooks and business APIs are gated behind paid access.",
        decision:
          "Used Baileys, an open-source WhatsApp Web reverse-engineered client library, to run a persistent multi-device session.",
        result:
          "Full message send/receive capability with zero dependency on WhatsApp's paid tier.",
        detail:
          "Baileys re-implements the WhatsApp Web protocol in Node.js. The bot session runs as a long-lived process with QR-code auth. This was the core technical unlock that made the hackathon project viable in 36 hours.",
      },
      {
        problem:
          "FAISS similarity search over large news corpora was too slow for real-time WhatsApp responses.",
        decision:
          "Pre-indexed the news corpus into a flat FAISS index at startup; queries run in memory against the loaded index.",
        result: "News similarity checks complete in under 200ms regardless of corpus size.",
        detail:
          "The FAISS index is built once from embedded article vectors using sentence-transformers. At query time, the incoming text is embedded and L2-nearest-neighbors are retrieved from the in-memory index — avoiding disk I/O entirely.",
      },
      {
        problem:
          "Running three AI models (NLP, deepfake, phishing) in one process caused memory contention.",
        decision:
          "Isolated each detection module as a separate lightweight Python subprocess, invoked via Node.js child_process.",
        result:
          "Modular, stable architecture where any module can crash and restart without taking down the bot.",
        detail:
          "Node.js message router spawns Python subprocesses per analysis type. This also made it easy to swap models independently during the hackathon without coordinating across a monolith.",
      },
    ],
    outcomes: [
      { value: "1st", label: "Hackathon placement", note: "competitive buildathon" },
      { value: "3", label: "AI detection modules", note: "phishing, NLP, deepfake" },
      { value: "< 200ms", label: "FAISS similarity query", note: "in-memory index" },
    ],
  },
];

export function getCaseStudyData(projectId: string): CaseStudyData | null {
  return caseStudies.find((cs) => cs.projectId === projectId) || null;
}

/** Derive minimal fallback case study data from raw project config */
export function deriveFallbackCaseStudy(project: {
  id: string;
  companyName: string;
  shortDescription: string;
  techStack: string[];
  pagesInfoArr: { title: string; imgArr: string[]; description?: string }[];
}): CaseStudyData {
  return {
    projectId: project.id,
    headline: project.shortDescription,
    heroImage: project.pagesInfoArr?.[0]?.imgArr?.[0] || "",
    features: project.pagesInfoArr.slice(0, 4).map((p, i) => ({
      title: p.title,
      description: p.description || project.shortDescription,
      image: p.imgArr?.[0],
      icon: ["Layers", "Code2", "Zap", "Globe"][i] || "Layers",
      span: i === 0 ? "wide" : "normal",
    })),
    architecture: {
      nodes: project.techStack.slice(0, 4).map((tech, i) => ({
        id: `node-${i}`,
        label: tech,
        tech,
        category: "SYSTEM MODULE",
        role: `${tech} component in production pipeline`,
        detail: `${tech} is integrated as a core dependency for ${project.companyName}.`,
        x: [15, 40, 65, 88][i],
        y: [50, 30, 70, 50][i],
        color: ["#F25C2A", "#8B5CF6", "#059669", "#0891B2"][i],
        inputs: ["System events"],
        outputs: ["Processed state"],
      })),
      edges: [
        { from: "node-0", to: "node-1", label: "Dispatch", protocol: "Internal Protocol" },
        { from: "node-1", to: "node-2", label: "Process", protocol: "Pipeline Call" },
        { from: "node-2", to: "node-3", label: "Persist", protocol: "State Sync" },
      ],
    },
    engineeringDecisions: [],
    outcomes: [],
  };
}
