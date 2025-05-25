import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { ScreenshotsSection } from "@/components/sections/screenshots-section";
import { FAQSection } from "@/components/sections/faq-section";
import { DownloadSection } from "@/components/sections/download-section";

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
    </main>
  );
}