
const loginSchema = {
  body: {
    type: 'object',
    properties: {
      username: {type: 'string'},
      password: {type: 'string'},
    },
    required: ['username', 'password'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        token: {type: 'string'},
      },
    },
  },
}

const createSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    username: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' },
  },
  required: ['username','password','email']   
}

const getSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    id: {type: 'string'},
    username: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' },
  },
  required: ['username']   
}

const getArraySchema = {
  type: 'array',
  items: {
    type: 'object',
    additionalProperties: false,
    properties: {
      id: { type: 'string' },
      username: { type: 'string' },
      email: { type: 'string' },
      password: { type: 'string' },
    },
  }
}

const updateSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    username: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' }  
  }
}
  
const IdSchema = {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      }
    }
}

const headerSchema = {
  type: 'object',
  required: ['authorization'],
  properties: {
    authorization: {type: 'string'}
  }
}

module.exports = {
  loginSchema,  
  createSchema,
  getArraySchema,
  getSchema,
  updateSchema,
  IdSchema,
  headerSchema,
}