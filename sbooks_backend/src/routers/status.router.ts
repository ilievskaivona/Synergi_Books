import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import {statusController }from '../controllers';
import { statusSchema, statusesSchema, statusPostSchema, statusPutSchema } from '../schemas/status.schema';
import { StatusByIdParam, StatusesQueryParam, StatusPostBody } from '../types/status/status.query.types'

export default function (fastify: FastifyInstance): void {

    fastify.get(
      '/status/:statusId',
      { schema: statusSchema },
      async (request: FastifyRequest<{ Params: StatusByIdParam }>, reply: FastifyReply): Promise<void> => {
        const status = await statusController.handleGetStatusById(request.params);
        if (!status) {
          await reply.code(404).send()
        }
        else {
          await reply.send(status)
        }
      }
    );

    fastify.get(
      '/statuses',
      { schema: statusesSchema },
      async (request: FastifyRequest<{ Querystring: StatusesQueryParam }>, reply: FastifyReply): Promise<void> => {
        const status = await statusController.handleGetStatuses(request.query);
        if (status.length == 0) {
          await reply.code(404).send()
        }
        else {
          await reply.send(status)
        }
      }
    );

    fastify.post(
      '/status',
      { schema: statusPostSchema },
      async (request: FastifyRequest<{ Body: StatusPostBody }>, reply: FastifyReply): Promise<void> => {
        const status = await statusController.handleCreateStatus(request.body);
        if (!status) {
          await reply.code(400).send()
        }
        else {
          await reply.send(status)
        }
      }
    );

    fastify.put(
      '/status/:statusId',
      { schema: statusPutSchema },
      async (request: FastifyRequest<{ Params: StatusByIdParam, Body: StatusPostBody }>, reply: FastifyReply): Promise<void> => {
        const status = await statusController.handleUpdateStatus(request.params, request.body);
        if (!status) {
          await reply.code(400).send()
        }
        else {
          await reply.code(200).send(status)
        }
      }
    );
  }
