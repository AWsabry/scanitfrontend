module.exports = {
    images: {
        domains: [
            "shopify.com",
            "cdn.shopify.com",
            "localhost",
            "api.3dscanit.org",
            "via.placeholder.com"
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