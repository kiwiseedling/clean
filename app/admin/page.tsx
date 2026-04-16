"use client";

import { useState } from "react";

export default function AdminChargePage() {
  const [customerId, setCustomerId] = useState("");
  const [paymentMethodId, setPaymentMethodId] = useState("");
  const [amountDollars, setAmountDollars] = useState("");
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success?: boolean; paymentIntentId?: string; status?: string; error?: string } | null>(null);

  const handleCharge = async () => {
    const amount = Math.round(parseFloat(amountDollars) * 100);
    if (!customerId || !paymentMethodId || !amount) {
      setResult({ error: "Customer ID, Payment Method ID, and amount are all required." });
      return;
    }

    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/charge-completed-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerId, paymentMethodId, amount, orderId }),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ error: "Network error — charge request failed." });
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition-colors focus:border-gray-400";

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-16">
      <div className="mx-auto max-w-lg">
        <p className="mb-1 text-xs font-bold uppercase tracking-widest text-gray-400">Admin</p>
        <h1 className="mb-2 text-2xl font-black text-gray-900" style={{ letterSpacing: "-0.03em" }}>
          Charge Completed Job
        </h1>
        <p className="mb-8 text-sm text-gray-500">
          Enter the Stripe customer ID and payment method ID from the booking, then set the final charge amount.
        </p>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-500">Customer ID</label>
              <input
                type="text"
                placeholder="cus_xxxxxxxxxxxxxxxxx"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value.trim())}
                className={inputCls}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-500">Payment Method ID</label>
              <input
                type="text"
                placeholder="pm_xxxxxxxxxxxxxxxxx"
                value={paymentMethodId}
                onChange={(e) => setPaymentMethodId(e.target.value.trim())}
                className={inputCls}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-500">Amount (USD)</label>
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">$</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="189.00"
                  value={amountDollars}
                  onChange={(e) => setAmountDollars(e.target.value)}
                  className={`${inputCls} pl-7`}
                />
              </div>
              {amountDollars && !isNaN(parseFloat(amountDollars)) && (
                <p className="mt-1 text-xs text-gray-400">
                  Charges {Math.round(parseFloat(amountDollars) * 100)} cents = ${parseFloat(amountDollars).toFixed(2)}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-500">Order ID <span className="font-normal text-gray-400">(optional)</span></label>
              <input
                type="text"
                placeholder="order_123"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value.trim())}
                className={inputCls}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleCharge}
            disabled={loading || !customerId || !paymentMethodId || !amountDollars}
            className="mt-6 w-full rounded-xl py-3.5 text-sm font-bold text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            style={{ background: "linear-gradient(135deg,#1a1a1a,#3a3a3a)" }}
          >
            {loading ? "Charging…" : "Charge Customer"}
          </button>
        </div>

        {result && (
          <div
            className="mt-4 rounded-2xl border p-5 text-sm"
            style={
              result.success
                ? { background: "#f4f4f4", borderColor: "#d0d0d0" }
                : { background: "#fef2f2", borderColor: "#fecaca" }
            }
          >
            {result.success ? (
              <div className="space-y-1.5">
                <p className="font-bold text-gray-900">Charge successful</p>
                <p className="text-gray-500">Payment Intent: <span className="font-mono text-gray-700">{result.paymentIntentId}</span></p>
                <p className="text-gray-500">Status: <span className="font-semibold text-gray-700">{result.status}</span></p>
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
