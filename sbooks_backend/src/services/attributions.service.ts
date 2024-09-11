/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Op } from 'sequelize';
import Attributions from '../models/attributions';
import { AttributionsPostBody, AttributionsQueryParam } from '../types/attributions/attributions.query.types';

const getAttributions = async (query: AttributionsQueryParam) => {
  const userIdCondition = query.userId? {userId: query.userId }: ''
  const bookIdCondition = query.bookId? {bookId: query.bookId }: ''
  const createdAtCondition = query.CreatedAt ? { CreatedAt: { [Op.eq]: `${query.CreatedAt}` } } : '';
  const updatedAtCondition = query.UpdatedAt ? { UpdatedAt: { [Op.eq]: `${query.UpdatedAt}` } } : '';


  const dbData = await Attributions.findAll({
    where: {
      ...userIdCondition,
      ...bookIdCondition,
     ...createdAtCondition,
     ...updatedAtCondition,
    }    
  });
  return dbData;
}

const getAttributionsById = async (userId: number, bookId:number ) => {
  const response = await Attributions.findOne({ where: { userId: userId, bookId: bookId }  });
  return response;
};


const createAttribution = async (body: AttributionsPostBody) => {
  console.log("BODY: ",body)
  try{
    const attribution =  await Attributions.create({
      ...body,
    });
    console.log("ATTR: ",attribution)
    return attribution
  }
  catch(err){
    return null
  }    
};

const updateAttribution = async (userId: number, bookId: number, body: AttributionsPostBody) => {
  try {
    const attribution = await Attributions.findOne({ where: { userId: userId, bookId: bookId } });
    if (!attribution) {
      return null;
    }
    const [, updatedAttribution] = await Attributions.update(
      { ...body },
      { where: { userId: userId, bookId: bookId }, returning: true }
    );
    console.log("Updated Attribution", updatedAttribution);
    return updatedAttribution[0];
  } catch (error) {
    return null;
  }
};

export default {
  getAttributions, 
  createAttribution,
  updateAttribution,
  getAttributionsById
};
