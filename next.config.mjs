/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "upbeat-bandicoot-306.convex.cloud",
                port: "",
                pathname: "/**",
            },
        ],
    }
};

export default nextConfig;
