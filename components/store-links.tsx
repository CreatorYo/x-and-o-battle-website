"use client";

import Image from "next/image";
import { useRef, useState, type ReactNode } from "react";
import { ChevronRight, QrCode } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { buttonVariants } from "@/components/ui/button";
import { AppleIcon, WindowsIcon } from "@/components/brand-icons";
import { APP_STORE_URL, LOGO_URL, MICROSOFT_STORE_URL, WEB_APP_URL } from "@/lib/links";
import { cn } from "@/lib/utils";

const focusRing =
  "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const appStoreSegment =
  "shine bg-primary text-primary-foreground transition-[filter] duration-200 hover:brightness-110 focus-visible:z-10";

const dialogButton = "h-12 w-full rounded-full text-[15px] font-semibold";

const secondaryDialogButton = "border-0 bg-secondary text-foreground hover:bg-border/70 hover:text-foreground";

export function AppStoreButton({ className, qrCode }: { className?: string; qrCode?: ReactNode }) {
  return (
    <div className={cn("inline-flex h-[54px] shrink-0", className)}>
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "flex flex-1 items-center justify-center gap-3 whitespace-nowrap rounded-full pl-5 pr-6",
          qrCode && "lg:rounded-r-none",
          appStoreSegment,
          focusRing
        )}
      >
        <AppleIcon className="-mt-1 h-[22px] w-auto shrink-0" />
        <span className="flex flex-col items-start leading-none">
          <span className="text-[11px] font-medium opacity-80">Download on the</span>{" "}
          <span className="mt-[3px] font-display text-[19px] font-bold tracking-[-0.015em]">App Store</span>
        </span>
      </a>
      {qrCode && <AppStoreQrDialog qrCode={qrCode} />}
    </div>
  );
}

function AppStoreQrDialog({ qrCode }: { qrCode: ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger
        aria-label="Show QR code to download on iPhone"
        title="Scan to download on iPhone"
        className={cn(
          "hidden w-[52px] place-items-center rounded-r-full border-l border-primary-foreground/20 lg:grid",
          appStoreSegment,
          focusRing
        )}
      >
        <QrCode className="size-5" />
      </DialogTrigger>
      <DialogContent className="max-w-[360px] text-center">
        <div className="mx-auto w-fit rounded-[20px] bg-white p-3 ring-1 ring-border dark:ring-0">{qrCode}</div>
        <DialogTitle className="mt-7">Scan to download</DialogTitle>
        <DialogDescription className="mx-auto mt-2 max-w-[17rem]">
          Point your iPhone camera at the code to open X&amp;O Battle on the App Store.
        </DialogDescription>
        <DialogClose className={cn(buttonVariants({ variant: "outline" }), dialogButton, secondaryDialogButton, "mt-8")}>
          Done
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export function StoreActions({ className, qrCode }: { className?: string; qrCode?: ReactNode }) {
  return (
    <div className={cn("flex w-full flex-col items-center justify-center gap-2 sm:w-auto sm:flex-row", className)}>
      <AppStoreButton className="w-full max-w-[320px] sm:w-auto" qrCode={qrCode} />
      <WebAppLink className="inline-flex h-[54px] w-full max-w-[320px] items-center justify-center gap-0.5 rounded-full px-6 text-[15px] font-semibold transition-opacity hover:opacity-70 sm:w-auto">
        Play on the web
        <ChevronRight className="size-4" />
      </WebAppLink>
    </div>
  );
}

export function WebAppLink({ className, children }: { className?: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <a
        ref={linkRef}
        href={WEB_APP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(focusRing, className)}
        onClick={(e) => {
          if (/Windows/i.test(navigator.userAgent)) {
            e.preventDefault();
            setOpen(true);
          }
        }}
      >
        {children}
      </a>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent
          ref={contentRef}
          onOverlayClick={() => setOpen(false)}
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            contentRef.current?.focus();
          }}
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            linkRef.current?.focus();
          }}
          className="max-w-[420px]"
        >
          <Image src={LOGO_URL} alt="" width={48} height={48} className="block size-12" />
          <AlertDialogTitle className="mt-6">X&O Battle is also on the Microsoft Store</AlertDialogTitle>
          <AlertDialogDescription className="mt-3">
            The Windows app has all the same features as the web version. Or, if you&apos;d rather, keep playing in your
            browser.
          </AlertDialogDescription>
          <div className="mt-8 flex flex-col gap-2">
            <AlertDialogAction asChild className={cn(dialogButton, "shine gap-2.5 transition-[filter] hover:bg-primary hover:brightness-110")}>
              <a href={MICROSOFT_STORE_URL} target="_blank" rel="noopener noreferrer">
                <WindowsIcon className="size-4 shrink-0" />
                Get it from Microsoft Store
              </a>
            </AlertDialogAction>
            <AlertDialogCancel asChild className={cn(dialogButton, secondaryDialogButton)}>
              <a href={WEB_APP_URL} target="_blank" rel="noopener noreferrer">
                Continue in browser
              </a>
            </AlertDialogCancel>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
