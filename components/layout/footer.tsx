"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { ThemeSwitcher } from "@/components/theme-switcher";

export function Footer() {
  return (
    <footer className="bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Navigation */}
          <div className="flex flex-wrap gap-6 justify-center mb-16">
            <Link 
              href="#features" 
              className="select-none px-4 py-2 rounded-full text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-colors"
            >
              Features
            </Link>
            <Link 
              href="#screenshots" 
              className="select-none px-4 py-2 rounded-full text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-colors"
            >
              Screenshots
            </Link>
            <Link 
              href="https://policies.creatoryogames.com/x-and-o-battle-policies-game/privacy-policy"
              className="select-none px-4 py-2 rounded-full text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-colors"
            >
              Privacy
            </Link>
            <Link 
              href="https://help.creatoryogames.com"
              className="select-none px-4 py-2 rounded-full text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-colors"
            >
              Help Centre
            </Link>
          </div>

          {/* Copyright and Actions */}
          <div className="flex justify-between items-center pt-8 border-t border-foreground/10">
            <p className="text-foreground/60 text-sm">© {new Date().getFullYear()} X&O Battle. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <ThemeSwitcher />
              <a title="Email Support"
                href="mailto:help@creatoryogames.com"
                className="select-none text-foreground/60 hover:text-foreground transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}