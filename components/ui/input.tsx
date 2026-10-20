import type { ComponentProps } from "react";
import { cn, fieldSurface } from "@/lib/utils";

function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn("flex h-12", fieldSurface, className)} {...props} />;
}

export { Input };
