/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pvadvisory.in",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "fiserv.scene7.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
