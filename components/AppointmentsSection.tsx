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
      className="bg-[#202020] border border-white/5 rounded-[10px] p-6 hover:border-white/10 transition-colors flex flex-col gap-4"
    >
      {/* Country */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl">{apt.flag}</span>
          <span className="text-sm font-medium text-white">{apt.country}</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-white/30">
          <Clock size={10} />
          <span>{formatTimeAgo(apt.sharedAt)}</span>
        </div>
      </div>

      {/* Center */}
      <div className="flex items-center gap-2 text-xs text-white/40 font-light">
        <MapPin size={12} className="shrink-0" />
        <span>{apt.center}</span>
      </div>

      {/* Date */}
      <div className="flex items-center gap-2 bg-white/[0.03] border border-white/5 rounded-lg px-3 py-2">
        <Calendar size={13} className="text-white/40 shrink-0" />
        <span className="text-xs text-white/60 font-light">
          Randevu tarihi:{" "}
          <span className="text-white font-medium">
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
        <p className="text-xs text-white/40 font-light leading-relaxed italic border-l border-white/10 pl-3">
          "{apt.note}"
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-white/5">
        <span className="text-[10px] text-white/20 font-light">
          {apt.source ? `Kaynak: ${apt.source}` : "Topluluk paylaşımı"}
        </span>
        {apt.screenshotUrl && (
          <a
            href={apt.screenshotUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-white/30 hover:text-white/60 transition-colors underline underline-offset-2"
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
      className="text-center py-20 border border-dashed border-white/10 rounded-[10px]"
    >
      <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-4">
        <Calendar size={20} className="text-white/20" />
      </div>
      <p className="text-white/30 text-sm font-light">Henüz randevu paylaşımı yok.</p>
      <p className="text-white/15 text-xs font-light mt-1">Yakında güncelleniyor.</p>
    </motion.div>
  );
}

export default function AppointmentsSection() {
  return (
    <section id="appointments" className="py-24" style={{ background: "linear-gradient(to bottom, #020918, #030b14)" }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div>
            <div className="inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-1.5 mb-5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span className="text-xs text-white/40 font-light tracking-wider uppercase">
                Sizden Gelenler
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-light text-white tracking-tight leading-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Topluluktan Randevu
              <br />
              <span className="italic">Paylaşımları</span>
            </h2>
            <p className="text-white/35 font-light text-sm mt-3 max-w-md leading-relaxed">
              Kullanıcılarımızın yakaladığı boş Schengen vize randevuları. VFS sitesinden bağımsız olarak paylaşılır.
            </p>
          </div>

          <a
            href="mailto:info@schengenpass.com?subject=Randevu%20Paylasimi"
            className="shrink-0 inline-flex items-center gap-2 border border-white/10 rounded-full px-5 py-2.5 text-xs text-white/50 hover:text-white/80 hover:border-white/20 transition-colors"
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
          className="flex items-start gap-2.5 bg-white/[0.03] border border-white/8 rounded-lg px-4 py-3 mb-8 max-w-2xl"
        >
          <AlertCircle size={14} className="text-white/30 shrink-0 mt-0.5" />
          <p className="text-xs text-white/30 font-light leading-relaxed">
            Bu paylaşımlar topluluk üyeleri tarafından yapılmıştır. Randevu almadan önce{" "}
            <a
              href="https://visa.vfsglobal.com/tur/en/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-white/50 transition-colors"
            >
              VFS Global sitesinden
            </a>{" "}
            bizzat doğrulayın. SchengenPass bu bilgilerin güncelliğini garanti etmez.
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
