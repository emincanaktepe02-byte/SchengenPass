/**
 * compress-images.mjs
 * public/*.jpg dosyalarını sharp ile sıkıştırır ve yerinde yazar.
 * Çalıştır: node scripts/compress-images.mjs
 */
import { createRequire } from "module";
import { readdir, stat, rename, rm } from "fs/promises";
import { join, extname, basename } from "path";
import { fileURLToPath } from "url";

const require = createRequire(import.meta.url);
const __dirname = fileURLToPath(new URL(".", import.meta.url));
const publicDir = join(__dirname, "..", "public");

let sharp;
try {
  sharp = (await import("sharp")).default;
} catch {
  console.error("sharp bulunamadı. Yükleniyor…");
  process.exit(1);
}

const MB = (bytes) => (bytes / 1024 / 1024).toFixed(2) + " MB";

const files = (await readdir(publicDir)).filter(
  (f) => extname(f).toLowerCase() === ".jpg" || extname(f).toLowerCase() === ".jpeg"
);

if (!files.length) {
  console.log("Sıkıştırılacak JPEG bulunamadı.");
  process.exit(0);
}

let totalSaved = 0;

for (const file of files) {
  const src = join(publicDir, file);
  const tmp = src + ".tmp";

  const before = (await stat(src)).size;

  await sharp(src)
    .jpeg({
      quality: 82,      // kalite/boyut dengesi
      mozjpeg: true,    // mozjpeg encoder — daha iyi sıkıştırma
      progressive: true,
    })
    .toFile(tmp);

  const after = (await stat(tmp)).size;
  const saved = before - after;
  totalSaved += saved;

  // tmp → orijinal dosya
  await rm(src);
  await rename(tmp, src);

  const pct = ((saved / before) * 100).toFixed(1);
  const arrow = saved > 0 ? "↓" : "↑";
  console.log(
    `  ${file.padEnd(22)} ${MB(before)} → ${MB(after)}  ${arrow}${pct}%`
  );
}

console.log(`\nToplam kazanç: ${MB(totalSaved)}`);
