"use client";

import type { ComponentProps } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { cn, fieldSurface } from "@/lib/utils";

const Select = SelectPrimitive.Root;

const SelectValue = SelectPrimitive.Value;

function SelectTrigger({ className, children, ...props }: ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        "group flex h-12 items-center justify-between gap-3 text-left hover:border-foreground/20 data-placeholder:text-muted-foreground data-[state=open]:border-ring/60 data-[state=open]:ring-1 data-[state=open]:ring-ring/40 [&>span]:flex [&>span]:min-w-0 [&>span]:items-center [&>span]:gap-2.5 [&>span]:truncate",
        fieldSurface,
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({ className, children, ...props }: ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        position="popper"
        sideOffset={6}
        className={cn(
          "relative z-50 max-h-(--radix-select-content-available-height) w-(--radix-select-trigger-width) overflow-hidden rounded-xl border border-border bg-background shadow-[0_12px_32px_-12px_rgb(0_0_0/0.25)] dark:bg-[#161618] dark:shadow-[0_16px_40px_-12px_rgb(0_0_0/0.9)] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[side=bottom]:slide-in-from-top-1 data-[side=top]:slide-in-from-bottom-1",
          className
        )}
        {...props}
      >
        <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectItem({
  className,
  indicatorClassName,
  children,
  ...props
}: ComponentProps<typeof SelectPrimitive.Item> & { indicatorClassName?: string }) {
  return (
    <SelectPrimitive.Item
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-lg py-2.5 pl-3 pr-9 text-[15px] outline-hidden transition-colors data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-foreground/6 data-[state=checked]:font-medium",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>
        <span className="flex items-center gap-2.5">{children}</span>
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className={cn("absolute right-3 flex items-center", indicatorClassName)}>
        <Check className="size-4" strokeWidth={2.5} />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}

export { Select, SelectValue, SelectTrigger, SelectContent, SelectItem };
