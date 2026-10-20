import type { ComponentProps } from "react";
import { cn, fieldSurface } from "@/lib/utils";

function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea className={cn("flex min-h-[80px] py-3", fieldSurface, className)} {...props} />;
}

export { Textarea };
