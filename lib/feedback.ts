export const TITLE_MAX = 200;
export const DEVICE_MAX = 50;
export const DESCRIPTION_MAX = 1800;

export const FEEDBACK_CATEGORIES = ["Bug Report", "Feature Request", "General Feedback"] as const;
export const FEEDBACK_PLATFORMS = ["app", "web", "both"] as const;

export type FeedbackCategory = (typeof FEEDBACK_CATEGORIES)[number];
export type FeedbackPlatform = (typeof FEEDBACK_PLATFORMS)[number];

export const isFeedbackCategory = (value: string): value is FeedbackCategory =>
  (FEEDBACK_CATEGORIES as readonly string[]).includes(value);

export const isFeedbackPlatform = (value: string): value is FeedbackPlatform =>
  (FEEDBACK_PLATFORMS as readonly string[]).includes(value);
