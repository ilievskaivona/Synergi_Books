/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

require('dotenv').config();
import { FastifyReply, FastifyRequest } from 'fastify';

type TCustomPayload = FastifyReply & {
  payload: {
    [key: string]: string;
  };
};

export const loggerOpt = () => {
  const setLogger: any = {
    serializers: {
      req(request: FastifyRequest) {
        return {
          timestamp: new Date().getTime(),
          rawHeaders: JSON.stringify(request.headers),
          method: request.method,
          url: request.url,
          remoteAddress: request.ip,
          body: request.body,
          serviceVersion: '1.0.0',
        };
      },
      res(reply: TCustomPayload) {
        return {
          statusCode: reply.statusCode,
          timestamp: new Date().getTime(),
          serviceVersion: '1.0.0',
          body: reply.payload,
        };
      },
      err(error: any) {
        return {
          type: error.type,
          message: error.message,
          code: error.code,
          validation: error.validation,
          validationContext: error.validationContext,
        };
      },
    },
  };

  setLogger.transport = {
  target: 'pino-pretty',
  options: {
    translateTime: 'dd/mm/yyyy HH:MM:ss',
    colorize: true,
  },
  };
  return setLogger;
};

