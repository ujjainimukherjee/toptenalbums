require('dotenv').config()
const withPlugins = require('next-compose-plugins');
const withCSS = require('@zeit/next-css')
const withBundleAnalyzer = require('@next/bundle-analyzer');

const nextConfig = {
  env: {
    // Reference a variable that was defined in the .env file and make it available at Build Time
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET
}
};



module.exports = withPlugins([
  withCSS,  
  [withBundleAnalyzer, 
  {
    enabled: process.env.ANALYZE === 'true'
  }
]], nextConfig)

// Below code works 
// module.exports = withBundleAnalyzer(nextConfig)
