/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,  // ✅ Keep strict mode enabled
  output: "export",       // ✅ Enable static export
  basePath: "/skc-srinivasa-pythontutor", 
  assetPrefix: "/skc-srinivasa-pythontutor/"
};

module.exports = nextConfig;
