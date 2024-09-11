/* eslint-disable @typescript-eslint/no-explicit-any */
import { SubjectByIdParam, SubjectPostBody, SubjectsQueryParam} from "../types/subject/subject.query.types";
import { subjectService }from "../services";


const handleGetSubjectById = async (req: SubjectByIdParam) => {
  const response = await subjectService.getSubjectById(req.subjectId);
  return response;
};

const handleGetSubjects = async (req: SubjectsQueryParam) => {
  const response = await subjectService.getSubjects(req);
  return response;
};

const handleCreateSubject = async (body: SubjectPostBody) => {
  const response = await subjectService.createSubject(body);
  return response;
};

const handleUpdateSubject = async (params: SubjectByIdParam, body: SubjectPostBody) => {
  const response = await subjectService.updateSubject(params.subjectId, body);
  return response;
};

export default {
  handleGetSubjectById,
  handleGetSubjects,
  handleCreateSubject,
  handleUpdateSubject,
};
