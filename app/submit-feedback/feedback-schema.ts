import * as z from "zod";
import { DESCRIPTION_MAX, FEEDBACK_CATEGORIES, FEEDBACK_PLATFORMS, TITLE_MAX } from "@/lib/feedback";
import { isBlank } from "@/lib/text";

export const feedbackSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(TITLE_MAX, `Title must be ${TITLE_MAX} characters or fewer`)
    .refine((val) => !isBlank(val), "Title cannot be only whitespace"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(DESCRIPTION_MAX, `Description must be ${DESCRIPTION_MAX} characters or fewer`)
    .refine((val) => !isBlank(val), "Description cannot be only whitespace"),
  category: z.enum(FEEDBACK_CATEGORIES, {
    error: "Please select a category",
  }),
  device: z
    .string()
    .optional()
    .refine((val) => !val || !isBlank(val), "Device cannot be only whitespace"),
  platform: z.enum(FEEDBACK_PLATFORMS, {
    error: "Please select which platform",
  }),
});

export type FeedbackFormValues = z.infer<typeof feedbackSchema>;
