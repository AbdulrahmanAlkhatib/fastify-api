
async function create (req, reply) {
    const body = req.body
    const note = {
        content: body.content,
        important: body.important,
        date: new Date(),
    }
    const result = await this.mongo.db.collection('notes').insertOne(note)
    reply.code(201)
    return result
}

async function update (req, reply) {
    const id = req.params.id
    const result = await this.mongo.db.collection('notes').updateOne(
      { _id: fastify.mongo.ObjectId(id) },
      {
        $set: {
          content: req.body.content,
          important: req.body.important,
        }
      })
    if (result.matchedCount === 0) {
      const error = new Error('Object not found: ' + req.params.id)
      error.status = 404
      throw error
    }
    return { id: req.params.id }
}

async function find (req, reply) {
    const result = await this.mongo.db.collection('notes').find().toArray()
    if (result.length === 0) {
        throw new Error('No documents found')
    }
    reply.code(200)
    return result.map(doc => {
      doc.id = doc._id.toString()
      return doc
    })
}

async function get (req, reply) {
    const id = req.params.id
    let result = await this.mongo.db.collection('notes').findOne({ _id: this.mongo.ObjectId(id) })
    if (!result) {
      throw new Error('Invalid value')
    }
    const note = {
      id: result._id.toString(),
      content: result.content,
      important: result.important,
      date: result.date,
    } 
    reply.code(201)
    return note
}

async function deleteNote (req, reply) {
    const id = req.params.id
    const result = await this.mongo.db.collection('notes').deleteOne({
      _id: this.mongo.ObjectId(id)
    })
    if (result.deletedCount === 0) {
      const error = new Error('Object not found: ' + req.params.id)
      error.status = 404
      throw error
    }
    return { id: req.params.id }
}

module.exports = {
    create,
    update,
    find,
    get,
    deleteNote,
}


