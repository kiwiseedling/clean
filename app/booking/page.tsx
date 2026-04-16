import Link from "next/link";
import { Arrow, Check, Footer, Navbar } from "../site-shared";
import BookingExperience from "./BookingForm";

type PageProps = {
  searchParams: Promise<{ name?: string; phone?: string }>;
};

function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Book in minutes",
      body: "Select what you're removing, describe the load size, and get an instant upfront price. No callbacks, no waiting on a quote.",
      detail: "Everything confirmed before we show up.",
    },
    {
      n: "02",
      title: "Crew arrives on time",
      body: "Your licensed crew shows up in the window you picked. You get a text when they're 20 minutes out. Just point — they do the heavy lifting.",
      detail: "Two-person crew. Uniformed. On time.",
    },
    {
      n: "03",
      title: "Hauled and disposed",
      body: "Everything gets loaded onto the truck and taken to a licensed facility. Furniture and appliances are donated or recycled whenever possible.",
      detail: "Bay Area licensed disposal. Responsible handling.",
    },
  ];
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-14 max-w-xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: "#22764a" }}>How It Works</p>
          <h2 className="mb-4 font-bold" style={{ color: "#0a1f14", fontSize: "clamp(1.9rem,3.2vw,2.6rem)", letterSpacing: "-0.025em", lineHeight: 1.12 }}>
            Book to done<br />in three steps.
          </h2>
          <p className="leading-relaxed text-gray-500">
            No truck to rent, no straining your back, no hauling to the dump. You book, we show up, it&apos;s gone.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="rounded-[28px] border border-gray-100 bg-white p-7 card-shadow">
              <p className="mb-4 text-4xl font-black" style={{ color: "rgba(34,118,74,0.12)", letterSpacing: "-0.04em" }}>{s.n}</p>
              <p className="mb-2 text-lg font-bold" style={{ color: "#0a1f14" }}>{s.title}</p>
              <p className="mb-4 text-sm leading-relaxed text-gray-500">{s.body}</p>
              <p className="text-xs font-semibold" style={{ color: "#22764a" }}>{s.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatWeHaul() {
  const accepts = [
    { label: "Sofas & Sectionals", note: "Any size, any condition" },
    { label: "Mattresses", note: "Twin through king, box springs" },
    { label: "Appliances", note: "Washers, dryers, fridges, ovens" },
    { label: "Dressers & Wardrobes", note: "Flat-pack or solid wood" },
    { label: "TVs & Electronics", note: "Responsibly recycled" },
    { label: "Yard Debris", note: "Branches, soil bags, pavers" },
    { label: "Construction Debris", note: "Drywall, flooring, lumber" },
    { label: "Move-Out Cleanouts", note: "Full property or single room" },
    { label: "Office Furniture", note: "Desks, chairs, filing cabinets" },
    { label: "Boxes & Mixed Junk", note: "Bagged trash, clutter, misc." },
  ];
  const notAccepted = ["Hazardous chemicals or paint", "Medical or biohazard waste", "Propane tanks (full)"];

  return (
    <section className="py-24" style={{ background: "#fafafa" }}>
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-14 max-w-xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: "#22764a" }}>What We Haul</p>
          <h2 className="mb-4 font-bold" style={{ color: "#0a1f14", fontSize: "clamp(1.9rem,3.2vw,2.6rem)", letterSpacing: "-0.025em", lineHeight: 1.12 }}>
            Most things in your home<br />or property — we take it.
          </h2>
          <p className="leading-relaxed text-gray-500">
            From a single couch to a full garage cleanout. If you&apos;re not sure, call us — we&apos;ll tell you on the spot.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {accepts.map(({ label, note }) => (
            <div key={label} className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-5 card-shadow">
              <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full" style={{ background: "#edfaf3", color: "#22764a" }}>
                <Check />
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "#0a1f14" }}>{label}</p>
                <p className="text-xs text-gray-400">{note}</p>
              </div>
            </div>
          ))}
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 card-shadow sm:col-span-2 lg:col-span-2">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-400">Not accepted</p>
            <div className="flex flex-wrap gap-2">
              {notAccepted.map((item) => (
                <span key={item} className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-400">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BulkPricing() {
  const tiers = [
    { label: "Single Item", range: "$100–$140", note: "1–2 items — chair, appliance, box spring, or a few bags", hi: false },
    { label: "Small Load", range: "$140–$180", note: "Couch + small items, or 5–10 bags", hi: false },
    { label: "Light Load", range: "$180–$240", note: "Mattress + dresser, small room corner, or 10–15 bags", hi: true },
    { label: "Medium Load", range: "$240–$320", note: "Room cleanout, 15–25 bags, or multiple furniture pieces", hi: false },
    { label: "Large Load", range: "$400–$550", note: "Garage cleanout or several large items", hi: false },
    { label: "Full Cleanout", range: "$600–$1,000+", note: "Whole unit, house, or heavy multi-load job", hi: false },
  ];
  const included = [
    "Two-person licensed crew",
    "All labor and heavy lifting",
    "Loading and hauling to disposal",
    "Licensed Bay Area disposal facility",
    "Furniture donated or recycled when possible",
    "No hidden fees — price confirmed before we start",
  ];
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-14 max-w-xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: "#22764a" }}>Transparent Pricing</p>
          <h2 className="mb-4 font-bold" style={{ color: "#0a1f14", fontSize: "clamp(1.9rem,3.2vw,2.6rem)", letterSpacing: "-0.025em", lineHeight: 1.12 }}>
            Upfront ranges.<br />Price locked before we touch anything.
          </h2>
          <p className="leading-relaxed text-gray-500">
            Typical Bay Area ranges based on load size. Your final price accounts for item type, property, stairs, and carry distance — all calculated instantly when you book.
          </p>
        </div>
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tiers.map(({ label, range, note, hi }) => (
            <div key={label} className="relative rounded-2xl border p-6 pt-8 transition-all"
              style={hi
                ? { background: "#0f2d1f", borderColor: "rgba(106,191,142,0.15)", boxShadow: "0 20px 40px rgba(10,31,20,0.18)" }
                : { background: "white", borderColor: "#e5e7eb", boxShadow: "0 4px 16px rgba(0,0,0,0.04)" }}>
              {hi && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-bold" style={{ background: "#22764a", color: "white" }}>
                  Most common
                </span>
              )}
              <p className="mb-2 text-xs font-bold uppercase tracking-widest" style={{ color: hi ? "rgba(163,217,184,0.55)" : "#9ca3af" }}>{label}</p>
              <p className="mb-3 text-xl font-black whitespace-nowrap" style={{ color: hi ? "#b8e8ce" : "#0a1f14", letterSpacing: "-0.02em" }}>{range}</p>
              <p className="text-xs leading-relaxed" style={{ color: hi ? "rgba(255,255,255,0.72)" : "#9ca3af" }}>{note}</p>
            </div>
          ))}
        </div>
        <div className="rounded-[28px] border border-gray-100 bg-[#fafafa] p-7 card-shadow">
          <p className="mb-5 text-sm font-bold" style={{ color: "#0a1f14" }}>Included in every job</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {included.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full" style={{ background: "#edfaf3", color: "#22764a" }}>
                  <Check />
                </div>
                <p className="text-sm text-gray-600">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BulkFAQ() {
  const items = [
    {
      q: "How is the final price set?",
      a: "Your booking form calculates it instantly based on load size, item type, property type, stairs, and carry distance. That number is confirmed before the crew touches anything — it doesn't change unless the actual load is different from what was described.",
    },
    {
      q: "Do I need to be present?",
      a: "Yes, someone should be available to point the crew to the items and confirm the load. For property managers handling a tenant cleanout, a site contact works fine.",
    },
    {
      q: "How fast can you come?",
      a: "Same-day and next-day pickups are available most days. Book before noon for same-day availability. Availability varies — the booking form shows current open windows.",
    },
    {
      q: "What happens to the items after pickup?",
      a: "Everything goes to a licensed Bay Area disposal facility. Furniture and appliances in usable condition are donated or sent for recycling. We handle the sorting — you don't need to separate anything.",
    },
    {
      q: "What if there's more than I described?",
      a: "Your crew will do a quick load check before starting. If the volume is larger, they'll show you an updated price before proceeding. You always approve before any work begins.",
    },
    {
      q: "Do you service all Bay Area cities?",
      a: "We cover San Francisco, Oakland, San Jose, Fremont, Palo Alto, Berkeley, and surrounding areas. Enter your address in the booking form to confirm coverage for your location.",
    },
  ];
  return (
    <section className="py-24" style={{ background: "#fafafa" }}>
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12 max-w-xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: "#22764a" }}>FAQ</p>
          <h2 className="mb-4 font-bold" style={{ color: "#0a1f14", fontSize: "clamp(1.9rem,3.2vw,2.6rem)", letterSpacing: "-0.025em", lineHeight: 1.12 }}>
            Common questions<br />about bulk pickup.
          </h2>
        </div>
        <div className="mb-10 grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <div key={item.q} className="rounded-2xl border border-gray-100 bg-white p-6 card-shadow">
              <p className="mb-2 text-sm font-bold" style={{ color: "#0a1f14" }}>{item.q}</p>
              <p className="text-sm leading-relaxed text-gray-500">{item.a}</p>
            </div>
          ))}
        </div>
        <div className="rounded-[28px] p-8 text-center" style={{ background: "#0f2d1f" }}>
          <p className="mb-2 text-lg font-bold text-white">Still have questions?</p>
          <p className="mb-6 text-sm" style={{ color: "rgba(163,217,184,0.7)" }}>Call or text us — we answer fast and can usually give you a ballpark on the spot.</p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="tel:+17132822588" className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:opacity-90" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.12)" }}>
              (713) 282 2588
            </a>
            <Link href="/booking" className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:opacity-90" style={{ background: "linear-gradient(135deg,#22764a,#3a9d66)" }}>
              Book a Pickup <Arrow className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function BookingPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const initialName = params.name ?? "";
  const initialPhone = params.phone ?? "";

  return (
    <main>
      <Navbar primaryHref="/booking" primaryLabel="Book Pickup" mode="home" />
      <BookingExperience initialName={initialName} initialPhone={initialPhone} />
      <HowItWorks />
      <WhatWeHaul />
      <BulkPricing />
      <BulkFAQ />
      <Footer />
    </main>
  );
}
