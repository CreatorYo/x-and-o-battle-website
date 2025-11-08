"use client";

import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { useState, useEffect } from "react";

export function QRCodeDownload() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isClosed) return;
      
      const scrolledPast = window.scrollY > window.innerHeight * 0.8;
      setIsVisible(scrolledPast);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isClosed]);

  const handleQRClick = () => {
    window.open("https://apps.apple.com/us/app/x-o-battle/id6745736399", "_blank", "noopener,noreferrer");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="qr-code"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ 
            opacity: 0, 
            y: 20, 
            scale: 0.95,
            transition: { duration: 0.15, ease: "easeOut" }
          }}
          transition={{ 
            duration: 0.3,
            ease: "easeOut" 
          }}
          className="hidden lg:flex fixed bottom-6 right-6 z-[60]"
        >
        <div className="bg-card/90 backdrop-blur-md border border-border/50 rounded-xl p-3 shadow-xl relative">
          <div 
            onClick={handleQRClick}
            className="cursor-pointer transition-transform hover:scale-105 active:scale-95 mb-2"
            title="Click to open App Store"
          >
            <div className="bg-transparent p-1.5 rounded-lg">
              <QRCodeSVG
                value="https://apps.apple.com/us/app/x-o-battle/id6745736399"
                size={120}
                level="L"
                includeMargin={false}
                bgColor="transparent"
                fgColor="currentColor"
              />
            </div>
          </div>
          <p className="text-xs font-medium text-center text-foreground">
            Scan to Download
          </p>
        </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

