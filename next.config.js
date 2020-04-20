require('dotenv').config()
const withCSS = require('@zeit/next-css')
module.exports = withCSS({
  env: {
    // Reference a variable that was defined in the .env file and make it available at Build Time
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET
}
})
