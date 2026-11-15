import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectArt from "@/components/ProjectArt";
import { Reveal, SplitWords } from "@/components/motion-utils";
import { projects } from "@/lib/data";

export const dynamicParams = false;
export function generateStaticParams() { return projects.map((p) => ({ slug: p.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return { title: p?.title, description: p?.summary };
}

export default async function Case({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];
  return (
    <article className="wrap pt-40">
      <p className="label text-muted mb-6">{p.category} · {p.year}</p>
      <SplitWords as="h1" className="display text-[clamp(3rem,10vw,10rem)] max-w-[14ch]" text={p.title} />
      <p className="text-2xl text-muted max-w-2xl mt-10">{p.summary}</p>

      <Reveal className="mt-16">
        {p.cover
          ? <Image src={p.cover.src} alt={p.cover.alt} width={p.cover.w} height={p.cover.h} priority sizes="100vw" className="w-full h-auto border border-line" />
          : <ProjectArt p={p} className="w-full aspect-[16/9] md:aspect-[21/9]" />}
      </Reveal>

      <div className="grid md:grid-cols-12 gap-10 mt-20">
        <dl className="md:col-span-3 space-y-6">
          <div><dt className="label text-muted">Role</dt><dd className="mt-1">{p.role}</dd></div>
          <div><dt className="label text-muted">Stack</dt><dd className="mt-1">{p.stack.join(", ")}</dd></div>
          <div><dt className="label text-muted">Year</dt><dd className="mt-1">{p.year}</dd></div>
          {p.status && <div><dt className="label text-muted">Status</dt><dd className="mt-1">{p.status}</dd></div>}
        </dl>
        <div className="md:col-span-8 md:col-start-5 space-y-16">
          <Reveal><h2 className="label text-accent mb-4">The problem</h2><p className="text-2xl leading-snug">{p.problem}</p></Reveal>
          <Reveal>
            <h2 className="label text-accent mb-4">Architecture & decisions</h2>
            <ul>{p.architecture.map((a) => <li key={a} className="hair py-4 text-xl flex gap-4"><span className="text-accent">+</span>{a}</li>)}</ul>
          </Reveal>
          {p.sections?.map((s) => (
            <Reveal key={s.title}>
              <h2 className="label text-accent mb-4">{s.title}</h2>
              {s.intro && <p className="text-2xl leading-snug mb-4">{s.intro}</p>}
              {s.points && <ul>{s.points.map((x) => <li key={x} className="hair py-4 text-lg flex gap-4"><span className="text-accent">+</span>{x}</li>)}</ul>}
              {s.image && <Image src={s.image.src} alt={s.image.alt} width={s.image.w} height={s.image.h} sizes="(min-width: 768px) 66vw, 100vw" className="w-full h-auto border border-line mt-8" />}
            </Reveal>
          ))}
          {p.decisions && (
            <Reveal>
              <h2 className="label text-accent mb-4">Trade-offs</h2>
              {p.decisions.map((d) => (
                <div key={d.topic} className="hair py-6">
                  <h3 className="label text-muted">{d.topic}</h3>
                  <p className="text-xl mt-2">{d.chose}</p>
                  <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-4 mt-4 text-muted">
                    <div><dt className="label">Why</dt><dd className="mt-1">{d.why}</dd></div>
                    <div><dt className="label">Cost</dt><dd className="mt-1">{d.cost}</dd></div>
                  </dl>
                </div>
              ))}
            </Reveal>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-px bg-line border border-line mt-24">
        {p.results.map((r) => (
          <Reveal key={r.l} className="bg-bg p-8"><p className="display text-6xl text-accent">{r.v}</p><p className="label text-muted mt-3">{r.l}</p></Reveal>
        ))}
      </div>

      <Link href={`/work/${next.slug}`} className="block hair mt-32 py-16 group">
        <p className="label text-muted mb-4">Next project</p>
        <p className="display text-[clamp(2.5rem,8vw,8rem)] group-hover:translate-x-6 transition-transform duration-500">{next.title} →</p>
      </Link>
    </article>
  );
}
