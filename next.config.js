/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en", "vi"],
    defaultLocale: "vi",
  },
  reactStrictMode: true,
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js'
        }
      }
    },
    optimizePackageImports: ['@chakra-ui/react']
  },
  eslint: {
    dirs: ['src'],
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          }
        ]
      }
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.gstatic.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname:
          'https://sgroup-member-management-be-production.up.railway.app',
        port: '',
        pathname: '/files/**'
      },
      {
        protocol: 'http',
        hostname: 'http://127.0.0.1:3000',
        port: '',
        pathname: '/files/**'
      }
    ]
  }
};

module.exports = nextConfig;
