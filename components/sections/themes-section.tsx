"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

const themes = [
  {
    name: "Classic",
    colors: ["#F8FAFC", "#1E293B", "#0EA5E9"],
    description: "The timeless black and white theme with clean lines and elegant simplicity."
  },
  {
    name: "Neon",
    colors: ["#0F172A", "#F43F5E", "#22D3EE"],
    description: "Vibrant neon colors on a dark background for a modern, futuristic look."
  },
  {
    name: "Nature",
    colors: ["#F1F5F9", "#84CC16", "#15803D"],
    description: "Soothing greens and earthy tones inspired by the natural world."
  },
  {
    name: "Royal",
    colors: ["#1E1B4B", "#C084FC", "#E879F9"],
    description: "Rich purples and golds creating a luxurious, premium experience."
  },
];

export function ThemesSection() {
  const [activeTheme, setActiveTheme] = useState(0);

  return (
    <section id="themes" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Beautiful Themes</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Customize your gaming experience with stunning visual themes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-card rounded-3xl overflow-hidden shadow-xl border"
          >
            <div className="aspect-square relative">
              <Image
                src="https://images.pexels.com/photos/278918/pexels-photo-278918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt={`${themes[activeTheme].name} Theme`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-white text-2xl font-bold">{themes[activeTheme].name} Theme</h3>
                <p className="text-white/80 mt-2">{themes[activeTheme].description}</p>
                <div className="flex space-x-3 mt-4">
                  {themes[activeTheme].colors.map((color, index) => (
                    <div 
                      key={index}
                      className="w-8 h-8 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <div>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-2xl font-bold mb-6"
            >
              Choose Your Style
            </motion.h3>
            
            <div className="space-y-4">
              {themes.map((theme, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => setActiveTheme(index)}
                  className={cn(
                    "p-4 border rounded-lg cursor-pointer transition-all",
                    activeTheme === index ? "border-primary bg-primary/5" : "hover:border-primary/50"
                  )}
                >
                  <div className="flex items-center">
                    <div className="flex space-x-2 mr-4">
                      {theme.colors.map((color, colorIndex) => (
                        <div 
                          key={colorIndex}
                          className="w-6 h-6 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <div>
                      <h4 className="font-medium">{theme.name}</h4>
                      <p className="text-sm text-muted-foreground">{theme.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}