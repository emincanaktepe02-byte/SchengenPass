"use client";
import { motion } from "framer-motion";
import { Calendar, MapPin, AlertCircle, Clock, Plus } from "lucide-react";
import type { Appointment } from "@/lib/types";
import appointmentsData from "@/content/appointments.json";
import { formatTimeAgo } from "@/lib/data";

const appointments = appointmentsData as Appointment[];

const FADE = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

function AppointmentCard({ apt, index }: { apt: Appointment; index: number }) {
  return (
    <motion.div
      custom={index}
      variants={FADE}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="card p-6 flex flex-col gap-4 hover:border-[#D4A843]/20 transition-colors"
    >
      {/* Country + time */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl leading-none">{apt.flag}</span>
          <span className="text-sm font-medium text-[#F0EBE0]/85">{apt.country}</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-[#F0EBE0]/25">
          <Clock size={10} />
          <span>{formatTimeAgo(apt.sharedAt)}</span>
        </div>
      </div>

      {/* Center */}
      <div className="flex items-center gap-2 text-xs text-[#F0EBE0]/35 font-light">
        <MapPin size={11} className="shrink-0 text-[#D4A843]/50" />
        <span>{apt.center}</span>
      </div>

      {/* Date chip */}
      <div className="flex items-center gap-2 bg-[#242424] border border-white/5 rounded-xl px-3 py-2.5">
        <Calendar size={13} className="text-[#D4A843]/60 shrink-0" />
        <span className="text-xs text-[#F0EBE0]/50 font-light">
          Randevu:{" "}
          <span className="text-[#F0EBE0]/80 font-normal">
            {new Date(apt.appointmentDate).toLocaleDateString("tr-TR", {
              day: "numeric", month: "long", year: "numeric",
            })}
          </span>
        </span>
      </div>

      {/* Note */}
      {apt.note && (
        <p className="text-xs text-[#F0EBE0]/30 font-light leading-relaxed italic border-l-2 border-[#D4A843]/20 pl-3">
          &ldquo;{apt.note}&rdquo;
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-white/5">
        <span className="text-[10px] text-[#F0EBE0]/18 font-light">
          {apt.source ? `Kaynak: ${apt.source}` : "Topluluk paylaşımı"}
        </span>
        {apt.screenshotUrl && (
          <a href={apt.screenshotUrl} target="_blank" rel="noopener noreferrer"
             className="text-[10px] text-[#D4A843]/40 hover:text-[#D4A843] transition-colors underline underline-offset-2">
            Ekran görüntüsü ↗
          </a>
        )}
      </div>
    </motion.div>
  );
}

function EmptyState() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="text-center py-20 border border-dashed border-white/8 rounded-2xl">
      <div className="w-11 h-11 rounded-xl border border-[#D4A843]/15 bg-[#D4A843]/5 flex items-center justify-center mx-auto mb-4">
        <Calendar size={18} className="text-[#D4A843]/40" />
      </div>
      <p className="text-[#F0EBE0]/30 text-sm font-light">Henüz randevu paylaşımı yok.</p>
      <p className="text-[#F0EBE0]/18 text-xs font-light mt-1">Yakında güncelleniyor.</p>
    </motion.div>
  );
}

export default function AppointmentsSection() {
  return (
    <section id="appointments" className="section-ink2 py-28">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div>
            <p className="badge mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Sizden Gelenler
            </p>
            <h2 className="serif text-4xl md:text-5xl font-light text-[#F0EBE0] tracking-tight leading-[1.1]">
              Topluluktan Randevu
              <br />
              <em className="not-italic italic opacity-60">Paylaşımları</em>
            </h2>
            <p className="mt-4 text-[#F0EBE0]/40 font-light text-[15px] max-w-md leading-relaxed">
              Kullanıcılarımızın yakaladığı boş Schengen vize randevuları.
              VFS sitesinden bağımsız olarak paylaşılır.
            </p>
          </div>
          <a
            href="mailto:info@schengenpass.com?subject=Randevu%20Paylasimi"
            className="shrink-0 inline-flex items-center gap-2 border border-white/10 rounded-full px-5 py-2.5 text-xs text-[#F0EBE0]/45 hover:text-[#F0EBE0]/80 hover:border-[#D4A843]/30 transition-all"
          >
            <Plus size={12} />
            Randevu Paylaş
          </a>
        </motion.div>

        {/* Warning */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="flex items-start gap-3 bg-[#1E1A10] border border-[#D4A843]/12 rounded-xl px-5 py-4 mb-10 max-w-2xl"
        >
          <AlertCircle size={14} className="text-[#D4A843]/50 shrink-0 mt-0.5" />
          <p className="text-[13px] text-[#F0EBE0]/40 font-light leading-relaxed">
            Paylaşımlar topluluk üyeleri tarafından yapılmıştır. Randevu almadan önce{" "}
            <a href="https://visa.vfsglobal.com/tur/en/" target="_blank" rel="noopener noreferrer"
               className="text-[#D4A843]/70 hover:text-[#D4A843] underline underline-offset-2 transition-colors">
              VFS Global
            </a>{" "}
            sitesinden doğrulayın.
          </p>
        </motion.div>

        {/* Grid */}
        {appointments.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {appointments.map((apt, i) => (
              <AppointmentCard key={apt.id} apt={apt} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
