import { cloneDeep } from 'lodash';
import { commonSchema } from './common.schema';

const attributionsBody = {
    userId: { type: 'integer' },
    bookId: { type: 'integer' },
    CreatedAt: { type: 'string' },
    UpdatedAt: { type: 'string' }
}

const attributionsQueryBody = {
    userId: { type: 'integer' },
    bookId: { type: 'integer' },
  }

const attributionsPostBody = {
    userId: { type: 'integer' },
    bookId: { type: 'integer' },
}

const attributionsBaseRequired = ['userId', 'bookId'] 

const attributionsGetRequired = [...attributionsBaseRequired , 'CreatedAt', 'UpdatedAt'] 

const attributionPostRequired = [...attributionsBaseRequired]

const attributionSchema = cloneDeep(commonSchema);

attributionSchema.response[200] = {
  type: 'object',
  properties: attributionsBody,
  required: attributionsGetRequired
}

attributionSchema.params = {
    type: 'object',
    properties: {
      userId: { type: 'integer' },
      bookId: { type: 'integer' },
    },
    required: ['userId' , 'bookId'],
  };

const attributionsSchema = cloneDeep(commonSchema);

attributionsSchema.response[200] = { 
    type: 'array',
    items: {
      type: 'object',
      properties: attributionsBody,
      required: attributionsGetRequired
    }
}

const attributionsPostSchema = cloneDeep(commonSchema);

attributionsPostSchema.body = {
      type: 'object',
      properties: attributionsPostBody,
      required: attributionPostRequired 
}

const attributionsPutSchema = cloneDeep(commonSchema);

attributionsPutSchema.body= {
  type: 'object',
  properties: attributionsPostBody,
  required: attributionPostRequired,
  additionalProperties: false
};

export { attributionsSchema, attributionSchema, attributionsPostSchema, attributionsPutSchema }