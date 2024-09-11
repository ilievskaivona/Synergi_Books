import {bookTagsService} from "../services";
import { BookTagsByIdParam, BookTagsPostBody, BookTagsQueryParam } from "../types/bookTags/bookTags.query.types";

const handleGetBookTagById = async (req: BookTagsByIdParam) => {
  const response = await bookTagsService.getBookTagById(req.TagId);
  return response;
};
const handleGetBookTags = async (req: BookTagsQueryParam) => {
  const response = await bookTagsService.getBookTags(req);
  return response;
};
const handleCreateBookTags = async (body: BookTagsPostBody) => {
  const response = await bookTagsService.createBookTags(body);
  return response;
};
const handleUpdateBookTags = async (params: BookTagsByIdParam, body: BookTagsPostBody) => {
  const response = await bookTagsService.updateBookTags(params.TagId, body);
  return response;
};

export default {
  handleCreateBookTags,
  handleGetBookTagById,
  handleGetBookTags,
  handleUpdateBookTags,
};
