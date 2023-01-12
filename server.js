
const fp = require('fastify-plugin')
const verifyToken = require('./utils/authenticate')
const {envSchema} = require('./schemas/env')

module.exports = fp(async function app(fastify, opts){
  fastify
    .register(require('@fastify/env'), {
      confKey: 'config',
      dotenv: true,
      data: process.env,
      schema: envSchema,
      data: process.env
    })
    .ready((err) => {
      if (err) console.error(err)
    })

  fastify.decorate('verifyToken', verifyToken)

  fastify
    .register(require('./utils/db-connector'))
    .after(err => {
      console.log('connected to db successfully')
    })
    .register(require('./routers/users-router'))
    .after(err => {
      console.log('users routes registered successfully')
    })
    .register(require('./routers/notes-router'))
    .after(err => {
      console.log('notes router registered successfully')
    })
})