import Grade from "../models/grade";
import { Op } from "sequelize";
import { GradesQueryParam, GradePostBody } from "../types/grade/grade.query.types";

const getGradeById = async (gradeId: number) => {
  const response = await Grade.findOne({ where: { GradeId: gradeId } });
  return response;
};

const getGrades = async (query: GradesQueryParam) => {
  const nameCondition = query.name
    ? { name: { [Op.substring]: `${query.name}` } }
    : "";

  const createdAtCondition = query.CreatedAt
    ? {
        CreatedAt: {
          [Op.gte]: `${query.CreatedAt}T00:00:00.000Z`,
          [Op.lt]: `${query.CreatedAt}T23:59:59.999Z`,
        },
      }
    : {};

  const dbData = await Grade.findAll({
    where: {
      ...nameCondition,
      ...createdAtCondition,
    },
  });
  console.log("CreatedAt", createdAtCondition);
  return dbData;
};

const createGrade = async (body: GradePostBody) => {
  try {
    return await Grade.create({
      ...body,
    });
  } catch (err) {
    return null;
  }
};

const updateGrade = async (gradeId: number, body: GradePostBody) => {
  try {
    const [numAffectedRows, updatedGrade] = await Grade.update(
      {
        ...body,
      },
      { where: { GradeId: gradeId }, returning: true }
    );
    if (numAffectedRows === 0) {
      return 0;
    }
    return updatedGrade[0];
  } catch (error) {
    return null;
  }
};

export default {
  getGradeById,
  getGrades,
  createGrade,
  updateGrade,
};
