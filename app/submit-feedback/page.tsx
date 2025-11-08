"use client";

import { useState } from "react";
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
import { Loader2, ArrowRight } from "lucide-react";

const feedbackSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title must be less than 200 characters"),
  description: z.string().min(1, "Description is required").max(2000, "Description must be less than 2000 characters"),
  category: z.enum(["Bug Report", "Feature Request", "General Feedback"], {
    required_error: "Please select a category",
  }),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

export default function SubmitFeedbackPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      title: "",
      description: "",
      category: undefined,
    },
  });


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

      form.reset();
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
      <div className="container mx-auto px-4 pt-32 pb-20 md:pt-40 max-w-2xl">
        <div className="space-y-8">
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">
              Submit <span className="text-primary">Feedback</span>
            </h1>
            <p className="text-base text-muted-foreground">
              We'd love to hear your thoughts, suggestions, or report any issues you've encountered.
            </p>
          </div>
          
          <Form {...form}>
              <form 
                onSubmit={form.handleSubmit(onSubmit)} 
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium mb-2">Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter a brief summary"
                          className="h-11 border-border/50 bg-background"
                          style={{ borderRadius: '0.5rem' }}
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium mb-2">Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
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
                          <SelectItem value="Bug Report">Bug Report</SelectItem>
                          <SelectItem value="Feature Request">Feature Request</SelectItem>
                          <SelectItem value="General Feedback">General Feedback</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium mb-2">Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please provide detailed information about your feedback..."
                          className="min-h-[180px] resize-none border-border/50 bg-background"
                          style={{ borderRadius: '0.5rem' }}
                          {...field}
                          disabled={isSubmitting}
                        />
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

