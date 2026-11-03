import Link from "next/link";
export default function NotFound() {
  return (
    <section className="wrap min-h-[80svh] pt-40 flex flex-col justify-between">
      <p className="label text-muted">Error</p>
      <h1 className="display text-[clamp(8rem,32vw,36rem)]">404</h1>
      <div><Link href="/" className="btn">Back home</Link></div>
    </section>
  );
}
