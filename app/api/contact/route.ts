import { NextResponse } from "next/server";
import { site } from "@/lib/data";

export async function POST(req: Request) {
  let b: Record<string, string>;
  try { b = await req.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }
  if (b.website) return NextResponse.json({ ok: true }); // honeypot
  const email = String(b.email ?? "").trim();
  const name = String(b.name ?? "").trim().slice(0, 120);
  if (!name || !/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ ok: false }, { status: 422 });

  const text = `Name: ${name}\nCompany: ${b.company ?? ""}\nEmail: ${email}\nNeed: ${b.need}\nBudget: ${b.budget}\nTime: ${b.time}`;
  const key = process.env.RESEND_API_KEY;
  if (!key) { console.log("[contact]", text); return NextResponse.json({ ok: true }); }

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>", to: [site.email], reply_to: email, subject: `New inquiry from ${name}`, text }),
  });
  return NextResponse.json({ ok: r.ok }, { status: r.ok ? 200 : 502 });
}
