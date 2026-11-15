import { bonomali } from "./case-bonomali";

export const site = {
  name: "AJ-entic",
  person: "Arif Jawad",
  role: "Senior Backend Engineer",
  location: "Dhaka, BD",
  tz: "Asia/Dhaka",
  email: "arifjawad.ajp@gmail.com",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/arifjawad" },
    { label: "Instagram", href: "https://www.instagram.com/arifjawad_" },
    { label: "Facebook", href: "https://www.facebook.com/arif.jawad.96/" },
    { label: "Email", href: "mailto:arifjawad.ajp@gmail.com" },
  ],
};

export type Project = {
  slug: string; title: string; category: string; year: string; hue: number;
  summary: string; role: string; stack: string[];
  problem: string; architecture: string[]; results: { v: string; l: string }[];
  // Optional long-form case study fields
  status?: string; cover?: CaseImage; sections?: CaseSection[]; decisions?: Decision[];
};
export type CaseImage = { src: string; alt: string; w: number; h: number };
export type CaseSection = { title: string; intro?: string; points?: string[]; image?: CaseImage };
export type Decision = { topic: string; chose: string; why: string; cost: string };

export const projects: Project[] = [
  bonomali,
  {
    slug: "payment-orchestration", title: "Payment Orchestration", category: "Payments", year: "2024", hue: 75,
    summary: "One routing layer across many gateways, with smart failover and unified reporting.",
    role: "Lead backend engineer", stack: ["Laravel", "Redis", "Horizon", "AWS"],
    problem: "Dozens of gateways, each with its own API, webhooks and failure modes. Every new integration cost weeks and success rates varied by region.",
    architecture: ["Gateway adapter contract with a normalized payment lifecycle", "Rules-based router: region, amount, cost, live success rate", "Idempotent webhook ingestion pipeline on queues", "Ledger-style reconciliation jobs with alerting"],
    results: [{ v: "12+", l: "Gateways unified" }, { v: "-70%", l: "New integration time" }, { v: "99.9%", l: "Webhook delivery" }],
  },
  {
    slug: "payout-refund-dispute", title: "Payout, Refund & Dispute Engine", category: "Automation", year: "2024", hue: 210,
    summary: "Automated money-out flows with approvals, audit trails and dispute handling.",
    role: "Backend engineer", stack: ["Laravel", "Node.js", "MySQL", "Redis"],
    problem: "Manual payout reviews and scattered refund handling slowed support and risked errors on every cycle.",
    architecture: ["State machine for payout and refund lifecycles", "Rule engine for auto-approval and risk holds", "Full audit log with immutable event history", "Provider-agnostic dispute intake"],
    results: [{ v: "5x", l: "Faster processing" }, { v: "0", l: "Manual spreadsheets" }, { v: "100%", l: "Audit coverage" }],
  },
  {
    slug: "ai-dispute-agent", title: "AI Dispute-Proof Agent", category: "AI Automation", year: "2025", hue: 300,
    summary: "An agent that assembles and submits evidence for chargeback disputes automatically.",
    role: "Designer & developer", stack: ["Node.js", "LLM APIs", "Queues", "AWS"],
    problem: "Winning disputes meant collecting evidence by hand across systems, within tight provider deadlines.",
    architecture: ["Evidence collectors per data source", "LLM drafting step with structured templates", "Human-in-the-loop review gate", "Submission adapters with retry and deadline tracking"],
    results: [{ v: "8 min", l: "To 30 sec per case" }, { v: "24/7", l: "Always on" }, { v: "+", l: "Higher win rate" }],
  },
  {
    slug: "metatrader-web-api", title: "MetaTrader Web API Integration", category: "Trading", year: "2023", hue: 25,
    summary: "Account, balance and trade services on top of the MetaTrader platform Web API.",
    role: "Backend engineer", stack: ["PHP", "Laravel", "Microservices"],
    problem: "Trading operations needed reliable programmatic control over accounts and positions with strict consistency.",
    architecture: ["Typed client around the platform Web API", "Event-driven sync of balances and positions", "Isolated microservice with its own queue and retries", "Circuit breakers around platform downtime"],
    results: [{ v: "<200ms", l: "Typical call latency" }, { v: "Real-time", l: "Balance sync" }, { v: "1", l: "Single integration surface" }],
  },
  {
    slug: "crypto-purchase-flow", title: "Crypto Purchase Flow", category: "Payments", year: "2023", hue: 140,
    summary: "Buy-crypto checkout with Binance and on-chain confirmation handling.",
    role: "Backend engineer", stack: ["Laravel", "Binance API", "Redis"],
    problem: "Customers needed to pay in crypto, with exact amounts, expiry windows and trustworthy confirmations.",
    architecture: ["Quote and expiry service", "Address and invoice management", "Confirmation watcher with reorg-safe thresholds", "Fallback reconciliation against exchange records"],
    results: [{ v: "Live", l: "In production" }, { v: "Exact", l: "Amount matching" }, { v: "Safe", l: "Reorg handling" }],
  },
  {
    slug: "email-campaign-system", title: "Email Provider & Campaign System", category: "Platform", year: "2022", hue: 0,
    summary: "Multi-provider email delivery with templates, segments and campaign scheduling.",
    role: "Backend engineer", stack: ["Laravel", "Horizon", "AWS SES"],
    problem: "Transactional and marketing emails were tied to a single provider with no visibility into delivery.",
    architecture: ["Provider abstraction with failover", "Template and segment management", "Rate-limited campaign dispatcher", "Webhook-based delivery analytics"],
    results: [{ v: "Multi", l: "Provider failover" }, { v: "100k+", l: "Sends per campaign" }, { v: "Full", l: "Delivery analytics" }],
  },
];

export const services = [
  { k: "A", t: "Payment Gateway Integration", d: "Clean, tested integrations that handle the unhappy paths.", items: ["BridgerPay, Paysafe, PayPal", "Binance & crypto purchase", "Webhooks & idempotency", "Reconciliation"] },
  { k: "B", t: "Orchestration & Automation", d: "Money flows that run themselves and leave an audit trail.", items: ["Payment routing & failover", "Payouts, refunds, disputes", "AI agent workflows", "Approval & risk rules"] },
  { k: "C", t: "Trading Services", d: "Reliable services close to the trading platform.", items: ["MetaTrader Web API", "Account & balance services", "Microservices", "Real-time sync"] },
  { k: "D", t: "Backend Architecture", d: "Foundations that scale without drama.", items: ["Laravel, PHP, Node.js", "Redis, Horizon, queues", "AWS & CI/CD", "API design"] },
];

export const stats = [
  { n: 6, suffix: "+", label: "Years of experience", p: "Shipping backend systems since 2019." },
  { n: 12, suffix: "+", label: "Gateways integrated", p: "From cards to crypto, across regions." },
  { n: 30, suffix: "+", label: "Systems delivered", p: "Services, pipelines and platforms in production." },
];

export const stack = ["Laravel", "PHP", "Node.js", "Next.js", "TypeScript", "Redis", "Horizon", "MySQL", "AWS", "Docker", "CI/CD", "REST APIs", "Webhooks", "Microservices"];

export const process = [
  { n: "01", t: "Discovery", d: "We map the flows, constraints and failure modes before touching code." },
  { n: "02", t: "Architecture", d: "A simple, documented design with clear boundaries and decisions." },
  { n: "03", t: "Build & Integrate", d: "Small increments, tests around money paths, continuous delivery." },
  { n: "04", t: "Launch & Support", d: "Monitoring, runbooks and a calm handover. I stay close after launch." },
];

export const testimonials = [
  { q: "Arif turned a messy set of gateway integrations into one system we can actually trust.", n: "Placeholder Name", c: "Fintech Company" },
  { q: "Calm, precise and fast. Every handover came with clear documentation.", n: "Placeholder Name", c: "Trading Firm" },
  { q: "He thinks about failure first, which is exactly what you want near money.", n: "Placeholder Name", c: "SaaS Startup" },
];

export const faqs = [
  { q: "What kind of projects do you take?", a: "Payment integrations, orchestration, payout and dispute automation, trading-platform services and backend architecture." },
  { q: "Do you work with existing codebases?", a: "Yes. Most work is extending or stabilising an existing Laravel or Node system rather than starting from zero." },
  { q: "How fast can you start?", a: "Usually within one to two weeks, depending on current commitments. Reach out with a rough scope." },
  { q: "Do you sign NDAs?", a: "Of course. Many case studies here are described at a high level for that reason." },
];

export const notes = [
  { slug: "idempotent-webhooks", date: "Oct 2026", t: "Idempotent webhooks, without the pain", p: "Gateways retry. Here is how to make duplicates harmless by design.", body: ["Every gateway will eventually send the same webhook twice. The fix is not hoping it will not happen, it is making the second delivery a no-op.", "Store a unique event key, wrap the handler in a transaction, and treat the key insert as the lock. Return success for duplicates so the provider stops retrying.", "Add a reconciliation job as a safety net. Webhooks are a hint; your ledger is the truth."] },
  { slug: "payment-state-machines", date: "Sep 2026", t: "Model payments as state machines", p: "Why explicit states beat boolean flags every single time.", body: ["A payment is not paid or unpaid. It is created, pending, authorized, captured, failed, refunded, disputed.", "Make the allowed transitions explicit and reject everything else. Bugs become loud instead of silent.", "Log every transition with its cause. Your future self, and your support team, will thank you."] },
];

export const nav = [
  { label: "Work", href: "/work" },
  { label: "Studio", href: "/studio" },
  { label: "Feed", href: "/feed" },
  { label: "Contact", href: "/contact" },
];

export const timeline = [
  { y: "2022 – Now", t: "Software Engineer, Next Ventures Ltd", d: "FundedNext and in-house trading products: payments, payouts, disputes, MetaTrader integration, email systems." },
  { y: "2019 – 2022", t: "Freelance Developer, Fiverr", d: "Web and backend projects for clients worldwide." },
  { y: "2016 – 2021", t: "B.Sc. in CSE, North South University", d: "Computer science and engineering." },
];
