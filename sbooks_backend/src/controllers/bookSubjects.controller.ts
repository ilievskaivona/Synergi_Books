import { bookSubjectsService } from "../services";
import { BookSubjectsByIdParam, BookSubjectsQueryParam, BookSubjectsPostBody } from "../types/bookSubjects/bookSubjects.query.types";

const handleGetBookSubjectById = async (req: BookSubjectsByIdParam) => {
  const { bookId, subjectId } = req
  const response = await bookSubjectsService.getBookSubjectById(
    bookId, subjectId
  );
  return response;
};

const handleGetBookSubjects = async (req: BookSubjectsQueryParam) => {
  const response = await bookSubjectsService.getBookSubjects(req);
  return response;
};

const handleCreateBookSubjects = async (body: BookSubjectsPostBody) => {
  const response = await bookSubjectsService.createBookSubjects(body);
  return response;
};

const handleUpdateBookSubjects = async (params: BookSubjectsByIdParam, body: BookSubjectsPostBody) => {
  const { bookId, subjectId } = params
  const response = await bookSubjectsService.updateBookSubjects(bookId, subjectId, body);
  return response;
};

export default {
  handleCreateBookSubjects,
  handleGetBookSubjectById,
  handleGetBookSubjects,
  handleUpdateBookSubjects,
};
