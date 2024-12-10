/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pvadvisory.in",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
