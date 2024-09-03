import { type NextRequest, NextResponse } from "next/server";
import { PostHog } from "posthog-node";
import { v4 as uuidv4 } from "uuid";
import { env } from "./env.mjs";
import links from "./links.json";

export async function middleware(req: NextRequest) {
	const path = req.nextUrl.pathname.slice(1);
	const link = (links as Record<string, string>)[path];

	const distinctId = req.cookies.get("distinct_id") || uuidv4();
	const posthogClient = new PostHog(env.POSTHOG_API_KEY, {
		host: env.POSTHOG_URL,
	});

	try {
		await posthogClient.capture({
			distinctId,
			event: "$pageview",
			properties: { path, $current_url: req.nextUrl.href },
		});
	} catch (error) {
		console.error("Failed to capture event:", error);
	}

	const response = link ? NextResponse.redirect(link) : NextResponse.next();

	response.cookies.set("distinct_id", distinctId, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		maxAge: 60 * 60 * 24 * 365, // 1 year
	});

	return response;
}
