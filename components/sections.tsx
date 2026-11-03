"use client";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, useState, type FormEvent } from "react";
import { faqs, process as steps, projects, services, site, stack, stats, testimonials } from "@/lib/data";
import ProjectArt from "./ProjectArt";
import { Counter, Letters, Reveal, SplitWords, ease } from "./motion-utils";

/* ---------- HERO ---------- */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const spread = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const yWord = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const cards = [
    { p: projects[0], rot: -9, x: -150 },
    { p: projects[2], rot: -3, x: -50 },
    { p: projects[3], rot: 4, x: 50 },
    { p: projects[1], rot: 10, x: 150 },
  ];
  return (
    <section ref={ref} className="relative min-h-[110svh] wrap pt-28 flex flex-col justify-between overflow-hidden">
      <div className="flex justify-between label text-muted">
        <span>{site.role}</span>
        <span>Payments · Trading · AI</span>
        <span className="hidden sm:block">© 2019–{new Date().getFullYear()}</span>
      </div>

      <div className="relative flex-1 flex items-center justify-center py-10">
        <div className="relative w-[min(46vw,300px)] aspect-[3/4]">
          {cards.map((c, i) => (
            <HeroCard key={i} i={i} rot={c.rot} x={c.x} spread={spread}>
              <ProjectArt p={c.p} className="w-full h-full" />
            </HeroCard>
          ))}
        </div>
      </div>

      <motion.div style={{ y: yWord }} className="pb-6">
        <h1 className="display text-[clamp(4.5rem,23vw,28rem)] whitespace-nowrap -ml-[0.04em]">
          <Letters text={site.name} delay={0.2} />
          <sup className="text-[0.18em] align-top">®</sup>
        </h1>
        <div className="flex flex-wrap justify-between items-end gap-6 mt-4">
          <p className="max-w-md text-lg text-muted">
            Backend systems for payments and trading, built to be calm under load.
          </p>
          <Link href="/work" className="btn">See selected work ↓</Link>
        </div>
      </motion.div>
    </section>
  );
}

function HeroCard({ children, i, rot, x, spread }: { children: React.ReactNode; i: number; rot: number; x: number; spread: ReturnType<typeof useTransform<number, number>> }) {
  const dx = useTransform(spread, [0, 1], [0, x * 2.2]);
  const dr = useTransform(spread, [0, 1], [rot, rot * 1.8]);
  return (
    <motion.div
      className="absolute inset-0 rounded-sm overflow-hidden shadow-2xl"
      style={{ x: dx, rotate: dr, zIndex: i }}
      initial={{ y: 300, opacity: 0, x: 0, rotate: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease, delay: 0.5 + i * 0.1 }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- STATEMENT ---------- */
export function Statement() {
  return (
    <section className="wrap py-40 hair">
      <p className="label text-muted mb-8">(01) Intro</p>
      <SplitWords
        as="h2"
        className="display text-[clamp(2.5rem,7vw,7rem)] max-w-[18ch]"
        text="I build the payment systems traders never have to think about."
      />
      <Reveal className="grid md:grid-cols-12 mt-16">
        <p className="md:col-start-7 md:col-span-5 text-xl text-muted leading-snug">
          Small team energy, clear process. From gateway integrations to orchestration, payouts and AI-assisted disputes, I design backends that stay correct when traffic spikes and providers fail.
        </p>
      </Reveal>
    </section>
  );
}

/* ---------- SERVICES ---------- */
export function Services() {
  return (
    <section className="wrap py-32 hair">
      <div className="flex justify-between items-end mb-20">
        <p className="label text-muted">(02) Services</p>
        <SplitWords as="h2" className="display text-[clamp(3rem,9vw,9rem)] text-right" text="Flow in Motion." />
      </div>
      <div>
        {services.map((s, i) => (
          <Reveal key={s.k} delay={i * 0.04}>
            <div className="grid md:grid-cols-12 gap-6 py-10 hair group">
              <span className="label text-accent md:col-span-1">{s.k}</span>
              <h3 className="md:col-span-5 text-3xl md:text-4xl tracking-tight group-hover:translate-x-3 transition-transform duration-500">{s.t}</h3>
              <p className="md:col-span-3 text-muted">{s.d}</p>
              <ul className="md:col-span-3 space-y-1">
                {s.items.map((it) => <li key={it} className="flex gap-2"><span className="text-accent">+</span>{it}</li>)}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- NUMBERS ---------- */
export function Numbers() {
  return (
    <section className="wrap py-32 hair">
      <p className="label text-muted mb-16">(03) In Numbers</p>
      <div className="grid md:grid-cols-3 gap-px bg-line border border-line">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1} className="bg-bg p-8 md:p-10 flex flex-col justify-between min-h-[22rem]">
            <div className="text-[clamp(6rem,12vw,11rem)] display"><Counter value={s.n} suffix={s.suffix} /></div>
            <div>
              <h3 className="text-2xl tracking-tight mb-2">{s.label}</h3>
              <p className="text-muted">{s.p}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- WORK LIST with cursor-follow preview ---------- */
export function WorkList({ limit }: { limit?: number }) {
  const list = limit ? projects.slice(0, limit) : projects;
  const [active, setActive] = useState<number | null>(null);
  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 220, damping: 26 }), sy = useSpring(my, { stiffness: 220, damping: 26 });
  return (
    <div
      onMouseMove={(e) => { mx.set(e.clientX); my.set(e.clientY); }}
      onMouseLeave={() => setActive(null)}
    >
      {list.map((p, i) => (
        <Reveal key={p.slug} delay={i * 0.03}>
          <Link
            href={`/work/${p.slug}`}
            onMouseEnter={() => setActive(i)}
            className="grid grid-cols-12 gap-4 items-center py-8 hair group transition-opacity"
            style={{ opacity: active === null || active === i ? 1 : 0.35 }}
          >
            <span className="label text-muted col-span-2 md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="col-span-10 md:col-span-6 text-3xl md:text-5xl tracking-tight group-hover:translate-x-4 transition-transform duration-500">{p.title}</h3>
            <span className="hidden md:block col-span-3 label text-muted">{p.category}</span>
            <span className="hidden md:block col-span-2 label text-right">{p.year} ↗</span>
          </Link>
        </Reveal>
      ))}
      <div className="hair" />
      <AnimatePresence>
        {active !== null && (
          <motion.div
            key="preview"
            className="pointer-events-none fixed top-0 left-0 z-30 hidden md:block w-64 aspect-[3/4] rounded-sm overflow-hidden shadow-2xl"
            style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.4, ease }}
          >
            <ProjectArt p={list[active]} className="w-full h-full" />
            <span className="absolute inset-0 grid place-items-center">
              <span className="label bg-accent text-accent-fg rounded-full px-4 py-2">View</span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SelectedWork() {
  return (
    <section className="wrap py-32 hair">
      <div className="flex justify-between items-end mb-16">
        <p className="label text-muted">(04) Selected Work</p>
        <Link href="/work" className="btn">All projects</Link>
      </div>
      <WorkList limit={6} />
    </section>
  );
}

/* ---------- STACK MARQUEE ---------- */
export function StackMarquee() {
  const row = [...stack, ...stack];
  return (
    <section className="py-16 hair overflow-hidden">
      <div className="marquee">
        {row.map((s, i) => (
          <span key={i} className="display text-[clamp(2.5rem,6vw,6rem)] px-8 flex items-center gap-16 whitespace-nowrap">
            {s}<span className="text-accent text-[0.5em]">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}

/* ---------- PROCESS ---------- */
export function Process() {
  return (
    <section className="wrap py-32 hair">
      <div className="flex justify-between items-end mb-16">
        <p className="label text-muted">(05) The Process</p>
        <SplitWords as="h2" className="display text-[clamp(2.5rem,7vw,7rem)] text-right" text="Four calm steps." />
      </div>
      <div className="grid md:grid-cols-4 gap-px bg-line border border-line">
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.08} className="bg-bg p-8 min-h-[18rem] flex flex-col justify-between hover:bg-bg2 transition-colors">
            <span className="label text-accent">{s.n}</span>
            <div>
              <h3 className="text-3xl tracking-tight mb-3">{s.t}</h3>
              <p className="text-muted">{s.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- TESTIMONIALS ---------- */
export function Testimonials() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const go = (d: number) => { setDir(d); setI((v) => (v + d + testimonials.length) % testimonials.length); };
  const t = testimonials[i];
  return (
    <section className="wrap py-32 hair">
      <div className="flex justify-between items-center mb-16">
        <p className="label text-muted">(06) Client Reflections</p>
        <div className="flex gap-3">
          <button className="btn !px-5" onClick={() => go(-1)} aria-label="Previous">←</button>
          <button className="btn !px-5" onClick={() => go(1)} aria-label="Next">→</button>
        </div>
      </div>
      <div className="relative min-h-[18rem] overflow-hidden">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.figure
            key={i}
            drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.2}
            onDragEnd={(_, info) => { if (info.offset.x < -80) go(1); else if (info.offset.x > 80) go(-1); }}
            initial={{ opacity: 0, x: 80 * dir }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -80 * dir }}
            transition={{ duration: 0.6, ease }}
            className="cursor-grab active:cursor-grabbing"
          >
            <blockquote className="display text-[clamp(2rem,5vw,5rem)] max-w-[22ch]">“{t.q}”</blockquote>
            <figcaption className="mt-10 label text-muted">{t.n} · {t.c}</figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="wrap py-32 hair">
      <div className="grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <p className="label text-muted mb-6">(08) FAQ</p>
          <SplitWords as="h2" className="display text-[clamp(2.5rem,6vw,6rem)]" text="Questions, answered." />
        </div>
        <div className="md:col-span-7">
          {faqs.map((f, k) => (
            <div key={f.q} className="hair">
              <button className="w-full flex justify-between items-center text-left py-6 text-2xl tracking-tight" onClick={() => setOpen(open === k ? null : k)} aria-expanded={open === k}>
                {f.q}
                <motion.span animate={{ rotate: open === k ? 45 : 0 }} className="text-accent text-3xl">+</motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === k && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease }} className="overflow-hidden">
                    <p className="pb-6 text-muted max-w-xl">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          <div className="hair" />
        </div>
      </div>
    </section>
  );
}

/* ---------- SENTENCE CONTACT FORM ---------- */
export function SentenceForm() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      setState(r.ok ? "done" : "error");
    } catch { setState("error"); }
  }
  return (
    <section className="wrap py-32 hair" id="contact">
      <p className="label text-muted mb-10">(07) Let’s Talk</p>
      {state === "done" ? (
        <p className="display text-[clamp(2.5rem,7vw,7rem)]">Thank you. I’ll reply within 24 hours.</p>
      ) : (
        <form onSubmit={onSubmit} className="sentence display !leading-[1.25] text-[clamp(1.75rem,4.2vw,4.2rem)]">
          Hi Arif, I’m <input name="name" required placeholder="your name" size={10} /> from <input name="company" placeholder="company" size={9} />.
          I’m looking for <select name="need" defaultValue="Payment integration">
            <option>Payment integration</option><option>Orchestration</option><option>Trading services</option><option>Backend architecture</option><option>Something else</option>
          </select> with a budget of <select name="budget" defaultValue="$5k – $15k">
            <option>&lt; $5k</option><option>$5k – $15k</option><option>$15k – $50k</option><option>$50k+</option>
          </select> within <select name="time" defaultValue="1–3 months">
            <option>&lt; 1 month</option><option>1–3 months</option><option>3+ months</option>
          </select>. You can reach me at <input name="email" type="email" required placeholder="email" size={14} />.
          <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
          <div className="mt-12 flex items-center gap-6 font-normal">
            <button type="submit" className="btn btn-solid" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send inquiry →"}</button>
            {state === "error" && <span className="label text-accent">Something failed. Email me directly.</span>}
          </div>
        </form>
      )}
    </section>
  );
}
