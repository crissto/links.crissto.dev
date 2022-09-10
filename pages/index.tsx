import * as cookie from "cookie";
import { randomUUID } from "crypto";
import { type GetServerSidePropsContext } from "next";
import { PostHog } from "posthog-node";

export default function Home() {
  return <div>Home</div>;
}

export const getServerSideProps = async ({
  params,
  req,
  res,
}: GetServerSidePropsContext) => {
  const cookies = req.headers.cookie;

  const parsedCookies = cookie.parse(cookies || "");

  const distinctId = parsedCookies.distinctId || randomUUID();

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("distinctId", distinctId, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7 * 30, // 1 month
      path: "/",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    })
  );

  new PostHog(process.env.POSTHOG_API_KEY!, {
    host: process.env.POSTHOG_URL,
  }).capture({
    distinctId: randomUUID(),
    event: "$pageview",
    properties: {
      path: params?.link,
    },
  });

  return {
    redirect: {
      destination: "https://crissto.dev",
      permanent: false,
    },
  };
};
