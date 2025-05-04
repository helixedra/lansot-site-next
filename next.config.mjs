/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ewvjqkdcfibffresegwj.supabase.co",
        port: "",
        pathname: "/storage/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "images.codebase.stream",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
