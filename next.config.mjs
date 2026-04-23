/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },

  // Pin the Next.js dev HMR WebSocket to a static URL.
  // `assetPrefix` controls where `getSocketUrl(assetPrefix)` points to,
  // so the browser will open `ws(s)://<host>/_next/webpack-hmr` against
  // the host below instead of trying to guess from window.location.
  //
  // Only apply in development so production builds are unaffected.
  // Set NEXT_PUBLIC_DEV_URL to your proxy/tunnel URL, e.g.
  //   NEXT_PUBLIC_DEV_URL=https://my-tunnel.example.com
  // or hard-code the string below.
  ...(process.env.NODE_ENV === "development" && process.env.NEXT_PUBLIC_DEV_URL
    ? { assetPrefix: process.env.NEXT_PUBLIC_DEV_URL }
    : {}),

  // Allow that origin through Next's dev CORS check (Next 15+/16).
  allowedDevOrigins: process.env.NEXT_PUBLIC_DEV_URL
    ? [new URL(process.env.NEXT_PUBLIC_DEV_URL).host]
    : [],
}

export default nextConfig
