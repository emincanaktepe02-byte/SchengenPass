import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CountryPageClient from "@/components/CountryPageClient";
import { COUNTRY_PAGES, getCountryPage } from "@/lib/countryPages";

export async function generateStaticParams() {
  return COUNTRY_PAGES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const country = getCountryPage(slug);
  if (!country) return { title: "Bulunamadı" };
  return {
    title: `${country.name} Vize & Seyahat Rehberi 2026 — schengenim.com`,
    description: `${country.name} Schengen vizesi için dikkat edilmesi gerekenler, onay oranı %${country.visa.approvalRate}, seyahat tavsiyeleri ve ${country.heroCity} rehberi.`,
  };
}

export default async function CountryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const country = getCountryPage(slug);
  if (!country) notFound();

  const currentIndex = COUNTRY_PAGES.findIndex((c) => c.slug === slug);
  const prevCountry =
    currentIndex > 0 ? COUNTRY_PAGES[currentIndex - 1] : null;
  const nextCountry =
    currentIndex < COUNTRY_PAGES.length - 1
      ? COUNTRY_PAGES[currentIndex + 1]
      : null;

  return (
    <main className="min-h-screen bg-[#111111]">
      <Navbar />
      <CountryPageClient
        country={country}
        prevCountry={prevCountry}
        nextCountry={nextCountry}
      />
      <Footer />
    </main>
  );
}
