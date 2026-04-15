export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900">
      {/* ── Navbar ── */}
      <header className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.176 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 0 1 1.925-3.546 3.75 3.75 0 0 1 3.255 3.718Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <span className="text-xl font-bold tracking-tight text-zinc-900">Clean</span>
          </a>

          {/* Nav links */}
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#services" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">
              Services
            </a>
            <a href="#why-clean" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">
              Why Clean
            </a>
            <a href="#contact" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">
              Contact
            </a>
          </nav>

          {/* CTA */}
          <a
            href="#contact"
            className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-700 transition-colors"
          >
            Get a Quote
          </a>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-zinc-950 pt-32 pb-24">
        {/* Subtle gradient glow */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[600px] w-[900px] rounded-full bg-red-600/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-sm font-medium text-red-400">
            <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
            Trusted by 500+ businesses across California
          </div>

          <h1 className="mx-auto max-w-4xl text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
            Fire Safety Done{" "}
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Right
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
            Clean provides end-to-end fire compliance inspections, certified fire watch, and
            equipment rental — so your business stays protected, compliant, and operational.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#contact"
              className="rounded-lg bg-red-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg hover:bg-red-700 transition-colors"
            >
              Request an Inspection
            </a>
            <a
              href="#services"
              className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800/50 px-8 py-3.5 text-base font-semibold text-zinc-300 hover:bg-zinc-800 transition-colors"
            >
              View Services
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <div className="border-y border-zinc-100 bg-zinc-50">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-zinc-200 md:grid-cols-4">
          {[
            { value: "500+", label: "Businesses Served" },
            { value: "98%", label: "Compliance Pass Rate" },
            { value: "24/7", label: "Fire Watch Coverage" },
            { value: "15+", label: "Years of Experience" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center py-8 px-4 text-center">
              <span className="text-3xl font-extrabold text-zinc-900">{stat.value}</span>
              <span className="mt-1 text-sm text-zinc-500">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Services ── */}
      <section id="services" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-red-600">What We Do</p>
            <h2 className="mt-2 text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl">
              Comprehensive Fire Safety Services
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-500">
              From routine inspections to round-the-clock fire watch, we cover every aspect of
              fire safety compliance for your property.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card 1 — Inspections */}
            <div className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-7 w-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-zinc-900">Fire Compliance Inspections</h3>
              <p className="mt-3 text-zinc-500 leading-relaxed">
                Certified inspectors assess your facility against local fire codes and NFPA standards.
                Receive a detailed compliance report with clear action items and re-inspection support.
              </p>
              <ul className="mt-5 space-y-2">
                {["Sprinkler & alarm systems", "Egress & exit signage", "Extinguisher placement"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-zinc-600">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 flex-shrink-0 text-red-500">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors">
                Schedule Inspection
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                </svg>
              </a>
            </div>

            {/* Card 2 — Fire Watch */}
            <div className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              {/* Popular badge */}
              <span className="absolute right-5 top-5 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
                Most Popular
              </span>
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-7 w-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-zinc-900">Fire Watch Services</h3>
              <p className="mt-3 text-zinc-500 leading-relaxed">
                When your fire alarm or suppression system is down, our trained fire watch personnel
                are on-site within hours to maintain continuous coverage and protect your people.
              </p>
              <ul className="mt-5 space-y-2">
                {["24/7 on-site monitoring", "Rapid 2-hour deployment", "Detailed log reporting"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-zinc-600">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 flex-shrink-0 text-red-500">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors">
                Request Fire Watch
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                </svg>
              </a>
            </div>

            {/* Card 3 — Equipment Rental */}
            <div className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-7 w-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-zinc-900">Equipment Rental</h3>
              <p className="mt-3 text-zinc-500 leading-relaxed">
                Rent certified, inspection-ready fire safety equipment by the day, week, or month.
                All units are tested, maintained, and delivered to your site — ready for immediate use.
              </p>
              <ul className="mt-5 space-y-2">
                {["Portable extinguishers", "Temporary alarms & detectors", "Suppression system covers"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-zinc-600">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 flex-shrink-0 text-red-500">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors">
                View Equipment
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Clean ── */}
      <section id="why-clean" className="bg-zinc-950 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-red-500">Why Clean</p>
              <h2 className="mt-2 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                Built for businesses that can&apos;t afford downtime
              </h2>
              <p className="mt-4 text-lg text-zinc-400">
                A failed inspection, a lapsed permit, or a system outage can shut your doors.
                Clean ensures your compliance is continuous — not just a checkbox.
              </p>
              <div className="mt-10 space-y-6">
                {[
                  {
                    title: "Certified & Licensed",
                    desc: "All inspectors hold current state certifications and carry full liability insurance.",
                  },
                  {
                    title: "Fast Response",
                    desc: "Emergency fire watch deployed within 2 hours — day, night, or weekend.",
                  },
                  {
                    title: "Clear Reporting",
                    desc: "Digital reports delivered same day with photos, findings, and next steps.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-600">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" className="h-3.5 w-3.5">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-white">{item.title}</p>
                      <p className="mt-1 text-sm text-zinc-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual card panel */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Inspections completed", value: "3,200+" },
                { label: "Average response time", value: "< 2 hrs" },
                { label: "Cities covered", value: "40+" },
                { label: "Repeat clients", value: "87%" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                  <p className="text-3xl font-extrabold text-white">{item.value}</p>
                  <p className="mt-1 text-sm text-zinc-500">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact / CTA ── */}
      <section id="contact" className="py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-red-600">Get Started</p>
          <h2 className="mt-2 text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl">
            Ready to get compliant?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-500">
            Tell us about your property and we&apos;ll reach out within one business day with a
            custom quote — no pressure, no obligation.
          </p>

          <form className="mt-10 space-y-4 text-left">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-700">First name</label>
                <input
                  type="text"
                  placeholder="Jane"
                  className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-700">Last name</label>
                <input
                  type="text"
                  placeholder="Smith"
                  className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700">Work email</label>
              <input
                type="email"
                placeholder="jane@company.com"
                className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700">Service needed</label>
              <select className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm text-zinc-900 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 bg-white">
                <option value="">Select a service…</option>
                <option>Fire Compliance Inspection</option>
                <option>Fire Watch</option>
                <option>Equipment Rental</option>
                <option>Multiple / Not Sure</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700">Message</label>
              <textarea
                rows={4}
                placeholder="Tell us about your property or situation…"
                className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-red-600 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-red-700 transition-colors"
            >
              Send Request
            </button>
          </form>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-zinc-100 bg-zinc-50">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="h-4 w-4">
                  <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.176 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 0 1 1.925-3.546 3.75 3.75 0 0 1 3.255 3.718Z" clipRule="evenodd" />
                </svg>
              </span>
              <span className="font-bold text-zinc-900">Clean</span>
            </div>
            <p className="text-sm text-zinc-500">
              © {new Date().getFullYear()} Clean Fire Safety. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-zinc-500">
              <a href="#" className="hover:text-zinc-900 transition-colors">Privacy</a>
              <a href="#" className="hover:text-zinc-900 transition-colors">Terms</a>
              <a href="#contact" className="hover:text-zinc-900 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
