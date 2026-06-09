export const NAV_LINKS = [
  { label: "Stack", href: "#core" },
  { label: "Products", href: "#systems" },
  { label: "Architecture", href: "#architecture" },
  { label: "Ship log", href: "#terminal" },
  { label: "Research", href: "#ai-lab" },
  { label: "Case studies", href: "#intel" },
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

/** Production stack layers — each node maps to systems Vinay actually builds */
export const CORE_NODES: CoreNode[] = [
  {
    id: "agents",
    label: "AI Agents",
    metric: "Claude tool-calling",
    activity: "CandidateMatch · Agentrix",
    detail: "Multi-agent workflows with structured tool use, memory, and human review gates.",
    color: "#6E8BFF",
  },
  {
    id: "orchestrator",
    label: "Orchestrator",
    metric: "BullMQ + Redis",
    activity: "Queue routing",
    detail: "Async job orchestration with retries, dead-letter queues, and workflow observability.",
    color: "#B8C0CC",
  },
  {
    id: "vector",
    label: "Vector Memory",
    metric: "pgvector + RAG",
    activity: "Hybrid retrieval",
    detail: "Embeddings, reranking, and citation-backed context for recruiting and document AI.",
    color: "#74D3AE",
  },
  {
    id: "api",
    label: "API Layer",
    metric: "FastAPI · Next.js",
    activity: "Webhooks + REST",
    detail: "Production APIs and event streams for ATS integrations, billing, and ops tooling.",
    color: "#6E8BFF",
  },
  {
    id: "automation",
    label: "Automation",
    metric: "Workers + cron",
    activity: "Orion OS · pipelines",
    detail: "Scheduled jobs and event triggers that replace manual ops across client systems.",
    color: "#B8C0CC",
  },
  {
    id: "runtime",
    label: "Workflow Runtime",
    metric: "TypeScript · Python",
    activity: "Agentrix core",
    detail: "The execution layer where agent graphs, tool registries, and monitors connect.",
    color: "#6E8BFF",
  },
  {
    id: "cloud",
    label: "Cloud",
    metric: "AWS · ECS",
    activity: "Amplify · S3",
    detail: "Deployed infrastructure for APIs, document storage, and this portfolio.",
    color: "#74D3AE",
  },
  {
    id: "pipelines",
    label: "Data Pipelines",
    metric: "Celery · batch jobs",
    activity: "Door Intel · ATS",
    detail: "OCR, extraction, and scoring pipelines for documents and applicant volume.",
    color: "#B8C0CC",
  },
  {
    id: "ui",
    label: "Interfaces",
    metric: "React · Chrome MV3",
    activity: "Dashboards · extensions",
    detail: "Ops consoles, SaaS surfaces, and browser automation users interact with daily.",
    color: "#6E8BFF",
  },
  {
    id: "monitoring",
    label: "Monitoring",
    metric: "Logs · alerts",
    activity: "Eval regression",
    detail: "Pipeline health checks and model drift detection on production scoring workflows.",
    color: "#74D3AE",
  },
];

export const SHIPPING_LOG = [
  {
    date: "06/08/26",
    tag: "DEPLOY",
    message: "Portfolio deployed to AWS Amplify with animated operational UI.",
    level: "success" as const,
  },
  {
    date: "05/22/26",
    tag: "FIX",
    message: "Patched async orchestration deadlocks in Agentrix queue workers.",
    level: "info" as const,
  },
  {
    date: "05/20/26",
    tag: "SHIP",
    message: "Multi-agent routing layer shipped with Claude tool-calling.",
    level: "success" as const,
  },
  {
    date: "05/18/26",
    tag: "PERF",
    message: "CandidateMatch ATS processing latency reduced 63%.",
    level: "success" as const,
  },
  {
    date: "05/16/26",
    tag: "SHIP",
    message: "Chrome autofill extension — role-based form detection.",
    level: "success" as const,
  },
  {
    date: "05/14/26",
    tag: "INFRA",
    message: "Pipeline monitoring added for AI scoring workflows.",
    level: "info" as const,
  },
  {
    date: "05/12/26",
    tag: "SHIP",
    message: "Vector memory layer for cross-session agent context.",
    level: "success" as const,
  },
  {
    date: "05/10/26",
    tag: "SHIP",
    message: "Orion OS billing workflow dashboard launched.",
    level: "success" as const,
  },
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
    name: "CandidateMatch (SNIPR)",
    description: "AI recruiting platform — scores, ranks, and routes candidates from ATS pipelines.",
    stack: ["Next.js", "Python", "Claude", "PostgreSQL", "RAG"],
    metrics: [
      { label: "Core capability", value: "Multi-agent scoring" },
      { label: "Integration", value: "ATS webhooks" },
      { label: "Retrieval", value: "pgvector RAG" },
    ],
    links: {
      caseStudy: "#intel-candidatematch",
      architecture: "#architecture",
      github: "https://github.com/vasamsettyvinay01-beep/SNIPR",
    },
    previewNodes: ["Ingest", "Score", "Rank", "Route"],
  },
  {
    id: "agentrix",
    name: "Agentrix",
    description: "AI operations platform — workflow studio, onboarding, and multi-agent orchestration.",
    stack: ["TypeScript", "Node.js", "Redis", "Tool-calling", "Queues"],
    metrics: [
      { label: "Runtime", value: "Multi-agent router" },
      { label: "Queues", value: "BullMQ + Redis" },
      { label: "Tools", value: "Claude API" },
    ],
    links: {
      caseStudy: "#intel-agentrix",
      architecture: "#architecture",
      github: "https://github.com/vasamsettyvinay01-beep/agentrix-foundation",
    },
    previewNodes: ["Router", "Tools", "Memory", "Monitor"],
  },
  {
    id: "orion",
    name: "Orion OS",
    description: "Business ops infrastructure — CRM sync, billing, webhooks, and scheduled automation.",
    stack: ["React", "FastAPI", "Supabase", "Webhooks", "Cron"],
    metrics: [
      { label: "Billing", value: "Stripe automation" },
      { label: "Integrations", value: "Webhook hub" },
      { label: "Backend", value: "FastAPI + Supabase" },
    ],
    links: {
      caseStudy: "#intel-orion",
      architecture: "#architecture",
      github: "https://github.com/vasamsettyvinay01-beep/orion-path-website",
    },
    previewNodes: ["CRM", "Billing", "Alerts", "Reports"],
  },
  {
    id: "door",
    name: "Door Intelligence",
    description: "Construction document AI — OCR, LLM extraction, and batch export from PDF uploads.",
    stack: ["Python", "OCR", "LLM", "S3", "Celery"],
    metrics: [
      { label: "Input", value: "PDF / blueprint" },
      { label: "Processing", value: "Async batches" },
      { label: "Output", value: "Structured JSON" },
    ],
    links: {
      caseStudy: "#intel-door",
      architecture: "#architecture",
      github: "https://github.com/vasamsettyvinay01-beep",
    },
    previewNodes: ["Upload", "Parse", "Extract", "Export"],
  },
  {
    id: "billb",
    name: "BillB POS",
    description: "SaaS billing and POS workflows for merchants — Stripe, invoices, and ledger.",
    stack: ["Next.js", "Stripe", "Prisma", "PostgreSQL", "REST"],
    metrics: [
      { label: "Payments", value: "Stripe Connect" },
      { label: "Data", value: "Prisma ledger" },
      { label: "Surface", value: "Merchant POS" },
    ],
    links: {
      architecture: "#architecture",
      github: "https://github.com/vasamsettyvinay01-beep",
    },
    previewNodes: ["POS", "Invoices", "Payments", "Ledger"],
  },
  {
    id: "chrome",
    name: "Chrome Automation",
    description: "Browser extensions for job application tracking and intelligent form autofill.",
    stack: ["Chrome MV3", "TypeScript", "Content scripts", "Storage API"],
    metrics: [
      { label: "Autofill", value: "Role detection" },
      { label: "Tracking", value: "Application state" },
      { label: "Platform", value: "Manifest V3" },
    ],
    links: {
      architecture: "#architecture",
      github: "https://github.com/vasamsettyvinay01-beep",
    },
    previewNodes: ["Detect", "Fill", "Track", "Sync"],
  },
];

export const ARCHITECTURE_FLOW = [
  {
    id: "input",
    label: "Input",
    description: "Every system starts with real signals: ATS webhooks, PDF uploads, user actions, and third-party events.",
    color: "#6e8bff",
  },
  {
    id: "orchestration",
    label: "AI Orchestration",
    description: "Agents decide what to do — tool-calling, routing, memory retrieval, and human review when needed.",
    color: "#9b7bff",
  },
  {
    id: "backend",
    label: "Backend APIs",
    description: "FastAPI and Node services expose REST endpoints, webhooks, and queue producers consumers depend on.",
    color: "#6e8bff",
  },
  {
    id: "data",
    label: "Data Layer",
    description: "PostgreSQL for transactional state, pgvector for retrieval, S3 for documents.",
    color: "#74d3ae",
  },
  {
    id: "automation",
    label: "Automation",
    description: "Celery workers, cron jobs, and event triggers replace manual ops and batch heavy work.",
    color: "#9b7bff",
  },
  {
    id: "ui",
    label: "User Interface",
    description: "Dashboards, ops consoles, and Chrome extensions — where operators and end users actually interact.",
    color: "#6e8bff",
  },
  {
    id: "monitoring",
    label: "Monitoring",
    description: "Logs, alerts, and eval regression checks so production AI doesn't silently drift.",
    color: "#74d3ae",
  },
] as const;

export const RESEARCH_ITEMS = [
  {
    id: "voice",
    name: "Voice Agents",
    status: "active" as const,
    description: "Real-time voice interfaces wired to the same tool registry Agentrix uses.",
  },
  {
    id: "memory",
    name: "Long-horizon Agent Memory",
    status: "building" as const,
    description: "Cross-session context with vector retrieval — extending what CandidateMatch already does.",
  },
  {
    id: "eval",
    name: "Eval Frameworks",
    status: "active" as const,
    description: "Automated regression and drift detection for production scoring models.",
  },
  {
    id: "orchestration-proto",
    name: "DAG Execution Engine",
    status: "building" as const,
    description: "Next iteration of Agentrix — graph-based multi-agent execution instead of linear queues.",
  },
  {
    id: "rag",
    name: "Hybrid RAG",
    status: "active" as const,
    description: "Keyword + vector search with reranking — shipped in recruiting and document pipelines.",
  },
  {
    id: "browser",
    name: "Browser Automation",
    status: "active" as const,
    description: "Chrome MV3 extensions with intelligent form detection — shipped as Chrome Automation Suite.",
  },
  {
    id: "failed-rag",
    name: "Hybrid RAG v1",
    status: "archived" as const,
    description: "Archived — latency was too high for real-time ops. Informed the current pgvector approach.",
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

export const CASE_STUDY_IDS = new Set([
  "candidatematch",
  "agentrix",
  "orion",
  "door",
]);

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "candidatematch",
    name: "CandidateMatch",
    problem:
      "Recruiting teams couldn't score, rank, or route candidates at scale — ATS pipelines were manual and slow.",
    solution:
      "Built SNIPR/CandidateMatch with multi-agent scoring, RAG-backed candidate context, and automated routing integrated into existing ATS workflows.",
    stack: ["Next.js", "Python", "Claude", "PostgreSQL", "pgvector", "Redis"],
    tradeoff:
      "Accuracy-first scoring with human review gates instead of fully autonomous hiring — compliance and trust over raw speed.",
    outcome:
      "63% reduction in ATS processing latency and multi-agent scoring in production on daily recruiting volume.",
  },
  {
    id: "agentrix",
    name: "Agentrix",
    problem:
      "AI workflows lived in scattered scripts and cron jobs with no unified orchestration or visibility.",
    solution:
      "Built Agentrix — multi-agent routing, Claude tool-calling, BullMQ queues, and an ops dashboard for workflow monitoring.",
    stack: ["TypeScript", "Node.js", "Redis", "BullMQ", "Claude API"],
    tradeoff:
      "Queue reliability and dead-letter handling upfront instead of optimizing for lowest-latency single-shot calls.",
    outcome:
      "Production orchestration layer running concurrent agents with observable workflow execution.",
  },
  {
    id: "orion",
    name: "Orion OS",
    problem:
      "Business ops ran across disconnected CRM, billing, and reporting tools with manual handoffs.",
    solution:
      "Unified ops infrastructure with FastAPI services, Supabase state, Stripe billing automation, and webhook-driven integrations.",
    stack: ["React", "FastAPI", "Supabase", "Stripe", "PostgreSQL"],
    tradeoff:
      "Composable integrations per client instead of a monolithic ERP — faster to ship, more surface area to maintain.",
    outcome:
      "Recurring ops automated across billing, CRM sync, and scheduled reporting with daily deploys.",
  },
  {
    id: "door",
    name: "Door Intelligence",
    problem:
      "Construction teams needed structured data from PDFs and blueprints — manual extraction didn't scale.",
    solution:
      "Document pipeline: S3 ingestion, OCR preprocessing, LLM structured extraction, and Celery batch processing with monitoring.",
    stack: ["Python", "FastAPI", "S3", "Claude", "Celery", "PostgreSQL"],
    tradeoff:
      "Batch async processing for throughput and cost instead of sub-second per-document response times.",
    outcome:
      "High-volume document extraction with pipeline monitoring and alerting on workflow failures.",
  },
];

export const CONTACT_LINKS = {
  email: "mailto:vasamsettyvinay.01@gmail.com",
  phone: "tel:+15185367630",
  linkedin: "https://www.linkedin.com/in/vinayvasamsetty/",
  github: "https://github.com/vasamsettyvinay01-beep",
  schedule: "https://calendly.com/vasamsettyvinay-01/30min",
};

export const SITE = {
  name: "Vinay Vasamsetty",
  role: "AI Product Engineer · Founding Engineer",
  location: "Houston, TX",
  companies: "Creoventrix · OrionPath Technologies",
  headline: "I build AI systems that run in production.",
  subhead:
    "Technical founder shipping agent orchestration, recruiting intelligence, document AI, and ops automation — from architecture to deploy.",
};
