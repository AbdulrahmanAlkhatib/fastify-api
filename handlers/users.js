'use strict'
const jwt = require('jsonwebtoken');


async function login (req, reply) {
  const username = req.body.username
  const password = req.body.password
  const user = await this.mongo.db.collection('users').findOne({ username: username })
  if (!user) {
    throw new Error('User not found')
  }
  // console.log(user.password)
  // console.log(password)
  if (password != user.password) {
    throw new Error('Invalid credentials')
  }

  jwt.sign(
    { id: user.id },
    this.config.JWT_SECRET,
    { expiresIn: 3 * 86400 },
    (err, token) => {
      if (err) reply.status(500).send(new Error(err))

      reply.send({ token })
    }
  )
  await reply
}

async function create (req, reply) {
  const user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  }
  const result = await this.mongo.db.collection('users').insertOne(user)
  reply.code(201)
  return result
}

async function find (req, reply) {
  const result = await this.mongo.db.collection('users').find().toArray()
  if (result.length === 0) {
      throw new Error('No documents found')
  }
  console.log(result)

  reply.code(200)
  return result.map(doc => {
    doc.id = doc._id.toString()
    return doc
  })
}

async function get (req, reply) {
  const username = req.params.username
  const result = await this.mongo.db.collection('users').findOne({ username: username })
  if (!result) {
    throw new Error('Invalid value')
  }
  const user = {
    id: result._id.toString(),
    username: result.username,
    email: result.email,
    password: result.password,
  }
  return user
}

async function update (req, reply) {
  const id = req.params.id
  const user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  }
  const result = await this.mongo.db.collection('users').updateOne(
    { _id: this.mongo.ObjectId(id) },
    {
      $set: user
    })
  if (result.matchedCount === 0) {
    const error = new Error('Object not found: ' + req.params.id)
    error.status = 404
    throw error
  }
  return { id: req.params.id }
}

async function deleteUser (req, reply) {
  const id = req.body.id
  const result = await this.mongo.db.collection('users').deleteOne({
    _id: this.mongo.ObjectId(id)
  })
  if (result.deletedCount === 0) {
    const error = new Error('Object not found: ' + id)
    error.status = 404
    throw error
  }
  return { id: id }
}

module.exports = {
  find,
  get,
  create,
  update,
  deleteUser,
  login,
}




  

