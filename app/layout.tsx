import "./globals.css";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, Outfit } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { APP_ICON_URL, LOGO_URL } from "@/lib/links";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const description = "X&O Battle is a sleek take on tic-tac-toe, with themes, an AI mode and achievements.";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "X&O Battle",
    template: "%s | X&O Battle",
  },
  description,
  keywords: ["Tic Tac Toe", "X&O Battle", "X and O Battle", "2 Player Game"],
  icons: {
    icon: LOGO_URL,
    apple: APP_ICON_URL,
  },
  itunes: {
    appId: "6745736399",
  },
  openGraph: {
    type: "website",
    siteName: "X&O Battle",
    title: "X&O Battle",
    description,
    images: [APP_ICON_URL],
  },
  twitter: {
    card: "summary",
    title: "X&O Battle",
    description,
    images: [APP_ICON_URL],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${outfit.variable} ${inter.variable}`}
    >
      <body className="antialiased">
        <noscript>
          <style>
            {
              "[data-reveal] .reveal-word, [data-reveal] .reveal-item { opacity: 1; filter: none; } [data-reveal] .reveal-strike { stroke-dashoffset: 0; }"
            }
          </style>
        </noscript>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange storageKey="theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
