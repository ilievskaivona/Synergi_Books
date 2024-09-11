/* eslint-disable @typescript-eslint/no-explicit-any */
import { AttributionsByIdParam, AttributionsPostBody, AttributionsQueryParam } from '../types/attributions/attributions.query.types';
import attributionsService from '../services/attributions.service'


const handleGetAttributionsById = async (req: AttributionsByIdParam) => {
  const { userId, bookId } = req;
  const response = await attributionsService.getAttributionsById(userId, bookId);
  return response;
};
const handleGetAttributions = async (req: AttributionsQueryParam) => {
  const response = await attributionsService.getAttributions(req);
  return response;
};

const handleCreateAttribution = async (body: AttributionsPostBody) => {
  const response = await attributionsService.createAttribution(body);
  console.log("AttributionsPostBody:",body)
  console.log("RESPONSE:",response)
  return response
}

const handleUpdateAttribution = async (params: AttributionsByIdParam, body: AttributionsPostBody) => {
  const { userId, bookId } = params;
  const attribution = await attributionsService.updateAttribution(userId, bookId, body);
  if (!attribution) {
    const errorMessage = "User/Book Id not found";
    throw new Error(errorMessage);
  }
  return attribution;
};

export default {
  handleGetAttributions,
  handleCreateAttribution,
  handleUpdateAttribution,
  handleGetAttributionsById
};
