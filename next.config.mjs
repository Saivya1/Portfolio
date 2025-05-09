/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  basePath: '/my-nextjs-project',
  trailingSlash: true, // Optional, adds trailing slash to every route for better GitHub Pages support
  output: 'export',
  async headers() {
    return [
      {
        source: '/certs/:path*',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/pdf',
          },
        ],
      },
    ]
  },
}

export default nextConfig
