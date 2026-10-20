import type { FeedbackCategory, FeedbackPlatform } from "@/lib/feedback";

type EmbedField = {
  name: string;
  value: string;
  inline: boolean;
};

type Embed = {
  title: string;
  color: number;
  fields: EmbedField[];
  timestamp: string;
  footer: { text: string };
  description?: string;
};

const DISCORD_TIMEOUT_MS = 10_000;
const EMBED_FIELD_MAX = 1024;

const CATEGORY_COLORS: Record<FeedbackCategory, number> = {
  "Bug Report": 16731983,
  "Feature Request": 14067215,
  "General Feedback": 6331898,
};

const PLATFORM_LABELS: Record<FeedbackPlatform, string> = {
  app: "App",
  web: "Web",
  both: "Both",
};

export function sanitizeForDiscord(text: string, maxLength: number): string {
  const sanitized = text.replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, "");
  return sanitized.length > maxLength ? `${sanitized.substring(0, maxLength - 3)}...` : sanitized;
}

export function isValidWebhookUrl(url: string): boolean {
  try {
    const { protocol, hostname, pathname } = new URL(url);
    return protocol === "https:" && hostname === "discord.com" && pathname.startsWith("/api/webhooks/");
  } catch {
    return false;
  }
}

export function buildFeedbackEmbed(feedback: {
  category: FeedbackCategory;
  platform: FeedbackPlatform;
  title: string;
  description: string;
  device: string;
}): Embed {
  const fields: EmbedField[] = [
    { name: "Category", value: feedback.category, inline: true },
    { name: "Which platform?", value: PLATFORM_LABELS[feedback.platform], inline: true },
    { name: "Title", value: feedback.title, inline: false },
  ];

  if (feedback.category === "Bug Report" && feedback.device) {
    fields.push({ name: "Device", value: feedback.device, inline: true });
  }

  const embed: Embed = {
    title: "New Feedback Submission",
    color: CATEGORY_COLORS[feedback.category],
    fields,
    timestamp: new Date().toISOString(),
    footer: { text: "X&O Battle Feedback" },
  };

  if (feedback.description.length <= EMBED_FIELD_MAX) {
    fields.push({ name: "Description", value: feedback.description, inline: false });
  } else {
    embed.description = feedback.description;
  }

  return embed;
}

export function sendEmbed(webhookUrl: string, embed: Embed) {
  return fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "XOBattle-Feedback/1.0",
    },
    body: JSON.stringify({
      embeds: [embed],
      allowed_mentions: { parse: [] },
    }),
    signal: AbortSignal.timeout(DISCORD_TIMEOUT_MS),
  });
}
