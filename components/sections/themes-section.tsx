import { Reveal } from "@/components/reveal";
import { BlurWords, revealIndex } from "@/components/blur-words";

const THEMES = [
  { name: "Classic", x: "#0A84FF", o: "#FF453A" },
  { name: "Modern", x: "#E528FC", o: "#FF2F61" },
  { name: "Neon", x: "#2CD65B", o: "#FFDF00" },
  { name: "Minimal", x: "#8E93A6", o: "#55627C" },
  { name: "Retro", x: "#FF922A", o: "#E033FB" },
];

const POSITION = ["X", "O", "X", "", "X", "O", "O", "", "X"];

export function ThemesSection() {
  return (
    <section id="themes" className="scroll-mt-16 py-28 sm:py-40">
      <Reveal className="shell">
        <h2 className="lede">
          <BlurWords text="Five themes, built in." />{" "}
          <span className="text-muted-foreground">
            <BlurWords text="Or save your own presets with the accent colours you like." offset={4} />
          </span>
        </h2>
      </Reveal>

      <Reveal className="shell mt-14 sm:mt-20">
        <ul className="grid grid-cols-4 gap-x-4 gap-y-8 sm:grid-cols-6 md:grid-cols-5 lg:gap-x-5">
          {THEMES.map((theme, index) => (
            <li
              key={theme.name}
              className="reveal-item col-span-2 last:col-start-2 sm:last:col-start-auto sm:nth-4:col-start-2 md:col-span-1 md:nth-4:col-start-auto"
              style={revealIndex(index)}
            >
              <div className="rounded-[26px] bg-black p-3 ring-1 ring-inset ring-black/5 dark:ring-white/10">
                <div className="@container grid grid-cols-3 gap-1.5" aria-hidden="true">
                  {POSITION.map((mark, i) => (
                    <span
                      key={i}
                      className="grid aspect-square place-items-center rounded-[22%] bg-[#1C1C1E] font-display font-semibold leading-none"
                      style={{ color: mark === "X" ? theme.x : theme.o, fontSize: "17cqw" }}
                    >
                      {mark}
                    </span>
                  ))}
                </div>
              </div>
              <p className="mt-4 px-1 font-display text-lg font-semibold tracking-[-0.01em]">{theme.name}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
