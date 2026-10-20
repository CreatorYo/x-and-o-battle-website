import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FeedbackForm } from "./feedback-form";

export const metadata: Metadata = {
  title: "Submit Feedback",
};

export default function SubmitFeedbackPage() {
  return (
    <>
      <Navbar />
      <main className="shell pb-24 pt-32 sm:pb-32 sm:pt-40">
        <FeedbackForm />
      </main>
      <Footer />
    </>
  );
}
