"use client";
import { motion } from "framer-motion";
import { Calendar, MapPin, AlertCircle, Clock, Plus } from "lucide-react";
import type { Appointment } from "@/lib/types";
import appointmentsData from "@/content/appointments.json";
import { formatTimeAgo } from "@/lib/data";

const appointments = appointmentsData as Appointment[];

function AppointmentCard({ apt, index }: { apt: Appointment; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
      className="bg-white border border-[#0A1628]/7 rounded-2xl p-6 hover:border-[#C9A84C]/30 hover:shadow-md transition-all flex flex-col gap-4"
      style={{ boxShadow: "0 1px 4px rgba(10,22,40,0.04)" }}
    >
      {/* Country */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl">{apt.flag}</span>
          <span className="text-sm font-medium text-[#0A1628]">{apt.country}</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-[#0A1628]/30">
          <Clock size={10} />
          <span>{formatTimeAgo(apt.sharedAt)}</span>
        </div>
      </div>

      {/* Center */}
      <div className="flex items-center gap-2 text-xs text-[#0A1628]/40 font-light">
        <MapPin size={12} className="shrink-0" />
        <span>{apt.center}</span>
      </div>

      {/* Date */}
      <div className="flex items-center gap-2 bg-[#FAF9F7] border border-[#0A1628]/6 rounded-xl px-3 py-2">
        <Calendar size={13} className="text-[#C9A84C] shrink-0" />
        <span className="text-xs text-[#0A1628]/60 font-light">
          Randevu tarihi:{" "}
          <span className="text-[#0A1628] font-medium">
            {new Date(apt.appointmentDate).toLocaleDateString("tr-TR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </span>
      </div>

      {/* Note */}
      {apt.note && (
        <p className="text-xs text-[#0A1628]/40 font-light leading-relaxed italic border-l-2 border-[#C9A84C]/30 pl-3">
          &ldquo;{apt.note}&rdquo;
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-[#0A1628]/5">
        <span className="text-[10px] text-[#0A1628]/25 font-light">
          {apt.source ? `Kaynak: ${apt.source}` : "Topluluk paylaşımı"}
        </span>
        {apt.screenshotUrl && (
          <a
            href={apt.screenshotUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-[#C9A84C]/60 hover:text-[#C9A84C] transition-colors underline underline-offset-2"
          >
            Ekran görüntüsü ↗
          </a>
        )}
      </div>
    </motion.div>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-20 border border-dashed border-[#0A1628]/10 rounded-2xl"
    >
      <div className="w-12 h-12 rounded-full border border-[#C9A84C]/20 bg-[#C9A84C]/5 flex items-center justify-center mx-auto mb-4">
        <Calendar size={20} className="text-[#C9A84C]/50" />
      </div>
      <p className="text-[#0A1628]/35 text-sm font-light">Henüz randevu paylaşımı yok.</p>
      <p className="text-[#0A1628]/20 text-xs font-light mt-1">Yakında güncelleniyor.</p>
    </motion.div>
  );
}

export default function AppointmentsSection() {
  return (
    <section id="appointments" className="py-24 section-cream">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div>
            <div className="inline-flex items-center gap-2 border border-[#0A1628]/8 bg-white rounded-full px-4 py-1.5 mb-5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-xs text-[#0A1628]/40 font-light tracking-wider uppercase">
                Sizden Gelenler
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-light text-[#0A1628] tracking-tight leading-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Topluluktan Randevu
              <br />
              <span className="italic">Paylaşımları</span>
            </h2>
            <p className="text-[#0A1628]/40 font-light text-sm mt-3 max-w-md leading-relaxed">
              Kullanıcılarımızın yakaladığı boş Schengen vize randevuları. VFS sitesinden bağımsız olarak paylaşılır.
            </p>
          </div>

          <a
            href="mailto:info@schengenpass.com?subject=Randevu%20Paylasimi"
            className="shrink-0 inline-flex items-center gap-2 border border-[#C9A84C]/35 bg-white rounded-full px-5 py-2.5 text-xs text-[#0A1628]/55 hover:text-[#0A1628] hover:border-[#C9A84C]/60 hover:bg-[#C9A84C]/5 transition-all shadow-sm"
          >
            <Plus size={12} />
            Randevu Paylaş
          </a>
        </motion.div>

        {/* Warning */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-start gap-2.5 bg-amber-50 border border-amber-200/60 rounded-xl px-4 py-3 mb-8 max-w-2xl"
        >
          <AlertCircle size={14} className="text-amber-500/70 shrink-0 mt-0.5" />
          <p className="text-xs text-[#0A1628]/45 font-light leading-relaxed">
            Bu paylaşımlar topluluk üyeleri tarafından yapılmıştır. Randevu almadan önce{" "}
            <a
              href="https://visa.vfsglobal.com/tur/en/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C9A84C] underline underline-offset-2 hover:text-[#B8933F] transition-colors"
            >
              VFS Global sitesinden
            </a>{" "}
            bizzat doğrulayın.
          </p>
        </motion.div>

        {/* Content */}
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
