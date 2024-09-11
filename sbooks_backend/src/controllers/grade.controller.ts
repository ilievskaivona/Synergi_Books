/* eslint-disable @typescript-eslint/no-explicit-any */
import gradeService from "../services/grade.service";
import { GradeByIdParam, GradePostBody, GradesQueryParam} from "../types/grade/grade.query.types";

const handleGetGradeById = async (req: GradeByIdParam) => {
  const response = await gradeService.getGradeById(req.gradeId);
  return response;
};

const handleGetGrades = async (req: GradesQueryParam) => {
  const response = await gradeService.getGrades(req);
  return response;
};

const handleCreateGrade = async (body: GradePostBody) => {
  const response = await gradeService.createGrade(body);
  return response;
};

const handleUpdateGrade = async (params: GradeByIdParam, body: GradePostBody) => {
  const response = await gradeService.updateGrade(params.gradeId, body);
  return response;
};

export default {
  handleGetGradeById,
  handleGetGrades,
  handleCreateGrade,
  handleUpdateGrade,
};
