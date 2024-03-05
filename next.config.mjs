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
            {
                protocol: "https",
                hostname: "img.clerk.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.resolve.alias.canvas = false;
        config.resolve.alias.encoding = false;

        return config;
    }
};

export default nextConfig;
