import { NextRequest, NextResponse } from "next/server";
import { DESCRIPTION_MAX, DEVICE_MAX, TITLE_MAX, isFeedbackCategory, isFeedbackPlatform } from "@/lib/feedback";
import { createRateLimiter } from "@/lib/rate-limit";
import { isBlank } from "@/lib/text";
import { buildFeedbackEmbed, isValidWebhookUrl, sanitizeForDiscord, sendEmbed } from "./discord";

const MAX_BODY_BYTES = 10_000;

const isRateLimited = createRateLimiter(5, 60_000);

function clientKey(request: NextRequest): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}

function errorResponse(error: string, status: number) {
  return NextResponse.json({ error }, { status });
}

export async function POST(request: NextRequest) {
  try {
    if (!isSameOrigin(request)) {
      return errorResponse("Forbidden", 403);
    }

    if (isRateLimited(clientKey(request))) {
      return errorResponse("Too many submissions. Please wait a minute and try again.", 429);
    }

    if (!request.headers.get("content-type")?.includes("application/json")) {
      return errorResponse("Invalid content type", 400);
    }

    if (Number(request.headers.get("content-length")) > MAX_BODY_BYTES) {
      return errorResponse("Request is too large", 413);
    }

    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return errorResponse("Request is too large", 413);
    }

    let body: unknown;
    try {
      body = JSON.parse(raw);
    } catch {
      return errorResponse("Invalid JSON", 400);
    }

    if (typeof body !== "object" || body === null) {
      return errorResponse("Invalid request body", 400);
    }

    const { title, description, category, device, platform } = body as Record<string, unknown>;

    if (!title || !description || !category || !platform) {
      return errorResponse("Missing required fields", 400);
    }

    if (
      typeof title !== "string" ||
      typeof description !== "string" ||
      typeof category !== "string" ||
      typeof platform !== "string"
    ) {
      return errorResponse("Invalid field types", 400);
    }

    if (device !== undefined && device !== null && typeof device !== "string") {
      return errorResponse("Invalid device field type", 400);
    }

    const sanitizedTitle = sanitizeForDiscord(title.trim(), 256);
    if (isBlank(sanitizedTitle) || sanitizedTitle.length > TITLE_MAX) {
      return errorResponse(`Title must be between 1 and ${TITLE_MAX} characters`, 400);
    }

    if (description.trim().length > DESCRIPTION_MAX) {
      return errorResponse(`Description must be ${DESCRIPTION_MAX} characters or fewer`, 400);
    }

    const sanitizedDescription = sanitizeForDiscord(description.trim(), DESCRIPTION_MAX);
    if (isBlank(sanitizedDescription)) {
      return errorResponse("Description is required", 400);
    }

    if (!isFeedbackCategory(category)) {
      return errorResponse("Invalid category", 400);
    }

    if (!isFeedbackPlatform(platform)) {
      return errorResponse("Invalid platform", 400);
    }

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl || !isValidWebhookUrl(webhookUrl)) {
      return errorResponse("Service temporarily unavailable", 503);
    }

    const embed = buildFeedbackEmbed({
      category,
      platform,
      title: sanitizedTitle,
      description: sanitizedDescription,
      device: typeof device === "string" && !isBlank(device) ? sanitizeForDiscord(device.trim(), DEVICE_MAX) : "",
    });

    try {
      const discordResponse = await sendEmbed(webhookUrl, embed);

      if (!discordResponse.ok) {
        return errorResponse("Failed to submit feedback. Please try again later.", 500);
      }

      return NextResponse.json({ message: "Feedback submitted successfully" });
    } catch (fetchError) {
      if (fetchError instanceof Error && (fetchError.name === "TimeoutError" || fetchError.name === "AbortError")) {
        return errorResponse("Request timeout. Please try again later.", 504);
      }
      return errorResponse("Failed to submit feedback. Please try again later.", 500);
    }
  } catch {
    return errorResponse("An error occurred. Please try again later.", 500);
  }
}
