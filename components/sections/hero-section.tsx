"use client";

import { Button } from "@/components/ui/button";
import { Apple, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function HeroSection() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToFeatures = () => {
    const featuresElement = document.getElementById("features");
    if (featuresElement) {
      featuresElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden bg-background">
      {/* Dotted Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.15] dark:opacity-[0.2]"
        style={{
          backgroundImage: `radial-gradient(currentColor 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at 50% 50%, black 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 0%, transparent 70%)'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.2] mb-6">
            Introducing <span className="text-primary">X&O Battle.</span> <br className="hidden md:block" />
            Built to match your style.
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            X&O Battle is a sleek take on tic-tac-toe with customisability and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-1 justify-center">
            <Link 
              href="https://apps.apple.com/us/app/x-o-battle/id6745736399"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button size="lg" className="rounded-full text-base w-full sm:w-auto">
                <Apple className="mr-2 h-5 w-5" /> Download on App Store
              </Button>
            </Link>
            <button 
              className="group flex items-center justify-center text-base rounded-full px-4 sm:px-6 py-3 transition-opacity duration-200 hover:opacity-70 w-full sm:w-auto"
              onClick={scrollToFeatures}
            >
              Learn more
              <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}