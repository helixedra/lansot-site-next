/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dajqzcvvm/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
