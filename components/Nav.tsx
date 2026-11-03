"use client";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/data";
import { useTheme } from "./Providers";
import { ease } from "./motion-utils";

function Clock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = () => setT(new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: site.tz }).format(new Date()));
    f();
    const id = setInterval(f, 15000);
    return () => clearInterval(id);
  }, []);
  return <span className="label text-muted hidden md:inline">{site.location} · {t}</span>;
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const { theme, toggle } = useTheme();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 200 && !open);
  });

  return (
    <>
      <motion.header
        className="fixed top-0 inset-x-0 z-50 wrap py-5 flex items-center justify-between mix-blend-normal"
        animate={{ y: hidden ? "-110%" : 0 }}
        transition={{ duration: 0.5, ease }}
      >
        <Link href="/" className="text-xl font-medium tracking-tight" onClick={() => setOpen(false)}>
          {site.name}<sup className="text-xs">®</sup>
        </Link>
        <Clock />
        <nav className="flex items-center gap-6">
          <div className="hidden md:flex gap-6">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="label link-u">{n.label}</Link>
            ))}
          </div>
          <button onClick={toggle} className="label border border-line rounded-full px-3 py-1.5 hover:border-fg transition-colors" aria-label="Toggle reading mode">
            {theme === "dark" ? "☾ Dark" : "☼ Reading"}
          </button>
          <button onClick={() => setOpen((o) => !o)} className="label link-u" aria-expanded={open}>
            {open ? "Close" : "Menu"}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-bg wrap pt-28 pb-10 flex flex-col justify-between"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease }}
          >
            <ul className="space-y-1">
              {[{ label: "Home", href: "/" }, ...nav].map((n, i) => (
                <li key={n.href} className="overflow-hidden">
                  <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.9, ease, delay: 0.2 + i * 0.07 }}>
                    <Link href={n.href} onClick={() => setOpen(false)} className="display text-[clamp(3rem,11vw,9rem)] hover:text-accent transition-colors block">
                      {n.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              {site.socials.map((s) => (
                <a key={s.label} href={s.href} className="label link-u" target="_blank" rel="noreferrer">{s.label}</a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
