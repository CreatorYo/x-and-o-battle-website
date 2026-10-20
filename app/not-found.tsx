import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { NotFoundContent } from "@/components/not-found-content";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <NotFoundContent />
      <Footer />
    </>
  );
}
