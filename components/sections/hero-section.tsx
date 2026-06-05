"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function HeroSection() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isWindows, setIsWindows] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    setMounted(true);
    const userAgent = navigator.userAgent || navigator.platform || "";
    const isWindowsOS = /Win/i.test(userAgent) || /Windows/i.test(userAgent);
    setIsWindows(isWindowsOS);
  }, []);

  const handleLaunchWebApp = (e: React.MouseEvent) => {
    if (isWindows) {
      e.preventDefault();
      setShowDialog(true);
    }
  };

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
                <Image src="/svgs/apple-logo.svg" alt="Apple" width={18} height={18} className="mr-2 h-[18px] w-[18px] brightness-0 invert" />
                Download on App Store
              </Button>
            </Link>
            <Link 
              href="https://web.xoandbattle.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLaunchWebApp}
              className="group flex items-center justify-center text-base rounded-full px-4 sm:px-6 py-3 transition-opacity duration-200 hover:opacity-70 w-full sm:w-auto"
            >
              Launch web app
              <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>

            <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
              <AlertDialogContent 
                className="sm:max-w-[900px] border-zinc-300 dark:border-zinc-900 p-0 gap-0 overflow-hidden"
                onOverlayClick={() => setShowDialog(false)}
              >
                <div className="flex flex-col sm:flex-row min-h-[380px] sm:min-h-[430px]">
                  <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                      <AlertDialogHeader className="pb-3">
                        <AlertDialogTitle className="text-2xl sm:text-3xl font-bold leading-tight">X&O Battle is also available on the Microsoft Store</AlertDialogTitle>
                        <AlertDialogDescription className="text-base pt-3 leading-relaxed">
                          Play directly within the app with same features as web, or continue to web app.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                    </div>
                    <AlertDialogFooter className="flex-col sm:flex-row gap-3 sm:gap-3 pt-4 pb-0 px-0">
                      <AlertDialogCancel 
                        onClick={() => {
                          window.open("https://web.xoandbattle.com", "_blank");
                          setShowDialog(false);
                        }}
                        className="w-full sm:w-auto border-zinc-300 dark:border-zinc-900 hover:bg-zinc-300 dark:hover:bg-zinc-900"
                      >
                        Continue to web app
                      </AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => {
                          window.open("https://apps.microsoft.com/detail/9nk0184bmx07?hl=en-GB&gl=GB", "_blank");
                          setShowDialog(false);
                        }}
                        className="w-full sm:w-auto flex items-center gap-2.5"
                      >
                        <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.35"/>
                        </svg>
                        Get on Microsoft Store
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </div>
                  <div className="hidden sm:block relative w-full sm:w-[450px] h-80 sm:h-full sm:flex-shrink-0 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-l from-background via-background/50 to-transparent z-10 pointer-events-none" />
                    <Image
                      src="https://assets.creatoryogames.com/xobattle-assets/X%26O_Battle_Web_Board_Screenshot.png"
                      alt="X&O Battle"
                      fill
                      sizes="(max-width: 640px) 100vw, 450px"
                      className="object-cover scale-110"
                      style={{
                        maskImage: 'radial-gradient(ellipse 80% 100% at right center, black 40%, transparent 100%)',
                        WebkitMaskImage: 'radial-gradient(ellipse 80% 100% at right center, black 40%, transparent 100%)',
                      }}
                    />
                    <div 
                      className="absolute inset-0 pointer-events-none dark:block hidden"
                      style={{
                        background: 'radial-gradient(ellipse 100% 120% at 70% 50%, transparent 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.6) 100%)',
                      }}
                    />
                  </div>
                </div>
              </AlertDialogContent>
            </AlertDialog>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}