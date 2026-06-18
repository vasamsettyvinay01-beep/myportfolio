export const NAV_LINKS = [
  { label: "Stack", href: "#core" },
  { label: "Build story", href: "#systems" },
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
    activity: "SNIPR · CandidateMatch",
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
    activity: "D8 Copilot · docs",
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
  snipr: [
    { id: "ingest", label: "Ingest API", description: "Resume upload + ATS webhook ingestion", x: -120, y: -80, z: 0 },
    { id: "agents", label: "Scoring Agents", description: "Multi-agent fit scoring with RAG context", x: 0, y: -100, z: 20 },
    { id: "vector", label: "Vector Store", description: "pgvector embeddings + hybrid retrieval", x: 120, y: -60, z: 0 },
    { id: "queue", label: "Job Queue", description: "Async batch processing for scoring volume", x: -100, y: 60, z: 10 },
    { id: "monitor", label: "Monitoring", description: "Pipeline alerts + eval regression", x: 100, y: 80, z: 0 },
  ],
  candidatematch: [
    { id: "profiles", label: "Candidate Profiles", description: "Normalized applicant + role records", x: -110, y: -70, z: 0 },
    { id: "matcher", label: "Match Engine", description: "Fit scoring and rank ordering", x: 0, y: -90, z: 15 },
    { id: "review", label: "Review UI", description: "Recruiter approval before routing", x: 110, y: -60, z: 0 },
    { id: "ats", label: "ATS Sync", description: "Webhook push to existing pipelines", x: -90, y: 80, z: 10 },
    { id: "reports", label: "Match Reports", description: "Pipeline latency + match analytics", x: 100, y: 70, z: 0 },
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
  d8copilot: [
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

export type SystemStory = {
  era: string;
  opener: string;
  lesson: string;
  bridge?: string;
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
  story: SystemStory;
};

export const BUILD_STORY_INTRO = {
  title: "One system at a time",
  body: "Seven products, one timeline. Use the arrows or swipe the tiles — each chapter is a system that shipped.",
};

export const SYSTEMS: SystemCard[] = [
  {
    id: "snipr",
    name: "SNIPR",
    description: "AI scoring pipeline — multi-agent fit analysis, pgvector RAG, and ATS webhook ingestion.",
    stack: ["Python", "Claude", "PostgreSQL", "pgvector", "Redis"],
    metrics: [
      { label: "Core capability", value: "Multi-agent scoring" },
      { label: "Retrieval", value: "pgvector RAG" },
      { label: "Integration", value: "ATS webhooks" },
    ],
    links: {
      caseStudy: "/case-studies/snipr",
      architecture: "#architecture",
      github: "https://github.com/vasamsettyvinay01-beep/SNIPR",
    },
    previewNodes: ["Ingest", "Score", "Rank", "Route"],
    story: {
      era: "Chapter 01 · Scoring pipeline",
      opener:
        "ATS pipelines were manual and slow — recruiters couldn't score or route candidates at daily volume.",
      lesson:
        "Built SNIPR: multi-agent scoring, pgvector RAG, and ATS webhook ingestion in production.",
      bridge: "Scoring worked — recruiters still needed a dedicated matching product on top of it.",
    },
  },
  {
    id: "candidatematch",
    name: "CandidateMatch",
    description: "Recruiting match platform — ranks candidates to roles and routes approved matches through ATS workflows.",
    stack: ["Next.js", "Python", "Claude", "PostgreSQL", "REST"],
    metrics: [
      { label: "Surface", value: "Match ranking UI" },
      { label: "Workflow", value: "Recruiter review" },
      { label: "Integration", value: "ATS routing" },
    ],
    links: {
      caseStudy: "/case-studies/candidatematch",
      architecture: "#architecture",
    },
    previewNodes: ["Profile", "Match", "Review", "Route"],
    story: {
      era: "Chapter 02 · Recruiting product",
      opener:
        "Backend scoring wasn't enough — recruiters needed match ranking, review, and routing in one workflow.",
      lesson:
        "Shipped CandidateMatch: fit ranking, recruiter review gates, and ATS routing on daily recruiting volume.",
      bridge: "Matching shipped — but every workflow was still a script. I needed a runtime.",
    },
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
      caseStudy: "/case-studies/agentrix",
      architecture: "#architecture",
      github: "https://github.com/vasamsettyvinay01-beep/agentrix-foundation",
    },
    previewNodes: ["Router", "Tools", "Memory", "Monitor"],
    story: {
      era: "Chapter 03 · Orchestration",
      opener:
        "Agent workflows lived in scattered cron jobs — no router, no queues, no visibility when something failed.",
      lesson:
        "Built Agentrix: Claude tool-calling, BullMQ workers, dead-letter queues, and an ops dashboard.",
      bridge: "Agents could run — but client ops still needed billing, CRM, and scheduled automation.",
    },
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
      caseStudy: "/case-studies/orion",
      architecture: "#architecture",
      github: "https://github.com/vasamsettyvinay01-beep/orion-path-website",
    },
    previewNodes: ["CRM", "Billing", "Alerts", "Reports"],
    story: {
      era: "Chapter 04 · Business ops",
      opener:
        "CRM, billing, and reporting ran in disconnected tools with manual handoffs between teams.",
      lesson:
        "Orion OS unified FastAPI services, Supabase state, Stripe billing, and webhook-driven integrations.",
      bridge: "Ops were automated — then teams needed an AI copilot for documents at scale.",
    },
  },
  {
    id: "d8copilot",
    name: "D8 Copilot",
    description: "AI document copilot — OCR, LLM extraction, and batch export from PDF and blueprint uploads.",
    stack: ["Python", "OCR", "LLM", "S3", "Celery"],
    metrics: [
      { label: "Input", value: "PDF / blueprint" },
      { label: "Processing", value: "Async batches" },
      { label: "Output", value: "Structured JSON" },
    ],
    links: {
      caseStudy: "/case-studies/d8copilot",
      architecture: "#architecture",
      github: "https://github.com/vasamsettyvinay01-beep",
    },
    previewNodes: ["Upload", "Parse", "Extract", "Export"],
    story: {
      era: "Chapter 05 · D8 Copilot",
      opener:
        "Blueprints and PDFs needed structured fields — manual extraction couldn't keep up with upload volume.",
      lesson:
        "D8 Copilot: S3 ingestion, OCR, LLM extraction, Celery batches, and pipeline monitoring.",
      bridge: "Document pipelines shipped — merchants still needed billing and POS in one surface.",
    },
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
    story: {
      era: "Chapter 06 · Merchant billing",
      opener:
        "Small merchants needed Stripe, invoices, and a ledger — not three separate tools.",
      lesson:
        "BillB POS: Prisma ledger, Stripe Connect, and a merchant-facing POS workflow in Next.js.",
      bridge: "SaaS surfaces were covered — job seekers still fought the same forms in every browser tab.",
    },
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
    story: {
      era: "Chapter 07 · Browser layer",
      opener:
        "Applying to roles meant retyping the same fields and losing track of where each application stood.",
      lesson:
        "Chrome MV3 extensions with role-based autofill, application tracking, and persistent storage.",
      bridge: "Seven systems, one stack — each chapter built on what the last one taught me.",
    },
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
    description: "Cross-session context with vector retrieval — extending what SNIPR and CandidateMatch already do.",
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
  tagline: string;
  problem: string;
  solution: string;
  stack: string[];
  tradeoff: string;
  outcome: string;
  retrospective: string;
  highlights: { title: string; body: string }[];
};

export const CASE_STUDY_IDS = new Set([
  "snipr",
  "candidatematch",
  "agentrix",
  "orion",
  "d8copilot",
]);

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "snipr",
    name: "SNIPR",
    tagline: "Multi-agent scoring pipeline with RAG-backed context for high-volume ATS ingestion.",
    problem:
      "Recruiting teams couldn't score or route applicants at daily volume — ATS pipelines were manual and slow.",
    solution:
      "Built SNIPR with multi-agent fit scoring, pgvector RAG, and ATS webhook ingestion for production recruiting volume.",
    stack: ["Python", "Claude", "PostgreSQL", "pgvector", "Redis"],
    tradeoff:
      "Accuracy-first scoring with human review gates instead of fully autonomous hiring — compliance and trust over raw speed.",
    outcome:
      "Production scoring pipeline handling daily ATS volume with RAG-backed agent reasoning and webhook routing.",
    retrospective:
      "I'd instrument eval sets earlier — production drift was harder to catch before we had regression suites on scoring outputs.",
    highlights: [
      {
        title: "RAG-backed scoring",
        body: "pgvector retrieval grounds each score in resume and job context with citation-backed reasoning.",
      },
      {
        title: "ATS webhook ingest",
        body: "Incoming applicant events trigger async scoring without replacing the ATS.",
      },
      {
        title: "Multi-agent pipeline",
        body: "Specialized agents handle ingest, scoring, ranking, and route decisions with review checkpoints.",
      },
    ],
  },
  {
    id: "candidatematch",
    name: "CandidateMatch",
    tagline: "Recruiter-facing match platform — rank, review, and route candidates to open roles.",
    problem:
      "Scoring pipelines existed, but recruiters still lacked a product workflow for match ranking and approved routing.",
    solution:
      "Built CandidateMatch as a dedicated matching surface: fit ranking, recruiter review gates, and ATS routing on top of production scoring.",
    stack: ["Next.js", "Python", "Claude", "PostgreSQL", "REST"],
    tradeoff:
      "Recruiter-in-the-loop review on every high-stakes match instead of fully automated routing — trust over throughput.",
    outcome:
      "63% reduction in ATS processing latency with match ranking and routing in daily recruiting workflows.",
    retrospective:
      "I'd separate product analytics from pipeline metrics sooner — recruiters and engineers cared about different signals.",
    highlights: [
      {
        title: "Match ranking",
        body: "Candidates ordered by fit score with role context visible before recruiters approve routing.",
      },
      {
        title: "Review workflow",
        body: "High-stakes matches pause for recruiter approval before ATS updates fire.",
      },
      {
        title: "ATS routing",
        body: "Approved matches push back into existing ATS pipelines without manual copy-paste.",
      },
    ],
  },
  {
    id: "agentrix",
    name: "Agentrix",
    tagline: "The orchestration runtime for multi-agent ops workflows.",
    problem:
      "AI workflows lived in scattered scripts and cron jobs with no unified orchestration or visibility.",
    solution:
      "Built Agentrix — multi-agent routing, Claude tool-calling, BullMQ queues, and an ops dashboard for workflow monitoring.",
    stack: ["TypeScript", "Node.js", "Redis", "BullMQ", "Claude API"],
    tradeoff:
      "Queue reliability and dead-letter handling upfront instead of optimizing for lowest-latency single-shot calls.",
    outcome:
      "Production orchestration layer running concurrent agents with observable workflow execution.",
    retrospective:
      "I'd ship the DAG execution model sooner — linear queues worked but graph-based routing unlocked cleaner retries.",
    highlights: [
      {
        title: "Tool-calling router",
        body: "Claude agents pick tools from a typed registry with structured outputs and failure boundaries.",
      },
      {
        title: "BullMQ workers",
        body: "Redis-backed queues with retries, dead-letter handling, and worker health monitoring.",
      },
      {
        title: "Ops dashboard",
        body: "Live workflow state so operators see stuck jobs before users report them.",
      },
    ],
  },
  {
    id: "orion",
    name: "Orion OS",
    tagline: "Composable business ops — CRM, billing, webhooks, and cron in one stack.",
    problem:
      "Business ops ran across disconnected CRM, billing, and reporting tools with manual handoffs.",
    solution:
      "Unified ops infrastructure with FastAPI services, Supabase state, Stripe billing automation, and webhook-driven integrations.",
    stack: ["React", "FastAPI", "Supabase", "Stripe", "PostgreSQL"],
    tradeoff:
      "Composable integrations per client instead of a monolithic ERP — faster to ship, more surface area to maintain.",
    outcome:
      "Recurring ops automated across billing, CRM sync, and scheduled reporting with daily deploys.",
    retrospective:
      "I'd standardize webhook schemas across clients on day one — ad-hoc payloads slowed integration testing.",
    highlights: [
      {
        title: "Stripe automation",
        body: "Billing events trigger downstream CRM updates and invoice generation without manual reconciliation.",
      },
      {
        title: "Webhook hub",
        body: "Central ingress for third-party events with idempotency keys and replay-safe handlers.",
      },
      {
        title: "Scheduled workers",
        body: "Cron jobs for reporting, sync, and alert checks replace daily manual ops routines.",
      },
    ],
  },
  {
    id: "d8copilot",
    name: "D8 Copilot",
    tagline: "Document AI pipeline — from PDF upload to structured JSON at batch scale.",
    problem:
      "Teams needed structured data from PDFs and blueprints — manual extraction didn't scale.",
    solution:
      "D8 Copilot document pipeline: S3 ingestion, OCR preprocessing, LLM structured extraction, and Celery batch processing with monitoring.",
    stack: ["Python", "FastAPI", "S3", "Claude", "Celery", "PostgreSQL"],
    tradeoff:
      "Batch async processing for throughput and cost instead of sub-second per-document response times.",
    outcome:
      "High-volume document extraction with pipeline monitoring and alerting on workflow failures.",
    retrospective:
      "I'd add per-field confidence scores earlier — downstream consumers needed trust signals on extracted values.",
    highlights: [
      {
        title: "S3 ingestion",
        body: "Upload API stores originals and triggers async processing without blocking the client.",
      },
      {
        title: "OCR + LLM extract",
        body: "Preprocessing normalizes layouts before structured field extraction with schema validation.",
      },
      {
        title: "Pipeline monitoring",
        body: "Celery task health, failure alerts, and batch progress for ops teams running daily volume.",
      },
    ],
  },
];

export function getCaseStudyById(id: string): CaseStudy | undefined {
  return CASE_STUDIES.find((study) => study.id === id);
}

export function getSystemById(id: string): SystemCard | undefined {
  return SYSTEMS.find((system) => system.id === id);
}

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
