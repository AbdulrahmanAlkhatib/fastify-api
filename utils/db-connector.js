const fastifyPlugin = require('fastify-plugin')

function dbConnector (fastify, opts, done) {
    fastify.register(require('@fastify/mongodb'), {
        url: fastify.config.MONGO_URL
    })
    done()
}

module.exports = fastifyPlugin(dbConnector)