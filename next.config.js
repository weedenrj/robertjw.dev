/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.example.com"
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com"
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: "/resume",
        destination: "/Robert Weeden Resume July 2024.pdf"
      }
    ]
  }
}

module.exports = nextConfig
