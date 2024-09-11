import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { GradeByIdParam, GradesQueryParam, GradePostBody,} from "../types/grade/grade.query.types";
import { gradeSchema, gradesSchema, gradePostSchema, gradePutSchema } from "../schemas/grade.schema";
import { gradeController } from "../controllers";

export default function (fastify: FastifyInstance): void {
    fastify.get(
      "/grade/:gradeId",
      { schema: gradeSchema },
      async (request: FastifyRequest<{ Params: GradeByIdParam }>, reply: FastifyReply): Promise<void> => {
        const grade = await gradeController.handleGetGradeById(request.params);
        if (!grade) {
          await reply.code(404).send();
        } else {
          await reply.send(grade);
        }
      }
    );

    fastify.get(
      "/grades",
      { schema: gradesSchema },
      async ( request: FastifyRequest<{ Querystring: GradesQueryParam }>, reply: FastifyReply): Promise<void> => {
        const grades = await gradeController.handleGetGrades(request.query);
        if (grades.length == 0) {
          await reply.code(404).send();
        } else {
          await reply.send(grades);
        }
      }
    );

    fastify.post(
      "/grade",
      { schema: gradePostSchema },
      async (request: FastifyRequest<{ Body: GradePostBody }>, reply: FastifyReply): Promise<void> => {
        const grade = await gradeController.handleCreateGrade(request.body);
        if (!grade) {
          await reply.code(400).send();
        } else {
          await reply.send(grade);
        }
      }
    );

    fastify.put(
      "/grade/:gradeId",
      { schema: gradePutSchema },
      async (request: FastifyRequest<{Params: GradeByIdParam; Body: GradePostBody; }>, reply: FastifyReply ): Promise<void> => {
        const grade = await gradeController.handleUpdateGrade(request.params, request.body);
        const errorMsg = "Grade not found";
        if (!grade) {
          await reply.code(400).send(errorMsg);
        } else {
          await reply.code(200).send(grade);
        }
      }
    );
  }
