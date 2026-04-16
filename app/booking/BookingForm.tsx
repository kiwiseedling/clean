"use client";

import { useState, Fragment, useRef } from "react";
import { Arrow, Camera, Check } from "../site-shared";

const itemOptions = [
  { id: "couch", label: "Couch", modifier: 20, note: "Sofas, loveseats, sectionals" },
  { id: "mattress", label: "Mattress", modifier: 15, note: "Mattress or box spring" },
  { id: "boxes", label: "Boxes", modifier: 0, note: "Bagged trash, boxes, light clutter" },
  { id: "mixed", label: "Mixed junk", modifier: 30, note: "Mixed household or property junk" },
  { id: "custom", label: "Custom", modifier: 15, note: "Describe the load in your own words" },
] as const;

const loadOptions = [
  { id: "single", label: "Single Item", base: 100, range: "$100–$140", example: "1–2 items — chair, appliance, box spring, or a few bags" },
  { id: "small", label: "Small Load", base: 150, range: "$140–$180", example: "Couch + small items, or 5–10 bags" },
  { id: "light", label: "Light Load", base: 210, range: "$180–$240", example: "Mattress + dresser, small room corner, or 10–15 bags" },
  { id: "medium", label: "Medium Load", base: 280, range: "$240–$320", example: "Room cleanout, 15–25 bags, or multiple furniture pieces" },
  { id: "large", label: "Large Load", base: 450, range: "$400–$550", example: "Garage cleanout or several large items" },
  { id: "full", label: "Full Cleanout", base: 700, range: "$600–$1,000+", example: "Whole unit, house, or heavy multi-load job" },
] as const;

const propertyOptions = [
  { id: "house", label: "House", modifier: 0 },
  { id: "apartment", label: "Apartment", modifier: 15 },
] as const;

const distanceOptions = [
  { id: "close", label: "0–25 ft", modifier: 0 },
  { id: "mid", label: "25–75 ft", modifier: 20 },
  { id: "far", label: "75+ ft", modifier: 40 },
] as const;

const scheduleOptions = [
  { id: "same-day", label: "Same day" },
  { id: "next-day", label: "Next day" },
  { id: "tomorrow", label: "Tomorrow" },
] as const;

const timeWindows = [
  { id: "morning", label: "Morning", slot: "8-12" },
  { id: "afternoon", label: "Afternoon", slot: "12-4" },
  { id: "evening", label: "Evening", slot: "4-7" },
] as const;

const steps = [
  { id: "amount", label: "Amount", title: "How much is there?" },
  { id: "logistics", label: "Logistics", title: "Address + logistics" },
  { id: "schedule", label: "Schedule", title: "Pick a time window" },
  { id: "details", label: "Details", title: "Your details" },
  { id: "confirm", label: "Confirm", title: "Review and book" },
] as const;

type StepId = (typeof steps)[number]["id"];

function formatMoney(value: number) {
  return `$${value}`;
}

function getItemModifier(item: string) {
  return itemOptions.find((option) => option.id === item)?.modifier ?? 0;
}

function getLoadBase(load: string) {
  return loadOptions.find((option) => option.id === load)?.base ?? 0;
}

function getPropertyModifier(property: string) {
  return propertyOptions.find((option) => option.id === property)?.modifier ?? 0;
}

function getDistanceModifier(distance: string) {
  return distanceOptions.find((option) => option.id === distance)?.modifier ?? 0;
}

function getTimeLabel(time: string) {
  return timeWindows.find((option) => option.id === time)?.slot ?? "";
}

function OdometerDigit({ digit, visible }: { digit: number; visible: boolean }) {
  return (
    <span style={{
      display: "block",
      overflow: "hidden",
      height: "1em",
      minWidth: 0,
      maxWidth: visible ? "1em" : "0",
      flexShrink: 0,
      opacity: visible ? 1 : 0,
      transition: "opacity 0.4s ease, max-width 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
    }}>
      <span style={{
        display: "flex",
        flexDirection: "column",
        transform: `translateY(${-digit * 10}%)`,
        transition: "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
      }}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <span key={n} style={{ display: "block", height: "1em", lineHeight: 1 }}>{n}</span>
        ))}
      </span>
    </span>
  );
}

function AnimatedPrice({ value, className, style }: { value: number; className?: string; style?: React.CSSProperties }) {
  const maxLen = 3;
  const str = String(value);
  const fromRight = Array.from({ length: maxLen }, (_, i) => {
    const ci = str.length - 1 - i;
    return ci >= 0 ? parseInt(str[ci], 10) : -1;
  });
  const leftToRight = fromRight.slice().reverse();

  return (
    <span className={className} style={{ ...style, display: "inline-flex", alignItems: "center", gap: 0 }}>
      <span style={{ lineHeight: 1, flexShrink: 0 }}>$</span>
      {leftToRight.map((d, i) => (
        <OdometerDigit key={maxLen - 1 - i} digit={d < 0 ? 0 : d} visible={d >= 0} />
      ))}
    </span>
  );
}

export default function BookingExperience({ initialName = "", initialEmail = "" }: { initialName?: string; initialEmail?: string }) {
  const [activeStep, setActiveStep] = useState<StepId>("amount");
  const [item, setItem] = useState<(typeof itemOptions)[number]["id"]>("boxes");
  const [load, setLoad] = useState<(typeof loadOptions)[number]["id"]>("single");
  const [customDescription, setCustomDescription] = useState("");
  const [address, setAddress] = useState("");
  const [property, setProperty] = useState<(typeof propertyOptions)[number]["id"]>("house");
  const [stairs, setStairs] = useState(false);
  const [distance, setDistance] = useState<(typeof distanceOptions)[number]["id"]>("close");
  const [schedule, setSchedule] = useState<(typeof scheduleOptions)[number]["id"]>("next-day");
  const [time, setTime] = useState<(typeof timeWindows)[number]["id"]>("morning");
  const [name, setName] = useState(initialName);
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState(initialEmail);
  const [photosAttached, setPhotosAttached] = useState(false);
  const [booked, setBooked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [addressSuggestions, setAddressSuggestions] = useState<string[]>([]);
  const [addressLoading, setAddressLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleAddressInput = (query: string) => {
    setAddress(query);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (query.trim().length < 4) { setAddressSuggestions([]); setShowSuggestions(false); return; }
    debounceRef.current = setTimeout(async () => {
      setAddressLoading(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=6&countrycodes=us&addressdetails=1`,
          { headers: { "Accept-Language": "en-US,en" } }
        );
        const data: { display_name: string }[] = await res.json();
        const results = data.map((r) => r.display_name);
        setAddressSuggestions(results);
        setShowSuggestions(results.length > 0);
      } catch {
        setAddressSuggestions([]);
      } finally {
        setAddressLoading(false);
      }
    }, 380);
  };

  const selectAddress = (suggestion: string) => {
    setAddress(suggestion);
    setAddressSuggestions([]);
    setShowSuggestions(false);
  };

  const basePrice = getLoadBase(load);
  const itemModifier = getItemModifier(item);
  const propertyModifier = getPropertyModifier(property);
  const stairsModifier = stairs ? 25 : 0;
  const distanceModifier = getDistanceModifier(distance);
  const livePrice = basePrice + itemModifier + propertyModifier + stairsModifier + distanceModifier;

  const itemLabel = itemOptions.find((option) => option.id === item)?.label ?? "";
  const loadLabel = loadOptions.find((option) => option.id === load)?.label ?? "";
  const scheduleLabel = scheduleOptions.find((option) => option.id === schedule)?.label ?? "";
  const timeLabel = getTimeLabel(time);
  const stepIndex = steps.findIndex((step) => step.id === activeStep);
  const canBook = Boolean(email.trim());
  const canContinueDetails = activeStep !== "details" || email.trim().length > 0;

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "booking",
          name,
          contact,
          email,
          address,
          load: loadLabel,
          schedule: scheduleLabel,
          time: timeLabel,
          property: propertyOptions.find((o) => o.id === property)?.label ?? property,
          stairs,
          distance,
          livePrice,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed");
      }
      setBooked(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setSubmitError(`Error: ${msg}`);
    } finally {
      setSubmitting(false);
    }
  };

  const nextStep = () => {
    if (stepIndex < steps.length - 1) {
      setActiveStep(steps[stepIndex + 1].id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const previousStep = () => {
    if (stepIndex > 0) setActiveStep(steps[stepIndex - 1].id);
  };

  const renderRightPanel = () => {
    const glass: React.CSSProperties = {
      background: "rgba(22,24,26,0.82)",
      border: "1px solid rgba(255,255,255,0.08)",
      backdropFilter: "blur(20px)",
      borderRadius: "20px",
      padding: "28px",
    };
    const accent = "#6abf8e";
    const accentDim = "rgba(163,217,184,0.65)";

    if (booked) {
      return (
        <div style={glass}>
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full"
            style={{ background: "rgba(34,118,74,0.3)", border: "2px solid rgba(106,191,142,0.5)" }}>
            <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <p className="mb-1 text-center text-[10px] font-bold uppercase tracking-widest" style={{ color: accentDim }}>Confirmed</p>
          <p className="mb-1 text-center text-4xl font-black text-white" style={{ letterSpacing: "-0.04em" }}>{formatMoney(livePrice)}</p>
          <p className="mb-6 text-center text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Price locked — no surprises</p>
          <div className="space-y-2.5">
            {["Instant SMS confirmation", "On-the-way text day of pickup", "Price verified before crew starts"].map((t) => (
              <div key={t} className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: accent }} />
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{t}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    switch (activeStep) {
      case "amount":
        return (
          <>
            <div style={glass}>
              <p className="mb-1 text-[10px] font-bold uppercase tracking-widest" style={{ color: accentDim }}>Live Estimate</p>
              <p className="mb-5 text-lg font-bold leading-snug text-white">Price updates instantly.<br />No callbacks. No guessing.</p>
              <div className="relative mb-4 overflow-hidden rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", height: "110px", marginTop: "24px", opacity: 0.5 }}>
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 260 110" fill="none" preserveAspectRatio="none">
                  <rect x="14" y="14" width="232" height="82" rx="5" stroke="rgba(255,255,255,0.07)" strokeWidth="1.5" />
                  <rect x="26" y="26" width="50" height="46" rx="3" fill="rgba(34,118,74,0.18)" stroke="rgba(106,191,142,0.22)" strokeWidth="1" />
                  <rect x="86" y="32" width="38" height="40" rx="3" fill="rgba(34,118,74,0.13)" stroke="rgba(106,191,142,0.17)" strokeWidth="1" />
                  <rect x="134" y="22" width="58" height="54" rx="3" fill="rgba(34,118,74,0.18)" stroke="rgba(106,191,142,0.22)" strokeWidth="1" />
                  <rect x="202" y="36" width="34" height="38" rx="3" fill="rgba(34,118,74,0.13)" stroke="rgba(106,191,142,0.17)" strokeWidth="1" />
                </svg>
                <div className="animate-scan-line" style={{ position: "absolute", left: "12px", right: "12px", height: "2px", top: 0, background: "linear-gradient(90deg, transparent, #6abf8e, transparent)", boxShadow: "0 0 10px rgba(106,191,142,0.7)" }} />
              </div>
            </div>
            <button type="button" onClick={nextStep}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 text-sm font-bold text-white transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg,#22764a,#3a9d66)" }}>
              Continue <Arrow className="h-4 w-4" />
            </button>
          </>
        );

      case "logistics":
        return (
          <div style={glass}>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-widest" style={{ color: accentDim }}>Service Area</p>
            <p className="mb-5 text-lg font-bold leading-snug text-white">Bay Area wide.<br />Fully licensed &amp; insured.</p>
            <div className="relative mb-5 flex items-center justify-center" style={{ height: "100px", marginTop: "24px", opacity: 0.5 }}>
              <div className="absolute animate-ping rounded-full" style={{ width: "84px", height: "84px", border: "1px solid rgba(106,191,142,0.18)", animationDuration: "2.5s" }} />
              <div className="absolute animate-ping rounded-full" style={{ width: "54px", height: "54px", border: "1px solid rgba(106,191,142,0.28)", animationDuration: "2.5s", animationDelay: "0.6s" }} />
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full" style={{ background: "rgba(34,118,74,0.4)", border: "2px solid rgba(106,191,142,0.6)" }}>
                <svg style={{ height: "20px", width: "20px" }} viewBox="0 0 24 24" fill={accent}>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
            </div>
            <div className="mb-4 flex flex-wrap gap-1.5">
              {["San Francisco", "Oakland", "San Jose", "Fremont", "Palo Alto", "Berkeley"].map((city) => (
                <span key={city} className="rounded-full px-2.5 py-1 text-[10px] font-medium" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}>{city}</span>
              ))}
            </div>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Mon–Sat 8 AM–6 PM · Same-crew accountability</p>
          </div>
        );

      case "schedule":
        return (
          <div style={glass}>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-widest" style={{ color: accentDim }}>Your Window</p>
            <p className="mb-5 text-lg font-bold leading-snug text-white">On-time, every time.<br />We text when we&apos;re 20 min out.</p>
            <div className="mb-4 mt-6 space-y-2.5" style={{ opacity: 0.5 }}>
              <div className="flex items-center justify-between rounded-xl px-4 py-3" style={{ background: "rgba(34,118,74,0.2)", border: "1px solid rgba(106,191,142,0.35)" }}>
                <div className="flex items-center gap-2.5">
                  <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span className="text-sm font-semibold text-white">{scheduleLabel || "Next day"}</span>
                </div>
                <span className="rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ background: "rgba(106,191,142,0.2)", color: accent }}>SELECTED</span>
              </div>
              <div className="flex items-center justify-between rounded-xl px-4 py-3" style={{ background: "rgba(34,118,74,0.15)", border: "1px solid rgba(106,191,142,0.25)" }}>
                <div className="flex items-center gap-2.5">
                  <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span className="text-sm font-semibold text-white">{timeLabel || "8–12"} window</span>
                </div>
              </div>
            </div>
            <div className="rounded-xl px-4 py-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <p className="mb-1 text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.25)" }}>Day-of SMS</p>
              <p className="text-sm italic" style={{ color: "rgba(255,255,255,0.6)" }}>&ldquo;BinButler: Your crew is 20 min away. See you soon!&rdquo;</p>
            </div>
          </div>
        );

      case "details":
        return (
          <div style={glass}>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-widest" style={{ color: accentDim }}>Confirmation</p>
            <p className="mb-5 text-lg font-bold leading-snug text-white">Instant confirmation.<br />No waiting for callbacks.</p>
            <div className="mb-5 mt-6 space-y-2" style={{ opacity: 0.5 }}>
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-tl-sm px-4 py-3" style={{ background: "rgba(255,255,255,0.07)", maxWidth: "85%" }}>
                  <p className="mb-1 text-[10px] font-bold" style={{ color: accent }}>BinButler</p>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>Booking confirmed for {scheduleLabel.toLowerCase() || "next day"} · {timeLabel || "8–12"} window</p>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-tl-sm px-4 py-3" style={{ background: "rgba(255,255,255,0.07)", maxWidth: "85%" }}>
                  <p className="mb-1 text-[10px] font-bold" style={{ color: accent }}>BinButler</p>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>Total: {formatMoney(livePrice)} · Price confirmed before we start.</p>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="rounded-2xl rounded-tr-sm px-4 py-3" style={{ background: "rgba(34,118,74,0.25)", border: "1px solid rgba(106,191,142,0.2)", maxWidth: "85%" }}>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>Sounds good, see you then!</p>
                </div>
              </div>
            </div>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Confirmation sent via SMS &amp; email immediately after booking</p>
          </div>
        );

      case "confirm":
        return (
          <div style={{ ...glass, marginTop: "48px" }}>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-widest" style={{ color: accentDim }}>Final Price</p>
            <p className="mb-0.5 text-5xl font-black text-white" style={{ letterSpacing: "-0.04em" }}>{formatMoney(livePrice)}</p>
            <p className="mb-5 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Labor, hauling &amp; disposal included</p>
            <div className="mb-4 rounded-xl p-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", marginTop: "24px", opacity: 0.5 }}>
              <div className="space-y-2.5">
                {[
                  ["Items", `${itemLabel} · ${loadLabel}`],
                  ["Pickup", `${scheduleLabel || "–"} · ${timeLabel || "–"} window`],
                  ["Address", address || "See form"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-start justify-between gap-4 text-xs">
                    <span style={{ color: "rgba(255,255,255,0.35)" }}>{k}</span>
                    <span className="text-right" style={{ color: "rgba(255,255,255,0.65)" }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-3.5 w-3.5 flex-shrink-0" style={{ color: accent }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Price locked once booked. No hidden fees.</p>
            </div>
          </div>
        );
    }
  };

  const btn = (active: boolean) =>
    active
      ? { background: "rgba(34,118,74,0.3)", border: "1px solid rgba(106,191,142,0.6)", color: "white" }
      : { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" };

  const inputStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "white",
    outline: "none",
  };

  const renderStep = () => {
    switch (activeStep) {
      case "amount":
        return (
          <div className="grid gap-2.5 sm:grid-cols-2">
            {loadOptions.map((option) => {
              const active = load === option.id;
              return (
                <button key={option.id} type="button" onClick={() => setLoad(option.id)}
                  className="rounded-2xl p-4 text-left transition-all" style={btn(active)}>
                  <p className="mb-1 text-xs font-bold uppercase tracking-widest" style={{ color: active ? "#6abf8e" : "rgba(255,255,255,0.4)" }}>{option.label}</p>
                  <p className="mb-0.5 text-2xl font-black text-white" style={{ letterSpacing: "-0.03em" }}>{option.range}</p>
                  <p className="mb-1.5 text-xs" style={{ color: active ? "rgba(106,191,142,0.7)" : "rgba(255,255,255,0.3)" }}>typical range</p>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>{option.example}</p>
                </button>
              );
            })}
          </div>
        );
      case "logistics":
        return (
          <div className="space-y-3">
            <div className="relative">
              <input
                value={address}
                onChange={(e) => handleAddressInput(e.target.value)}
                onFocus={() => addressSuggestions.length > 0 && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 160)}
                placeholder="Start typing your address…"
                className="w-full rounded-2xl px-4 py-3 pr-10 text-sm"
                style={inputStyle}
                autoComplete="off"
              />
              {addressLoading && (
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                  <svg className="h-4 w-4 animate-spin" style={{ color: "rgba(106,191,142,0.6)" }} viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </span>
              )}
              {showSuggestions && addressSuggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full z-50 mt-1.5 overflow-hidden rounded-2xl"
                  style={{ background: "#0d2419", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 24px 48px rgba(0,0,0,0.5)" }}>
                  {addressSuggestions.map((s, i) => (
                    <button key={i} type="button" onMouseDown={() => selectAddress(s)}
                      className="flex w-full items-start gap-3 px-4 py-3 text-left text-sm transition-colors hover:bg-white/5"
                      style={{ borderBottom: i < addressSuggestions.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                      <svg className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" style={{ color: "rgba(106,191,142,0.5)" }} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                      <span style={{ color: "rgba(255,255,255,0.75)" }}>{s}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-xs font-semibold" style={{ color: "rgba(255,255,255,0.4)" }}>Property type</p>
                <div className="grid grid-cols-2 gap-2">
                  {propertyOptions.map((o) => (
                    <button key={o.id} type="button" onClick={() => setProperty(o.id)}
                      className="rounded-xl py-3 text-sm font-semibold transition-all" style={btn(property === o.id)}>{o.label}</button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold" style={{ color: "rgba(255,255,255,0.4)" }}>Stairs involved?</p>
                <div className="grid grid-cols-2 gap-2">
                  {[{ label: "No", value: false }, { label: "Yes (+$25)", value: true }].map((o) => (
                    <button key={o.label} type="button" onClick={() => setStairs(o.value)}
                      className="rounded-xl py-3 text-sm font-semibold transition-all" style={btn(stairs === o.value)}>{o.label}</button>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold" style={{ color: "rgba(255,255,255,0.4)" }}>Distance from truck to items</p>
              <div className="grid grid-cols-3 gap-2">
                {distanceOptions.map((o) => (
                  <button key={o.id} type="button" onClick={() => setDistance(o.id)}
                    className="rounded-xl py-3 text-sm font-semibold transition-all" style={btn(distance === o.id)}>{o.label}</button>
                ))}
              </div>
            </div>
          </div>
        );
      case "schedule":
        return (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-semibold" style={{ color: "rgba(255,255,255,0.4)" }}>Day</p>
              <div className="grid gap-2">
                {scheduleOptions.map((o) => (
                  <button key={o.id} type="button" onClick={() => setSchedule(o.id)}
                    className="rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all" style={btn(schedule === o.id)}>{o.label}</button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold" style={{ color: "rgba(255,255,255,0.4)" }}>Time window</p>
              <div className="grid gap-2">
                {timeWindows.map((o) => (
                  <button key={o.id} type="button" onClick={() => setTime(o.id)}
                    className="rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all" style={btn(time === o.id)}>
                    {o.label} <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{o.slot}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case "details":
        return (
          <div className="space-y-3">
            <div>
              <input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address *"
                className="w-full rounded-2xl px-4 py-3 text-sm" style={{ ...inputStyle, borderColor: email.trim() ? "rgba(106,191,142,0.4)" : "rgba(255,255,255,0.1)" }} />
              <p className="mt-1.5 text-[11px]" style={{ color: "rgba(255,255,255,0.3)" }}>We'll send your confirmation here</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <input type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name (optional)"
                className="w-full rounded-2xl px-4 py-3 text-sm" style={inputStyle} />
              <input type="tel" autoComplete="tel" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Phone (optional)"
                className="w-full rounded-2xl px-4 py-3 text-sm" style={inputStyle} />
            </div>
            <label className="flex h-24 w-full cursor-pointer flex-col items-center justify-center gap-1.5 rounded-2xl border-2 border-dashed transition-all"
              style={{ borderColor: photosAttached ? "#6abf8e" : "rgba(255,255,255,0.12)", background: photosAttached ? "rgba(34,118,74,0.15)" : "rgba(255,255,255,0.03)" }}>
              <input type="file" accept="image/*" multiple className="hidden" onChange={() => setPhotosAttached(true)} />
              <Camera className="h-5 w-5" style={{ color: photosAttached ? "#6abf8e" : "rgba(255,255,255,0.3)" } as React.CSSProperties} />
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>{photosAttached ? "Photos attached" : "Optional: add photos"}</p>
            </label>
          </div>
        );
      case "confirm":
        return (
          <div className="space-y-3">
            <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>Booking Summary</p>
              <div className="space-y-2.5">
                {[`${itemLabel} · ${loadLabel}`, address || "Address needed", `${scheduleLabel} · ${timeLabel}`, "Labor, hauling & disposal included"].map((text) => (
                  <div key={text} className="flex items-start gap-3">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: "#6abf8e" }} />
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>{text}</p>
                  </div>
                ))}
              </div>
            </div>
            {submitError && (
              <p className="text-xs" style={{ color: "#f87171" }}>{submitError}</p>
            )}
            <button type="button" disabled={!canBook || submitting} onClick={handleSubmit}
              className="w-full rounded-2xl py-4 text-sm font-bold text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              style={{ background: "linear-gradient(135deg,#22764a,#3a9d66)" }}>
              {submitting ? "Submitting…" : `Lock in ${formatMoney(livePrice)} — Book Pickup`}
            </button>
          </div>
        );
    }
  };

  return (
    <div className="relative overflow-hidden" style={{ background: "#071912", minHeight: "100vh", paddingTop: "64px" }}>

      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/3 top-[20%] h-[600px] w-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, rgba(34,118,74,0.35) 0%, transparent 70%)", filter: "blur(80px)", transform: "translate(-50%, 0)" }} />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, rgba(106,191,142,0.2) 0%, transparent 70%)", filter: "blur(60px)" }} />
      </div>

      {/* Step bar */}
      <div className="sticky top-16 z-40">
        <div className="mx-auto flex max-w-6xl items-center px-6 py-3.5">
          {steps.map((step, i) => {
            const active = activeStep === step.id;
            const done = stepIndex > i;
            return (
              <Fragment key={step.id}>
                <button type="button" onClick={() => setActiveStep(step.id)} className="flex items-center gap-2 whitespace-nowrap">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold transition-all"
                    style={active ? { background: "#22764a", color: "white" } : done ? { background: "rgba(34,118,74,0.3)", color: "#6abf8e" } : { background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.28)" }}>
                    {done ? "✓" : i + 1}
                  </span>
                  <span className="hidden text-xs font-medium sm:block transition-all"
                    style={{ color: active ? "white" : done ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.22)" }}>
                    {step.label}
                  </span>
                </button>
                {i < steps.length - 1 && (
                  <div className="mx-2 h-px flex-1 transition-all"
                    style={{ background: done ? "rgba(34,118,74,0.4)" : "rgba(255,255,255,0.07)" }} />
                )}
              </Fragment>
            );
          })}
        </div>
      </div>

      {/* Description */}
      <div className="relative mx-auto max-w-6xl px-6 pt-10 pb-0">
        <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
          Bay Area bulk waste removal and junk hauling — on-demand service for residents, businesses, property teams, and contractors. Upfront pricing, no hassle.
        </p>
      </div>

      {/* Main grid */}
      <div className="relative mx-auto max-w-6xl px-6 pb-10 pt-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">

          {/* Left: form */}
          <div>
            {booked ? (
              <div>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full"
                  style={{ background: "rgba(34,118,74,0.25)", border: "1px solid rgba(106,191,142,0.35)" }}>
                  <Check className="h-5 w-5" style={{ color: "#6abf8e" } as React.CSSProperties} />
                </div>
                <p className="mb-1 text-xs font-bold uppercase tracking-widest" style={{ color: "#6abf8e" }}>Confirmed</p>
                <h2 className="mb-3 font-black text-white" style={{ fontSize: "clamp(2rem,3.5vw,3rem)", letterSpacing: "-0.04em" }}>
                  {formatMoney(livePrice)} locked in.
                </h2>
                <p className="mb-6 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Pickup booked for <strong className="text-white">{scheduleLabel.toLowerCase()}</strong> in the <strong className="text-white">{timeLabel}</strong> window. Confirmation sent to <strong className="text-white">{email}</strong>.
                </p>
                <div className="space-y-3">
                  {["SMS on the day — We're on the way.", "Crew verifies load before touching anything.", "Updated price shown if the load changed."].map((text) => (
                    <div key={text} className="flex items-center gap-3">
                      <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: "#6abf8e" }} />
                      <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <div className="mb-1 flex items-center justify-between lg:block">
                    <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(106,191,142,0.55)" }}>Step {stepIndex + 1} of {steps.length}</p>
                    <AnimatedPrice value={livePrice} className="font-black text-white lg:hidden" style={{ fontSize: "1.5rem", letterSpacing: "-0.04em", lineHeight: 1 }} />
                  </div>
                  <h2 className="font-black text-white" style={{ fontSize: "clamp(1.6rem,2.8vw,2.2rem)", letterSpacing: "-0.035em" }}>{steps[stepIndex].title}</h2>
                </div>

                {renderStep()}

                <div className="mt-6 flex gap-3 border-t pt-5" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                  {stepIndex > 0 && (
                    <button type="button" onClick={previousStep}
                      className="rounded-xl px-5 py-3 text-sm font-semibold transition-all"
                      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }}>
                      Back
                    </button>
                  )}
                  {activeStep !== "confirm" && activeStep !== "amount" && (
                    <button type="button" onClick={nextStep} disabled={!canContinueDetails}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                      style={{ background: "linear-gradient(135deg,#22764a,#3a9d66)" }}>
                      Continue <Arrow className="h-4 w-4" />
                    </button>
                  )}
                  {activeStep === "amount" && (
                    <button type="button" onClick={nextStep}
                      className="lg:hidden inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white transition-all hover:opacity-90"
                      style={{ background: "linear-gradient(135deg,#22764a,#3a9d66)" }}>
                      Continue <Arrow className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Right: price + step-specific panel — desktop only */}
          <div className="hidden lg:block lg:sticky lg:top-28 space-y-5">
            {!booked && activeStep !== "confirm" && (
              <div>
                <p className="mb-0.5 text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(106,191,142,0.55)" }}>Estimated Total</p>
                <div className="flex items-baseline gap-3">
                  <AnimatedPrice value={livePrice} className="font-black text-white" style={{ fontSize: "clamp(3rem,5vw,4.5rem)", letterSpacing: "-0.05em", lineHeight: 1 }} />
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.3)" }}>Updates as you answer · Labor, hauling &amp; disposal included</p>
                </div>
              </div>
            )}
            <div key={booked ? "booked" : activeStep} className="animate-panel-fade">
              {renderRightPanel()}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
