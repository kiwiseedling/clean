"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import logoWhiteImage from "../images/logowhite.png";

type IconProps = { className?: string; style?: React.CSSProperties };

export const Leaf = ({ className = "w-4 h-4" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

export const Phone = ({ className = "w-4 h-4" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export const Arrow = ({ className = "w-4 h-4" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export const Check = ({ className = "w-3 h-3" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const Mail = ({ className = "w-4 h-4" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

export const Camera = ({ className = "w-5 h-5" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
    <circle cx="12" cy="13" r="3" />
  </svg>
);

export const Star = ({ className = "w-3.5 h-3.5", style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

type NavbarProps = {
  primaryHref: string;
  primaryLabel: string;
  mode?: "home" | "valet";
};

export function Navbar({ primaryHref, primaryLabel, mode = "home" }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href.startsWith("#")) return false;
    return pathname === href || (href !== "/" && pathname.startsWith(href));
  };

  const links =
    mode === "home"
      ? [
          ["Bulk Trash", "/booking"],
          ["Trash Valet", "/trash-valet"],
        ]
      : [
          ["Bulk Trash", "/"],
          ["Resident Doorstep", "#doorstep"],
          ["Property Managers", "#property-managers"],
          ["SB-1383", "#sb1383"],
          ["FAQ", "#faq"],
        ];

  const linkColor = "rgba(255,255,255,0.75)";
  const linkHoverColor = "#ffffff";
  const phoneColor = "rgba(255,255,255,0.75)";

  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 h-16 transition-all duration-300"
      style={
        scrolled
          ? { background: "#0f2d1f", boxShadow: "0 2px 20px rgba(0,0,0,0.25)" }
          : { background: "transparent", borderBottom: "none" }
      }
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logoWhiteImage} alt="BinButler logo" className="h-7 w-auto" priority />
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map(([label, href]) => {
            const active = isActive(href);
            return (
              <Link
                key={label}
                href={href}
                className="relative text-sm font-medium transition-colors"
                style={{ color: active ? "#ffffff" : linkColor }}
                onMouseEnter={(e) => (e.currentTarget.style.color = linkHoverColor)}
                onMouseLeave={(e) => (e.currentTarget.style.color = active ? "#ffffff" : linkColor)}
              >
                {label}
                {active && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full" style={{ background: "#6abf8e" }} />
                )}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="tel:+117132822588"
            className="flex items-center gap-1.5 text-sm font-medium transition-colors"
            style={{ color: phoneColor }}
          >
            <Phone />
            (713) 282 2588
          </a>
          <Link
            href={primaryHref}
            className="rounded-lg px-4 py-2 text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)" }}
          >
            {primaryLabel}
          </Link>
        </div>

        <button
          className="rounded-lg p-2 md:hidden"
          style={{ color: "rgba(255,255,255,0.8)" }}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <div className="w-5 space-y-1.5">
            <span className={`block h-0.5 origin-center transition-all ${open ? "translate-y-2 rotate-45" : ""}`} style={{ background: "currentColor" }} />
            <span className={`block h-0.5 transition-all ${open ? "opacity-0" : ""}`} style={{ background: "currentColor" }} />
            <span className={`block h-0.5 origin-center transition-all ${open ? "-translate-y-2 -rotate-45" : ""}`} style={{ background: "currentColor" }} />
          </div>
        </button>
      </div>

      {open && (
        <div
          className="space-y-1 border-t px-5 py-4 md:hidden"
          style={{ background: "#0f2d1f", borderColor: "rgba(255,255,255,0.1)" }}
        >
          {links.map(([label, href]) => {
            const active = isActive(href);
            return (
              <Link
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-2 text-sm font-medium transition-colors"
                style={{ color: active ? "#ffffff" : "rgba(255,255,255,0.65)" }}
              >
                {label}
                {active && <span className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: "#6abf8e" }} />}
              </Link>
            );
          })}
          <div className="mt-2 border-t pt-3" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
            <Link href={primaryHref} onClick={() => setOpen(false)} className="block rounded-lg py-2.5 text-center text-sm font-semibold text-white" style={{ background: "rgba(255,255,255,0.15)" }}>
              {primaryLabel}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export function Footer() {
  return (
    <footer style={{ background: "#080f0a" }}>
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-10 grid gap-12 md:grid-cols-[240px_1fr]">
          <div>
            <div className="mb-4">
              <Image src={logoWhiteImage} alt="BinButler logo" className="block h-8 w-auto" style={{ marginLeft: "-4px" }} />
            </div>
            <p className="mb-5 max-w-[220px] text-sm leading-relaxed" style={{ color: "rgba(163,217,184,0.75)" }}>
              Bulk waste pickup and apartment trash valet for Bay Area property teams, contractors, and businesses.
            </p>
            <div className="space-y-2">
              <a href="tel:+117132822588" className="flex items-center gap-2 text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.72)" }}>
                <Phone />
                (713) 282 2588
              </a>
              <a href="mailto:hello@binbutler.com" className="flex items-center gap-2 text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.72)" }}>
                <Mail />
                hello@binbutler.com
              </a>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(163,217,184,0.65)" }}>
                Services
              </h4>
              <ul className="space-y-2.5">
                {[
                  ["Bulk Trash Pickup", "/"],
                  ["Trash Valet", "/trash-valet"],
                  ["Bulk Pricing", "/booking"],
                  ["Request Pickup", "/booking"],
                ].map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.72)" }}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(163,217,184,0.65)" }}>
                Customers
              </h4>
              <ul className="space-y-2.5">
                {["Property Managers", "Contractors", "Retail & Offices", "Apartment Communities"].map((label) => (
                  <li key={label}>
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.72)" }}>
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(163,217,184,0.65)" }}>
                Company
              </h4>
              <ul className="space-y-2.5">
                {["hello@binbutler.com", "(713) 282 2588", "Bay Area, CA", "Mon-Sat 8 AM - 6 PM"].map((label) => (
                  <li key={label}>
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.72)" }}>
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t pt-7 sm:flex-row" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
            © 2026 BinButler. Licensed &amp; insured. Bay Area, CA.
          </p>
          <div className="flex items-center gap-4 text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
            <Link href="/" className="transition-colors hover:text-white">
              Bulk Trash
            </Link>
            <Link href="/trash-valet" className="transition-colors hover:text-white">
              Trash Valet
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
