import { FastifyInstance, HookHandlerDoneFunction } from "fastify";
import bookRouter from "./book.router";
import userRouter from "./user.router";
import difficultyRouter from "./difficulty.router";
import bookTagsRouter from './bookTags.router'
import bookDetailsRouter from './bookDetails.router'
import gradeRouter from "./grade.router";
import statusRouter from "./status.router";
import subjectRouter from "./subject.router";
import attributionsRouter from "./attributions.router"
import bookSubjectsRouter from "./bookSubjects.router";

export default {
  v1: function (
    fastify: FastifyInstance,
    _opts: unknown,
    done: HookHandlerDoneFunction
  ): void {
    bookRouter(fastify);
    userRouter(fastify);
    difficultyRouter(fastify);
    bookTagsRouter(fastify);
    bookDetailsRouter(fastify);
    gradeRouter(fastify);
    statusRouter(fastify);
    subjectRouter(fastify);
    attributionsRouter(fastify)
    bookSubjectsRouter(fastify);
    done();
  },
};
