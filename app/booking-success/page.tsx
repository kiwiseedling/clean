import Link from "next/link";
import { Navbar, Footer } from "../site-shared";

type BookingSuccessPageProps = {
  searchParams: Promise<{ session_id?: string }>;
};

const nextSteps = [
  {
    n: "01",
    title: "Card saved — no charge yet",
    body: "Your card is securely on file. You will not be charged until the job is complete and you've confirmed everything went well.",
  },
  {
    n: "02",
    title: "We confirm your window",
    body: "You'll get a text or email confirming your crew and arrival window. They'll send another text when they're 20 minutes out.",
  },
  {
    n: "03",
    title: "Job done, then we charge",
    body: "Once the crew finishes and you're satisfied, we charge the agreed amount — exactly what was shown when you booked.",
  },
];

export default async function BookingSuccessPage({ searchParams }: BookingSuccessPageProps) {
  const params = await searchParams;
  const sessionId = params.session_id;

  return (
    <main>
      <Navbar primaryHref="/booking" primaryLabel="Book Pickup" mode="home" />

      {/* Hero */}
      <section className="relative overflow-hidden pt-16" style={{ background: "#071912", minHeight: "62vh" }}>
        {/* Glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(34,118,74,0.4) 0%, transparent 70%)", filter: "blur(90px)", opacity: 0.25 }}
          />
        </div>

        <div className="relative mx-auto flex max-w-2xl flex-col items-center px-6 py-24 text-center">

          {/* Check circle */}
          <div
            className="mb-8 flex h-16 w-16 items-center justify-center rounded-full"
            style={{ background: "rgba(34,118,74,0.18)", border: "1px solid rgba(106,191,142,0.35)" }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6abf8e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: "#6abf8e" }}>
            Booking Confirmed
          </p>
          <h1
            className="mb-4 font-black"
            style={{ color: "white", fontSize: "clamp(2.2rem,4.5vw,3.2rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
          >
            You&apos;re all set.
          </h1>
          <p className="mb-5 max-w-md text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
            Your card is saved and your booking is confirmed. We&apos;ll be in touch shortly to confirm your arrival window.
          </p>

          {/* Email sent badge */}
          <div
            className="mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6abf8e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.55)" }}>
              Confirmation email sent
            </span>
          </div>

          {/* No-charge big block */}
          <div
            className="w-full rounded-[24px] p-6 text-left"
            style={{ background: "rgba(34,118,74,0.14)", border: "1px solid rgba(106,191,142,0.25)" }}
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full" style={{ background: "rgba(34,118,74,0.3)", border: "1px solid rgba(106,191,142,0.35)" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6abf8e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <p className="mb-2 text-xl font-black text-white" style={{ letterSpacing: "-0.02em" }}>
              Your card will not be charged<br /> until we complete the job.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(163,217,184,0.75)" }}>
              We saved your card securely via Stripe. <strong style={{ color: "#6abf8e" }}>No charge happens now.</strong> Once your crew finishes and you&apos;re satisfied, we charge the exact amount confirmed at booking — nothing more.
            </p>
          </div>

          {/* Confirmation ID */}
          {sessionId && (
            <p className="mt-6 text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
              Confirmation ID: {sessionId}
            </p>
          )}
        </div>
      </section>

      {/* What happens next */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-14 max-w-xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: "#22764a" }}>What Happens Next</p>
            <h2
              className="mb-4 font-bold"
              style={{ color: "#0a1f14", fontSize: "clamp(1.9rem,3.2vw,2.6rem)", letterSpacing: "-0.025em", lineHeight: 1.12 }}
            >
              From confirmation<br />to job done.
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {nextSteps.map((s) => (
              <div key={s.n} className="rounded-[28px] border border-gray-100 bg-white p-7 card-shadow">
                <p className="mb-4 text-4xl font-black" style={{ color: "rgba(34,118,74,0.12)", letterSpacing: "-0.04em" }}>{s.n}</p>
                <p className="mb-2 text-lg font-bold" style={{ color: "#0a1f14" }}>{s.title}</p>
                <p className="text-sm leading-relaxed text-gray-500">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reassurance strip */}
      <section className="py-16" style={{ background: "#fafafa" }}>
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: "shield",
                label: "Card stored securely",
                note: "We use Stripe — your full card number is never stored on our servers.",
              },
              {
                icon: "clock",
                label: "No charge until you approve",
                note: "The crew completes the job, then we charge the amount confirmed at booking.",
              },
              {
                icon: "phone",
                label: "Questions? Call or text",
                note: "(713) 282-2588 — we answer fast.",
              },
            ].map(({ label, note, icon }) => (
              <div key={label} className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-5 card-shadow">
                <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full" style={{ background: "#edfaf3" }}>
                  {icon === "shield" && (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#22764a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  )}
                  {icon === "clock" && (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#22764a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  )}
                  {icon === "phone" && (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#22764a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.87a16 16 0 0 0 6.22 6.22l.95-.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="mb-1 text-sm font-semibold" style={{ color: "#0a1f14" }}>{label}</p>
                  <p className="text-xs leading-relaxed text-gray-400">{note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="flex justify-center bg-white py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90"
          style={{ background: "linear-gradient(135deg,#22764a,#3a9d66)" }}
        >
          Back to Home
        </Link>
      </div>

      <Footer />
    </main>
  );
}
