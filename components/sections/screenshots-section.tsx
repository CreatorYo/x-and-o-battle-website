"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react";
import { Button } from "@/components/ui/button";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

const screenshots = [
  {
    src: "https://assets.creatoryogames.com/xobattle-assets/MainBoardScreenshot.png",
    alt: "Game screenshot showing the board",
  },
  {
    src: "https://assets.creatoryogames.com/xobattle-assets/SwitchGameModeScreenshot.png",
    alt: "Game screenshot showing switch game mode menu",
  },
  {
    src: "https://assets.creatoryogames.com/xobattle-assets/ThemesModaScreenshot.png",
    alt: "Game screenshot showing the themes modal",
  },
];

export function ScreenshotsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1));
  };

  return (
    <section id="screenshots" className="py-20 bg-background w-full">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Game Screenshots</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Take a peek at the X&O Battle experience
          </p>
        </motion.div>

        <div className="max-w-sm mx-auto">
          <div className="relative">
            <div 
              className="overflow-hidden rounded-[2.5rem] shadow-2xl border border-border/50 bg-secondary cursor-zoom-in"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onClick={() => {
                setLightboxIndex(activeIndex);
                setLightboxOpen(true);
              }}
            >
              <div 
                className="flex w-full transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {screenshots.map((screenshot, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="relative aspect-[9/19.5]">
                      <Image
                        src={screenshot.src}
                        alt={screenshot.alt}
                        fill
                        draggable="false"
                        className="object-cover select-none"
                        sizes="(max-width: 640px) 100vw, 384px"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background rounded-full transition-opacity duration-300",
                  isHovering ? "opacity-100" : "opacity-0"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  prevSlide();
                }}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background rounded-full transition-opacity duration-300",
                  isHovering ? "opacity-100" : "opacity-0"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  nextSlide();
                }}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>

            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex justify-center space-x-2">
              {screenshots.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all select-none",
                    activeIndex === index 
                      ? "bg-primary w-6" 
                      : "bg-foreground/20 hover:bg-foreground/40"
                  )}
                />
              ))}
            </div>
          </div>

             <div className="text-center mt-12 space-y-2">
            <p className="text-sm text-muted-foreground">
              <Expand className="inline h-4 w-4 mr-1" />
              Press any screenshot to view in full screen
            </p>
          </div>
        </div>
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={screenshots}
        plugins={[Zoom]}
        animation={{ fade: 300 }}
        index={lightboxIndex}
        on={{
          view: ({ index }) => setLightboxIndex(index),
        }}
        styles={{
          container: { 
            backgroundColor: "rgba(0, 0, 0, 0.95)",
            backdropFilter: "blur(10px)",
          },
          button: { 
            filter: "none",
            color: "#fff",
            backgroundColor: "transparent",
          },
          navigationPrev: {
            left: "max(20px, env(safe-area-inset-left))",
          },
          navigationNext: {
            right: "max(20px, env(safe-area-inset-right))",
          },
          toolbar: {
            backgroundColor: "transparent",
            padding: "20px",
          },
          slide: {
            cursor: "grab",
          }
        }}
        carousel={{
          spacing: 0,
          padding: 0,
        }}
        render={{
          iconNext: () => <ChevronRight className="w-6 h-6" />,
          iconPrev: () => <ChevronLeft className="w-6 h-6" />,
          iconZoomIn: () => null,
          iconZoomOut: () => null,
          iconClose: () => <X className="w-5 h-5" />,
        }}
      />
    </section>
  );
}