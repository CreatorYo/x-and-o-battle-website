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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { Loader, ArrowRight, Bug, Lightbulb, MessageSquare, Smartphone, Globe, Layers, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const isOnlyWhitespace = (str: string): boolean => {
  if (!str || str.length === 0) return true;
  
  const cleaned = str.replace(/[\s\u00A0\u200B-\u200D\uFEFF\u2060\u200E\u200F\u202A-\u202E]/g, '');
  return cleaned.length === 0;
};

const feedbackSchema = z.object({
  title: z.string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters")
    .refine((val) => !isOnlyWhitespace(val), "Title cannot be only whitespace"),
  description: z.string()
    .min(1, "Description is required")
    .max(1800, "Description must be less than 1800 characters")
    .refine((val) => !isOnlyWhitespace(val), "Description cannot be only whitespace"),
  category: z.enum(["Bug Report", "Feature Request", "General Feedback"], {
    required_error: "Please select a category",
  }),
  device: z.string()
    .optional()
    .refine((val) => !val || !isOnlyWhitespace(val), "Device cannot be only whitespace"),
  platform: z.enum(["app", "web", "both"], {
    required_error: "Please select which platform",
  }),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

export default function SubmitFeedbackPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formKey, setFormKey] = useState(0);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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

  const getCategoryColors = () => {
    if (selectedCategory === "Bug Report") {
      return {
        text: "text-destructive dark:text-red-400",
        hover: "hover:bg-red-100 dark:hover:bg-red-950/40",
        focus: "focus:bg-red-100 dark:focus:bg-red-950/40",
        focusRing: "focus-visible:outline-none focus-visible:border-red-500/60 focus-visible:ring-1 focus-visible:ring-red-500/40",
        focusRingDropdown: "focus:outline-none focus:border-red-500/60 focus:ring-1 focus:ring-red-500/40",
        bg: "bg-destructive hover:bg-destructive/90",
        focusRingButton: "focus:ring-destructive/50",
        checkmark: "[&>span:first-child_svg]:!text-destructive [&>span:first-child_svg]:dark:!text-red-400",
        buttonText: "text-white",
        marker: "[&>li::marker]:text-destructive dark:[&>li::marker]:text-red-400",
      };
    }
    if (selectedCategory === "Feature Request") {
      return {
        text: "text-yellow-600 dark:text-yellow-500",
        hover: "hover:bg-yellow-100 dark:hover:bg-yellow-950/40",
        focus: "focus:bg-yellow-100 dark:focus:bg-yellow-950/40",
        focusRing: "focus-visible:outline-none focus-visible:border-yellow-500/60 focus-visible:ring-1 focus-visible:ring-yellow-500/40",
        focusRingDropdown: "focus:outline-none focus:border-yellow-500/60 focus:ring-1 focus:ring-yellow-500/40",
        bg: "bg-yellow-600 hover:bg-yellow-600/90 dark:bg-yellow-500 dark:hover:bg-yellow-500/90",
        focusRingButton: "focus:ring-yellow-500/50",
        checkmark: "[&>span:first-child_svg]:!text-yellow-600 [&>span:first-child_svg]:dark:!text-yellow-500",
        buttonText: "text-white dark:text-black",
        marker: "[&>li::marker]:text-yellow-600 dark:[&>li::marker]:text-yellow-500",
      };
    }
    if (selectedCategory === "General Feedback") {
      return {
        text: "text-blue-600 dark:text-blue-400",
        hover: "hover:bg-blue-100 dark:hover:bg-blue-950/40",
        focus: "focus:bg-blue-100 dark:focus:bg-blue-950/40",
        focusRing: "focus-visible:outline-none focus-visible:border-blue-500/60 focus-visible:ring-1 focus-visible:ring-blue-500/40",
        focusRingDropdown: "focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/40",
        bg: "bg-blue-600 hover:bg-blue-600/90 dark:bg-blue-500 dark:hover:bg-blue-500/90",
        focusRingButton: "focus:ring-blue-500/50",
        checkmark: "[&>span:first-child_svg]:!text-blue-600 [&>span:first-child_svg]:dark:!text-blue-400",
        buttonText: "text-white",
        marker: "[&>li::marker]:text-blue-600 dark:[&>li::marker]:text-blue-400",
      };
    }
    return {
      text: "text-primary",
      hover: "hover:bg-primary/10 dark:hover:bg-primary/20",
      focus: "focus:bg-primary/10 dark:focus:bg-primary/20",
      focusRing: "focus-visible:outline-none focus-visible:border-ring/60 focus-visible:ring-1 focus-visible:ring-ring/40",
      focusRingDropdown: "focus:outline-none focus:border-ring/60 focus:ring-1 focus:ring-ring/40",
      bg: "bg-primary hover:bg-primary/90",
      focusRingButton: "focus:ring-primary/50",
      checkmark: "",
      buttonText: "text-white",
      marker: "[&>li::marker]:text-blue-600 dark:[&>li::marker]:text-blue-500",
    };
  };

  const categoryColors = getCategoryColors();

  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 768;
      
      if (isDesktop) {
        if (isSheetOpen) {
          setIsSheetOpen(false);
          setIsDialogOpen(true);
        }
      } else {
        if (isDialogOpen) {
          setIsDialogOpen(false);
          setIsSheetOpen(true);
        }
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isSheetOpen, isDialogOpen]);


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
        duration: 5800,
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
        title: "Something went wrong",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen submit-feedback-page">
      <Navbar />
      <div className={`container mx-auto px-4 pt-24 pb-20 max-w-2xl ${selectedCategory === "Bug Report" ? "md:pt-32" : "md:pt-40"}`}>
        <div className="space-y-8">
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">
              Submit <span className={`transition-colors duration-200 ease-in-out ${categoryColors.text || "text-primary"}`}>Feedback</span>
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
                            className={`h-11 border-border/50 bg-background transition-colors ${categoryColors.focusRing}`}
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
                                className={`h-11 border-border/50 bg-background font-medium hover:bg-muted/30 transition-colors ${categoryColors.focusRingDropdown}`}
                                style={{ borderRadius: '0.5rem' }}
                              >
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-lg shadow-xl">
                              <SelectItem value="Bug Report" className="hover:bg-red-100 dark:hover:bg-red-950/40 focus:bg-red-100 dark:focus:bg-red-950/40 [&>span:first-child_svg]:!text-destructive [&>span:first-child_svg]:dark:!text-red-400">
                                <div className="flex items-center gap-2">
                                  <Bug className="h-4 w-4 text-destructive dark:text-red-400" />
                                  <span>Bug Report</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="Feature Request" className="hover:bg-yellow-100 dark:hover:bg-yellow-950/40 focus:bg-yellow-100 dark:focus:bg-yellow-950/40 [&>span:first-child_svg]:!text-yellow-600 [&>span:first-child_svg]:dark:!text-yellow-500">
                                <div className="flex items-center gap-2">
                                  <Lightbulb className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
                                  <span>Feature Request</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="General Feedback" className="hover:bg-blue-100 dark:hover:bg-blue-950/40 focus:bg-blue-100 dark:focus:bg-blue-950/40 [&>span:first-child_svg]:!text-blue-600 [&>span:first-child_svg]:dark:!text-blue-400">
                                <div className="flex items-center gap-2">
                                  <MessageSquare className="h-4 w-4 text-blue-600 dark:text-blue-400" />
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
                                className={`h-11 border-border/50 bg-background font-medium hover:bg-muted/30 transition-colors ${categoryColors.focusRingDropdown}`}
                                style={{ borderRadius: '0.5rem' }}
                              >
                                <SelectValue placeholder="Select which platform" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-lg shadow-xl">
                              <SelectItem value="app" className={`transition-colors ${categoryColors.hover} ${categoryColors.focus} ${categoryColors.checkmark || ""}`}>
                                <div className="flex items-center gap-2">
                                  <Smartphone className={`h-4 w-4 transition-colors ${categoryColors.text || "text-primary"}`} />
                                  <span>App</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="web" className={`transition-colors ${categoryColors.hover} ${categoryColors.focus} ${categoryColors.checkmark || ""}`}>
                                <div className="flex items-center gap-2">
                                  <Globe className={`h-4 w-4 transition-colors ${categoryColors.text || "text-primary"}`} />
                                  <span>Web</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="both" className={`transition-colors ${categoryColors.hover} ${categoryColors.focus} ${categoryColors.checkmark || ""}`}>
                                <div className="flex items-center gap-2">
                                  <Layers className={`h-4 w-4 transition-colors ${categoryColors.text || "text-primary"}`} />
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

                  <div 
                    className={`transition-all duration-300 ease-in-out ${
                      selectedCategory === "Bug Report" 
                        ? "max-h-32 opacity-100" 
                        : "max-h-0 opacity-0"
                    }`}
                    style={selectedCategory !== "Bug Report" ? { 
                      marginTop: 0, 
                      marginBottom: 0, 
                      paddingTop: 0, 
                      paddingBottom: 0,
                      height: 0,
                      overflow: 'hidden'
                    } : { 
                      overflow: 'visible'
                    }}
                  >
                    {selectedCategory === "Bug Report" && (
                      <FormField
                        control={form.control}
                        name="device"
                        render={({ field }) => (
                          <FormItem>
                              <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-2">
                                  <FormLabel className="text-sm font-medium">Device (optional)</FormLabel>
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Info className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors cursor-help" />
                                      </TooltipTrigger>
                                      <TooltipContent className="border-border/60 dark:border-border/40 bg-neutral-200 dark:bg-neutral-900 shadow-lg px-3 py-2 rounded-lg">
                                        <p className="max-w-xs text-sm leading-relaxed">This may help us if there was a crash or something didn't look right.</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </div>
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
                                className={`h-11 border-border/50 bg-background transition-colors ${categoryColors.focusRing}`}
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
                </div>

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
                              placeholder={
                                selectedCategory === "Bug Report" 
                                  ? "What happened, what you expected, and how to make it happen again..." 
                                  : selectedCategory === "Feature Request"
                                  ? "Please describe your idea, why it helps, and how you imagine it working..."
                                  : "Please provide detailed information about your feedback..."
                              }
                              className={`min-h-[180px] max-h-[400px] resize-none border-border/50 bg-background overflow-y-auto transition-colors ${categoryColors.focusRing} [&::-webkit-scrollbar]:hidden [-ms-overflow-style]:none [scrollbar-width]:none`}
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
                          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                            <SheetTrigger asChild>
                              <button
                                type="button"
                                className="text-blue-500 dark:text-blue-300 hover:underline inline md:hidden"
                              >
                                Learn more
                              </button>
                            </SheetTrigger>
                            <SheetContent side="bottom" className="max-h-[90vh] overflow-y-auto rounded-t-2xl border-t border-border/80 dark:border-border/60 backdrop-blur-md bg-background/95 [&>button]:outline-none [&>button]:ring-0 [&>button]:focus:ring-0">
                              <SheetHeader>
                                <SheetTitle className="text-xl font-semibold">Privacy Information</SheetTitle>
                                <div className="pt-4 space-y-4 text-left text-sm text-muted-foreground">
                                  <p className="text-sm text-foreground/80 dark:text-foreground/70 leading-relaxed">
                                    When you submit feedback through this form, we collect and process the following information:
                                  </p>
                                  <ul className={`list-disc list-inside space-y-2 text-sm text-foreground/80 dark:text-foreground/70 leading-relaxed pl-2 transition-colors ${categoryColors.marker || "[&>li::marker]:text-blue-600 dark:[&>li::marker]:text-blue-500"}`}>
                                    <li>The title, description, and category you provide in the form</li>
                                    <li>A timestamp indicating when the feedback was submitted</li>
                                  </ul>
                                  <p className="text-sm text-foreground/80 dark:text-foreground/70 leading-relaxed">
                                    We do not collect, store, or process any personal information. The feedback is sent directly to our team for review purposes only.
                                  </p>
                                  <p className="text-sm text-foreground/80 dark:text-foreground/70 font-medium leading-relaxed">
                                    Please avoid sharing any personal or sensitive information in your feedback, as it will be visible to our team members who review submissions.
                                  </p>
                                </div>
                              </SheetHeader>
                            </SheetContent>
                          </Sheet>
                          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild className="hidden md:inline">
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
                                <div className="pt-4 space-y-4 text-left text-sm text-muted-foreground">
                                  <p className="text-sm text-foreground/80 dark:text-foreground/70 leading-relaxed">
                                    When you submit feedback through this form, we collect and process the following information:
                                  </p>
                                  <ul className={`list-disc list-inside space-y-2 text-sm text-foreground/80 dark:text-foreground/70 leading-relaxed pl-2 transition-colors ${categoryColors.marker || "[&>li::marker]:text-blue-600 dark:[&>li::marker]:text-blue-500"}`}>
                                    <li>The title, description, and category you provide in the form</li>
                                    <li>A timestamp indicating when the feedback was submitted</li>
                                  </ul>
                                  <p className="text-sm text-foreground/80 dark:text-foreground/70 leading-relaxed">
                                    We do not collect, store, or process any personal information. The feedback is sent directly to our team for review purposes only.
                                  </p>
                                  <p className="text-sm text-foreground/80 dark:text-foreground/70 font-medium leading-relaxed">
                                    Please avoid sharing any personal or sensitive information in your feedback, as it will be visible to our team members who review submissions.
                                  </p>
                                </div>
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
                  className={`h-11 px-6 transition-all duration-200 ease-in-out ${categoryColors.buttonText || "text-white"} ${categoryColors.bg}`}
                  style={{ borderRadius: '0.5rem', marginTop: '1.3rem' }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
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

