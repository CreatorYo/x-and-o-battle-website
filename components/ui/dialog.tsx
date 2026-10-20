"use client";

import type { ComponentProps, ReactNode } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

const dialogOverlayClass =
  "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-dialog-in data-[state=closed]:animate-dialog-out";

const dialogContentClass =
  "group/dialog fixed inset-0 z-50 m-auto flex h-fit max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-[480px] flex-col outline-hidden data-[state=open]:animate-dialog-in data-[state=closed]:animate-dialog-out";

function DialogSurface({ children }: { children: ReactNode }) {
  return (
    <>
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-[28px] border border-border bg-background shadow-lg duration-200 ease-out group-data-[state=open]/dialog:animate-in group-data-[state=open]/dialog:zoom-in-95 group-data-[state=closed]/dialog:animate-out group-data-[state=closed]/dialog:zoom-out-95"
      />
      <div className="relative min-h-0 overflow-y-auto overscroll-contain rounded-[28px] p-7 sm:p-8">{children}</div>
    </>
  );
}

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogClose = DialogPrimitive.Close;

function DialogContent({ className, children, ...props }: ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={dialogOverlayClass} />
      <DialogPrimitive.Content className={cn(dialogContentClass, className)} {...props}>
        <DialogSurface>{children}</DialogSurface>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

function DialogTitle({ className, ...props }: ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      className={cn("font-display text-[24px] font-semibold leading-[1.15] tracking-[-0.02em]", className)}
      {...props}
    />
  );
}

function DialogDescription({ className, ...props }: ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      className={cn("text-[15px] leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogSurface,
  dialogOverlayClass,
  dialogContentClass,
};
