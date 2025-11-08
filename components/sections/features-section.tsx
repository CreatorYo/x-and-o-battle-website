"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Paintbrush, 
  Users2, 
  Trophy, 
  Sparkles, 
  Save, 
  Shield 
} from "lucide-react";
import Link from "next/link";
import { useState, useRef } from "react";

const features = [
  {
    icon: <Paintbrush className="h-8 w-8 text-rose-500 dark:text-rose-300" />,
    title: "Theme Customisation",
    description: "Customise your game with unique presets and accent colors.",
    bgColor: "bg-rose-500/25",
    gradientClass: "bg-gradient-to-br from-rose-100 via-rose-200 to-rose-300 dark:from-rose-600/40 dark:via-rose-500/30 dark:to-rose-400/25",
    spotlightColor: "rgba(244, 63, 94, 0.15)",
    selectionClass: "feature-rose"
  },
  {
    icon: <Users2 className="h-8 w-8 text-blue-500 dark:text-blue-300" />,
    title: "Play against a friend or AI",
    description: "Challenge friends or AI with customisable difficulty and response time.",
    bgColor: "bg-blue-500/25",
    gradientClass: "bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 dark:from-blue-600/40 dark:via-blue-500/30 dark:to-blue-400/25",
    spotlightColor: "rgba(59, 130, 246, 0.15)",
    selectionClass: "feature-blue"
  },
  {
    icon: <Trophy className="h-8 w-8 text-yellow-500 dark:text-yellow-300" />,
    title: "Achievements",
    description: "Track your progress and unlock new milestones.",
    bgColor: "bg-yellow-500/25",
    gradientClass: "bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-300 dark:from-yellow-600/40 dark:via-yellow-500/30 dark:to-yellow-400/25",
    spotlightColor: "rgba(234, 179, 8, 0.15)",
    selectionClass: "feature-yellow"
  },
  {
    icon: <Sparkles className="h-8 w-8 text-green-500 dark:text-green-300" />,
    title: "Win Animation Styles",
    description: "Celebrate your win your way by picking from fun effects or confetti.",
    bgColor: "bg-green-500/25",
    gradientClass: "bg-gradient-to-br from-green-100 via-green-200 to-green-300 dark:from-green-600/40 dark:via-green-500/30 dark:to-green-400/25",
    spotlightColor: "rgba(34, 197, 94, 0.15)",
    selectionClass: "feature-green"
  },
  {
    icon: <Save className="h-8 w-8 text-purple-500 dark:text-purple-300" />,
    title: "Data Saved",
    description: "Your achievements and data are saved automatically.",
    bgColor: "bg-purple-500/25",
    gradientClass: "bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 dark:from-purple-600/40 dark:via-purple-500/30 dark:to-purple-400/25",
    spotlightColor: "rgba(168, 85, 247, 0.15)",
    selectionClass: "feature-purple"
  },
  {
    icon: <Shield className="h-8 w-8 text-orange-500 dark:text-orange-300" />,
    title: "Privacy Respected",
    description: <>We deeply respect your privacy with no ads and no data tracking. <Link href="https://policies.creatoryogames.com/x-and-o-battle-policies-game/privacy-policy" className="text-orange-500 dark:text-orange-300 hover:underline" target="_blank" rel="noopener noreferrer">Learn more</Link></>,
    bgColor: "bg-orange-500/25",
    gradientClass: "bg-gradient-to-br from-orange-100 via-orange-200 to-orange-300 dark:from-orange-600/40 dark:via-orange-500/30 dark:to-orange-400/25",
    spotlightColor: "rgba(249, 115, 22, 0.15)",
    selectionClass: "feature-orange"
  }
];

export function FeaturesSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(-1);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.8]);

  return (
    <section id="features" ref={ref} className="py-20">
      <motion.div 
        style={{ y, opacity }}
        className="container mx-auto px-4"
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Game Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover what makes X&O Battle the ultimate experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`rounded-xl p-6 border border-border/50 overflow-hidden relative group ${feature.selectionClass} ${feature.gradientClass}`}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setMousePosition({
                  x: e.clientX - rect.left,
                  y: e.clientY - rect.top
                });
              }}
              onMouseEnter={() => setIsHovering(index)}
              onMouseLeave={() => setIsHovering(-1)}
            >
              {isHovering === index && (
                <div
                  className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${feature.spotlightColor}, transparent 40%)`
                  }}
                />
              )}
              <div className="relative z-10">
                <div className={`p-3 rounded-full ${feature.bgColor} w-fit mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}