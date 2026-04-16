"use client";

import { Arrow } from "../site-shared";

export function ScrollTopCTA() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:opacity-90"
      style={{ background: "linear-gradient(135deg,#1e1e1e,#404040)" }}
    >
      Book a Pickup <Arrow className="h-3.5 w-3.5" />
    </button>
  );
}
