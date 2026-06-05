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
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                let scrollbarVisible = false;
                let animationFrameId = null;
                let currentWidth = 0;
                const EDGE_THRESHOLD = 50;
                const TARGET_WIDTH = 10;
                const ANIMATION_DURATION = 200;
                
                function setScrollbarWidth(width) {
                  const style = document.createElement('style');
                  style.id = 'dynamic-scrollbar-style';
                  style.textContent = \`
                    ::-webkit-scrollbar {
                      width: \${width}px !important;
                      height: \${width}px !important;
                    }
                  \`;
                  
                  const existingStyle = document.getElementById('dynamic-scrollbar-style');
                  if (existingStyle) {
                    existingStyle.remove();
                  }
                  document.head.appendChild(style);
                }
                
                function animateScrollbar(targetWidth) {
                  if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                  }
                  
                  const startWidth = currentWidth;
                  const startTime = performance.now();
                  
                  function animate(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / ANIMATION_DURATION, 1);
                    
                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    
                    currentWidth = startWidth + (targetWidth - startWidth) * easeOut;
                    setScrollbarWidth(currentWidth);
                    
                    if (progress < 1) {
                      animationFrameId = requestAnimationFrame(animate);
                    } else {
                      currentWidth = targetWidth;
                      setScrollbarWidth(currentWidth);
                      animationFrameId = null;
                    }
                  }
                  
                  animationFrameId = requestAnimationFrame(animate);
                }
                
                function updateScrollbarVisibility(e) {
                  if (!e) {
                    if (scrollbarVisible) {
                      scrollbarVisible = false;
                      animateScrollbar(0);
                    }
                    return;
                  }
                  
                  const windowWidth = window.innerWidth;
                  const mouseX = e.clientX;
                  const distanceFromRight = windowWidth - mouseX;
                  
                  if (distanceFromRight <= EDGE_THRESHOLD && !scrollbarVisible) {
                    scrollbarVisible = true;
                    animateScrollbar(TARGET_WIDTH);
                  } else if (distanceFromRight > EDGE_THRESHOLD && scrollbarVisible) {
                    scrollbarVisible = false;
                    animateScrollbar(0);
                  }
                }
                
                document.addEventListener('mousemove', updateScrollbarVisibility);
                document.addEventListener('mouseleave', function() {
                  updateScrollbarVisibility(null);
                });
              })();
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