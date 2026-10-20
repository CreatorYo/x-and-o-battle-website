import { Bug, Globe, Layers, Lightbulb, MessageSquare, Smartphone } from "lucide-react";

export const CATEGORIES = [
  {
    value: "Bug Report",
    Icon: Bug,
    placeholder: "What happened, what you expected, and how to make it happen again...",
    tone: {
      accent: "text-red-600 dark:text-red-400",
      button: "bg-red-600 text-white hover:bg-red-600/90 dark:bg-red-500 dark:hover:bg-red-500/90",
      focus:
        "focus-visible:border-red-500/60 focus-visible:ring-red-500/40 data-[state=open]:border-red-500/60 data-[state=open]:ring-red-500/40",
    },
  },
  {
    value: "Feature Request",
    Icon: Lightbulb,
    placeholder: "Describe your idea, why it helps, and how you imagine it working...",
    tone: {
      accent: "text-yellow-600 dark:text-yellow-400",
      button: "bg-yellow-500 text-black hover:bg-yellow-500/90",
      focus:
        "focus-visible:border-yellow-500/60 focus-visible:ring-yellow-500/40 data-[state=open]:border-yellow-500/60 data-[state=open]:ring-yellow-500/40",
    },
  },
  {
    value: "General Feedback",
    Icon: MessageSquare,
    placeholder: "Tell us what you think...",
    tone: {
      accent: "text-primary",
      button: "bg-primary text-primary-foreground hover:bg-primary/90",
      focus:
        "focus-visible:border-primary/60 focus-visible:ring-primary/40 data-[state=open]:border-primary/60 data-[state=open]:ring-primary/40",
    },
  },
] as const;

export type Tone = (typeof CATEGORIES)[number]["tone"];

export const DEFAULT_TONE: Tone = CATEGORIES[2].tone;

export const PLATFORMS = [
  { value: "app", label: "App", Icon: Smartphone },
  { value: "web", label: "Web", Icon: Globe },
  { value: "both", label: "Both", Icon: Layers },
] as const;
