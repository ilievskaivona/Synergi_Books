/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Difficulty  from '../models/difficulty';
import { Op } from 'sequelize';
import { DifficultyPostBody, DifficultyQueryParam } from '../types/difficulty/difficulty.query.types';

const getDifficultyById = async (difficultyId: number) => {
  const response = await Difficulty.findOne({ where: { DifficultyId: difficultyId } });
  return response;
};

const getDifficulties = async (query: DifficultyQueryParam) => {
  const nameCondition = query.name? {name: { [Op.substring]: `${query.name}`}}: ''
  const createdAtCondition = query.CreatedAt ? { CreatedAt: { [Op.eq]: `${query.CreatedAt}` } } : '';
  const updatedAtCondition = query.UpdatedAt ? { UpdatedAt: { [Op.eq]: `${query.UpdatedAt}` } } : '';


  const dbData = await Difficulty.findAll({
    where: {
     ...nameCondition,
     ...createdAtCondition,
     ...updatedAtCondition,
    }    
  });
  return dbData;
}


const createDifficulty = async (body: DifficultyPostBody) => {
  try{
    return await Difficulty.create({
      ...body,
    });
  }
  catch(err){
    return null
  }    
};

const updateDifficulty = async (difficultyId: number, body: DifficultyPostBody) => {
  try {
    const difficulty = await Difficulty.findOne({ where: { DifficultyId: difficultyId } });
    if (!difficulty ) {
      return null;
    }
    const [,updatedDifficulty] = await Difficulty.update(
      {
        ...body,
      },
      { where: { DifficultyId: difficultyId}, returning: true }
    );
    console.log("Updated Difficulty", updatedDifficulty );
    return updatedDifficulty[0];
  } catch (error) {
    return null;
  }
};

export default {
  getDifficulties, 
  getDifficultyById,
  createDifficulty,
  updateDifficulty
};
