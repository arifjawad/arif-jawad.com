import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { notes } from "@/lib/data";

export const dynamicParams = false;
export function generateStaticParams() { return notes.map((n) => ({ slug: n.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: notes.find((n) => n.slug === slug)?.t };
}

export default async function Note({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const n = notes.find((x) => x.slug === slug);
  if (!n) notFound();
  return (
    <article className="wrap pt-40 max-w-4xl">
      <p className="label text-muted mb-6">{n.date}</p>
      <h1 className="display text-[clamp(2.5rem,7vw,6rem)] mb-16">{n.t}</h1>
      <div className="space-y-6 text-xl leading-relaxed">{n.body.map((b, i) => <p key={i}>{b}</p>)}</div>
    </article>
  );
}
