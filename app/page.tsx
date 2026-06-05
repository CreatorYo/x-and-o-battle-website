import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import dynamic from 'next/dynamic';

const FeaturesSection = dynamic(() => import('@/components/sections/features-section').then(mod => mod.FeaturesSection), { ssr: true });
const ScreenshotsSection = dynamic(() => import('@/components/sections/screenshots-section').then(mod => mod.ScreenshotsSection), { ssr: true });
const FAQSection = dynamic(() => import('@/components/sections/faq-section').then(mod => mod.FAQSection), { ssr: true });
const DownloadSection = dynamic(() => import('@/components/sections/download-section').then(mod => mod.DownloadSection), { ssr: true });
const QRCodeDownload = dynamic(() => import('@/components/qr-code-download').then(mod => mod.QRCodeDownload));

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <ScreenshotsSection />
      <FAQSection />
      <DownloadSection />
      <Footer />
      <QRCodeDownload />
    </main>
  );
}