This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

It's a link shortener that takes the path and tries to match to a key in `links.json` and redirects there if there is a url.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Adding a new url

To add a new redirect just add a new key in `links.json` and `<BASE_URL>/<key>` will redirect there.