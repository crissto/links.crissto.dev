import { v4 as uuidv4 } from "uuid";
import { type NextRequest, NextResponse } from "next/server";
import { PostHog } from "posthog-node";
import links from "./links.json";

export async function middleware(req: NextRequest) {
  const response = NextResponse.next();
  const path = req.nextUrl.pathname.slice(1);
  const link = (links as Record<string, string>)[path];

  const distinctId = req.cookies.get("distinct_id") || uuidv4();
  const posthogClient = new PostHog(process.env.POSTHOG_API_KEY!, {
    host: process.env.POSTHOG_URL,
  });

  await posthogClient.capture({
    distinctId,
    event: "$pageview",
    properties: { path },
  });

  response.cookies.set("distinct_id", distinctId);

  if (link) {
    return NextResponse.redirect(link);
  }

  return response;
}
