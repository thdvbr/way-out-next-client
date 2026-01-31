/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ['cdn.sanity.io'], // keep your existing Sanity domain
  },

  // Transpile third-party packages that ship uncompiled ES6 classes
  transpilePackages: [
    '@sanity/client',
    'next-sanity',
    'next-sanity-image',
    'framer-motion',
    'react-infinite-scroll-component',
    'react-masonry-css'// add any other libraries causing "Cannot call a class as a function"
  ],
};

module.exports = nextConfig;
