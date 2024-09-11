/* eslint-disable @typescript-eslint/no-explicit-any */
import { BookByIdParam, BookPostBody, FilterQueryParam } from '../types/book/book.query.types';
import { bookService } from '../services'

const handleGetBookById = async (req: BookByIdParam) => {
  const response = await bookService.getBookById(req.bookId);
  return response;
};

const handleGetBooks = async (req: FilterQueryParam) => {
  const response = await bookService.getBooks(req);
  return response;
};
const handleGetAllAuthors = async () => {
  const authors = await bookService.getAllAuthors();
  return authors;
};

const handleCreateBook = async (body: BookPostBody) => {
  const response = await bookService.createBook(body);
  return response;
}

const handleUpdateBook = async (params: BookByIdParam, body: BookPostBody) => {
  const response = await bookService.updateBook(params.bookId, body);
  return response
}

export default {
  handleGetBookById,
  handleGetBooks,
  handleCreateBook,
  handleUpdateBook,
  handleGetAllAuthors
};
