"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    text: "Fransa vizesi için aylarca bekledim. SchengenPass sayesinde 3 gün içinde İstanbul Şişli'de randevu bulabildim. Hayat kurtarıcı.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Ayşe K.",
    role: "İstanbul",
  },
  {
    text: "Aracı firmalara 800 Euro vermek yerine aylık 18 Euro ödedim. Sistemi açar açmaz Norveç randevusu çıktı. Telegram'dan ping aldım, anında girdim.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Mehmet D.",
    role: "Ankara",
  },
  {
    text: "Hollanda randevusu 2 aydır yoktu. Bir sabah Telegram'dan bildirim geldi, 10 dakika içinde randevuyu aldım. Bu kadar basit bir şey için neden para ödüyorduk ki?",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    name: "Zeynep A.",
    role: "İzmir",
  },
  {
    text: "Telefon uyku modundayken bile Telegram sayesinde bildirimi aldım. İsviçre randevusunu kaçırmadım. 10 üzerinden 10.",
    image: "https://randomuser.me/api/portraits/men/41.jpg",
    name: "Burak T.",
    role: "Bursa",
  },
  {
    text: "İzlanda vizesi konusunda hiç bilgim yoktu. Rehber bölümü çok detaylıydı, belgelerimi eksiksiz hazırladım. Vize de onaylandı.",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    name: "Fatma G.",
    role: "Antalya",
  },
  {
    text: "Emekli bir öğretmenim, teknolojiye pek aşina değilim ama bu uygulamayı oğlum kurdu ve kullanması çok kolaydı. Malta vizemi aldım.",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    name: "Sevim H.",
    role: "Konya",
  },
  {
    text: "Sahte vize acentalarına para vermeyin. Bu uygulama gerçek çözüm sunuyor. Arkadaşlarıma da önerdim, hepsi memnun.",
    image: "https://randomuser.me/api/portraits/men/19.jpg",
    name: "Emre Y.",
    role: "İstanbul",
  },
  {
    text: "İsveç randevusu Ankara'da çıktı. Sistem anında bildirdi, hemen giydim. 3 haftada vize elime geçti.",
    image: "https://randomuser.me/api/portraits/men/57.jpg",
    name: "Can B.",
    role: "İstanbul",
  },
  {
    text: "Para sıkıntısı yaşayan bir öğrenciyim. 18 Euro çok makul. Estonya vizemi aldım ve Avrupa'yı keşfetmeye çıktım.",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
    name: "Selin M.",
    role: "İzmir",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

function TestimonialsColumn({
  items,
  duration = 15,
  className = "",
}: {
  items: typeof testimonials;
  duration?: number;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{ duration, repeat: Infinity, ease: "linear", repeatType: "loop" }}
        className="flex flex-col gap-4 pb-4"
      >
        {[...new Array(2).fill(0).map((_, idx) => (
          <div key={idx} className="flex flex-col gap-4">
            {items.map((t, i) => (
              <div
                key={i}
                className="bg-[#202020] border border-white/5 rounded-[10px] p-6 max-w-xs w-full"
              >
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} size={10} className="fill-white/40 text-white/40" />
                  ))}
                </div>
                <p className="text-sm text-white/60 font-light leading-relaxed mb-4">{t.text}</p>
                <div className="flex items-center gap-2.5">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-xs font-medium text-white">{t.name}</div>
                    <div className="text-[10px] text-white/30 font-light">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))]}
      </motion.div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-24 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-1.5 mb-6">
            <span className="text-xs text-white/40 font-light tracking-wider uppercase">Kullanıcı Yorumları</span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-light text-white tracking-tight leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Onlar Söylesin
          </h2>
          {/* Rating */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < 4 ? "fill-white text-white" : "fill-white/40 text-white/40"}
                />
              ))}
            </div>
            <span className="text-white font-medium text-sm">4.6</span>
            <span className="text-white/30 text-sm font-light">(84 değerlendirme)</span>
          </div>
        </motion.div>

        {/* Scrolling columns */}
        <div
          className="flex gap-4 justify-center [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] max-h-[600px] overflow-hidden"
        >
          <TestimonialsColumn items={firstColumn} duration={20} />
          <TestimonialsColumn items={secondColumn} duration={25} className="hidden md:block" />
          <TestimonialsColumn items={thirdColumn} duration={22} className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
}
