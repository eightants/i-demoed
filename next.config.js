module.exports = {
    async redirects() {
        return [
            {
                source: '/i-demoed',
                destination: '/',
                basePath: false,
                permanent: false
            }
        ]
    }
};