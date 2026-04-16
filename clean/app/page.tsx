export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">

      {/* Navbar */}
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="text-xl font-bold tracking-tight">Clean</span>
          <div className="hidden items-center gap-8 text-sm text-gray-500 md:flex">
            <a href="#services" className="hover:text-black transition-colors">Services</a>
            <a href="#about" className="hover:text-black transition-colors">About</a>
            <a href="#contact" className="hover:text-black transition-colors">Contact</a>
          </div>
          <a
            href="#contact"
            className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
          >
            Get a Quote
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex min-h-screen flex-col items-center justify-center px-6 pt-20 text-center">
        <span className="mb-4 inline-block rounded-full bg-gray-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gray-500">
          Fire Safety & Compliance
        </span>
        <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
          Fire Compliance,{" "}
          <span className="text-red-600">Simple</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-gray-500">
          Clean helps businesses stay code-compliant with professional fire inspections,
          certified fire watch, and flexible equipment rental — all in one place.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href="#contact"
            className="rounded-xl bg-black px-8 py-3.5 text-sm font-semibold text-white hover:bg-gray-800 transition-colors"
          >
            Request an Inspection
          </a>
          <a
            href="#services"
            className="rounded-xl border border-gray-200 px-8 py-3.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            View Services
          </a>
        </div>

        {/* Social proof */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8">
          {[
            { value: "500+", label: "Businesses served" },
            { value: "98%", label: "Compliance pass rate" },
            { value: "24/7", label: "Fire watch coverage" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-sm text-gray-400">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-gray-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-red-600">What We Do</p>
            <h2 className="mt-2 text-4xl font-bold tracking-tight">Everything your business needs</h2>
            <p className="mx-auto mt-3 max-w-xl text-gray-500">
              From routine inspections to emergency fire watch, we cover every layer of fire safety compliance.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">

            {/* Card: Inspections */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#dc2626" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Fire Compliance Inspections</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                Certified inspectors assess your facility against local fire codes and NFPA standards.
                Same-day digital reports with clear action items and re-inspection support included.
              </p>
              <ul className="mt-5 space-y-2">
                {["Sprinkler & alarm systems", "Egress & exit signage", "Extinguisher placement"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Card: Fire Watch */}
            <div className="rounded-2xl border-2 border-black bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-1 flex justify-end">
                <span className="rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">Most Popular</span>
              </div>
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#dc2626" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Fire Watch Services</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                When your alarm or suppression system goes down, our trained personnel are on-site
                within 2 hours to maintain continuous coverage around the clock.
              </p>
              <ul className="mt-5 space-y-2">
                {["24/7 on-site monitoring", "Rapid 2-hour deployment", "Detailed log reporting"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Card: Equipment Rental */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#dc2626" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Equipment Rental</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                Rent certified, inspection-ready fire safety equipment by the day, week, or month.
                Delivered and tested on-site — ready for immediate use.
              </p>
              <ul className="mt-5 space-y-2">
                {["Portable extinguishers", "Temporary alarms & detectors", "Suppression system covers"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* About / Why Clean */}
      <section id="about" className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-red-600">Why Clean</p>
              <h2 className="mt-2 text-4xl font-bold tracking-tight">
                Built for businesses that can&apos;t afford downtime
              </h2>
              <p className="mt-4 text-gray-500">
                A failed inspection or lapsed permit can shut your doors. Clean keeps your
                compliance continuous — not just a once-a-year checkbox.
              </p>
              <div className="mt-10 space-y-6">
                {[
                  { title: "Certified & Licensed", desc: "All inspectors hold current state certifications and carry full liability insurance." },
                  { title: "Fast Response", desc: "Emergency fire watch deployed within 2 hours — day, night, or weekend." },
                  { title: "Clear Reporting", desc: "Digital reports delivered same day with photos, findings, and next steps." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-black">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" className="h-3 w-3">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="mt-0.5 text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "3,200+", label: "Inspections completed" },
                { value: "< 2 hrs", label: "Average response time" },
                { value: "40+", label: "Cities covered" },
                { value: "87%", label: "Repeat clients" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                  <p className="text-3xl font-bold">{item.value}</p>
                  <p className="mt-1 text-sm text-gray-500">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="bg-black py-24 text-white">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-red-400">Get Started</p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight">Ready to get compliant?</h2>
          <p className="mx-auto mt-4 max-w-lg text-gray-400">
            Tell us about your property and we&apos;ll be in touch within one business day with a
            custom quote — no pressure, no obligation.
          </p>
          <form className="mt-10 space-y-4 text-left">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-300">First name</label>
                <input type="text" placeholder="Jane" className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:border-white focus:outline-none" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-300">Last name</label>
                <input type="text" placeholder="Smith" className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:border-white focus:outline-none" />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-300">Work email</label>
              <input type="email" placeholder="jane@company.com" className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:border-white focus:outline-none" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-300">Service needed</label>
              <select className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-sm text-white focus:border-white focus:outline-none">
                <option value="">Select a service…</option>
                <option>Fire Compliance Inspection</option>
                <option>Fire Watch</option>
                <option>Equipment Rental</option>
                <option>Multiple / Not Sure</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-300">Message</label>
              <textarea rows={4} placeholder="Tell us about your property or situation…" className="w-full resize-none rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:border-white focus:outline-none" />
            </div>
            <button type="submit" className="w-full rounded-lg bg-white py-3.5 text-sm font-semibold text-black hover:bg-gray-100 transition-colors">
              Send Request
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <span className="font-bold">Clean</span>
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} Clean Fire Safety. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-black transition-colors">Privacy</a>
            <a href="#" className="hover:text-black transition-colors">Terms</a>
            <a href="#contact" className="hover:text-black transition-colors">Contact</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
