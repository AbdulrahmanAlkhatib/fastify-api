
const schemas = require('../schemas/users')
const usersHandler = require('../handlers/users')

module.exports = function (fastify, options, done) {
  
  fastify.route({
    method: 'GET',
    url: '/',
    handler: function (request, reply) {
      reply.send('welcome to my app')
    }
  })

  fastify.route({
    method: 'POST',
    url: '/login',
    schema: schemas.loginSchema,
    handler: usersHandler.login
  })

  fastify.route({
    method: 'GET',
    url: '/users',
    schema:{
      response:{
        200: schemas.getArraySchema
      } 
    },
    handler: usersHandler.find
  })

  fastify.route({
    method: 'GET',
    url: '/users/:username',
    schema: {
      response: {
        200: schemas.getSchema
      }
    },
    handler: usersHandler.get
  })

  fastify.route({
    method: 'POST',
    url: '/users',
    schema: {
      body: schemas.createSchema
    },
    handler: usersHandler.create
  })


  fastify
    .register(require('@fastify/auth'))
    .after(() => PrivateUsersRouter(fastify))

  done()
}


function PrivateUsersRouter (fastify) {

  fastify.route({
    method: 'PUT',
    url: '/users/:id',
    schema: {
      headers: schemas.headerSchema,
      body: schemas.updateSchema
    },
    preHandler: fastify.auth([fastify.verifyToken]),
    handler: usersHandler.update
  })

  fastify.route({
    method: 'DELETE',
    url: '/users/:id',
    schema: {
      headers: schemas.headerSchema,
      params: schemas.IdSchema
    },
    preHandler: fastify.auth([fastify.verifyToken]),
    handler: usersHandler.deleteUser
  })
}