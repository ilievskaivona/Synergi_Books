/* eslint-disable no-useless-escape */
import { cloneDeep } from 'lodash';
import { commonSchema } from './common.schema';

const subjectSchema = cloneDeep(commonSchema);

const subjectBodyBase = {
  name: { type: 'string'},

}

const subjectBody = {
  SubjectId: { type: 'integer' },
  ...subjectBodyBase,
//   CreatedAt: { type: 'string' },
//   UpdatedAt: { type: 'string' }
}

const subjectQueryBody = {
  ...subjectBodyBase,
//   createdBy: { type: 'integer' },
//   updatedBy: { type: 'integer' },
}

const subjectPostBody = {
  ...subjectBodyBase,
}

const subjectBaseRequired = ['name'] 

const subjectGetRequired = ['SubjectId', ...subjectBaseRequired, 'CreatedAt', 'UpdatedAt'] 

const subjectPostRequired = [...subjectBaseRequired]

subjectSchema.response[200] = {
  type: 'object',
  properties: subjectBody,
  required: subjectGetRequired
}

subjectSchema.params = {
  type: 'object',
  properties: {
    subjectId: { type: 'string' },
  },
  required: ['subjectId'],
};

const subjectsSchema = cloneDeep(commonSchema);

subjectsSchema.response[200] = {
  type: 'array',
  items: {
    type: 'object',
    properties: subjectBody,
    required: subjectGetRequired
  }
}

subjectsSchema.querystring = {
  type: 'object',
  properties:subjectQueryBody
}

const subjectPostSchema = cloneDeep(commonSchema);

subjectPostSchema.body = {
  type: 'object',
  properties: subjectPostBody,
  required: subjectPostRequired,
  additionalProperties: false
};

const subjectPutSchema = cloneDeep(commonSchema);

subjectPutSchema.body = {
  type: 'object',
  properties: subjectPostBody,
  required: subjectPostRequired,
  additionalProperties: false
};

export { subjectSchema, subjectsSchema, subjectPostSchema, subjectPutSchema };
