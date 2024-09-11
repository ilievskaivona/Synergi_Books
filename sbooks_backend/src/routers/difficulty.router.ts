import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import {  difficultiesSchema, difficultyPostSchema, difficultySchema, difficultyPutSchema } from '../schemas/difficulty.schema';
import { DifficultyQueryParam, DifficultyPostBody, DifficultyByIdParam } from '../types/difficulty/difficulty.query.types'
import difficultyController from '../controllers/difficulty.controller';

export default function (fastify: FastifyInstance): void {

    fastify.get(
      '/difficulty/:difficultyId',
      { schema: difficultySchema },
      async (request: FastifyRequest<{ Params:  DifficultyByIdParam }>, reply: FastifyReply): Promise<void> => {
        const difficulty = await difficultyController.handleGetDifficultyById(request.params);
        if (!difficulty) {
          await reply.code(404).send()
        }
        else {
          await reply.send(difficulty)
        }
      }
    );

    fastify.get(
      '/difficulties',
      { schema: difficultiesSchema},
      async (request: FastifyRequest<{ Querystring: DifficultyQueryParam }>, reply: FastifyReply): Promise<void> => {
        const difficulties = await difficultyController.handleGetDifficulties(request.query);
        if (difficulties.length == 0) {
          await reply.code(404).send()
        }
        else {
          await reply.send(difficulties)
        }
      }
    );

    fastify.post(
      '/difficulty',
      { schema: difficultyPostSchema },
      async (request: FastifyRequest<{ Body: DifficultyPostBody }>, reply: FastifyReply): Promise<void> => {
        const difficulty = await difficultyController.handleCreateDifficulty(request.body);
        if (!difficulty) {
          await reply.code(400).send()
        }
        else {
          await reply.send(difficulty)
        }
      }
    );

    fastify.put(
      '/difficulty/:difficultyId',
      { schema: difficultyPutSchema },
      async (request: FastifyRequest<{ Params: DifficultyByIdParam, Body: DifficultyPostBody }>, reply: FastifyReply): Promise<void> => {
        const difficulty = await difficultyController.handleUpdateDifficulty(request.params, request.body);
        if (!difficulty) {
          const errorMessage = "Difficulty Id not found"
          await reply.code(400).send(errorMessage)
        }
        else {
          await reply.code(200).send(difficulty)
        }
      }
    );
}






