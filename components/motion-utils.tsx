"use client";
import { motion, useInView, type Variants } from "motion/react";
import { useRef, type ReactNode } from "react";

export const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({ children, delay = 0, className = "", y = 40 }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

const wordV: Variants = {
  hidden: { y: "110%" },
  show: (i: number) => ({ y: 0, transition: { duration: 0.9, ease, delay: i * 0.03 } }),
};

/** Word-by-word masked reveal */
export function SplitWords({ text, className = "", as: Tag = "div" }: { text: string; className?: string; as?: "div" | "h1" | "h2" | "h3" | "p" }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const words = text.split(" ");
  return (
    <Tag ref={ref as never} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em] mr-[0.25em]">
          <motion.span className="inline-block" variants={wordV} custom={i} initial="hidden" animate={inView ? "show" : "hidden"}>
            {w}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Rolling digit counter */
export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const digits = String(value).split("").map(Number);
  return (
    <div ref={ref} className="flex items-baseline leading-none" aria-label={`${value}${suffix}`}>
      {digits.map((d, i) => (
        <span key={i} className="relative inline-block h-[1em] overflow-hidden" aria-hidden>
          <motion.span
            className="flex flex-col"
            initial={{ y: 0 }}
            animate={{ y: inView ? `${-d}em` : 0 }}
            transition={{ duration: 1.6 + i * 0.3, ease }}
          >
            {Array.from({ length: 10 }, (_, n) => (
              <span key={n} className="block h-[1em] leading-[1]">{n}</span>
            ))}
          </motion.span>
        </span>
      ))}
      <span aria-hidden className="text-accent">{suffix}</span>
    </div>
  );
}

/** Letters sliding up, used for the hero wordmark */
export function Letters({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((c, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "105%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.1, ease, delay: delay + i * 0.05 }}
          >
            {c === " " ? " " : c}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
