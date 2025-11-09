import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function sanitizeForDiscord(text: string, maxLength: number): string {
  let sanitized = text.replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, '');
  
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength - 3) + '...';
  }
  
  return sanitized;
}

function isValidWebhookUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'https:' && 
           urlObj.hostname === 'discord.com' && 
           urlObj.pathname.startsWith('/api/webhooks/');
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        { error: "Invalid content type" },
        { status: 400 }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON" },
        { status: 400 }
      );
    }

    const { title, description, category, device, platform } = body;

    if (!title || !description || !category || !platform) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (typeof title !== 'string' || typeof description !== 'string' || typeof category !== 'string' || typeof platform !== 'string') {
      return NextResponse.json(
        { error: "Invalid field types" },
        { status: 400 }
      );
    }

    if (device !== undefined && device !== null && typeof device !== 'string') {
      return NextResponse.json(
        { error: "Invalid device field type" },
        { status: 400 }
      );
    }

    const sanitizedTitle = sanitizeForDiscord(title.trim(), 256);
    if (sanitizedTitle.length === 0 || sanitizedTitle.length > 200) {
      return NextResponse.json(
        { error: "Title must be between 1 and 200 characters" },
        { status: 400 }
      );
    }

    const sanitizedDescription = sanitizeForDiscord(description.trim(), 1800);
    if (sanitizedDescription.length === 0) {
      return NextResponse.json(
        { error: "Description is required" },
        { status: 400 }
      );
    }
    if (sanitizedDescription.length > 1800) {
      return NextResponse.json(
        { error: "Description must be less than 1800 characters" },
        { status: 400 }
      );
    }

    const validCategories = ["Bug Report", "Feature Request", "General Feedback"];
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { error: "Invalid category" },
        { status: 400 }
      );
    }

    const validPlatforms = ["app", "web", "both"];
    if (!validPlatforms.includes(platform)) {
      return NextResponse.json(
        { error: "Invalid platform" },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
      return NextResponse.json(
        { error: "Service temporarily unavailable" },
        { status: 503 }
      );
    }

    if (!isValidWebhookUrl(webhookUrl)) {
      return NextResponse.json(
        { error: "Service temporarily unavailable" },
        { status: 503 }
      );
    }

    let sanitizedDevice = "";
    if (device && typeof device === 'string') {
      sanitizedDevice = sanitizeForDiscord(device.trim(), 100);
    }

    const embedFields: any[] = [
      {
        name: "Category",
        value: category,
        inline: true,
      },
      {
        name: "Which platform?",
        value: platform === "app" ? "App" : platform === "web" ? "Web" : "Both",
        inline: true,
      },
      {
        name: "Title",
        value: sanitizedTitle,
        inline: false,
      },
    ];

    if (category === "Bug Report" && sanitizedDevice) {
      embedFields.push({
        name: "Device",
        value: sanitizedDevice,
        inline: true,
      });
    }

    let embedDescription = "";
    let descriptionField = null;

    if (sanitizedDescription.length <= 1024) {
      descriptionField = {
        name: "Description",
        value: sanitizedDescription,
        inline: false,
      };
    } else {
      embedDescription = sanitizedDescription.length > 4096 
        ? sanitizedDescription.substring(0, 4093) + '...' 
        : sanitizedDescription;
    }

    if (descriptionField) {
      embedFields.push(descriptionField);
    }

    let embedColor: number;
    if (category === "Bug Report") {
      embedColor = 16731983;
    } else if (category === "Feature Request") {
      embedColor = 14067215;
    } else {
      embedColor = 6331898;
    }

    const embed: any = {
      title: "New Feedback Submission",
      color: embedColor,
      fields: embedFields,
      timestamp: new Date().toISOString(),
      footer: {
        text: "X&O Battle Feedback",
      },
    };

    if (embedDescription) {
      embed.description = embedDescription;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const discordResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "XOBattle-Feedback/1.0",
        },
        body: JSON.stringify({
          embeds: [embed],
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!discordResponse.ok) {
        return NextResponse.json(
          { error: "Failed to submit feedback. Please try again later." },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { message: "Feedback submitted successfully" },
        { 
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (fetchError) {
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        return NextResponse.json(
          { error: "Request timeout. Please try again later." },
          { status: 504 }
        );
      }
      return NextResponse.json(
        { error: "Failed to submit feedback. Please try again later." },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred. Please try again later." },
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}