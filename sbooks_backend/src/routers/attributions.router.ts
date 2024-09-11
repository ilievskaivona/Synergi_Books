import { FastifyInstance, FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';
import { attributionSchema, attributionsPostSchema, attributionsPutSchema, attributionsSchema} from '../schemas/attributions.schema';
import {  AttributionsPostBody, AttributionsQueryParam , AttributionsByIdParam} from '../types/attributions/attributions.query.types'
import attributionsController from '../controllers/attributions.controller';


export default function (fastify: FastifyInstance): void {

  fastify.get(
    '/attributions/:userId/:bookId',
    { schema: attributionSchema },
    async (request: FastifyRequest<{ Params:  AttributionsByIdParam }>, reply: FastifyReply): Promise<void> => {
      const attribution = await attributionsController.handleGetAttributionsById(request.params);
      if (!attribution ) {
        await reply.code(404).send()
      }
      else {
        await reply.send(attribution)
      }
    }
  );

    fastify.get(
      '/attributions',
      { schema: attributionsSchema},
      async (request: FastifyRequest<{ Querystring: AttributionsQueryParam }>, reply: FastifyReply): Promise<void> => {
        const attributions = await attributionsController.handleGetAttributions(request.query);
        if (attributions.length == 0) {
          await reply.code(404).send()
        }
        else {
          await reply.send(attributions)
        }
      }
    );

    fastify.post(
      '/attributions',
      { schema: attributionsPostSchema},
      async (request: FastifyRequest<{ Body: AttributionsPostBody }>, reply: FastifyReply): Promise<void> => {
        const attribution = await attributionsController.handleCreateAttribution(request.body);
        if (!attribution) {
          await reply.code(400).send()
        }
        else {
          await reply.send(attribution)
        }
      }
    );

    fastify.put(
      '/attributions/:userId/:bookId',
      { schema: attributionsPutSchema},
      async (request: FastifyRequest<{ Params: AttributionsByIdParam, Body: AttributionsPostBody }>, reply: FastifyReply): Promise<void> => {
        const attribution = await attributionsController.handleUpdateAttribution(request.params, request.body);
        if (!attribution) {
          const errorMessage = "User/Book Id not found"
          await reply.code(400).send(errorMessage)
        }
        else {
          await reply.code(200).send(attribution)
        }
      }
    );
}






