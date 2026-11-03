import Link from "next/link";
import { nav, site } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="wrap pt-24 pb-8 hair mt-32 overflow-hidden">
      <div className="grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <p className="label text-muted mb-4">Newsletter</p>
          <form action={`mailto:${site.email}`} method="post" encType="text/plain" className="flex border-b border-fg">
            <input type="email" required placeholder="Your email" className="bg-transparent flex-1 py-3 outline-none placeholder:text-muted" aria-label="Email" />
            <button className="label">Subscribe →</button>
          </form>
        </div>
        <div className="md:col-span-3 md:col-start-8 space-y-2">
          <p className="label text-muted mb-4">Sitemap</p>
          {nav.map((n) => <Link key={n.href} href={n.href} className="block link-u w-fit">{n.label}</Link>)}
        </div>
        <div className="md:col-span-2 space-y-2">
          <p className="label text-muted mb-4">Social</p>
          {site.socials.map((s) => <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="block link-u w-fit">{s.label}</a>)}
        </div>
      </div>
      <div className="display text-[clamp(4rem,21vw,26rem)] mt-20 -mb-[0.06em] select-none whitespace-nowrap">
        {site.name}<sup className="text-[0.2em] align-top">®</sup>
      </div>
      <div className="flex flex-wrap justify-between gap-4 label text-muted mt-6">
        <span>© 2019–{new Date().getFullYear()} {site.person}</span>
        <span>Built with Next.js & Motion</span>
      </div>
    </footer>
  );
}
