"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const faqs = [
   {
    question: "How is my privacy protected?",
    answer: <>We take your privacy seriously. The game contains no advertisements and does not track or sell your data. <Link href="https://policies.creatoryogames.com/x-and-o-battle-policies-game/privacy-policy" className="text-blue-700 dark:text-blue-300 hover:underline" target="_blank" rel="noopener noreferrer">Learn more</Link></>
  },
   {
    question: "Can I customise the look of the game?",
    answer: "Yes, you can personalise your experience by choosing from unique themes, presets and accent colours to suit your style."
  },
    {
    question: "Is my game data saved automatically?",
    answer: "Yes, your achievements and other data are saved automatically, ensuring your progress is never lost within the app."
  },
   {
    question: "Are achievements tracked within the game?",
    answer: "Yes, the game includes an achievement system that allows you to monitor your progress."
  },
  {
    question: "Can I play against other people or only the computer?",
    answer: "You can challenge  a friend or take on an AI opponent. The AI difficulty and response time are both customisable."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4">
          <span className="bg-secondary/80 text-sm font-medium px-3 py-1 rounded-full select-none">
            FAQ
          </span>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground">
            Find answers to common questions about X&O Battle
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`border-border/40 border-b ${index === faqs.length - 1 ? 'border-b-0' : ''}`}
            >
              <div className="py-6">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full text-left focus:outline-none group flex justify-between items-center"
                >
                  <h3 className="font-medium text-lg pr-8">{faq.question}</h3>
                  <ChevronDown 
                   className={`h-5 w-5 transition-transform duration-200 flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''}`} 
                   style={{ color: '#0a84ff' }}
                  />
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-4 text-muted-foreground pr-8">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}