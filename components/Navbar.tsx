"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
  { href: "#appointments", label: "Randevular" },
  { href: "#flights", label: "Uçuş Fırsatları" },
  { href: "#guide", label: "Ülke Rehberi" },
  { href: "#blog", label: "Blog" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-16 px-6 flex items-center justify-between transition-all duration-500 ${
        scrolled ? "glass border-b border-white/5" : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 group">
        {!logoError ? (
          <Image
            src="/logo.png"
            alt="SchengenPass"
            width={26}
            height={26}
            className="object-contain"
            onError={() => setLogoError(true)}
            priority
          />
        ) : (
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#7b2ff7] flex items-center justify-center">
            <span className="text-[10px] font-bold text-white">SP</span>
          </div>
        )}
        <span className="font-light text-white text-base tracking-tight">
          Schengen
          <span className="font-semibold gradient-text-cyan-violet">Pass</span>
        </span>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="text-sm text-white/45 hover:text-white transition-colors font-light tracking-tight"
          >
            {l.label}
          </Link>
        ))}
      </div>

      {/* Status badge */}
      <div className="hidden md:flex items-center gap-2 glass rounded-full px-4 py-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[#00ff87] animate-pulse" />
        <span className="text-xs text-white/45 font-light">Aktif</span>
      </div>

      {/* Mobile menu button */}
      <button
        className="md:hidden text-white/70 hover:text-white transition-colors"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 glass border-b border-white/5 p-6 flex flex-col gap-4 md:hidden">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-white/65 hover:text-white text-sm font-light transition-colors"
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
