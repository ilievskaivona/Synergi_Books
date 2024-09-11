import { cloneDeep } from 'lodash';
import { commonSchema } from './common.schema';
import { StatusModel } from '../types/status/status.model.type';

const statusSchema = cloneDeep(commonSchema);

const statusBodyBase = {
  name: { type: 'string'},  
}

const statusBody = {
  StatusId: { type: 'integer' },
  ...statusBodyBase,
  CreatedAt: { type: 'string'},
  UpdatedAt: { type: 'string'}
}

const statusQueryBody = {  
  ...statusBodyBase
}

const statusPostBody = {
  ...statusBodyBase
}

const statusBaseRequired = ['name'] 

const statusGetRequired = ['StatusId', ...statusBaseRequired, 'CreatedAt', 'UpdatedAt'] 

const statusPostRequired = [...statusBaseRequired]

statusSchema.response[200] = {
  type: 'object',
  properties: statusBody,
  required: statusGetRequired
}

statusSchema.params = {
  type: 'object',
  properties: {
    statusId: { type: 'string' },
  },
  required: ['statusId'],
};

const statusesSchema = cloneDeep(commonSchema);

statusesSchema.response[200] = {
  type: 'array',
  items: {
    type: 'object',
    properties: statusBody,
    required: statusGetRequired
  }
}

statusesSchema.querystring = {
  type: 'object',
  properties: statusQueryBody
}

const statusPostSchema = cloneDeep(commonSchema);

statusPostSchema.body = {
  type: 'object',
  properties: statusPostBody,
  required: statusPostRequired,
  additionalProperties: false
};

const statusPutSchema = cloneDeep(commonSchema);

statusPutSchema.body = {
  type: 'object',
  properties: statusPostBody,
  required: statusPostRequired,
  additionalProperties: false
};

export { statusSchema, statusesSchema, statusPostSchema, statusPutSchema };