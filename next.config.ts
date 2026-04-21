// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: '**', 
//         pathname: '**',
//       },
//     ],
//   },
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   // eslint: {
//   //   ignoreDuringBuilds: true,
//   // },
// };

// export default nextConfig;


// export default withNextIntl(nextConfig);
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', 
      
      },
    ],
  },
  // Disable lightningcss if causing issues
  experimental: {
    optimizeCss: false,
  },
};

export default withNextIntl(nextConfig);
