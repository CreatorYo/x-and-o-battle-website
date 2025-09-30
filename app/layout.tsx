import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import ClientTitleUpdater from './ClientTitleUpdater'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'X&O Battle',
  description: 'X&O Battle is a sleek take on tic-tac-toe with customisability and more.',
  icons: {
    icon: 'https://assets.creatoryogames.com/xobattle-assets/XO_Battle_Logo.png',
    apple: 'https://assets.creatoryogames.com/xobattle-assets/XO_Battle_Logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="https://assets.creatoryogames.com/xobattle-assets/XO_Battle_Logo.png"/>
        <link rel="apple-touch-icon" href="https://assets.creatoryogames.com/xobattle-assets/XO_Battle_Logo.png"/>
        <meta name="keywords" content="Tic Tac Toe, X&O Battle, X and O Battle, 2 Player Game"/>
        <meta name="apple-itunes-app" content="app-id=6745736399"/>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function setTheme() {
                  const theme = localStorage.getItem('theme');
                  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  
                  if (theme === 'dark' || (!theme && systemDark)) {
                    document.documentElement.classList.add('dark');
                  }
                  
                  document.documentElement.style.colorScheme = theme === 'dark' || (!theme && systemDark) ? 'dark' : 'light';
                }
                
                setTheme();
                
                document.documentElement.style.display = 'none';
                window.addEventListener('DOMContentLoaded', function() {
                  document.documentElement.style.display = '';
                });
              })();
            `,
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root { color-scheme: light; }
              :root.dark { color-scheme: dark; }
              :root, body { background: hsl(var(--background)); }
            `,
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="theme"
        >
          <ClientTitleUpdater />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}