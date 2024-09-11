import Status from '../models/status';
import { Op } from 'sequelize';
import { StatusPostBody, StatusesQueryParam } from '../types/status/status.query.types';

const geStatusById = async (statusId: number) => {
  const response = await Status.findOne({ where: { StatusId: statusId } });
  return response;
};

const getStatuses = async (query: StatusesQueryParam) => {
  const nameCondition = query.name? {name: { [Op.substring]: `${query.name}`}}: ''

  const createdAtCondition = query.CreatedAt
    ? { CreatedAt: { [Op.eq]: `${query.CreatedAt}` } }
    : "";

  const dbData = await Status.findAll({
    where: {
      ...nameCondition,
      ...createdAtCondition
    }    
  });
  console.log("data testing",dbData)
  return dbData
};

const createStatus = async (body: StatusPostBody) => {
  try{
    return await Status.create({
      ...body
    });
  }
  catch(err){
    return null
  }
};

const updateStatus = async (statusId: number, body: StatusPostBody) => {
  try {
    const [numAffectedRows, updatedStatus] = await Status.update(
      {
        ...body,
      },
      { 
        where: { StatusId: statusId }, returning: true 
      }
    );
    if (numAffectedRows === 0) {
      return 0;
    }
      return updatedStatus[0];
  } catch (error) {
    return null;
  }
};

export default {
  geStatusById,
  getStatuses,
  createStatus,
  updateStatus
};