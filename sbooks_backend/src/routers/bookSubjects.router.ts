import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { bookSubjectSchema, bookSubjectsSchema, bookSubjectsPostSchema, bookSubjectsPutSchema } from "../schemas/bookSubjects.schema";
import { BookSubjectsByIdParam, BookSubjectsPostBody, BookSubjectsQueryParam } from "../types/bookSubjects/bookSubjects.query.types";
import { bookSubjectsController } from "../controllers";

export default function (fastify: FastifyInstance): void {

  fastify.get(
    "/bookSubject/:subjectId/:bookId",
    { schema: bookSubjectSchema },
    async (request: FastifyRequest<{ Params: BookSubjectsByIdParam }>, reply: FastifyReply): Promise<void> => {
      const bookSubjects = await bookSubjectsController.handleGetBookSubjectById(request.params);
      if (bookSubjects === null) {
        await reply.code(404).send("BookSubjects not found");
      } else {
        await reply.send(bookSubjects);
      }
    }
  );

  fastify.get(
    "/bookSubjects",
    { schema: bookSubjectsSchema },
    async (request: FastifyRequest<{ Querystring: BookSubjectsQueryParam }>, reply: FastifyReply): Promise<void> => {
      const bookSubjects = await bookSubjectsController.handleGetBookSubjects(request.query);
      if (bookSubjects.length === 0) {
        await reply.code(404).send("BookSubjects not found");
      } else {
        await reply.send(bookSubjects);
      }
    }
  );

  fastify.post(
    "/bookSubject",
    { schema: bookSubjectsPostSchema },
    async (request: FastifyRequest<{ Body: BookSubjectsPostBody }>, reply: FastifyReply): Promise<void> => {
      const bookSubjects = await bookSubjectsController.handleCreateBookSubjects(request.body);
      if (bookSubjects === null) {
        await reply.code(400).send();
      } else {
        await reply.send(bookSubjects);
      }
    }
  );

  fastify.put(
    "/bookSubjects/:subjectId/:bookId",
    { schema: bookSubjectsPutSchema },
    async (request: FastifyRequest<{ Params: BookSubjectsByIdParam; Body: BookSubjectsPostBody; }>, reply: FastifyReply): Promise<void> => {
      const bookSubjects = await bookSubjectsController.handleUpdateBookSubjects(request.params, request.body);
      if (bookSubjects === null) {
        await reply.code(400).send("BookSubjects not found");
      } else {
        await reply.send(bookSubjects);
      }
    }
  );
}
