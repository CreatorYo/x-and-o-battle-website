import { IPhone } from "@/components/iphone";
import { ASSETS_URL, BOARD_SCREENSHOT_URL } from "@/lib/links";
import { cn } from "@/lib/utils";

export const BOARD_SCREENSHOT_SIZES = "(max-width: 640px) 52vw, 320px";

const side = "relative z-0 mt-[14%] w-[42%] sm:mt-24 sm:w-[270px]";

const shots = [
  {
    src: `${ASSETS_URL}/SwitchGameModeScreenshot.png`,
    alt: "Choosing between Two Player and AI Mode",
    sizes: "(max-width: 640px) 42vw, 270px",
    className: cn(side, "-mr-[13%] sm:-mr-14"),
    delay: "0.25s",
  },
  {
    src: BOARD_SCREENSHOT_URL,
    alt: "A game in progress on the Classic theme",
    sizes: BOARD_SCREENSHOT_SIZES,
    className: "relative z-10 w-[52%] sm:w-[320px]",
    delay: "0.2s",
  },
  {
    src: `${ASSETS_URL}/ThemesModaScreenshot.png`,
    alt: "The theme picker with Classic, Modern, Neon, Minimal and Retro",
    sizes: "(max-width: 640px) 42vw, 270px",
    className: cn(side, "-ml-[13%] sm:-ml-14"),
    delay: "0.25s",
  },
];

export function HeroPhones() {
  return (
    <div className="mt-20 flex justify-center sm:mt-24">
      {shots.map((shot, i) => (
        <div
          key={shot.src}
          className={cn("shrink-0 animate-fade-in", shot.className)}
          style={{ animationDelay: shot.delay }}
        >
          <IPhone
            src={shot.src}
            alt={shot.alt}
            sizes={shot.sizes}
            loading="eager"
            fetchPriority={i === 1 ? "high" : "auto"}
          />
        </div>
      ))}
    </div>
  );
}
