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
  {
    name: "HTML 5",
    icon: "html",
  },
  {
    name: "CSS 3",
    icon: "css",
  },
  {
    name: "JavaScript",
    icon: "javascript",
  },
  {
    name: "TypeScript",
    icon: "typescript",
  },
  {
    name: "React JS",
    icon: "react",
  },
  {
    name: "Node JS",
    icon: "nodejs",
  },
  {
    name: "Next.js",
    icon: "nextjs",
  },
  {
    name: "Tailwind CSS",
    icon: "tailwind",
  },
  {
    name: "MongoDB",
    icon: "mongodb",
  },
  {
    name: "MySQL",
    icon: "mysql",
  },
  {
    name: "Express.js",
    icon: "express",
  },
  {
    name: "git",
    icon: "git",
  },
  {
    name: "Docker",
    icon: "docker",
  },
  {
    name: "GraphQL",
    icon: "graphql",
  },
  {
    name: "Python",
    icon: "python",
  },
];

export const projects = [
  {
    name: "NexusAI",
    description:
      "A sophisticated AI-driven SaaS platform built with Next.js 15 and React 19, featuring multi-model AI workflows (Gemini & Pollinations) and enterprise-grade billing.",
    problem_statement: 
      "Modern AI tools are often fragmented and lack cohesive project management or tiered monetization. Businesses need a unified environment with secure access control and usage-based billing.",
    role: "Full Stack Lead",
    tech_stack: ["Next.js 15", "React 19", "LangChain", "Stripe", "Prisma", "Clerk"],
    architecture_flow: "User Request -> Next.js Middleware -> AI Pipeline (Gemini/Pollinations) -> Usage Metrics -> Stripe Billing",
    key_decisions: [
      "Engineered an Access Control List (ACL) system with invitation-based onboarding to support multi-tenant project collaboration.",
      "Implemented a usage-based billing strategy using Stripe and Webhooks to monetize AI consumption (images/text) accurately.",
      "Integrated Google Gemini for deep textual reasoning and Pollinations AI for high-fidelity image generation/processing."
    ],
    impact: [
      "Achieved 100% type-safety across the AI pipeline using Zod and Prisma.",
      "Reduced AI integration friction by building a reusable LangChain-based abstraction layer."
    ],
    tags: [
      { name: "Next.js 15", color: "blue-text-gradient" },
      { name: "Gemini AI", color: "green-text-gradient" },
      { name: "SaaS", color: "pink-text-gradient" },
    ],
    gradient: "from-indigo-900 via-purple-900 to-pink-900",
    emoji: "🚀",
    period: "Ongoing – 2024/2025",
    source_code_link: "https://github.com/Krish-vadsak45/NexusAI",
    live_link: "https://github.com/Krish-vadsak45/NexusAI",
  },
  {
    name: "MyShow",
    description:
      "A high-performance full-stack booking system featuring AI-driven recommendations and a comprehensive admin analytics suite.",
    problem_statement: 
      "General e-ticket systems lack personalized discovery. Users often struggle to find shows they actually like, while admins need real-time business health metrics without complex queries.",
    role: "Full Stack Engineer",
    tech_stack: ["MERN Stack", "TMDB API", "Stripe", "Clerk", "Framer Motion"],
    architecture_flow: "User Browsing -> Recommendation Engine -> Stripe Checkout -> Real-time Ticket Generation -> Admin Dashboard",
    key_decisions: [
      "Developed a custom recommendation engine that cross-references genre affinity with TMDB metadata for personalized user feeds.",
      "Built a secure multi-role admin dashboard for tracking bookings, managing seat availability, and viewing financial reports.",
      "Optimized the ticket booking flow with real-time seat status updates to prevent race conditions during peak hours."
    ],
    impact: [
      "Engineered a production-ready system with 74+ mature codebase commits.",
      "Integrated seamless payments resulting in zero failed transactions during testing phases."
    ],
    tags: [
      { name: "MERN", color: "blue-text-gradient" },
      { name: "Analytics", color: "green-text-gradient" },
      { name: "Booking", color: "pink-text-gradient" },
    ],
    gradient: "from-blue-900 via-indigo-900 to-purple-900",
    emoji: "🎬",
    period: "Jun 2024 – Jul 2024",
    source_code_link: "https://github.com/Krish-vadsak45/MyShow",
    live_link: "https://github.com/Krish-vadsak45/MyShow",
  },
  {
    name: "ShopIQ",
    description:
      "An AI-powered e-commerce trust platform that identifies fake reviews and extracts genuine sentiment patterns from thousands of data points.",
    problem_statement: 
      "E-commerce platforms are saturated with biased or bot-generated reviews, making it impossible for consumers to make informed purchasing decisions based on genuine user feedback.",
    role: "AI Engineer",
    tech_stack: ["Next.js", "TypeScript", "Google Gemini", "Tailwind CSS"],
    architecture_flow: "Review Data Ingestion -> Gemini Sentiment Analysis -> Pattern Detection -> Trust Score Calculation -> UI Visualization",
    key_decisions: [
      "Leveraged Large Language Models (LLMs) to identify linguistic markers typical of fraudulent or automated review generation.",
      "Engineered a score-based trust system that aggregates sentiment across multiple dimensions like reliability, value, and longevity.",
      "Designed a clean, focused dashboard using Next.js App Router for rapid data visualization and insight delivery."
    ],
    impact: [
      "Automated the review auditing process, capable of analyzing 100+ reviews in seconds.",
      "Improved consumer confidence by providing a 'Genuineness Score' for verified products."
    ],
    tags: [
      { name: "AI Trust", color: "blue-text-gradient" },
      { name: "Gemini", color: "green-text-gradient" },
      { name: "TypeScript", color: "pink-text-gradient" },
    ],
    gradient: "from-emerald-900 via-teal-900 to-cyan-900",
    emoji: "🛍️",
    period: "Dec 2024",
    source_code_link: "https://github.com/Krish-vadsak45/ShopIQ",
    live_link: "https://github.com/Krish-vadsak45/ShopIQ",
  },
];

export const skillCategories = [
  {
    category: "Languages",
    skills: [
      { name: "TypeScript", level: "Experienced", project: "NexusAI", description: "Enforced type-safety across distributed systems." },
      { name: "JavaScript", level: "Experienced", project: "MyShow Platform", description: "Engineered complex async aggregation flows." },
      { name: "Python", level: "Intermediate", project: "AI Integration", description: "Automated data processing and model interfacing." },
      { name: "C++", level: "Experienced", project: "LeetCode", description: "200+ problems solved with focus on memory & time complexity." },
    ],
  },
  {
    category: "Frontend",
    skills: [
      { name: "React", level: "Experienced", project: "MyShow Platform", description: "Built dynamic hooks and context-driven state management." },
      { name: "Next.js", level: "Experienced", project: "NexusAI", description: "Implemented SSR, PPR, and optimized App Router patterns." },
      { name: "Tailwind CSS", level: "Experienced", project: "All Projects", description: "Designed premium responsive UIs with glassmorphism." },
      { name: "Framer Motion", level: "Intermediate", project: "Portfolio", description: "Created high-end micro-animations and page transitions." },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", level: "Experienced", project: "MyShow Backend", description: "Built robust RESTful APIs with secure auth middleware." },
      { name: "Express.js", level: "Experienced", project: "Backend Logic", description: "Mastered middleware chaining and error handling." },
      { name: "GraphQL", level: "Intermediate", project: "API Optimization", description: "Reduced payload sizes via efficient type-safe queries." },
    ],
  },
  {
    category: "Databases",
    skills: [
      { name: "MongoDB", level: "Experienced", project: "MyShow / ShopIQ", description: "Designed complex schemas and aggregation pipelines." },
      { name: "MySQL", level: "Intermediate", project: "Relational Data", description: "Optimized queries via indexing and JOIN operations." },
    ],
  },
  {
    category: "Tools & DevOps",
    skills: [
      { name: "Docker", level: "Intermediate", project: "NexusAI / MyShow", description: "Containerized apps for consistent dev/prod parity." },
      { name: "Git & GitHub", level: "Experienced", project: "Collaborative Dev", description: "Managed CI/CD workflows and complex branch merges." },
      { name: "Stripe/Clerk/Auth", level: "Experienced", project: "Enterprise SaaS", description: "Integrated secure payments and user management." },
    ],
  },
  {
    category: "AI & Automation",
    skills: [
      { name: "LangChain", level: "Experienced", project: "NexusAI Assistant", description: "Connected LLMs to dynamic database tools." },
      { name: "Gemini AI", level: "Experienced", project: "ShopIQ / NexusAI", description: "Integrated advanced sentiment and reasoning models." },
    ],
  },
];
