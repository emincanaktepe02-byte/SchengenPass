export interface AppointmentBulletin {
  date: string;
  time: string;
  flag: string;
  country: string;
  operator: string;
  cities: string;
  info: string;
}

// Kaynak: Randevu bilgilendirme.txt — içeriği güncellemek için bu dosyayı düzenleyin

export const BULLETINS: AppointmentBulletin[] = [
  {
    date: "18.06.2026", time: "13:37",
    flag: "🇬🇷", country: "Yunanistan", operator: "Kosmos",
    cities: "İstanbul",
    info: "Temmuz ayı müsait tarihler mevcut.",
  },
  {
    date: "16.06.2026", time: "18:05",
    flag: "🇳🇴", country: "Norveç", operator: "VFS",
    cities: "İstanbul · Ankara · İzmir · Antalya",
    info: "Temmuz ayında müsait tarihler mevcut.",
  },
  {
    date: "16.06.2026", time: "09:30",
    flag: "🇫🇷", country: "Fransa", operator: "VFS",
    cities: "İzmir · Ankara",
    info: "Temmuz ayı boş tarihler mevcut.",
  },
  {
    date: "15.06.2026", time: "13:55",
    flag: "🇬🇷", country: "Yunanistan", operator: "Kosmos",
    cities: "İstanbul",
    info: "19.06.2026, 23.06.2026 ve 29.06.2026 tarihlerindeki tüm saatler müsait.",
  },
  {
    date: "12.06.2026", time: "21:35",
    flag: "🇫🇮", country: "Finlandiya", operator: "VFS",
    cities: "İstanbul · İzmir · Antalya · Ankara",
    info: "Temmuz ayında müsait tarihler mevcut.",
  },
  {
    date: "09.06.2026", time: "15:10",
    flag: "🇸🇪", country: "İsveç", operator: "VFS",
    cities: "Antalya",
    info: "28.07.2026, 29.07.2026, 30.07.2026 ve 31.07.2026 tarihlerinde müsait saatler var.",
  },
  {
    date: "08.06.2026", time: "12:30",
    flag: "🇫🇷", country: "Fransa", operator: "VFS",
    cities: "Ankara",
    info: "Haziran ayı içinde müsait tarihler mevcut.",
  },
  {
    date: "08.06.2026", time: "09:50",
    flag: "🇳🇴", country: "Norveç", operator: "VFS",
    cities: "Tüm merkezler",
    info: "Haziran ayı sonuna müsait tarihler mevcut.",
  },
  {
    date: "04.06.2026", time: "09:30",
    flag: "🇫🇮", country: "Finlandiya", operator: "VFS",
    cities: "İzmir",
    info: "Haziran ayı içinde bir çok tarih müsait.",
  },
  {
    date: "03.06.2026", time: "12:35",
    flag: "🇪🇸", country: "İspanya", operator: "BLS",
    cities: "İstanbul",
    info: "04.06.2026, 11.06.2026, 15.06.2026, 16.06.2026, 22.06.2026, 23.06.2026, 25.06.2026 ve 26.06.2026 tarihleri müsait.",
  },
  {
    date: "02.06.2026", time: "16:30",
    flag: "🇫🇷", country: "Fransa", operator: "VFS",
    cities: "İzmir",
    info: "Birkaç tarih müsait.",
  },
  {
    date: "01.06.2026", time: "13:40",
    flag: "🇩🇰", country: "Danimarka", operator: "VFS",
    cities: "Tüm merkezler",
    info: "Haziran ayı bir çok tarih müsait.",
  },
  {
    date: "30.05.2026", time: "17:20",
    flag: "🇫🇮", country: "Finlandiya", operator: "VFS",
    cities: "İzmir",
    info: "Haziran ayı müsait tarihler mevcut.",
  },
  {
    date: "30.05.2026", time: "01:15",
    flag: "🇲🇹", country: "Malta", operator: "VFS",
    cities: "İzmir",
    info: "Haziran sonuna müsait tarihler mevcut.",
  },
  {
    date: "30.05.2026", time: "01:10",
    flag: "🇪🇸", country: "İspanya", operator: "BLS",
    cities: "İstanbul",
    info: "Haziran sonu müsait birkaç tarih mevcut.",
  },
];
