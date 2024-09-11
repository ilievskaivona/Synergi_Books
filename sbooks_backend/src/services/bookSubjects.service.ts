import BookSubjects from "../models/bookSubjects";
import { BookSubjectsPostBody, BookSubjectsQueryParam } from "../types/bookSubjects/bookSubjects.query.types";

const getBookSubjectById = async (bookId: number, subjectId: number) => {
  const response = await BookSubjects.findOne(
    { where: { bookId, subjectId } }
  );
  return response;
};

const getBookSubjects = async (query: BookSubjectsQueryParam) => {
  const bookIdCondition = query.bookId ? { bookId: query.bookId } : "";
  const dbData = await BookSubjects.findAll({
    where: {
      ...bookIdCondition,
    },
  });
  return dbData;
};

const createBookSubjects = async (body: BookSubjectsPostBody) => {
  try {
    return await BookSubjects.create({
      ...body,
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateBookSubjects = async (bookId: number, subjectId: number, body: BookSubjectsPostBody) => {
  try {
    const [numAffectedRows, updatedBookSubjects] = await BookSubjects.update(
      {
        ...body,
      },
      { where: { bookId: bookId, subjectId: subjectId }, returning: true }
    );
    if (numAffectedRows === 0) {
      return null;
    }
    return updatedBookSubjects;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default {
  getBookSubjectById,
  getBookSubjects,
  createBookSubjects,
  updateBookSubjects,
};
