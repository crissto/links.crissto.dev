import { randomUUID } from "crypto";
import type { GetServerSidePropsContext } from "next";
import { PostHog } from "posthog-node";
import links from "../links.json";

export default function Link({ link }: { link: string }) {
  return <p>{link}</p>;
}

export const getServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  console.log(process.env);

  new PostHog(process.env.POSTHOG_API_KEY!, {
    host: process.env.POSTHOG_URL,
  }).capture({
    distinctId: randomUUID(),
    event: "pageview",
    properties: {
      path: params?.link,
    },
  });

  if (params?.link) {
    return {
      redirect: {
        destination: (links as Record<string, string>)[params.link as string],
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: "https://crissto.dev",
      permanent: false,
    },
  };
};
