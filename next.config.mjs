/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:false,
  typescript: {
    ignoreBuildErrors: true,
  },
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "rankappfinal.s3.us-east-2.amazonaws.com",
          },
        ],
      },
};

export default nextConfig;
