"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CircleCheck, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DESCRIPTION_MAX, DEVICE_MAX, TITLE_MAX } from "@/lib/feedback";
import { cn } from "@/lib/utils";
import { CharCount } from "./char-count";
import { CATEGORIES, DEFAULT_TONE, PLATFORMS } from "./feedback-options";
import { feedbackSchema, type FeedbackFormValues } from "./feedback-schema";
import { PrivacyDialog } from "./privacy-dialog";

const TEXTAREA_MAX_HEIGHT = 400;

function fitTextarea(textarea: HTMLTextAreaElement) {
  textarea.style.height = "auto";
  const borders = textarea.offsetHeight - textarea.clientHeight;
  textarea.style.height = `${Math.min(textarea.scrollHeight + borders, TEXTAREA_MAX_HEIGHT)}px`;
}

function errorMessage(error: unknown) {
  if (error instanceof TypeError) return "Couldn't reach the server. Check your connection and try again.";
  if (error instanceof Error && error.message) return error.message;
  return "Failed to submit feedback. Please try again later.";
}

export function FeedbackForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      title: "",
      description: "",
      category: undefined,
      device: "",
      platform: undefined,
    },
  });

  const selectedCategory = useWatch({ control: form.control, name: "category" });
  const category = CATEGORIES.find((option) => option.value === selectedCategory);
  const tone = category?.tone ?? DEFAULT_TONE;
  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (data: FeedbackFormValues) => {
    setSubmitError(null);

    try {
      const response = await fetch("/api/submit-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const body: { error?: string } = response.headers.get("content-type")?.includes("application/json")
        ? await response.json().catch(() => ({}))
        : {};

      if (!response.ok) {
        throw new Error(body.error || "Failed to submit feedback. Please try again later.");
      }

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setSubmitError(errorMessage(error));
    }
  };

  const startOver = () => {
    form.reset();
    setSubmitError(null);
    setSubmitted(false);
  };

  return (
    <div className="mx-auto max-w-[640px]">
      <h1 className="font-display text-[length:clamp(2rem,11vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.035em] sm:text-[52px]">
        Submit <span className={cn("transition-colors duration-300", tone.accent)}>Feedback</span>
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-muted-foreground sm:mt-6">
        Share your thoughts and ideas, or let us know about any issues you&apos;ve run into.
      </p>

      {submitted ? (
        <div role="status" className="mt-12 rounded-3xl bg-secondary px-6 py-14 text-center sm:px-12 sm:py-20">
          <CircleCheck className={cn("mx-auto size-12", tone.accent)} strokeWidth={1.5} />
          <h2 className="mt-8 font-display text-[length:clamp(1.25rem,6.4vw,1.5rem)] font-semibold leading-tight tracking-[-0.02em] sm:text-[30px]">
            Thanks for your feedback
          </h2>
          <p className="mx-auto mt-5 max-w-sm text-[17px] leading-relaxed text-muted-foreground">
            We&apos;ll review it soon.
          </p>
          <Button type="button" variant="outline" onClick={startOver} className="mt-12 h-12 rounded-full px-7 text-[15px]">
            Send more feedback
          </Button>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="mt-10 space-y-6">
            <div className="grid gap-6 sm:grid-cols-2 sm:gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      value={field.value ?? ""}
                      onValueChange={(value) => {
                        field.onChange(value);
                        if (value !== "Bug Report") form.setValue("device", "");
                      }}
                      disabled={isSubmitting}
                    >
                      <FormControl>
                        <SelectTrigger ref={field.ref} onBlur={field.onBlur} className={tone.focus}>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CATEGORIES.map(({ value, Icon, tone: itemTone }) => (
                          <SelectItem key={value} value={value} indicatorClassName={itemTone.accent}>
                            <Icon className={cn("size-4 shrink-0", itemTone.accent)} />
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="platform"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Which platform?</FormLabel>
                    <Select value={field.value ?? ""} onValueChange={field.onChange} disabled={isSubmitting}>
                      <FormControl>
                        <SelectTrigger ref={field.ref} onBlur={field.onBlur} className={tone.focus}>
                          <SelectValue placeholder="Select which platform" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {PLATFORMS.map(({ value, label, Icon }) => (
                          <SelectItem key={value} value={value} indicatorClassName={tone.accent}>
                            <Icon className={cn("size-4 shrink-0 transition-colors", tone.accent)} />
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-baseline justify-between gap-4">
                    <FormLabel>Title</FormLabel>
                    <CharCount length={field.value.length} max={TITLE_MAX} warnAt={180} />
                  </div>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="A short summary"
                      maxLength={TITLE_MAX}
                      disabled={isSubmitting}
                      className={tone.focus}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedCategory === "Bug Report" && (
              <div className="animate-in fade-in-0 duration-300">
                <FormField
                  control={form.control}
                  name="device"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-baseline justify-between gap-4">
                        <FormLabel>
                          Device <span className="font-normal text-muted-foreground">(optional)</span>
                        </FormLabel>
                        <CharCount length={field.value?.length ?? 0} max={DEVICE_MAX} warnAt={40} />
                      </div>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="e.g. iPhone 15, iPad Pro"
                          maxLength={DEVICE_MAX}
                          disabled={isSubmitting}
                          className={tone.focus}
                        />
                      </FormControl>
                      <p className="text-[13px] text-muted-foreground">
                        Helps us track down crashes and display issues.
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-baseline justify-between gap-4">
                    <FormLabel>Description</FormLabel>
                    <CharCount length={field.value.length} max={DESCRIPTION_MAX} warnAt={1600} />
                  </div>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={category?.placeholder ?? "Tell us what you think..."}
                      maxLength={DESCRIPTION_MAX}
                      disabled={isSubmitting}
                      onChange={(e) => {
                        field.onChange(e);
                        fitTextarea(e.currentTarget);
                      }}
                      className={cn("min-h-[180px] resize-none leading-relaxed", tone.focus)}
                    />
                  </FormControl>
                  <FormMessage />
                  <p className="text-[13px] leading-relaxed text-muted-foreground">
                    We only receive what you enter here and the time it was sent, so please don&apos;t include personal
                    or sensitive information. <PrivacyDialog tone={tone} />
                  </p>
                </FormItem>
              )}
            />

            {submitError && (
              <p
                role="alert"
                className="rounded-xl bg-red-500/10 px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400"
              >
                {submitError}
              </p>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className={cn("h-12 w-full gap-2 rounded-full px-7 text-[15px] font-semibold sm:w-auto", tone.button)}
            >
              {isSubmitting ? (
                <>
                  <Loader className="size-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send feedback
                  <ArrowRight className="size-4" />
                </>
              )}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}
