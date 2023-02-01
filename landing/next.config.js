require("dotenv").config();
const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/* Without CSS Modules, with PostCSS */
module.exports = withPlugins([[withImages]], {
  env: {
    ENV: process.env.ENV,
    DOMAIN: process.env.DOMAIN || "postpay.io",
    DASHBOARD_URL: process.env.DASHBOARD_URL || "dashboard.postpay.io",
  },
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["stores-dev.postpay.io"],
    disableStaticImages: true,
    loader: "imgix",
    path: "https://noop/",
  },
  exportTrailingSlash: false,
  experimental: { publicDirectory: true },
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      ...defaultPathMap,
      "/about-us/about": { page: "/about-us/[tab]" },
      "/about-us/principles": { page: "/about-us/[tab]" },
      "/about-us/responsible-spending": { page: "/about-us/[tab]" },
      "/about-us/pci-dss": { page: "/about-us/[tab]" },
      "/about-us/investors": { page: "/about-us/[tab]" },
    };
  },
  async redirects() {
    return [
      {
        source: "/careers",
        destination: "/",
        permanent: true,
      },
    ];
  },
  swcMinify: true,
  experimental: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
});
