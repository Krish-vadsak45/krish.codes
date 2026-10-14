export const navLinks = Object.freeze([
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
] as const);

export const technologies = Object.freeze([
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
]);

export const projects = Object.freeze([
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
  {
    name: "PlacemateAI",
    description:
      "An intelligent placement and interview preparation assistant leveraging generative AI to conduct mock technical interviews, evaluate coding problem explanations, and analyze resumes against candidate target job roles.",
    problem_statement:
      "College students and aspiring engineers struggle with unstructured interview preparation and lack actionable, instant feedback on technical responses and resume ATS alignments. PlacemateAI delivers automated role-specific interview coaching and structured scoring pipelines.",
    role: "Full Stack Engineer",
    tech_stack: [
      "Next.js 15 (App Router)",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Gemini AI / LLM Orchestration",
      "Node.js",
      "MongoDB Atlas",
      "Zod Validation",
    ],
    architecture_flow:
      "Candidate Input -> Mock Question Dispatcher -> Audio/Text Response Capture -> Gemini Evaluation Stream -> Scoring & Feedback Breakdown -> Progress Dashboard",
    key_decisions: [
      "Architected prompt chaining to assess answers against rubric dimensions: technical accuracy, communication clarity, and edge case handling.",
      "Used Next.js streaming responses for interactive conversational latency during mock interviews.",
    ],
    impact: [
      "Real-time feedback loop with detailed scoringrubrics across algorithms, system design, and behavioral questions.",
      "Dynamic ATS resume parser comparing applicant skills directly with target JD bullet points.",
    ],
    tags: [
      { name: "AI Placement", color: "blue-text-gradient" },
      { name: "Next.js", color: "green-text-gradient" },
      { name: "TypeScript", color: "pink-text-gradient" },
    ],
    gradient: "from-indigo-950 via-violet-900 to-purple-900",
    emoji: "🎓",
    period: "2024",
    source_code_link: "https://github.com/Krish-vadsak45/PlacemateAI",
    live_link: "",
    portfolio_summary:
      "Built an AI-driven placement preparation workspace providing automated mock technical interviews, algorithmic feedback, and resume-to-role ATS benchmarking.",
  },
  {
    name: "Nasa-BloomWatch",
    description:
      "A planetary science and Earth observation application built for the NASA Space Apps Challenge to track global flowering phenology, vegetation index shifts, and environmental indicators over time.",
    problem_statement:
      "Monitoring changing seasonal blooms and climate-driven phenological shifts requires intuitive aggregation of satellite imagery and multi-spectral vegetative indicators for researchers and the public.",
    role: "Full Stack Developer",
    tech_stack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "NASA Earth Observation APIs",
      "Chart.js / Recharts",
      "Vite",
    ],
    architecture_flow:
      "NASA Earth Data API -> Geospatial Coordinate Normalization -> Phenology Metric Filtering -> Interactive Timeline & Visual Mapping Canvas",
    key_decisions: [
      "Cached satellite vegetation data locally to allow smooth timeline scrubbing and interactive regional comparisons.",
      "Designed an accessible visual palette for scientists and community contributors.",
    ],
    impact: [
      "Selected as NASA Space Apps Challenge submission.",
      "Visualized real-time flowering trends and ecological shifts across planetary biomes.",
    ],
    tags: [
      { name: "NASA Open Data", color: "blue-text-gradient" },
      { name: "Earth Observation", color: "green-text-gradient" },
      { name: "Geospatial", color: "pink-text-gradient" },
    ],
    gradient: "from-green-950 via-emerald-900 to-teal-900",
    emoji: "🌸",
    period: "2024",
    source_code_link: "https://github.com/Krish-vadsak45/Nasa-BloomWatch",
    live_link: "",
    portfolio_summary:
      "Engineered an Earth observation platform for the NASA Space Apps Challenge tracking global flowering phenology and vegetation indices via satellite datasets.",
  },
  {
    name: "AssetFlow-Management-Odoo",
    description:
      "An enterprise asset lifecycle management system featuring asset tracking, maintenance workflows, depreciation schedules, and automated inventory reconciliation.",
    problem_statement:
      "Enterprise teams lose track of equipment lifecycle stages and ongoing service costs without a centralized asset management ledger.",
    role: "Backend & Systems Developer",
    tech_stack: [
      "Python",
      "Odoo ERP Framework",
      "PostgreSQL",
      "XML Views",
      "Business Workflow Automation",
    ],
    architecture_flow:
      "Asset Acquisition -> Ledger Entry -> Depreciation Cron Job -> Maintenance Ticket Dispatch -> Asset Retirement / Audit Log",
    key_decisions: [
      "Implemented automated depreciation computation using straight-line and declining balance algorithms.",
      "Customized Odoo relational ORM models for high-throughput enterprise asset audit trails.",
    ],
    impact: [
      "Streamlined lifecycle audits and maintenance requests for distributed enterprise hardware.",
      "Automated financial depreciation reports with precision export.",
    ],
    tags: [
      { name: "Python", color: "blue-text-gradient" },
      { name: "Odoo ERP", color: "green-text-gradient" },
      { name: "PostgreSQL", color: "pink-text-gradient" },
    ],
    gradient: "from-amber-950 via-orange-900 to-yellow-900",
    emoji: "📦",
    period: "2024",
    source_code_link: "https://github.com/Krish-vadsak45/AssetFlow-Management-Odoo",
    live_link: "",
    portfolio_summary:
      "Developed an enterprise asset lifecycle and depreciation management module built on Python and Odoo with automated maintenance workflows.",
  },
  {
    name: "krish.codes (macOS Web OS)",
    description:
      "An ultra-premium, interactive macOS Sequoia/Sonoma Web Operating System portfolio featuring a 60 FPS Three.js 3D space backdrop, spring-physics floating dock, live terminal emulator, and native multi-window management.",
    problem_statement:
      "Standard developer portfolios are static, forgettable, and fail to demonstrate real-world frontend engineering mastery. krish.codes delivers an interactive operating system that users can explore with native feel.",
    role: "Creator & Lead Architect",
    tech_stack: [
      "React 19",
      "TypeScript",
      "Framer Motion",
      "Three.js / React Three Fiber",
      "Tailwind CSS v4",
      "Vite",
      "Canvas Confetti",
    ],
    architecture_flow:
      "DesktopContext State -> Z-Index Stack Manager -> Framer Motion Spring Engine -> WebGL Stars Canvas -> Window / Dock Interactivity",
    key_decisions: [
      "Implemented true macOS window physics: double-click titlebar zoom, drag bounding, minimize-to-dock, and spring magnification dock curve.",
      "Engineered bounded z-index layer architecture preventing menu overlap bugs while supporting infinite window re-ordering.",
    ],
    impact: [
      "Sub-millisecond interactive responsiveness at 60 FPS.",
      "Showcases full system capabilities, real profile metrics, and interactive developer CLI.",
    ],
    tags: [
      { name: "React 19", color: "blue-text-gradient" },
      { name: "Three.js 3D", color: "green-text-gradient" },
      { name: "Framer Motion", color: "pink-text-gradient" },
    ],
    gradient: "from-sky-950 via-blue-900 to-indigo-950",
    emoji: "💻",
    period: "2025",
    source_code_link: "https://github.com/Krish-vadsak45/krish.codes",
    live_link: "https://krishcodes.vercel.app",
    portfolio_summary:
      "Designed and built a complete interactive macOS Web OS portfolio with 3D Three.js space canvas, multi-windowing, live terminal shell, and spring dock.",
  },
]);

export const developerProfile = Object.freeze({
  name: "Krish Vadsak",
  role: "Full-Stack Software Engineer",
  tagline: "AI-Driven Web Apps & Scalable Systems",
  location: "Gujarat, India",
  openToRoles: "Full-Time Software Engineer / Full-Stack Engineer / Frontend Engineer",
  github: {
    username: "Krish-vadsak45",
    url: "https://github.com/Krish-vadsak45",
    publicRepos: 14,
    contributions: 575,
    commitsPastYear: 179,
    longestStreak: "31 Days",
    languages: [
      { name: "TypeScript", percentage: 78.9, color: "#3178c6" },
      { name: "JavaScript", percentage: 16.6, color: "#f7df1e" },
      { name: "CSS", percentage: 3.2, color: "#563d7c" },
      { name: "HTML", percentage: 1.2, color: "#e34c26" },
    ],
    featuredRepos: [
      "NexusAI",
      "MyShow",
      "ShopIQ",
      "PlacemateAI",
      "Nasa-BloomWatch",
      "AssetFlow-Management-Odoo",
      "krish.codes",
    ],
  },
  linkedin: {
    username: "krish-vadsak45",
    url: "https://www.linkedin.com/in/krish-vadsak45",
    headline: "Full-Stack Software Engineer | AI-Driven Web Apps & Scalable Systems",
    about:
      "Full-stack engineer passionate about crafting resilient, high-performance web applications, multi-tenant SaaS architectures, and AI integrations with Next.js, React, Node.js, and TypeScript.",
  },
  certificationsCount: 25,
  leetcode: {
    username: "G8KOATYwH6",
    url: "https://leetcode.com/u/G8KOATYwH6/",
    totalSolved: 217,
    totalAvailable: 4081,
    easy: { solved: 70, total: 971, beats: "76.5%" },
    medium: { solved: 132, total: 2128, beats: "68.2%" },
    hard: { solved: 15, total: 982, beats: "55.0%" },
    contestRating: 1360,
    topPercentage: "Top 91.2%",
    globalRanking: "786,873",
    primaryLanguage: "C++",
    languageSubmissions: { "C++": 217 },
    badgesCount: 4,
    badgeHighlight: "50 Days Badge 2025",
    topSkills: [
      { name: "Dynamic Programming", solved: 35 },
      { name: "Array", solved: 109 },
      { name: "String", solved: 42 },
      { name: "Two Pointers", solved: 36 },
      { name: "Hash Table", solved: 30 },
      { name: "Depth-First Search", solved: 28 },
      { name: "Math & Bitwise", solved: 26 },
      { name: "Monotonic Stack", solved: 10 },
      { name: "Union-Find & Graphs", solved: 6 },
    ],
  },
});

export const skillCategories = Object.freeze([
  {
    category: "Languages",
    skills: [
      {
        name: "TypeScript",
        level: "Experienced",
        project: "NexusAI & PlacemateAI",
        description: "Enforced type-safety across distributed full-stack systems (78.9% GitHub code).",
      },
      {
        name: "C++",
        level: "Experienced",
        project: "LeetCode (217 Solved)",
        description: "217 LeetCode problems solved with focus on optimal Time & Space complexity.",
      },
      {
        name: "JavaScript",
        level: "Experienced",
        project: "MyShow Platform",
        description: "Engineered complex async aggregation flows and real-time socket connections.",
      },
      {
        name: "Python",
        level: "Intermediate",
        project: "AssetFlow & AI Integration",
        description: "Automated data workflows, ERP models, and model interfacing.",
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
]);


export const CERTIFICATE_CATEGORIES = [
  "Hackathons & AI",
  "Full-Stack & Web",
  "AI & Machine Learning",
  "freeCodeCamp",
  "LeetCode Badges",
  "Cloud & DevOps",
] as const;

export type CertificateCategory = (typeof CERTIFICATE_CATEGORIES)[number];

export interface CertificateItem {
  id: string;
  title: string;
  subtitle: string;
  issuer: string;
  category: CertificateCategory;
  issueDate: string;
  credentialId?: string;
  verifyUrl?: string;
  driveUrl: string;
  localFile: string;
  fileType: "pdf" | "image";
  badgeText: string;
  description: string;
  skills: string[];
}

export const certificates: CertificateItem[] = Object.freeze([
  {
    id: "cert-1",
    title: "NASA Space Apps Challenge 2025",
    subtitle: "Galactic Problem Solver",
    issuer: "NASA International Space Apps Challenge",
    category: "Hackathons & AI",
    issueDate: "October 4-5, 2025",
    credentialId: "NASA-SPACEAPPS-2025",
    verifyUrl: "https://www.spaceappschallenge.org/",
    driveUrl: "https://drive.google.com/file/d/1NfI-aQVv08qtqKDXu4r1zVWov1I2PjwJ/view?usp=sharing",
    localFile: "/certs/1NfI-aQVv08qtqKDXu4r1zVWov1I2PjwJ_NASA Space Apps Challenge Certificate.pdf",
    fileType: "pdf",
    badgeText: "Galactic Problem Solver",
    description: "Awarded for outstanding participation and engineering efforts solving global challenges faced on Earth and in space at NASA's prestigious hackathon.",
    skills: ["Earth Observation", "Satellite Data", "Problem Solving", "Team Collaboration"]
  },
  {
    id: "cert-2",
    title: "Backend Web Development with Node.js & MongoDB",
    subtitle: "Production REST API & DB Architecture",
    issuer: "DevTown",
    category: "Full-Stack & Web",
    issueDate: "October 2024",
    credentialId: "1lN0PA",
    verifyUrl: "https://cert.devtown.in/verify/1lN0PA",
    driveUrl: "https://drive.google.com/file/d/1BifnkiH5WHNUs9ibqdkrGSTIU2Zd4fqI/view?usp=sharing",
    localFile: "/certs/1BifnkiH5WHNUs9ibqdkrGSTIU2Zd4fqI_Backend web development by Dewtown.pdf",
    fileType: "pdf",
    badgeText: "DevTown Backend Certified",
    description: "Hands-on backend development covering Node.js server pipelines, Express middleware, MongoDB aggregation, and authentication flows.",
    skills: ["Node.js", "MongoDB", "Express.js", "REST APIs"]
  },
  {
    id: "cert-3",
    title: "Koders 30-Day Summer Bootcamp",
    subtitle: "Full-Stack Engineering & Consistency",
    issuer: "Koders",
    category: "Full-Stack & Web",
    issueDate: "June 2026",
    credentialId: "KODERS-BOOTCAMP-2026",
    verifyUrl: "https://koders.in",
    driveUrl: "https://drive.google.com/file/d/14_oFGfJyjv0VBrXkxlaXYYglojpZkkue/view?usp=sharing",
    localFile: "/certs/14_oFGfJyjv0VBrXkxlaXYYglojpZkkue_KRISH_COMPLETION_CERTIFICATE_2.png",
    fileType: "image",
    badgeText: "Bootcamp Graduate",
    description: "Successfully completed 30-day intensive engineering bootcamp demonstrating consistency, dedication, and project delivery under CEO Kartikey Kushwah.",
    skills: ["Full Stack Dev", "Software Engineering", "System Design"]
  },
  {
    id: "cert-4",
    title: "Web Development Fundamentals",
    subtitle: "IBM SkillsBuild Official Credly Badge",
    issuer: "IBM SkillsBuild",
    category: "Full-Stack & Web",
    issueDate: "May 22, 2026",
    credentialId: "986859d8-a57a-4158-9b7e-705d303c1011",
    verifyUrl: "https://www.credly.com/badges/986859d8-a57a-4158-9b7e-705d303c1011",
    driveUrl: "https://drive.google.com/file/d/1BT_15VfptmQPBBBYzK_OXhb_FxQWQbV6/view?usp=sharing",
    localFile: "/certs/1BT_15VfptmQPBBBYzK_OXhb_FxQWQbV6_IBMDesign20260522-31-1z54up.pdf",
    fileType: "pdf",
    badgeText: "IBM Verified Credential",
    description: "Demonstrated mastery of web architecture principles, DOM manipulation, responsive layouts, and modern web application development verified on Credly.",
    skills: ["HTML5", "CSS3", "JavaScript", "Web Architecture"]
  },
  {
    id: "cert-5",
    title: "SuperHack 2025 Global AI Hackathon",
    subtitle: "Agentic AI for IT Management",
    issuer: "SuperOps & AWS / Hack2skill",
    category: "Hackathons & AI",
    issueDate: "2025",
    credentialId: "2025H2S09SH-P01399",
    verifyUrl: "https://hack2skill.com",
    driveUrl: "https://drive.google.com/file/d/1MesoabwCfEiP8whsAoiPfZbdvIkstE3u/view?usp=sharing",
    localFile: "/certs/1MesoabwCfEiP8whsAoiPfZbdvIkstE3u_Hack2skill-Certificate.png",
    fileType: "image",
    badgeText: "Global AI Hackathon",
    description: "Valuable engineering involvement building the future of autonomous Agentic AI solutions for real-world IT management powered by AWS.",
    skills: ["Agentic AI", "AWS", "LLM Agents", "Cloud Automation"]
  },
  {
    id: "cert-6",
    title: "Roadmap to Generative AI & ChatGPT",
    subtitle: "Technical Workshop by Sandeep Jain",
    issuer: "GeeksforGeeks",
    category: "AI & Machine Learning",
    issueDate: "August 2024",
    credentialId: "1e6a3317417e10c3bc752ce3d7d2ee46",
    verifyUrl: "https://media.geeksforgeeks.org/certificates/1724926220/1e6a3317417e10c3bc752ce3d7d2ee46.pdf",
    driveUrl: "https://drive.google.com/file/d/1O6jGUkH_UYchKD3CZkmO4xVbgCBYJIbM/view?usp=sharing",
    localFile: "/certs/1O6jGUkH_UYchKD3CZkmO4xVbgCBYJIbM_1e6a3317417e10c3bc752ce3d7d2ee46.pdf",
    fileType: "pdf",
    badgeText: "GFG Generative AI",
    description: "In-depth technical workshop covering foundation models, transformer architectures, prompt engineering, and LLM applications.",
    skills: ["Generative AI", "ChatGPT", "Prompt Engineering", "LLMs"]
  },
  {
    id: "cert-7",
    title: "Podar Startupthon 2K26 Grand Finale",
    subtitle: "National Level Startup & Tech Finale",
    issuer: "Podar Startupthon 2K26",
    category: "Hackathons & AI",
    issueDate: "October 8, 2026",
    credentialId: "PST26-PRT-02376",
    verifyUrl: "https://drive.google.com/file/d/1PS-q1cW_nEdaiqwBUHmU6VrGq6TqmY8h/view?usp=sharing",
    driveUrl: "https://drive.google.com/file/d/1PS-q1cW_nEdaiqwBUHmU6VrGq6TqmY8h/view?usp=sharing",
    localFile: "/certs/1PS-q1cW_nEdaiqwBUHmU6VrGq6TqmY8h_010157-krish-vadsak.pdf",
    fileType: "pdf",
    badgeText: "Grand Finale Participant",
    description: "Grand Finale Participant at Podar Startupthon 2K26 (Nawalgarh, Rajasthan) representing Team Clean with technical pitch and working prototype.",
    skills: ["Startup Engineering", "Product Strategy", "Prototyping"]
  },
  {
    id: "cert-8",
    title: "Backend Web Development with Node.js & MongoDB",
    subtitle: "Verified Node.js Server Engineering",
    issuer: "DevTown",
    category: "Full-Stack & Web",
    issueDate: "October 24, 2024",
    credentialId: "Z29ukh1",
    verifyUrl: "https://cert.devtown.in/verify/Z29ukh1",
    driveUrl: "https://drive.google.com/file/d/1jsY0zXYrT4pB83b_E-Fr_EsQ28zO_mSw/view?usp=sharing",
    localFile: "/certs/1jsY0zXYrT4pB83b_E-Fr_EsQ28zO_mSw_Backend web development certificate.pdf",
    fileType: "pdf",
    badgeText: "Node.js & MongoDB Certified",
    description: "Rigorous verification of backend web development competencies including REST routing, database transactions, and data schemas.",
    skills: ["Node.js", "Express", "MongoDB", "Backend Security"]
  },
  {
    id: "cert-9",
    title: "Introduction to DevOps Tools",
    subtitle: "CI/CD Pipelines, Docker & Infrastructure",
    issuer: "Simplilearn SkillUp",
    category: "Cloud & DevOps",
    issueDate: "June 28, 2026",
    credentialId: "10405435",
    verifyUrl: "https://www.simplilearn.com/skillup-free-online-courses",
    driveUrl: "https://drive.google.com/file/d/1WiYApPl8ILwEKsE26imnsbkR2VBODWp-/view?usp=sharing",
    localFile: "/certs/1WiYApPl8ILwEKsE26imnsbkR2VBODWp-_Certificate-2.pdf",
    fileType: "pdf",
    badgeText: "DevOps Tools Specialist",
    description: "Foundational practices in DevOps methodologies, Git source management, Docker containerization, Jenkins automation, and CI/CD pipelines.",
    skills: ["DevOps", "Docker", "CI/CD", "Git"]
  },
  {
    id: "cert-10",
    title: "Web Development Examination (Score 68)",
    subtitle: "ISO 9001:2015 Approved Entrance Examination",
    issuer: "Quik Test In (Infotact)",
    category: "Full-Stack & Web",
    issueDate: "2024",
    credentialId: "QUIK-TEST-68",
    verifyUrl: "https://drive.google.com/file/d/1EMpMQOWznik6-pptcc2Akvlav79Ta7y6/view?usp=sharing",
    driveUrl: "https://drive.google.com/file/d/1EMpMQOWznik6-pptcc2Akvlav79Ta7y6/view?usp=sharing",
    localFile: "/certs/1EMpMQOWznik6-pptcc2Akvlav79Ta7y6_Infotact_exam.pdf",
    fileType: "pdf",
    badgeText: "Exam Certified (Score 68)",
    description: "Certified successful completion of the ISO 9001:2015 approved Web Development Examination with verified score of 68.",
    skills: ["Web Development", "Technical Assessment", "Frontend & Backend"]
  },
  {
    id: "cert-11",
    title: "LeetCode 50 Days Badge 2025",
    subtitle: "Solving Problems 50+ Days in 2025",
    issuer: "LeetCode",
    category: "LeetCode Badges",
    issueDate: "2025",
    credentialId: "LEETCODE-50-DAYS-2025",
    verifyUrl: "https://leetcode.com/u/G8KOATYwH6/",
    driveUrl: "https://drive.google.com/file/d/1FXy5HdAbC8D74FHYIlo7lvPSifDEsOGQ/view?usp=sharing",
    localFile: "/certs/1FXy5HdAbC8D74FHYIlo7lvPSifDEsOGQ_Leetcode_50_2025.png",
    fileType: "image",
    badgeText: "50 Days 2025 Badge",
    description: "Official LeetCode achievement for maintaining a 50+ day streak solving complex algorithmic challenges and data structure problems.",
    skills: ["Data Structures", "Algorithms", "C++", "Consistency"]
  },
  {
    id: "cert-12",
    title: "Full Stack Developer Course",
    subtitle: "Enterprise Web Applications Curriculum",
    issuer: "Simplilearn SkillUp",
    category: "Full-Stack & Web",
    issueDate: "July 2, 2026",
    credentialId: "10418519",
    verifyUrl: "https://www.simplilearn.com/skillup-free-online-courses",
    driveUrl: "https://drive.google.com/file/d/1Lrc2pTVxhmbC_Ddydj2vvPJf-MhhYaZI/view?usp=sharing",
    localFile: "/certs/1Lrc2pTVxhmbC_Ddydj2vvPJf-MhhYaZI_Certificate-3.pdf",
    fileType: "pdf",
    badgeText: "Full Stack Developer",
    description: "Comprehensive full-stack engineering program covering client-side rendering, server logic, database integration, and deployment lifecycle.",
    skills: ["Full Stack", "React", "Node.js", "Databases"]
  },
  {
    id: "cert-13",
    title: "Responsive Web Design Certification",
    subtitle: "300 Hours Accredited Curriculum",
    issuer: "freeCodeCamp",
    category: "freeCodeCamp",
    issueDate: "June 28, 2026",
    credentialId: "fcc-76339dcc-50ce-4b0a-b076-9976a38a790c-rwd",
    verifyUrl: "https://www.freecodecamp.org/certification/fcc-76339dcc-50ce-4b0a-b076-9976a38a790c/responsive-web-design-v9",
    driveUrl: "https://drive.google.com/file/d/1O9DHGR_-ZioJOotPE0exBqQFMWwsDSiT/view?usp=sharing",
    localFile: "/certs/1O9DHGR_-ZioJOotPE0exBqQFMWwsDSiT_screencapture-freecodecamp-org-certification-fcc-76339dcc-50ce-4b0a-b076-9976a38a790c-responsive-web-design-v9-2026-06-28-10_58_14.png",
    fileType: "image",
    badgeText: "freeCodeCamp 300h RWD",
    description: "Certified completion of 300 hours of responsive web development, mastering CSS Grid, Flexbox, media queries, accessibility, and UI systems.",
    skills: ["Responsive Design", "CSS Grid", "Flexbox", "Accessibility"]
  },
  {
    id: "cert-14",
    title: "Scientific Computing with Python",
    subtitle: "300 Hours Python & Computational Logic",
    issuer: "freeCodeCamp",
    category: "freeCodeCamp",
    issueDate: "July 3, 2026",
    credentialId: "fcc-76339dcc-50ce-4b0a-b076-9976a38a790c-py",
    verifyUrl: "https://www.freecodecamp.org/certification/fcc-76339dcc-50ce-4b0a-b076-9976a38a790c/python-v9",
    driveUrl: "https://drive.google.com/file/d/1-jMoNLqAdsuDr8dCEZbbGYQI3puSaADS/view?usp=sharing",
    localFile: "/certs/1-jMoNLqAdsuDr8dCEZbbGYQI3puSaADS_screencapture-freecodecamp-org-certification-fcc-76339dcc-50ce-4b0a-b076-9976a38a790c-python-v9-2026-07-03-10_48_47.png",
    fileType: "image",
    badgeText: "freeCodeCamp 300h Python",
    description: "Completed 300 hours of Python computing, algorithmic problem solving, object-oriented architectures, and scientific math simulations.",
    skills: ["Python", "Data Structures", "Algorithms", "Scientific Computing"]
  },
  {
    id: "cert-15",
    title: "JavaScript Algorithms and Data Structures",
    subtitle: "300 Hours Algorithmic Scripting & ES6",
    issuer: "freeCodeCamp",
    category: "freeCodeCamp",
    issueDate: "June 27, 2026",
    credentialId: "fcc-76339dcc-50ce-4b0a-b076-9976a38a790c-js",
    verifyUrl: "https://www.freecodecamp.org/certification/fcc-76339dcc-50ce-4b0a-b076-9976a38a790c/javascript-v9",
    driveUrl: "https://drive.google.com/file/d/1h6vVOjvHKTKhOTxCKqbps_oHKi10Sh61/view?usp=sharing",
    localFile: "/certs/1h6vVOjvHKTKhOTxCKqbps_oHKi10Sh61_screencapture-freecodecamp-org-certification-fcc-76339dcc-50ce-4b0a-b076-9976a38a790c-javascript-v9-2026-06-27-11_04_21.png",
    fileType: "image",
    badgeText: "freeCodeCamp 300h JS",
    description: "Mastered JavaScript fundamentals, ES6 syntax, functional programming, OOP, and complex algorithmic coding challenges.",
    skills: ["JavaScript", "Algorithms", "Data Structures", "ES6"]
  },
  {
    id: "cert-16",
    title: "Web Development for Beginners",
    subtitle: "Frontend Foundations & Standards",
    issuer: "Simplilearn SkillUp",
    category: "Full-Stack & Web",
    issueDate: "June 27, 2026",
    credentialId: "10399643",
    verifyUrl: "https://www.simplilearn.com/skillup-free-online-courses",
    driveUrl: "https://drive.google.com/file/d/11sfjGuIKVoiiJk3stS-T_rxMZE9hQ-QJ/view?usp=sharing",
    localFile: "/certs/11sfjGuIKVoiiJk3stS-T_rxMZE9hQ-QJ_Simplilearn_skillup_Certificate.pdf",
    fileType: "pdf",
    badgeText: "Web Development Certified",
    description: "Core frontend fundamentals covering semantic HTML, modern CSS layouts, responsive design, and browser DOM interactions.",
    skills: ["HTML5", "CSS3", "JavaScript", "Web UI"]
  },
  {
    id: "cert-17",
    title: "Web Development Bootcamp Workshop",
    subtitle: "Hands-on Full-Stack Architecture",
    issuer: "DevTown",
    category: "Full-Stack & Web",
    issueDate: "October 23, 2024",
    credentialId: "yqbG4",
    verifyUrl: "https://cert.devtown.in/verify/yqbG4",
    driveUrl: "https://drive.google.com/file/d/1fAupihoVycwtegt5PAxLmUnvEV0M4qr6/view?usp=sharing",
    localFile: "/certs/1fAupihoVycwtegt5PAxLmUnvEV0M4qr6_Dewtown certificate.pdf",
    fileType: "pdf",
    badgeText: "DevTown Workshop Certified",
    description: "Completed practical web development bootcamp workshop constructing interactive web apps and handling API request lifecycles.",
    skills: ["Web Development", "APIs", "JavaScript", "Frontend"]
  },
  {
    id: "cert-18",
    title: "LangChain for LLM App Development",
    subtitle: "Autonomous AI Agents & RAG Architecture",
    issuer: "Simplilearn SkillUp",
    category: "AI & Machine Learning",
    issueDate: "July 3, 2026",
    credentialId: "10426448",
    verifyUrl: "https://www.simplilearn.com/skillup-free-online-courses",
    driveUrl: "https://drive.google.com/file/d/1QlNjtH5_TZxiNCmCoGJobdpc-TPVPuc1/view?usp=sharing",
    localFile: "/certs/1QlNjtH5_TZxiNCmCoGJobdpc-TPVPuc1_Certificate-4.pdf",
    fileType: "pdf",
    badgeText: "LangChain Specialist",
    description: "Building next-generation generative AI applications using LangChain, prompt templates, vector embeddings, chains, and dynamic tool orchestration.",
    skills: ["LangChain", "LLM Agents", "RAG", "Vector Search", "Python"]
  },
  {
    id: "cert-19",
    title: "LeetCode DCC June 2025 Badge",
    subtitle: "Daily Coding Challenge Streak",
    issuer: "LeetCode",
    category: "LeetCode Badges",
    issueDate: "June 2025",
    credentialId: "LEETCODE-DCC-JUN-2025",
    verifyUrl: "https://leetcode.com/u/G8KOATYwH6/",
    driveUrl: "https://drive.google.com/file/d/15DySUTrm-fv4XCx0ZbqNgIXQd4zfiDj4/view?usp=sharing",
    localFile: "/certs/15DySUTrm-fv4XCx0ZbqNgIXQd4zfiDj4_Leetcode_June_2025.png",
    fileType: "image",
    badgeText: "DCC June 2025 Badge",
    description: "Achieved complete month-long daily coding streak in June 2025 solving continuous algorithmic challenges on LeetCode.",
    skills: ["Algorithms", "Daily Practice", "Problem Solving"]
  },
  {
    id: "cert-20",
    title: "Web Development for Beginners (Verified Copy)",
    subtitle: "Certified Foundation Program",
    issuer: "Simplilearn SkillUp",
    category: "Full-Stack & Web",
    issueDate: "June 27, 2026",
    credentialId: "10399643",
    verifyUrl: "https://www.simplilearn.com/skillup-free-online-courses",
    driveUrl: "https://drive.google.com/file/d/19UgC2CzT7Pk9J5HEzWeCEbdBcTLC3Ojx/view?usp=sharing",
    localFile: "/certs/19UgC2CzT7Pk9J5HEzWeCEbdBcTLC3Ojx_Certificate.pdf",
    fileType: "pdf",
    badgeText: "Foundation Verified",
    description: "Certified completion of Web Development core foundation curriculum and modern frontend methodologies.",
    skills: ["HTML5", "CSS3", "Web UI"]
  },
  {
    id: "cert-21",
    title: "LeetCode 50 Days Badge 2024 (Top 6.9%)",
    subtitle: "Awarded to Top 6.9% of Global LeetCoders",
    issuer: "LeetCode",
    category: "LeetCode Badges",
    issueDate: "2024",
    credentialId: "LEETCODE-50-DAYS-2024",
    verifyUrl: "https://leetcode.com/u/G8KOATYwH6/",
    driveUrl: "https://drive.google.com/file/d/1SPefl82iy4UzfiG-vTn9ouclhrd4_h-d/view?usp=sharing",
    localFile: "/certs/1SPefl82iy4UzfiG-vTn9ouclhrd4_h-d_50 days Leetcode.png",
    fileType: "image",
    badgeText: "Top 6.9% Globally",
    description: "Honored by LeetCode for ranking in the top 6.9% globally by solving complex programming challenges for 50+ days in 2024.",
    skills: ["C++", "Algorithms", "Competitive Programming"]
  },
  {
    id: "cert-22",
    title: "Free DevOps Bootcamp",
    subtitle: "TrainWithShubham (TWS) Production Bootcamp",
    issuer: "TrainWithShubham (TWS)",
    category: "Cloud & DevOps",
    issueDate: "May 29, 2026",
    credentialId: "JZWLINR4",
    verifyUrl: "https://www.trainwithshubham.com",
    driveUrl: "https://drive.google.com/file/d/1lImQOwJErV_wdIRXmGMi9fOZJ47vXa42/view?usp=sharing",
    localFile: "/certs/1lImQOwJErV_wdIRXmGMi9fOZJ47vXa42_1780044412381-certificate.png",
    fileType: "image",
    badgeText: "TWS DevOps Certified",
    description: "Recognized for extraordinary performance in DevOps bootcamp covering Docker, Kubernetes, Linux command-line, CI/CD, and AWS architecture.",
    skills: ["DevOps", "Docker", "Kubernetes", "CI/CD", "Linux"]
  },
  {
    id: "cert-23",
    title: "LeetCode 100 Days Badge 2024 (Top 4.2%)",
    subtitle: "Awarded to Top 4.2% of Global LeetCoders",
    issuer: "LeetCode",
    category: "LeetCode Badges",
    issueDate: "2024",
    credentialId: "LEETCODE-100-DAYS-2024",
    verifyUrl: "https://leetcode.com/u/G8KOATYwH6/",
    driveUrl: "https://drive.google.com/file/d/1-ZZQM761dOMtcKL-uOanod6VCI-Lz7n6/view?usp=sharing",
    localFile: "/certs/1-ZZQM761dOMtcKL-uOanod6VCI-Lz7n6_Leetcode.png",
    fileType: "image",
    badgeText: "Top 4.2% Globally",
    description: "Elite LeetCode recognition awarded to top 4.2% of programmers worldwide solving problems for 100+ days in 2024.",
    skills: ["C++", "Advanced Algorithms", "Dynamic Programming", "Graph Theory"]
  },
  {
    id: "cert-24",
    title: "Front-End Development Libraries (300h)",
    subtitle: "freeCodeCamp Certified Developer",
    issuer: "freeCodeCamp",
    category: "freeCodeCamp",
    issueDate: "July 23, 2026",
    credentialId: "fcc-76339dcc-50ce-4b0a-b076-9976a38a790c-fedl",
    verifyUrl: "https://www.freecodecamp.org/certification/fcc-76339dcc-50ce-4b0a-b076-9976a38a790c/front-end-development-libraries-v9",
    driveUrl: "https://drive.google.com/file/d/1tui4aI_vLHRUhUKQSHJCUT1Pivu7-z2O/view?usp=sharing",
    localFile: "/certs/1tui4aI_vLHRUhUKQSHJCUT1Pivu7-z2O_screencapture-freecodecamp-org-certification-fcc-76339dcc-50ce-4b0a-b076-9976a38a790c-front-end-development-libraries-v9-2026-07-23-16_12_50.png",
    fileType: "image",
    badgeText: "freeCodeCamp Certified (300h)",
    description: "Demonstrates mastery of front-end development libraries representing approximately 300 hours of coursework, covering React, Redux, Bootstrap, SASS, and modern component state architectures.",
    skills: ["React", "Redux", "Bootstrap", "jQuery", "SASS"]
  },
  {
    id: "cert-25",
    title: "Legacy Responsive Web Design V8 (300h)",
    subtitle: "freeCodeCamp Certified Developer",
    issuer: "freeCodeCamp",
    category: "freeCodeCamp",
    issueDate: "July 16, 2026",
    credentialId: "fcc-76339dcc-50ce-4b0a-b076-9976a38a790c-rwd-v8",
    verifyUrl: "https://www.freecodecamp.org/certification/fcc-76339dcc-50ce-4b0a-b076-9976a38a790c/responsive-web-design",
    driveUrl: "https://drive.google.com/file/d/1-HZa0a39p_gYMgnrnGxoTFbjJzbVQXb8/view?usp=sharing",
    localFile: "/certs/1-HZa0a39p_gYMgnrnGxoTFbjJzbVQXb8_screencapture-freecodecamp-org-certification-fcc-76339dcc-50ce-4b0a-b076-9976a38a790c-responsive-web-design-2026-07-16-15_44_32.png",
    fileType: "image",
    badgeText: "freeCodeCamp Certified (300h)",
    description: "Demonstrates core proficiency in responsive design, CSS architecture, flexbox layouts, grid positioning, and accessibility representing approximately 300 hours of coursework.",
    skills: ["HTML5", "CSS3", "Flexbox", "CSS Grid", "Responsive Design"]
  }
]) as unknown as CertificateItem[];

// Single-pass O(N) category counts computation, frozen for performance
const rawCategoryCounts: Record<string, number> = { all: certificates.length };
for (const cat of CERTIFICATE_CATEGORIES) {
  rawCategoryCounts[cat] = 0;
}
for (let i = 0; i < certificates.length; i++) {
  const cat = certificates[i].category;
  rawCategoryCounts[cat] = (rawCategoryCounts[cat] || 0) + 1;
}
export const certificateCategoryCounts: Readonly<Record<string, number>> = Object.freeze(rawCategoryCounts);

// Pre-computed search index map for sub-millisecond query filtering
export const certificateSearchIndex: Map<string, string> = new Map(
  certificates.map((c) => [
    c.id,
    `${c.title} ${c.issuer} ${c.category} ${c.skills.join(" ")} ${c.description} ${c.credentialId || ""}`.toLowerCase()
  ])
);

// O(1) keyed lookup maps to eliminate runtime array traversals
export const certificatesMap: Map<string, CertificateItem> = new Map(
  certificates.map((c) => [c.id, c])
);

export const projectsMap: Map<string, (typeof projects)[number]> = new Map(
  projects.map((p) => [p.name.toLowerCase(), p])
);

export const skillCategoriesMap: Map<string, (typeof skillCategories)[number]> = new Map(
  skillCategories.map((s) => [s.category, s])
);
