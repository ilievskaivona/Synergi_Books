import { FastifyReply, FastifyRequest } from "fastify";
import bookDetailsService from "../services/bookDetails.service";
import { BookDetailsByIdParam, BookDetailsPostBody, BookDetailsQueryParam } from "../types/bookDetails/bookDetails.query.types";

const handleGetBookDetailById = async (req: BookDetailsByIdParam) => {
  const response = await bookDetailsService.getBookDetailById(
    req.BookDetailsId
  );
  return response;
};

const handleGetBookDetails = async (query: BookDetailsQueryParam) => {
  try {
    const response = await bookDetailsService.getBookDetails(query);
    return response;
  } catch (error) {
    console.error('Error fetching book details:', error);
  }
};

// const handleGetBookDetails = async (req: BookDetailsQueryParam) => {
//   const response = await bookDetailsService.getBookDetails(req);
//   return response;
// };

const handleCreateBookDetails = async (body: BookDetailsPostBody) => {
  const response = await bookDetailsService.createBookDetails(body);
  return response;
};

const handleUpdateBookDetails = async (params: BookDetailsByIdParam, body: BookDetailsPostBody) => {
  const response = await bookDetailsService.updateBookDetails(params.BookDetailsId, body);
  return response;
};

export default {
  handleCreateBookDetails,
  handleGetBookDetailById,
  handleGetBookDetails,
  handleUpdateBookDetails,
};
