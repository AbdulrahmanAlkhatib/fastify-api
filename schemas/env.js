
const envSchema = {
    type: 'object',
    properties: {
        PORT: { type: 'integer', default: 3000 },
        NODE_ENV: { type: 'string' },
        MONGO_URL: { type: 'string' },
        JWT_SECRET: { type: 'string' }
    }
}

module.exports = {envSchema}