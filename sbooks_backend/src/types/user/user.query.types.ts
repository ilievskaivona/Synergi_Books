import { Role, UserStatus } from "./user.model.types";

export interface UserByIdParam {
  DBUserId: number;
}

export interface UserQueryParam {
  searchQuery? : string,
  page? :number,
  pageSize?: number,
  name?: string;
  email?: string;
  role?: Role;
  status?: UserStatus;
  createdBy?: number;
  updatedBy?: number;
}

export interface UserPostBody {
  name: string;
  password: string;
  email: string;
  role: Role;
  status: UserStatus;
  user?: number;
}

