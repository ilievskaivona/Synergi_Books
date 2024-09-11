/* eslint-disable @typescript-eslint/no-explicit-any */
import { DifficultyByIdParam, DifficultyPostBody, DifficultyQueryParam } from '../types/difficulty/difficulty.query.types';
import { difficultyService }from '../services'

const handleGetDifficultyById = async (req: DifficultyByIdParam) => {
  const response = await difficultyService.getDifficultyById(req.difficultyId);
  return response;
};

const handleGetDifficulties = async (req: DifficultyQueryParam) => {
  const response = await difficultyService.getDifficulties(req);
  return response;
};

const handleCreateDifficulty = async (body: DifficultyPostBody) => {
  const response = await difficultyService.createDifficulty(body);
  return response
}

const handleUpdateDifficulty = async (params: DifficultyByIdParam, body: DifficultyPostBody) => {
  const response = await difficultyService.updateDifficulty(params.difficultyId, body);
  return response
}

export default {
  handleGetDifficultyById,
  handleGetDifficulties,
  handleCreateDifficulty,
  handleUpdateDifficulty
};
