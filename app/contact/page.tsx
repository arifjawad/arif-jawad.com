import type { Metadata } from "next";
import { SentenceForm } from "@/components/sections";
import { site } from "@/lib/data";

export const metadata: Metadata = { title: "Contact" };

export default function Contact() {
  return (
    <div className="pt-24">
      <SentenceForm />
      <section className="wrap grid md:grid-cols-3 gap-8 pb-10">
        <div><p className="label text-muted mb-2">Email</p><a className="link-u text-xl" href={`mailto:${site.email}`}>{site.email}</a></div>
        <div><p className="label text-muted mb-2">Based in</p><p className="text-xl">{site.location}</p></div>
        <div><p className="label text-muted mb-2">Elsewhere</p>{site.socials.slice(0, 3).map((s) => <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="link-u block w-fit">{s.label}</a>)}</div>
      </section>
    </div>
  );
}
