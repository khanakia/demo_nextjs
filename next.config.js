/** @type {import('next').NextConfig} */

const path = require('path')

module.exports = {
  reactStrictMode: false,
  images: {
    domains: ['i.ytimg.com', 'localhost'],
  },

  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "./styles/variables.scss";`
  },
}
