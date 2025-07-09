"use client";

import { motion } from "framer-motion";
import { 
  Paintbrush, 
  Users2, 
  Trophy, 
  Sparkles, 
  Save, 
  Shield 
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const features = [
  {
    icon: <Paintbrush className="h-8 w-8 text-rose-500 dark:text-rose-300" />,
    title: "Theme Customisation",
    description: "Customise your game with unique presets and accent colors.",
    bgColor: "bg-rose-500/40",
    spotlightColor: "rgba(244, 63, 94, 0.2)",
    selectionClass: "feature-rose"
  },
  {
    icon: <Users2 className="h-8 w-8 text-blue-500 dark:text-blue-300" />,
    title: "Play against a friend or AI",
    description: "Challenge friends or AI with customisable difficulty and response time.",
    bgColor: "bg-blue-500/40",
    spotlightColor: "rgba(59, 130, 246, 0.2)",
    selectionClass: "feature-blue"
  },
  {
    icon: <Trophy className="h-8 w-8 text-yellow-500 dark:text-yellow-300" />,
    title: "Achievements",
    description: "Track your progress and unlock new milestones.",
    bgColor: "bg-yellow-500/40",
    spotlightColor: "rgba(234, 179, 8, 0.2)",
    selectionClass: "feature-yellow"
  },
  {
    icon: <Sparkles className="h-8 w-8 text-green-500 dark:text-green-300" />,
    title: "Win Animation Styles",
    description: "Celebrate your win your way by picking from fun effects or confetti.",
    bgColor: "bg-green-500/40",
    spotlightColor: "rgba(34, 197, 94, 0.2)",
    selectionClass: "feature-green"
  },
  {
    icon: <Save className="h-8 w-8 text-purple-500 dark:text-purple-300" />,
    title: "Data Saved",
    description: "Your achievements and data are saved automatically.",
    bgColor: "bg-purple-500/40",
    spotlightColor: "rgba(168, 85, 247, 0.2)",
    selectionClass: "feature-purple"
  },
  {
    icon: <Shield className="h-8 w-8 text-orange-500 dark:text-orange-300" />,
    title: "Privacy Respected",
    description: <>We deeply respect your privacy with no ads and no data tracking. <Link href="https://policies.creatoryogames.com/x-and-o-battle-policies-game/privacy-policy" className="text-orange-500 dark:text-orange-300 hover:underline" target="_blank" rel="noopener noreferrer">Learn more</Link></>,
    bgColor: "bg-orange-500/40",
    spotlightColor: "rgba(249, 115, 22, 0.2)",
    selectionClass: "feature-orange"
  }
];

export function FeaturesSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(-1);

  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Game Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover what makes X&O Battle the ultimate Tic-Tac-Toe experience
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
              className={`bg-secondary rounded-xl p-6 border border-border/50 overflow-hidden relative group ${feature.selectionClass}`}
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
              <div className={`absolute inset-0 opacity-30 ${feature.bgColor}`} />
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
      </div>
    </section>
  );
}