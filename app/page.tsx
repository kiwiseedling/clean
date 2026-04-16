"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Arrow, Check, Footer, Navbar, Phone } from "./site-shared";

function Hero() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", service: "" });
  const canBook = form.name.trim() !== "" && form.email.trim() !== "" && form.service !== "";

  const handleBook = () => {
    if (!canBook) return;
    const params = new URLSearchParams({ name: form.name, email: form.email });
    router.push(form.service === "bulk" ? `/booking?${params}` : `/trash-valet?${params}`);
  };

  return (
    <section className="relative overflow-hidden pt-16" style={{ minHeight: "100vh", background: "#0a1f14" }}>

      {/* ── Background SVG scene ── */}
      <div className="pointer-events-none absolute inset-0 select-none overflow-hidden">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a4d30" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#0a1f14" stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* Sky */}
          <rect width="1440" height="900" fill="url(#skyGrad)" />

          {/* Subtle moon glow */}
          <circle cx="1280" cy="130" r="90" fill="rgba(106,191,142,0.04)" />
          <circle cx="1280" cy="130" r="50" fill="rgba(106,191,142,0.06)" />

          {/* ── Buildings (back row) ── */}
          <rect x="520"  y="320" width="90"  height="540" fill="rgba(15,45,31,0.9)"  rx="2" />
          <rect x="620"  y="220" width="120" height="640" fill="rgba(18,52,35,0.88)" rx="2" />
          <rect x="750"  y="280" width="100" height="580" fill="rgba(15,45,31,0.85)" rx="2" />
          <rect x="860"  y="180" width="150" height="680" fill="rgba(20,58,38,0.9)"  rx="2" />
          <rect x="1020" y="260" width="110" height="600" fill="rgba(15,45,31,0.82)" rx="2" />
          <rect x="1140" y="300" width="90"  height="560" fill="rgba(18,52,35,0.8)"  rx="2" />
          <rect x="1240" y="350" width="200" height="510" fill="rgba(15,45,31,0.78)" rx="2" />

          {/* ── Windows (glowing dots on buildings) ── */}
          {[
            [534,340],[534,380],[534,420],[534,460],[558,340],[558,380],[558,420],
            [636,240],[636,280],[636,320],[636,360],[636,400],[666,240],[666,280],[666,320],[666,360],
            [764,300],[764,340],[764,380],[794,300],[794,340],[794,380],
            [876,200],[876,240],[876,280],[876,320],[876,360],[916,200],[916,240],[916,280],[916,320],
            [1036,280],[1036,320],[1036,360],[1066,280],[1066,320],
            [1154,320],[1154,360],[1184,320],[1184,360],
            [1254,370],[1254,410],[1294,370],[1294,410],[1334,370],[1334,410],
          ].map(([x, y], idx) => (
            <rect key={idx} x={x} y={y} width="14" height="18" rx="2"
              fill={`rgba(106,191,142,${0.06 + (idx % 4) * 0.04})`} />
          ))}

          {/* ── Street / ground ── */}
          <rect x="0" y="720" width="1440" height="180" fill="rgba(6,18,12,0.97)" />
          <rect x="0" y="718" width="1440" height="5" fill="rgba(34,118,74,0.25)" />

          {/* Road center dashes */}
          {[0,1,2,3,4,5,6,7].map((i) => (
            <rect key={i} x={80 + i * 175} y="790" width="100" height="8" rx="4"
              fill="rgba(255,255,255,0.06)" />
          ))}

          {/* ── Garbage truck ── */}
          {/* Cab */}
          <rect x="280" y="568" width="155" height="152" fill="rgba(34,118,74,0.6)"  rx="12" />
          {/* Cab windshield */}
          <rect x="298" y="582" width="70"  height="52"  fill="rgba(106,191,142,0.18)" rx="6" />
          {/* Cab side window */}
          <rect x="376" y="586" width="42"  height="38"  fill="rgba(106,191,142,0.12)" rx="4" />
          {/* Cab grill */}
          <rect x="284" y="684" width="140" height="12"  fill="rgba(15,45,31,0.6)"    rx="3" />
          <rect x="284" y="698" width="140" height="6"   fill="rgba(34,118,74,0.4)"   rx="2" />
          {/* Headlights */}
          <rect x="286" y="654" width="30" height="18" fill="rgba(255,255,200,0.18)" rx="3" />
          <rect x="286" y="676" width="30" height="10" fill="rgba(255,140,0,0.2)"    rx="2" />

          {/* Truck body (hopper) */}
          <rect x="430" y="545" width="340" height="175" fill="rgba(34,118,74,0.5)"  rx="8" />
          {/* Hopper top lip */}
          <rect x="620" y="522" width="150" height="35"  fill="rgba(34,118,74,0.6)"  rx="6" />
          {/* Panel seams */}
          <rect x="530" y="545" width="3"   height="175" fill="rgba(0,0,0,0.2)" />
          <rect x="630" y="545" width="3"   height="175" fill="rgba(0,0,0,0.18)" />
          <rect x="430" y="612" width="340" height="3"   fill="rgba(106,191,142,0.18)" />
          {/* Rear step */}
          <rect x="765" y="692" width="15"  height="28"  fill="rgba(15,45,31,0.7)"   rx="2" />

          {/* Wheels */}
          {[340, 510, 670].map((cx) => (
            <g key={cx}>
              <circle cx={cx} cy="730" r="36" fill="rgba(8,22,14,0.95)" />
              <circle cx={cx} cy="730" r="24" fill="rgba(34,118,74,0.55)" />
              <circle cx={cx} cy="730" r="10" fill="rgba(106,191,142,0.25)" />
              <circle cx={cx} cy="730" r="3"  fill="rgba(106,191,142,0.4)" />
            </g>
          ))}

          {/* Headlight beams */}
          <path d="M 280 660 L 160 690 L 160 715 L 280 688 Z" fill="rgba(255,255,200,0.03)" />
          <path d="M 280 665 L 130 700 L 130 720 L 280 694 Z" fill="rgba(255,255,200,0.02)" />

          {/* ── Trees ── */}
          <ellipse cx="900" cy="650" rx="38" ry="75" fill="rgba(34,118,74,0.28)" />
          <rect    x="896" y="718" width="8" height="50" fill="rgba(10,30,18,0.5)" />
          <ellipse cx="950" cy="665" rx="28" ry="58" fill="rgba(34,118,74,0.22)" />
          <rect    x="947" y="720" width="6" height="40" fill="rgba(10,30,18,0.45)" />
          <ellipse cx="990" cy="655" rx="32" ry="66" fill="rgba(34,118,74,0.25)" />
          <rect    x="987" y="719" width="6" height="46" fill="rgba(10,30,18,0.45)" />

          {/* ── Trash bins (curbside) ── */}
          {/* Bin 1 – general */}
          <rect x="1060" y="645" width="46" height="70" fill="rgba(34,118,74,0.45)"  rx="5" />
          <rect x="1055" y="636" width="56" height="14" fill="rgba(34,118,74,0.55)"  rx="4" />
          <rect x="1068" y="656" width="30" height="4"  fill="rgba(106,191,142,0.2)" rx="2" />
          {/* Bin 2 – recycling */}
          <rect x="1118" y="640" width="50" height="75" fill="rgba(58,157,102,0.4)"  rx="5" />
          <rect x="1113" y="631" width="60" height="14" fill="rgba(58,157,102,0.5)"  rx="4" />
          <rect x="1126" y="651" width="34" height="4"  fill="rgba(106,191,142,0.18)" rx="2" />
          {/* Bin 3 – organics */}
          <rect x="1180" y="650" width="42" height="65" fill="rgba(22,100,60,0.4)"   rx="5" />
          <rect x="1175" y="641" width="52" height="13" fill="rgba(22,100,60,0.5)"   rx="4" />

          {/* ── Resident silhouette ── */}
          <ellipse cx="1145" cy="600" rx="14" ry="14" fill="rgba(106,191,142,0.2)" />
          <rect x="1137" y="614" width="16" height="34" fill="rgba(106,191,142,0.18)" rx="5" />
          <rect x="1124" y="620" width="13" height="4"  fill="rgba(106,191,142,0.15)" rx="2" />
          <rect x="1150" y="618" width="13" height="4"  fill="rgba(106,191,142,0.15)" rx="2" />
          <rect x="1137" y="648" width="6"  height="24" fill="rgba(106,191,142,0.12)" rx="2" />
          <rect x="1146" y="648" width="6"  height="24" fill="rgba(106,191,142,0.12)" rx="2" />
        </svg>

        {/* Left gradient — keeps text readable */}
        <div className="absolute inset-y-0 left-0 w-3/4"
          style={{ background: "linear-gradient(to right, rgba(10,31,20,0.96) 0%, rgba(10,31,20,0.82) 45%, transparent 100%)" }} />
      </div>

      {/* ── Main content ── */}
      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1fr_400px] lg:items-center">

        {/* Left: headline + trust */}
        <div>
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-widest"
            style={{ color: "#6abf8e", borderColor: "rgba(106,191,142,0.25)", background: "rgba(106,191,142,0.08)" }}>
            <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full" style={{ background: "#6abf8e" }} />
            Bay Area · Upfront Pricing · Within 24 Hours
          </p>

          <h1 className="mb-5 font-black text-white"
            style={{ fontSize: "clamp(2.8rem,5.8vw,4.8rem)", lineHeight: 1.04, letterSpacing: "-0.04em" }}>
            Bulk Waste &amp;<br />Trash Valet,<br />Done Right.
          </h1>

          <p className="mb-2 max-w-md text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.58)" }}>
            Junk pickup and doorstep trash collection for residents, businesses, and property teams.
          </p>
          <p className="mt-3 mb-10 max-w-md text-sm italic" style={{ color: "rgba(255,255,255,0.38)" }}>
            Upfront pricing and No Hidden Costs
          </p>

        </div>

        {/* Right: booking card */}
        <div className="rounded-[28px] bg-white p-7 card-shadow-xl">
          <p className="mb-1 text-lg font-bold" style={{ color: "#0a1f14" }}>Free Estimate</p>
          <p className="mb-5 text-sm text-gray-400">Upfront pricing. No callbacks required.</p>

          <div className="space-y-3">
            <input
              type="text"
              autoComplete="name"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none transition-colors focus:border-green-600"
            />
            <input
              type="email"
              autoComplete="email"
              placeholder="Email address"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none transition-colors focus:border-green-600"
            />
            <select
              value={form.service}
              onChange={(e) => setForm((f) => ({ ...f, service: e.target.value }))}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-green-600"
              style={{ color: form.service ? "#0a1f14" : "#9ca3af" }}
            >
              <option value="" disabled>Select a service...</option>
              <option value="bulk">Bulk Waste Removal</option>
              <option value="valet">Trash Valet Service</option>
            </select>
          </div>

          <button
            onClick={handleBook}
            disabled={!canBook}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white transition-all"
            style={{
              background: canBook ? "linear-gradient(135deg,#22764a,#3a9d66)" : "#d1d5db",
              cursor: canBook ? "pointer" : "not-allowed",
            }}
          >
            Get Instant Price <Arrow />
          </button>

          <p className="mt-4 text-center text-xs text-gray-400">No credit card required · Free estimate</p>
        </div>
      </div>
    </section>
  );
}


function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="mx-auto max-w-6xl px-6">

        <div className="mb-16">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: "#22764a" }}>Our Services</p>
          <h2 className="mb-4 font-bold" style={{ color: "#0a1f14", fontSize: "clamp(2rem,3.8vw,3rem)", letterSpacing: "-0.03em", lineHeight: 1.06 }}>
            Two services, one team.
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-gray-500">
            One-time hauls or recurring community programs — we show up on time, handle the work, and price it upfront.
          </p>
        </div>

        {/* 01 Bulk Waste */}
        <div className="mb-4 grid gap-0 overflow-hidden rounded-[32px] lg:grid-cols-2" style={{ border: "1px solid #e4eeea" }}>
          {/* Left: title + description + who */}
          <div className="flex flex-col justify-between p-8 md:p-10" style={{ background: "#f7fbf8" }}>
            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-widest" style={{ color: "#22764a" }}>01 — Bulk Waste &amp; Junk Removal</p>
              <h3 className="mb-4 font-bold" style={{ color: "#0a1f14", fontSize: "clamp(1.6rem,2.4vw,2.2rem)", letterSpacing: "-0.025em", lineHeight: 1.1 }}>
                Everything hauled — furniture, appliances, full cleanouts.
              </h3>
              <p className="mb-8 text-sm leading-relaxed text-gray-500">
                Book online, get an upfront price, and we lift, load, and haul. No quotes, no callbacks, no surprises at the door.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Residents", "Businesses", "Property Teams", "Contractors"].map((tag) => (
                  <span key={tag} className="rounded-full px-3 py-1 text-xs font-medium" style={{ background: "#edfaf3", color: "#22764a" }}>{tag}</span>
                ))}
              </div>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-6">
              <div className="flex gap-8">
                {[{ value: "$100", label: "Starting price" }, { value: "24 hrs", label: "Fastest pickup" }].map((s) => (
                  <div key={s.label}>
                    <p className="text-xl font-black" style={{ color: "#0a1f14", letterSpacing: "-0.03em" }}>{s.value}</p>
                    <p className="text-xs text-gray-400">{s.label}</p>
                  </div>
                ))}
              </div>
              <Link href="/booking" className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90" style={{ background: "linear-gradient(135deg,#22764a,#3a9d66)" }}>
                Get Instant Price <Arrow />
              </Link>
            </div>
          </div>

          {/* Right: feature list */}
          <div className="flex flex-col justify-center divide-y divide-gray-100 bg-white p-8 md:p-10">
            {[
              { label: "Upfront pricing", body: "Know your exact cost before we arrive — no surprise charges." },
              { label: "We do all the lifting", body: "Point and we handle the rest. No prep or sorting needed." },
              { label: "Flexible scheduling", body: "Same-day, next-day, or whenever works for you." },
              { label: "Full cleanouts", body: "Single items to entire units — one call, one crew, done." },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: "#22764a" }} />
                <div>
                  <p className="text-sm font-semibold" style={{ color: "#0a1f14" }}>{item.label}</p>
                  <p className="text-sm text-gray-400">{item.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing strip — full width */}
          <div className="lg:col-span-2 border-t bg-white px-8 py-7 md:px-10" style={{ borderColor: "#e4eeea" }}>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="mb-0.5 text-[10px] font-bold uppercase tracking-widest" style={{ color: "#22764a" }}>Transparent Pricing</p>
                <p className="text-sm font-semibold" style={{ color: "#0a1f14" }}>No hidden costs. Price confirmed before we touch anything.</p>
              </div>
              <Link href="/booking" className="text-xs font-semibold transition-colors hover:opacity-75" style={{ color: "#22764a" }}>
                Get your exact price →
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {[
                { label: "Single Item", range: "$100–$140", note: "1–2 items or a few bags" },
                { label: "Small Load", range: "$140–$180", note: "Couch + small items, 5–10 bags" },
                { label: "Light Load", range: "$180–$240", note: "Small room corner, 10–15 bags" },
                { label: "Medium Load", range: "$240–$320", note: "Room cleanout, 15–25 bags" },
                { label: "Large Load", range: "$400–$550", note: "Garage cleanout, large items" },
                { label: "Full Cleanout", range: "$600–$1,000+", note: "Whole unit or heavy multi-load" },
              ].map((tier) => (
                <div key={tier.label} className="rounded-xl p-4" style={{ background: "#f7fbf8", border: "1px solid #e4eeea" }}>
                  <p className="mb-0.5 text-xs font-semibold text-gray-400">{tier.label}</p>
                  <p className="mb-0.5 text-xl font-black" style={{ color: "#0a1f14", letterSpacing: "-0.03em" }}>{tier.range}</p>
                  <p className="text-xs text-gray-400">{tier.note}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-gray-400">Labor, hauling &amp; disposal always included. Any adjustment for stairs or carry distance is shown upfront — never added after.</p>
          </div>
        </div>

        {/* 02 Trash Valet */}
        <div className="grid gap-0 overflow-hidden rounded-[32px] lg:grid-cols-2" style={{ border: "1px solid #d4e9dc" }}>
          {/* Left: title + description + who */}
          <div className="flex flex-col justify-between p-8 md:p-10" style={{ background: "#f0f7f3" }}>
            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-widest" style={{ color: "#22764a" }}>02 — Trash Valet Service</p>
              <h3 className="mb-4 font-bold" style={{ color: "#0a1f14", fontSize: "clamp(1.6rem,2.4vw,2.2rem)", letterSpacing: "-0.025em", lineHeight: 1.1 }}>
                Doorstep trash collection for apartment communities.
              </h3>
              <p className="mb-8 text-sm leading-relaxed text-gray-500">
                We pick up trash directly from residents' doors on a set schedule — no dumpster trips, no overflow, no complaints.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Residents", "Property Managers", "HOAs", "Apartment Communities"].map((tag) => (
                  <span key={tag} className="rounded-full px-3 py-1 text-xs font-medium" style={{ background: "#dff2e8", color: "#22764a" }}>{tag}</span>
                ))}
              </div>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-6" style={{ borderColor: "#d4e9dc" }}>
              <div className="flex gap-8">
                {[{ value: "$18", label: "Per door / month" }, { value: "3–5×", label: "Weekly pickups" }].map((s) => (
                  <div key={s.label}>
                    <p className="text-xl font-black" style={{ color: "#0a1f14", letterSpacing: "-0.03em" }}>{s.value}</p>
                    <p className="text-xs text-gray-400">{s.label}</p>
                  </div>
                ))}
              </div>
              <Link href="/trash-valet" className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90" style={{ background: "linear-gradient(135deg,#22764a,#3a9d66)" }}>
                Schedule Service <Arrow />
              </Link>
            </div>
          </div>

          {/* Right: feature list */}
          <div className="flex flex-col justify-center divide-y divide-gray-100 bg-white p-8 md:p-10">
            {[
              { label: "Doorstep pickup", body: "Collected directly from residents' doors — no dumpster trips." },
              { label: "Set-schedule service", body: "Nightly or every-other-day pickups that run like clockwork." },
              { label: "Cleaner common areas", body: "Less overflow, less mess — fewer complaints from residents." },
              { label: "Marketable amenity", body: "Bundle into rent or fees — a real, visible perk that retains residents." },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: "#22764a" }} />
                <div>
                  <p className="text-sm font-semibold" style={{ color: "#0a1f14" }}>{item.label}</p>
                  <p className="text-sm text-gray-400">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function ResponsibleDisposal() {
  return (
    <section style={{ background: "#0a1f14" }}>
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">

          {/* Left: label + headline + body */}
          <div>
            <p className="mb-4 text-[10px] font-bold uppercase tracking-widest" style={{ color: "#6abf8e" }}>
              Responsible Disposal
            </p>
            <h2 className="mb-5 font-bold text-white" style={{ fontSize: "clamp(1.8rem,3vw,2.6rem)", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              Not everything we haul goes to a landfill.
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.58)" }}>
              We don&apos;t just haul everything to the dump. Whenever possible, we donate usable items, recycle materials like metal and cardboard, and properly dispose of everything else. Our efficient sorting process helps keep your costs lower than traditional junk removal.
            </p>
          </div>

          {/* Right: 3 items as stacked rows */}
          <div className="space-y-0 divide-y" style={{ borderColor: "rgba(106,191,142,0.12)" }}>
            {[
              {
                num: "01",
                label: "Donate",
                body: "Usable furniture and goods go to local donation centers when possible.",
              },
              {
                num: "02",
                label: "Recycle",
                body: "Metal, cardboard, and other materials are sorted and recycled — kept out of the landfill.",
              },
              {
                num: "03",
                label: "Dispose",
                body: "Everything else is handled properly and legally. No illegal dumping, ever.",
              },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-5 py-6">
                <span className="min-w-[2.5rem] text-xs font-bold tabular-nums" style={{ color: "rgba(106,191,142,0.4)" }}>{item.num}</span>
                <div>
                  <p className="mb-1 text-base font-bold text-white">{item.label}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.52)" }}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section className="py-24" style={{ background: "#fafafa" }}>
      <div className="mx-auto max-w-5xl px-5">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: "#22764a" }}>Why BinButler</p>
          <h2 className="mb-4 font-bold" style={{ color: "#0a1f14", fontSize: "clamp(1.9rem,3.2vw,2.6rem)", letterSpacing: "-0.025em", lineHeight: 1.1 }}>
            Simple, predictable, and built around your schedule.
          </h2>
          <p className="leading-relaxed text-gray-500">
            We built BinButler around the things people actually care about: knowing what they&apos;ll pay, having someone show up on time, and not dealing with a process that wastes their day.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {[
            { title: "Upfront, transparent pricing", body: "See your exact price before booking. No quotes, no callbacks, no surprises at the door." },
            { title: "Professional, no-hassle service", body: "Trained crews that are quick, careful, and respectful of your space — every time." },
            { title: "All solutions in one place", body: "Bulk junk removal and trash valet — residential, commercial, and property-wide support." },
            { title: "Fast, reliable scheduling", body: "Same-day and next-day availability in most areas. We show up when we say we will." },
          ].map((item) => (
            <div key={item.title} className="rounded-[28px] border border-gray-100 bg-white p-6 card-shadow">
              <p className="mb-2 text-sm font-bold" style={{ color: "#0a1f14" }}>{item.title}</p>
              <p className="text-xs leading-relaxed text-gray-500">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactStrip() {
  return (
    <section className="pb-24" style={{ background: "#fafafa" }}>
      <div className="mx-auto max-w-5xl px-5">
        <div className="flex flex-col items-start justify-between gap-4 rounded-[28px] border border-gray-100 bg-[#0f2d1f] p-7 sm:flex-row sm:items-center">
          <div>
            <p className="mb-1 text-sm font-bold text-white">Prefer to book by phone?</p>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.68)" }}>
              Our team can walk through the same step-by-step booking flow with you.
            </p>
          </div>
          <a href="tel:+117132822588" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-gray-900">
            <Phone />
            (713) 282 2588
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <Navbar primaryHref="/booking" primaryLabel="Book Pickup" mode="home" />
      <Hero />
      <Services />
      <ResponsibleDisposal />
      <WhyUs />
      <ContactStrip />
      <Footer />
    </main>
  );
}
