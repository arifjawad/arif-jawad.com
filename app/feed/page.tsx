import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, SplitWords } from "@/components/motion-utils";
import { notes } from "@/lib/data";

export const metadata: Metadata = { title: "Feed" };

export default function Feed() {
  return (
    <section className="wrap pt-40">
      <p className="label text-muted mb-6">Notes</p>
      <SplitWords as="h1" className="display text-[clamp(4rem,16vw,18rem)] mb-20" text="Feed" />
      {notes.map((n) => (
        <Reveal key={n.slug}>
          <Link href={`/feed/${n.slug}`} className="grid md:grid-cols-12 gap-4 py-10 hair group">
            <span className="label text-muted md:col-span-2">{n.date}</span>
            <h2 className="md:col-span-6 text-3xl md:text-4xl tracking-tight group-hover:translate-x-3 transition-transform duration-500">{n.t}</h2>
            <p className="md:col-span-4 text-muted">{n.p}</p>
          </Link>
        </Reveal>
      ))}
      <div className="hair" />
    </section>
  );
}
