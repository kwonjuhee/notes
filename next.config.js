/** @type {import('next').NextConfig} */
const nextConfig = {
  // https://react-svgr.com/docs/next/#usage
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;
