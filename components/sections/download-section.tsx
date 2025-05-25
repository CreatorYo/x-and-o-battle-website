"use client";

import { Button } from "@/components/ui/button";
import { Apple } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function DownloadSection() {
  return (
    <section id="download" className="py-20 relative overflow-hidden">
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.075] dark:opacity-10"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(circle at 50% 50%, black 0%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 0%, transparent 80%)'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Play?
            </h2>
            <p className="text-xl text-muted-foreground">
              Download X&O Battle now and start playing the ultimate Tic-Tac-Toe game.
            </p>
            <div className="h-2" />
            <Link 
              href="https://apps.apple.com/us/app/x-o-battle/id6745736399"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button 
                size="lg" 
                className="rounded-full text-base px-6 py-4 h-auto relative overflow-hidden group bg-gray-200 hover:bg-gray-300 dark:bg-[#222] dark:hover:bg-[#333] text-black dark:text-white transition-colors"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center">
                  <Apple className="mr-2 h-5 w-5" />
                  <span className="font-medium">Download on App Store</span>
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}