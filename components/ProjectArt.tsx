import type { Project } from "@/lib/data";

/** Generated cover art: layered gradients + a node/flow motif, unique per project hue */
export default function ProjectArt({ p, className = "" }: { p: Pick<Project, "hue" | "title" | "category">; className?: string }) {
  const a = `hsl(${p.hue} 85% 58%)`;
  const b = `hsl(${(p.hue + 60) % 360} 70% 32%)`;
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: `linear-gradient(155deg, ${b}, #0b0b0a 85%)` }}>
      <div className="absolute -top-1/4 -right-1/4 w-[90%] aspect-square rounded-full blur-3xl opacity-70" style={{ background: a }} />
      <svg viewBox="0 0 300 400" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" fill="none" stroke="#fff" strokeOpacity=".55">
        <path d="M-10 300 C 80 300, 80 180, 150 180 S 230 90, 320 90" strokeWidth="1.2" />
        <path d="M-10 340 C 100 340, 120 240, 190 240 S 260 150, 320 150" strokeWidth="1.2" strokeOpacity=".3" />
        {[[40, 300], [150, 180], [260, 112], [190, 240]].map(([x, y], i) => (
          <g key={i}><circle cx={x} cy={y} r="5" fill="#fff" stroke="none" /><circle cx={x} cy={y} r="14" strokeOpacity=".35" /></g>
        ))}
      </svg>
      <div className="absolute left-4 bottom-4 right-4 text-white mix-blend-normal">
        <p className="label opacity-80">{p.category}</p>
        <p className="text-lg font-medium leading-tight tracking-tight">{p.title}</p>
      </div>
    </div>
  );
}
