"use client";

import { useState, useRef, Fragment } from "react";
import { Arrow, Check } from "../site-shared";

export default function ValetFormSection({ initialName = "", initialPhone = "" }: { initialName?: string; initialPhone?: string }) {
  const [step, setStep] = useState(0);
  const [userType, setUserType] = useState<"resident" | "property" | "">("");
  const [services, setServices] = useState<string[]>([]);
  const [form, setForm] = useState({
    propertyName: "", unit: "", address: "", city: "", zip: "",
    propertyType: "", units: "", frequency: "", timeline: "",
    name: initialName,
    phone: initialPhone,
    email: "", notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
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

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "valet",
          userType,
          name: form.name,
          phone: form.phone,
          email: form.email,
          propertyName: form.propertyName,
          address: form.address,
          city: form.city,
          zip: form.zip,
          propertyType: form.propertyType,
          units: form.units,
          frequency: form.frequency,
          timeline: form.timeline,
          notes: form.notes,
          services,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong. Please call us at (713) 282-2588.");
    } finally {
      setSubmitting(false);
    }
  };

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

          {/* Left: form content */}
          <div>
            {renderStep()}

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
                    <div className="flex flex-1 flex-col gap-2">
                      {submitError && (
                        <p className="text-xs" style={{ color: "#f87171" }}>{submitError}</p>
                      )}
                      <button
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                        style={{ background: "linear-gradient(135deg,#22764a,#3a9d66)" }}
                      >
                        {submitting ? "Submitting…" : isManager ? "Request Proposal" : "Submit Request"} {!submitting && <Arrow />}
                      </button>
                    </div>
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
