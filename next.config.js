/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/blocks/:slug*',
        destination: 'https://blockchain.info/:slug*',
      },
      {
        source: '/mempool/:slug*',
        destination: 'https://mempool.space/:slug*',
      },
      {
        source: '/ipfs/:slug*',
        destination: 'https://ipfs.io/ipfs/:slug*',
      },
      {
        source: '/unisat/:slug*',
        destination: 'https://unisat.io/api/:slug*',
      },
      {
        source: '/apirone/:slug*',
        destination: 'https://apirone.com/api/v2/:slug*',
      },
    ]
  },
}


module.exports = nextConfig
