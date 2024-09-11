import { Op, Sequelize } from "sequelize";
import BookDetails from "../models/bookDetails";
import Book from '../models/book';
import { BookDetailsPostBody, BookDetailsQueryParam } from "../types/bookDetails/bookDetails.query.types";

const getBookDetailById = async (bookDetailsId: number) => {
  const bookDetails = await BookDetails.findOne({ where: { BookDetailsId: bookDetailsId } });
  return bookDetails;
};

const getBookDetails = async (query: BookDetailsQueryParam) => {
  console.log("BookDetails", query);

  const dbData = await BookDetails.findAll({
    attributes: [
      'Description',
      'Level',
      'parent',
      'sort',
      'BookDetailsId',
      [Sequelize.literal('"Book"."Title"'), 'title'],
    ],
    include: [
      {
        model: Book,
        attributes: [],
      },
    ],
    group: ['"Book"."BookId"', '"BookDetails"."BookDetailsId"'],
  });

  return dbData;
};

const createBookDetails = async (body: BookDetailsPostBody) => {
  try {
    return await BookDetails.create({
      ...body,
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateBookDetails = async (bookDetailsId: number, body: BookDetailsPostBody) => {
  try {
    const [numAffectedRows, updatedBookDetails] = await BookDetails.update(
      {
        ...body,
      },
      { where: { BookDetailsId: bookDetailsId }, returning: true }
    );
    if (numAffectedRows === 0) {
      return null;
    }
    return updatedBookDetails;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default {
  getBookDetailById,
  getBookDetails,
  createBookDetails,
  updateBookDetails,
};
