import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function sanitizeForDiscord(text: string, maxLength: number): string {
  let sanitized = text.replace(/[\x00-\x1F\x7F]/g, '');
  
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

    const { title, description, category } = body;

    if (!title || !description || !category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (typeof title !== 'string' || typeof description !== 'string' || typeof category !== 'string') {
      return NextResponse.json(
        { error: "Invalid field types" },
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

    const sanitizedDescription = sanitizeForDiscord(description.trim(), 4096);
    if (sanitizedDescription.length === 0 || sanitizedDescription.length > 2000) {
      return NextResponse.json(
        { error: "Description must be between 1 and 2000 characters" },
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

    const embed = {
      title: "New Feedback Submission",
      color: category === "Bug Report" ? 15158332 : category === "Feature Request" ? 3066993 : 3447003,
      fields: [
        {
          name: "Category",
          value: category,
          inline: true,
        },
        {
          name: "Title",
          value: sanitizedTitle,
          inline: false,
        },
        {
          name: "Description",
          value: sanitizedDescription,
          inline: false,
        },
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: "X&O Battle Feedback",
      },
    };

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