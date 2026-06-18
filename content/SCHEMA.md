# İçerik Şeması

Bu klasördeki JSON dosyalarını düzenleyerek siteyi güncelliyorsun.
Değişikliği git'e push'ladığında Vercel otomatik deploy eder.

---

## appointments.json — "Sizden Gelenler"

```json
[
  {
    "id": "apt-001",
    "country": "Malta",
    "flag": "🇲🇹",
    "center": "İstanbul Şişli VFS",
    "appointmentDate": "2026-07-20",
    "source": "Topluluk",
    "note": "Sabah 09-11 arası 3 slot görüldü.",
    "sharedAt": "2026-06-18T10:30:00Z",
    "screenshotUrl": null
  }
]
```

| Alan | Zorunlu | Açıklama |
|---|---|---|
| `id` | Evet | Benzersiz kimlik (apt-001, apt-002...) |
| `country` | Evet | Ülke adı (Türkçe) |
| `flag` | Evet | Emoji bayrağı |
| `center` | Evet | VFS merkezi adı |
| `appointmentDate` | Evet | YYYY-MM-DD formatında randevu tarihi |
| `source` | Hayır | Kaynak / kullanıcı notu |
| `note` | Hayır | Ek açıklama (italik görünür) |
| `sharedAt` | Evet | ISO 8601 tarih (ne zaman paylaşıldı) |
| `screenshotUrl` | Hayır | Ekran görüntüsü URL'si veya null |

---

## flights.json — "Uygun Uçuşlar"

```json
[
  {
    "id": "flt-001",
    "origin": "İstanbul (IST)",
    "destination": "Amsterdam (AMS)",
    "date": "2026-08-10",
    "price": "€89",
    "airline": "Transavia",
    "sourceLabel": "@ucuzarota",
    "sourceUrl": "https://www.instagram.com/ucuzarota",
    "note": "Bagaj dahil değil. Erken rezervasyon fiyatı.",
    "postedAt": "2026-06-18T09:00:00Z"
  }
]
```

| Alan | Zorunlu | Açıklama |
|---|---|---|
| `id` | Evet | Benzersiz kimlik (flt-001, flt-002...) |
| `origin` | Evet | Kalkış şehri ve havalimanı kodu |
| `destination` | Evet | Varış şehri ve havalimanı kodu |
| `date` | Evet | YYYY-MM-DD uçuş tarihi |
| `price` | Evet | Yaklaşık fiyat (€89, ₺2.400 gibi) |
| `airline` | Evet | Havayolu adı |
| `sourceLabel` | Hayır | Kaynak hesap adı (@ucuzarota gibi) |
| `sourceUrl` | Hayır | Kaynak link |
| `note` | Hayır | Ek açıklama |
| `postedAt` | Evet | ISO 8601 tarih |
