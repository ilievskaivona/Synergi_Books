/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Subject from "../models/subject";
import { Op } from "sequelize";
import { SubjectPostBody, SubjectsQueryParam } from "../types/subject/subject.query.types";

const getSubjectById = async (subjectId: number) => {
  const response = await Subject.findOne({ where: { SubjectId: subjectId } });
  return response;
};

const getSubjects = async (query: SubjectsQueryParam) => {
  const nameCondition = query.name ? { name: { [Op.substring]: `${query.name}` } } : "";

  const createdAtCondition = query.CreatedAt
    ? {
        CreatedAt: {
          [Op.gte]: `${query.CreatedAt}T00:00:00.000Z`,

          [Op.lt]: `${query.CreatedAt}T23:59:59.999Z`,
        },
      }
    : {};

    const updatedAtCondition = query.UpdatedAt
    ? {
        UpdatedAt: {
          [Op.gte]: `${query.UpdatedAt}T00:00:00.000Z`,

          [Op.lt]: `${query.UpdatedAt}T23:59:59.999Z`,
        },
      }
    : {};

  const dbData = await Subject.findAll({
    where: {
      ...nameCondition,
      ...createdAtCondition,
      ...updatedAtCondition,
    },
  });
  return dbData;
};

const createSubject = async (body: SubjectPostBody) => {
  try {
    return await Subject.create({
      ...body,
    });
  } catch (err) {
    return null;
  }
};
const updateSubject = async (subjectId: number, body: SubjectPostBody) => {
  try {
    const [numAffectedRows, updatedSubject] = await Subject.update(
      {
        ...body,
      },
      {
        where: { SubjectId: subjectId },
        returning: true,
      }
    );
    if (numAffectedRows === 0) {
      return 0;
    }
    return updatedSubject[0];
  } catch (error) {
    return null;
  }
};

export default {
  getSubjectById,
  getSubjects,
  createSubject,
  updateSubject,
};
