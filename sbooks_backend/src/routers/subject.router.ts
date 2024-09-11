import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { subjectController } from "../controllers";
import { subjectSchema, subjectsSchema, subjectPostSchema, subjectPutSchema } from "../schemas/subject.schema";
import { SubjectByIdParam, SubjectPostBody, SubjectsQueryParam } from "../types/subject/subject.query.types";

export default function (fastify: FastifyInstance): void {
    fastify.get(
      "/subject/:subjectId",
      { schema: subjectSchema },
      async ( request: FastifyRequest<{ Params: SubjectByIdParam }>, reply: FastifyReply): Promise<void> => {
        const subject = await subjectController.handleGetSubjectById(request.params);
        if (!subject) {
          await reply.code(404).send();
        } else {
          await reply.send(subject);
        }
      }
    );

    fastify.get(
      "/subjects",
      { schema: subjectsSchema },
      async (request: FastifyRequest<{ Querystring: SubjectsQueryParam }>, reply: FastifyReply ): Promise<void> => {
        const subjects = await subjectController.handleGetSubjects(request.query);
        if (subjects.length == 0) {
          await reply.code(404).send();
        } else {
          await reply.send(subjects);
        }
      }
    );

    fastify.post(
      "/subject",
      { schema: subjectPostSchema },
      async (request: FastifyRequest<{ Body: SubjectPostBody }>,reply: FastifyReply): Promise<void> => {
        const subject = await subjectController.handleCreateSubject(
          request.body
        );
        if (!subject) {
          await reply.code(400).send();
        } else {
          await reply.send(subject);
        }
      }
    );

    fastify.put(
      "/subject/:subjectId",
      { schema: subjectPutSchema },
      async (request: FastifyRequest<{Params: SubjectByIdParam; Body: SubjectPostBody;}>, reply: FastifyReply): Promise<void> => {
        const subject = await subjectController.handleUpdateSubject(
          request.params,
          request.body
        );
        if (!subject) {
          await reply.code(400).send();
        } else {
          await reply.code(200).send(subject);
        }
      }
    );
  }
