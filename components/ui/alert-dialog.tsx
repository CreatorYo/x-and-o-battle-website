"use client";

import type { ComponentProps } from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { DialogSurface, dialogContentClass, dialogOverlayClass } from "@/components/ui/dialog";

const AlertDialog = AlertDialogPrimitive.Root;

function AlertDialogContent({
  className,
  children,
  onOverlayClick,
  ...props
}: ComponentProps<typeof AlertDialogPrimitive.Content> & { onOverlayClick?: () => void }) {
  return (
    <AlertDialogPrimitive.Portal>
      <AlertDialogPrimitive.Overlay className={dialogOverlayClass} onClick={onOverlayClick} />
      <AlertDialogPrimitive.Content className={cn(dialogContentClass, className)} {...props}>
        <DialogSurface>{children}</DialogSurface>
      </AlertDialogPrimitive.Content>
    </AlertDialogPrimitive.Portal>
  );
}

function AlertDialogTitle({ className, ...props }: ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      className={cn("font-display text-[24px] font-semibold leading-[1.15] tracking-[-0.02em]", className)}
      {...props}
    />
  );
}

function AlertDialogDescription({ className, ...props }: ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      className={cn("text-[15px] leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  );
}

function AlertDialogAction({ className, ...props }: ComponentProps<typeof AlertDialogPrimitive.Action>) {
  return <AlertDialogPrimitive.Action className={cn(buttonVariants(), className)} {...props} />;
}

function AlertDialogCancel({ className, ...props }: ComponentProps<typeof AlertDialogPrimitive.Cancel>) {
  return <AlertDialogPrimitive.Cancel className={cn(buttonVariants({ variant: "outline" }), className)} {...props} />;
}

export {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
