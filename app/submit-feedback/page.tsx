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
import { useToast } from "@/hooks/use-toast";
import { Loader2, MessageSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
      <div className="container mx-auto px-4 py-20 max-w-2xl">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <MessageSquare className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Submit Feedback</h1>
          <p className="text-muted-foreground text-lg">
            We'd love to hear your thoughts, suggestions, or report any issues you've encountered.
          </p>
        </div>

        <Card 
          className="border border-border/50 shadow-xl bg-card/50 backdrop-blur-sm"
          style={{ borderRadius: '0.5rem' }}
        >
          <CardHeader className="space-y-2 pb-4">
            <CardTitle className="text-2xl">Share Your Feedback</CardTitle>
            <CardDescription className="text-base">
              Help us improve X&O Battle by sharing your experience
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold mb-2">Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Brief summary of your feedback"
                          className="h-11 border-border/50"
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
                      <FormLabel className="text-base font-semibold mb-2">Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isSubmitting}
                      >
                        <FormControl>
                          <SelectTrigger 
                            className="h-11 border-border/50"
                            style={{ borderRadius: '0.5rem' }}
                          >
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-lg">
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
                      <FormLabel className="text-base font-semibold mb-2">Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please provide detailed information about your feedback..."
                          className="min-h-[150px] resize-none border-border/50"
                          style={{ borderRadius: '0.5rem' }}
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                      <p className="text-xs text-muted-foreground leading-relaxed mt-2">
                        We only include the information you enter and a timestamp when feedback is sent. Please avoid sharing any personal or sensitive information.
                      </p>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-12 text-base font-semibold shadow-md hover:shadow-lg transition-all duration-200 mt-6"
                  style={{ borderRadius: '0.5rem' }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Feedback"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </main>
  );
}

