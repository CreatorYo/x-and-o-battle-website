import type { ReactNode } from "react";
import Link from "next/link";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { BlurWords, revealIndex } from "@/components/blur-words";
import { APP_STORE_URL, MICROSOFT_STORE_URL, PRIVACY_URL, SUPPORT_EMAIL, WEB_APP_URL } from "@/lib/links";

const linkClass = "font-medium text-mark-x hover:underline hover:underline-offset-4";

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
      {children}
    </a>
  );
}

const faqs = [
  {
    question: "Where can I play X&O Battle?",
    answer: (
      <>
        On iPhone, download it from the <ExternalLink href={APP_STORE_URL}>App Store</ExternalLink>. On Windows, get it
        from the <ExternalLink href={MICROSOFT_STORE_URL}>Microsoft Store</ExternalLink>. Or play straight away in your
        browser at <ExternalLink href={WEB_APP_URL}>web.xoandbattle.com</ExternalLink>, with nothing to install.
      </>
    ),
  },
  {
    question: "How is my privacy protected?",
    answer: (
      <>
        There are no ads, and nothing you do in the game is tracked or sold. If you send us feedback, we only receive
        what you enter in the form and the time it was sent.{" "}
        <ExternalLink href={PRIVACY_URL}>Read our privacy policy</ExternalLink> for the full details.
      </>
    ),
  },
  {
    question: "Can I customise the look of the game?",
    answer:
      "Yes. There are five built-in themes to choose from: Classic, Modern, Neon, Minimal and Retro. You can also pick the accent colours you like and save them as your own preset, ready to switch back to at any time.",
  },
  {
    question: "Is my game data saved automatically?",
    answer:
      "Yes. Your achievements, settings and custom presets save as you play. There's nothing to set up, and everything is right where you left it the next time you open the game.",
  },
  {
    question: "Are achievements tracked within the game?",
    answer:
      "Yes. Achievements unlock as you play, and you can check which ones you've earned and how close you are to the rest at any time.",
  },
  {
    question: "Can I play against other people or only the computer?",
    answer:
      "Both. In Two Player mode, you and a friend take turns as X and O on the same device. In AI Mode you play against the computer, and you can adjust both its difficulty and how quickly it responds.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" data-nav-tone="band" className="scroll-mt-16 bg-band pb-28 pt-24 sm:pb-36 sm:pt-28">
      <div className="shell">
        <div className="mx-auto max-w-[760px]">
          <Reveal>
            <h2 className="text-center font-display text-[36px] font-semibold leading-[1.05] tracking-[-0.035em] sm:text-[52px]">
              <BlurWords text="Questions and answers" />
            </h2>
          </Reveal>

          <Reveal>
            <AccordionPrimitive.Root type="single" collapsible className="mt-14 sm:mt-16">
              {faqs.map((faq, i) => (
                <AccordionPrimitive.Item
                  key={faq.question}
                  value={faq.question}
                  className="reveal-item border-b border-border last:border-b-0"
                  style={revealIndex(i)}
                >
                  <AccordionPrimitive.Header>
                    <AccordionPrimitive.Trigger className="group flex w-full items-center justify-between gap-6 rounded-sm py-6 text-left focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring">
                      <span className="font-display text-lg font-medium tracking-[-0.01em] sm:text-xl">{faq.question}</span>
                      <ChevronDown className="size-5 shrink-0 text-muted-foreground transition-transform duration-300 group-data-[state=open]:rotate-180" />
                    </AccordionPrimitive.Trigger>
                  </AccordionPrimitive.Header>
                  <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-faq-close data-[state=open]:animate-faq-open">
                    <p className="pb-6 pr-10 text-[17px] leading-relaxed text-muted-foreground">{faq.answer}</p>
                  </AccordionPrimitive.Content>
                </AccordionPrimitive.Item>
              ))}
            </AccordionPrimitive.Root>

            <p className="reveal-item mt-10 text-center text-muted-foreground" style={revealIndex(faqs.length)}>
              Still have a question? Email{" "}
              <a href={`mailto:${SUPPORT_EMAIL}`} className={linkClass}>
                {SUPPORT_EMAIL}
              </a>{" "}
              or{" "}
              <Link href="/submit-feedback" className={linkClass}>
                send feedback
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
