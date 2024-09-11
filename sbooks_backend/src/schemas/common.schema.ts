/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from '../env';

export const API_KEY = env.apiKey;
export const apiKeyHeader = 'X-API-KEY';

const errorMessages = {
  400: 'Bad request',
  401: 'Unauthorized request',
  404: 'Nothing found',
  405: 'Method not allowed',
  503: 'Service unavailable',
};

export const xApiKeyHeaderSchema = {
  [apiKeyHeader]: {
    type: 'string',
    const: API_KEY,
  },
};

type TSchema = {
  [key: string]: any;
};

export const errorResponses = Object.entries(errorMessages).reduce((acc: TSchema, item: Array<string>) => {
  const [code, message] = item;

  acc[code] = {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        const: message,
      },
    },
  };

  return acc;
}, {});

export const commonSchema: TSchema = {
  headers: {
    type: 'object',
    properties: {
      [apiKeyHeader]: {
        type: 'string',
        const: API_KEY,
      },
    },
    required: [apiKeyHeader],
  },
  response: {
    ...errorResponses,
  },
};
