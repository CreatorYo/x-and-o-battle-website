import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const VARIANTS = {
  default: "shine bg-primary text-primary-foreground hover:bg-primary/90",
  outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
};

type ButtonVariant = keyof typeof VARIANTS;

function buttonVariants({ variant = "default", className }: { variant?: ButtonVariant; className?: string } = {}) {
  return cn(
    "inline-flex h-10 items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    VARIANTS[variant],
    className
  );
}

function Button({ className, variant, ...props }: ComponentProps<"button"> & { variant?: ButtonVariant }) {
  return <button className={buttonVariants({ variant, className })} {...props} />;
}

export { Button, buttonVariants };
