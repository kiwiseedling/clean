import Link from "next/link";
import { Arrow, Check, Footer, Navbar } from "../site-shared";
import ValetFormSection from "./ValetForm";

function ValetHeroIntro() {
  return (
    <section className="relative overflow-hidden pt-16" style={{ background: "#0c0c0c" }}>
      <div className="pointer-events-none absolute inset-0 select-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #aaaaaa 1px, transparent 0)", backgroundSize: "32px 32px" }} />

        {/* Apartment trash valet scene — building facade with doorstep bags + valet worker */}
        <svg className="absolute right-0 top-1/2 -translate-y-1/2 h-full w-[62%] opacity-[0.26]" viewBox="0 0 520 220" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          {/* Building body */}
          <rect x="50" y="8" width="400" height="196" fill="rgba(70,70,70,0.52)" rx="4"/>
          {/* Roof parapet */}
          <rect x="44" y="4" width="412" height="10" fill="rgba(70,70,70,0.72)" rx="3"/>

          {/* Floor dividers — 4 floors */}
          {[56, 104, 152].map((y) => (
            <rect key={y} x="50" y={y} width="400" height="2" fill="rgba(0,0,0,0.22)"/>
          ))}

          {/* ── Floor 1 (top) y=8–56 ── */}
          <rect x="76"  y="16" width="24" height="36" fill="rgba(10,10,10,0.8)" rx="2"/>
          <circle cx="95" cy="34" r="2.5" fill="rgba(180,180,180,0.55)"/>
          <rect x="108" y="16" width="38" height="28" fill="rgba(180,180,180,0.13)" rx="2"/>
          <line x1="127" y1="16" x2="127" y2="44" stroke="rgba(180,180,180,0.2)" strokeWidth="1"/>
          <rect x="290" y="16" width="38" height="28" fill="rgba(180,180,180,0.13)" rx="2"/>
          <line x1="309" y1="16" x2="309" y2="44" stroke="rgba(180,180,180,0.2)" strokeWidth="1"/>
          <rect x="336" y="16" width="24" height="36" fill="rgba(10,10,10,0.8)" rx="2"/>
          <circle cx="344" cy="34" r="2.5" fill="rgba(180,180,180,0.55)"/>
          {/* Bags floor 1 */}
          <ellipse cx="72"  cy="51" rx="8" ry="6" fill="rgba(180,180,180,0.42)"/>
          <rect    x="67"  y="45" width="10" height="4" fill="rgba(180,180,180,0.32)" rx="1"/>
          <ellipse cx="363" cy="51" rx="8" ry="6" fill="rgba(180,180,180,0.42)"/>
          <rect    x="358" y="45" width="10" height="4" fill="rgba(180,180,180,0.32)" rx="1"/>

          {/* ── Floor 2 y=56–104 ── */}
          <rect x="76"  y="64" width="24" height="36" fill="rgba(10,10,10,0.8)" rx="2"/>
          <circle cx="95" cy="82" r="2.5" fill="rgba(180,180,180,0.55)"/>
          <rect x="108" y="64" width="38" height="28" fill="rgba(180,180,180,0.15)" rx="2"/>
          <line x1="127" y1="64" x2="127" y2="92" stroke="rgba(180,180,180,0.2)" strokeWidth="1"/>
          <rect x="290" y="64" width="38" height="28" fill="rgba(180,180,180,0.15)" rx="2"/>
          <line x1="309" y1="64" x2="309" y2="92" stroke="rgba(180,180,180,0.2)" strokeWidth="1"/>
          <rect x="336" y="64" width="24" height="36" fill="rgba(10,10,10,0.8)" rx="2"/>
          <circle cx="344" cy="82" r="2.5" fill="rgba(180,180,180,0.55)"/>
          {/* Bags floor 2 */}
          <ellipse cx="72"  cy="99" rx="8" ry="6" fill="rgba(180,180,180,0.42)"/>
          <rect    x="67"  y="93" width="10" height="4" fill="rgba(180,180,180,0.32)" rx="1"/>
          <ellipse cx="363" cy="99" rx="8" ry="6" fill="rgba(180,180,180,0.42)"/>
          <rect    x="358" y="93" width="10" height="4" fill="rgba(180,180,180,0.32)" rx="1"/>

          {/* ── Floor 3 y=104–152 — VALET collecting ── */}
          <rect x="76"  y="112" width="24" height="36" fill="rgba(10,10,10,0.8)" rx="2"/>
          <circle cx="95" cy="130" r="2.5" fill="rgba(180,180,180,0.55)"/>
          <rect x="108" y="112" width="38" height="28" fill="rgba(180,180,180,0.17)" rx="2"/>
          <line x1="127" y1="112" x2="127" y2="140" stroke="rgba(180,180,180,0.2)" strokeWidth="1"/>
          <rect x="290" y="112" width="38" height="28" fill="rgba(180,180,180,0.17)" rx="2"/>
          <line x1="309" y1="112" x2="309" y2="140" stroke="rgba(180,180,180,0.2)" strokeWidth="1"/>
          <rect x="336" y="112" width="24" height="36" fill="rgba(10,10,10,0.8)" rx="2"/>
          <circle cx="344" cy="130" r="2.5" fill="rgba(180,180,180,0.55)"/>
          {/* Bag right side waiting */}
          <ellipse cx="363" cy="147" rx="8" ry="6" fill="rgba(180,180,180,0.42)"/>
          <rect    x="358" y="141" width="10" height="4" fill="rgba(180,180,180,0.32)" rx="1"/>
          {/* Valet worker (center corridor, bending to pick up bag) */}
          <ellipse cx="215" cy="117" rx="7" ry="7" fill="rgba(180,180,180,0.5)"/>
          <rect    x="210" y="124" width="10" height="14" fill="rgba(180,180,180,0.42)" rx="3"/>
          <rect    x="200" y="126" width="10" height="3"  fill="rgba(180,180,180,0.34)" rx="1"/>
          <rect    x="220" y="129" width="10" height="3"  fill="rgba(180,180,180,0.34)" rx="1"/>
          <rect    x="210" y="137" width="4"  height="10" fill="rgba(180,180,180,0.36)" rx="1"/>
          <rect    x="216" y="137" width="4"  height="10" fill="rgba(180,180,180,0.36)" rx="1"/>
          {/* Bag being picked up */}
          <ellipse cx="200" cy="146" rx="8" ry="6" fill="rgba(180,180,180,0.55)"/>
          <rect    x="195" y="140" width="10" height="4" fill="rgba(180,180,180,0.44)" rx="1"/>

          {/* ── Floor 4 (ground) y=152–204 ── */}
          <rect x="76"  y="160" width="24" height="38" fill="rgba(10,10,10,0.8)" rx="2"/>
          <circle cx="95" cy="179" r="2.5" fill="rgba(180,180,180,0.55)"/>
          <rect x="108" y="160" width="38" height="28" fill="rgba(180,180,180,0.12)" rx="2"/>
          <line x1="127" y1="160" x2="127" y2="188" stroke="rgba(180,180,180,0.2)" strokeWidth="1"/>
          <rect x="290" y="160" width="38" height="28" fill="rgba(180,180,180,0.12)" rx="2"/>
          <line x1="309" y1="160" x2="309" y2="188" stroke="rgba(180,180,180,0.2)" strokeWidth="1"/>
          <rect x="336" y="160" width="24" height="38" fill="rgba(10,10,10,0.8)" rx="2"/>
          <circle cx="344" cy="179" r="2.5" fill="rgba(180,180,180,0.55)"/>
          {/* Bags ground floor */}
          <ellipse cx="72"  cy="197" rx="8" ry="6" fill="rgba(180,180,180,0.42)"/>
          <rect    x="67"  y="191" width="10" height="4" fill="rgba(180,180,180,0.32)" rx="1"/>
          <ellipse cx="363" cy="197" rx="8" ry="6" fill="rgba(180,180,180,0.42)"/>
          <rect    x="358" y="191" width="10" height="4" fill="rgba(180,180,180,0.32)" rx="1"/>
          {/* Collection cart center-ground */}
          <rect    x="192" y="180" width="56" height="16" fill="rgba(70,70,70,0.7)"  rx="3"/>
          <rect    x="190" y="175" width="60" height="8"  fill="rgba(70,70,70,0.82)" rx="2"/>
          <circle  cx="204" cy="198" r="5"              fill="rgba(8,24,16,0.95)"/>
          <circle  cx="236" cy="198" r="5"              fill="rgba(8,24,16,0.95)"/>
          <ellipse cx="206" cy="178" rx="7" ry="5" fill="rgba(180,180,180,0.6)"/>
          <ellipse cx="220" cy="176" rx="7" ry="6" fill="rgba(180,180,180,0.65)"/>
          <ellipse cx="234" cy="178" rx="7" ry="5" fill="rgba(180,180,180,0.58)"/>

          {/* Ground */}
          <rect x="20" y="202" width="480" height="18" fill="rgba(6,6,6,0.97)"/>
          <rect x="20" y="200" width="480" height="4"  fill="rgba(70,70,70,0.3)"/>
        </svg>

        {/* Left fade */}
        <div className="absolute inset-y-0 left-0 w-3/4" style={{ background: "linear-gradient(to right, rgba(10,10,10,0.98) 0%, rgba(10,10,10,0.82) 55%, transparent 100%)" }} />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-24">
        <h1 className="mb-4 font-black text-white"
          style={{ fontSize: "clamp(2.4rem,4.8vw,4rem)", lineHeight: 1.06, letterSpacing: "-0.04em" }}>
          Trash valet that serves<br />
          <span style={{ color: "#aaaaaa" }}>residents and communities.</span>
        </h1>

        <p className="max-w-lg text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.58)" }}>
          Doorstep trash pickup for apartment complexes, HOAs, and multifamily communities — with property manager visibility and SB-1383 compliance support.
        </p>
      </div>
    </section>
  );
}

function PageTabs() {
  const tabs = [
    ["Resident Doorstep", "#doorstep"],
    ["Property Managers", "#property-managers"],
    ["SB-1383 Support", "#sb1383"],
    ["Pricing", "#pricing"],
  ];

  return (
    <section className="sticky top-16 z-30 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl gap-2 overflow-x-auto px-5 py-3">
        {tabs.map(([label, href]) => (
          <a
            key={label}
            href={href}
            className="min-w-fit rounded-full border px-4 py-2 text-sm font-semibold transition-all hover:bg-[#f0f0f0]"
            style={{ borderColor: "#d1d5db", color: "#111111", background: "white" }}
          >
            {label}
          </a>
        ))}
      </div>
    </section>
  );
}

function DoorstepSection() {
  return (
    <section id="doorstep" className="bg-white py-24">
      <div className="mx-auto max-w-5xl px-5">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: "#555555" }}>Resident Doorstep Valet</p>
          <h2 className="mb-4 font-bold" style={{ color: "#0c0c0c", fontSize: "clamp(1.9rem,3.2vw,2.6rem)", letterSpacing: "-0.025em", lineHeight: 1.12 }}>
            A resident amenity that makes
            <br />
            doorstep collection feel premium.
          </h2>
          <p className="leading-relaxed text-gray-500">
            Our residential valet waste service collects door-to-door from every occupied apartment — residents stage tied bags during the scheduled window, JunkDrive handles the rest, and the community gets cleaner corridors with less friction around everyday trash disposal.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Nightly or every-other-day routes",
              "Door-to-door pickup from occupied apartments",
              "Cleaner hallways and a stronger resident experience",
              "An amenity that can help leasing and retention conversations",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-gray-100 bg-white p-5 card-shadow">
                <div className="mb-3 flex h-5 w-5 items-center justify-center rounded-full" style={{ background: "#f4f4f4", color: "#555555" }}>
                  <Check />
                </div>
                <p className="text-sm leading-relaxed text-gray-600">{item}</p>
              </div>
            ))}
          </div>

          <div className="rounded-[28px] border border-gray-100 bg-[#111111] p-7 text-white card-shadow-lg">
            <p className="mb-2 text-sm font-bold uppercase tracking-widest" style={{ color: "rgba(200,200,200,0.72)" }}>
              Resident Positioning
            </p>
            <p className="mb-4 text-2xl font-black" style={{ letterSpacing: "-0.03em" }}>
              Convenience at the door.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.74)" }}>
              The service is framed as an everyday living upgrade: less hauling, less mess in common areas, and a more polished experience for residents who expect convenience in multifamily living.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ConnectSection() {
  const bullets = [
    "Doorstep collection for every occupied unit",
    "Customizable frequency — 5 or 7 nights/week",
    "Cleaner hallways and stronger resident retention",
    "SB-1383 compliance and organics program support",
  ];

  const stats = [
    { label: "Starting from", value: "$18", note: "per door / month" },
    { label: "Routes", value: "5–7×", note: "nights per week" },
    { label: "Setup time", value: "< 1 wk", note: "from approval to start" },
    { label: "Compliance", value: "SB-1383", note: "organics support" },
  ];

  return (
    <section id="property-managers" className="py-24" style={{ background: "#111111" }}>
      <div className="mx-auto max-w-5xl px-5">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(200,200,200,0.65)" }}>Property Manager</p>
            <h2 className="mb-4 font-bold text-white" style={{ fontSize: "clamp(1.9rem,3.2vw,2.6rem)", letterSpacing: "-0.025em", lineHeight: 1.12 }}>
              Request a proposal for your property.
            </h2>
            <p className="mb-10 leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
              Tell us about your apartment complex, HOA, or multifamily property and we&apos;ll build a trash valet service plan that fits your operations, budget, and compliance needs.
            </p>
            <div className="space-y-4">
              {bullets.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: "#aaaaaa" }} />
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map(({ label, value, note }) => (
              <div key={label} className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(200,200,200,0.65)" }}>{label}</p>
                <p className="text-2xl font-black text-white" style={{ letterSpacing: "-0.03em" }}>{value}</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SBSection() {
  return (
    <section id="sb1383" className="py-24" style={{ background: "#fafafa" }}>
      <div className="mx-auto max-w-5xl px-5">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: "#555555" }}>SB-1383 Support</p>
          <h2 className="mb-4 font-bold" style={{ color: "#0c0c0c", fontSize: "clamp(1.9rem,3.2vw,2.6rem)", letterSpacing: "-0.025em", lineHeight: 1.12 }}>
            Organics and compliance support
            <br />
            for California multifamily properties.
          </h2>
          <p className="leading-relaxed text-gray-500">
            For California communities, we can position JunkDrive as an implementation partner that helps onsite teams manage resident education, collection setup, contamination reduction, and everyday program follow-through around SB-1383.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[
            "Resident education and service rollout support",
            "Collection setup guidance for waste, recycling, and organics",
            "Contamination reduction messaging and building reminders",
            "A cleaner onsite process for recurring compliance execution",
          ].map((item) => (
            <div key={item} className="rounded-[28px] border border-gray-100 bg-white p-6 card-shadow">
              <div className="mb-3 flex h-5 w-5 items-center justify-center rounded-full" style={{ background: "#f4f4f4", color: "#555555" }}>
                <Check />
              </div>
              <p className="text-sm leading-relaxed text-gray-600">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    {
      name: "Resident Doorstep",
      price: "$18",
      note: "per occupied door / month",
      details: ["3 collection nights per week", "Resident valet positioning", "Best balance of service and cost"],
      hi: false,
    },
    {
      name: "Doorstep + Connect",
      price: "$28",
      note: "per occupied door / month",
      details: ["5 collection nights per week", "Added manager-facing coordination support", "Best for higher-touch apartment operations"],
      hi: true,
    },
    {
      name: "Doorstep + Connect + SB-1383",
      price: "$34",
      note: "per occupied door / month",
      details: ["Recurring valet service plus compliance support positioning", "Best for California communities managing organics obligations", "Single operating partner across resident and manager needs"],
      hi: false,
    },
  ];

  return (
    <section id="pricing" className="bg-white py-24">
      <div className="mx-auto max-w-5xl px-5">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: "#555555" }}>Transparent Pricing</p>
          <h2 className="mb-4 font-bold" style={{ color: "#0c0c0c", fontSize: "clamp(1.9rem,3.2vw,2.6rem)", letterSpacing: "-0.025em", lineHeight: 1.12 }}>
            Monthly valet pricing,
            <br />
            published up front.
          </h2>
          <p className="leading-relaxed text-gray-500">
            Pricing below assumes a standard apartment layout, bagged household trash only, and 40+ occupied doors. Communities with long carry distances, unusual disposal layouts, or added organics complexity may need an operations review before launch.
          </p>
        </div>

        <div className="mb-8 grid gap-5 md:grid-cols-3">
          {plans.map(({ name, price, note, details, hi }) => (
            <div
              key={name}
              className="relative rounded-2xl border p-7 transition-all"
              style={
                hi
                  ? { background: "#111111", borderColor: "rgba(180,180,180,0.25)", boxShadow: "0 20px 60px rgba(10,10,10,0.25)" }
                  : { background: "white", borderColor: "#e5e7eb", boxShadow: "0 4px 16px rgba(0,0,0,0.04)" }
              }
            >
              {hi && (
                <div className="absolute -top-3 left-0 right-0 flex justify-center">
                  <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ background: "#555555", color: "#fff" }}>
                    Most requested
                  </span>
                </div>
              )}
              <p className="mb-2 text-sm font-semibold" style={{ color: hi ? "rgba(200,240,220,0.75)" : "#6b7280" }}>{name}</p>
              <p className="mb-1 text-4xl font-black" style={{ color: hi ? "#cccccc" : "#0c0c0c", letterSpacing: "-0.02em" }}>{price}</p>
              <p className="mb-6 text-xs" style={{ color: hi ? "rgba(200,200,200,0.5)" : "#9ca3af" }}>{note}</p>
              <ul className="space-y-2.5">
                {details.map((detail) => (
                  <li key={detail} className="flex items-center gap-2.5 text-sm" style={{ color: hi ? "rgba(255,255,255,0.88)" : "#4b5563" }}>
                    <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full" style={{ background: hi ? "rgba(180,180,180,0.18)" : "#f4f4f4", color: hi ? "#aaaaaa" : "#555555" }}>
                      <Check />
                    </div>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
          <div className="rounded-2xl border border-gray-100 bg-[#fafafa] p-7 card-shadow">
            <p className="mb-2 text-sm font-bold" style={{ color: "#0c0c0c" }}>What is included</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Door-to-door bag pickup during the approved service window",
                "Transfer to the designated onsite disposal area",
                "Resident, manager, and compliance-oriented program positioning",
                "Monthly billing based on occupied doors and selected service layer",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl bg-white p-4">
                  <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full" style={{ background: "#f4f4f4", color: "#555555" }}>
                    <Check />
                  </div>
                  <p className="text-sm text-gray-600">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl p-7" style={{ background: "#111111" }}>
            <p className="mb-2 text-sm font-bold text-white">Need both services?</p>
            <p className="mb-5 text-sm leading-relaxed" style={{ color: "rgba(200,200,200,0.7)" }}>
              Trash valet works best when paired with JunkDrive bulk trash support for cleanouts, overflow, and move-out volume.
            </p>
            <Link href="/" className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-white transition-all hover:opacity-90" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.12)" }}>
              View Bulk Trash Service <Arrow className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    {
      q: "Is trash valet only for residents?",
      a: "No. Our trash valet service is designed for apartment communities, HOAs, and multifamily properties. We position the program for residents, onsite teams, landlords, and ownership goals at the same time — covering convenience, operational visibility, and compliance support together.",
    },
    {
      q: "What does Connect mean on this page?",
      a: "It refers to the manager-facing side of the program: communication, route visibility, service coordination, and issue handling support for onsite teams.",
    },
    {
      q: "How does SB-1383 support fit in?",
      a: "For California multifamily properties, JunkDrive can support the collection setup, resident education, contamination reduction, and program follow-through tied to organics requirements.",
    },
    {
      q: "Do you still need a launch check?",
      a: "Yes. We still confirm route feasibility, staging windows, and disposal access before starting service, but the pricing and service positioning are already published here.",
    },
  ];

  return (
    <section id="faq" className="py-24" style={{ background: "#fafafa" }}>
      <div className="mx-auto max-w-5xl px-5">
        <div className="mb-12 max-w-xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: "#555555" }}>FAQ</p>
          <h2 className="mb-4 font-bold" style={{ color: "#0c0c0c", fontSize: "clamp(1.9rem,3.2vw,2.6rem)", letterSpacing: "-0.025em", lineHeight: 1.12 }}>
            The details property teams ask most.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <div key={item.q} className="rounded-2xl border border-gray-100 bg-white p-6 card-shadow">
              <p className="mb-2 text-sm font-bold" style={{ color: "#0c0c0c" }}>{item.q}</p>
              <p className="text-sm leading-relaxed text-gray-500">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

type PageProps = {
  searchParams: Promise<{ name?: string; email?: string }>;
};

export default async function TrashValetPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const initialName = params.name ?? "";
  const initialEmail = params.email ?? "";
  return (
    <main>
      <Navbar primaryHref="/booking" primaryLabel="Book Pickup" mode="home" />
      <ValetHeroIntro />
      <ValetFormSection initialName={initialName} initialEmail={initialEmail} />
      <PageTabs />
      <DoorstepSection />
      <ConnectSection />
      <SBSection />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}
