module.exports = {
    images: {
        domains: [
            "shopify.com",
            "cdn.shopify.com",
            "localhost",
            "api.3dscanit.org",
        ],
        remotePatterns: [
            {
              protocol: 'http',
              hostname: 'api.3dscanit.org',
              port: '',
              pathname: '/**',
            },
          ],
    }
}