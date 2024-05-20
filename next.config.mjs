/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.bortakvall.se",
        port: "",
      },
    ],
  },
};

export default nextConfig;
