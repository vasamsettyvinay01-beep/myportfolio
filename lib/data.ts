export const NAV_LINKS = [
  { label: "Core", href: "#core" },
  { label: "Systems", href: "#systems" },
  { label: "Terminal", href: "#terminal" },
  { label: "AI Lab", href: "#ai-lab" },
  { label: "Intel", href: "#intel" },
  { label: "Contact", href: "#contact" },
] as const;

export type CoreNode = {
  id: string;
  label: string;
  metric: string;
  activity: string;
  detail: string;
  color: string;
};

export const CORE_NODES: CoreNode[] = [
  {
    id: "agents",
    label: "AI Agents",
    metric: "12 active",
    activity: "Routing tool calls",
    detail: "Multi-agent coordination with Claude tool-calling and memory-aware context windows.",
    color: "#6E8BFF",
  },
  {
    id: "orchestrator",
    label: "Orchestrator",
    metric: "847 req/min",
    activity: "Optimizing routes",
    detail: "Central workflow runtime managing queues, retries, and dead-letter recovery.",
    color: "#B8C0CC",
  },
  {
    id: "vector",
    label: "Vector Memory",
    metric: "2.4M vectors",
    activity: "Syncing embeddings",
    detail: "Hybrid retrieval with reranking for agent context and RAG pipelines.",
    color: "#74D3AE",
  },
  {
    id: "api",
    label: "API Layer",
    metric: "99.9% uptime",
    activity: "Processing webhooks",
    detail: "REST + event streams powering all operational interfaces.",
    color: "#6E8BFF",
  },
  {
    id: "automation",
    label: "Automation Engine",
    metric: "200+ flows",
    activity: "Executing triggers",
    detail: "Cron, workers, and event-driven automation across all systems.",
    color: "#B8C0CC",
  },
  {
    id: "runtime",
    label: "Workflow Runtime",
    metric: "0 deadlocks",
    activity: "Queue healthy",
    detail: "Async orchestration with BullMQ and observability hooks.",
    color: "#6E8BFF",
  },
  {
    id: "cloud",
    label: "Cloud Infrastructure",
    metric: "3 regions",
    activity: "Edge deploy active",
    detail: "ECS, serverless workers, and CDN edge for global ops.",
    color: "#74D3AE",
  },
  {
    id: "pipelines",
    label: "Data Pipelines",
    metric: "10K jobs/hr",
    activity: "Batch processing",
    detail: "ETL, document intelligence, and scoring pipeline orchestration.",
    color: "#B8C0CC",
  },
  {
    id: "ui",
    label: "User Interfaces",
    metric: "6 surfaces",
    activity: "Live dashboards",
    detail: "Ops consoles, SaaS dashboards, and Chrome extension interfaces.",
    color: "#6E8BFF",
  },
  {
    id: "monitoring",
    label: "Monitoring",
    metric: "All green",
    activity: "Tracing active",
    detail: "Logs, metrics, alerts, and eval regression checks.",
    color: "#74D3AE",
  },
];

export const LIVE_OPS_FEED = [
  { tag: "AI_AGENT", message: "Workflow completed — resume scoring batch", status: "ok" },
  { tag: "ORCHESTRATOR", message: "Route optimized — latency -18ms", status: "ok" },
  { tag: "VECTOR_DB", message: "Memory synced — 2,412 embeddings indexed", status: "ok" },
  { tag: "PIPELINE", message: "10,247 jobs processed in queue batch-7f2", status: "ok" },
  { tag: "INFRA", message: "Edge deployment updated — us-east-1", status: "ok" },
  { tag: "EVAL_ENGINE", message: "Regression checks passed — 0 drift", status: "ok" },
  { tag: "QUEUE", message: "Async orchestration — 0 deadlocks detected", status: "ok" },
  { tag: "DEPLOY", message: "Agentrix routing layer v2.1 live", status: "ok" },
  { tag: "AI_AGENT", message: "Document extraction complete — Door Intel", status: "ok" },
  { tag: "MONITOR", message: "Alert threshold nominal across all systems", status: "ok" },
  { tag: "MEMORY", message: "Cross-session context restored for agent-04", status: "ok" },
  { tag: "WORKFLOW", message: "Chrome autofill pipeline — 847 forms processed", status: "ok" },
] as const;

export const TERMINAL_LOG = [
  { time: "14:32:01", tag: "DEPLOY", message: "CandidateMatch v2.4 deployed to production", level: "info" },
  { time: "14:31:48", tag: "QUEUE", message: "Async orchestration optimized — deadlock patch applied", level: "info" },
  { time: "14:31:22", tag: "AI_AGENT", message: "Resume scoring completed — batch 7f2a (2,847 candidates)", level: "success" },
  { time: "14:30:55", tag: "MEMORY", message: "Vector index rebuilt — 2.4M embeddings synced", level: "info" },
  { time: "14:30:12", tag: "INFRA", message: "ECS cluster scaled — 4 → 8 workers (us-east-1)", level: "warn" },
  { time: "14:29:44", tag: "EVAL_ENGINE", message: "Regression checks passed — scoring model v3.2", level: "success" },
  { time: "14:29:01", tag: "ORCHESTRATOR", message: "Multi-agent routing layer active — Claude tool-calling", level: "info" },
  { time: "14:28:33", tag: "PIPELINE", message: "ATS processing latency reduced 63% — p99: 420ms", level: "success" },
  { time: "14:27:58", tag: "DEPLOY", message: "Agentrix orchestration v2.1 — zero-downtime rollout", level: "info" },
  { time: "14:27:11", tag: "AI_TRACE", message: "Tool call chain: search → rank → route → notify", level: "info" },
  { time: "14:26:40", tag: "WORKFLOW", message: "Chrome autofill — role-based form detection shipped", level: "success" },
  { time: "14:25:55", tag: "MONITOR", message: "Pipeline monitoring added for AI scoring workflows", level: "info" },
  { time: "14:25:02", tag: "INFRA", message: "Edge CDN cache invalidated — global propagation", level: "info" },
  { time: "14:24:18", tag: "QUEUE", message: "Dead letter queue empty — all retries resolved", level: "success" },
  { time: "14:23:44", tag: "AI_AGENT", message: "Document extraction — Door Intel batch complete", level: "info" },
] as const;

export type ExplodedLayer = {
  id: string;
  label: string;
  description: string;
  x: number;
  y: number;
  z: number;
};

export const EXPLODED_LAYERS: Record<string, ExplodedLayer[]> = {
  candidatematch: [
    { id: "ingest", label: "Ingest API", description: "Resume upload + ATS webhook ingestion", x: -120, y: -80, z: 0 },
    { id: "agents", label: "Scoring Agents", description: "Multi-agent fit scoring with RAG context", x: 0, y: -100, z: 20 },
    { id: "vector", label: "Vector Store", description: "pgvector embeddings + hybrid retrieval", x: 120, y: -60, z: 0 },
    { id: "queue", label: "Job Queue", description: "BullMQ async batch processing", x: -100, y: 60, z: 10 },
    { id: "monitor", label: "Monitoring", description: "Pipeline alerts + eval regression", x: 100, y: 80, z: 0 },
  ],
  agentrix: [
    { id: "router", label: "Agent Router", description: "Multi-agent routing with tool-calling", x: -110, y: -70, z: 15 },
    { id: "orchestrator", label: "Orchestrator", description: "Workflow runtime + queue management", x: 0, y: 0, z: 30 },
    { id: "tools", label: "Tool Registry", description: "Claude tool definitions + execution", x: 110, y: -80, z: 0 },
    { id: "redis", label: "Redis Queues", description: "BullMQ workers + dead-letter handling", x: -90, y: 90, z: 0 },
    { id: "dash", label: "Ops Dashboard", description: "Real-time workflow observability", x: 90, y: 70, z: 10 },
  ],
  orion: [
    { id: "crm", label: "CRM Sync", description: "Customer data orchestration", x: -100, y: -60, z: 0 },
    { id: "billing", label: "Billing Engine", description: "Stripe + invoice automation", x: 100, y: -70, z: 10 },
    { id: "webhooks", label: "Webhooks", description: "Event-driven integrations", x: 0, y: 100, z: 20 },
    { id: "cron", label: "Cron Workers", description: "Scheduled ops automation", x: -110, y: 50, z: 0 },
    { id: "reports", label: "Reports API", description: "Operational analytics layer", x: 110, y: 60, z: 0 },
  ],
  door: [
    { id: "upload", label: "Upload API", description: "PDF/document ingestion to S3", x: -120, y: 0, z: 0 },
    { id: "ocr", label: "OCR Pipeline", description: "Document preprocessing + parsing", x: 0, y: -90, z: 15 },
    { id: "extract", label: "LLM Extractor", description: "Structured field extraction", x: 120, y: 0, z: 0 },
    { id: "export", label: "Export API", description: "JSON/CSV output delivery", x: 0, y: 90, z: 10 },
  ],
  billb: [
    { id: "pos", label: "POS Interface", description: "Merchant point-of-sale UI", x: -100, y: -70, z: 0 },
    { id: "stripe", label: "Stripe Layer", description: "Payments + subscriptions", x: 100, y: -60, z: 10 },
    { id: "ledger", label: "Ledger DB", description: "Prisma + PostgreSQL transactions", x: 0, y: 90, z: 20 },
    { id: "api", label: "REST API", description: "Billing workflow endpoints", x: -110, y: 50, z: 0 },
  ],
  chrome: [
    { id: "detect", label: "Form Detector", description: "Role-based field detection", x: -110, y: -50, z: 0 },
    { id: "fill", label: "Autofill Engine", description: "Content script injection", x: 110, y: -60, z: 10 },
    { id: "track", label: "Job Tracker", description: "Application state sync", x: -90, y: 80, z: 0 },
    { id: "storage", label: "Storage API", description: "Chrome MV3 persistent state", x: 90, y: 70, z: 15 },
  ],
};

export const HERO_NODES = [
  { id: "ai-agents", label: "AI Agents", x: 50, y: 18 },
  { id: "workflow", label: "Workflow Engine", x: 78, y: 32 },
  { id: "apis", label: "APIs", x: 88, y: 58 },
  { id: "vector", label: "Vector Memory", x: 72, y: 78 },
  { id: "cloud", label: "Cloud Infra", x: 42, y: 82 },
  { id: "automation", label: "Automation", x: 18, y: 68 },
  { id: "pipelines", label: "Data Pipelines", x: 12, y: 38 },
  { id: "ui", label: "User Interfaces", x: 28, y: 22 },
] as const;

export const HERO_EDGES: [string, string][] = [
  ["ai-agents", "workflow"],
  ["workflow", "apis"],
  ["apis", "vector"],
  ["vector", "cloud"],
  ["cloud", "automation"],
  ["automation", "pipelines"],
  ["pipelines", "ui"],
  ["ui", "ai-agents"],
  ["ai-agents", "apis"],
  ["workflow", "vector"],
  ["automation", "cloud"],
];

export type SystemCard = {
  id: string;
  name: string;
  description: string;
  stack: string[];
  metrics: { label: string; value: string }[];
  links: {
    caseStudy?: string;
    architecture?: string;
    demo?: string;
    github?: string;
  };
  previewNodes: string[];
};

export const SYSTEMS: SystemCard[] = [
  {
    id: "candidatematch",
    name: "CandidateMatch",
    description: "AI-powered recruiting intelligence platform.",
    stack: ["Next.js", "Python", "Claude", "PostgreSQL", "RAG"],
    metrics: [
      { label: "Match accuracy", value: "94%" },
      { label: "Pipeline latency", value: "-63%" },
      { label: "Agents deployed", value: "12+" },
    ],
    links: {
      caseStudy: "#case-studies",
      architecture: "#architecture",
      demo: "#",
      github: "https://github.com/vasamsettyvinay01-beep",
    },
    previewNodes: ["Ingest", "Score", "Rank", "Route"],
  },
  {
    id: "agentrix",
    name: "Agentrix",
    description: "Operational AI orchestration system.",
    stack: ["TypeScript", "Node.js", "Redis", "Tool-calling", "Queues"],
    metrics: [
      { label: "Concurrent agents", value: "50+" },
      { label: "Uptime", value: "99.9%" },
      { label: "Workflows", value: "200+" },
    ],
    links: {
      caseStudy: "#case-studies",
      architecture: "#architecture",
      demo: "#",
      github: "https://github.com/vasamsettyvinay01-beep",
    },
    previewNodes: ["Router", "Tools", "Memory", "Monitor"],
  },
  {
    id: "orion",
    name: "Orion OS",
    description: "AI-powered business operations infrastructure.",
    stack: ["React", "FastAPI", "Supabase", "Webhooks", "Cron"],
    metrics: [
      { label: "Ops automated", value: "80%" },
      { label: "Integrations", value: "25+" },
      { label: "Deploy freq", value: "Daily" },
    ],
    links: {
      caseStudy: "#case-studies",
      architecture: "#architecture",
      demo: "#",
      github: "https://github.com/vasamsettyvinay01-beep",
    },
    previewNodes: ["CRM", "Billing", "Alerts", "Reports"],
  },
  {
    id: "door",
    name: "Door Intelligence Platform",
    description: "Construction document AI extraction system.",
    stack: ["Python", "OCR", "LLM", "S3", "PDF pipelines"],
    metrics: [
      { label: "Extraction accuracy", value: "97%" },
      { label: "Docs processed", value: "10K+" },
      { label: "Processing time", value: "<30s" },
    ],
    links: {
      caseStudy: "#case-studies",
      architecture: "#architecture",
      demo: "#",
      github: "https://github.com/vasamsettyvinay01-beep",
    },
    previewNodes: ["Upload", "Parse", "Extract", "Export"],
  },
  {
    id: "billb",
    name: "BillB POS",
    description: "Operational SaaS platform for business billing and workflows.",
    stack: ["Next.js", "Stripe", "Prisma", "PostgreSQL", "REST"],
    metrics: [
      { label: "Transactions", value: "$2M+" },
      { label: "Active merchants", value: "150+" },
      { label: "API latency", value: "<120ms" },
    ],
    links: {
      caseStudy: "#case-studies",
      architecture: "#architecture",
      demo: "#",
      github: "https://github.com/vasamsettyvinay01-beep",
    },
    previewNodes: ["POS", "Invoices", "Payments", "Ledger"],
  },
  {
    id: "chrome",
    name: "Chrome Automation Suite",
    description: "Job tracker and autofill automation extensions.",
    stack: ["Chrome MV3", "TypeScript", "Content scripts", "Storage API"],
    metrics: [
      { label: "Users", value: "5K+" },
      { label: "Forms autofilled", value: "50K+" },
      { label: "Time saved", value: "200h/mo" },
    ],
    links: {
      caseStudy: "#case-studies",
      architecture: "#architecture",
      demo: "#",
      github: "https://github.com/vasamsettyvinay01-beep",
    },
    previewNodes: ["Detect", "Fill", "Track", "Sync"],
  },
];

export const ARCHITECTURE_FLOW = [
  {
    id: "input",
    label: "Input",
    description: "Events, documents, user actions, webhooks",
    color: "#4F8CFF",
  },
  {
    id: "orchestration",
    label: "AI Orchestration",
    description: "Agents, tool-calling, routing, memory",
    color: "#7B61FF",
  },
  {
    id: "backend",
    label: "Backend APIs",
    description: "REST, GraphQL, queues, webhooks",
    color: "#4F8CFF",
  },
  {
    id: "data",
    label: "Data Layer",
    description: "PostgreSQL, vectors, object storage",
    color: "#2EE6A6",
  },
  {
    id: "automation",
    label: "Automation Layer",
    description: "Cron, workers, pipelines, triggers",
    color: "#7B61FF",
  },
  {
    id: "ui",
    label: "User Interface",
    description: "Dashboards, ops consoles, extensions",
    color: "#4F8CFF",
  },
  {
    id: "monitoring",
    label: "Monitoring",
    description: "Logs, alerts, metrics, tracing",
    color: "#2EE6A6",
  },
] as const;

export const SHIPPING_LOG = [
  {
    date: "05/22/26",
    message:
      "Patched async orchestration issue causing agent queue deadlocks.",
  },
  {
    date: "05/20/26",
    message:
      "Shipped multi-agent routing layer using Claude tool-calling.",
  },
  {
    date: "05/18/26",
    message: "Reduced ATS processing latency by 63%.",
  },
  {
    date: "05/16/26",
    message:
      "Built Chrome autofill workflow with role-based form detection.",
  },
  {
    date: "05/14/26",
    message: "Added pipeline monitoring for AI scoring workflows.",
  },
  {
    date: "05/12/26",
    message: "Deployed vector memory layer for cross-session agent context.",
  },
  {
    date: "05/10/26",
    message: "Launched operational dashboard for Orion OS billing workflows.",
  },
] as const;

export const AI_LAB_ITEMS = [
  {
    id: "voice",
    name: "Voice Agents",
    status: "active" as const,
    description: "Real-time voice interfaces with tool execution",
  },
  {
    id: "jarvis",
    name: "Jarvis Assistants",
    status: "active" as const,
    description: "Context-aware personal ops assistants",
  },
  {
    id: "workflow",
    name: "Workflow Automations",
    status: "active" as const,
    description: "Multi-step agent chains with human-in-the-loop",
  },
  {
    id: "memory",
    name: "Agent Memory Systems",
    status: "building" as const,
    description: "Long-horizon memory with vector retrieval",
  },
  {
    id: "scoring",
    name: "AI Scoring Engines",
    status: "active" as const,
    description: "Candidate and document ranking pipelines",
  },
  {
    id: "rag",
    name: "RAG Pipelines",
    status: "active" as const,
    description: "Hybrid search with reranking and citations",
  },
  {
    id: "browser",
    name: "Browser Automation",
    status: "active" as const,
    description: "Chrome extensions with intelligent form detection",
  },
] as const;

export const AI_LAB_EXTENDED = [
  ...AI_LAB_ITEMS,
  {
    id: "eval",
    name: "Eval Frameworks",
    status: "active" as const,
    description: "Automated regression + drift detection for scoring models",
    classification: "RESTRICTED",
  },
  {
    id: "orchestration-proto",
    name: "Orchestration Prototypes",
    status: "building" as const,
    description: "Next-gen multi-agent DAG execution engine",
    classification: "CLASSIFIED",
  },
  {
    id: "failed-rag",
    name: "Hybrid RAG v1",
    status: "archived" as const,
    description: "Failed experiment — latency too high for real-time ops",
    classification: "ARCHIVED",
  },
] as const;

export type CaseStudy = {
  id: string;
  name: string;
  problem: string;
  solution: string;
  stack: string[];
  tradeoff: string;
  outcome: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "candidatematch",
    name: "CandidateMatch",
    problem:
      "Recruiting teams drowned in resumes with no reliable way to score fit, rank candidates, or route to the right pipeline stage at scale.",
    solution:
      "Built an AI recruiting intelligence platform with multi-agent scoring, RAG-backed candidate context, and automated pipeline routing integrated with existing ATS workflows.",
    stack: ["Next.js", "Python", "Claude", "PostgreSQL", "pgvector", "Redis"],
    tradeoff:
      "Chose accuracy-first scoring with human review gates over fully autonomous hiring decisions — trust and compliance over speed.",
    outcome:
      "63% reduction in ATS processing latency, 94% match accuracy on validated sets, and 12+ production agents handling daily recruiting volume.",
  },
  {
    id: "agentrix",
    name: "Agentrix",
    problem:
      "Operational AI workflows fragmented across scripts, cron jobs, and one-off integrations with no unified orchestration or observability.",
    solution:
      "Designed an operational AI orchestration system with multi-agent routing, Claude tool-calling, queue-based execution, and real-time monitoring dashboards.",
    stack: ["TypeScript", "Node.js", "Redis", "BullMQ", "Claude API", "Grafana"],
    tradeoff:
      "Invested in queue reliability and dead-letter handling upfront rather than optimizing for lowest-latency single-shot calls.",
    outcome:
      "50+ concurrent agents, 200+ workflows in production, 99.9% uptime across orchestration layer.",
  },
  {
    id: "ats-pipeline",
    name: "ATS Resume Intelligence Pipeline",
    problem:
      "Resume parsing and intelligence extraction was slow, inconsistent, and couldn't scale with high-volume applicant traffic.",
    solution:
      "Engineered a document intelligence pipeline with OCR preprocessing, structured extraction, AI scoring, and async batch processing with monitoring hooks.",
    stack: ["Python", "FastAPI", "S3", "Claude", "PostgreSQL", "Celery"],
    tradeoff:
      "Batch async processing over real-time sync — optimized throughput and cost at the expense of sub-second individual response times.",
    outcome:
      "10K+ documents processed, 97% extraction accuracy, pipeline monitoring with alerting on scoring workflow failures.",
  },
];

export const CONTACT_LINKS = {
  email: "mailto:vasamsettyvinay.01@gmail.com",
  phone: "tel:+15185367630",
  linkedin: "https://www.linkedin.com/in/vinayvasamsetty/",
  github: "https://github.com/vasamsettyvinay01-beep",
  schedule: "https://calendly.com/vasamsettyvinay-01/30min",
};
