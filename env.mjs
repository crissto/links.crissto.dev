import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		POSTHOG_API_KEY: z.string(),
		POSTHOG_URL: z.string().url(),
	},
	client: {
		// Add any client-side environment variables here if needed
	},
	runtimeEnv: {
		POSTHOG_API_KEY: process.env.POSTHOG_API_KEY,
		POSTHOG_URL: process.env.POSTHOG_URL,
	},
});
