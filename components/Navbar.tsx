"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const NAV_LINKS = [
  { href: "#appointments", label: "Randevular"     },
  { href: "#flights",      label: "Uçuşlar"        },
  { href: "#guide",        label: "Ülke Rehberi"   },
  { href: "#blog",         label: "Blog"            },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#111111]/95 backdrop-blur-md border-b border-white/6"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-6 h-6 rounded-sm bg-[#D4A843] flex items-center justify-center">
            <span className="text-[9px] font-bold text-[#111111] leading-none">SP</span>
          </div>
          <span
            className="text-[#F0EBE0] text-sm font-light tracking-wide"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Schengen<span className="font-semibold" style={{ color: "#D4A843" }}>Pass</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[13px] text-[#F0EBE0]/40 hover:text-[#F0EBE0]/85 transition-colors font-light tracking-wide"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right pill */}
        <div className="hidden md:flex items-center gap-2 border border-white/8 rounded-full px-4 py-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] text-[#F0EBE0]/35 font-light tracking-wide">2026 Güncel</span>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-[#F0EBE0]/60 hover:text-[#F0EBE0] transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#1A1A1A] border-b border-white/6 px-6 py-5 flex flex-col gap-4">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-[#F0EBE0]/55 hover:text-[#F0EBE0] transition-colors font-light"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
