import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { bookController } from "../controllers";
import { bookSchema, bookPostSchema, bookPutSchema, booksSchema } from "../schemas/book.schema";
import { BookByIdParam, BookPostBody, FilterQueryParam } from "../types/book/book.query.types";
import { bookService } from "../services";

export default function (fastify: FastifyInstance): void {
  fastify.get(
    "/book/:bookId",
    { schema: bookSchema },
    async (request: FastifyRequest<{ Params: BookByIdParam }>, reply: FastifyReply): Promise<void> => {
      const book = await bookController.handleGetBookById(request.params);
      if (!book) {
        await reply.code(404).send();
      } else {
        await reply.send(book);
      }
    }
  );

  fastify.get(
    "/books",
    { schema: booksSchema },
    async (request: FastifyRequest<{ Querystring: FilterQueryParam }>, reply: FastifyReply): Promise<void> => {
      const query: FilterQueryParam = request.query;
      const page: number = query.page || 1;
      const pageSize: number = query.pageSize || 4;
      const offset = (page - 1) * pageSize;
      const books = await bookService.getBooksByPage(query, offset, pageSize);
      const totalBooks = await bookController.handleGetBooks(request.query)
      if (books.length == 0) {
        await reply.send({ books: [], totalBooks: 0, message: "No books found for the specified filter." });
      } else {
        await reply.send({ books, totalBooks: totalBooks.totalBooks });
      }
    }
  );

  fastify.get(
    '/authors',
    { schema: undefined },
    async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
      const authors = await bookController.handleGetAllAuthors();
      if (!authors) {
        await reply.code(500).send({ error: 'Internal Server Error' });
      } else {
        await reply.send(authors);
      }
    }
  );


  fastify.post(
    "/book",
    { schema: bookPostSchema },
    async (request: FastifyRequest<{ Body: BookPostBody }>, reply: FastifyReply): Promise<void> => {
      const book = await bookController.handleCreateBook(request.body);
      if (!book) {
        await reply.code(400).send();
      } else {
        await reply.send(book);
      }
    }
  );

  fastify.put(
    "/book/:bookId",
    { schema: bookPutSchema },
    async (request: FastifyRequest<{ Params: BookByIdParam; Body: BookPostBody }>, reply: FastifyReply): Promise<void> => {
      const book = await bookController.handleUpdateBook(request.params, request.body);
      if (!book) {
        await reply.code(400).send();
      } else {
        await reply.code(200).send(book);
      }
    }
  );
}
