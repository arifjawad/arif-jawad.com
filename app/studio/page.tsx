import type { Metadata } from "next";
import { Reveal, SplitWords } from "@/components/motion-utils";
import { Process, StackMarquee } from "@/components/sections";
import { site, timeline } from "@/lib/data";

export const metadata: Metadata = { title: "Studio" };

export default function Studio() {
  return (
    <>
      <section className="wrap pt-40">
        <p className="label text-muted mb-6">About</p>
        <SplitWords as="h1" className="display text-[clamp(3rem,10vw,10rem)] max-w-[16ch]" text="One engineer, a very calm process." />
        <div className="grid md:grid-cols-12 gap-10 mt-20">
          <Reveal className="md:col-span-4 relative aspect-[3/4]">
            <div className="absolute inset-0 bg-bg2 border border-line grid place-items-center">
              <span className="display text-[10rem] text-accent">AJ</span>
              <span className="absolute bottom-4 left-4 label text-muted">Portrait placeholder</span>
            </div>
          </Reveal>
          <div className="md:col-span-7 md:col-start-6 space-y-8">
            <Reveal><p className="text-3xl leading-snug">I’m {site.person}, a {site.role.toLowerCase()} based in Dhaka. I work on payment gateways, payment orchestration and trading services for the fintech and prop-trading world.</p></Reveal>
            <Reveal><p className="text-xl text-muted">At Next Ventures Ltd I build payout, refund and dispute systems, an AI agent that submits dispute evidence, a MetaTrader Web API integration and an email campaign platform. My tools are Laravel, PHP, Node.js and Redis, with Next.js on the frontend.</p></Reveal>
          </div>
        </div>
      </section>
      <section className="wrap py-32 mt-20">
        <p className="label text-muted mb-10">Timeline</p>
        {timeline.map((t) => (
          <Reveal key={t.t}>
            <div className="grid md:grid-cols-12 gap-4 py-8 hair">
              <span className="label text-accent md:col-span-3">{t.y}</span>
              <h3 className="md:col-span-5 text-2xl tracking-tight">{t.t}</h3>
              <p className="md:col-span-4 text-muted">{t.d}</p>
            </div>
          </Reveal>
        ))}
      </section>
      <StackMarquee />
      <Process />
    </>
  );
}
