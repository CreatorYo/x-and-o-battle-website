import { AppStoreQr } from "@/components/app-store-qr";
import { HeroPattern } from "@/components/hero-pattern";
import { HeroPhones } from "@/components/hero-phones";
import { StoreActions } from "@/components/store-links";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-10 pt-36 sm:pt-44">
      <HeroPattern />

      <div className="shell relative flex flex-col items-center text-center">
        <h1 className="font-display font-semibold">
          <span className="block animate-fade-in text-[22px] font-medium tracking-[-0.02em] text-muted-foreground sm:text-[30px]">
            Introducing
          </span>{" "}
          <span
            className="relative mt-3 block animate-fade-in pb-[0.04em] text-[length:clamp(3rem,17vw,4.25rem)] leading-[0.92] tracking-[-0.055em] sm:mt-4 sm:text-[112px] lg:text-[136px]"
            style={{ animationDelay: "0.05s" }}
          >
            <span aria-hidden="true" data-text="X&O Battle" className="wordmark-depth" />
            <span className="wordmark-face">X&amp;O Battle</span>
          </span>
        </h1>

        <p
          className="mt-6 max-w-[20ch] animate-fade-in text-balance font-display text-[length:clamp(1.25rem,6.4vw,1.5rem)] font-medium leading-[1.2] tracking-[-0.02em] text-muted-foreground sm:max-w-none sm:text-[32px]"
          style={{ animationDelay: "0.1s" }}
        >
          Tic-tac-toe, built to match your style.
        </p>

        <div className="mt-10 w-full animate-fade-in sm:w-auto" style={{ animationDelay: "0.15s" }}>
          <StoreActions qrCode={<AppStoreQr />} />
        </div>
      </div>

      <HeroPhones />
    </section>
  );
}
