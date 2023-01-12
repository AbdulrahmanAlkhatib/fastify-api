
const noteSchemas = require('../schemas/notes')
const notesHandler = require('../handlers/notes')

module.exports = function (fastify, opts, done) {

    fastify.route({
        method: 'GET',
        url: '/notes',
        schema:{
          response:{
            200: noteSchemas.ArraySchema
          } 
        },
        handler: notesHandler.find
    })

    fastify.route({
        method: 'GET',
        url: '/notes/:id',
        schema: {
          response: {
            200: noteSchemas.noteSchema
          }
        },
        handler: notesHandler.get
    })

    fastify.route({
        method: 'POST',
        url: '/notes',
        schema: {
            body: noteSchemas.CreateSchema
        },
        handler: notesHandler.create
    })
  
    fastify.route({
        method: 'PUT',
        url: '/notes/:id',
        schema: {
            body: noteSchemas.UpdateSchema
        },
        handler: notesHandler.update
    })
  
    fastify.route({
        method: 'DELETE',
        url: '/notes/:id',
        schema: {
            params: noteSchemas.IdSchema
        },
        handler: notesHandler.deleteNote
    })
    done()
}