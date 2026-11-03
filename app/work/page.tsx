import type { Metadata } from "next";
import { WorkList } from "@/components/sections";
import { SplitWords } from "@/components/motion-utils";

export const metadata: Metadata = { title: "Work" };

export default function Work() {
  return (
    <section className="wrap pt-40">
      <p className="label text-muted mb-6">Index</p>
      <SplitWords as="h1" className="display text-[clamp(4rem,16vw,18rem)] mb-20" text="Work" />
      <WorkList />
    </section>
  );
}
