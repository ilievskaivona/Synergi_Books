import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { bookDetailSchema, bookDetailsSchema, bookDetailsPostSchema, bookDetailsPutSchema } from "../schemas/bookDetails.schema";
import { BookDetailsByIdParam, BookDetailsPostBody, BookDetailsQueryParam } from "../types/bookDetails/bookDetails.query.types";
import { bookDetailsController } from "../controllers";

export default function (fastify: FastifyInstance): void {
  fastify.get(
    "/bookDetails/:BookDetailsId",
    { schema: bookDetailSchema },
    async (request: FastifyRequest<{ Params: BookDetailsByIdParam }>, reply: FastifyReply): Promise<void> => {
      const bookDetails = await bookDetailsController.handleGetBookDetailById(request.params);
      if (bookDetails === null) {
        await reply.code(404).send("BookDetails not found");
      } else {
        await reply.send(bookDetails);
      }
    }
  );

  // fastify.get(
  //   "/bookDetails",
  //   { schema: bookDetailsSchema },
  //   async (request: FastifyRequest<{ Querystring: BookDetailsQueryParam }>, reply: FastifyReply): Promise<void> => {
  //     try {
  //       const bookDetails = await bookDetailsController.handleGetBookDetails(request.query);
  //       if (!bookDetails || bookDetails.length === 0) {
  //         reply.code(404).send({ message: "BookDetails not found" });
  //       } else {
  //         reply.send(bookDetails);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching book details:", error);
  //     }
  //   }
  // );


  fastify.get(
    "/bookDetails",
    { schema: bookDetailsSchema },
    async (request: FastifyRequest<{ Querystring: BookDetailsQueryParam }>, reply: FastifyReply): Promise<void> => {
      const bookDetails = await bookDetailsController.handleGetBookDetails(request.query);
      if (!bookDetails || bookDetails.length === 0) {
        await reply.code(404).send("BookDetails not found");
      } else {
        await reply.send(bookDetails);
      }
    }
  );

  fastify.post(
    "/bookDetail",
    { schema: bookDetailsPostSchema },
    async (request: FastifyRequest<{ Body: BookDetailsPostBody }>, reply: FastifyReply): Promise<void> => {
      const bookDetails = await bookDetailsController.handleCreateBookDetails(request.body);
      if (bookDetails === null) {
        await reply.code(400).send();
      } else {
        await reply.send(bookDetails);
      }
    }
  );

  fastify.put(
    "/bookDetails/:BookDetailsId",
    { schema: bookDetailsPutSchema },
    async (request: FastifyRequest<{ Params: BookDetailsByIdParam; Body: BookDetailsPostBody; }>, reply: FastifyReply): Promise<void> => {
      const bookDetails = await bookDetailsController.handleUpdateBookDetails(request.params, request.body);
      if (bookDetails === null) {
        await reply.code(400).send("BookDetails not found");
      } else {
        await reply.send(bookDetails);
      }
    }
  );
}
