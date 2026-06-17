"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-16 px-5 flex items-center justify-between transition-all duration-500 ${
        scrolled ? "bg-black/80 backdrop-blur-md border-b border-white/5" : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center">
            <span className="text-[10px] font-medium text-white">S</span>
          </div>
          <span className="font-light text-white tracking-tight text-base">
            Schengen<span className="font-medium">Pass</span>
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-[3px] opacity-40">
          <span className="w-[1.5px] h-3 bg-white rounded-full" />
          <span className="w-[1.5px] h-3 bg-white rounded-full" />
          <span className="w-[1.5px] h-3 bg-white rounded-full" />
        </div>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8">
        <Link href="#signals" className="text-sm text-white/60 hover:text-white transition-colors font-light tracking-tight">
          Canlı Sinyaller
        </Link>
        <Link href="#how" className="text-sm text-white/60 hover:text-white transition-colors font-light tracking-tight">
          Nasıl Çalışır
        </Link>
        <Link href="#guide" className="text-sm text-white/60 hover:text-white transition-colors font-light tracking-tight">
          Vize Rehberi
        </Link>
        <Link href="#pricing" className="text-sm text-white/60 hover:text-white transition-colors font-light tracking-tight">
          Fiyatlar
        </Link>
      </div>

      {/* CTA */}
      <div className="hidden md:flex items-center gap-3">
        <Button variant="ghost" size="sm" className="text-xs">
          Giriş Yap
        </Button>
        <Button variant="default" size="sm" className="text-xs">
          7 Gün Ücretsiz Dene →
        </Button>
      </div>

      {/* Mobile menu button */}
      <button
        className="md:hidden text-white/70 hover:text-white"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-black/95 backdrop-blur-md border-b border-white/10 p-6 flex flex-col gap-4 md:hidden">
          {["Canlı Sinyaller", "Nasıl Çalışır", "Vize Rehberi", "Fiyatlar"].map((item, i) => (
            <Link
              key={i}
              href={`#${["signals", "how", "guide", "pricing"][i]}`}
              className="text-white/70 hover:text-white text-sm font-light"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
          <Button variant="default" size="sm" className="w-full mt-2">
            7 Gün Ücretsiz Dene →
          </Button>
        </div>
      )}
    </nav>
  );
}
