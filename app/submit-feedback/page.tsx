"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowRight, Bug, Lightbulb, MessageSquare, Smartphone, Globe, Layers } from "lucide-react";

const feedbackSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title must be less than 200 characters"),
  description: z.string().min(1, "Description is required").max(1800, "Description must be less than 1800 characters"),
  category: z.enum(["Bug Report", "Feature Request", "General Feedback"], {
    required_error: "Please select a category",
  }),
  device: z.string().optional(),
  platform: z.enum(["app", "web", "both"], {
    required_error: "Please select which platform",
  }),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

export default function SubmitFeedbackPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formKey, setFormKey] = useState(0);
  const { toast } = useToast();

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

  const selectedCategory = form.watch("category");


  const onSubmit = async (data: FeedbackFormValues) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/submit-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const contentType = response.headers.get("content-type");
      let responseData;
      
      if (contentType && contentType.includes("application/json")) {
        responseData = await response.json();
      } else {
        throw new Error("Server error. Please try again later.");
      }

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to submit feedback");
      }

      toast({
        title: "Feedback submitted!",
        description: "Thank you for your feedback. We'll review it soon.",
        variant: "success",
      });

      form.reset({
        title: "",
        description: "",
        category: undefined,
        device: "",
        platform: undefined,
      }, {
        keepDefaultValues: false,
        keepErrors: false,
        keepDirty: false,
        keepIsSubmitted: false,
        keepTouched: false,
        keepIsValid: false,
        keepSubmitCount: false,
      });
      
      form.setValue("category", undefined as any);
      form.setValue("platform", undefined as any);
      
      setFormKey(prev => prev + 1);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to submit feedback. Please try again later.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className={`container mx-auto px-4 pt-24 pb-20 max-w-2xl ${selectedCategory === "Bug Report" ? "md:pt-32" : "md:pt-40"}`}>
        <div className="space-y-8">
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">
              Submit <span className="text-primary">Feedback</span>
            </h1>
            <p className="text-base text-muted-foreground">
              We'd love to hear your thoughts, suggestions, or report any issues you've encountered.
            </p>
          </div>
          
          <Form {...form} key={formKey}>
              <form 
                onSubmit={form.handleSubmit(onSubmit)} 
                className="space-y-8"
              >
                {/* Basic Information Group */}
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                          <div className="flex justify-between items-center mb-2">
                            <FormLabel className="text-sm font-medium">Title <span className="text-destructive dark:text-red-400">*</span></FormLabel>
                            {focusedField === "title" && (() => {
                              const length = field.value?.length || 0;
                              const maxLength = 200;
                              const isAtLimit = length >= maxLength;
                              const isClose = length >= 180 && !isAtLimit;
                              const colorClass = isAtLimit 
                                ? "text-destructive dark:text-red-400" 
                                : isClose 
                                ? "text-orange-600 dark:text-yellow-500" 
                                : "text-muted-foreground";
                              return (
                                <span className={`text-xs ${colorClass}`}>
                                  {length}/{maxLength}
                                </span>
                              );
                            })()}
                          </div>
                        <FormControl>
                          <Input
                            placeholder="Enter a brief summary"
                            className="h-11 border-border/50 bg-background"
                            style={{ borderRadius: '0.5rem' }}
                            {...field}
                            disabled={isSubmitting}
                            maxLength={200}
                            onFocus={() => setFocusedField("title")}
                            onBlur={() => setFocusedField(null)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium mb-2">Category <span className="text-destructive dark:text-red-400">*</span></FormLabel>
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value);
                              if (value !== "Bug Report") {
                                form.setValue("device", "");
                              }
                            }}
                            value={field.value || ""}
                            disabled={isSubmitting}
                          >
                            <FormControl>
                              <SelectTrigger 
                                className="h-11 border-border/50 bg-background font-medium"
                                style={{ borderRadius: '0.5rem' }}
                              >
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-lg shadow-xl">
                              <SelectItem value="Bug Report">
                                <div className="flex items-center gap-2">
                                  <Bug className="h-4 w-4" />
                                  <span>Bug Report</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="Feature Request">
                                <div className="flex items-center gap-2">
                                  <Lightbulb className="h-4 w-4" />
                                  <span>Feature Request</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="General Feedback">
                                <div className="flex items-center gap-2">
                                  <MessageSquare className="h-4 w-4" />
                                  <span>General Feedback</span>
                                </div>
                              </SelectItem>
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
                          <FormLabel className="text-sm font-medium mb-2">Which platform? <span className="text-destructive dark:text-red-400">*</span></FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value || ""}
                            disabled={isSubmitting}
                          >
                            <FormControl>
                              <SelectTrigger 
                                className="h-11 border-border/50 bg-background font-medium"
                                style={{ borderRadius: '0.5rem' }}
                              >
                                <SelectValue placeholder="Select which platform" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-lg shadow-xl">
                              <SelectItem value="app">
                                <div className="flex items-center gap-2">
                                  <Smartphone className="h-4 w-4" />
                                  <span>App</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="web">
                                <div className="flex items-center gap-2">
                                  <Globe className="h-4 w-4" />
                                  <span>Web</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="both">
                                <div className="flex items-center gap-2">
                                  <Layers className="h-4 w-4" />
                                  <span>Both</span>
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {selectedCategory === "Bug Report" && (
                    <FormField
                      control={form.control}
                      name="device"
                      render={({ field }) => (
                        <FormItem>
                            <div className="flex justify-between items-center mb-2">
                              <FormLabel className="text-sm font-medium">Device (optional)</FormLabel>
                              {focusedField === "device" && (() => {
                                const length = field.value?.length || 0;
                                const maxLength = 50;
                                const isAtLimit = length >= maxLength;
                                const isClose = length >= maxLength * 0.8 && !isAtLimit;
                                const colorClass = isAtLimit 
                                  ? "text-destructive dark:text-red-400" 
                                  : isClose 
                                  ? "text-orange-600 dark:text-yellow-500" 
                                  : "text-muted-foreground";
                                return (
                                  <span className={`text-xs ${colorClass}`}>
                                    {length}/{maxLength}
                                  </span>
                                );
                              })()}
                            </div>
                          <FormControl>
                            <Input
                              placeholder="e.g., iPhone 14, iPad Pro"
                              className="h-11 border-border/50 bg-background"
                              style={{ borderRadius: '0.5rem' }}
                              {...field}
                              disabled={isSubmitting}
                              maxLength={50}
                              onFocus={() => setFocusedField("device")}
                              onBlur={() => setFocusedField(null)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>

                {/* Description Group */}
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                          <div className="flex justify-between items-center mb-2">
                            <FormLabel className="text-sm font-medium">Description <span className="text-destructive dark:text-red-400">*</span></FormLabel>
                            {focusedField === "description" && (() => {
                              const length = field.value?.length || 0;
                              const maxLength = 1800;
                              const isAtLimit = length >= maxLength;
                              const isClose = length >= 1600 && !isAtLimit;
                              const colorClass = isAtLimit 
                                ? "text-destructive dark:text-red-400" 
                                : isClose 
                                ? "text-orange-600 dark:text-yellow-500" 
                                : "text-muted-foreground";
                              return (
                                <span className={`text-xs ${colorClass}`}>
                                  {length}/{maxLength}
                                </span>
                              );
                            })()}
                          </div>
                        <FormControl>
                          <div className="relative">
                            <Textarea
                              {...field}
                              ref={(el) => {
                                field.ref(el);
                                if (el) {
                                  el.style.height = 'auto';
                                  el.style.height = `${Math.min(el.scrollHeight, 400)}px`;
                                  
                                  const mask = el.nextElementSibling as HTMLElement;
                                  if (mask) {
                                    const isScrollable = el.scrollHeight > el.clientHeight;
                                    const isAtBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 1;
                                    mask.style.opacity = isScrollable && !isAtBottom ? '1' : '0';
                                  }
                                }
                              }}
                              placeholder={selectedCategory === "Bug Report" 
                                ? "What happened, what you expected, and how to make it happen again." 
                                : "Please provide detailed information about your feedback..."}
                              className="min-h-[180px] max-h-[400px] resize-none border-border/50 bg-background overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-muted-foreground/30 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-muted-foreground/50"
                              style={{ borderRadius: '0.5rem' }}
                              disabled={isSubmitting}
                              maxLength={1800}
                              onFocus={() => setFocusedField("description")}
                              onBlur={() => setFocusedField(null)}
                              onScroll={(e) => {
                                const target = e.target as HTMLTextAreaElement;
                                const mask = target.nextElementSibling as HTMLElement;
                                if (mask) {
                                  const isScrollable = target.scrollHeight > target.clientHeight;
                                  const isAtBottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 1;
                                  mask.style.opacity = isScrollable && !isAtBottom ? '1' : '0';
                                }
                              }}
                              onChange={(e) => {
                                field.onChange(e);
                                const target = e.target as HTMLTextAreaElement;
                                
                                target.style.height = 'auto';
                                target.style.height = `${Math.min(target.scrollHeight, 400)}px`;
                                
                                const cursorPosition = target.selectionStart;
                                const textLength = target.value.length;
                                const isTypingAtEnd = cursorPosition >= textLength - 1;
                                
                                setTimeout(() => {
                                  const mask = target.nextElementSibling as HTMLElement;
                                  if (mask) {
                                    const isScrollable = target.scrollHeight > target.clientHeight;
                                    
                                    if (isTypingAtEnd && isScrollable) {
                                      target.scrollTop = target.scrollHeight;
                                    }
                                    
                                    const isAtBottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 1;
                                    mask.style.opacity = isScrollable && !isAtBottom ? '1' : '0';
                                  }
                                }, 0);
                              }}
                            />
                            <div 
                              className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none transition-opacity duration-200"
                              style={{
                                background: 'linear-gradient(to bottom, transparent, hsl(var(--background)))',
                                borderRadius: '0 0 0.5rem 0.5rem',
                                opacity: '0'
                              }}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                        <p className="text-xs text-muted-foreground leading-relaxed mt-2">
                          We only include the information you enter and a timestamp when feedback is sent. Please avoid sharing any personal or sensitive information.{" "}
                          <Dialog>
                            <DialogTrigger asChild>
                              <button
                                type="button"
                                className="text-blue-500 dark:text-blue-300 hover:underline inline"
                              >
                                Learn more
                              </button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle className="text-xl font-semibold">Privacy Information</DialogTitle>
                                <DialogDescription className="pt-4 space-y-4 text-left">
                                  <p className="text-sm text-foreground/80 dark:text-foreground/70 leading-relaxed">
                                    When you submit feedback through this form, we collect and process the following information:
                                  </p>
                                  <ul className="list-disc list-inside space-y-2 text-sm text-foreground/80 dark:text-foreground/70 leading-relaxed pl-2 [&>li::marker]:text-blue-600 dark:[&>li::marker]:text-blue-500">
                                    <li>The title, description, and category you provide in the form</li>
                                    <li>A timestamp indicating when the feedback was submitted</li>
                                  </ul>
                                  <p className="text-sm text-foreground/80 dark:text-foreground/70 leading-relaxed">
                                    We do not collect, store, or process any personal information. The feedback is sent directly to our team for review purposes only.
                                  </p>
                                  <p className="text-sm text-foreground/80 dark:text-foreground/70 font-medium leading-relaxed">
                                    Please avoid sharing any personal or sensitive information in your feedback, as it will be visible to our team members who review submissions.
                                  </p>
                                </DialogDescription>
                              </DialogHeader>
                            </DialogContent>
                          </Dialog>
                        </p>
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  className="h-11 px-6 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  style={{ borderRadius: '0.5rem' }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
        </div>
      </div>
      <Footer />
    </main>
  );
}

