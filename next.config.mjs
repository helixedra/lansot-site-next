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
    ],
  },
};

export default nextConfig;
