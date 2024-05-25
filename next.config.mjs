import withMDX from '@next/mdx'
import {withContentlayer} from "next-contentlayer2";

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
        ],
    },
    // Configure `pageExtensions` to include MDX files
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    // Optionally, add any other Next.js config below
}

export default withContentlayer(withMDX(nextConfig));
// export default withContentlayer(nextConfig);
