import BookTags from "../models/bookTags";
import { BookTagsPostBody, BookTagsQueryParam } from "../types/bookTags/bookTags.query.types";

const getBookTagById = async (tagId: number) => {
  const response = await BookTags.findByPk(tagId);
  return response;
};

const getBookTags = async (query: BookTagsQueryParam) => {
  const bookIdCondition = query.bookId ? { bookId: query.bookId } : "";

  const dbData = await BookTags.findAll({
    where: {
      ...bookIdCondition,
    },
  });
  return dbData;
};

const createBookTags = async (body: BookTagsPostBody) => {
  try {
    return await BookTags.create({
      ...body,
    });
  } catch (error) {
    return null;
  }
};

const updateBookTags = async (tagId: number, body: BookTagsPostBody) => {
  try {
    const [numAffectedRows, updatedBookTags] = await BookTags.update(
      {
        ...body,
      },
      { where: { TagId: tagId }, returning: true }
    );
    if (numAffectedRows === 0) {
      return null;
    }
    return updatedBookTags;
  } catch (error) {
    return null;
  }
};

export default {
  getBookTagById,
  getBookTags,
  createBookTags,
  updateBookTags,
};
