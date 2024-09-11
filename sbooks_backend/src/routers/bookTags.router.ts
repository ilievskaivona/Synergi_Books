import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { bookTagSchema, bookTagsSchema, bookTagsPostSchema, bookTagsPutSchema } from "../schemas/bookTags.schema";
import { BookTagsByIdParam, BookTagsPostBody, BookTagsQueryParam } from "../types/bookTags/bookTags.query.types";
import { bookTagsController } from "../controllers";

export default function (fastify: FastifyInstance): void {
  fastify.get(
    "/bookTags/:TagId",
    { schema: bookTagSchema },
    async (request: FastifyRequest<{ Params: BookTagsByIdParam }>, reply: FastifyReply ): Promise<void> => {
      const bookTags = await bookTagsController.handleGetBookTagById(request.params);
      if (bookTags === null) {
        await reply.code(404).send("BookTags not found");
      } else {
        await reply.send(bookTags);
      }
    }
  );

  fastify.get(
    "/bookTags",
    { schema: bookTagsSchema },
    async (request: FastifyRequest<{ Querystring: BookTagsQueryParam }>, reply: FastifyReply): Promise<void> => {
      const bookTags = await bookTagsController.handleGetBookTags(request.query);
      if (bookTags.length === 0) {
        await reply.code(404).send("BookTags not found");
      } else {
        await reply.send(bookTags);
      }
    }
  );
  
  fastify.post(
    "/bookTag",
    { schema: bookTagsPostSchema },
    async (request: FastifyRequest<{ Body: BookTagsPostBody }>, reply: FastifyReply): Promise<void> => {
      const bookTags = await bookTagsController.handleCreateBookTags(request.body);
      if (bookTags === null) {
        await reply.code(400).send();
      } else {
        await reply.send(bookTags);
      }
    }
  );

  fastify.put(
    "/bookTag/:TagId",
    { schema: bookTagsPutSchema },
    async (request: FastifyRequest<{ Params:BookTagsByIdParam,Body: BookTagsPostBody }>, reply: FastifyReply): Promise<void> => {
      const bookTags = await bookTagsController.handleUpdateBookTags(request.params, request.body);
      if (bookTags === null) {
        await reply.code(400).send("BookTags not found");
      } else {
        await reply.send(bookTags);
      }
    }
  );
}
