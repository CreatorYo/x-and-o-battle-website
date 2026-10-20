import { ChevronRight } from "lucide-react";
import { AppStoreQr } from "@/components/app-store-qr";
import { Reveal } from "@/components/reveal";
import { BlurWords, revealIndex } from "@/components/blur-words";
import { StoreActions } from "@/components/store-links";
import { WindowsIcon } from "@/components/brand-icons";
import { BOARD_SCREENSHOT_SIZES } from "@/components/hero-phones";
import { IPhone } from "@/components/iphone";
import { PointerTilt } from "@/components/pointer-tilt";
import { BOARD_SCREENSHOT_URL, MICROSOFT_STORE_URL } from "@/lib/links";

export function DownloadSection() {
  return (
    <section id="download" className="scroll-mt-16 pt-28 sm:pt-40">
      <Reveal className="shell flex flex-col items-center text-center">
        <h2 className="font-display text-[length:clamp(2.25rem,12vw,2.75rem)] font-semibold leading-none tracking-[-0.045em] sm:text-[72px]">
          <BlurWords text="Ready to play?" />
        </h2>
        <p
          className="reveal-item mt-5 max-w-[28rem] text-lg leading-relaxed text-muted-foreground sm:text-xl sm:leading-relaxed"
          style={revealIndex(1)}
        >
          Download X&O Battle on the App Store, or start a game in your browser.
        </p>

        <div className="reveal-item mt-10 w-full sm:w-auto" style={revealIndex(2)}>
          <StoreActions qrCode={<AppStoreQr />} />
        </div>

        <div className="reveal-item mt-6" style={revealIndex(3)}>
          <a
            href={MICROSOFT_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <WindowsIcon className="size-3.5" />
            Also on the Microsoft Store
            <ChevronRight className="-ml-1 size-3.5" />
          </a>
        </div>

        <div
          aria-hidden="true"
          className="reveal-item mt-12 h-[300px] w-full overflow-hidden [mask-image:linear-gradient(to_bottom,black_55%,transparent)] sm:mt-14 sm:h-[380px]"
          style={revealIndex(4)}
        >
          <PointerTilt className="mx-auto mt-6 w-[240px] -rotate-7 sm:w-[290px]">
            <IPhone src={BOARD_SCREENSHOT_URL} alt="" sizes={BOARD_SCREENSHOT_SIZES} loading="eager" />
          </PointerTilt>
        </div>
      </Reveal>
    </section>
  );
}
