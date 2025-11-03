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

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden bg-background">
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.08] dark:opacity-[0.12]"
        style={{
          maskImage: 'radial-gradient(circle at 50% 50%, black 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 0%, transparent 70%)'
        }}
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="xo-pattern" x="0" y="0" width="300" height="300" patternUnits="userSpaceOnUse">
              <text x="50" y="80" fontSize="32" fill="currentColor" textAnchor="middle" fontFamily="system-ui, sans-serif" fontWeight="bold">X</text>
              <text x="250" y="80" fontSize="32" fill="currentColor" textAnchor="middle" fontFamily="system-ui, sans-serif" fontWeight="300">O</text>
              <text x="50" y="220" fontSize="32" fill="currentColor" textAnchor="middle" fontFamily="system-ui, sans-serif" fontWeight="300">O</text>
              <text x="250" y="220" fontSize="32" fill="currentColor" textAnchor="middle" fontFamily="system-ui, sans-serif" fontWeight="bold">X</text>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#xo-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.2] mb-6"
          >
            Introducing <span className="text-primary">X&O Battle.</span> <br className="hidden md:block" />
            Built to match your style.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl text-muted-foreground mb-8"
          >
            X&O Battle is a sleek take on tic-tac-toe with customisability and more.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-2 sm:gap-1 justify-center"
          >
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
            <Link 
              href="https://web.xoandbattle.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center text-base rounded-full px-4 sm:px-6 py-3 transition-opacity duration-200 hover:opacity-70 w-full sm:w-auto"
            >
              Launch web app
              <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}