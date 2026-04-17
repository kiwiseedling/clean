"use client";

import { useState, useEffect, useRef } from "react";

type Booking = {
  id: string;
  name: string;
  email: string;
  quoted_price: number | null;
  payment_status: string;
  status: string;
  load: string | null;
  schedule: string | null;
  address: string | null;
};

export default function AdminChargePage() {
  const [bookingId, setBookingId] = useState("");
  const [booking, setBooking] = useState<Booking | null>(null);
  const [lookupError, setLookupError] = useState("");
  const [looking, setLooking] = useState(false);

  const [amountDollars, setAmountDollars] = useState("");
  const [amountEdited, setAmountEdited] = useState(false);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    success?: boolean;
    paymentIntentId?: string;
    status?: string;
    error?: string;
  } | null>(null);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-lookup booking when ID looks like a UUID
  useEffect(() => {
    const id = bookingId.trim();
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (id.length < 36) {
      setBooking(null);
      setLookupError("");
      if (!amountEdited) setAmountDollars("");
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setLooking(true);
      setLookupError("");
      setBooking(null);
      try {
        const res = await fetch(`/api/admin-booking?id=${encodeURIComponent(id)}`);
        const data = await res.json();
        if (!res.ok) {
          setLookupError(data.error || "Booking not found");
          if (!amountEdited) setAmountDollars("");
        } else {
          setBooking(data);
          // Autofill amount with quoted price if user hasn't manually edited it
          if (!amountEdited && data.quoted_price) {
            setAmountDollars(String(data.quoted_price));
          }
        }
      } catch {
        setLookupError("Could not reach server");
      } finally {
        setLooking(false);
      }
    }, 400);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingId]);

  const amountCents = amountDollars ? Math.round(parseFloat(amountDollars) * 100) : 0;
  const canCharge = bookingId.trim().length === 36 && amountCents > 0 && !loading && booking?.payment_status !== "paid";

  const handleCharge = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/charge-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId: bookingId.trim(), finalAmountCents: amountCents }),
      });
      const data = await res.json();
      setResult(data);
      if (data.success) setBooking((b) => b ? { ...b, payment_status: "paid", status: "completed" } : b);
    } catch {
      setResult({ error: "Network error — charge request failed." });
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition-colors focus:border-gray-400";

  const statusColor = (s: string) =>
    s === "paid" || s === "completed" ? "#16a34a" : s === "card_saved" ? "#2563eb" : "#9ca3af";

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-16">
      <div className="mx-auto max-w-md">
        <p className="mb-1 text-xs font-bold uppercase tracking-widest text-gray-400">Admin</p>
        <h1 className="mb-6 text-2xl font-black text-gray-900" style={{ letterSpacing: "-0.03em" }}>
          Charge Completed Job
        </h1>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="space-y-4">

            {/* Booking ID */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-500">Booking ID</label>
              <input
                type="text"
                placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                value={bookingId}
                onChange={(e) => { setBookingId(e.target.value); setResult(null); }}
                className={inputCls}
              />
              {looking && <p className="mt-1 text-xs text-gray-400">Looking up…</p>}
              {lookupError && <p className="mt-1 text-xs text-red-500">{lookupError}</p>}
            </div>

            {/* Booking summary card */}
            {booking && (
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-sm">
                <div className="mb-2 flex items-center justify-between">
                  <p className="font-semibold text-gray-900">{booking.name || "—"}</p>
                  <span className="rounded-full px-2.5 py-0.5 text-xs font-bold capitalize" style={{ background: "#f0f9ff", color: statusColor(booking.payment_status) }}>
                    {booking.payment_status}
                  </span>
                </div>
                <p className="text-gray-500">{booking.email}</p>
                {booking.address && <p className="text-gray-400 text-xs mt-1">{booking.address}</p>}
                {(booking.load || booking.schedule) && (
                  <p className="text-gray-400 text-xs mt-0.5">
                    {[booking.load, booking.schedule].filter(Boolean).join(" · ")}
                  </p>
                )}
                {booking.payment_status === "paid" && (
                  <p className="mt-2 text-xs font-semibold text-green-600">This booking has already been charged.</p>
                )}
              </div>
            )}

            {/* Amount */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-xs font-semibold text-gray-500">Final Amount (USD)</label>
                {booking?.quoted_price && !amountEdited && (
                  <span className="text-xs text-gray-400">Autofilled from quoted price</span>
                )}
              </div>
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">$</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="189.00"
                  value={amountDollars}
                  onChange={(e) => { setAmountDollars(e.target.value); setAmountEdited(true); }}
                  className={`${inputCls} pl-7`}
                />
              </div>
              {amountCents > 0 && (
                <p className="mt-1 text-xs text-gray-400">
                  Customer will be charged ${parseFloat(amountDollars).toFixed(2)}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleCharge}
            disabled={!canCharge}
            className="mt-6 w-full rounded-xl py-3.5 text-sm font-bold text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            style={{ background: "linear-gradient(135deg,#0a1f14,#22764a)" }}
          >
            {loading ? "Charging…" : `Charge $${amountDollars ? parseFloat(amountDollars).toFixed(2) : "0.00"}`}
          </button>
        </div>

        {result && (
          <div
            className="mt-4 rounded-2xl border p-5 text-sm"
            style={result.success ? { background: "#f0fdf4", borderColor: "#bbf7d0" } : { background: "#fef2f2", borderColor: "#fecaca" }}
          >
            {result.success ? (
              <div className="space-y-1.5">
                <p className="font-bold text-green-800">Charge successful</p>
                <p className="text-green-700">Payment Intent: <span className="font-mono text-xs">{result.paymentIntentId}</span></p>
                <p className="text-green-700">Status: <span className="font-semibold">{result.status}</span></p>
              </div>
            ) : (
              <div>
                <p className="font-bold text-red-700">Charge failed</p>
                <p className="mt-1 text-red-600">{result.error}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
