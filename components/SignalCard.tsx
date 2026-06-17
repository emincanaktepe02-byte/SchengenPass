"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Plane, BedDouble, BookOpen, Lock, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Signal } from "@/lib/types";
import { COUNTRIES, getFlightLink, getAccommodationLink, formatTimeAgo } from "@/lib/data";

interface SignalCardProps {
  signal: Signal;
  isPremium?: boolean;
  index: number;
}

export default function SignalCard({ signal, isPremium = false, index }: SignalCardProps) {
  const [guideOpen, setGuideOpen] = useState(false);
  const country = COUNTRIES.find((c) => c.code === signal.countryCode);

  const flightLink = getFlightLink(signal.destinationCode, signal.center);
  const accommodationLink = getAccommodationLink(signal.popularCity);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      className={`relative rounded-[10px] border transition-all duration-500 ${
        signal.isActive
          ? "border-white/10 bg-[#202020]"
          : "border-white/5 bg-[#141414]"
      } ${isPremium ? "overflow-hidden" : ""}`}
    >
      {/* Premium blur overlay */}
      {isPremium && (
        <div className="absolute inset-0 z-20 backdrop-blur-sm bg-black/40 flex flex-col items-center justify-center gap-3 rounded-[10px]">
          <div className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center">
            <Lock size={16} className="text-white/60" />
          </div>
          <p className="text-xs text-white/50 text-center px-4">
            Bu sinyali görmek için<br />
            <span className="text-white">Temel Plan</span> gerekli
          </p>
          <a href="#pricing">
            <button className="text-xs bg-white text-black rounded-full px-4 py-1.5 font-medium hover:bg-[#f5f5f0] transition-colors">
              Plana Geç →
            </button>
          </a>
        </div>
      )}

      <div className={`p-5 ${isPremium ? "select-none pointer-events-none" : ""}`}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{signal.flag}</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-medium text-white">{signal.countryName}</h3>
                {signal.isActive ? (
                  <span className="inline-flex items-center gap-1 text-[10px] bg-green-500/10 border border-green-500/20 text-green-400 rounded-full px-2 py-0.5">
                    <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />
                    Aktif
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] bg-white/5 border border-white/10 text-white/30 rounded-full px-2 py-0.5">
                    <AlertTriangle size={8} />
                    Doldu
                  </span>
                )}
              </div>
              <p className="text-xs text-white/40 font-light mt-0.5">{signal.center}</p>
            </div>
          </div>

          {/* Slot count */}
          {signal.isActive && signal.slots > 0 && (
            <div className="text-right">
              <div className="text-lg font-medium text-white">{signal.slots}</div>
              <div className="text-[10px] text-white/30 font-light">boş slot</div>
            </div>
          )}
        </div>

        {/* Appointment type */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-1.5 text-[11px] bg-white/5 border border-white/10 rounded-full px-2.5 py-1 text-white/60 font-light">
            <CheckCircle size={10} className="text-white/40" />
            {signal.appointmentType}
          </span>
        </div>

        {/* Timestamps */}
        <div className="space-y-1 mb-5">
          <div className="flex items-center gap-1.5 text-[11px] text-white/30">
            <Clock size={10} />
            <span>Bulundu: {formatTimeAgo(signal.foundAt)}</span>
          </div>
          {!signal.isActive && signal.filledAt && (
            <div className="flex items-center gap-1.5 text-[11px] text-white/20">
              <AlertTriangle size={10} />
              <span>Doldu: {formatTimeAgo(signal.filledAt)}</span>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 mb-4" />

        {/* Action buttons */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setGuideOpen(!guideOpen)}
            className="flex flex-col items-center gap-1.5 text-[10px] text-white/40 hover:text-white/80 transition-colors py-2 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10"
          >
            <BookOpen size={14} />
            <span>Vize Rehberi</span>
          </button>
          <a
            href={flightLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1.5 text-[10px] text-white/40 hover:text-white/80 transition-colors py-2 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10"
          >
            <Plane size={14} />
            <span>Uçuş Bul</span>
          </a>
          <a
            href={accommodationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1.5 text-[10px] text-white/40 hover:text-white/80 transition-colors py-2 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10"
          >
            <BedDouble size={14} />
            <span>Konaklama</span>
          </a>
        </div>

        {/* Expandable guide */}
        {guideOpen && country && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-4 border-t border-white/5 pt-4 space-y-2"
          >
            <p className="text-[11px] text-white/40 font-light uppercase tracking-wider mb-2">
              {signal.countryName} Vize İpuçları
            </p>
            {country.tips.map((tip, i) => (
              <div key={i} className="flex gap-2 text-[11px] text-white/50 leading-relaxed">
                <span className="text-white/20 mt-0.5">→</span>
                <span>{tip}</span>
              </div>
            ))}
            <div className="mt-3 pt-3 border-t border-white/5">
              <p className="text-[11px] text-white/30 font-light">
                Ortalama bekleme: <span className="text-white/50">{country.avgWait}</span>
                {" · "}
                İşlem süresi: <span className="text-white/50">{country.processingTime}</span>
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
