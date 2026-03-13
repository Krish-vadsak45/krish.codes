export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Projects",
  },
  {
    id: "tech",
    title: "Skills",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

export const technologies = [
  { name: "HTML 5",      icon: "html" },
  { name: "CSS 3",       icon: "css" },
  { name: "JavaScript",  icon: "javascript" },
  { name: "TypeScript",  icon: "typescript" },
  { name: "React JS",    icon: "react" },
  { name: "Node JS",     icon: "nodejs" },
  { name: "Next.js",     icon: "nextjs" },
  { name: "Tailwind CSS",icon: "tailwind" },
  { name: "MongoDB",     icon: "mongodb" },
  { name: "MySQL",       icon: "mysql" },
  { name: "Express.js",  icon: "express" },
  { name: "git",         icon: "git" },
  { name: "Docker",      icon: "docker" },
  { name: "GraphQL",     icon: "graphql" },
  { name: "Python",      icon: "python" },
];

export const projects = [
  {
    name: "NexusAI",
    description:
      "A production-grade, multi-tenant AI SaaS platform exposing nine distinct productivity tools — article writing, code generation, background removal, and video repurposing — under a unified workspace with tiered Stripe billing and project-level RBAC.",
    problem_statement:
      "AI productivity tools are fragmented across dozens of single-purpose applications, each with its own auth, billing, and storage. Teams need a unified workspace where they can collaborate on AI-generated content, control per-member access, and track usage costs against subscription limits.",
    role: "Full Stack Lead",
    tech_stack: [
      "Next.js 16 (App Router)",
      "React 19",
      "better-auth (OTP · Magic Link · TOTP 2FA · Google OAuth)",
      "Stripe Subscriptions + Webhooks",
      "MongoDB Atlas (13 models)",
      "Mongoose 8",
      "Gemini 2.5 Flash / Flash-Lite (raw REST)",
      "Pollinations.ai",
      "Cloudinary AI",
      "Google AI File API",
      "UploadThing",
      "Zod + react-hook-form",
      "Tailwind CSS v4 · shadcn/ui",
      "Vercel Cron",
    ],
    architecture_flow:
      "User Auth (better-auth) -> Quota Check (checkUsage) -> Prompt Construction -> Gemini REST / Pollinations / Cloudinary AI -> incrementUsage ($inc + DailyUsage upsert) -> History.create -> Stripe Webhook -> Subscription upsert -> Vercel Cron 04:00 UTC -> Daily counter reset",
    key_decisions: [
      "Chose better-auth over Clerk/NextAuth to own the full user model in MongoDB, eliminating per-MAU costs and enabling a post-registration hook that atomically bootstraps a Subscription document on every sign-up.",
      "Called the Gemini REST API directly via axios instead of the SDK — this unlocks explicit responseMimeType: 'application/json' control, precise maxOutputTokens budgeting per tool, and avoids SDK abstraction overhead.",
      "Used gemini-2.5-flash-lite for high-volume simple tasks (article/code/titles) and gemini-2.5-flash for reasoning-heavy tasks (resume review, summarization) — a two-model cost/quality split that reduces inference spend without sacrificing output depth.",
      "Implemented a compound unique index on DailyUsage { userId, date, feature } with findOneAndUpdate upsert:true — making every usage increment idempotent and safe against serverless cold-start retries.",
      "Modeled multi-tenancy as a Project document with a members[] array and rolePriority() hierarchy (owner ≥ editor ≥ viewer), keeping the schema simple while supporting fine-grained permissionsOverrides per member.",
      "Used a two-token invitation pattern (email token → claim token with shorter TTL) to prevent replay attacks — the email link verifies identity, and the claim token is a one-time-use credential for the actual project join.",
    ],
    impact: [
      "100% server-side quota enforcement — every AI request passes through checkUsage before any inference call, preventing quota bypass regardless of client behavior.",
      "Zero-cost image generation via Pollinations.ai URL construction — $0 per generation, enabling image tools on the free tier without incurring AI inference costs.",
      "Idempotent Stripe webhook handling — all four event types (checkout, invoice, update, delete) use findOneAndUpdate with upsert:true, making the handler safe to replay with no duplicate subscription records.",
      "Structured, type-safe AI outputs across all tools via JSON mode + Zod, achieving 100% type safety through the entire AI pipeline.",
      "Per-feature granular analytics via DailyUsage — tokens, request count, and success/fail breakdown per (user, day, feature) tuple enables precise cost attribution and usage reporting.",
    ],
    tags: [
      { name: "Next.js 16", color: "blue-text-gradient" },
      { name: "SaaS Billing", color: "green-text-gradient" },
      { name: "Multi-tenant AI", color: "pink-text-gradient" },
    ],
    gradient: "from-indigo-900 via-purple-900 to-pink-900",
    emoji: "🚀",
    period: "Ongoing – 2024/2025",
    source_code_link: "https://github.com/Krish-vadsak45/NexusAI",
    live_link: import.meta.env.VITE_NEXUS_AI_URL,
    portfolio_summary:
      "Built a production-grade multi-tool AI SaaS platform featuring nine Gemini-powered tools, server-side usage quota enforcement with Stripe-tiered billing, project-based multi-tenant RBAC with a two-token invitation system, and a Vercel Cron-driven daily reset infrastructure.",
  },
  {
    name: "MyShow",
    description:
      "A full-stack movie booking platform with atomic seat locking (no DB transactions), a LangChain tool-calling agent for natural-language booking queries, event-driven payment verification via Inngest, and a 5-chart aggregation-backed admin analytics suite.",
    problem_statement:
      "General-purpose e-ticket platforms suffer from race conditions during concurrent seat selection, lack personalized discovery, and provide no actionable revenue intelligence for admins. MyShow solves all three — atomic MongoDB conditional $set eliminates double-bookings, a genre-frequency recommendation engine surfaces matched films, and aggregation-backed analytics deliver per-day, per-movie, and per-hour booking intelligence.",
    role: "Full Stack Lead",
    tech_stack: [
      "React 19 + React Router v7",
      "Vite 6",
      "Node.js + Express 5",
      "Clerk Authentication (privateMetadata roles)",
      "MongoDB Atlas + Mongoose 8",
      "Stripe Checkout + Webhooks",
      "Inngest (8 background functions + cron)",
      "LangChain + Groq (tool-calling agent)",
      "Google Gemini via LangChain (AI chat)",
      "TMDB API",
      "Brevo SMTP (Nodemailer)",
      "html-to-image + jsPDF",
      "Recharts",
      "Tailwind CSS v4 · shadcn/ui",
      "Vercel (separate frontend + backend)",
    ],
    architecture_flow:
      "Clerk JWT Auth -> lockSeats (atomic $set occupiedSeats) -> Inngest: app/seats.locked (5-min TTL) -> createBooking -> Stripe Checkout Session -> payment_intent.succeeded Webhook -> isPaid=true + Inngest: app/show.booked -> Confirmation Email (Brevo) -> Inngest: app/checkpayment (10-min unpaid cleanup)",
    key_decisions: [
      "Used Inngest event-driven functions over setTimeout or cron jobs — seat release (5-min TTL), payment verification (10-min TTL), and email dispatch all survive server restarts, scale independently, and produce a full audit trail of every lifecycle transition.",
      "Implemented atomic seat locking with MongoDB conditional $set ({ $exists: false } filter) instead of database transactions — this is O(1) per seat, prevents race conditions on a per-seat basis, and avoids transaction overhead for what is ultimately a single-document operation.",
      "Built a LangChain tool-calling agent over a RAG approach because booking queries are structured (seat availability, show schedules, user history) not unstructured text. Each tool wraps a specific MongoDB aggregation pipeline, with user IDs injected server-side to prevent LLM-influenced data access.",
      "Used Express v5 (not v4) for its native async error propagation — rejected promises in route handlers are forwarded to error middleware automatically, eliminating try/catch boilerplate across all 8 route files.",
      "Stored user favourites in Clerk privateMetadata rather than MongoDB — eliminates a join on every user request and leverages Clerk's existing API, at the cost of tighter coupling to the auth provider.",
      "Scoped express.raw({ type: 'application/json' }) only to the /api/stripe route — Stripe's HMAC signature verification requires the raw request bytes, so mixing parsers at the app level would invalidate every webhook signature check.",
    ],
    impact: [
      "Zero double-bookings — atomic conditional $set eliminates race conditions without any transaction overhead across all concurrent seat selections.",
      "Automated seat cleanup — Inngest 5-min TTL releases abandoned locks without polling, keeping show inventory always accurate.",
      "Payment safety net — 10-minute Inngest timeout automatically reclaims seats from abandoned Stripe sessions, preventing inventory deadlock.",
      "74+ commits reflecting a mature, iteratively-developed production codebase with full booking, analytics, and notification systems.",
      "Scalable fan-out notifications — Inngest distributes new-show emails to all registered users as background tasks, completely decoupled from the admin HTTP response latency.",
    ],
    tags: [
      { name: "MERN + Inngest", color: "blue-text-gradient" },
      { name: "Event-Driven", color: "green-text-gradient" },
      { name: "LangChain Agent", color: "pink-text-gradient" },
    ],
    gradient: "from-blue-900 via-indigo-900 to-purple-900",
    emoji: "🎬",
    period: "Jun 2024 – Jul 2024",
    source_code_link: "https://github.com/Krish-vadsak45/MyShow",
    live_link: import.meta.env.VITE_MYSHOW_URL,
    portfolio_summary:
      "Engineered a full-stack movie booking platform with atomic seat-locking without database transactions, a LangChain tool-calling agent for natural-language booking queries, event-driven payment verification and seat cleanup via Inngest, and a 5-chart aggregation-backed admin analytics suite.",
  },
  {
    name: "ShopIQ",
    description:
      "A stateless AI trust engine for e-commerce reviews — prompt-engineered fake review detection using Gemini 2.5 Flash Lite at temperature 0, returning a trust probability score (0–100), genuine pros/cons, and an alternative product recommendation with zero infrastructure cost.",
    problem_statement:
      "E-commerce platforms are saturated with bot-generated and incentivized fake reviews. A product with 4.8 stars may have 60% fabricated feedback. Traditional statistical detection requires large datasets and infrastructure. ShopIQ solves this by encoding fake-review detection heuristics into a structured Gemini prompt, running deterministically at inference time with no database, no training data, and no backend beyond a single API key.",
    role: "AI Engineer",
    tech_stack: [
      "Next.js 15 (App Router)",
      "React 18",
      "Gemini 2.5 Flash Lite (REST, temperature: 0, JSON mode)",
      "Zod v4 + react-hook-form",
      "Tailwind CSS v3 + CSS variable token system",
      "shadcn/ui (style: new-york)",
      "axios",
      "Vercel (stateless serverless)",
    ],
    architecture_flow:
      "ReviewForm (Zod validation) -> POST /analyze-product -> Server-side URL pattern validation -> buildPrompt (role + heuristics + JSON schema) -> Gemini REST (temp:0, JSON mode, 800 tokens) -> Strip markdown fences -> JSON.parse -> HTTP 200 -> sessionStorage -> /analyze/result",
    key_decisions: [
      "Used prompt engineering as the entire detection algorithm — fake-review heuristics (repetitive language, unsubstantiated superlatives, sentiment uniformity, promotional signals) are encoded directly into the Gemini prompt. Setting temperature:0 makes outputs fully deterministic for identical inputs, functioning as a reproducible, auditable analysis engine with no ML training required.",
      "Specified responseMimeType: 'application/json' and embedded the exact output schema in the prompt — forcing the model to return only valid JSON and eliminating free-form text unpredictability. A markdown fence stripping step is retained as a defensive fallback.",
      "Implemented a GeminiError class with separate message (internal diagnostic) and safeMessage (user-safe string) properties — preventing API keys, upstream error codes, and stack traces from leaking to the client in HTTP 502 responses.",
      "Used sessionStorage for result state transfer instead of URL query params (length limits + browser history exposure) or a database (infrastructure cost + latency) — appropriate for single-session analysis results that require no persistence across tabs or reloads.",
      "Chose a stateless, zero-database architecture — the entire backend is a single Vercel Serverless function. Total infrastructure cost is one Gemini API key; the system scales to any traffic volume with no fixed running costs.",
    ],
    impact: [
      "Deterministic analysis — temperature:0 ensures identical inputs always produce identical outputs, making every analysis auditable and reproducible without a test harness.",
      "Conservative hallucination resistance — confirmed via runtime logs: sparse or invalid review inputs return empty arrays and 'Consider' verdict rather than fabricated content.",
      "Sub-second analysis latency — gemini-2.5-flash-lite with 800-token limit delivers structured trust reports typically within 1–2 seconds.",
      "Zero infrastructure cost — stateless serverless architecture with no database eliminates all fixed costs; total running cost scales linearly with Gemini API usage only.",
      "Capable of analyzing 100+ reviews in a single inference call — entire review corpus is passed as context, processing any volume within the 800-token output budget.",
    ],
    tags: [
      { name: "Gemini AI", color: "blue-text-gradient" },
      { name: "Prompt Engineering", color: "green-text-gradient" },
      { name: "TypeScript", color: "pink-text-gradient" },
    ],
    gradient: "from-emerald-900 via-teal-900 to-cyan-900",
    emoji: "🛍️",
    period: "Dec 2024",
    source_code_link: "https://github.com/Krish-vadsak45/ShopIQ",
    live_link: import.meta.env.VITE_SHOPIQ_URL,
    portfolio_summary:
      "Built a stateless AI trust engine for e-commerce reviews using a fully prompt-engineered fake review detector, deterministic Gemini JSON-mode inference, type-safe output parsing, and a zero-infrastructure Next.js architecture that scales to any traffic volume with no fixed running costs.",
  },
];

export const skillCategories = [
  {
    category: "Languages",
    skills: [
      {
        name: "TypeScript",
        level: "Experienced",
        project: "NexusAI",
        description: "Enforced type-safety across distributed systems.",
      },
      {
        name: "JavaScript",
        level: "Experienced",
        project: "MyShow Platform",
        description: "Engineered complex async aggregation flows.",
      },
      {
        name: "Python",
        level: "Intermediate",
        project: "AI Integration",
        description: "Automated data processing and model interfacing.",
      },
      {
        name: "C++",
        level: "Experienced",
        project: "LeetCode",
        description: "200+ problems solved with focus on memory & time complexity.",
      },
    ],
  },
  {
    category: "Frontend",
    skills: [
      {
        name: "React",
        level: "Experienced",
        project: "MyShow Platform",
        description: "Built dynamic hooks and context-driven state management.",
      },
      {
        name: "Next.js",
        level: "Experienced",
        project: "NexusAI",
        description: "Implemented SSR, PPR, and optimized App Router patterns.",
      },
      {
        name: "Tailwind CSS",
        level: "Experienced",
        project: "All Projects",
        description: "Designed premium responsive UIs with glassmorphism.",
      },
      {
        name: "Framer Motion",
        level: "Intermediate",
        project: "Portfolio",
        description: "Created high-end micro-animations and page transitions.",
      },
    ],
  },
  {
    category: "Backend",
    skills: [
      {
        name: "Node.js",
        level: "Experienced",
        project: "MyShow Backend",
        description: "Built robust RESTful APIs with secure auth middleware.",
      },
      {
        name: "Express.js",
        level: "Experienced",
        project: "Backend Logic",
        description: "Mastered middleware chaining and error handling.",
      },
      {
        name: "GraphQL",
        level: "Intermediate",
        project: "API Optimization",
        description: "Reduced payload sizes via efficient type-safe queries.",
      },
    ],
  },
  {
    category: "Databases",
    skills: [
      {
        name: "MongoDB",
        level: "Experienced",
        project: "MyShow / ShopIQ",
        description: "Designed complex schemas and aggregation pipelines.",
      },
      {
        name: "MySQL",
        level: "Intermediate",
        project: "Relational Data",
        description: "Optimized queries via indexing and JOIN operations.",
      },
    ],
  },
  {
    category: "Tools & DevOps",
    skills: [
      {
        name: "Docker",
        level: "Intermediate",
        project: "NexusAI / MyShow",
        description: "Containerized apps for consistent dev/prod parity.",
      },
      {
        name: "Git & GitHub",
        level: "Experienced",
        project: "Collaborative Dev",
        description: "Managed CI/CD workflows and complex branch merges.",
      },
      {
        name: "Stripe/Clerk/Auth",
        level: "Experienced",
        project: "Enterprise SaaS",
        description: "Integrated secure payments and user management.",
      },
    ],
  },
  {
    category: "AI & Automation",
    skills: [
      {
        name: "LangChain",
        level: "Experienced",
        project: "NexusAI / MyShow Agent",
        description: "Connected LLMs to dynamic database tools.",
      },
      {
        name: "Gemini AI",
        level: "Experienced",
        project: "ShopIQ / NexusAI",
        description: "Integrated advanced sentiment and reasoning models.",
      },
    ],
  },
];
