import type { Project } from "./data";

const img = (name: string, alt: string, w = 1440, h = 900) => ({ src: `/work/bonomali/${name}.webp`, alt, w, h });

/** Bonomali case study. Every number here is real; the platform is not live yet, so there are no traffic or booking figures. */
export const bonomali: Project = {
  slug: "bonomali-resort-booking",
  title: "Bonomali Resort Booking Platform",
  category: "Full-stack product",
  year: "2026",
  hue: 165,
  summary: "Website, request-to-book flow and staff admin for a riverside eco resort facing the Sundarbans.",
  role: "Sole engineer: architecture, backend, frontend, design direction",
  stack: ["Next.js 16", "TypeScript", "Laravel 13", "Sanctum", "MySQL", "Tailwind v4"],
  status: "Built and tested, not yet live. Site redesign and admin are merged; the booking flow is in review.",
  cover: img("site-hero", "Bonomali public site: sunset photo of the cottages with a Plan your stay form"),
  problem:
    "Bonomali, a resort I own in Dacope, Khulna, took every booking by phone and WhatsApp. Nothing recorded who had asked, which room was held or what price was quoted, and the draft website showed hard-coded prices, a fake \"live\" weather bar and invented reviews.",
  architecture: [
    "Two deployable apps: one Next.js app for the public site and the staff admin, one Laravel JSON API that owns the data and every rule",
    "Pricing, availability, booking status rules and permissions live in service and policy classes, so the site and the admin cannot disagree",
    "Guests call rate-limited public endpoints directly; staff calls go through the Next.js server, which attaches the API token",
    "Payments and Meta lead ads are designed for (gateway interface, shared lead pipeline) but deliberately not built yet",
  ],
  sections: [
    {
      title: "Public site",
      intro: "A dark, cinematic landing page chosen from three design directions I prepared.",
      points: [
        "Room tour: pick a cottage and drag to look around. Ordinary photos and true 360° panoramas are drawn by a small WebGL shader I wrote instead of adding a library",
        "Explore map and wildlife guide: choosing an animal moves the map to where it is seen",
        "Search-ready: structured data, sitemap, robots rules and a 390px layout with no sideways scroll",
      ],
      image: img("site-room-tour", "Room tour section with a draggable view of a cottage interior"),
    },
    {
      title: "Request to book",
      intro: "Guests see real availability and the real price, then send a request that staff confirm. Nothing is held or charged online.",
      points: [
        "Each cottage shows as free, booked or too small for the group, with a stay total that includes seasonal rates",
        "The request lands in the admin as a new lead with the dates, cottage and the price the guest was shown",
        "If the API is unreachable the page still loads with fallback prices and offers the same request as a pre-filled WhatsApp message",
      ],
      image: img("booking-request-sent", "Request received screen with reference, cottage, stay dates and the price shown (sample data)"),
    },
    {
      title: "Staff admin",
      intro: "A custom panel with owner and staff roles, built on the REST API instead of a generated admin.",
      points: [
        "Dashboard: arrivals, departures, occupancy, new enquiries, pending bookings, expected revenue",
        "Calendar: every room by day; click an empty day to book it",
        "Bookings: live price and availability check, then confirm, check in, check out or cancel",
        "Inquiries and guests: log a call, convert it to a booking in one step, keep history, tags and notes",
      ],
      image: img("admin-dashboard", "Admin dashboard with today's numbers, arrivals and bookings per month", 1480, 977),
    },
    {
      title: "Quality and security",
      points: [
        "84 backend feature tests: sign-in and lockout, booking rules, status transitions, permissions per role, public availability, rate limits",
        "GitHub Actions on both repos: code style and tests on the API; lint, type-check and production build on the frontend",
        "Scripted browser runs of the full booking flow, a blocked double booking, staff-role restrictions and phone-width layouts",
        "The browser never holds the admin token: it sits in an httpOnly cookie, and state-changing calls need a custom header and a same-origin check",
        "Public requests are protected by per-visitor rate limits, a honeypot field, phone validation and a duplicate guard",
      ],
      image: img("admin-calendar", "Admin calendar showing each room by day with stays as coloured bars"),
    },
    {
      title: "How I worked",
      intro: "Four small releases in five days, each a pull request with green CI.",
      points: [
        "Landing page port, then admin API and panel, then the site redesign, then the booking connection",
        "I used an AI coding assistant (Claude) as a pair programmer. I set the scope, chose the architecture and made each product decision",
        "Each repository carries a handoff file, a task list and a daily log, so any contributor can pick up the current state before touching code",
      ],
    },
    {
      title: "What is next",
      points: [
        "Real 360° room photos, wildlife media and confirmed map pins; the site shows neutral states until then",
        "Staff notification when a request arrives, pricing for extra guests and add-ons, Bangla alongside English",
        "Deployment, then online payment behind a gateway interface",
      ],
    },
  ],
  decisions: [
    { topic: "Admin panel", chose: "Custom Next.js UI on a REST API, replacing a generated Filament admin", why: "Full control of workflow and look, one frontend codebase, an API reusable for a mobile app later", cost: "A full admin API and UI kit to build and test" },
    { topic: "Website booking", chose: "Request to book, not instant booking", why: "Without online payment, instant booking lets anyone block rooms with fake requests", cost: "Staff must confirm each request" },
    { topic: "Admin sign-in", chose: "Token kept in an httpOnly cookie by the Next.js server, which proxies every admin call", why: "Browser scripts can never read the token; site and API can live on different domains", cost: "One extra network hop per admin request" },
    { topic: "360° viewer", chose: "About 100 lines of WebGL instead of a panorama library", why: "No dependency; falls back to a flat photo if WebGL or the image fails", cost: "Fewer features (no hotspots yet)" },
    { topic: "Pricing", chose: "The server always prices a stay; totals sent by a client are ignored", why: "One source of truth across site, admin and seasonal rates", cost: "With the API down the site shows only fallback nightly rates" },
    { topic: "Content honesty", chose: "Removed the fake live data, invented reviews and award claims", why: "A booking site that states untrue things loses trust the first time a guest checks", cost: "Fewer impressive sections until real photos and reviews exist" },
  ],
  results: [
    { v: "84", l: "Backend tests in CI" },
    { v: "~50", l: "Versioned API endpoints" },
    { v: "5 days", l: "To working, tested software" },
  ],
};
