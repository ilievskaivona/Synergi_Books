/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  UserByIdParam,
  UserPostBody,
  UserQueryParam,
} from "../types/user/user.query.types";
import { userService } from "../services";
import { Role } from "../types/user/user.model.types";


const handleGetUserById = async (req: UserByIdParam) => {
  const response = await userService.getUserById(req.DBUserId);
  return response;
};

const handleGetUsers = async (req: UserQueryParam) => {
  const response = await userService.getUsers(req);
  return response;
};

const handleCreateUser = async (body: UserPostBody) => {
  const response = await userService.createUser(body);
  return response;
};

// const handleUpdateUser = async (params: UserByIdParam, body: UserPostBody) => {
//   const response = await userService.updateUser(params.DBUserId, body);
//   return response;
// };

const handleEditUser = async (params: UserByIdParam, body : UserPostBody) => {
  const response = await userService.editUser(params.DBUserId, body);
  return response;
};
const handleDeactivateUser = async (params: UserByIdParam, body : UserPostBody) => {
  const response = await userService.deactivateUser(params.DBUserId, body);
  return response;
};

const handleLoginUser = async (email: string, password: string) => {
  const response = await userService.loginUser(email, password);
  return response;
};

export default {
  handleCreateUser,
  handleGetUserById,
  handleGetUsers,
  // handleUpdateUser,
  handleLoginUser,
  handleEditUser,
  handleDeactivateUser,
};
