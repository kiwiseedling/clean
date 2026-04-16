"use client";

import Link from "next/link";
import { useState, useRef, Fragment } from "react";
import { useSearchParams } from "next/navigation";
import { Arrow, Check, Footer, Navbar } from "../site-shared";

function ValetHeroIntro() {
  return (
    <section className="relative overflow-hidden pt-16" style={{ background: "#0a1f14" }}>
      <div className="pointer-events-none absolute inset-0 select-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #6abf8e 1px, transparent 0)", backgroundSize: "32px 32px" }} />

        {/* Apartment trash valet scene — building facade with doorstep bags + valet worker */}
        <svg className="absolute right-0 top-1/2 -translate-y-1/2 h-full w-[62%] opacity-[0.26]" viewBox="0 0 520 220" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          {/* Building body */}
          <rect x="50" y="8" width="400" height="196" fill="rgba(34,118,74,0.52)" rx="4"/>
          {/* Roof parapet */}
          <rect x="44" y="4" width="412" height="10" fill="rgba(34,118,74,0.72)" rx="3"/>

          {/* Floor dividers — 4 floors */}
          {[56, 104, 152].map((y) => (
            <rect key={y} x="50" y={y} width="400" height="2" fill="rgba(0,0,0,0.22)"/>
          ))}

          {/* ── Floor 1 (top) y=8–56 ── */}
          <rect x="76"  y="16" width="24" height="36" fill="rgba(10,35,22,0.8)" rx="2"/>
          <circle cx="95" cy="34" r="2.5" fill="rgba(106,191,142,0.55)"/>
          <rect x="108" y="16" width="38" height="28" fill="rgba(106,191,142,0.13)" rx="2"/>
          <line x1="127" y1="16" x2="127" y2="44" stroke="rgba(106,191,142,0.2)" strokeWidth="1"/>
          <rect x="290" y="16" width="38" height="28" fill="rgba(106,191,142,0.13)" rx="2"/>
          <line x1="309" y1="16" x2="309" y2="44" stroke="rgba(106,191,142,0.2)" strokeWidth="1"/>
          <rect x="336" y="16" width="24" height="36" fill="rgba(10,35,22,0.8)" rx="2"/>
          <circle cx="344" cy="34" r="2.5" fill="rgba(106,191,142,0.55)"/>
          {/* Bags floor 1 */}
          <ellipse cx="72"  cy="51" rx="8" ry="6" fill="rgba(106,191,142,0.42)"/>
          <rect    x="67"  y="45" width="10" height="4" fill="rgba(106,191,142,0.32)" rx="1"/>
          <ellipse cx="363" cy="51" rx="8" ry="6" fill="rgba(106,191,142,0.42)"/>
          <rect    x="358" y="45" width="10" height="4" fill="rgba(106,191,142,0.32)" rx="1"/>

          {/* ── Floor 2 y=56–104 ── */}
          <rect x="76"  y="64" width="24" height="36" fill="rgba(10,35,22,0.8)" rx="2"/>
          <circle cx="95" cy="82" r="2.5" fill="rgba(106,191,142,0.55)"/>
          <rect x="108" y="64" width="38" height="28" fill="rgba(106,191,142,0.15)" rx="2"/>
          <line x1="127" y1="64" x2="127" y2="92" stroke="rgba(106,191,142,0.2)" strokeWidth="1"/>
          <rect x="290" y="64" width="38" height="28" fill="rgba(106,191,142,0.15)" rx="2"/>
          <line x1="309" y1="64" x2="309" y2="92" stroke="rgba(106,191,142,0.2)" strokeWidth="1"/>
          <rect x="336" y="64" width="24" height="36" fill="rgba(10,35,22,0.8)" rx="2"/>
          <circle cx="344" cy="82" r="2.5" fill="rgba(106,191,142,0.55)"/>
          {/* Bags floor 2 */}
          <ellipse cx="72"  cy="99" rx="8" ry="6" fill="rgba(106,191,142,0.42)"/>
          <rect    x="67"  y="93" width="10" height="4" fill="rgba(106,191,142,0.32)" rx="1"/>
          <ellipse cx="363" cy="99" rx="8" ry="6" fill="rgba(106,191,142,0.42)"/>
          <rect    x="358" y="93" width="10" height="4" fill="rgba(106,191,142,0.32)" rx="1"/>

          {/* ── Floor 3 y=104–152 — VALET collecting ── */}
          <rect x="76"  y="112" width="24" height="36" fill="rgba(10,35,22,0.8)" rx="2"/>
          <circle cx="95" cy="130" r="2.5" fill="rgba(106,191,142,0.55)"/>
          <rect x="108" y="112" width="38" height="28" fill="rgba(106,191,142,0.17)" rx="2"/>
          <line x1="127" y1="112" x2="127" y2="140" stroke="rgba(106,191,142,0.2)" strokeWidth="1"/>
          <rect x="290" y="112" width="38" height="28" fill="rgba(106,191,142,0.17)" rx="2"/>
          <line x1="309" y1="112" x2="309" y2="140" stroke="rgba(106,191,142,0.2)" strokeWidth="1"/>
          <rect x="336" y="112" width="24" height="36" fill="rgba(10,35,22,0.8)" rx="2"/>
          <circle cx="344" cy="130" r="2.5" fill="rgba(106,191,142,0.55)"/>
          {/* Bag right side waiting */}
          <ellipse cx="363" cy="147" rx="8" ry="6" fill="rgba(106,191,142,0.42)"/>
          <rect    x="358" y="141" width="10" height="4" fill="rgba(106,191,142,0.32)" rx="1"/>
          {/* Valet worker (center corridor, bending to pick up bag) */}
          <ellipse cx="215" cy="117" rx="7" ry="7" fill="rgba(106,191,142,0.5)"/>
          <rect    x="210" y="124" width="10" height="14" fill="rgba(106,191,142,0.42)" rx="3"/>
          <rect    x="200" y="126" width="10" height="3"  fill="rgba(106,191,142,0.34)" rx="1"/>
          <rect    x="220" y="129" width="10" height="3"  fill="rgba(106,191,142,0.34)" rx="1"/>
          <rect    x="210" y="137" width="4"  height="10" fill="rgba(106,191,142,0.36)" rx="1"/>
          <rect    x="216" y="137" width="4"  height="10" fill="rgba(106,191,142,0.36)" rx="1"/>
          {/* Bag being picked up */}
          <ellipse cx="200" cy="146" rx="8" ry="6" fill="rgba(106,191,142,0.55)"/>
          <rect    x="195" y="140" width="10" height="4" fill="rgba(106,191,142,0.44)" rx="1"/>

          {/* ── Floor 4 (ground) y=152–204 ── */}
          <rect x="76"  y="160" width="24" height="38" fill="rgba(10,35,22,0.8)" rx="2"/>
          <circle cx="95" cy="179" r="2.5" fill="rgba(106,191,142,0.55)"/>
          <rect x="108" y="160" width="38" height="28" fill="rgba(106,191,142,0.12)" rx="2"/>
          <line x1="127" y1="160" x2="127" y2="188" stroke="rgba(106,191,142,0.2)" strokeWidth="1"/>
          <rect x="290" y="160" width="38" height="28" fill="rgba(106,191,142,0.12)" rx="2"/>
          <line x1="309" y1="160" x2="309" y2="188" stroke="rgba(106,191,142,0.2)" strokeWidth="1"/>
          <rect x="336" y="160" width="24" height="38" fill="rgba(10,35,22,0.8)" rx="2"/>
          <circle cx="344" cy="179" r="2.5" fill="rgba(106,191,142,0.55)"/>
          {/* Bags ground floor */}
          <ellipse cx="72"  cy="197" rx="8" ry="6" fill="rgba(106,191,142,0.42)"/>
          <rect    x="67"  y="191" width="10" height="4" fill="rgba(106,191,142,0.32)" rx="1"/>
          <ellipse cx="363" cy="197" rx="8" ry="6" fill="rgba(106,191,142,0.42)"/>
          <rect    x="358" y="191" width="10" height="4" fill="rgba(106,191,142,0.32)" rx="1"/>
          {/* Collection cart center-ground */}
          <rect    x="192" y="180" width="56" height="16" fill="rgba(34,118,74,0.7)"  rx="3"/>
          <rect    x="190" y="175" width="60" height="8"  fill="rgba(34,118,74,0.82)" rx="2"/>
          <circle  cx="204" cy="198" r="5"              fill="rgba(8,24,16,0.95)"/>
          <circle  cx="236" cy="198" r="5"              fill="rgba(8,24,16,0.95)"/>
          <ellipse cx="206" cy="178" rx="7" ry="5" fill="rgba(106,191,142,0.6)"/>
          <ellipse cx="220" cy="176" rx="7" ry="6" fill="rgba(106,191,142,0.65)"/>
          <ellipse cx="234" cy="178" rx="7" ry="5" fill="rgba(106,191,142,0.58)"/>

          {/* Ground */}
          <rect x="20" y="202" width="480" height="18" fill="rgba(6,18,12,0.97)"/>
          <rect x="20" y="200" width="480" height="4"  fill="rgba(34,118,74,0.3)"/>
        </svg>

        {/* Left fade */}
        <div className="absolute inset-y-0 left-0 w-3/4" style={{ background: "linear-gradient(to right, rgba(10,31,20,0.98) 0%, rgba(10,31,20,0.82) 55%, transparent 100%)" }} />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-24">
        <h1 className="mb-4 font-black text-white"
          style={{ fontSize: "clamp(2.4rem,4.8vw,4rem)", lineHeight: 1.06, letterSpacing: "-0.04em" }}>
          Trash valet that serves<br />
          <span style={{ color: "#6abf8e" }}>residents and communities.</span>
        </h1>

        <p className="max-w-lg text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.58)" }}>
          Doorstep pickup, property manager visibility, and SB-1383 support for multifamily communities.
        </p>
      </div>
    </section>
  );
}

function ValetFormSection() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(0);
  const [userType, setUserType] = useState<"resident" | "property" | "">("");
  const [services, setServices] = useState<string[]>([]);
  const [form, setForm] = useState({
    propertyName: "", unit: "", address: "", city: "", zip: "",
    propertyType: "", units: "", frequency: "", timeline: "",
    name: searchParams.get("name") ?? "",
    phone: searchParams.get("phone") ?? "",
    email: "", notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [addressSuggestions, setAddressSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isManager = userType === "property";

  const handleAddressInput = (query: string) => {
    setForm((f) => ({ ...f, address: query }));
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (query.trim().length < 4) { setAddressSuggestions([]); setShowSuggestions(false); return; }
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5&countrycodes=us&addressdetails=1`,
          { headers: { "Accept-Language": "en-US,en" } }
        );
        const data: { display_name: string }[] = await res.json();
        const results = data.map((r) => r.display_name);
        setAddressSuggestions(results);
        setShowSuggestions(results.length > 0);
      } catch { setAddressSuggestions([]); }
    }, 380);
  };

  const toggleService = (s: string) =>
    setServices((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const whoOptions = [
    { id: "resident", label: "Resident", desc: "I live in an apartment or community" },
    { id: "manager", label: "Property Manager", desc: "I manage a multifamily property" },
    { id: "community", label: "Apartment Community", desc: "Setting up service for residents" },
    { id: "student", label: "Student Housing", desc: "University or student community" },
    { id: "condo", label: "Condo / HOA", desc: "Condo association or HOA" },
  ];

  const residentServices = [
    "Doorstep trash pickup",
    "Recycling pickup",
    "Bulk item pickup",
    "Move-out junk removal",
  ];

  const managerServices = [
    "Doorstep trash collection",
    "Recycling pickup",
    "Bulk waste pickup",
    "Turnover / vacancy cleanouts",
    "Overflow trash support",
    "Site reset / property cleanup",
  ];

  const serviceOptions = isManager ? managerServices : residentServices;
  const inputCls = "w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-gray-200 placeholder:text-gray-500 outline-none transition-colors focus:border-green-600";

  const renderStep = () => {
    if (submitted) {
      return (
        <div className="py-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full"
            style={{ background: "rgba(34,118,74,0.3)", border: "2px solid rgba(106,191,142,0.5)" }}>
            <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="#6abf8e" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <p className="mb-1 text-lg font-bold text-white">Request submitted!</p>
          <p className="mb-5 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            We'll follow up {form.phone ? "by phone" : "by email"} within one business day.
          </p>
          <div className="space-y-2 rounded-xl p-4 text-left text-sm" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            {form.propertyName && <div className="flex justify-between gap-4"><span style={{ color: "rgba(255,255,255,0.35)" }}>Property</span><span className="font-medium text-white">{form.propertyName}</span></div>}
            {form.address && <div className="flex justify-between gap-4"><span className="flex-shrink-0" style={{ color: "rgba(255,255,255,0.35)" }}>Address</span><span className="text-right font-medium text-white">{form.address}</span></div>}
            {services.length > 0 && <div className="flex justify-between gap-4"><span className="flex-shrink-0" style={{ color: "rgba(255,255,255,0.35)" }}>Services</span><span className="text-right font-medium text-white">{services.join(", ")}</span></div>}
            {form.name && <div className="flex justify-between gap-4"><span style={{ color: "rgba(255,255,255,0.35)" }}>Contact</span><span className="font-medium text-white">{form.name}</span></div>}
          </div>
        </div>
      );
    }

    switch (step) {
      case 0:
        return (
          <div>
            <p className="mb-1 text-lg font-bold text-white">Who is this service for?</p>
            <p className="mb-4 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>We'll tailor the form to your situation.</p>
            <div className="space-y-2">
              {whoOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setUserType(opt.id === "resident" ? "resident" : "property");
                    next();
                  }}
                  className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition-all"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(34,118,74,0.15)"; e.currentTarget.style.borderColor = "rgba(106,191,142,0.3)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
                >
                  <div>
                    <p className="text-sm font-semibold text-white">{opt.label}</p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{opt.desc}</p>
                  </div>
                  <Arrow className="w-4 h-4 flex-shrink-0" style={{ color: "rgba(255,255,255,0.3)" }} />
                </button>
              ))}
            </div>
          </div>
        );

      case 1:
        return (
          <div>
            <p className="mb-1 text-lg font-bold text-white">{isManager ? "Property basics" : "Your community"}</p>
            <p className="mb-4 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>{isManager ? "Tell us about the property." : "Where do you live?"}</p>
            <div className="space-y-3">
              <input type="text" placeholder={isManager ? "Property name" : "Apartment / community name"} value={form.propertyName} onChange={(e) => setForm((f) => ({ ...f, propertyName: e.target.value }))} className={inputCls} />
              {!isManager && <input type="text" placeholder="Unit number" value={form.unit} onChange={(e) => setForm((f) => ({ ...f, unit: e.target.value }))} className={inputCls} />}
              <div className="relative">
                <input type="text" placeholder="Address" value={form.address} onChange={(e) => handleAddressInput(e.target.value)} onBlur={() => setTimeout(() => setShowSuggestions(false), 150)} className={inputCls} />
                {showSuggestions && addressSuggestions.length > 0 && (
                  <div className="absolute left-0 right-0 top-full z-10 mt-1 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                    {addressSuggestions.map((s) => (
                      <button key={s} onMouseDown={() => { setForm((f) => ({ ...f, address: s })); setShowSuggestions(false); }} className="block w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50">
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input type="text" placeholder="City" value={form.city} onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))} className={inputCls} />
                <input type="text" placeholder="ZIP code" value={form.zip} onChange={(e) => setForm((f) => ({ ...f, zip: e.target.value }))} className={inputCls} />
              </div>
              {isManager && (
                <>
                  <select value={form.propertyType} onChange={(e) => setForm((f) => ({ ...f, propertyType: e.target.value }))} className={inputCls} style={{ color: form.propertyType ? "rgba(209,236,221,0.9)" : "rgba(255,255,255,0.35)" }}>
                    <option value="" disabled style={{ color: "#0a1f14" }}>Property type</option>
                    <option value="multifamily" style={{ color: "#0a1f14" }}>Multifamily</option>
                    <option value="student" style={{ color: "#0a1f14" }}>Student housing</option>
                    <option value="condo" style={{ color: "#0a1f14" }}>Condo / HOA</option>
                    <option value="mixed" style={{ color: "#0a1f14" }}>Mixed-use</option>
                  </select>
                  <input type="text" placeholder="Number of units on site" value={form.units} onChange={(e) => setForm((f) => ({ ...f, units: e.target.value }))} className={inputCls} />
                </>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <p className="mb-1 text-lg font-bold text-white">What are you looking for?</p>
            <p className="mb-4 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Select all that apply.</p>
            <div className="space-y-2">
              {serviceOptions.map((s) => {
                const active = services.includes(s);
                return (
                  <button
                    key={s}
                    onClick={() => toggleService(s)}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all"
                    style={{
                      background: active ? "rgba(34,118,74,0.25)" : "rgba(255,255,255,0.04)",
                      border: active ? "1px solid rgba(106,191,142,0.5)" : "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded"
                      style={{ background: active ? "#22764a" : "transparent", border: active ? "none" : "1.5px solid rgba(255,255,255,0.2)" }}>
                      {active && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className="text-sm font-medium text-white">{s}</span>
                  </button>
                );
              })}
            </div>
            {isManager && (
              <select value={form.frequency} onChange={(e) => setForm((f) => ({ ...f, frequency: e.target.value }))} className={`${inputCls} mt-3`} style={{ color: form.frequency ? "rgba(209,236,221,0.9)" : "rgba(255,255,255,0.35)" }}>
                <option value="" disabled style={{ color: "#0a1f14" }}>Service frequency</option>
                <option value="5nights" style={{ color: "#0a1f14" }}>5 nights / week</option>
                <option value="7nights" style={{ color: "#0a1f14" }}>7 nights / week</option>
                <option value="custom" style={{ color: "#0a1f14" }}>Custom schedule</option>
              </select>
            )}
          </div>
        );

      case 3:
        return (
          <div>
            <p className="mb-1 text-lg font-bold text-white">Your contact info</p>
            <p className="mb-4 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>We'll reach out to confirm details.</p>
            <div className="space-y-3">
              <input type="text" placeholder="Full name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className={inputCls} />
              <input type="tel" placeholder="Phone number" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} className={inputCls} />
              <input type="email" placeholder="Email address" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className={inputCls} />
              {isManager && (
                <select value={form.timeline} onChange={(e) => setForm((f) => ({ ...f, timeline: e.target.value }))} className={inputCls} style={{ color: form.timeline ? "rgba(209,236,221,0.9)" : "rgba(255,255,255,0.35)" }}>
                  <option value="" disabled style={{ color: "#0a1f14" }}>When would you like to start?</option>
                  <option value="asap" style={{ color: "#0a1f14" }}>As soon as possible</option>
                  <option value="30days" style={{ color: "#0a1f14" }}>Within 30 days</option>
                  <option value="1-3months" style={{ color: "#0a1f14" }}>1–3 months</option>
                  <option value="researching" style={{ color: "#0a1f14" }}>Just researching</option>
                </select>
              )}
              <textarea placeholder="Any notes or questions? (optional)" value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} className={`${inputCls} resize-none`} rows={2} />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const stepLabels = ["Who", "Property", "Services", "Contact"];
  const accent = "#6abf8e";
  const accentDim = "rgba(163,217,184,0.65)";
  const glass: React.CSSProperties = {
    background: "rgba(22,24,26,0.82)",
    border: "1px solid rgba(255,255,255,0.08)",
    backdropFilter: "blur(20px)",
    borderRadius: "20px",
    padding: "28px",
  };

  // Live pricing estimate
  const unitCount = parseInt(form.units) || 0;
  const baseRate = unitCount === 0 ? 15 : unitCount < 100 ? 18 : unitCount < 300 ? 15 : 13;
  const freqMultiplier = form.frequency === "7nights" ? 1.13 : 1.0;
  const ratePerUnit = Math.round(baseRate * freqMultiplier);
  const monthlyTotal = unitCount * ratePerUnit;
  const residentRevenue = unitCount * 30;
  const propertyMargin = residentRevenue - monthlyTotal;
  const sizeLabel = unitCount === 0 ? "" : unitCount < 100 ? "small property" : unitCount < 300 ? "mid-size property" : "large property";
  const freqLabel = form.frequency === "7nights" ? "7 nights/wk" : form.frequency === "5nights" ? "5 nights/wk" : "5 nights/wk";

  const PricingPanel = () => (
    <div style={glass}>
      <p className="mb-1 text-[10px] font-bold uppercase tracking-widest" style={{ color: accentDim }}>Live Estimate</p>
      <p className="mb-5 text-lg font-bold leading-snug text-white">Transparent pricing.<br />No callbacks needed.</p>

      {/* Main rate */}
      <div className="mb-4 rounded-xl p-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.35)" }}>
          {unitCount > 0 ? `${unitCount} units · ${freqLabel}` : "Estimated rate"}
        </p>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-black text-white transition-all duration-300" style={{ letterSpacing: "-0.04em" }}>
            ${ratePerUnit}
          </span>
          <span className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>/unit/mo</span>
        </div>
        {unitCount > 0 && (
          <p className="mt-1 text-sm font-semibold" style={{ color: accent }}>
            ${monthlyTotal.toLocaleString()} / month total
          </p>
        )}
      </div>

      {/* Breakdown or rate tiers */}
      {unitCount > 0 ? (
        <div className="space-y-2.5">
          <div className="flex justify-between text-sm">
            <span style={{ color: "rgba(255,255,255,0.4)" }}>Your monthly cost</span>
            <span className="font-semibold text-white">${monthlyTotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span style={{ color: "rgba(255,255,255,0.4)" }}>Resident billing est.</span>
            <span className="font-semibold text-white">${residentRevenue.toLocaleString()}</span>
          </div>
          <div className="flex justify-between border-t pt-2.5 text-sm" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            <span style={{ color: accentDim }}>Property margin est.</span>
            <span className="font-bold" style={{ color: accent }}>${propertyMargin.toLocaleString()}/mo</span>
          </div>
          <p className="pt-1 text-[10px] leading-relaxed" style={{ color: "rgba(255,255,255,0.22)" }}>
            {sizeLabel} rate · resident billing assumed at $30/unit avg · final pricing confirmed in proposal
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>Rate by property size</p>
          {[
            { size: "Under 100 units", rate: "$18" },
            { size: "100–300 units", rate: "$15" },
            { size: "300+ units", rate: "$13" },
          ].map(({ size, rate }) => (
            <div key={size} className="flex justify-between rounded-lg px-3 py-2 text-sm" style={{ background: "rgba(255,255,255,0.03)" }}>
              <span style={{ color: "rgba(255,255,255,0.45)" }}>{size}</span>
              <span className="font-bold text-white">{rate}/unit/mo</span>
            </div>
          ))}
          <p className="pt-1 text-[10px] leading-relaxed" style={{ color: "rgba(255,255,255,0.22)" }}>
            Enter unit count above to see your live estimate
          </p>
        </div>
      )}
    </div>
  );

  const renderRightPanel = () => {
    if (submitted) {
      return (
        <div style={glass}>
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full"
            style={{ background: "rgba(34,118,74,0.3)", border: "2px solid rgba(106,191,142,0.5)" }}>
            <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <p className="mb-2 text-center text-[10px] font-bold uppercase tracking-widest" style={{ color: accentDim }}>Submitted</p>
          <p className="mb-6 text-center text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            We'll follow up {form.phone ? "by phone" : "by email"} within one business day.
          </p>
          <div className="space-y-2.5">
            {["Service tailored to your setup", "No commitment until you approve", "Instant confirmation on next steps"].map((t) => (
              <div key={t} className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: accent }} />
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{t}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Property manager steps 1–4: show live pricing panel
    if (isManager && step >= 1) return <PricingPanel />;

    switch (step) {
      case 0:
        return (
          <div style={{ ...glass, marginTop: "80px" }}>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-widest" style={{ color: accentDim }}>Who We Serve</p>
            <p className="mb-5 text-lg font-bold leading-snug text-white">Residents, managers,<br />and communities.</p>
            <div className="space-y-2.5">
              {[
                "Doorstep pickup — no dumpster trips",
                "Nightly or every-other-day routes",
                "Property manager visibility",
                "SB-1383 compliance support",
              ].map((t) => (
                <div key={t} className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: accent }} />
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{t}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 1:
        return (
          <div style={glass}>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-widest" style={{ color: accentDim }}>Coverage Area</p>
            <p className="mb-5 text-lg font-bold leading-snug text-white">Bay Area wide.<br />Multifamily specialists.</p>
            <div className="space-y-2.5">
              {[
                "Unit-level doorstep pickup",
                "Flexible schedule — 3 to 7 nights/week",
                "Bulk and overflow support available",
              ].map((t) => (
                <div key={t} className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: accent }} />
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{t}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div style={glass}>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-widest" style={{ color: accentDim }}>Service Options</p>
            <p className="mb-5 text-lg font-bold leading-snug text-white">Flat monthly rate<br />per unit.</p>
            <div className="space-y-2.5">
              {["Recycling and organics pickup", "Bulk item removal available", "No long-term contracts"].map((t) => (
                <div key={t} className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: accent }} />
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{t}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div style={glass}>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-widest" style={{ color: accentDim }}>What Happens Next</p>
            <p className="mb-5 text-lg font-bold leading-snug text-white">We'll reach out<br />within one business day.</p>
            <div className="space-y-2.5">
              {["Review your setup", "Confirm schedule", "Send pricing"].map((t) => (
                <div key={t} className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: accent }} />
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{t}</p>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Fragment>
      {/* ── Form section ── */}
      <div style={{ background: "#071912" }}>

        {/* Sticky step indicator */}
        <div className="sticky top-16 z-40" style={{ background: "#071912", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="mx-auto max-w-6xl px-6 py-4">
            <div className="flex items-center">
              {stepLabels.map((label, i) => (
                <Fragment key={label}>
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300"
                      style={
                        submitted
                          ? { background: "rgba(34,118,74,0.3)", border: "2px solid rgba(106,191,142,0.5)", color: accent }
                          : i < step
                          ? { background: "rgba(34,118,74,0.3)", border: "2px solid rgba(106,191,142,0.5)", color: accent }
                          : i === step
                          ? { background: "#22764a", border: "2px solid #6abf8e", color: "#fff" }
                          : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.3)" }
                      }
                    >
                      {(submitted || i < step) ? (
                        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        i + 1
                      )}
                    </div>
                    <span
                      className="hidden text-[10px] font-semibold sm:block"
                      style={{ color: i === step && !submitted ? accent : "rgba(255,255,255,0.3)" }}
                    >
                      {label}
                    </span>
                  </div>
                  {i < stepLabels.length - 1 && (
                    <div
                      className="mx-1 h-px flex-1 transition-all duration-500 sm:mx-2"
                      style={{ background: i < step || submitted ? "rgba(106,191,142,0.4)" : "rgba(255,255,255,0.08)" }}
                    />
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Main grid */}
        <div className="mx-auto grid max-w-6xl gap-10 px-6 pt-10 pb-20 lg:grid-cols-[1fr_380px] lg:items-start">

          {/* Left: form content on dark bg */}
          <div>
            {renderStep()}

            {/* Navigation */}
            {!submitted && (
              <div className="mt-6">
                {step === 0 ? (
                  <p className="text-center text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>No commitment · Usually responds same day</p>
                ) : step < 3 ? (
                  <div className="flex justify-between gap-3">
                    <button
                      onClick={back}
                      className="rounded-xl px-5 py-3 text-sm font-semibold transition-colors"
                      style={{ border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.6)", background: "transparent" }}
                    >
                      Back
                    </button>
                    <button
                      onClick={next}
                      className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all hover:opacity-90"
                      style={{ background: "linear-gradient(135deg,#22764a,#3a9d66)" }}
                    >
                      Continue <Arrow />
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between gap-3">
                    <button
                      onClick={back}
                      className="rounded-xl px-5 py-3 text-sm font-semibold transition-colors"
                      style={{ border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.6)", background: "transparent" }}
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setSubmitted(true)}
                      className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all hover:opacity-90"
                      style={{ background: "linear-gradient(135deg,#22764a,#3a9d66)" }}
                    >
                      {isManager ? "Request Proposal" : "Submit Request"} <Arrow />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right: glass panel */}
          <div className="lg:sticky lg:top-32">
            {renderRightPanel()}
          </div>
        </div>
      </div>
    </Fragment>
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
            className="min-w-fit rounded-full border px-4 py-2 text-sm font-semibold transition-all hover:bg-[#f0f7f3]"
            style={{ borderColor: "#d1d5db", color: "#0f2d1f", background: "white" }}
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
          <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: "#22764a" }}>Resident Doorstep Valet</p>
          <h2 className="mb-4 font-bold" style={{ color: "#0a1f14", fontSize: "clamp(1.9rem,3.2vw,2.6rem)", letterSpacing: "-0.025em", lineHeight: 1.12 }}>
            A resident amenity that makes
            <br />
            doorstep collection feel premium.
          </h2>
          <p className="leading-relaxed text-gray-500">
            Residents stage tied bags during the scheduled window, BinButler teams collect door-to-door, and the community gets cleaner corridors with less friction around everyday trash disposal.
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
                <div className="mb-3 flex h-5 w-5 items-center justify-center rounded-full" style={{ background: "#edfaf3", color: "#22764a" }}>
                  <Check />
                </div>
                <p className="text-sm leading-relaxed text-gray-600">{item}</p>
              </div>
            ))}
          </div>

          <div className="rounded-[28px] border border-gray-100 bg-[#0f2d1f] p-7 text-white card-shadow-lg">
            <p className="mb-2 text-sm font-bold uppercase tracking-widest" style={{ color: "rgba(163,217,184,0.72)" }}>
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
    <section id="property-managers" className="py-24" style={{ background: "#0f2d1f" }}>
      <div className="mx-auto max-w-5xl px-5">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(163,217,184,0.65)" }}>Property Manager</p>
            <h2 className="mb-4 font-bold text-white" style={{ fontSize: "clamp(1.9rem,3.2vw,2.6rem)", letterSpacing: "-0.025em", lineHeight: 1.12 }}>
              Request a proposal for your property.
            </h2>
            <p className="mb-10 leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
              Tell us about your community and we'll build a service plan that fits your operations, budget, and compliance needs.
            </p>
            <div className="space-y-4">
              {bullets.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: "#6abf8e" }} />
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map(({ label, value, note }) => (
              <div key={label} className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(163,217,184,0.65)" }}>{label}</p>
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
          <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: "#22764a" }}>SB-1383 Support</p>
          <h2 className="mb-4 font-bold" style={{ color: "#0a1f14", fontSize: "clamp(1.9rem,3.2vw,2.6rem)", letterSpacing: "-0.025em", lineHeight: 1.12 }}>
            Organics and compliance support
            <br />
            for California multifamily properties.
          </h2>
          <p className="leading-relaxed text-gray-500">
            For California communities, we can position BinButler as an implementation partner that helps onsite teams manage resident education, collection setup, contamination reduction, and everyday program follow-through around SB-1383.
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
              <div className="mb-3 flex h-5 w-5 items-center justify-center rounded-full" style={{ background: "#edfaf3", color: "#22764a" }}>
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
          <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: "#22764a" }}>Transparent Pricing</p>
          <h2 className="mb-4 font-bold" style={{ color: "#0a1f14", fontSize: "clamp(1.9rem,3.2vw,2.6rem)", letterSpacing: "-0.025em", lineHeight: 1.12 }}>
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
                  ? { background: "#0f2d1f", borderColor: "rgba(106,191,142,0.25)", boxShadow: "0 20px 60px rgba(10,31,20,0.25)" }
                  : { background: "white", borderColor: "#e5e7eb", boxShadow: "0 4px 16px rgba(0,0,0,0.04)" }
              }
            >
              {hi && (
                <div className="absolute -top-3 left-0 right-0 flex justify-center">
                  <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ background: "#22764a", color: "#fff" }}>
                    Most requested
                  </span>
                </div>
              )}
              <p className="mb-2 text-sm font-semibold" style={{ color: hi ? "rgba(200,240,220,0.75)" : "#6b7280" }}>{name}</p>
              <p className="mb-1 text-4xl font-black" style={{ color: hi ? "#a3dab8" : "#0a1f14", letterSpacing: "-0.02em" }}>{price}</p>
              <p className="mb-6 text-xs" style={{ color: hi ? "rgba(163,217,184,0.5)" : "#9ca3af" }}>{note}</p>
              <ul className="space-y-2.5">
                {details.map((detail) => (
                  <li key={detail} className="flex items-center gap-2.5 text-sm" style={{ color: hi ? "rgba(255,255,255,0.88)" : "#4b5563" }}>
                    <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full" style={{ background: hi ? "rgba(106,191,142,0.18)" : "#edfaf3", color: hi ? "#6abf8e" : "#22764a" }}>
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
            <p className="mb-2 text-sm font-bold" style={{ color: "#0a1f14" }}>What is included</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Door-to-door bag pickup during the approved service window",
                "Transfer to the designated onsite disposal area",
                "Resident, manager, and compliance-oriented program positioning",
                "Monthly billing based on occupied doors and selected service layer",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl bg-white p-4">
                  <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full" style={{ background: "#edfaf3", color: "#22764a" }}>
                    <Check />
                  </div>
                  <p className="text-sm text-gray-600">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl p-7" style={{ background: "#0f2d1f" }}>
            <p className="mb-2 text-sm font-bold text-white">Need both services?</p>
            <p className="mb-5 text-sm leading-relaxed" style={{ color: "rgba(163,217,184,0.7)" }}>
              Trash valet works best when paired with BinButler bulk trash support for cleanouts, overflow, and move-out volume.
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
      a: "No. We position the program for residents, onsite teams, and ownership goals at the same time, so the page now speaks to convenience, operational visibility, and compliance support together.",
    },
    {
      q: "What does Connect mean on this page?",
      a: "It refers to the manager-facing side of the program: communication, route visibility, service coordination, and issue handling support for onsite teams.",
    },
    {
      q: "How does SB-1383 support fit in?",
      a: "For California multifamily properties, BinButler can support the collection setup, resident education, contamination reduction, and program follow-through tied to organics requirements.",
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
          <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: "#22764a" }}>FAQ</p>
          <h2 className="mb-4 font-bold" style={{ color: "#0a1f14", fontSize: "clamp(1.9rem,3.2vw,2.6rem)", letterSpacing: "-0.025em", lineHeight: 1.12 }}>
            The details property teams ask most.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <div key={item.q} className="rounded-2xl border border-gray-100 bg-white p-6 card-shadow">
              <p className="mb-2 text-sm font-bold" style={{ color: "#0a1f14" }}>{item.q}</p>
              <p className="text-sm leading-relaxed text-gray-500">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function TrashValetPage() {
  return (
    <main>
      <Navbar primaryHref="/booking" primaryLabel="Book Pickup" mode="home" />
      <ValetHeroIntro />
      <ValetFormSection />
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
