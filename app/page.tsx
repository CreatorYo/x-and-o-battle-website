import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { ThemesSection } from "@/components/sections/themes-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { PrivacySection } from "@/components/sections/privacy-section";
import { FAQSection } from "@/components/sections/faq-section";
import { DownloadSection } from "@/components/sections/download-section";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ThemesSection />
        <FeaturesSection />
        <PrivacySection />
        <FAQSection />
        <DownloadSection />
      </main>
      <Footer />
    </>
  );
}
