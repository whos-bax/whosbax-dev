/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3000'
            },
            {
                protocol: 'https',
                hostname: 'whosbax.netlify.app',
            },
            {
                protocol: 'https',
                hostname: 'whoamiiii04.netlify.app',
            },
        ],
    },
}

export default nextConfig;
