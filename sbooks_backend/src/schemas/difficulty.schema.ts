/* eslint-disable no-useless-escape */
import { cloneDeep } from 'lodash';
import { commonSchema } from './common.schema';

const difficultyBody = {
  DifficultyId: { type: 'integer'},
  name: { type: 'string'},
  CreatedAt: { type: 'string' },
  UpdatedAt: { type: 'string' }
}

const difficultyQueryBody = {
  name: { type: 'string'}
}

const difficultyPostBody = {
    name: { type: 'string'}
}
const difficultyBaseRequired = ['name'] 

const difficultyGetRequired = ['DifficultyId', ...difficultyBaseRequired, 'CreatedAt', 'UpdatedAt'] 

const difficultyPostRequired = [...difficultyBaseRequired]

const difficultySchema = cloneDeep(commonSchema);

difficultySchema.response[200] = {
  type: 'object',
  properties: difficultyBody,
  required: difficultyGetRequired
}

difficultySchema.params = {
  type: 'object',
  properties: {
    difficultyId: { type: 'string' },
  },
  required: ['difficultyId'],
};

difficultySchema.querystring = {
  type: 'object',
  properties: difficultyQueryBody
}

const difficultiesSchema = cloneDeep(commonSchema);

difficultiesSchema.response[200] = { 
    type: 'array',
    items: {
      type: 'object',
      properties: difficultyBody, 
      required: difficultyGetRequired 
    }
}

difficultiesSchema.querystring = {
    type: 'object',
    properties: difficultyBody
}

const difficultyPostSchema = cloneDeep(commonSchema);

difficultyPostSchema.body = {
      type: 'object',
      properties: difficultyPostBody, 
      required: difficultyPostRequired
}

const difficultyPutSchema = cloneDeep(commonSchema);

difficultyPutSchema.body= {
  type: 'object',
  properties: difficultyPostBody, 
  required: difficultyPostRequired,
  additionalProperties: false
};

export {difficultySchema, difficultiesSchema, difficultyPostSchema, difficultyPutSchema };
