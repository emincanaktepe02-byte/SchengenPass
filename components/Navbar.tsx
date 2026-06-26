"use client";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { COUNTRY_PAGES } from "@/lib/countryPages";

const NAV_LINKS = [
  { href: "/#appointments", label: "Randevular" },
  { href: "/#flights",      label: "Uçuşlar"    },
  { href: "/#guide",        label: "Rehber"      },
  { href: "/#blog",         label: "Blog"        },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [dropdown,  setDropdown]  = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
          <span
            className="text-[#F0EBE0] text-sm font-light tracking-wide"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            schengenim<span className="font-semibold" style={{ color: "#D4A843" }}>.com</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[13px] text-[#F0EBE0]/40 hover:text-[#F0EBE0]/85 transition-colors font-light tracking-wide"
            >
              {l.label}
            </Link>
          ))}

          {/* Countries dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdown(!dropdown)}
              className="flex items-center gap-1 text-[13px] text-[#F0EBE0]/40 hover:text-[#F0EBE0]/85 transition-colors font-light tracking-wide"
            >
              Ülkeler
              <ChevronDown
                size={12}
                className={`transition-transform duration-200 ${dropdown ? "rotate-180" : ""}`}
              />
            </button>

            {dropdown && (
              <div className="absolute right-0 top-full mt-2 w-52 bg-[#1A1A1A] border border-white/8 rounded-2xl overflow-hidden shadow-xl">
                <div className="p-2">
                  {COUNTRY_PAGES.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/ulkeler/${c.slug}`}
                      onClick={() => setDropdown(false)}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-[#F0EBE0]/55 hover:text-[#F0EBE0]/90 hover:bg-white/5 transition-all"
                    >
                      <span className="text-lg">{c.flag}</span>
                      <div>
                        <p className="text-xs font-medium leading-tight">{c.name}</p>
                        <p className="text-[10px] text-[#F0EBE0]/25 font-light">{c.heroCity}</p>
                      </div>
                    </Link>
                  ))}
                  <div className="border-t border-white/6 mt-2 pt-2">
                    <Link
                      href="/ulkeler"
                      onClick={() => setDropdown(false)}
                      className="flex items-center justify-center text-xs text-[#D4A843]/60 hover:text-[#D4A843] py-2 transition-colors font-medium"
                    >
                      Tüm Ülkeler →
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
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
        <div className="md:hidden bg-[#1A1A1A] border-b border-white/6 px-6 py-5 flex flex-col gap-1">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-[#F0EBE0]/55 hover:text-[#F0EBE0] transition-colors font-light py-2"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div className="border-t border-white/6 mt-2 pt-3">
            <p className="text-[10px] text-[#F0EBE0]/20 uppercase tracking-wider font-light mb-2">
              Ülke Rehberleri
            </p>
            {COUNTRY_PAGES.map((c) => (
              <Link
                key={c.slug}
                href={`/ulkeler/${c.slug}`}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 py-2 text-sm text-[#F0EBE0]/50 hover:text-[#F0EBE0] transition-colors"
              >
                <span>{c.flag}</span>
                <span>{c.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
