import { StatusByIdParam, StatusesQueryParam, StatusPostBody } from '../types/status/status.query.types'
import { statusService } from '../services'

const handleGetStatusById = async (req: StatusByIdParam) => {
  const response = await statusService.geStatusById(req.statusId);
  return response;
};

const handleGetStatuses = async (req: StatusesQueryParam) => {
  const response = await statusService.getStatuses(req);
  return response;
};

const handleCreateStatus = async (body: StatusPostBody) => {
  const response = await statusService.createStatus(body);
  return response
}

const handleUpdateStatus = async (params: StatusByIdParam, body: StatusPostBody) => {
  const response = await statusService.updateStatus(params.statusId, body);
  return response
}

export default {
  handleGetStatusById,
  handleGetStatuses,
  handleCreateStatus,
  handleUpdateStatus
};
