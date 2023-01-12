
const CreateSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      content: {
        type: 'string',
        minLength: 1,
        maxLength: 160  
      },
      important: { type: 'boolean'}
    },
    required: ['content', 'important']   
}

const noteSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      id: { type: 'string' },
      content: { type: 'string' },
      important: { type: 'boolean' },
      date: { type: 'string'}
    },
}

const ArraySchema = {
    type: 'array',
    items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          id: { type: 'string' },
          content: { type: 'string' },
          important: { type: 'boolean' },
          date: { type: 'string'}
        },
    }
}

const UpdateSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
        content: {
            type: 'string',
            minLength: 1,
            maxLength: 160  
        },
        important: {
          type: 'boolean'
        } 
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

module.exports = {
    CreateSchema,
    ArraySchema,
    noteSchema,
    UpdateSchema,
    IdSchema,
}